listar();
listaomboModalidad();



function listar() {

    $.get("findAllDocente/Docente", function (data) {

        crearListado(["ID","NOMBRE","APELLIDO PATERNO","APELLIDO MATERNO","EMAIL"],data);

    });
}

function crearListado(arrayColumnas, data) {

    var contenido = "";

    contenido += "<table id='tabla-docente' class='table table-bordered table-striped'>";
    contenido += "<thead>";
    contenido += "<tr>";
    for (var i = 0; i < arrayColumnas.length; i++) {

        contenido += "<td>"

        contenido += arrayColumnas[i];

        contenido += "</td>"
    }
    contenido += "<td>Acciones</td>"
    contenido += "</tr>";
    contenido += "</thead>";

    var llaves = Object.keys(data[0]);

    contenido += "<tbody>";

    for (var i = 0; i < data.length; i++) {

        contenido += "<tr>";
        for (var j = 0; j < llaves.length; j++) {

            var valorLlaves = llaves[j];

            contenido += "<td>";

            contenido += data[i][valorLlaves];

            contenido += "</td>";

        }
        contenido += "<td>";
        contenido += "<button class='btn btn-primary'data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-edit'></i></button> ";
        contenido += "<button class='btn btn-danger'><i class='glyphicon glyphicon-trash'></i></button>";
        contenido += "</td>";
        contenido += "</tr>";
    }

    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;
    $("#tabla-docente").dataTable({

        searching: false
    });
}





function listaomboModalidad() {

    $.get("findAllModalidadContrato/Docente", function (data) {

        llenarCombo(data, document.getElementById("cboTipoModalidad"), true);
        llenarCombo(data, document.getElementById("cbomodalidadpopup"), true);

    });

    $.get("findAllSexo", "Alumno", function (data) {

        llenarCombo(data, document.getElementById("cboSexopouop"), true);
    });
}




function llenarCombo(data, control, primerElemento) {

    var contenido = "";

    if (primerElemento == true) {

        contenido += "<option value=''>--Seleccione--</option>";
    }

    for (var i = 0; i < data.length; i++) {

        contenido += "<option value='" + data[i].IID + "'>";

        contenido += data[i].NOMBRE;

        contenido += "</option>";
    }
    control.innerHTML = contenido;
}

var cboTipoModalidad = document.getElementById("cboTipoModalidad");

cboTipoModalidad.onchange = function () {

    var idmodalidad = document.getElementById("cboTipoModalidad").value;
    if (idmodalidad == "") {

        listar();
    } else {

        $.get("filtrarDocentexModalidad/Docente/?idmodalidad=" + idmodalidad, function (data) {

            crearListado(["ID", "NOMBRE", "APELLIDO PATERNO", "APELLIDO MATERNO", "EMAIL"], data);

        });
    }
}

$("#txtfechacontrato").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
);
