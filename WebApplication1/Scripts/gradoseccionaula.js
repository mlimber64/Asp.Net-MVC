listar();

var periodo = document.getElementById("cboPeriodo");
var gradoseccion = document.getElementById("cboGrado");

periodo.onchange = function () {

    if (periodo.value != "" && gradoseccion.value != "") {

        $.get("listarCursos/GradoSeccionAula/?idperiodo=" + periodo.value + "&idgradoseccion=" + gradoseccion.value, function (data) {

            llenarCombo(data, document.getElementById("cboCurso"), true);

        })
    }

}

gradoseccion.onchange = function () {

    if (periodo.value != "" && gradoseccion.value != "") {

        $.get("listarCursos/GradoSeccionAula/?idperiodo=" + periodo.value + "&idgradoseccion=" + gradoseccion.value, function (data) {

            llenarCombo(data, document.getElementById("cboCurso"), true);

        })
    }

}

function listar() {

    $.get("listar/GradoSeccionAula", function (data) {

        crearListado(["ID", "PERIODO", "GRADO", "CURSO", "DOCENTE"], data);
    })

    $.get("listarPeriodos/GradoSeccionAula", function (data) {

        llenarCombo(data, document.getElementById("cboPeriodo"), true);
    })

    $.get("listarGradoSeccion/GradoSeccionAula", function (data) {

        llenarCombo(data, document.getElementById("cboGrado"), true);
    })

    $.get("listarAula/GradoSeccionAula", function (data) {

        llenarCombo(data, document.getElementById("cboAula"), true);
    })

    $.get("listarDocente/GradoSeccionAula", function (data) {

        llenarCombo(data, document.getElementById("cboDocente"), true);
    })

    $.get("listarDocente/GradoSeccionAula", function (data) {

        llenarCombo(data, document.getElementById("cboDocente"), true);
    })

}









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

        $.get("recuperarInfo/GradoSeccionAula/?id_re=" + id, function (data) {
            document.getElementById("txtId").value = data[0].IID;
            document.getElementById("cboPeriodo").value = data[0].IIDPERIODO;
            document.getElementById("cboGrado").value = data[0].IIDGRADOSECCION;
            $.get("listarCursos/GradoSeccionAula/?idperiodo=" + periodo.value + "&idgradoseccion=" + gradoseccion.value, function (rpta) {

                llenarCombo(rpta, document.getElementById("cboCurso"), true);
                document.getElementById("cboCurso").value = data[0].IIDCURSO;
            })
            document.getElementById("cboDocente").value = data[0].IIDDOCENTE;
            document.getElementById("cboAula").value = data[0].IIDAULA;


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
        var docente = document.getElementById("cboDocente").value;
        var aula = document.getElementById("cboAula").value;

        frm.append("IID", id);
        frm.append("IIDPERIODO", periodo);
        frm.append("IIDGRADOSECCION", grado);
        frm.append("IIDCURSO", curso);
        frm.append("IIDDOCENTE", docente);
        frm.append("IIDAULA", aula);
        frm.append("BHABILITADO", 1);

        if (confirm("¿Desea realmente guardar?") == 1) {

            $.ajax({
                type: "POST",
                url: "guardarDatos/GradoSeccionAula",
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

        $.get("eliminar/GradoSeccionAula/?id_gr=" + id, function (data) {
            if (data == 0) {
                alert("Ocurrio un error");
            } else {
                alert("Se elimino correctamente");
                listar();
            }
        })
    }
}



