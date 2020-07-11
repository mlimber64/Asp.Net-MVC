var btnSumar = document.getElementById("btnSumar");

btnSumar.onclick = function () {
    var nro1 = document.getElementById("txtnro1").value * 1;
    var nro2 = document.getElementById("txtnro2").value * 1;

    var suma = nro1 + nro2;

    document.getElementById("lblRespuesta").innerHTML = "La suma es: " + suma;

}

var btnLimpiar = document.getElementById("btnLimpiar");
btnLimpiar.onclick = function () {
    document.getElementById("txtnro1").value = "";
    document.getElementById("txtnro2").value = "";
    document.getElementById("lblRespuesta").innerHTML = "";

}