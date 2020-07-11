$.get("findAllPeriodo/Periodo", function (data) {

    crearListado(data);

});

var nombrePeriodo = document.getElementById("txtPeriodo");
nombrePeriodo.onkeyup = function () {

    var nombre = document.getElementById("txtPeriodo").value;
    $.get("buscarPeriodoxNombre/Periodo/?nombre=" + nombre, function (data) {
        crearListado(data);
    });
}

$



function crearListado(data) {

    var contenido = "";

    contenido += "<table id='tabla-periodo' class='table table-bordered table-striped'>";
    contenido += "<thead>";
    contenido += "<tr>";
    contenido += "<td>Id Periodo</td>";
    contenido += "<td>Nombre</td>";
    contenido += "<td>Fecha Inicio</td>";
    contenido += "<td>Fecha Fin</td>";
    contenido += "<td>Acciones</td>";
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "<tbody>";

    for (var i = 0; i < data.length; i++) {

        contenido += "<tr>";
        contenido += "<td>" + data[i].IIDPERIODO + "</td>";
        contenido += "<td>" + data[i].NOMBRE + "</td>";
        contenido += "<td>" + data[i].FECHAINICIO + "</td>";
        contenido += "<td>" + data[i].FECHAFIN + "</td>";
        contenido += "<td>";
        contenido += "<button class='btn btn-primary' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-edit'></i></button> ";
        contenido += "<button class='btn btn-danger'><i class='glyphicon glyphicon-trash'></i></button>";
        contenido += "</td>";
        contenido += "</tr>";
    }

    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;
    $("#tabla-periodo").dataTable({

        searching: false
    });
}

$("#datepickerInicio").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true

    }
);
$("#datepickerFin").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
);
