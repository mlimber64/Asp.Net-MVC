//$.get("findAllPeriodo/Periodo", function (data) {

//    crearListado(data);

//});

var nombrePeriodo = document.getElementById("txtPeriodo");
nombrePeriodo.onkeyup = function () {

    var nombre = document.getElementById("txtPeriodo").value;
    $.get("buscarPeriodoxNombre/Periodo/?nombre=" + nombre, function (data) {
        crearListado(data);
    });
}

$



function crearListado(arrayColumnas, data) {

    var contenido = "";

    contenido += "<table id='tabla-periodo' class='table table-bordered table-striped'>";
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

        var llaveId = llaves[0];

        contenido += "<td>";
        contenido += "<button class='btn btn-primary' onclick='abrirModal(" + data[i][llaveId] + ")' data-toggle='modal' data-target='#myModal'><i class='glyphicon glyphicon-edit'></i></button> ";
        contenido += "<button class='btn btn-danger' onclick='eliminar(" + data[i][llaveId] + ")'><i class='glyphicon glyphicon-trash'></i></button>";
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

function eliminar(id) {
    if (confirm("Desea eliminar el registro") == 1) {
        var frm = new FormData();
        frm.append("IIDPERIODO", id);
        $.ajax({
            type: "POST",
            url: "eliminar/Periodo",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data == 0) {
                    alert("Ocurrio un error");
                } else {
                    alert("Se elimino correctamente");
                    listar();
                }
            }
        });
    }
}

listar();

function listar() {
    $.get("findAllPeriodo/Periodo", function (data) {

        crearListado(["ID","NOMBRE","FECHA INICIO","FECHA FIN"], data);

    });
}

function borrarDatos() {

    var controles = document.getElementsByClassName("borrar");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {

        controles[i].value = "";
    }
}

function datosObligatorios() {

    var exito = true;
    var controlesObligarios = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligarios.length;
    for (var i = 0; i < ncontroles; i++) {

        if (controlesObligarios[i].value == "") {
            exito = false;
            controlesObligarios[i].parentNode.classList.add("error");
        } else {
            controlesObligarios[i].parentNode.classList.remove("error");
        }
    }
    return exito;
}

function abrirModal(id) {

    var controlesObligarios = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligarios.length;

    for (var i = 0; i < ncontroles; i++) {
        controlesObligarios[i].parentNode.classList.remove("error");
    }

    if (id == 0) {
        borrarDatos();

    } else {

        $.get("recuperarPeriodo/Periodo/?id_periodo=" + id, function (data) {
            document.getElementById("txtidPeriodo").value = data[0].IIDPERIODO;
            document.getElementById("txtNombre").value = data[0].NOMBRE;
            document.getElementById("datepickerInicio").value = data[0].FECHAINICADENA;
            document.getElementById("datepickerFin").value = data[0].FECHAFINCADENA;

        });
    }

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


function agregar() {

    if (datosObligatorios() == true) {

        var frm = new FormData();
        var idperido = document.getElementById("txtidPeriodo").value;
        var nombre = document.getElementById("txtNombre").value;
        var fechaini = document.getElementById("datepickerInicio").value;
        var fechafin = document.getElementById("datepickerFin").value;

        frm.append("IIDPERIODO", idperido);
        frm.append("NOMBRE", nombre);
        frm.append("FECHAINICIO", fechaini);
        frm.append("FECHAFIN", fechafin);
        frm.append("BHABILITADO", 1);

        if (confirm("Desea realizar la operación?") == 1) {

            $.ajax({
                type: "POST",
                url: "guardarDatos/Periodo",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {

                    if (data != 0) {
                        listar();
                        alert("Se ejecuto correctamente");
                        document.getElementById("btnCancelar").click();
                    } else {
                        alert("Ocurrio un Error");
                    }
                }
            });
        }
    }
}
