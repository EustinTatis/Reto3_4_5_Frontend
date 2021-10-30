function traerInformacionReservaciones(){
    $.ajax({
        url:"http://144.22.238.54:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta5(respuesta);
        }
    });
}

function pintarRespuesta5(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td> <button  onclick=' actualizarInformacionReservaciones("+respuesta[i].idReservation+")'>Actualizar</button>";
        myTable+="<td> <button  onclick='borrarReservaciones("+respuesta[i].idReservation+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado5").html(myTable);
}

function guardarInformacionReservaciones(){
    let var2 = {
        startDate:$("#Cstart5").val(),
        devolutionDate:$("#Cdevolution5").val(),
        status:$("#Ccreated").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://144.22.238.54:8080/api/Reservation/save",
        success:function(response) {
            console.log(response);
        console.log("Se guardo correctamente");
        alert("Reservación guardada correctamente");
        window.location.reload()
    },
    
    error: function(jqXHR, textStatus, errorThrown) {
          window.location.reload()
        alert("No se guardo correctamente");
    }
    });

}

function actualizarInformacionReservaciones(idElemento){
    let myData={
        idReservation:idElemento,
        startDate:$("#Cstart5").val(),
        devolutionDate:$("#Cdevolution5").val(),
        status:$("#Ccreated").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.238.54:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idReservation").val("");
            $("#Cstart5").val("");
            $("#Cdevolution5").val("");
            $("#Ccreated").val("");
            traerInformacionReservaciones();
            alert("Reservación actualizada correctamente.")
        }
    });
}

function borrarReservaciones(idElemento){
    let myData={
        idReservation:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.238.54:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionReservaciones();
            alert("Reservación eliminada correctamente.")
        }
    });
}

function autoInicioDoctor2(){
    console.log("Se está ejecutando")
    $.ajax({
        url:"http://144.22.238.54:8080/api/Doctor/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-doctor2");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    })
}

function autoInicioCliente2(){
    console.log("Se está ejecutando")
    $.ajax({
        url:"http://144.22.238.54:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-client2");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    })
}