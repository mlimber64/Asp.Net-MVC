$.get("findAllPersona","RepasoHTML", function (data) {

    var contenido = "";

    contenido += "<table class='table table-bordered table-striped'>";

    contenido += "<thead>";
    contenido += "<tr>";
    contenido += "<td>Id Persona</td>";
    contenido += "<td>Nombre</td>";
    contenido += "<td>Apellido</td>";
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "<tbody>";

    var nfilas = data.length;

    for (var i = 0; i < nfilas; i++) {
        contenido += "<tr>";
        contenido += "<td>" + data[i].idPersona + "</td>";
        contenido += "<td>" + data[i].nombre + "</td>";
        contenido += "<td>" + data[i].apellidos + "</td>";
        contenido += "</tr>";
    }

    contenido += "</tbody>";
    contenido += "</table>";

    document.getElementById("divTabla").innerHTML = contenido;

});