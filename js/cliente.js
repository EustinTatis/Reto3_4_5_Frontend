function traerInformacionClientes(){
    $.ajax({
        url:"http://144.22.238.54:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta3(respuesta);
        }
    });
}

function pintarRespuesta3(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button  onclick=' actualizarInformacionClientes("+respuesta[i].idClient+")'>Actualizar</button>";
        myTable+="<td> <button  onclick='borrarClientes("+respuesta[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}

function guardarInformacionClientes(){
    let var2 = {
        email:$("#Cemail").val(),
        password:$("#Cpassword3").val(),
        name:$("#Cname3").val(),
        age:$("#Cage3").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://144.22.238.54:8080/api/Client/save",
        success:function(response) {
            console.log(response);
        console.log("Se guardo correctamente");
        alert("Cliente guardado correctamente");
        window.location.reload()
    },
    
    error: function(jqXHR, textStatus, errorThrown) {
          window.location.reload()
        alert("No se guardo correctamente");
    }
    });
}

function actualizarInformacionClientes(idElemento){
    let myData={
        idClient:idElemento,
        email:$("#Cemail3").val(),
        password:$("#Cpassword3").val(),
        name:$("#Cname3").val(),
        age:$("#Cage3").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.238.54:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idClient").val("");
            $("#Cemail").val("");
            $("#Cpassword3").val("");
            $("#Cname3").val("");
            $("#Cage3").val("");
            traerInformacionClientes();
            alert("Cliente actualizado correctamente.")
        }
    });
}

function borrarClientes(idElemento){
    let myData={
        idClient:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.238.54:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionClientes();
            alert("Cliente eliminado correctamente.")
        }
    });
}