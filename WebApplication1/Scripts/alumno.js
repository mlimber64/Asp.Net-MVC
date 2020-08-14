listar();

function listar() {

    $.get("findAllAlumno", "Alumno", function (data) {

        crearListado(["Id", "Nombre", "Apellido Paterno", "Apellido Materno", "Telefono Padre"], data);

    });

}

$.get("findAllSexo", "Alumno", function (data) {

    llenarCombo(data, document.getElementById("cboSexo"), true);
    
    llenarCombo(data, document.getElementById("cboSexopopup"),true);
});



function llenarCombo(data, control,primerElemento) {

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



function crearListado(arrayColumnas,data) {

    var contenido = "";

    contenido += "<table id='tabla-alumno' class='table table-bordered table-striped'>";
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
        contenido += "<button class='btn btn-primary'><i class='glyphicon glyphicon-edit'></i></button> ";
        contenido += "<button class='btn btn-danger'><i class='glyphicon glyphicon-trash'></i></button>";
        contenido += "</td>";
        contenido += "</tr>";
    }

    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;
    $("#tabla-alumno").dataTable({

        searching: false
    });
}

var btnBusca = document.getElementById("btnBuscar");
    btnBusca.onclick = function () {

        var idsexo = document.getElementById("cboSexo").value;

        if (idsexo == "") {
            listar();
        } else {
            $.get("filtrarAlumnoxSexo/Alumno/?idsexo=" + idsexo, function (data) {

                crearListado(["Id", "Nombre", "Apellido Paterno", "Apellido Materno", "Telefono Padre"], data);

            });
        }

        
    }

    var btnLimpiar = document.getElementById("btnLimpiar");
    btnLimpiar.onclick = function () {
        listar();
}

$("#dtfechanac").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
);