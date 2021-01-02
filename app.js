const express = require('express');
const app = express();
const fs = require('fs');
path = require('path');
xmlParse = require('xslt-processor').xmlParse; //This module allows us to work with XML files
xsltProcess = require('xslt-processor').xsltProcess; //The same module allows us to utilise XSL Transformations
xml2js = require('xml2js'); //This module does XML to JSON conversion and also allows us to get from JSON back to XML

app.use(express.static(path.resolve(__dirname, 'views'))); //We define the views folder as the one where all static content will be served
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //We include support for JSON that is coming from the client

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// Function to read in XML file and convert it to JSON
function xmlFileToJs(filename, cb) {
    var filepath = path.normalize(path.join(__dirname, filename));
    fs.readFile(filepath, 'utf8', function (err, xmlStr) {
        if (err) throw (err);
        xml2js.parseString(xmlStr, {}, cb);
    });
}

//Function to convert JSON to XML and save it
function jsToXmlFile(filename, obj, cb) {
    var filepath = path.normalize(path.join(__dirname, filename));
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);
    fs.unlinkSync(filepath);
    fs.writeFile(filepath, xml, cb);
}

// It's redenring the file index
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/get/html', (req, res) => {
    //We are responding to the client that the content served back is HTML and the it exists (code 200)
    res.writeHead(200, { 'Content-Type': 'text/html' });
    //We are reading in the XML file 
    var xml = fs.readFileSync('dubombooks.xml', 'utf8');
    //We are reading in the XSL file

    var xsl = fs.readFileSync('dubombooks.xsl', 'utf8');
    //Parsing our XML file
    var doc = xmlParse(xml);
    //Parsing our XSL file
    var stylesheet = xmlParse(xsl);
    //This does our XSL Transformation 
    var result = xsltProcess(doc, stylesheet);
    //Send the result back to the user, but convert to type string first 
    res.end(result.toString());
});

// Add new items
app.post('/post/json', function (req, res) {

    function appendJSON(obj) {

        console.log(obj)

        xmlFileToJs('dubombooks.xml', function (err, result) {
            if (err) throw (err);

            result.books.section[obj.sec_n].book.push({ 'item': obj.item, 'price': obj.price });

            console.log(JSON.stringify(result, null, "  "));

            jsToXmlFile('PaddysCafe.xml', result, function (err) {
                if (err) console.log(err);
            });
        });
    };

    appendJSON(req.body);

    res.redirect('back');

});

// Delete items
app.post('/post/delete', function (req, res) {

    function deleteJSON(obj) {

        console.log(obj)

        xmlFileToJs('dubombooks.xml', function (err, result) {
            if (err) throw (err);

            delete result.books.section[obj.section].book[obj.entree];

            console.log(JSON.stringify(result, null, "  "));

            jsToXmlFile('dubombooks.xml', result, function (err) {
                if (err) console.log(err);
            });
        });
    };

    deleteJSON(req.body);

    res.redirect('back');

});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
