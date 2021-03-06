﻿listar();

function listar() {
    $.get("findAllCurso", "Curso", function (data) {
        crearListado(["ID", "NOMBRE","DESCRIPCION"], data);
    });
}


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

function crearListado(arrayColumnas, data) {

    var contenido = "";

    contenido += "<table id='tabla-curso' class='table table-bordered table-striped'>";
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
        contenido += "<button class='btn btn-danger' onclick='eliminar(" + data[i][llaveId] +")'><i class='glyphicon glyphicon-trash'></i></button>";
        contenido += "</td>";
        contenido += "</tr>";
    }

    contenido += "</tbody>";
    contenido += "</table>";
    document.getElementById("tabla").innerHTML = contenido;
    $("#tabla-curso").dataTable({

        searching: false
    });
}

function eliminar(id) {

    var frm = new FormData();
    frm.append("IIDCURSO", id);
    if (confirm("¿Desea realmente elinar este registro?") == 1) {

        $.ajax({
            type: "POST",
            url: "elininarCurso/Curso",
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

function abrirModal(id) {

    var controlesObligarios = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligarios.length;

    for (var i = 0; i < ncontroles; i++) {
        controlesObligarios[i].parentNode.classList.remove("error");
    }

    if (id == 0) {
        borrarDatos();

    } else {

        $.get("repuerarDatos/Curso/?id_curso=" + id, function (data) {
            document.getElementById("txtidCurso").value = data[0].IIDCURSO;
            document.getElementById("txtNombreCurso").value = data[0].NOMBRE;
            document.getElementById("txtDescripcion").value = data[0].DESCRIPCION;

        });
    }
    
}

function borrarDatos() {

    var controles = document.getElementsByClassName("borrar");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {

        controles[i].value = "";
    }
}

function Agregar() {

    if (datosObligatorios() == true) {

        var frm = new FormData();
        var id = document.getElementById("txtidCurso").value;
        var nombre = document.getElementById("txtNombreCurso").value;
        var descripcion = document.getElementById("txtDescripcion").value;

        frm.append("IIDCURSO", id);
        frm.append("NOMBRE", nombre);
        frm.append("DESCRIPCION", descripcion);
        frm.append("BHABILITADO", 1);

        if (confirm("¿Desea realmente guardar?") == 1) {

            $.ajax({
                type: "POST",
                url: "guardarDatos/Curso",
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