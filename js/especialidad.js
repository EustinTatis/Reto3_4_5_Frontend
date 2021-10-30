function traerInformacionEspecialidades(){
    $.ajax({
        url:"http://144.22.238.54:8080/api/Specialty/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta1(respuesta);
        }
    });
}

function pintarRespuesta1(respuesta){
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button  onclick=' actualizarInformacionEspecialidades("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button  onclick='borrarEspecialidades("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

function guardarInformacionEspecialidades(){
    let var2 = {
        name:$("#Cname").val(),
        description:$("#Cdescription").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://144.22.238.54:8080/api/Specialty/save",
        success:function(response) {
            console.log(response);
        console.log("Especialidad guardada correctamente");
        alert("Especialidad guardada correctamente");
        window.location.reload()
    },
    
    error: function(jqXHR, textStatus, errorThrown) {
          window.location.reload()
        alert("La especialidad NO se guardo correctamente");
    }
    });
}

function obtenerItemEspecifico(idElemento) {
    $.ajax({
      dataType: "json",
      url: "http://144.22.238.54:8080/api/Specialty/"+idElemento,
      type: "GET",
      success: function (response) {
        console.log(response);
        var item = response.items[0];
  
        $("#id").val(item.id);
        $("#Cname").val(item.name);
        $("#Cdescription").val(item.description);
      },
    });
  }

function actualizarInformacionEspecialidades(idElemento){
    let myData={
        id:idElemento,
        name:$("#Cname").val(),
        description:$("#Cdescription").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.238.54:8080/api/Specialty/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#Cname").val("");
            $("#Cdescription").val("");
            traerInformacionEspecialidades();
            alert("Especialidad actualizada correctamente.")
        }
    });
}

function borrarEspecialidades(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.238.54:8080/api/Specialty/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionEspecialidades();
            alert("Especialidad eliminada correctamente.")
        }
    });
}
