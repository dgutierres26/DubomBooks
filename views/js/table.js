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
            select_row();
        }
    };

    xhttp.open("GET", "/get/html", false);
    xhttp.send();

}
// Select the row 
function select_row()
{
	$("#bookTable tbody tr[id]").click(function ()
	{
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
		var section = $(this).prevAll("tr").children("td[colspan='5']").length - 1;
		var book = $(this).attr("id") - 1;
		delete_row(section, book);
	})
};
// Delete the row has been slected
function delete_row(sec, ent)
{
	$("#delete").click(function ()
	{
		$.ajax(
		{
			url: "/post/delete",
			type: "POST",
			data:
			{
				section: sec,
				book: ent
			},
			cache: false,
			success: setTimeout(draw_table, 1000)
		})
	})
};