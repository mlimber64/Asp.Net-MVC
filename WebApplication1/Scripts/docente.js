llenarComboSexoAlumno();
listar();

function llenarComboSexoAlumno() {

    $.get("findAllSexo","Docente", function (data) {

        llenarCombo(data, document.getElementById("combosexopopup"), true);
    });
}




function listar() {

    $.get("findAllDocente/Docente", function (data) {

        crearListado(["ID","NOMBRE","APELLIDO PATERNO","APELLIDO MATERNO","EMAIL"],data);

    });

   

    $.get("findAllModalidadContrato/Docente", function (data) {

        llenarCombo(data, document.getElementById("cboTipoModalidad"), true);
        llenarCombo(data, document.getElementById("cbomodalidadpopup"), true);

    });

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
$.get("findAllSexo", "Alumno", function (data) {

    llenarCombo(data, document.getElementById("combosexo"), true);
    llenarCombo(data, document.getElementById("combosexopopup"), true);
});

function eliminar(id) {

    if (confirm("Desea eliminar") == 1) {

        $.get("eliminar/Docente/?id_docente=" + id, function (data) {
            if (data == 0) {
                alert("Ocurrio un error");
            } else {
                alert("Se elimino correctamente");
                listar();
            }
        })
    }
}

function borrarDatos() {

    var controles = document.getElementsByClassName("borrar");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {

        controles[i].value = "";
    }
}

function obligatorio() {

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

        $.get("recuperarDocente/Docente/?id_docente=" + id, function (data) {
            document.getElementById("txtiddocente").value = data[0].IIDDOCENTE;
            document.getElementById("txtNombre").value = data[0].NOMBRE;
            document.getElementById("txtApePat").value = data[0].APPATERNO;
            document.getElementById("txtapemat").value = data[0].APMATERNO;
            document.getElementById("txtdirecciom").value = data[0].DIRECCION;
            document.getElementById("txttelefonocel").value = data[0].TELEFONOCELULAR;
            document.getElementById("txttelefonofijo").value = data[0].TELEFONOFIJO;
            document.getElementById("txtemail").value = data[0].EMAIL;
            document.getElementById("combosexopopup").value = data[0].IIDSEXO;
            document.getElementById("txtfechacontrato").value = data[0].FECHACON;
            document.getElementById("cbomodalidadpopup").value = data[0].IIDMODALIDADCONTRATO;
            document.getElementById("imgfoto").src = "data:image/png;base64," + data[0].FOTOMOSTRAR;
            

        });
    }

}

function agregar() {

    if (datosObligatorios() == true) {

        var frm = new FormData();
        var iddocente = document.getElementById("txtiddocente").value;
        var nombre = document.getElementById("txtNombre").value;
        var apepa = document.getElementById("txtApePat").value;
        var apema = document.getElementById("txtapemat").value;
        var direccion = document.getElementById("txtdirecciom").value;
        var telcel = document.getElementById("txttelefonocel").value;
        var telfijo = document.getElementById("txttelefonofijo").value;
        var email = document.getElementById("txtemail").value;
        var sexo = document.getElementById("combosexopopup").value;
        var fechacon = document.getElementById("txtfechacontrato").value;
        var foto = document.getElementById("imgfoto").src.replace("data:image/png;base64,", "");
        var modal = document.getElementById("cbomodalidadpopup").value;


        frm.append("IIDDOCENTE", iddocente);
        frm.append("NOMBRE", nombre);
        frm.append("APPATERNO", apepa);
        frm.append("APMATERNO", apema);
        frm.append("DIRECCION", direccion);
        frm.append("TELEFONOCELULAR", telcel);
        frm.append("TELEFONOFIJO", telfijo);
        frm.append("EMAIL", email);
        frm.append("IIDSEXO", sexo);
        frm.append("FECHACONTRATO", fechacon);
        frm.append("cadenaFoto", foto);
        frm.append("IIDMODALIDADCONTRATO", modal);
        frm.append("BHABILITADO", 1);

        if (confirm("Desea guardar los cambios") == 1) {

            $.ajax({
                type: "POST",
                url: "guardarDatos/Docente",
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

var btnFoto = document.getElementById("btnFoto");

btnFoto.onchange = function (e) {

    var file = document.getElementById("btnFoto").files[0];
    var reader = new FileReader();
    if (reader != null) {

        reader.onloadend = function () {
            var img = document.getElementById("imgfoto");
            img.src = reader.result;
        }
    }
    reader.readAsDataURL(file);

}