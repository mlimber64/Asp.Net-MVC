﻿
function listar() {

    $.get("findAll/PeriodoGCurso", function (data) {

        crearListado(["ID", "PERIODO", "GRADO", "CURSO"], data);
    })

    $.get("comboPeriodo/PeriodoGradoCurso", function (data) {

        llenarCombo(data, document.getElementById("cboPeriodo"), true);
    })

    $.get("comboGrado/PeriodoGCurso", function (data) {

        llenarCombo(data, document.getElementById("cboGrado"), true);
    })

    $.get("comboCurso/PeriodoGCurso", function (data) {

        llenarCombo(data, document.getElementById("cboCurso"), true);
    })
}

listar();


function crearListado(arrayColumnas, data) {

    var contenido = "";

    contenido += "<table id='tabla-periodog' class='table table-bordered table-striped'>";
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
    $("#tabla-periodog").dataTable({

        searching: false
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

function borrarDatos() {

    var controles = document.getElementsByClassName("borrar");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {

        controles[i].value = "";
    }
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

        $.get("recuperarInfo/PeriodoGCurso/?id_pgc=" + id, function (data) {
            document.getElementById("txtId").value = data[0].IID;
            document.getElementById("cboPeriodo").value = data[0].IIDPERIODO;
            document.getElementById("cboGrado").value = data[0].IIDGRADO;
            document.getElementById("cboCurso").value = data[0].IIDCURSO;

        });
    }

}

function agregar() {

    if (datosObligatorios() == true) {

        var frm = new FormData();
        var id = document.getElementById("txtId").value;
        var periodo = document.getElementById("cboPeriodo").value;
        var grado = document.getElementById("cboGrado").value;
        var curso = document.getElementById("cboCurso").value;

        frm.append("IID", id);
        frm.append("IIDPERIODO", periodo);
        frm.append("IIDGRADO", grado);
        frm.append("IIDCURSO", curso);
        frm.append("BHABILITADO", 1);

        if (confirm("¿Desea realmente guardar?") == 1) {

            $.ajax({
                type: "POST",
                url: "guardarDatos/PeriodoGCurso",
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


    } else {

    }
}


function eliminar(id) {

    if (confirm("Desea eliminar") == 1) {

        $.get("eliminar/PeriodoGCurso/?id_periodo=" + id, function (data) {
            if (data == 0) {
                alert("Ocurrio un error");
            } else {
                alert("Se elimino correctamente");
                listar();
            }
        })
    }
}