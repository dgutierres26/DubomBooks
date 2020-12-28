// IIFE - Immediately Invoked Function Expression
(function(){
    draw_table();
}());

function draw_table(){
// Instanciate the xhttp
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("table").innerHTML = this.responseText;
        }
    };

    xhttp.open("GET", "/get/html", false);
    xhttp.send();

}
