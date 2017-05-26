/**
	JS de prueba
 */

var CONST = {
	// Cambiar a http://<hostname>/<directorio principal>
	uriServer  : "http://localhost:8080/INFO175_Servicios/"  
};

var data = null;

/**
 * Esta función se llama en el call-back de getJSON en loadData
 * @param res representa la data leida del servicio. Se asume que 
 * contiene un arreglo con objetos JSON con los atributos userid, 
 * applabel y activitycount
 */
function displayData(res) {
	data = res;
	// para poner la información leida en la página web (index.html)
	// accedemos al elemento con id working_area y le agregamos
	// un elemento html de tipo table, que tiene a su vez el id
	// "data_table".
	$("#working_area").append("<table id=\"data_table\">");
	
	// secuencialmente agregamos filas (<tr>) y celdas (<td>) a la
	// tabla "data_table".  
	for (var i = 0; i < data.length; i++) {
		var row = data[i];
		$("#data_table").append("<tr><td>" + row.userid + "</td>" 
			+ "<td>" + row.vis + "</td>"
			+ "<td>" + row.gender + "</td>"
			+ "<td>" + row.pretest + "</td>"
			+ "<td>" + row.posttest + "</td>"
			+ "<td>" + row.pretest_binned + "</td>"
			+ "<td>" + row.q_att + "</td>"
			+ "<td>" + row.q_att_succ + "</td>"
			+ "<td>" + row.dist_q_att + "</td>"
			+ "<td>" + row.dist_q_att_succ + "</td>"
			+ "<td>" + row.p_att + "</td>"
			+ "<td>" + row.p_att_succ + "</td>"
			+ "<td>" + row.dist_p_att + "</td>"
			+ "<td>" + row.dist_p_att_succ + "</td>"
			+ "<td>" + row.dist_e + "</td>"
			+ "<td>" + row.e_lines + "</td>"
			+ "<td>" + row.dist_ae + "</td>"
			+ "<td>" + row.ae_lines + "</td>"
			+ "<td>" + row.q_time + "</td>"
			+ "<td>" + row.p_time + "</td>"
			+ "<td>" + row.e_time + "</td>"
			+ "<td>" + row.ae_time + "</td></tr>\n");
	}
	//$( "#working_area" ).append("</table>");
}

/**
 * Esta función usa la función getJSON de jquery para hacer una llamada
 * a una dirección Web que devuelve un json. Aca llamamos al servicio 
 * GetTotalsByUser implementado en Java y corriendo en el servidor Tomcat.
 * getJSON es de jquery, y se reconoce porque se invoca desde el objeto $
 * El segundo parámetro de getJSON es una función de "call-back". Como 
 * la llamada AJAX producida por getJSON es asíncrona, la ejecución de getJSON 
 * no espera por la respuesta, sino que pasa la "data" leida del servicio a una 
 * siguiente función. Esta es la forma como javascript secuencia llamadas 
 * asíncronas
 */
function loadData(){
	var url = CONST.uriServer + "GetTotalsByUser";
	
	$.getJSON(url, function(data) {
		displayData(data);
	});
}

$(window).ready(function() {
	loadData();
});
