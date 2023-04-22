function listar() {
    $.get("findAllGradoSeccion/GradoSeccion", function (data) {

        crearListado(["ID", "GRADO", "SECCION"], data);

    })

    $.get("findAllSeccion/GradoSeccion", function (data) {

        llenarCombo(data, document.getElementById("cboSeccion"), true);
    })

    $.get("findAllGrado/GradoSeccion", function (data) {

        llenarCombo(data, document.getElementById("cboGrado"), true);
    })
    
}

listar();

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
        contenido += "<button class='btn btn-danger' onclick='eliminar(" + data[i][llaveId] + ")'><i class='glyphicon glyphicon-trash'></i></button>";
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

        $.get("recuperarInformacion/GradoSeccion/?id_grado=" + id, function (data) {
            document.getElementById("txtIdGSeccion").value = data[0].IID;
            document.getElementById("cboGrado").value = data[0].IIDGRADO;
            document.getElementById("cboSeccion").value = data[0].IIDSECCION;

        });
    }

}


function agregar() {

    if (datosObligatorios() == true) {

        var frm = new FormData();
        var id = document.getElementById("txtIdGSeccion").value;
        var grado = document.getElementById("cboGrado").value;
        var seccion = document.getElementById("cboSeccion").value;

        frm.append("IID", id);
        frm.append("IIDGRADO", grado);
        frm.append("IIDSECCION", seccion);
        frm.append("BHABILITADO", 1);

        if (confirm("¿Desea realmente guardar?") == 1) {

            $.ajax({
                type: "POST",
                url: "guardarDatos/GradoSeccion",
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

        $.get("eliminar/GradoSeccion/?id_Grado=" + id, function (data) {
            if (data == 0) {
                alert("Ocurrio un error");
            } else {
                alert("Se elimino correctamente");
                listar();
            }
        })
    }
}
