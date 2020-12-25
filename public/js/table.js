function draw_table(){
    xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/index", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}
// autoloader
(function(){
    alert("OK");
    draw_table();
}());