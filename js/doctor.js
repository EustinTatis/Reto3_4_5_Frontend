function traerInformacionDoctor(){
    $.ajax({
        url:"http://144.22.238.54:8080/api/Doctor/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta2(respuesta);
        }
    });
}

function pintarRespuesta2(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].department+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button  onclick=' actualizarInformacionDoctor("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button  onclick='borrarDoctor("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}

function guardarInformacionDoctor(){
    let var2 = {
        name:$("#Cname2").val(),
        department:$("#Cdepartament2").val(),
        year:$("#Cyear2").val(),
        description:$("#Cdescription2").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://144.22.238.54:8080/api/Doctor/save",
        success:function(response) {
            console.log(response);
        console.log("Se guardo correctamente");
        alert("Doctor guardado correctamente");
        window.location.reload()
    },
    
    error: function(jqXHR, textStatus, errorThrown) {
          window.location.reload()
        alert("No se guardo correctamente");
    }
    });
}

function actualizarInformacionDoctor(idElemento){
    let myData={
        id:idElemento,
        name:$("#Cname2").val(),
        department:$("#Cdepartament2").val(),
        year:$("#Cyear2").val(),
        description:$("#Cdescription2").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.238.54:8080/api/Doctor/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#Cname2").val("");
            $("#Cdepartament2").val("");
            $("#Cyear2").val("");
            $("#Cdescription2").val("");
            traerInformacionDoctor();
            alert("Doctor actualizado correctamente.")
        }
    });
}

function borrarDoctor(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.238.54:8080/api/Doctor/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionDoctor();
            alert("Doctor eliminado correctamente.")
        }
    });
}

function autoInicioEspecialidades(){
    console.log("Se está ejecutando")
    $.ajax({
        url:"http://144.22.238.54:8080/api/Specialty/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-specialty");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    })
}


