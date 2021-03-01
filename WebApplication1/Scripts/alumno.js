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

function eliminar(id) {

    if (confirm("Desea eliminar") == 1) {

        $.get("eliminar/Alumno/?id_alumno=" + id, function (data) {
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

        $.get("recuperarAlumno/Alumno/?id_alumno=" + id, function (data) {
            document.getElementById("txtidPeriodo").value = data[0].IIDALUMNO;
            document.getElementById("txtNombre").value = data[0].NOMBRE;
            document.getElementById("txtapepa").value = data[0].APPATERNO;
            document.getElementById("txtapema").value = data[0].APMATERNO;
            document.getElementById("dtfechanac").value = data[0].FECHANAC;
            document.getElementById("cboSexopopup").value = data[0].IIDSEXO;
            document.getElementById("txttelfpa").value = data[0].TELEFONOPADRE;
            document.getElementById("txttelma").value = data[0].TELEFONOMADRE;
            document.getElementById("txtnroher").value = data[0].NUMEROHERMANOS;

        });
    }

}

function agregar() {

    if (datosObligatorios() == true) {

        var frm = new FormData();
        var idAlumno = document.getElementById("txtidPeriodo").value;
        var nombre = document.getElementById("txtNombre").value;
        var apepa = document.getElementById("txtapepa").value;
        var apema = document.getElementById("txtapema").value;
        var fechanac = document.getElementById("dtfechanac").value;
        var sexo = document.getElementById("cboSexopopup").value;
        var telpa = document.getElementById("txttelfpa").value;
        var telma = document.getElementById("txttelma").value;
        var nroher = document.getElementById("txtnroher").value;


        frm.append("IIDALUMNO", idAlumno);
        frm.append("NOMBRE", nombre);
        frm.append("APPATERNO", apepa);
        frm.append("APMATERNO", apema);
        frm.append("FECHANAC", fechanac);
        frm.append("IIDSEXO", sexo);
        frm.append("TELEFONOPADRE", telpa);
        frm.append("TELEFONOMADRE", telma);
        frm.append("NUMEROHERMANOS", nroher);
        frm.append("BHABILITADO", 1);

        if(confirm("Desea guardar los cambios") == 1){

            $.ajax({
                type: "POST",
                url: "guardarDatos/Alumno",
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