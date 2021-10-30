function traerReporteStatus(){
    $.ajax({
        url:"http://144.22.238.54:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
    myTable+="</tr>";
    myTable+="</table>";
    $("#resultadoStatus").html(myTable);
}


function traerReporteClientes(){
    $.ajax({
        url:"http://144.22.238.54:8080/api/Reservation/report-clients",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}

function pintarRespuestaClientes(respuesta){
    let myTable="<table>";
    myTable+="<tr>";
      
    for(i=0;i<respuesta.length;i++){
    myTable+="<tr>";
        myTable+="<td>"+respuesta[i].total+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoClientes").html(myTable);
}
