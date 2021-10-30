function traerInformacionMensajes(){
    $.ajax({
        url:"http://144.22.238.54:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta4(respuesta);
        }
    });
}

function pintarRespuesta4(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td> <button  onclick=' actualizarInformacionMensajes("+respuesta[i].idMessage+")'>Actualizar</button>";
        myTable+="<td> <button  onclick='borrarMensajes("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);
}

function guardarInformacionMensajes(){
    let var2 = {
        messageText:$("#Cmessage4").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://144.22.238.54:8080/api/Message/save",
        success:function(response) {
            console.log(response);
        console.log("Mensaje guardado correctamente");
        alert("Mensaje guardado correctamente");
        window.location.reload()
    },
    
    error: function(jqXHR, textStatus, errorThrown) {
          window.location.reload()
        alert("No se guardo correctamente");
    }
    });
}

function actualizarInformacionMensajes(idElemento){
    let myData={
        idMessage:idElemento,
        messageText:$("#Cmessage4").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.238.54:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idMessage").val("");
            $("#Cmessage4").val("");
            traerInformacionMensajes();
            alert("Mensaje actualizado correctamente.")
        }
    });
}

function borrarMensajes(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.238.54:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionMensajes();
            alert("Mensaje eliminado correctamente.")
        }
    });
}

function autoInicioDoctor(){
    console.log("Se está ejecutando")
    $.ajax({
        url:"http://144.22.238.54:8080/api/Doctor/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-doctor");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    })
}

function autoInicioCliente(){
    console.log("Se está ejecutando")
    $.ajax({
        url:"http://144.22.238.54:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    })
}