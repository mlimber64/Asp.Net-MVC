$.get("findAllCurso", "Curso", function (data) {

    crearListado(data);


});

var btnBuscar = document.getElementById("btnBuscar");

btnBuscar.onclick = function () {
    var nombres = document.getElementById("txtNombre").value;

    $.get("buscarCursoxNombre/Curso/?nombres=" + nombres, function (data) {
        crearListado(data);
    });
}

var btnLimpiar = document.getElementById("btnLimpiar");

btnLimpiar.onclick = function () {

    $.get("findAllCurso", "Curso", function (data) {

        crearListado(data);


    });
    document.getElementById("txtNombre").value = "";
}

function crearListado(data) {

    var contenido = "";

    contenido += "<table id='tabla-curso' class='table table-bordered table-striped'>";
    contenido += "<thead>";
    contenido += "<tr>";
    contenido += "<td>Id Curso</td>";
    contenido += "<td>Nombre</td>";
    contenido += "<td>Descripcion</td>";
    contenido += "<td>Acciones</td>";
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "<tbody>";

    for (var i = 0; i < data.length; i++) {

        contenido += "<tr>";
        contenido += "<td>" + data[i].IIDCURSO + "</td>";
        contenido += "<td>" + data[i].NOMBRE + "</td>";
        contenido += "<td>" + data[i].DESCRIPCION + "</td>";
        contenido += "<td>";
        contenido += "<button class='btn btn-primary' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-edit'></i></button> ";
        contenido += "<button class='btn btn-danger'><i class='glyphicon glyphicon-trash'></i></button>";
        contenido += "</td>";
        contenido += "</tr>";
    }
    
    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;
    $("#tabla-curso").dataTable({

        searching : false
    });
}