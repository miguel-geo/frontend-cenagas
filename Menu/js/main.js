var apiUrl = "http://localhost/cenagas/backend/public/api/"; // la url del api guardada en el config.json de la aplicacion
var ducto;
var tramo;
var area;
var txtducto;
var txttramo;
var txtarea;
var kminicial;
var kmfinal;
var kmorigen;
var kmdestino;
var ductocon;
var tramocon;
var areacon;
var temaconsulta = "";
var docbasecons = "";
var temaconsultaconstruccion = "";
var temaconsultadisenio = "";
var area_unitaria_id;
var contar_longitud=0;
const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
});



$(document).ready(function () {
   
   
    llenar_ductos();
    //loadidentificacion();
    $('.custom-file-input').on('change', function(event) {
        var inputFile = event.currentTarget;
        $(inputFile).parent()
            .find('.custom-file-label')
            .html(inputFile.files[0].name);
    }); 

    $('#logoutBtn').click(function() {
        logoutFunction()
    });
    //$('#tablaPersonas').DataTable();
    //$('.dataTables_length').addClass('bs-select');

    document.getElementById("cmbTramo").addEventListener("change", function() {
        var imageElement = document.getElementById("myImage");
        console.log(this.value)
        if (this.value == "1") {
            // Change to the first image
            imageElement.src = "images/tramo1.jpg";
        } else if (this.value == "2") {
            // Change to the second image
            imageElement.src = "images/tramo2.jpg";
        }
    });



    
    var navListItems = $('div.setup-panel div a'),
            allWells = $('.setup-content'),
            allNextBtn = $('.nextBtn');
            
    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
                $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allNextBtn.click(function(){
                 var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });
  

    $('div.setup-panel div a.btn-primary').trigger('click');
    inicializarEventos();
    
   // loadPersonas();
   // $('#loginModal').modal('hide');
    //$(function () {
    //    $('[data-toggle="tooltip"]').tooltip()
    //})
    //$('#formularios').hide();
    //$('#loginModal').show();




    $('#cmbDucto').change(function() {
        
      });


      //$('#cmbTramo').change(function() {
    
      //});


      $('#cmbAreas').change(function() {
        var property = $(this).val();


        const webMethod='areas_unitarias/fetch_kms';
        url=apiUrl+webMethod;
        if (property) {
          
          fetch(url, {
            method: 'POST', // or 'POST', 'PUT', etc.
            headers: headers,
            body: JSON.stringify({'property': property})
          })
              .then(response => response.json())
              .then(data => {
                console.log(data)
                document.getElementById('txtkminicial').value = data[0].km_inicial;
                document.getElementById('txtkmfinal').value = data[0].km_final;
                document.getElementById('txtkmOrigen').value = data[0].km_origen;
                document.getElementById('txtkmDestino').value = data[0].km_destino;

              })
              .catch(error => console.error("Error fetching data: ", error));
        }
      });



});

function showotroMaterial() {
    $('#espMaterial').show();
}


function showtipotecnica() {
    $('#creartipotecnicaunion').show();
}
function showtiporecubrimiento() {
    $('#creartiporecubrimiento').show();
}

function showotroTipoUbicacion() {
    $('#creartipoubicacionunion').show();
}

function showproteccioncatodica() {
    $('#crearproteccioncatodica').show();
}

function showotroTipoInstalacion() {
    $('#creartipoinstalacion').show();
}
function espCostura() {
    $('#espCostura').show();
}
function loadAreas() {
    $("#cmbAreas option:not(:first)").remove();
    var property = $("#cmbTramo").val();
    const webMethod = 'areas_unitarias/fetch';
    url = apiUrl + webMethod;
    if (property) {

        fetch(url, {
            method: 'POST', // or 'POST', 'PUT', etc.
            headers: headers,
            body: JSON.stringify({ 'property': property })
        })
            .then(response => response.json())
            .then(data => {

                $("#cmbAreas").empty();
                $('#cmbAreas').append($('<option>', {
                    value: 0,
                    text: 'Selecciona...'
                }));
                for (var i = 0; i < data.length; i++) {
                    $('#cmbAreas').append($('<option>', {
                        value: data[i].id,
                        text: data[i].nombre
                    }));
                }
            })
            .catch(error => console.error("Error fetching data: ", error));
    }
}
function loadSegmentosCon() {
    $("#cmbSegmento_con option:not(:first)").remove();
    var property = $("#cmbTramo_con").val();
    const webMethod = 'segmentos/fetch';
    url = apiUrl + webMethod;
    if (property) {

        fetch(url, {
            method: 'POST', // or 'POST', 'PUT', etc.
            headers: headers,
            body: JSON.stringify({ 'property': property })
        })
            .then(response => response.json())
            .then(data => {

                $("#cmbSegmento_con").empty();
                $('#cmbSegmento_con').append($('<option>', {
                    value: 0,
                    text: 'Selecciona...'
                }));
                for (var i = 0; i < data.length; i++) {
                    $('#cmbSegmento_con').append($('<option>', {
                        value: data[i].id,
                        text: data[i].clave_segmento
                    }));
                }
            })
            .catch(error => console.error("Error fetching data: ", error));
    }
}
function loadAreasCon() {
    $("#cmbAreas_con option:not(:first)").remove();
    var property = $("#cmbSegmento_con").val();
    const webMethod = 'areas_unitarias/fetchCon';
    url = apiUrl + webMethod;
    if (property) {

        fetch(url, {
            method: 'POST', // or 'POST', 'PUT', etc.
            headers: headers,
            body: JSON.stringify({ 'property': property })
        })
            .then(response => response.json())
            .then(data => {

                $("#cmbAreas_con").empty();
                $('#cmbAreas_con').append($('<option>', {
                    value: 0,
                    text: 'Selecciona...'
                }));
                for (var i = 0; i < data.length; i++) {
                    $('#cmbAreas_con').append($('<option>', {
                        value: data[i].id,
                        text: data[i].nombre
                    }));
                }
            })
            .catch(error => console.error("Error fetching data: ", error));
    }
}
function loadTramos() {
    $("#cmbTramo option:not(:first)").remove();
    var property = $("#cmbDucto").val();
    const webMethod = 'tramos/fetch';
    url = apiUrl + webMethod;
    if (property) {

        fetch(url, {
            method: 'POST', // or 'POST', 'PUT', etc.
            headers: headers,
            body: JSON.stringify({ 'property': property })
        })
            .then(response => response.json())
            .then(data => {
                $("#cmbTramo").empty();
                $('#cmbTramo').append($('<option>', {
                    value: 0,
                    text: 'Selecciona...'
                }));
                for (var i = 0; i < data.length; i++) {
                    $('#cmbTramo').append($('<option>', {
                        value: data[i].id,
                        text: data[i].nombre
                    }));
                }
            })
            .catch(error => console.error("Error fetching data: ", error));
    }
    
}
function loadTramosCon() {
    $("#cmbTramo_con option:not(:first)").remove();
    var property = $("#cmbDucto_con").val();
    const webMethod = 'tramos/fetch';
    url = apiUrl + webMethod;
    if (property) {

        fetch(url, {
            method: 'POST', // or 'POST', 'PUT', etc.
            headers: headers,
            body: JSON.stringify({ 'property': property })
        })
            .then(response => response.json())
            .then(data => {
                $("#cmbTramo_con").empty();
                $('#cmbTramo_con').append($('<option>', {
                    value: 0,
                    text: 'Selecciona...'
                }));
                for (var i = 0; i < data.length; i++) {
                    $('#cmbTramo_con').append($('<option>', {
                        value: data[i].id,
                        text: data[i].nombre
                    }));
                }
            })
            .catch(error => console.error("Error fetching data: ", error));
    }

}
function inicializarEventos() {

    document.getElementById('filepruebabasecons').addEventListener('change', handleFileSelect, false);
    $(document).on("click", ".delete", function (e) {
        temaconsulta=$("#cmbTemasPrincipal_con").val() ;
        temaconsultadisenio=$("#cmbTemasDisenio_con").val() ;
        temaconsultaconstruccion=$("#cmbTemasConstruccion_con").val() ;

        if(confirm("¿Seguro quiere borrar ese registro?")) {

        console.log(temaconsulta,temaconsultadisenio,temaconsultaconstruccion)
        var webMethod = "";
        switch (temaconsulta) {
            case "T1":
                console.log("T1")
                switch(temaconsultadisenio){
                    case "Dis1":
                        webMethod = "disenio_general/destroy";
                        break;
                    case "Dis2":
                        webMethod = "disenio_presion/destroy";
                        break;
                    case "Dis3":
                        webMethod = "disenio_proteccion/destroy";
                        break;
                    default:}
                break;
            case "T2":
                switch(temaconsultaconstruccion){
                    case "Cons1":
                        webMethod = "general/destroyBase";
                        break;
                    case "Cons2":
                        webMethod = "union/destroyUnion";
                        break;
                    case "Cons3":
                        webMethod = "profundidad/destroyProfundidad";
                        break;
                    case "Cons4":
                        webMethod = "cruces/destroycruces";
                        break;
                    case "Cons5":
                        webMethod = "hermeticidad/destroyHermeticidad";
                        break;
                    case "Cons6":
                        webMethod = "";
                        break;
                    case "Cons7":
                        webMethod = "catodica/destroycatodica";
                        break;
                    case "Cons8":
                        webMethod = "";
                        break;

                        
                    default:}
                    break;
        }
        var params = {
            id: e.currentTarget.dataset["id"] ,
        };
        $.ajax({
            type: "POST",
            url: apiUrl + webMethod,
            data: params,
            success: function (data) {
                alert("El registro fue eliminado correctamente");
                consulta();
            },
            error: function (xhr, ajaxOptions, thrownError) {

            }
        });  
    }   
    });
    $(document).on("click", ".edit", function (e) {
        
        let row_id = e.currentTarget.dataset["id"];

        
    
        switch (temaconsulta) {
            case "T1":
                switch (temaconsultadisenio) {
                    case "Dis1":
                        consultatoform(e)
                        getAreaIdById("getAreaIdByDisenioId", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            fnshowIndentificacion(id_d=row_id);
                        });

                        break;
                    case "Dis2":
                        consultatoform(e)
                        getAreaIdById("getAreaIdByPresionId", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            fnshowPresion(id_d=row_id);
                        });
                        break;
                    case "Dis3":
                        consultatoform(e)
                        getAreaIdById("getAreaIdByProteccionId", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            fnshowProteccion(id_d=row_id);
                        });
                        break;
                    default:
                }
                break;
            case "T2":
                switch (temaconsultaconstruccion) {
                    case "Cons1":
                        
                        consultatoform(e)
                        getAreaIdById("getAreaIdByConsBaseId",row_id ).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area=data.area_unitaria_id;
                            fnshowbaseconst(id_d=row_id);
                        });
                        break;
                    case "Cons2":
                        
                        consultatoform(e)
                        getAreaIdById("getAreaIdByConsUnionId",row_id ).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area=data.area_unitaria_id;
                            fnshowmetunion(id_d=row_id);
                        });
                        break;
                    case "Cons3":
                        consultatoform(e)
                        getAreaIdById("getAreaIdByConsProfundidadId",row_id ).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area=data.area_unitaria_id;
                            fnshowprofenterrado(id_d=row_id);
                        });
                        break;
                    case "Cons4":
                        webMethod = "cruces/destroycruces";
                        consultatoform(e);
                        getAreaIdById("getAreaIdByCrucesId", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            fnshowprotipocruces(id_d=row_id);
                        });
                        break;
                    case "Cons5"://getAreaIdByHermeticidadId
                        consultatoform(e);
                        getAreaIdById("getAreaIdByHermeticidadId", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            fnshowhermeti(id_d=row_id);
                        });
                        break;
                    case "Cons6":
                        consultatoform(e);
                        getAreaIdById("getConstruccionInspeccionById", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            fnshowreporteinsp(id_d = row_id);
                        });
                        break;
                    case "Cons7":
                        consultatoform(e);
                        getAreaIdById("getAreaIdByCatodicaId", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            fnshowprotecccato(id_d=row_id);
                        });
                        break;
                    case "Cons8":
                        consultatoform(e);
                        getAreaIdById("getConstruccionSeguridadById", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            fnshowseguridadpre(id_d = row_id);
                        });
                        break;


                    default:
                }
                break;
        }
    });
    $(document).on("click", ".add", function (e) {
        var empty = false;
        
        var valores=[];
        var input = $(this).parents("tr").find('input[type="text"]');
        valores.push(e.currentTarget.dataset["id"]);
        input.each(function () {
            valores.push($(this).val());
           // alert($(this).val());
            if (!$(this).val()) {
                $(this).addClass("error");
                empty = true;
            } else {
                $(this).removeClass("error");
            }
        });
        $(this).parents("tr").find(".error").first().focus();
        if (!empty) {
            input.each(function () {
                $(this).parent("td").html($(this).val());
            });
            var webMethod = "";
            temaconsulta=$("#cmbTemasPrincipal_con").val() ;
        temaconsultadisenio=$("#cmbTemasDisenio_con").val() ;
        temaconsultaconstruccion=$("#cmbTemasConstruccion_con").val() ;
        console.log(valores)
        var params = {               
        };
        var webMethod = "";
        switch (temaconsulta) {
            case "T1":
                switch(temaconsultadisenio){
                    case "Dis1":
                        webMethod = "disenio_general/update";
                        params = {
                            id: valores[0],
                            coordenada_especifica: valores[2],
                            kilometro_especifico: valores[3],
                            C_0201_0006: valores[4],
                            C_0202_0007: valores[5],
                            C_0207_0027: valores[6],
                            C_0210_0031: valores[7]
                    };
                        break;
                    case "Dis2":
                        webMethod = "disenio_presion/update";
                        params = {
                            id: valores[0],
                            coordenada_especifica: valores[2],
                            kilometro_especifico: valores[3],
                            C_0206_0017: valores[4],
                            C_0206_0019: valores[5],
                            C_0206_0023: valores[6],
                            C_0206_0024: valores[7]
                        };
                        break;
                    case "Dis3":
                        webMethod = "disenio_proteccion/update";
                        params = {
                            id: valores[0],
                            coordenada_especifica: valores[2],
                            kilometro_especifico: valores[3],
                            C_0211_0043: valores[4],
                            C_0211_0044: valores[5],
                            C_0211_0045: valores[6],
                            C_0211_0046: valores[7]
                        };
                        break;
                    default:}
                    break;
            case "T2":
                switch(temaconsultaconstruccion){
                    case "Cons1":
                        webMethod = "general/updateBaseCons";
                        params = {
                            id: valores[0],
                            coordenada_especifica: valores[2],
                            kilometro_especifico: valores[3],
                            C_0211_0043: valores[4],
                            C_0211_0044: valores[5],
                            C_0211_0045: valores[6],
                            C_0211_0046: valores[7]
                        };
                        break;
                    case "Cons2":
                        webMethod = "union/updateUnion";
                        break;
                    case "Cons3":
                        webMethod = "profundidad/updateProfundidad";
                        break;
                    case "Cons4":
                        webMethod = "cruces/updateCruces";
                        break;
                    case "Cons5":
                        webMethod = "hermeticidad/updateHermeticidad";
                        break;
                    case "Cons6":
                        webMethod = "";
                        break;
                    case "Cons7":
                        webMethod = "catodica/updateCatodica";
                        break;
                    case "Cons8":
                        webMethod = "";
                        break;                    
                    default:}
                    break;
        }
            
            switch (temaconsulta) {
                case "T1":
                    limpiarTabas();
                    $("#tablaPersonas > tbody").empty();
                    $("#tablaPersonas").show();
                    $("#tablapresion").hide();
                    $("#datapresioncons").hide();
                    $("#dataGeneral").show();
                    $("#tablaproteccion").hide();
                 break;
                case "T2":
                    limpiarTabas();               
                    $("#tablaPersonas").hide();
                    $("#tablapresion").show();
                    $("#datapresioncons").show();
                    $("#dataGeneral").hide();
                    $("#tablaproteccion").hide();
                    
                    $("#datadisenioproteccion").hide();
                break;
                case "T3":
                    limpiarTabas();
                    $("#datapresioncons").hide();
                    $("#dataGeneral").hide();
                    $("#tablaPersonas").hide();
                    $("#tablapresion").hide();
                    $("#tablaproteccion").show();
                    $("#datadisenioproteccion").hide();
                break;
            }

            $.ajax({
                type: "POST",
                url: apiUrl + webMethod,
                headers: {
                    'Accept': 'application/json'
                },
                data: params,
                success: function (data) {
                    alert("El registro fue actualizado correctamente");
                    consulta();
                },
                error: function (xhr, ajaxOptions, thrownError) {

                }
            });
            $("#ra" + e.currentTarget.dataset["id"]).hide();
            $("#re" + e.currentTarget.dataset["id"]).show();
        }
       
       
    });   
    
    //Combo Ductos  
    const selectDucto = document.getElementById('cmbDucto');
    selectDucto.addEventListener('change', function handleChange(event) {
        ducto = event.target.value;
        txtducto = event.target[event.target.selectedIndex].text;
        loadTramos(event.target.value);
    });
    //Combo Tramos
    const selectTramos = document.getElementById('cmbTramo');
    selectTramos.addEventListener('change', function handleChange(event) {
        tramo = event.target.value;
        txttramo = event.target[event.target.selectedIndex].text;
        loadAreas(event.target.value);
    });
    //Combo Areas
    const selectAreas = document.getElementById('cmbAreas');
    selectAreas.addEventListener('change', function handleChange(event) {
        area = event.target.value;
        txtarea = event.target[event.target.selectedIndex].text;
        kminicial = $('#cmbAreas option:selected').data('kminicial');
        kmfinal = $('#cmbAreas option:selected').data('kmfinal');
        kmorigen = $('#cmbAreas option:selected').data('kmorigen');
        kmdestino = $('#cmbAreas option:selected').data('kmdestino');
        $("#txtkminicial").val(kminicial);
        $("#txtkmfinal").val(kmfinal);
        $("#txtkmOrigen").val(kmorigen);
        $("#txtkmDestino").val(kmdestino);
    });
    $("#tablaPersonas tr").click(function () {

        $(".clickableRow").on("click", function () {
            $(".highlight").removeClass("highlight");
            $(this).addClass("highlight");

        });
    });
        //Combo Tramos Ducto
    const selectDuctoCon = document.getElementById('cmbDucto_con');
    selectDuctoCon.addEventListener('change', function handleChange(event) {
        ductocon = event.target.value;
        loadTramosCon(event.target.value);
    });
    //Combo Tramos Consulta
    const selectTramosCon = document.getElementById('cmbTramo_con');
    selectTramosCon.addEventListener('change', function handleChange(event) {
        tramocon = event.target.value;
        //loadAreasCon(event.target.value);
        loadSegmentosCon(event.target.value);
    });

    //Combo Segmento Consulta
    const selectSegmentoCon = document.getElementById('cmbSegmento_con');
    selectSegmentoCon.addEventListener('change', function handleChange(event) {
        tramocon = event.target.value;
        loadAreasCon(event.target.value);
    });

    //Combo Areas Consulta
    const selectAreasCon = document.getElementById('cmbAreas_con');
    selectAreasCon.addEventListener('change', function handleChange(event) {
        areaCon = event.target.value;
    });
    //Combo Temas
    const selectTemas = document.getElementById('cmbTemasPrincipal_con');
    selectTemas.addEventListener('change', function handleChange(event) {
        temaconsulta = event.target.value;
        switch (event.target.value) {
            case "T1":                
                $("#cmbTemasDisenio_con").show();
                $("#cmbTemasConstruccion_con").hide();
             break;
            case "T2":
                $("#cmbTemasDisenio_con").hide();
                $("#cmbTemasConstruccion_con").show()
            break;
            case "T3":
                //Aún no existe
            break;
            default:
        }
        tramo = event.target.value;
        txttramo = event.target[event.target.selectedIndex].text;
        loadAreas(event.target.value);
    });
    //Combo Tema Diseño
    const selectTemasDisenio = document.getElementById('cmbTemasDisenio_con');
    selectTemasDisenio.addEventListener('change', function handleChange(event) {
        temaconsultadisenio = event.target.value;
        switch (event.target.value) {
            case "Dis1":
                limpiarTabas();
                OcultarConstruccionConsulta();
            $("#tablaPersonas > tbody").empty();
            $("#tablaPersonas").show();
            $("#tablapresion").hide();
            $("#datapresioncons").hide();
            $("#dataGeneral").show();
                $("#tablaproteccion").hide();
                $("#datadisenioproteccion").hide(); 
            break;
            case "Dis2":
                limpiarTabas();
                OcultarConstruccionConsulta();
            $("#tablaPersonas").hide();
            $("#tablapresion").show();
            $("#datapresioncons").show();
            $("#dataGeneral").hide();
                $("#tablaproteccion").hide();
                $("#datadisenioproteccion").hide();
            break;
            case "Dis3":
                limpiarTabas();
                OcultarConstruccionConsulta();
            $("#datapresioncons").hide();
            $("#dataGeneral").hide();
            $("#tablaPersonas").hide();
            $("#tablapresion").hide();
            $("#tablaproteccion").show();
            $("#datadisenioproteccion").show();
            break;
        default:
    }
        tramo = event.target.value;
        txttramo = event.target[event.target.selectedIndex].text;
        loadAreas(event.target.value);
    });
    //Combo Tema Diseño
    const selectTemasConstruccion = document.getElementById('cmbTemasConstruccion_con');
    selectTemasConstruccion.addEventListener('change', function handleChange(event) {
        temaconsultaconstruccion = event.target.value;
        switch (event.target.value) {
            case "Cons1":
                ocultartablasdisenio();
                $("#dataconstruccionunion").hide();
                $("#tablabasecons").show();
                $("#databasegeneral").show();
                $("#tablaunionCons").hide();
                $("#tablaconsInspeccion").hide();
                $("#tablaconsSeguridad").hide();
                $("#tablaProfundidad").hide();
                $("#tablaConsCruces").hide();
                $("#tablaHermeticidad").hide();
                $("#tablaConsCatodica").hide();
                $("#datacatodica").hide();
                $("#datadisenioproteccion").hide();
                break;
            case "Cons2":
                ocultartablasdisenio();
                $("#tablaunionCons").show();
                $("#dataconstruccionunion").show();
                $("#tablaconsSeguridad").hide();
                $("#tablabasecons").hide();
                $("#databasegeneral").hide();
                $("#tablaProfundidad").hide();
                $("#tablaconsInspeccion").hide();
                $("#tablaConsCruces").hide();
                $("#tablaHermeticidad").hide();
                $("#tablaConsCatodica").hide();
                $("#datacatodica").hide();
                $("#datadisenioproteccion").hide();
                break;
            case "Cons3":
                ocultartablasdisenio();
                $("#dataconstruccionunion").hide();
                $("#tablaProfundidad").show();
                $("#tablaconsSeguridad").hide();
                $("#tablaunionCons").hide();
                $("#tablabasecons").hide();
                $("#tablaconsInspeccion").hide();
                $("#databasegeneral").hide();
                $("#tablaConsCruces").hide();
                $("#tablaHermeticidad").hide();
                $("#tablaConsCatodica").hide();
                $("#datacatodica").hide();
                $("#datadisenioproteccion").hide();
                break;
            case "Cons4":
                ocultartablasdisenio();
                $("#dataconstruccionunion").hide();
                $("#tablaConsCruces").show();
                $("#tablaconsSeguridad").hide();
                $("#tablaProfundidad").hide();
                $("#tablaconsInspeccion").hide();
                $("#tablaunionCons").hide();
                $("#tablabasecons").hide();
                $("#databasegeneral").hide();
                $("#tablaHermeticidad").hide();
                $("#tablaConsCatodica").hide();
                $("#datadisenioproteccion").hide();
                break;
            case "Cons5":
                ocultartablasdisenio();
                $("#dataconstruccionunion").hide();
                $("#tablaconsSeguridad").hide();
                $("#tablaHermeticidad").show();
                $("#tablaConsCruces").hide();
                $("#tablaProfundidad").hide();
                $("#tablaunionCons").hide();
                $("#tablabasecons").hide();
                $("#tablaconsInspeccion").hide();
                $("#databasegeneral").hide();
                $("#tablaConsCatodica").hide();
                $("#datadisenioproteccion").hide();
                break;
            case "Cons6":
                //tablaconsInspeccion
                ocultartablasdisenio();
                $("#dataconstruccionunion").hide();
                $("#tablaconsInspeccion").show();
                $("#tablaconsSeguridad").hide();
                $("#datacatodica").hide();
                $("#tablaHermeticidad").hide();
                $("#tablaConsCruces").hide();
                $("#tablaProfundidad").hide();
                $("#tablaunionCons").hide();
                $("#tablabasecons").hide();
                $("#databasegeneral").hide();
                $("#datadisenioproteccion").hide();
                break;
            case "Cons7":
                ocultartablasdisenio();
                $("#dataconstruccionunion").hide();
                $("#tablaconsSeguridad").hide();
                $("#tablaConsCatodica").show();
                $("#datacatodica").show();
                $("#tablaHermeticidad").hide();
                $("#tablaConsCruces").hide();
                $("#tablaProfundidad").hide();
                $("#tablaunionCons").hide();
                $("#tablaconsInspeccion").hide();
                $("#tablabasecons").hide();
                $("#databasegeneral").hide();
                $("#datadisenioproteccion").hide();
                break;
            case "Cons8":
                ocultartablasdisenio();
                $("#dataconstruccionunion").hide();
                $("#tablaconsSeguridad").show();
                $("#datacatodica").hide();
                $("#tablaHermeticidad").hide();
                $("#tablaConsCruces").hide();
                $("#tablaProfundidad").hide();
                $("#tablaunionCons").hide();
                $("#tablabasecons").hide();
                $("#databasegeneral").hide();
                $("#tablaconsInspeccion").hide();
                $("#datadisenioproteccion").hide();
                break;
            default:
        }
    });
    //switch (event.target.value) {
    //    case "T1":
    //        limpiarTabas();
    //        $("#tablaPersonas > tbody").empty();
    //        $("#tablaPersonas").show();
    //        $("#tablapresion").hide();
    //        $("#datapresioncons").hide();
    //        $("#dataGeneral").show();
    //        $("#tablaproteccion").hide();
    //        break;
    //    case "T2":
    //        limpiarTabas();
    //        $("#tablaPersonas").hide();
    //        $("#tablapresion").show();
    //        $("#datapresioncons").show();
    //        $("#dataGeneral").hide();
    //        $("#tablaproteccion").hide();
    //        break;
    //    case "T3":
    //        limpiarTabas();
    //        $("#datapresioncons").hide();
    //        $("#dataGeneral").hide();
    //        $("#tablaPersonas").hide();
    //        $("#tablapresion").hide();
    //        $("#tablaproteccion").show();
    //        break;
    //    default:
    //}

    //Combo seleccionar Tipo de cruce
    //const selectTipoCruce = document.getElementById('cmbTipcruce');
    //selectTipoCruce.addEventListener('change', function handleChange(event) {
    //    var tipocruce = event.target.value;
    //    switch (tipocruce) {
    //        case "A":
    //            $("#att_llanurainundacion").show();
    //            $("#att_tipocrucehidro").show();
    //            $("#att_transportepesado").hide();
    //            $("#att_gasoductopatrullado").hide();
    //            $("#att_vialidadabierta").hide();
    //            $("#att_carrilesvialidad").hide();
    //            $("#att_edohistodos").hide();
    //            $("#att_edoactualdos").hide();
    //            $("#att_tipocrucetrnasporte").hide();
    //            $("#att_existeunioncables").hide();
    //            $("#att_ultimopotencialapago").hide();
    //            $("#att_ultimopontencialencendio").hide();
    //            $("#att_rectuberiaextranjera").hide();
    //            $("#att_diametronom").hide();
    //            $("#att_tipotuberia").hide();
    //            $("#att_existecruceytuberia").hide();
    //            $("#att_tipocruceservicio").hide();
    //            $("#att_voltajetransportadoporservicio").hide();
    //            break;
    //        case "C":
    //            $("#att_llanurainundacion").hide();
    //            $("#att_tipocrucehidro").hide();
    //            $("#att_transportepesado").show();
    //            $("#att_gasoductopatrullado").show();
    //            $("#att_vialidadabierta").show();
    //            $("#att_carrilesvialidad").show();
    //            $("#att_edohistodos").show();
    //            $("#att_edoactualdos").show();
    //            $("#att_tipocrucetrnasporte").show();
    //            $("#att_existeunioncables").hide();
    //            $("#att_ultimopotencialapago").hide();
    //            $("#att_ultimopontencialencendio").hide();
    //            $("#att_rectuberiaextranjera").hide();
    //            $("#att_diametronom").hide();
    //            $("#att_tipotuberia").hide();
    //            $("#att_existecruceytuberia").hide();
    //            $("#att_tipocruceservicio").hide();
    //            $("#att_voltajetransportadoporservicio").hide();
    //            break;
    //        case "E":
    //            $("#att_llanurainundacion").hide();
    //            $("#att_tipocrucehidro").hide();
    //            $("#att_transportepesado").hide();
    //            $("#att_gasoductopatrullado").hide();
    //            $("#att_vialidadabierta").hide();
    //            $("#att_carrilesvialidad").hide();
    //            $("#att_edohistodos").hide();
    //            $("#att_edoactualdos").hide();
    //            $("#att_tipocrucetrnasporte").hide();
    //            $("#att_existeunioncables").show();
    //            $("#att_ultimopotencialapago").show();
    //            $("#att_ultimopontencialencendio").show();
    //            $("#att_rectuberiaextranjera").show();
    //            $("#att_diametronom").show();
    //            $("#att_tipotuberia").show();
    //            $("#att_existecruceytuberia").hide();
    //            $("#att_tipocruceservicio").hide();
    //            $("#att_voltajetransportadoporservicio").hide();
    //            break
    //        case "S":
    //            $("#att_llanurainundacion").hide();
    //            $("#att_tipocrucehidro").hide();
    //            $("#att_transportepesado").hide();
    //            $("#att_gasoductopatrullado").hide();
    //            $("#att_vialidadabierta").hide();
    //            $("#att_carrilesvialidad").hide();
    //            $("#att_edohistodos").hide();
    //            $("#att_edoactualdos").hide();
    //            $("#att_tipocrucetrnasporte").hide();
    //            $("#att_existeunioncables").hide();
    //            $("#att_ultimopotencialapago").hide();
    //            $("#att_ultimopontencialencendio").hide();
    //            $("#att_rectuberiaextranjera").hide();
    //            $("#att_diametronom").hide();
    //            $("#att_tipotuberia").hide();
    //            $("#att_existecruceytuberia").show();
    //            $("#att_tipocruceservicio").show();
    //            $("#att_voltajetransportadoporservicio").show();
    //            break;
    //        default:
    //    }
    //});
}
function ocultartablasdisenio() {
    $("#tablaPersonas").hide();
    $("#tablapresion").hide();
    $("#datapresioncons").hide();
    $("#dataGeneral").hide();
    $("#tablaproteccion").hide();
}

function handleFileSelect(evt) {
    var f = evt.target.files[0]; // FileList object
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function (theFile) {
        return function (e) {
            var binaryData = e.target.result;
            //Converting Binary Data to base 64
            var base64String = window.btoa(binaryData);
            docbasecons = base64String;
            //showing file converted to base64
            //document.getElementById('base64').value = base64String;
            //alert('File converted to base64 successfuly!\nCheck in Textarea');
        };
    })(f);
    // Read in the image file as a data URL.
    reader.readAsBinaryString(f);
}
function limpiarTabas() {
    var table0 = document.getElementById('tablapresion');
    var rowCount0 = table0.rows.length;
    for (var i = rowCount0; i > 1; --i) {
        table0.deleteRow(i - 1);
    }
    var table2 = document.getElementById('tablapresion');
    var rowCount2 = table2.rows.length;
    for (var c = rowCount2; c > 1; --c) {
        table2.deleteRow(c - 1);
    }
    var table3 = document.getElementById('tablaPersonas');
    var rowCount3 = table3.rows.length;
    for (var h = rowCount3; h > 1; --h) {
        table3.deleteRow(h - 1);
    }
}
function ezBSAlert(options) {
    var deferredObject = $.Deferred();
    var defaults = {
        type: "alert", //alert, prompt,confirm 
        modalSize: 'modal-sm', //modal-sm, modal-lg
        okButtonText: 'Ok',
        cancelButtonText: 'Cancel',
        yesButtonText: 'Yes',
        noButtonText: 'No',
        headerText: 'Attention',
        messageText: 'Message',
        alertType: 'default', //default, primary, success, info, warning, danger
        inputFieldType: 'text', //could ask for number,email,etc
    }
    $.extend(defaults, options);

    var _show = function () {
        var headClass = "navbar-default";
        switch (defaults.alertType) {
            case "primary":
                headClass = "alert-primary";
                break;
            case "success":
                headClass = "alert-success";
                break;
            case "info":
                headClass = "alert-info";
                break;
            case "warning":
                headClass = "alert-warning";
                break;
            case "danger":
                headClass = "alert-danger";
                break;
        }
        $('BODY').append(
            '<div id="ezAlerts" class="modal fade">' +
            '<div class="modal-dialog" class="' + defaults.modalSize + '">' +
            '<div class="modal-content">' +
            '<div id="ezAlerts-header" class="modal-header ' + headClass + '">' +
            '<button id="close-button" type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
            '<h4 id="ezAlerts-title" class="modal-title">Modal title</h4>' +
            '</div>' +
            '<div id="ezAlerts-body" class="modal-body">' +
            '<div id="ezAlerts-message" ></div>' +
            '</div>' +
            '<div id="ezAlerts-footer" class="modal-footer">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );

        $('.modal-header').css({
            'padding': '15px 15px',
            '-webkit-border-top-left-radius': '5px',
            '-webkit-border-top-right-radius': '5px',
            '-moz-border-radius-topleft': '5px',
            '-moz-border-radius-topright': '5px',
            'border-top-left-radius': '5px',
            'border-top-right-radius': '5px'
        });

        $('#ezAlerts-title').text(defaults.headerText);
        $('#ezAlerts-message').html(defaults.messageText);

        var keyb = "false", backd = "static";
        var calbackParam = "";
        switch (defaults.type) {
            case 'alert':
                keyb = "true";
                backd = "true";
                $('#ezAlerts-footer').html('<button class="btn btn-' + defaults.alertType + '">' + defaults.okButtonText + '</button>').on('click', ".btn", function () {
                    calbackParam = true;
                    $('#ezAlerts').modal('hide');
                });
                break;
            case 'confirm':
                var btnhtml = '<button id="ezok-btn" class="btn btn-primary">' + defaults.yesButtonText + '</button>';
                if (defaults.noButtonText && defaults.noButtonText.length > 0) {
                    btnhtml += '<button id="ezclose-btn" class="btn btn-default">' + defaults.noButtonText + '</button>';
                }
                $('#ezAlerts-footer').html(btnhtml).on('click', 'button', function (e) {
                    if (e.target.id === 'ezok-btn') {
                        calbackParam = true;
                        $('#ezAlerts').modal('hide');
                    } else if (e.target.id === 'ezclose-btn') {
                        calbackParam = false;
                        $('#ezAlerts').modal('hide');
                    }
                });
                break;
            case 'prompt':
                $('#ezAlerts-message').html(defaults.messageText + '<br /><br /><div class="form-group"><input type="' + defaults.inputFieldType + '" class="form-control" id="prompt" /></div>');
                $('#ezAlerts-footer').html('<button class="btn btn-primary">' + defaults.okButtonText + '</button>').on('click', ".btn", function () {
                    calbackParam = $('#prompt').val();
                    $('#ezAlerts').modal('hide');
                });
                break;
        }

        $('#ezAlerts').modal({
            show: false,
            backdrop: backd,
            keyboard: keyb
        }).on('hidden.bs.modal', function (e) {
            $('#ezAlerts').remove();
            deferredObject.resolve(calbackParam);
        }).on('shown.bs.modal', function (e) {
            if ($('#prompt').length > 0) {
                $('#prompt').focus();
            }
        }).modal('show');
    }

    _show();
    return deferredObject.promise();
}

function fnFinalizar() {
    document.getElementById('registro').style.display = 'none';
    document.getElementById('forms').style.display = 'block';
   
    //$('#forms').show();
    //$('#registro').hide();
   
}



function inhabilitarform(divSelector, bandera) {
    $(divSelector + " input.setAlg").prop("disabled", bandera);
    $(divSelector + " select.setAlg").prop("disabled", bandera);
}
//#region Actulizacion Diseño
function nuevoIdentificacionDisenio(){

    $("#btn_saveidentificacion").show();
    $("#btn_newidentificacion").hide();
    $("#btn_updateidentificacion").hide();
    clearInputTextValuesNew('identificacionfrm');
    inhabilitarform("#identificacionfrm", false);

}
var idDiseniogral;
function consultaDatosIdentificacionArea(id_d=null) {
    var webMethod;
    var params;
    if (id_d)
        {webMethod = "getDisenioGeneralById";
         params = {
            id: id_d
        };}
        
    else {
        
        webMethod = "get_diseniogeneral";
         params = {
            id: $("#cmbAreas option:selected").val(),
            op: 1
        };
    }
    $.ajax({
        type: "POST",
        url: apiUrl + webMethod,
        data: params,
        headers:{
            'Accept': 'application/json'
        },
        success: function (data) {
            const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
            existingDownloadIcons.forEach(icon => icon.remove());  
            
            if (data.success) {
                var infodata;
                if (webMethod === "getDisenioGeneralById")
                    infodata=(data.data);
                else if (webMethod === "get_diseniogeneral")
                    infodata = (data.data.datagrid);
                if (infodata.length > 0) {
                    if (webMethod ==="getDisenioGeneralById")
                        llenarDatosActualizacion(infodata);
                    else if (webMethod === "get_diseniogeneral")
                        llenarDatosActualizacion(infodata);
                    $("#btn_saveidentificacion").hide();
                    $("#btn_updateidentificacion").show();
                    $("#btn_newidentificacion").show();
                }
                else {

                    clearInputTextValues('identificacionfrm');
                    inhabilitarform("#identificacionfrm",false)
                    $("#btn_saveidentificacion").show();
                    $("#btn_updateidentificacion").hide();

                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;
                
                    $("#txtductogeneral").val(ducto_nombre);
                    $("#txttramogeneral").val(tramo_nombre);
                    $("#txtareageneral").val(area_unitaria_nombre);
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });


}
function llenarDatosActualizacion(data) {
    
    $("#btn_updateidentificacion").text('Actualizar');
    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== null) {
        const coords = data[0].coordenada_especifica.split(' ');
        $("#coord_esp_iden_x").val(coords[0]);
        $("#coord_esp_iden_y").val(coords[1]);
    }
    else{$("#coord_esp_iden_x").val("");
    $("#coord_esp_iden_y").val("");}
    $("#km_esp_iden").val(data[0].kilometro_especifico);
    $("#longitud").val(data[0].C_0201_0006);
    $("#diam_mm").val(data[0].C_0202_0007);
    $("#cmbunidaddiametro").val(data[0].diametro_nominal);
    $("#esp_mm").val(data[0].C_0203_0009);
    $("#cmbunidadespesor").val(data[0].espesor_pared);
    $("#cmbTipoMaterial option:contains(" + data[0].C_0204_0011 + ")").attr('selected', 'selected');
    $("#temp_c").val(data[0].C_0207_0027);
    $("#cmbunidadtemperatura").val(data[0].temperatura);
    $("#cmbTipoCostura option:contains(" + data[0].C_0208_0029 + ")").attr('selected', 'selected');
    $("#fec_fab").val(data[0].C_0209_0030.split(' ')[0]);
    $("#fec_fab_fin").val(data[0].C_0209_0030_2.split(' ')[0]);
    $("#porc_carbono").val(data[0].C_0210_0031);
    $("#res_trac").val(data[0].C_0210_0032);
    $("#lim_elas").val(data[0].C_0210_0033);
    idDiseniogral = data[0].id;
    inhabilitarform("#identificacionfrm", true);
    if (data[0].file !== "" && data[0].file !== null) {
        // Find the correct input group using the data-column attribute
        const inputGroup = document.querySelector(`#filefrmgral`);
        const customFileDiv = inputGroup.querySelector('#fileconteinergral');

        if (customFileDiv) {
            // Create the download icon
            const downloadIcon = document.createElement('a');
            downloadIcon.href = `${apiUrl}disenio-general/${data[0].id}/download`;
            downloadIcon.innerHTML = `<i class="fa fa-download"></i>`;
            downloadIcon.target = "_blank";
            downloadIcon.className = "download-icon";
            downloadIcon.style.marginLeft = "10px";
            //downloadIcon.setAttribute('data-columna', item.column);
            downloadIcon.setAttribute('data-id_otro', data[0].id);

            // Insert the download icon after the custom-file div
            if (customFileDiv.nextSibling) {
                inputGroup.insertBefore(downloadIcon, customFileDiv.nextSibling);
            } else {
                inputGroup.appendChild(downloadIcon);
            }

            const destroyIcon = document.createElement('a');
            destroyIcon.href = `${apiUrl}disenio-general/${data[0].id}/destroy`;
            destroyIcon.innerHTML = `<i class="fa fa-trash"></i>`;
            destroyIcon.target = "_blank";
            destroyIcon.className = "destroy-icon";
            destroyIcon.style.marginLeft = "10px";
            destroyIcon.style.display = "none";
            //destroyIcon.setAttribute('data-columna', item.column);
            destroyIcon.setAttribute('data-id_otro', data[0].id);


            // Insert the download icon after the custom-file div
            if (customFileDiv.nextSibling) {
                inputGroup.insertBefore(destroyIcon, customFileDiv.nextSibling);
            }
            else {
                inputGroup.appendChild(destroyIcon);
            }
        }
    }
}



function updateIdentificacionDisenio() {
    if ($("#btn_updateidentificacion").text() === "Actualizar") {
        inhabilitarform("#identificacionfrm",false)
        $("#btn_updateidentificacion").text('Guardar');
        showDestroyIcons('identificacionfrm', true);
    }
    else {
        var params = {
        };
        var webMethod = "";
        webMethod = "updateIdentificacion";
        params = {
            id: idDiseniogral,
            C_0101_0001_id: area,
            C_0201_0006: $("#longitud").val(),
            C_0202_0007: $("#diam_mm").val(),
            C_0203_0009: $("#esp_mm").val(),
            C_0203_0011_id: $("#cmbTipoMaterial").val(),
            C_0207_0027: $("#temp_c").val(),
            C_0208_0029_id: $("#cmbTipoCostura").val(),
            C_0209_0030: $("#fec_fab").val(),
            C_0209_0030_2: $("#fec_fab_fin").val(),
            C_0210_0031: $("#porc_carbono").val(),
            C_0210_0032: $("#res_trac").val(),
            C_0210_0033: $("#lim_elas").val(),
            coordenada_especifica: $("#coord_esp_iden_x").val() + ' ' + $("#coord_esp_iden_y").val(),
            kilometro_especifico: $("#km_esp_iden").val(),
            diametro_nominal: $("#cmbunidaddiametro").val(),
            espesor_pared: $("#cmbunidadespesor").val(),
            temperatura: $("#cmbunidadtemperatura").val()
        };
        var formData = new FormData();
        formData.append('file', $("#filedisenioidentificacion")[0].files[0]);

        Object.keys(params).forEach(key => formData.append(key, params[key]));
       
        //Método
        fetch(apiUrl + webMethod, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response)
                return response.json();

            })
            .then(data => {
                if (data.success) {
                    alert("El registro fue actualizado correctamente");
                    $('#disenioforms').show();
                    $('#identificacionfrm').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }
}


function nuevoDisenioproteccion(){

    $("#btnsaveproteccion").show();
    $("#btn_newproteccion").hide();
    $("#btn_updateproteccion").hide();
    clearInputTextValuesNew('proteccionfrm');
    inhabilitarform("#proteccionfrm", false);

}

function consultaDatosProteccionArea(id_d=null) {


    var webMethod;
    var params;
    if (id_d)
        {webMethod = "getDisenioProteccionById";
         params = {
            id: id_d
        };}
        
    else {
        
        webMethod = "get_Proteccion";
         params = {
            id: $("#cmbAreas option:selected").val(),
            op: 1
        };
    }
    $.ajax({
        type: "POST",
        url: apiUrl + webMethod,
        data: params,
        success: function (data) {
            if (data.success) {
                clearInputTextValues('proteccionfrm');    
                if (webMethod === "getDisenioProteccionById")
                    infodata = (data.data);
                else if (webMethod === "get_Proteccion")
                    infodata = (data.data.datagrid);
                if (infodata.length > 0) {

                clearInputTextValues('proteccionfrm');
                const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
                existingDownloadIcons.forEach(icon => icon.remove());    

                    llenarDatosActualizacionProteccion(infodata);
                    $("#btnsaveproteccion").hide();
                    $("#btn_newproteccion").show();
                    $("#btn_updateproteccion").show();
                }
                else {


                    inhabilitarform("#proteccionfrm",false)
                    $("#btnsaveproteccion").show();
                    $("#btn_updateproteccion").hide();

                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;
                    $("#txtductoproteccion").val(ducto_nombre);
                    $("#txttramoproteccion").val(tramo_nombre);
                    $("#txtareaproteccion").val(area_unitaria_nombre);
                });

            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });


}

var idDisenioproteccion;
function llenarDatosActualizacionProteccion(data) {
    console.log("hola")
    $("#btn_updateproteccion").text('Actualizar');
    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== undefined&& data[0].coordenada_especifica !== null) {
        const coords = data[0].coordenada_especifica.split(' ');
        $("#coord_esp_iden_prot_x").val(coords[0]);
        $("#coord_esp_iden_prot_y").val(coords[1]);
    }
    $("#km_esp_iden_prot").val(data[0].kilometro_especifico);
    $("#txtiporecubrimiento").val(data[0].C_0211_0034);
    $("#txtiporecubrimiento_2").val(data[0].C_0211_0034_2);
    $("#txtkminicialrecubrimiento").val(data[0].C_0211_0035);
    $("#txtkmfinalrecubrimiento").val(data[0].C_0211_0036);
    $("#txtlongtotalrecubrimiento").val(data[0].C_0211_0037);
    $("#txtempresaaplicoservicio").val(data[0].C_0211_0038);
    $("#txtfecinicioservicio").val(data[0].C_0211_0039.split(' ')[0]);
    $("#txtfecfabrico").val(data[0].C_0211_0040.split(' ')[0]);
    $("#txtfecinstalacion").val(data[0].C_0211_0041);
    $("#txtfecinstalacion_2").val(data[0].C_0211_0041_2);
    $("#txtordenaplicacion").val(data[0].C_0211_0044);
    $("#txtlocalizacion").val(data[0].C_0211_0045);
    $("#txtTempMaxFuncionamiento").val(data[0].C_0211_0046);
    $("#txtmotivoinstalacion").val(data[0].C_0211_0047);
    $("#txtmaterialfabricacion").val(data[0].C_0211_0048);
    $("#txtespesorrecubrimiento").val(data[0].C_0211_0049);
    $("#cmbdecisionAislamiento").val(data[0].C_0211_0050);
    $("#cmbdecisionCorrosion").val(data[0].C_0211_0051);
    idDisenioproteccion = data[0].id;
    inhabilitarform("#proteccionfrm", true);
    if (data[0].file !== "" && data[0].file !== null) {
        // Find the correct input group using the data-column attribute
        const inputGroup = document.querySelector(`#filefrmproteccion`);
        const customFileDiv = inputGroup.querySelector('#fileconteinerproteccion');

        if (customFileDiv) {
            // Create the download icon
            const downloadIcon = document.createElement('a');
            downloadIcon.href = `${apiUrl}disenio-proteccion/${data[0].id}/download`;
            downloadIcon.innerHTML = `<i class="fa fa-download"></i>`;
            downloadIcon.target = "_blank";
            downloadIcon.className = "download-icon";
            downloadIcon.style.marginLeft = "10px";
            //downloadIcon.setAttribute('data-columna', item.column);
            downloadIcon.setAttribute('data-id_otro', data[0].id);

            // Insert the download icon after the custom-file div
            if (customFileDiv.nextSibling) {
                inputGroup.insertBefore(downloadIcon, customFileDiv.nextSibling);
            } else {
                inputGroup.appendChild(downloadIcon);
            }

            const destroyIcon = document.createElement('a');
            destroyIcon.href = `${apiUrl}disenio-proteccion/${data[0].id}/destroy`;
            destroyIcon.innerHTML = `<i class="fa fa-trash"></i>`;
            destroyIcon.target = "_blank";
            destroyIcon.className = "destroy-icon";
            destroyIcon.style.marginLeft = "10px";
            destroyIcon.style.display = "none";
            //destroyIcon.setAttribute('data-columna', item.column);
            destroyIcon.setAttribute('data-id_otro', data[0].id);


            // Insert the download icon after the custom-file div
            if (customFileDiv.nextSibling) {
                inputGroup.insertBefore(destroyIcon, customFileDiv.nextSibling);
            }
            else {
                inputGroup.appendChild(destroyIcon);
            }
        }
    }
}

function updateDisenioproteccion() {
    if ($("#btn_updateproteccion").text() === "Actualizar") {
        inhabilitarform("#proteccionfrm", false);
        showDestroyIcons('proteccionfrm', true);
        $("#btn_updateproteccion").text('Guardar');
    }
    else {
        var params = {
        };
        var webMethod = "";
        webMethod = "updateProteccion";
        params = {
            id: idDisenioproteccion,
            C_0101_0001_id: area,
            C_0211_0034: $("#txtiporecubrimiento").val(),
            C_0211_0035: $("#txtkminicialrecubrimiento").val(),
            C_0211_0036: $("#txtkmfinalrecubrimiento").val(),
            C_0211_0037: $("#txtlongtotalrecubrimiento").val(),
            C_0211_0038: $("#txtempresaaplicoservicio").val(),
            C_0211_0039: $("#txtfecinicioservicio").val(),
            C_0211_0040: $("#txtfecfabrico").val(),
            C_0211_0041: $("#txtfecinstalacion").val(),
            C_0211_0042: $("#txtfecaplicacion").val(),
            C_0211_0044: $("#txtordenaplicacion").val(),
            C_0211_0045: $("#txtlocalizacion").val(),
            C_0211_0046: $("#txtTempMaxFuncionamiento").val(),
            C_0211_0047: $("#txtmotivoinstalacion").val(),
            C_0211_0048: $("#txtmaterialfabricacion").val(),
            C_0211_0049: $("#txtespesorrecubrimiento").val(),
            C_0211_0050: $("#cmbdecisionAislamiento").val(),
            C_0211_0051: $("#cmbdecisionCorrosion").val(),
            C_0211_0034_2: $("#txtiporecubrimiento_2").val(),
            C_0211_0041_2: $("#txtfecinstalacion_2").val(),
            coordenada_especifica: $("#coord_esp_iden_prot_x").val() + ' ' + $("#coord_esp_iden_prot_y").val(),
            kilometro_especifico: $("#km_esp_iden_prot").val()
        };

        var formData = new FormData();
        formData.append('file', $("#filedisenioproteccion")[0].files[0]);

        Object.keys(params).forEach(key => formData.append(key, params[key]));

        //Método
        fetch(apiUrl + webMethod, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response)
                return response.json();

            })
            .then(data => {
                if (data.success) {
                    alert("El registro fue actualizado correctamente");
                    $('#disenioforms').show();
                    $('#proteccionfrm').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });





        //$.ajax({
        //    type: "POST",
        //    url: apiUrl + webMethod,
        //    headers: {
        //        'Accept': 'application/json'
        //    },
        //    data: params,
        //    success: function (data) {
        //        alert("El registro fue actualizado correctamente");
        //        $('#disenioforms').show();
        //        $('#proteccionfrm').hide();
        //    },
        //    error: function (xhr, ajaxOptions, thrownError) {

        //    }
        //});
    }
}


// Servicio

var idDisenioservicio;


function nuevoDisenioServicio(){

    $("#btn_saveservicio").show();
    $("#btn_newservicio").hide();
    $("#btn_updateservicio").hide();
    clearInputTextValuesNew('serviciofrm');
    inhabilitarform("#serviciofrm", false);

}



function consultaDatosServicio(id_d = null) {
    clearAllFileInputsInDiv('serviciofrm')
    var webMethod;
    var params;
    if (id_d) {
        webMethod = "getDisenioProteccionById";
        params = {
            id: id_d
        };
    } else {
        webMethod = "getDisenioServicio";
        params = {
            id: $("#cmbAreas option:selected").val(),
        };
    }

    fetch(apiUrl + webMethod, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    })
    .then(response => response.json())
    .then(data => {        
        // 1. Remove all existing download icons before adding new ones.
        const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
        existingDownloadIcons.forEach(icon => icon.remove());
       

        const { id: serviceId, success:success, ...columnsData } = data;
        if (success){
        idDisenioservicio=serviceId
        Object.values(columnsData).forEach(item => {
            if (item.hasFile) {
                // Find the correct input group using the data-column attribute
                const inputGroup = document.querySelector(`.input-group[data-column="${item.column}"]`);
                const customFileDiv = inputGroup.querySelector('.custom-file');
        
                if (customFileDiv) {
                    // Create the download icon
                    const downloadIcon = document.createElement('a');
                    downloadIcon.href = `${apiUrl}disenio-servicio/${serviceId}/download/${item.column}`;
                    downloadIcon.innerHTML = `<i class="fa fa-download"></i>`;
                    downloadIcon.target = "_blank";
                    downloadIcon.className = "download-icon";
                    downloadIcon.style.marginLeft = "10px";
                    downloadIcon.setAttribute('data-columna', item.column);
                    downloadIcon.setAttribute('data-id_otro', serviceId);
                    
                    // Insert the download icon after the custom-file div
                    if (customFileDiv.nextSibling) {
                        inputGroup.insertBefore(downloadIcon, customFileDiv.nextSibling);
                    } else {
                        inputGroup.appendChild(downloadIcon);
                    }

                    const destroyIcon = document.createElement('a');
                    destroyIcon.href = `${apiUrl}disenio-servicio/${serviceId}/destroy/${item.column}`;
                    destroyIcon.innerHTML = `<i class="fa fa-trash"></i>`;
                    destroyIcon.target = "_blank";
                    destroyIcon.className = "destroy-icon";
                    destroyIcon.style.marginLeft = "10px";
                    destroyIcon.style.display = "none"; 
                    destroyIcon.setAttribute('data-columna', item.column);
                    destroyIcon.setAttribute('data-id_otro', serviceId);
                   
                    
                    // Insert the download icon after the custom-file div
                    if (customFileDiv.nextSibling) {
                        inputGroup.insertBefore(destroyIcon, customFileDiv.nextSibling);
                    } else {
                        inputGroup.appendChild(destroyIcon);
                    }


                    
                }
            }
            
        });
        $("#btn_updateservicio").text("Actualizar") 
        inhabilitarform("#serviciofrm", true)
        $("#btn_saveservicio").hide();
        $("#btn_newservicio").show();
        $("#btn_updateservicio").show();
        showDestroyIcons('serviciofrm',false);
    }

    else {

        inhabilitarform("#serviciofrm", false)
        $("#btn_saveservicio").show();
        $("#btn_newservicio").hide();
        $("#btn_updateservicio").hide();
        showDestroyIcons('serviciofrm',false);
    }
    })
    .catch(error => console.error('Error fetching data:', error));
}



function updateDisenioServicio() {
    if ($("#btn_updateservicio").text() === "Actualizar") {
        inhabilitarform("#serviciofrm", false);
        showDestroyIcons('serviciofrm',true);
        $("#btn_updateservicio").text('Guardar');
    }
    else {
        var webMethod = "updateServicio";

        const formData = new FormData();
        formData.append("id", idDisenioservicio)
        // Make sure files are being selected and appended properly
        if($("#inputGroupFile01")[0].files[0]) {
            formData.append("C_0205_0012", $("#inputGroupFile01")[0].files[0]);
        }
        if($("#inputGroupFile02")[0].files[0]) {
            formData.append("C_0205_0013", $("#inputGroupFile02")[0].files[0]);
        }
        if($("#inputGroupFile03")[0].files[0]) {
            formData.append("C_0205_0014", $("#inputGroupFile03")[0].files[0]);
        }
        if($("#inputGroupFile04")[0].files[0]) {
            formData.append("C_0205_0015", $("#inputGroupFile04")[0].files[0]);
        }
        if($("#inputGroupFile05")[0].files[0]) {
            formData.append("C_0205_0016", $("#inputGroupFile05")[0].files[0]);
        }
        formData.append('file', $("#inputGroupFile06")[0].files[0]);
        // Log formData to console for debugging (this will not display the content of the files)
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        fetch(apiUrl + webMethod, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            
        })
        .then(data => {
            if (data.success) {

                alert("Información almacenada correctamente");
                $('#disenioforms').show();
                $('#serviciofrm').hide();
                $("#btn_updateservicio").text("Actualizar")
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
    }
}



//Presion

function nuevoDiseniopresion(){

    $("#btnsavepresion").show();
    $("#btn_newpresion").hide();
    $("#btn_updatepresion").hide();
    clearInputTextValuesNew('presionfrm');
    inhabilitarform("#presionfrm", false);

}

function consultaDatosPresionArea(id_d=null) {


    var webMethod;
    var params;
    if (id_d)
        {webMethod = "getDisenioPresionById";
         params = {
            id: id_d
        };}
        
    else {
        
        webMethod = "get_Presion";
         params = {
            id: $("#cmbAreas option:selected").val(),
            op: 1
        };
    }
    $.ajax({
        type: "POST",
        url: apiUrl + webMethod,
        data: params,
        success: function (data) {
            if (data.success) {


                clearInputTextValues('presionfrm');
                const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
                existingDownloadIcons.forEach(icon => icon.remove());  
                var datainfo;
                if (webMethod === "getDisenioPresionById")
                    datainfo = data.data;
                else if (webMethod === "get_Presion")
                    datainfo = data.data.datagrid;
                if (datainfo.length > 0) {

                    llenarDatosActualizacionPresion(datainfo);
                    $("#btn_newpresion").show();
                    $("#btnsavepresion").hide();
                    $("#btn_updatepresion").show();
                }else{


                    inhabilitarform("#presionfrm",false)
                    $("#btnsavepresion").show();
                    $("#btn_updatepresion").hide();

                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;
                    $("#txtductopresion").val(ducto_nombre);
                    $("#txttramopresion").val(tramo_nombre);
                    $("#txtareapresion").val(area_unitaria_nombre);
                });

            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });


}
var idDiseniopresion;




function llenarDatosActualizacionPresion(data) {

    $("#btn_updatepresion").text('Actualizar');

    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== undefined&& data[0].coordenada_especifica !== null) {
        const coords = data[0].coordenada_especifica.split(' ');
        $("#coord_esp_iden_pres_x").val(coords[0]);
        $("#coord_esp_iden_pres_y").val(coords[1]);
    }
    $("#txtEntidadEmpresa").val(data[0].C_0206_0017);
    $("#txtfechacalculo").val(data[0].C_0206_0018);
    $("#txtMetodoCalculo").val(data[0].C_0206_0019);
    $("#txtPresNomPSI").val(data[0].C_0206_0020);
    $("#txtPresNomKG").val(data[0].C_0206_0021);
    $("#txtPresDisenio").val(data[0].C_0206_0022);
    $("#txtPresMaxPSI").val(data[0].C_0206_0023);
    $("#txtPresMaxKG").val(data[0].C_0206_0024);
    $("#txtPresRedPSI").val(data[0].C_0206_0025);
    $("#txtPresRedKG").val(data[0].C_0206_0026);
    $("#km_esp_iden_pres").val(data[0].kilometro_especifico);
    $("#cmbunidadpresnominal").val(data[0].pres_nominal);
    $("#cmbunidadpresiondisenio").val(data[0].pres_disenio);
    $("#cmbunidadpresionmaxope").val(data[0].pres_max_ope);
    $("#cmbunidadpresionsegmento").val(data[0].pres_segmento);

    idDiseniopresion = data[0].id;
    inhabilitarform("#presionfrm", true);
    if (data[0].file !== "" && data[0].file !== null) {
        // Find the correct input group using the data-column attribute
        const inputGroup = document.querySelector(`#filefrmpresion`);
        const customFileDiv = inputGroup.querySelector('#fileconteinerpresion');

        if (customFileDiv) {
            // Create the download icon
            const downloadIcon = document.createElement('a');
            downloadIcon.href = `${apiUrl}disenio-presion/${data[0].id}/download`;
            downloadIcon.innerHTML = `<i class="fa fa-download"></i>`;
            downloadIcon.target = "_blank";
            downloadIcon.className = "download-icon";
            downloadIcon.style.marginLeft = "10px";
            //downloadIcon.setAttribute('data-columna', item.column);
            downloadIcon.setAttribute('data-id_otro', data[0].id);

            // Insert the download icon after the custom-file div
            if (customFileDiv.nextSibling) {
                inputGroup.insertBefore(downloadIcon, customFileDiv.nextSibling);
            } else {
                inputGroup.appendChild(downloadIcon);
            }

            const destroyIcon = document.createElement('a');
            destroyIcon.href = `${apiUrl}disenio-presion/${data[0].id}/destroy`;
            destroyIcon.innerHTML = `<i class="fa fa-trash"></i>`;
            destroyIcon.target = "_blank";
            destroyIcon.className = "destroy-icon";
            destroyIcon.style.marginLeft = "10px";
            destroyIcon.style.display = "none";
            //destroyIcon.setAttribute('data-columna', item.column);
            destroyIcon.setAttribute('data-id_otro', data[0].id);


            // Insert the download icon after the custom-file div
            if (customFileDiv.nextSibling) {
                inputGroup.insertBefore(destroyIcon, customFileDiv.nextSibling);
            }
            else {
                inputGroup.appendChild(destroyIcon);
            }
        }
    }
}

//#endregion
//#region FORMULARIOS DISEÑO

function updateDiseniopresion() {
    if ($("#btn_updatepresion").text() === "Actualizar") {
        inhabilitarform("#presionfrm", false);
        showDestroyIcons('presionfrm', true);
        $("#btn_updatepresion").text('Guardar');
    }
    else {
        
        var params = {
            id: idDiseniopresion,
            C_0101_0001_id: area,
            C_0206_0017: $("#txtEntidadEmpresa").val(),
            C_0206_0018: $("#txtfechacalculo").val(),
            C_0206_0019: $("#txtMetodoCalculo").val(),
            C_0206_0020: $("#txtPresNomPSI").val(),
            C_0206_0021: $("#txtPresNomKG").val(),
            C_0206_0022: $("#txtPresDisenio").val(),
            C_0206_0023: $("#txtPresMaxPSI").val(),
            C_0206_0024: $("#txtPresMaxKG").val(),
            C_0206_0025: $("#txtPresRedPSI").val(),
            C_0206_0026: $("#txtPresRedKG").val(),
            coordenada_especifica: $("#coord_esp_iden_pres_x").val()+' '+$("#coord_esp_iden_pres_y").val(),
            kilometro_especifico: $("#km_esp_iden_pres").val(),
            pres_nominal: $("#cmbunidadpresnominal").val(),
            pres_disenio: $("#cmbunidadpresiondisenio").val(),
            pres_max_ope: $("#cmbunidadpresionmaxope").val(),
            pres_segmento: $("#cmbunidadpresionsegmento").val()
        };
        var webMethod = "";
        webMethod = "updatePresion";
        $.ajax({
            type: "POST",
            url: apiUrl + webMethod,
            headers: {
                'Accept': 'application/json'
            },
            data: params,
            success: function (data) {
                alert("El registro fue actualizado correctamente");
                $('#disenioforms').show();
                $('#presionfrm').hide();
            },
            error: function (xhr, ajaxOptions, thrownError) {

            }
        });
    }
}



//Consulta Modificar
// General
var idConsbase;

function nuevoconsgeneral(){

    $("#btn_saveconsgeneral").show();
    $("#btn_updateconsgeneral").hide();
    $("#btn_newconsgeneral").hide();
    clearInputTextValuesNew('constbasefrm');
    inhabilitarform("#constbasefrm", false);

}



function consultaDatosConsGeneral(id_d=null) {


    var webMethod;
    var params;
    if (id_d)
        {webMethod = "getConsGeneralById";
            params = {
            id: id_d
        };}
        
    else {
        
        webMethod = "get_construcciongeneral";
            params = {
            id: $("#cmbAreas option:selected").val(),
            op: 1
        };
    }
    
    $.ajax({
        type: "POST",
        url: apiUrl + webMethod,
        data: params,
        headers:{
            'Accept': 'application/json'
        },
        success: function (data) {
            if (data.success) {
                let data1;
                if (webMethod==="get_construcciongeneral"){

                    data1=data.data.datagrid

                } else {
                    data1=data.data
                }
                const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
                existingDownloadIcons.forEach(icon => icon.remove());  
                if (data1.length > 0) {
                    llenarDatosActualizacionConsGeneral(data1);
                    $("#btn_saveconsgeneral").hide();
                    $("#btn_newconsgeneral").show();
                    $("#btn_updateconsgeneral").show();
                }else{

                    clearInputTextValues('constbasefrm');
                    inhabilitarform("#constbasefrm",false)
                    $("#btn_saveconsgeneral").show();
                    $("#btn_updateconsgeneral").hide();

                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;
                
                    $("#txttramogeneralbasecons").val(ducto_nombre);
                    $("#txtductogeneralbasecons").val(tramo_nombre);
                    $("#txtareageneralbasecons").val(area_unitaria_nombre);
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });


}
function llenarDatosActualizacionConsGeneral(data) {
    
    $("#btn_updateconsgeneral").text('Actualizar');
    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== null&& data[0].coordenada_especifica !== null) {
        const coords = data[0].coordenada_especifica.split(' ');
        $("#coord_esp_idenbasecons_x").val(coords[0]);
        $("#coord_esp_idenbasecons_y").val(coords[1]);
    }
    else{$("#coord_esp_idenbasecons_x").val("");
    $("#coord_esp_idenbasecons_y").val("");}

    $("#km_esp_idenbasecons").val(data[0].kilometro_especifico ),
    $("#fechaconstbase").val(data[0].C_0301_0048.split(" ")[0]);
    $("#metrecubbase").val(data[0].C_0306_0108);
    $("#txttiposuelobaseconst").val(data[0].C_0307_0109);
    $("#txtmatrellenobaseconst").val(data[0].C_0307_0110);
    $("#presionhermebasecons").val(data[0].C_0308_0110);
    $("#cmbunidadpresionhermebasecons").val(data[0].unidad_presion_prueba);
    $("#cmtiporecubrimientobase").val( data[0].C_0311_121_id);

    idConsbase = data[0].id;
    inhabilitarform("#constbasefrm", true);
    if (data[0].file !== "" && data[0].file !== null) {
        // Find the correct input group using the data-column attribute
        const inputGroup = document.querySelector(`#filefrmconsbase`);
        const customFileDiv = inputGroup.querySelector('#fileconteinerconsbase');

        if (customFileDiv) {
            // Create the download icon
            const downloadIcon = document.createElement('a');
            downloadIcon.href = `${apiUrl}construccion-general/${data[0].id}/download`;
            downloadIcon.innerHTML = `<i class="fa fa-download"></i>`;
            downloadIcon.target = "_blank";
            downloadIcon.className = "download-icon";
            downloadIcon.style.marginLeft = "10px";
            //downloadIcon.setAttribute('data-columna', item.column);
            downloadIcon.setAttribute('data-id_otro', data[0].id);

            // Insert the download icon after the custom-file div
            if (customFileDiv.nextSibling) {
                inputGroup.insertBefore(downloadIcon, customFileDiv.nextSibling);
            } else {
                inputGroup.appendChild(downloadIcon);
            }

            const destroyIcon = document.createElement('a');
            destroyIcon.href = `${apiUrl}construccion-general/${data[0].id}/destroy`;
            destroyIcon.innerHTML = `<i class="fa fa-trash"></i>`;
            destroyIcon.target = "_blank";
            destroyIcon.className = "destroy-icon";
            destroyIcon.style.marginLeft = "10px";
            destroyIcon.style.display = "none";
            //destroyIcon.setAttribute('data-columna', item.column);
            destroyIcon.setAttribute('data-id_otro', data[0].id);


            // Insert the download icon after the custom-file div
            if (customFileDiv.nextSibling) {
                inputGroup.insertBefore(destroyIcon, customFileDiv.nextSibling);
            }
            else {
                inputGroup.appendChild(destroyIcon);
            }
        }
    }
}



function updateConsGeneral() {
    if ($("#btn_updateconsgeneral").text() === "Actualizar") {
        inhabilitarform("#constbasefrm",false)
        $("#btn_updateconsgeneral").text('Guardar');
        showDestroyIcons('constbasefrm',true);
    }
    else {
        var params = {
        };
        var webMethod = "";
        webMethod = "general/updateConstruccionGeneral";
        params = {
            id: idConsbase,
            C_0101_0001_id: area,
            C_0301_0048: $("#fechaconstbase").val(),
            C_0306_0108: $("#metrecubbase").val(),
            C_0307_0109: $("#txttiposuelobaseconst").val(),
            C_0307_0110: $("#txtmatrellenobaseconst").val(),
            C_0308_0110: $("#presionhermebasecons").val(),
            unidad_presion_prueba: $("#cmbunidadpresionhermebasecons").val(),
            C_0311_121: $("#cmtiporecubrimientobase").val(),
            coordenada_especifica: $("#coord_esp_idenbasecons_x").val()+' '+$("#coord_esp_idenbasecons_y").val(),
            kilometro_especifico: $("#km_esp_idenbasecons").val()
        };
        var formData = new FormData();
        formData.append('file', $("#fileconstruccionbase")[0].files[0]);

        Object.keys(params).forEach(key => formData.append(key, params[key]));

        for (var value of formData.values()) {
            console.log(value);
        }
            //$.ajax({
            //    url: apiUrl + webMethod,
            //    method: 'POST',
            //    body: formData,
            //    success: function (data) {
            //        alert("El registro fue actualizado correctamente");
            //        $('#construforms').show();
            //        $('#constbasefrm').hide();
            //    },
            //    error: function (xhr, ajaxOptions, thrownError) {

            //    }
            //});
        fetch(apiUrl + webMethod, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response)
                return response.json();

            })
            .then(data => {
                if (data.success) {
                    alert("El registro fue actualizado correctamente");
                    $('#construforms').show();
                    $('#constbasefrm').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }
}



// Union
var idConsunion;



function nuevoconsunion(){

    $("#btn_saveconsunion").show();
    $("#btn_updateconsunion").hide();
    $("#btn_newconsunion").hide();
    clearInputTextValuesNew('metodounionfrm');
    inhabilitarform("#metodounionfrm", false);

}

function consultaDatosConsUnion(id_d=null) {
    var webMethod;
    var params;
    if (id_d)
        {webMethod = "getConsUnionById";
         params = {
            id: id_d
        };}
        
    else {
        
        webMethod = "get_construccionunion";
         params = {
            id: $("#cmbAreas option:selected").val(),
            op: 1
        };
}


    $.ajax({
        type: "POST",
        url: apiUrl + webMethod,
        data: params,
        headers:{
            'Accept': 'application/json'
        },
        success: function (data) {
            if (data.success) {
                if (webMethod === "getConsUnionById")
                    infodata = (data.data);
                else if (webMethod === "get_construccionunion")
                    infodata = (data.data.datagrid);
                const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
                existingDownloadIcons.forEach(icon => icon.remove());
                if (infodata.length > 0) {
                    llenarDatosActualizacionConsUnion(infodata);
                    $("#btn_saveconsunion").hide();
                    $("#btn_newconsunion").show();
                    $("#btn_updateconsunion").show();
                }else{

                    clearInputTextValues('metodounionfrm');
                    inhabilitarform("#metodounionfrm",false)
                    $("#btn_saveconsunion").show();
                    $("#btn_updateconsunion").hide();

                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;
                
                    $("#txttramogeneralunion").val(ducto_nombre);
                    $("#txtductogeneralunion").val(tramo_nombre);
                    $("#txtareageneralunion").val(area_unitaria_nombre);
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });


}
function llenarDatosActualizacionConsUnion(data) {
    
    $("#btn_updateconsunion").text('Actualizar');

    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== null&& data[0].coordenada_especifica !== null) {
        const coords = data[0].coordenada_especifica.split(' ');
        $("#coord_esp_idenunion_x").val(coords[0]);
        $("#coord_esp_idenunion_y").val(coords[1]);
    }
    else{$("#coord_esp_idenunion_x").val("");
    $("#coord_esp_idenunion_y").val("");}


    $("#cmtipotecnicaunion option:contains(" + data[0].C_0302_0049_id  + ")").attr('selected', 'selected');
    $("#txtidentificadorunion").val(data[0].C_0302_0050);
    $("#txtrecaplsolunion").val(data[0].C_0302_0051);
    $("#fechaserunion").val(data[0].C_0302_0052.split(" ")[0]);
    $("#fecinstunion").val(data[0].C_0302_0053.split(" ")[0]);
    $("#cmbmetubicsoldunion").val(data[0].C_0302_0054_id);
    $("#fecfabunion").val(data[0].C_0302_0055.split(" ")[0]);
    $("#txtedoactunion").val(data[0].C_0302_0056);
    $("#txtedohisunion").val(data[0].C_0302_0057);
    $("#km_esp_idenunion").val(data[0].kilometro_especifico);
    if (data[0].file !== "" && data[0].file !== null) {
        // Find the correct input group using the data-column attribute
        const inputGroup = document.querySelector(`#filefrmconsunion`);
        const customFileDiv = inputGroup.querySelector('#fileconteinerconsunion');

        if (customFileDiv) {
            // Create the download icon
            const downloadIcon = document.createElement('a');
            downloadIcon.href = `${apiUrl}construccion-union/${data[0].id}/download`;
            downloadIcon.innerHTML = `<i class="fa fa-download"></i>`;
            downloadIcon.target = "_blank";
            downloadIcon.className = "download-icon";
            downloadIcon.style.marginLeft = "10px";
            //downloadIcon.setAttribute('data-columna', item.column);
            downloadIcon.setAttribute('data-id_otro', data[0].id);

            // Insert the download icon after the custom-file div
            if (customFileDiv.nextSibling) {
                inputGroup.insertBefore(downloadIcon, customFileDiv.nextSibling);
            } else {
                inputGroup.appendChild(downloadIcon);
            }

            const destroyIcon = document.createElement('a');
            destroyIcon.href = `${apiUrl}construccion-union/${data[0].id}/destroy`;
            destroyIcon.innerHTML = `<i class="fa fa-trash"></i>`;
            destroyIcon.target = "_blank";
            destroyIcon.className = "destroy-icon";
            destroyIcon.style.marginLeft = "10px";
            destroyIcon.style.display = "none";
            //destroyIcon.setAttribute('data-columna', item.column);
            destroyIcon.setAttribute('data-id_otro', data[0].id);


            // Insert the download icon after the custom-file div
            if (customFileDiv.nextSibling) {
                inputGroup.insertBefore(destroyIcon, customFileDiv.nextSibling);
            }
            else {
                inputGroup.appendChild(destroyIcon);
            }
        }
    }


    idConsbase = data[0].id;
    inhabilitarform("#metodounionfrm", true);
}



function updateConsUnion() {
    if ($("#btn_updateconsunion").text() === "Actualizar") {
        inhabilitarform("#metodounionfrm",false)
        $("#btn_updateconsunion").text('Guardar');
        showDestroyIcons('metodounionfrm', true);
    }
    else {
        var params = {
        };
        var webMethod = "";
        webMethod = "union/updateConstruccionUnion";
        params = {
            id: idConsbase,
            C_0101_0001_id: area,
            C_0302_0049_id: $("#cmtipotecnicaunion").val(),
            C_0302_0050: $("#txtidentificadorunion").val(),
            C_0302_0051: $("#txtrecaplsolunion").val(),
            C_0302_0052: $("#fechaserunion").val(),
            C_0302_0053: $("#fecinstunion").val(),
            C_0302_0054_id: $("#cmbmetubicsoldunion").val(),
            C_0302_0055: $("#fecfabunion").val(),
            C_0302_0056: $("#txtedoactunion").val(),
            C_0302_0057: $("#txtedohisunion").val(),
            coordenada_especifica: $("#coord_esp_idenunion_x").val()+' '+$("#coord_esp_idenunion_y").val(),
            kilometro_especifico: $("#km_esp_idenunion").val()
        };
        var formData = new FormData();
        formData.append('file', $("#fileconstruccionunion")[0].files[0]);

        Object.keys(params).forEach(key => formData.append(key, params[key]));

        for (var value of formData.values()) {
            console.log(value);
        }
        fetch(apiUrl + webMethod, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response)
                return response.json();

            })
            .then(data => {
                if (data.success) {
                    alert("El registro fue actualizado correctamente");
                    $('#construforms').show();
                    $('#metodounionfrm').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
        /*$.ajax({
            type: "POST",
            url: apiUrl + webMethod,
            method: 'POST',
            body: formData,
            success: function (data) {
                alert("El registro fue actualizado correctamente");
                $('#construforms').show();
                $('#metodounionfrm').hide();
            },
            error: function (xhr, ajaxOptions, thrownError) {

            }
        });*/
    }
}



// Profundidad
var idConsprofundidad;


function nuevoconsprofent(){

    $("#btn_saveconsprofent").show();
    $("#btn_updateconsprofent").hide();
    $("#btn_newconsprofent").hide();
    clearInputTextValuesNew('profenterradofrm');
    inhabilitarform("#profenterradofrm", false);

}


function consultaDatosConsProfundidad(id_d=null) {
    var webMethod;
    var params;
    if (id_d)
        {webMethod = "getConsProfundidadById";
         params = {
            id: id_d
        };}
        
    else {
        
        webMethod = "get_construccionprofundidad";
         params = {
            id: $("#cmbAreas option:selected").val(),
            op: 1
        };
}

    $.ajax({
        type: "POST",
        url: apiUrl + webMethod,
        data: params,
        headers:{
            'Accept': 'application/json'
        },
        success: function (data) {
            if (data.success) {
                const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
                existingDownloadIcons.forEach(icon => icon.remove());  
                if (data.data.length > 0) {
                    llenarDatosActualizacionConsProfundidad(data.data);
                    $("#btn_saveconsprofent").hide();
                    $("#btn_updateconsprofent").show();
                    $("#btn_newconsprofent").show();
                }else{

                    clearInputTextValues('profenterradofrm');
                    inhabilitarform("#profenterradofrm",false)
                    $("#btn_saveconsprofent").show();
                    $("#btn_updateconsprofent").hide();

                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;
                
                    $("#txttramogeneralprofent").val(ducto_nombre);
                    $("#txtductogeneralprofent").val(tramo_nombre);
                    $("#txtareageneralprofent").val(area_unitaria_nombre);
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });


}
function llenarDatosActualizacionConsProfundidad(data) {
    
    $("#btn_updateconsprofent").text('Actualizar');

    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== null&& data[0].coordenada_especifica !== null) {
        const coords = data[0].coordenada_especifica.split(' ');
        $("#coord_esp_idenpprofent_x").val(coords[0]);
        $("#coord_esp_idenpprofent_y").val(coords[1]);
    }
    else{$("#coord_esp_idenpprofent_x").val("");
    $("#coord_esp_idenpprofent_y").val("");}


    $("#txtprofcob").val(data[0].C_0303_0058);
    $("#txtmedprofagu").val(data[0].C_0303_0059);
    $("#txtelefontub").val(data[0].C_0303_0060);
    $("#txtelecentub").val(data[0].C_0303_0061);
    $("#txteleterr").val(data[0].C_0303_0062);
    $("#txteleparsuotub").val(data[0].C_0303_0063);
    $("#txtdistinicioruta").val(data[0].C_0303_0064);
    $("#fechamedidaprof").val(data[0].C_0303_0065.split(" ")[0]);
    $("#txtperdirhor").val(data[0].C_0303_0066);
    $("#txtmetmedprof").val(data[0].C_0303_0067);
    $("#txtedoactprof").val(data[0].C_0303_0068);
    $("#txtedohisprof").val(data[0].C_0303_0069);
    $("#km_esp_idenpprofent").val(data[0].kilometro_especifico)
    if (data[0].file !== "" && data[0].file !== null) {
        // Find the correct input group using the data-column attribute
        const inputGroup = document.querySelector(`#filefrmconsprofundidad`);
        const customFileDiv = inputGroup.querySelector('#fileconteinerconsprofundidad');

        if (customFileDiv) {
            // Create the download icon
            const downloadIcon = document.createElement('a');
            downloadIcon.href = `${apiUrl}construccion-profundidad/${data[0].id}/download`;
            downloadIcon.innerHTML = `<i class="fa fa-download"></i>`;
            downloadIcon.target = "_blank";
            downloadIcon.className = "download-icon";
            downloadIcon.style.marginLeft = "10px";
            //downloadIcon.setAttribute('data-columna', item.column);
            downloadIcon.setAttribute('data-id_otro', data[0].id);

            // Insert the download icon after the custom-file div
            if (customFileDiv.nextSibling) {
                inputGroup.insertBefore(downloadIcon, customFileDiv.nextSibling);
            } else {
                inputGroup.appendChild(downloadIcon);
            }

            const destroyIcon = document.createElement('a');
            destroyIcon.href = `${apiUrl}construccion-profundidad/${data[0].id}/destroy`;
            destroyIcon.innerHTML = `<i class="fa fa-trash"></i>`;
            destroyIcon.target = "_blank";
            destroyIcon.className = "destroy-icon";
            destroyIcon.style.marginLeft = "10px";
            destroyIcon.style.display = "none";
            //destroyIcon.setAttribute('data-columna', item.column);
            destroyIcon.setAttribute('data-id_otro', data[0].id);


            // Insert the download icon after the custom-file div
            if (customFileDiv.nextSibling) {
                inputGroup.insertBefore(destroyIcon, customFileDiv.nextSibling);
            }
            else {
                inputGroup.appendChild(destroyIcon);
            }
        }
    }



    idConsprofundidad = data[0].id;
    inhabilitarform("#profenterradofrm", true);

}



function updateConsProfundidad() {
    if ($("#btn_updateconsprofent").text() === "Actualizar") {
        inhabilitarform("#profenterradofrm",false)
        $("#btn_updateconsprofent").text('Guardar');
        showDestroyIcons('profenterradofrm', true);
    }
    else {
        var params = {
        };
        var webMethod = "";
        webMethod = "profundidad/updateConstruccionProfundidad";
        params = {
            id: idConsprofundidad,
            C_0101_0001_id: area,
            C_0303_0058: $("#txtprofcob").val(),
            C_0303_0059: $("#txtmedprofagu").val(),
            C_0303_0060: $("#txtelefontub").val(),
            C_0303_0061: $("#txtelecentub").val(),
            C_0303_0062: $("#txteleterr").val(),
            C_0303_0063: $("#txteleparsuotub").val(),
            C_0303_0064: $("#txtdistinicioruta").val(),
            C_0303_0065: $("#fechamedidaprof").val(),
            C_0303_0066: $("#txtperdirhor").val(),
            C_0303_0067: $("#txtmetmedprof").val(),
            C_0303_0068: $("#txtedoactprof").val(),
            C_0303_0069: $("#txtedohisprof").val(),
            coordenada_especifica: $("#coord_esp_idenpprofent_x").val()+' '+$("#coord_esp_idenpprofent_y").val(),
            kilometro_especifico: $("#km_esp_idenpprofent").val()
        };
        var formData = new FormData();
        formData.append('file', $("#fileconstruccionprofundidad")[0].files[0]);

        Object.keys(params).forEach(key => formData.append(key, params[key]));

        for (var value of formData.values()) {
            console.log(value);
        }

        fetch(apiUrl + webMethod, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response)
                return response.json();

            })
            .then(data => {
                if (data.success) {
                    alert("El registro fue actualizado correctamente");
                    $('#construforms').show();
                    $('#profenterradofrm').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });




        //$.ajax({
        //    type: "POST",
        //    url: apiUrl + webMethod,
        //    method: 'POST',
        //    body: formData,
        //    success: function (data) {
        //        alert("El registro fue actualizado correctamente");
        //        $('#construforms').show();
        //        $('#profenterradofrm').hide();
        //    },
        //    error: function (xhr, ajaxOptions, thrownError) {

        //    }
        //});
    }
}

async function fnshowIndentificacion(id_d=null) {
    $('#identificacionfrm').show();
    $('#disenioforms').hide();
    try {
        await loadtipocostura();
        await loadtipomaterialdisenio();

       
        if (id_d){
        await consultaDatosIdentificacionArea(id_d=id_d);}
        else { consultaDatosIdentificacionArea();}

        // If you want to do something after all functions have completed, you can do it here

    } catch(error) {
        console.error("An error occurred:", error);
    }
    resetValidationClasses('identificacionfrm');
}

// inspeccion

var idDisenioinspeccion;


function nuevoDisenioinspeccion(){

    $("#btn_saveinspeccion").show();
    //$("#btn_newinspeccion").hide();
    $("#btn_updateinspeccion").hide();
    clearInputTextValuesNew('reportesInspeccionfrm');
    inhabilitarform("#reportesInspeccionfrm", false);

}



function consultaDatosinspeccion(id_d = null) {
    clearAllFileInputsInDiv('reportesInspeccionfrm')
    var webMethod;
    var params;
    if (id_d) {
        webMethod = "getConstruccionInspeccionById";
        params = {
            id: id_d
        };
    } else {
        webMethod = "getConstruccionInspeccion";
        params = {
            id: $("#cmbAreas option:selected").val(),
        };
    }

    fetch(apiUrl + webMethod, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    })
    .then(response => response.json())
    .then(data => {
        
        // 1. Remove all existing download icons before adding new ones.
        const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
        existingDownloadIcons.forEach(icon => icon.remove());
       

        const { id: serviceId, success:success,coordenada_especifica:coordenada_especifica,kilometro_especifico:kilometro_especifico, ...columnsData } = data;
        if (success){
        idDisenioinspeccion=serviceId
        if (data.coordenada_especifica !== "" && data.coordenada_especifica !== null&& data.coordenada_especifica !== null) {
            const coords = data.coordenada_especifica.split(' ');
            $("#coord_esp_idenprep_x").val(coords[0]);
            $("#coord_esp_idenprep_y").val(coords[1]);
        }
        else{$("#coord_esp_idenprep_x").val("");
        $("#coord_esp_idenprep_y").val("");}    

        $("#km_esp_idenprep").val(data.kilometro_especifico)
        Object.values(columnsData).forEach(item => {
            if (item.hasFile) {
                // Find the correct input group using the data-column attribute
                const inputGroup = document.querySelector(`.input-group[data-column="${item.column}"]`);
                const customFileDiv = inputGroup.querySelector('.custom-file');
        
                if (customFileDiv) {
                    // Create the download icon
                    const downloadIcon = document.createElement('a');
                    downloadIcon.href = `${apiUrl}disenio-inspeccion/${serviceId}/download/${item.column}`;
                    downloadIcon.innerHTML = `<i class="fa fa-download"></i>`;
                    downloadIcon.target = "_blank";
                    downloadIcon.className = "download-icon";
                    downloadIcon.style.marginLeft = "10px";
                    downloadIcon.setAttribute('data-columna', item.column);
                    downloadIcon.setAttribute('data-id_otro', serviceId);
                    
                    // Insert the download icon after the custom-file div
                    if (customFileDiv.nextSibling) {
                        inputGroup.insertBefore(downloadIcon, customFileDiv.nextSibling);
                    } else {
                        inputGroup.appendChild(downloadIcon);
                    }

                    const destroyIcon = document.createElement('a');
                    destroyIcon.href = `${apiUrl}disenio-inspeccion/${serviceId}/destroy/${item.column}`;
                    destroyIcon.innerHTML = `<i class="fa fa-trash"></i>`;
                    destroyIcon.target = "_blank";
                    destroyIcon.className = "destroy-icon";
                    destroyIcon.style.marginLeft = "10px";
                    destroyIcon.style.display = "none"; 
                    destroyIcon.setAttribute('data-columna', item.column);
                    destroyIcon.setAttribute('data-id_otro', serviceId);
                   
                    
                    // Insert the download icon after the custom-file div
                    if (customFileDiv.nextSibling) {
                        inputGroup.insertBefore(destroyIcon, customFileDiv.nextSibling);
                    } else {
                        inputGroup.appendChild(destroyIcon);
                    }


                    
                }
            }
            
        });
        $("#btn_updateinspeccion").text("Actualizar") 
        inhabilitarform("#reportesInspeccionfrm", true)
        $("#btn_saveinspeccion").hide();
        //$("#btn_newinspeccion").show();
        $("#btn_updateinspeccion").show();
        showDestroyIcons('reportesInspeccionfrm',false);
    }

    else {

        inhabilitarform("#reportesInspeccionfrm", false)
        $("#btn_saveinspeccion").show();
        $("#btn_newinspeccion").hide();
        $("#btn_updateinspeccion").hide();
        showDestroyIcons('reportesInspeccionfrm',false);
    }
    })
    .catch(error => console.error('Error fetching data:', error));
}



function updateConstruccionInspeccion() {
    if ($("#btn_updateinspeccion").text() === "Actualizar") {
        inhabilitarform("#reportesInspeccionfrm", false);
        showDestroyIcons('reportesInspeccionfrm',true);
        $("#btn_updateinspeccion").text('Guardar');
    }
    else {
        var webMethod = "updateinspeccion";

        const formData = new FormData();
        formData.append("id", idDisenioinspeccion)
        formData.append("kilometro_especifico",$("#km_esp_idenprep").val() )
        formData.append("coordenada_especifica",  $("#coord_esp_idenprep_x").val()+' '+$("#coord_esp_idenprep_y").val(),)
        formData.append("C_0101_0001_id", area)
        // Make sure files are being selected and appended properly
        if($("#C_0309_112")[0].files[0]) {
            formData.append("C_0309_112", $("#C_0309_112")[0].files[0]);
        }
        if($("#C_0309_113")[0].files[0]) {
            formData.append("C_0309_113", $("#C_0309_113")[0].files[0]);
        }
        if($("#C_0309_114")[0].files[0]) {
            formData.append("C_0309_114", $("#C_0309_114")[0].files[0]);
        }
        if($("#C_0309_115")[0].files[0]) {
            formData.append("C_0309_115", $("#C_0309_115")[0].files[0]);
        }
        
        // Log formData to console for debugging (this will not display the content of the files)
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        fetch(apiUrl + webMethod, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            
        })
        .then(data => {
            if (data.success) {

                alert("Información almacenada correctamente");
                $('#construforms').show();
                $('#reportesInspeccionfrm').hide();
                $("#btn_updateinspeccion").text("Actualizar")
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
    }
}




// Seguridad Prearranque

var idConsSeguridad;


function nuevoDisenioseguridad(){

    $("#btn_saveseguridad").show();
    //$("#btn_newseguridad").hide();
    $("#btn_updateseguridad").hide();
    clearInputTextValuesNew('seguridadprearranquefrm');
    inhabilitarform("#seguridadprearranquefrm", false);

}



function consultaDatosseguridad(id_d = null) {
    clearAllFileInputsInDiv('seguridadprearranquefrm')
    var webMethod;
    var params;
    if (id_d) {
        webMethod = "getConstruccionSeguridadById";
        params = {
            id: id_d
        };
    } else {
        webMethod = "getConstruccionSeguridad";
        params = {
            id: $("#cmbAreas option:selected").val(),
        };
    }

    fetch(apiUrl + webMethod, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    })
    .then(response => response.json())
    .then(data => {
        
        // 1. Remove all existing download icons before adding new ones.
        const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
        existingDownloadIcons.forEach(icon => icon.remove());
       

        const { id: serviceId, success:success,coordenada_especifica:coordenada_especifica,kilometro_especifico:kilometro_especifico, ...columnsData } = data;
        if (success){
        idConsSeguridad=serviceId
        if (data.coordenada_especifica !== "" && data.coordenada_especifica !== null&& data.coordenada_especifica !== null) {
            const coords = data.coordenada_especifica.split(' ');
            $("#coord_esp_idenpseg_x").val(coords[0]);
            $("#coord_esp_idenpseg_y").val(coords[1]);
        }
        else{$("#coord_esp_idenpseg_x").val("");
        $("#coord_esp_idenpseg_y").val("");}    

        $("#km_esp_idenpseg").val(data.kilometro_especifico)
        Object.values(columnsData).forEach(item => {
            if (item.hasFile) {
                // Find the correct input group using the data-column attribute
                const inputGroup = document.querySelector(`.input-group[data-column="${item.column}"]`);
                const customFileDiv = inputGroup.querySelector('.custom-file');
        
                if (customFileDiv) {
                    // Create the download icon
                    const downloadIcon = document.createElement('a');
                    downloadIcon.href = `${apiUrl}construccion-seguridad/${serviceId}/download/${item.column}`;
                    downloadIcon.innerHTML = `<i class="fa fa-download"></i>`;
                    downloadIcon.target = "_blank";
                    downloadIcon.className = "download-icon";
                    downloadIcon.style.marginLeft = "10px";
                    downloadIcon.setAttribute('data-columna', item.column);
                    downloadIcon.setAttribute('data-id_otro', serviceId);
                    
                    // Insert the download icon after the custom-file div
                    if (customFileDiv.nextSibling) {
                        inputGroup.insertBefore(downloadIcon, customFileDiv.nextSibling);
                    } else {
                        inputGroup.appendChild(downloadIcon);
                    }

                    const destroyIcon = document.createElement('a');
                    destroyIcon.href = `${apiUrl}construccion-seguridad/${serviceId}/destroy/${item.column}`;
                    destroyIcon.innerHTML = `<i class="fa fa-trash"></i>`;
                    destroyIcon.target = "_blank";
                    destroyIcon.className = "destroy-icon";
                    destroyIcon.style.marginLeft = "10px";
                    destroyIcon.style.display = "none"; 
                    destroyIcon.setAttribute('data-columna', item.column);
                    destroyIcon.setAttribute('data-id_otro', serviceId);
                   
                    
                    // Insert the download icon after the custom-file div
                    if (customFileDiv.nextSibling) {
                        inputGroup.insertBefore(destroyIcon, customFileDiv.nextSibling);
                    } else {
                        inputGroup.appendChild(destroyIcon);
                    }


                    
                }
            }
            
        });
        $("#btn_updateseguridad").text("Actualizar") 
        inhabilitarform("#seguridadprearranquefrm", true)
        $("#btn_saveseguridad").hide();
        //$("#btn_newseguridad").show();
        $("#btn_updateseguridad").show();
        showDestroyIcons('seguridadprearranquefrm',false);
    }

    else {

        inhabilitarform("#seguridadprearranquefrm", false)
        $("#btn_saveseguridad").show();
        $("#btn_newseguridad").hide();
        $("#btn_updateseguridad").hide();
        showDestroyIcons('seguridadprearranquefrm',false);
    }
    })
    .catch(error => console.error('Error fetching data:', error));
}



function updateConstruccionSeguridad() {
    if ($("#btn_updateseguridad").text() === "Actualizar") {
        inhabilitarform("#seguridadprearranquefrm", false);
        showDestroyIcons('seguridadprearranquefrm',true);
        $("#btn_updateseguridad").text('Guardar');
    }
    else {
        var webMethod = "updateseguridad";

        const formData = new FormData();
        formData.append("id", idConsSeguridad)
        formData.append("kilometro_especifico",$("#km_esp_idenprep").val() )
        formData.append("coordenada_especifica",  $("#coord_esp_idenprep_x").val()+' '+$("#coord_esp_idenprep_y").val(),)
        formData.append("C_0101_0001_id", area)
        // Make sure files are being selected and appended properly
        if($("#C_0312_122")[0].files[0]) {
            formData.append("C_0312_122", $("#C_0312_122")[0].files[0]);
        }
        if($("#C_0312_123")[0].files[0]) {
            formData.append("C_0312_123", $("#C_0312_123")[0].files[0]);
        }
        if($("#C_0312_124")[0].files[0]) {
            formData.append("C_0312_124", $("#C_0312_124")[0].files[0]);
        }
        if($("#C_0312_125")[0].files[0]) {
            formData.append("C_0312_125", $("#C_0312_125")[0].files[0]);
        }
        if($("#C_0312_126")[0].files[0]) {
            formData.append("C_0312_126", $("#C_0312_126")[0].files[0]);
        }
        if($("#C_0312_127")[0].files[0]) {
            formData.append("C_0312_127", $("#C_0312_127")[0].files[0]);
        }
        if($("#C_0312_128")[0].files[0]) {
            formData.append("C_0312_128", $("#C_0312_128")[0].files[0]);
        }
        if($("#C_0312_129")[0].files[0]) {
            formData.append("C_0312_129", $("#C_0312_129")[0].files[0]);
        }


        
        // Log formData to console for debugging (this will not display the content of the files)
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        fetch(apiUrl + webMethod, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            
        })
        .then(data => {
            if (data.success) {

                alert("Información almacenada correctamente");
                $('#construforms').show();
                $('#seguridadprearranquefrm').hide();
                $("#btn_updateseguridad").text("Actualizar")
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
    }
}


function fnshowServicio(id_d=null) {
    $('#serviciofrm').show();
    $('#disenioforms').hide();
    if (id_d){
        consultaDatosServicio(id_d=id_d);}
        else { consultaDatosServicio();}   
}


function fnshowPresion(id_d=null) {
    $('#presionfrm').show();
    $('#disenioforms').hide();

    consultaDatosPresionArea(id_d=id_d);
    resetValidationClasses('presionfrm');
}
function fnshowProteccion(id_d=null) {
    $('#proteccionfrm').show();
    $('#disenioforms').hide();
    consultaDatosProteccionArea(id_d=id_d);
    resetValidationClasses('proteccionfrm');
}
function fnshowdisenioforms() {
    $('#disenioforms').show();
    $('#forms').hide();


    $("#txtductoproteccion").val(txtducto);
    $("#txttramoproteccion").val(txttramo);
    $("#txtareaproteccion").val(txtarea);
    $("#txtductoservicio").val(txtducto);
    $("#txttramoservicio").val(txttramo);
    $("#txtareaservicio").val(txtarea);
}
//#endregion 
//#region unidad medida diseño

//#endregion
//#region FORMULARIOS NAGEVACIÓN CONSTRUCCIÓN
function fnsshowconstruforms() {
    $('#construforms').show();
    $('#forms').hide();

}
async function fnshowmetunion(id_d=null) {


    $('#metodounionfrm').show();
    $('#construforms').hide();
    try {

        await loadtipotecnica();
        await loadtipoubicacion();;

        
    if (id_d){
         consultaDatosConsUnion(id_d=id_d);}
        else { consultaDatosConsUnion();}


        // If you want to do something after all functions have completed, you can do it here

    } catch(error) {
        console.error("An error occurred:", error);
    }
    resetValidationClasses('metodounionfrm');

}
function fnshowprofenterrado(id_d=null) {
    $('#profenterradofrm').show();
    $('#construforms').hide();
    

    if (id_d){
        consultaDatosConsProfundidad(id_d=id_d);}
        else { consultaDatosConsProfundidad();}
    resetValidationClasses('profenterradofrm');
    

}
async function fnshowprotipocruces(id_d=null) {
    //$('#tiposcrucesfrm').show();
    //$('#construforms').hide();
    //$("#txtductogeneraltipcruce").val(txtducto);
    //$("#txttramogeneraltipocruce").val(txttramo);
    //$("#txtareageneralptipocruce ").val(txtarea);
    //loadCmbCruceServicio();
    //loadCmbCruceTuberia();
    //loadCmbC $('#identificacionfrm').show();  
    $('#tiposcrucesfrm').show();
    $('#construforms').hide();
    try {
        await loadCmbCruceServicio();
        await loadCmbCruceTuberia();
        await loadCmbCruceTransporte();

        if (id_d){
             consultaDatosConsCruces(id_d=id_d);}
            else { consultaDatosConsCruces();}


    

        // If you want to do something after all functions have completed, you can do it here

    }
    catch (error) {
        console.error("An error occurred:", error);
    }
    resetValidationClasses('tiposcrucesfrm');
}
//#region consulta y actualización Construcción crcuces
var idConsCruces;

function nuevoconscruces(){

    $("#btnGuardarCruces").show();
    $("#btn_updatecruces").hide();
    $("#btn_newconscruces").hide();
    clearInputTextValuesNew('tiposcrucesfrm');
    inhabilitarform("#tiposcrucesfrm", false);

}

function consultaDatosConsCruces(id_d=null) {



    var webMethod;
    var params;
    if (id_d)
        {webMethod = "getConsCrucesById";
         params = {
            id: id_d
        };}
        
    else {
        
        webMethod = "get_construccioncruces";
         params = {
            id: $("#cmbAreas option:selected").val(),
            op: 1
        };
}

    $.ajax({
        type: "POST",
        url: apiUrl + webMethod,
        data: params,
        headers: {
            'Accept': 'application/json'
        },
        success: function (data) {
            if (data.success) {
                const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
                 existingDownloadIcons.forEach(icon => icon.remove());
                if (data.data.length > 0) {
                    llenarDatosActualizacionCruces(data.data);
                    $("#btnGuardarCruces").hide();
                    $("#btn_updatecruces").show();
                    $("#btn_newconscruces").show();
                } else {

                    clearInputTextValues('tiposcrucesfrm');
                    inhabilitarform("#tiposcrucesfrm", false)
                    $("#btnGuardarCruces").show();
                    $("#btn_updatecruces").hide();

                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;

                    $("#txtductogeneraltipcruce").val(ducto_nombre);
                    $("#txttramogeneraltipocruce").val(tramo_nombre);
                    $("#txtareageneralptipocruce").val(area_unitaria_nombre);
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });


}
function llenarDatosActualizacionCruces(data) {

    $("#btn_updatecruces").text('Actualizar');
    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== null) {
        const coords = data[0].coordenada_especifica.split(' ');
        $("#coord_esp_idenptipocruce_x").val(coords[0]);
        $("#coord_esp_idenptipocruce_y").val(coords[1]);
    }
    else {
        $("#coord_esp_idenptipocruce_x").val("");
        $("#coord_esp_idenptipocruce_y").val("");
    }
    $("#km_esp_idenptipocruce").val(data[0].kilometro_especifico);
    $("#cmbTipcruce option:contains(" + data[0].C_0304_0070 + ")").attr('selected', 'selected');
    $("#txtclaseloca").val(data[0].C_0304_0071);
    $("#txtpropietario").val(data[0].C_0304_0072);
    $("#txtdictacruce").val(data[0].C_0304_0073);
    $("#txtdistinf").val(data[0].C_0304_0074);
    $("#txtdistptocruce").val(data[0].C_0304_0075);
    $("#txtloccruresptub").val(data[0].C_0304_0076);
    $("#txtedoactualcruce").val(data[0].C_0304_0077);
    $("#txtedohistcruce").val(data[0].C_0304_0078);
    $("#txttipllanurainun").val(data[0].C_0304_0079);
    $("#txttipcrucehidro").val(data[0].C_0304_0080);
    $("#cmbtipcamtrans option:contains(" + data[0].C_0304_0081 + ")").attr('selected', 'selected');
    $("#cmbgasnecpat option:contains(" + data[0].C_0304_0082 + ")").attr('selected', 'selected');
    $("#txtvialidadabierta").val(data[0].C_0304_0083);
    $("#txtNumCarrillesVialidad").val(data[0].C_0304_0084);
    $("#txtEdohistoricoCrucedos").val(data[0].C_0304_0085);
    $("#txtEdoActualCrucedos").val(data[0].C_0304_0086);
    $("#cmbetipocrucetrans option:contains(" + data[0].C_0304_0087 + ")").attr('selected', 'selected');
    $("#cmbexiunicab option:contains(" + data[0].C_0304_0088 + ")").attr('selected', 'selected');
    $("#txtultpottubapago").val(data[0].C_0304_0089);
    $("#txtultpotencen").val(data[0].C_0304_0090);
    $("#txtrectubext").val(data[0].C_0304_0091);//
    $("#txtdiamnomtub").val(data[0].C_0304_0092);
    $("#cmntiptub option:contains(" + data[0].C_0304_0093 + ")").attr('selected', 'selected');
    $("#cmbexisunioncabcruceytub option:contains(" + data[0].C_0304_0094 + ")").attr('selected', 'selected');
    $("#cmbtipcruceserv option:contains(" + data[0].C_0304_0095 + ")").attr('selected', 'selected');
    $("#txtvoltajecruce").val(data[0].C_0304_0096);
    $("#txtnombrescruces").val(data[0].nombre);
    idConsCruces = data[0].id;
    inhabilitarform("#tiposcrucesfrm", true);
    if (data[0].file !== "" && data[0].file !== null) {
        // Find the correct input group using the data-column attribute
        const inputGroup = document.querySelector(`#filefrmconscruces`);
        const customFileDiv = inputGroup.querySelector('#fileconteinerconscruces');

        if (customFileDiv) {
            // Create the download icon
            const downloadIcon = document.createElement('a');
            downloadIcon.href = `${apiUrl}construccion-cruces/${data[0].id}/download`;
            downloadIcon.innerHTML = `<i class="fa fa-download"></i>`;
            downloadIcon.target = "_blank";
            downloadIcon.className = "download-icon";
            downloadIcon.style.marginLeft = "10px";
            //downloadIcon.setAttribute('data-columna', item.column);
            downloadIcon.setAttribute('data-id_otro', data[0].id);

            // Insert the download icon after the custom-file div
            if (customFileDiv.nextSibling) {
                inputGroup.insertBefore(downloadIcon, customFileDiv.nextSibling);
            } else {
                inputGroup.appendChild(downloadIcon);
            }

            const destroyIcon = document.createElement('a');
            destroyIcon.href = `${apiUrl}construccion-cruces/${data[0].id}/destroy`;
            destroyIcon.innerHTML = `<i class="fa fa-trash"></i>`;
            destroyIcon.target = "_blank";
            destroyIcon.className = "destroy-icon";
            destroyIcon.style.marginLeft = "10px";
            destroyIcon.style.display = "none";
            //destroyIcon.setAttribute('data-columna', item.column);
            destroyIcon.setAttribute('data-id_otro', data[0].id);


            // Insert the download icon after the custom-file div
            if (customFileDiv.nextSibling) {
                inputGroup.insertBefore(destroyIcon, customFileDiv.nextSibling);
            }
            else {
                inputGroup.appendChild(destroyIcon);
            }
        }
    }
}
function updateCrucesConstruccion() {
    if ($("#btn_updatecruces").text() === "Actualizar") {
        inhabilitarform("#tiposcrucesfrm", false)
        $("#btn_updatecruces").text('Guardar');
        showDestroyIcons("tiposcrucesfrm", true);
    }
    else {
        var params = {
        };
        var webMethod = "";
        webMethod = "cruces/updateConstruccionCruces";
        params = {
            id: idConsCruces,
            C_0101_0001_id: area,
            C_0304_0070_id: $("#cmbTipcruce").val(),//Tipod de cruce
            C_0304_0071: $("#txtclaseloca").val(),//Clase de Localización

            C_0304_0072: $("#txtpropietario").val(),//Propietario

            C_0304_0073: $("#txtdictacruce").val(), //Distancia del cruce encima o debajo de la tubería

            C_0304_0074: $("#txtdistinf").val(),// Distancia desde el punto de cruce influye en la dirección aguas abajo

            C_0304_0075: $("#txtdistptocruce").val(),//Distancia desde el punto de cruce influye en la dirección aguas arriba

            C_0304_0076: $("#txtloccruresptub").val(),//Localización del cruce respecto la tubería (arriba/abajo)

            C_0304_0077: $("#txtedoactualcruce").val(),//Estado Actual

            C_0304_0078: $("#txtedohistcruce").val(),//Estado histórico

            C_0304_0079: $("#txttipllanurainun").val(),//Tipo de llanura de inundación
            C_0304_0080: $("#txttipcrucehidro").val(),//Tipo de cruce hidrológico
            C_0304_0081: $("#cmbtipcamtrans").val(),//Indica si el camino es de transporte pesado

            C_0304_0082: $("#cmbgasnecpat").val(),// El gasoducto necesita ser patrullado

            C_0304_0083: $("#txtvialidadabierta").val(),//No. de Carrilles de la vialidad-

            C_0304_0084: $("#txtNumCarrillesVialidad").val(), //Estado histórico

            C_0304_0085: $("#txtEdohistoricoCrucedos").val(),//Estado actual

            C_0304_0086: $("#txtEdoActualCrucedos").val(),//Tipo de cruce de transporte

            C_0304_0087_id: $("#cmbetipocrucetrans").val(), //¿Existe unión de cables?

            C_0304_0088: $("#cmbexiunicab").val(),//¿Existe unión de cables? (si, no, desconocido)


            C_0304_0089: $("#txtultpottubapago").val(),//Último potencial de tubería a tierra medido (expresado en voltios) se apag+o

            C_0304_0090: $("#txtultpotencen").val(),//Último potencial de tubería a tierra medido (expresado en voltios) se encendió

            C_0304_0091: $("#txtrectubext").val(),// Recubrimiento de tubería extranjera
            C_0304_0092: $("#txtdiamnomtub").val(),//Diámetro nominal tubería extranjera

            C_0304_0093_id: $("#cmntiptub").val(),//Tipo de tuberia
            C_0304_0094: $("#cmbexisunioncabcruceytub").val(),//¿Existe unión de cables entre el servicio de cruce y la tubería?
            C_0304_0095_id: $("#cmbtipcruceserv").val(),//Tipo de cruce de servicio
            C_0304_0096: $("#txtvoltajecruce").val(),// Voltaje transportado por el servicio
            coordenada_especifica: $("#coord_esp_idenptipocruce_x").val() + ' ' + $("#coord_esp_idenptipocruce_y").val(),
            kilometro_especifico: $("#km_esp_idenptipocruce").val(),
            nombre: $("#txtnombrecruces").val()
        };
        var formData = new FormData();
        formData.append('file', $("#fileconstruccioncruces")[0].files[0]);

        Object.keys(params).forEach(key => formData.append(key, params[key]));

        for (var value of formData.values()) {
            console.log(value);
        }
        fetch(apiUrl + webMethod, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response)
                return response.json();

            })
            .then(data => {
                if (data.success) {
                    alert("El registro fue actualizado correctamente");
                    $('#construforms').show();
                    $('#tiposcrucesfrm').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });




        //$.ajax({
        //    type: "POST",
        //    url: apiUrl + webMethod,
        //    method: 'POST',
        //    body: formData,
        //    success: function (data) {
        //        alert("El registro fue actualizado correctamente");
        //        $('#construforms').show();
        //        $('#tiposcrucesfrm').hide();
        //    },
        //    error: function (xhr, ajaxOptions, thrownError) {

        //    }
        //});
    }
}
//#endregion 
async function fnshowhermeti(id_d=null) {
    $('#hermetisidadfrm').show();
    $('#construforms').hide();
    try {

        if (id_d){
            await consultaDatosConsHermeticidad(id_d=id_d);}
            else { consultaDatosConsHermeticidad();}


        // If you want to do something after all functions have completed, you can do it here

    }
    catch (error) {
        console.error("An error occurred:", error);
    }
    resetValidationClasses('hermetisidadfrm');
}
//#region consulta y actualización Construcción Hermeticidad
var idConsHerme;

function nuevoconshermeticidad(){

    $("#btnGuardarHermeticidad").show();
    $("#btn_updatehermeticidad").hide();
    $("#btn_newconshermeticidad").hide();
    clearInputTextValuesNew('hermetisidadfrm');
    inhabilitarform("#hermetisidadfrm", false);

}


function consultaDatosConsHermeticidad(id_d=null) {

    var webMethod;
    var params;
    if (id_d)
        {webMethod = "getConsHermeticidadById";
         params = {
            id: id_d
        };}
        
    else {
        
        webMethod = "get_construccionhermeticidad";
         params = {
            id: $("#cmbAreas option:selected").val(),
            op: 1
        };
}
    $.ajax({
        type: "POST",
        url: apiUrl + webMethod,
        data: params,
        headers: {
            'Accept': 'application/json'
        },
        success: function (data) {
            if (data.success) {
                const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
                 existingDownloadIcons.forEach(icon => icon.remove());
                if (data.data.length > 0) {
                    llenarDatosActualizacionHermeticidad(data.data);
                    $("#btnGuardarHermeticidad").hide();
                    $("#btn_updatehermeticidad").show();
                    $("#btn_newconshermeticidad").show();
                } else {

                    clearInputTextValues('hermetisidadfrm');
                    inhabilitarform("#hermetisidadfrm", false)
                    $("#btnGuardarHermeticidad").show();
                    $("#btn_updatehermeticidad").hide();

                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;

                    $("#txtductogeneralherm").val(ducto_nombre);
                    $("#txttramogeneralherm").val(tramo_nombre);
                    $("#txtareageneralherm").val(area_unitaria_nombre);
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });


}
function llenarDatosActualizacionHermeticidad(data) {

    $("#btn_updatehermeticidad").text('Actualizar');
    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== null) {
        const coords = data[0].coordenada_especifica.split(' ');
        $("#coord_esp_idenpherm_x").val(coords[0]);
        $("#coord_esp_idenpherm_y").val(coords[1]);
    }
    else {
        $("#coord_esp_idenpherm_x").val("");
        $("#coord_esp_idenpherm_y").val("");
    }
    $("#km_esp_idenpherm").val(data[0].kilometro_especifico);
    $("#txtnombempher").val(data[0].C_0305_0097);
    $("#fecpruebher").val(data[0].C_0305_0098.split(' ')[0]);
    $("#txtdurpruebher").val(data[0].C_0305_0099);
    $("#txtmedempher").val(data[0].C_0305_0100);
    $("#txtlongducprobados").val(data[0].C_0305_0101);
    $("#txtpresprueb").val(data[0].C_0305_0102);
    $("#cmbunidadpresionmax option:contains(" + data[0].unidad_presion_max + ")").attr('selected', 'selected');


    $("#txtpresdisger").val(data[0].C_0305_0103);
    $("#cmbunidadpresiondisenio option:contains(" + data[0].unidad_presion_disenio + ")").attr('selected', 'selected');

    $("#txtcalbher").val(data[0].C_0305_0104);


    $("#txtvarher").val(data[0].C_0305_0105);
    $("#cmbunidadpresionmin option:contains(" + data[0].unidad_presion_min + ")").attr('selected', 'selected');


    $("#txtvarpreher").val(data[0].C_0305_0106);
    $("#cmbunidadvariacionespres option:contains(" + data[0].unidad_variaciones_presion + ")").attr('selected', 'selected');

    idConsHerme = data[0].id;
    inhabilitarform("#hermetisidadfrm", true);
    if (data[0].file !== "" && data[0].file !== null) {
        // Find the correct input group using the data-column attribute
        const inputGroup = document.querySelector(`#filefrmhermeticidad`);
        const customFileDiv = inputGroup.querySelector('#fileconteinerconshermeticidad');

        if (customFileDiv) {
            // Create the download icon
            const downloadIcon = document.createElement('a');
            downloadIcon.href = `${apiUrl}construccion-hermeticidad/${data[0].id}/download`;
            downloadIcon.innerHTML = `<i class="fa fa-download"></i>`;
            downloadIcon.target = "_blank";
            downloadIcon.className = "download-icon";
            downloadIcon.style.marginLeft = "10px";
            //downloadIcon.setAttribute('data-columna', item.column);
            downloadIcon.setAttribute('data-id_otro', data[0].id);

            // Insert the download icon after the custom-file div
            if (customFileDiv.nextSibling) {
                inputGroup.insertBefore(downloadIcon, customFileDiv.nextSibling);
            } else {
                inputGroup.appendChild(downloadIcon);
            }

            const destroyIcon = document.createElement('a');
            destroyIcon.href = `${apiUrl}construccion-hermeticidad/${data[0].id}/destroy`;
            destroyIcon.innerHTML = `<i class="fa fa-trash"></i>`;
            destroyIcon.target = "_blank";
            destroyIcon.className = "destroy-icon";
            destroyIcon.style.marginLeft = "10px";
            destroyIcon.style.display = "none";
            //destroyIcon.setAttribute('data-columna', item.column);
            destroyIcon.setAttribute('data-id_otro', data[0].id);


            // Insert the download icon after the custom-file div
            if (customFileDiv.nextSibling) {
                inputGroup.insertBefore(destroyIcon, customFileDiv.nextSibling);
            }
            else {
                inputGroup.appendChild(destroyIcon);
            }
        }
    }
}
function updateHermeticidadConstruccion() {
    if ($("#btn_updatehermeticidad").text() === "Actualizar") {
        inhabilitarform("#hermetisidadfrm", false)
        $("#btn_updatehermeticidad").text('Guardar');
        showDestroyIcons('hermetisidadfrm', true)
    }
    else {
        var params = {
        };
        var webMethod = "";//saveConstruccionHermeticidad
        webMethod = "hermeticidad/updateConstruccionHermeticidad";
        params = {
            id: idConsHerme,
            C_0101_0001_id: area,
            C_0305_0097: $("#txtnombempher").val(),//Nombre de la empresa
            C_0305_0098: $("#fecpruebher").val(),//Fecha de prueba
            C_0305_0099: $("#txtdurpruebher").val(),//Duración de la prueba
            C_0305_0100: $("#txtmedempher").val(),//Medio de prueba de empleo
            C_0305_0101: $("#txtlongducprobados").val(),//Longitud de los ductos probados
            C_0305_0102: $("#txtpresprueb").val(),//Presión de diseño
            C_0305_0103: $("#txtpresdisger").val(),//Calibración
            C_0305_0104: $("#txtcalbher").val(),//Variaciones de presión
            C_0305_0105: $("#txtvarher").val(),//Presión de prueba mínima
            C_0305_0106: $("#txtvarpreher").val(),//Variaciones de presión
            coordenada_especifica: $("#coord_esp_idenpherm_x").val() + ' ' + $("#coord_esp_idenpherm_y").val(),
            kilometro_especifico: $("#km_esp_idenpherm").val(),
            unidad_presion_max: $("#cmbunidadpresionmax").val(),
            unidad_presion_disenio: $("#cmbunidadpresiondisenio").val(),
            unidad_presion_min: $("#cmbunidadpresionmin").val(),
            unidad_variaciones_presion: $("#cmbunidadvariacionespres").val()
        };
        var formData = new FormData();
        formData.append('file', $("#fileconstruccionhermeticidad")[0].files[0]);

        Object.keys(params).forEach(key => formData.append(key, params[key]));

        for (var value of formData.values()) {
            console.log(value);
        }
        fetch(apiUrl + webMethod, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response)
                return response.json();

            })
            .then(data => {
                if (data.success) {
                alert("El registro fue actualizado correctamente");
                $('#construforms').show();
                $('#hermetisidadfrm').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });

        //$.ajax({
        //    type: "POST",
        //    url: apiUrl + webMethod,
        //    method: 'POST',
        //    body: formData,
        //    success: function (data) {
        //        alert("El registro fue actualizado correctamente");
        //        $('#construforms').show();
        //        $('#hermetisidadfrm').hide();
        //    },
        //    error: function (xhr, ajaxOptions, thrownError) {

        //    }
        //});
    }
}
//#endrgegion
function fnshowreporteinsp(id_d = null) {
    $('#reportesInspeccionfrm').show();
    if (id_d) {
        consultaDatosinspeccion(id_d = id_d);
    }
    else { consultaDatosinspeccion(); }

    $('#construforms').hide();
    $("#txtductogeneralrep").val(txtducto);
    $("#txttramogeneralrep").val(txttramo);
    $("#txtareageneralrep ").val(txtarea);




}
//function fnshowseguridadpre(id_d = null) {
//    $('#seguridadprearranquefrm').show();
//    if (id_d) {
//        consultaDatosseguridad(id_d = id_d);
//    }
//    else { consultaDatosseguridad(); }

//    $('#construforms').hide();
//    $("#txtductogeneralseg").val(txtducto);
//    $("#txttramogeneralseg").val(txttramo);
//    $("#txtareageneralseg ").val(txtarea);
//}




async function fnshowprotecccato(id_d=null) {
    //$('#proteccatodicafrm').show();
    //$('#construforms').hide();
    //$("#txtductogeneralprot").val(txtducto);
    //$("#txttramogeneralprot").val(txttramo);
    //$("#txtareageneralprot ").val(txtarea);
    
    //loadtipoproteccioncatodica();
    //loadtipoinstalacion();
    $('#proteccatodicafrm').show();
    $('#construforms').hide();
    try {
        await loadtipoproteccioncatodica();
        await loadtipoinstalacion();

        if (id_d){
            await consultaDatosConsCatodica(id_d=id_d);}
            else { consultaDatosConsCatodica();}

        // If you want to do something after all functions have completed, you can do it here

    }
    catch (error) {
        console.error("An error occurred:", error);
    }
    resetValidationClasses('identificacionfrm');
}
//region consulta y actualziación Construcción Catódica
var idConsCato;

function nuevoconscatodica(){

    $("#btnGuardarcatodica").show();
    $("#btn_updatecatodica").hide();
    $("#btn_newconscatodica").hide();
    clearInputTextValuesNew('proteccatodicafrm');
    inhabilitarform("#proteccatodicafrm", false);

}



function consultaDatosConsCatodica(id_d=null) {

    var webMethod;
    var params;
    if (id_d)
        {webMethod = "getConsCatodicaById";
         params = {
            id: id_d
        };}
        
    else {
        
        webMethod = "get_construccioncatodica";
         params = {
            id: $("#cmbAreas option:selected").val(),
            op: 1
        };
}

    $.ajax({
        type: "POST",
        url: apiUrl + webMethod,
        data: params,
        headers: {
            'Accept': 'application/json'
        },
        success: function (data) {
            const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
                 existingDownloadIcons.forEach(icon => icon.remove());
            if (data.success) {
                var datainfo;
                if (webMethod === "getConsCatodicaById")
                    datainfo = data.data;
                else if (webMethod === "get_construccioncatodica")
                    datainfo = data.data.datagrid;
                if (datainfo.length > 0) {
                    llenarDatosActualizacionCatodica(datainfo);
                    $("#btnGuardarcatodica").hide();
                    $("#btn_newconscatodica").show();
                    $("#btn_updatecatodica").show();
                } else {

                    clearInputTextValues('proteccatodicafrm');
                    inhabilitarform("#proteccatodicafrm", false)
                    $("#btnGuardarcatodica").show();
                    $("#btn_updatecatodica").hide();

                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;

                    $("#txtductogeneralprot").val(ducto_nombre);
                    $("#txttramogeneralprot").val(tramo_nombre);
                    $("#txtareageneralprot").val(area_unitaria_nombre);
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });


}
function llenarDatosActualizacionCatodica(data) {

    $("#btn_updatecatodica").text('Actualizar');
    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== null) {
        const coords = data[0].coordenada_especifica.split(' ');
        $("#coord_esp_idenpprot_x").val(coords[0]);
        $("#coord_esp_idenpprot_y").val(coords[1]);
    }
    else {
        $("#coord_esp_idenpprot_x").val("");
        $("#coord_esp_idenpprot_y").val("");
    }
    $("#km_esp_idenpprot").val(data[0].kilometro_especifico);
    $("#cmbTipocato option:contains(" + data[0].C_0310_116 + ")").attr('selected', 'selected');
    $("#cmbtipinstprot option:contains(" + data[0].C_0310_117 + ")").attr('selected', 'selected');


    $("#txtnombrecatodica").val(data[0].nombre);
    $("#txtnoserie").val(data[0].C_0310_118);
    $("#txtfabricante").val(data[0].C_0310_119);
    $("#extedoprote").val(data[0].C_0310_120);

    idConsCato = data[0].id;
    inhabilitarform("#proteccatodicafrm", true);
    if (data[0].file !== "" && data[0].file !== null) {
        // Find the correct input group using the data-column attribute
        const inputGroup = document.querySelector(`#filefrmcatodica`);
        const customFileDiv = inputGroup.querySelector('#fileconteinerconscatodica');

        if (customFileDiv) {
            // Create the download icon
            const downloadIcon = document.createElement('a');
            downloadIcon.href = `${apiUrl}construccion-catodica/${data[0].id}/download`;
            downloadIcon.innerHTML = `<i class="fa fa-download"></i>`;
            downloadIcon.target = "_blank";
            downloadIcon.className = "download-icon";
            downloadIcon.style.marginLeft = "10px";
            //downloadIcon.setAttribute('data-columna', item.column);
            downloadIcon.setAttribute('data-id_otro', data[0].id);

            // Insert the download icon after the custom-file div
            if (customFileDiv.nextSibling) {
                inputGroup.insertBefore(downloadIcon, customFileDiv.nextSibling);
            } else {
                inputGroup.appendChild(downloadIcon);
            }

            const destroyIcon = document.createElement('a');
            destroyIcon.href = `${apiUrl}construccion-catodica/${data[0].id}/destroy`;
            destroyIcon.innerHTML = `<i class="fa fa-trash"></i>`;
            destroyIcon.target = "_blank";
            destroyIcon.className = "destroy-icon";
            destroyIcon.style.marginLeft = "10px";
            destroyIcon.style.display = "none";
            //destroyIcon.setAttribute('data-columna', item.column);
            destroyIcon.setAttribute('data-id_otro', data[0].id);


            // Insert the download icon after the custom-file div
            if (customFileDiv.nextSibling) {
                inputGroup.insertBefore(destroyIcon, customFileDiv.nextSibling);
            }
            else {
                inputGroup.appendChild(destroyIcon);
            }
        }
    }
}
//
function updateConstruccionCatodica() {
    if ($("#btn_updatecatodica").text() === "Actualizar") {
        inhabilitarform("#proteccatodicafrm", false)
        $("#btn_updatecatodica").text('Guardar');
        showDestroyIcons("proteccatodicafrm", true)
    }
    else {
        var params = {
        };
        var webMethod = "";//saveConstruccionHermeticidad
        webMethod = "catodica/updateConstruccionCatodica";
        params = {
            id: idConsCato,
            C_0101_0001_id: area,
            C_0310_116_id: $("#cmbTipocato").val(),
            C_0310_117_id: $("#cmbtipinstprot").val(),
            nombre: $("#txtnombrecatodica").val(),
            C_0310_118: $("#txtnoserie").val(),
            C_0310_119: $("#txtfabricante").val(),
            C_0310_120: $("#extedoprote").val(),
            coordenada_especifica: $("#coord_esp_idenpprot_x").val() + ' ' + $("#coord_esp_idenpprot_y").val(),
            kilometro_especifico: $("#km_esp_idenpprot").val()
        };
        var formData = new FormData();
        formData.append('file', $("#fileconstruccioncatodica")[0].files[0]);

        Object.keys(params).forEach(key => formData.append(key, params[key]));

        for (var value of formData.values()) {
            console.log(value);
        }
        fetch(apiUrl + webMethod, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response)
                return response.json();

            })
            .then(data => {
                if (data.success) {
                    alert("El registro fue actualizado correctamente");
                    $('#construforms').show();
                    $('#proteccatodicafrm').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
        //$.ajax({
        //    type: "POST",
        //    url: apiUrl + webMethod,
        //    method: 'POST',
        //    body: formData,
        //    success: function (data) {
        //        alert("El registro fue actualizado correctamente");
        //        $('#construforms').show();
        //        $('#proteccatodicafrm').hide();
        //    },
        //    error: function (xhr, ajaxOptions, thrownError) {

        //    }
        //});
    }
}

//endregion
function fnshowseguridadpre(id_d=null) {
    $('#seguridadprearranquefrm').show();
    if (id_d){
        consultaDatosseguridad(id_d=id_d);}
       else { consultaDatosseguridad();}
    
    $('#construforms').hide();
    $("#txtductogeneralseg").val(txtducto);
    $("#txttramogeneralseg").val(txttramo);
    $("#txtareageneralseg ").val(txtarea);
}
async function fnshowbaseconst(id_d=null) {
    $('#constbasefrm').show();
    $('#construforms').hide();
    try {

        await loadtiporecubrimiento();

        
        if (id_d){
             consultaDatosConsGeneral(id_d=id_d);}
            else { consultaDatosConsGeneral();}


        // If you want to do something after all functions have completed, you can do it here

    } catch(error) {
        console.error("An error occurred:", error);
    }
    resetValidationClasses('constbasefrm');

}



function cancelbasecons() {
    $('#constbasefrm').hide();
    $('#construforms').show();
}
function cancelunion() {
    $('#metodounionfrm').hide();
    $('#construforms').show();
}
function fncancelprofenterrado() {
    $('#profenterradofrm').hide();
    $('#construforms').show();
}
function fncanceltipocruces() {
    $('#tiposcrucesfrm').hide();
    $('#construforms').show();
}
function cancelherme() {
    $('#hermetisidadfrm').hide();
    $('#construforms').show();
}
function cancelreporteinsp() {
    $('#reportesInspeccionfrm').hide();
    $('#construforms').show();
}
function cancelprotcato() {
    $('#proteccatodicafrm').hide();
    $('#construforms').show();
}
function cancelseguridadpre() {
    $('#seguridadprearranquefrm').hide();
    $('#construforms').show();
}
function reiniciarFormsConstruccion() {
    $('#registro').show();
    $('#forms').hide();
    goToStep1()
    $('#construforms').hide();
    loadDuctos();
    $("#cmbTramo").empty();
    $('#cmbTramo').append($('<option>', {
        value: 0,
        text: 'Selecciona...'
    }));
    $("#cmbAreas").empty();
    $('#cmbAreas').append($('<option>', {
        value: 0,
        text: 'Selecciona...'
    }));
}
//#endregion
//#region Construcción 

//function savebasecons() {
//    var webMethod = "saveConstruccionGeneral";
//    if ($("#coord_esp_idenbasecons").val() !== "") {
//        const formData = new FormData();

//        formData.append("C_0101_0001_id", area)
//        // Make sure files are being selected and appended properly
//        if ($("#inputGroupFile01")[0].files[0]) {
//            formData.append("C_0308_0111", $("#filepruebabasecons")[0].files[0]);
//        }
//        // Log formData to console for debugging (this will not display the content of the files)
//        for (var pair of formData.entries()) {
//            console.log(pair[0] + ', ' + pair[1]);
//        }
//        var params = {
//            C_0101_0001_id: area,
//            C_0301_0048: $("#fechaconstbase").val(),
//            C_0306_0108: $("#metrecubbase").val(),
//            C_0307_0109: $("#txttiposuelobaseconst").val(),
//            C_0307_0110: $("#txtmatrellenobaseconst").val(),
//            C_0308_0110: $("#presionhermebasecons").val(),
//            file: formData,
//            C_0308_0111: $("#cmtipotecnicaunion").val(),
//            coordenada_especifica: $("#coord_esp_idenbasecons").val(),
//            kilometro_especifico: $("#km_esp_idenbasecons").val()
//        };
//        console.log(JSON.stringify(params))
//        fetch(apiUrl + webMethod, {
//            method: 'POST',
//            headers: headers,
//            body: JSON.stringify(params)
//        })
//            .then(response => {
//                if (!response.ok) {
//                    throw new Error('Network response was not ok');
//                }
//                console.log(response)
//                return response.json();

//            })
//            .then(data => {
//                if (data.success) {
//                    console.log(data.data);
//                    alert("Información almacenada correctamente");
//                    $('#construforms').show();
//                    $('#constbasefrm').hide();
//                }
//            })
//            .catch(error => {
//                alert("Error: " + error);
//            });
//    }
//    else {
//        alert("Es necesario ingresar el diámetro en pulgadas para realizar el registro");
//    }
//}
function saveConstruccionGeneral() {

    var webMethod = "disenio_servicio/store";

    const formData = new FormData();
    formData.append("C_0101_0001_id", area)
    // Make sure files are being selected and appended properly
    if ($("#inputGroupFile01")[0].files[0]) {
        formData.append("C_0205_0012", $("#inputGroupFile01")[0].files[0]);
    }
    if ($("#inputGroupFile02")[0].files[0]) {
        formData.append("C_0205_0013", $("#inputGroupFile02")[0].files[0]);
    }
    if ($("#inputGroupFile03")[0].files[0]) {
        formData.append("C_0205_0014", $("#inputGroupFile03")[0].files[0]);
    }
    if ($("#inputGroupFile04")[0].files[0]) {
        formData.append("C_0205_0015", $("#inputGroupFile04")[0].files[0]);
    }
    if ($("#inputGroupFile05")[0].files[0]) {
        formData.append("C_0205_0016", $("#inputGroupFile05")[0].files[0]);
    }
   
    formData.append('file', $("#inputGroupFile06")[0].files[0]);
    // Log formData to console for debugging (this will not display the content of the files)
    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }






    fetch(apiUrl + webMethod, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();

        })
        .then(data => {
            console.log(typeof data)
            console.log(data)
            if (data.success) {
                console.log(data)
                alert("Información almacenada correctamente");
                $('#disenioforms').show();
                $('#serviciofrm').hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function saveConstruccionUnion() {

    var webMethod = "saveConstruccionUnion";

    var params = {
        C_0101_0001_id: area,
        C_0302_0049_id: $("#cmtipotecnicaunion").val(),
        C_0302_0050: $("#txtidentificadorunion").val(),
        C_0302_0051: $("#txtrecaplsolunion").val(),
        C_0302_0052: $("#fechaserunion").val(),
        C_0302_0053: $("#fecinstunion").val(),
        C_0302_0054_id: $("#cmbmetubicsoldunion").val(),
        C_0302_0055: $("#fecfabunion").val(),
        C_0302_0056: $("#txtedoactunion").val(),
        C_0302_0057: $("#txtedohisunion").val(),
        coordenada_especifica: $("#coord_esp_idenunion_x").val()+' '+$("#coord_esp_idenunion_y").val(),
        kilometro_especifico: $("#km_esp_idenunion").val()
    };


    if ($("#cmtiptecnicaunion").val() !== "0") {
        var formData = new FormData();
        formData.append('file', $("#fileconstruccionunion")[0].files[0]);

        Object.keys(params).forEach(key => formData.append(key, params[key]));

        for (var value of formData.values()) {
            console.log(value);
        }
        fetch(apiUrl + webMethod, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
    
            })
            .then(data => {
                console.log(typeof data)
                console.log(data)
                if (data.success) {
                    console.log(data)
                    alert("Información almacenada correctamente");
                    $('#construforms').show();
                    $('#metodounionfrm').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }
    else {
        alert("Es necesario ingresar el tipo de técnica para realizar el registro");
    }
    
}
function saveConstruccionProfundidad() {

    var webMethod = "saveConstruccionProfundidad";

    var params = {
        C_0101_0001_id: area,
        C_0303_0058: $("#txtprofcob").val(),
        C_0303_0059: $("#txtmedprofagu").val(),
        C_0303_0060: $("#txtelefontub").val(),
        C_0303_0061: $("#txtelecentub").val(),
        C_0303_0062: $("#txteleterr").val(),
        C_0303_0063: $("#txteleparsuotub").val(),
        C_0303_0064: $("#txtdistinicioruta").val(),
        C_0303_0065: $("#fechamedidaprof").val(),
        C_0303_0066: $("#txtperdirhor").val(),
        C_0303_0067: $("#txtmetmedprof").val(),
        C_0303_0068: $("#txtedoactprof").val(),
        C_0303_0069: $("#txtedohisprof").val(),
        coordenada_especifica: $("#coord_esp_idenpprofent_x").val()+' '+$("#coord_esp_idenpprofent_y").val(),
        kilometro_especifico: $("#km_esp_idenpprofent").val()
    };

    var formData = new FormData();
    formData.append('file', $("#fileconstruccionprofundidad")[0].files[0]);

    Object.keys(params).forEach(key => formData.append(key, params[key]));

    for (var value of formData.values()) {
        console.log(value);
    }
    fetch(apiUrl + webMethod, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();

        })
        .then(data => {
            console.log(typeof data)
            console.log(data)
            if (data.success) {
                console.log(data)
                alert("Información almacenada correctamente");
                $('#construforms').show();
                $('#profenterradofrm').hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function saveConstruccionCruces() {

    var webMethod = "saveConstruccionCruces";

    var params = {
        C_0101_0001_id: area,
        C_0304_0070_id: $("#cmbTipcruce").val(),//Tipod de cruce
        C_0304_0071: $("#txtclaseloca").val(),//Clase de Localización

        C_0304_0072: $("#txtpropietario").val(),//Propietario

        C_0304_0073: $("#txtdictacruce").val(), //Distancia del cruce encima o debajo de la tubería

        C_0304_0074: $("#txtdistinf").val(),// Distancia desde el punto de cruce influye en la dirección aguas abajo

        C_0304_0075: $("#txtdistptocruce").val(),//Distancia desde el punto de cruce influye en la dirección aguas arriba

        C_0304_0076: $("#txtloccruresptub").val(),//Localización del cruce respecto la tubería (arriba/abajo)

        C_0304_0077: $("#txtedoactualcruce").val(),//Estado Actual

        C_0304_0078: $("#txtedohistcruce").val(),//Estado histórico

        C_0304_0079: $("#txttipllanurainun").val(),//Tipo de llanura de inundación
        C_0304_0080: $("#txttipcrucehidro").val(),//Tipo de cruce hidrológico
        C_0304_0081: $("#cmbtipcamtrans").val(),//Indica si el camino es de transporte pesado

        C_0304_0082: $("#cmbgasnecpat").val(),// El gasoducto necesita ser patrullado

        C_0304_0083: $("#txtvialidadabierta").val(),//No. de Carrilles de la vialidad-

        C_0304_0084: $("#txtNumCarrillesVialidad").val(), //Estado histórico

        C_0304_0085: $("#txtEdohistoricoCrucedos").val(),//Estado actual

        C_0304_0086: $("#txtEdoActualCrucedos").val(),//Tipo de cruce de transporte

        C_0304_0087_id: $("#cmbetipocrucetrans").val(), //¿Existe unión de cables?

        C_0304_0088: $("#cmbexiunicab").val(),//¿Existe unión de cables? (si, no, desconocido)


        C_0304_0089: $("#txtultpottubapago").val(),//Último potencial de tubería a tierra medido (expresado en voltios) se apag+o

        C_0304_0090: $("#txtultpotencen").val(),//Último potencial de tubería a tierra medido (expresado en voltios) se encendió

        C_0304_0091: $("#txtrectubext").val(),// Recubrimiento de tubería extranjera
        C_0304_0092: $("#txtdiamnomtub").val(),//Diámetro nominal tubería extranjera

        C_0304_0093_id: $("#cmntiptub").val(),//Tipo de tuberia
        C_0304_0094: $("#cmbexisunioncabcruceytub").val(),//¿Existe unión de cables entre el servicio de cruce y la tubería?
        C_0304_0095_id: $("#cmbtipcruceserv").val(),//Tipo de cruce de servicio
        C_0304_0096: $("#txtvoltajecruce").val(),// Voltaje transportado por el servicio
        coordenada_especifica: $("#coord_esp_idenptipocruce_x").val()+' '+$("#coord_esp_idenptipocruce_y").val(),
        kilometro_especifico: $("#km_esp_idenptipocruce").val(),
        nombre: $("#txtnombrecruces").val()
    };
    var formData = new FormData();
    formData.append('file', $("#fileconstruccioncruces")[0].files[0]);

    Object.keys(params).forEach(key => formData.append(key, params[key]));

    for (var value of formData.values()) {
        console.log(value);
    }
    fetch(apiUrl + webMethod, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();

        })
        .then(data => {
            console.log(typeof data)
            console.log(data)
            if (data.success) {
                console.log(data)
                alert("Información almacenada correctamente");
                $('#construforms').show();
                $('#tiposcrucesfrm').hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function saveConstruccionHermeticidad() {

    var webMethod = "saveConstruccionHermeticidad";

    var params = {
        C_0101_0001_id: area,
        C_0305_0097: $("#txtnombempher").val(),//Nombre de la empresa
        C_0305_0098: $("#fecpruebher").val(),//Fecha de prueba
        C_0305_0099: $("#txtdurpruebher").val(),//Duración de la prueba
        C_0305_0100: $("#txtmedempher").val(),//Medio de prueba de empleo
        C_0305_0101: $("#txtlongducprobados").val(),//Longitud de los ductos probados
        C_0305_0102: $("#txtpresprueb").val(),//Presión de diseño
        C_0305_0103: $("#txtpresdisger").val(),//Calibración
        C_0305_0104: $("#txtcalbher").val(),//Variaciones de presión
        C_0305_0105: $("#txtvarher").val(),//Presión de prueba mínima
        C_0305_0106: $("#txtvarpreher").val(),//Variaciones de presión
        coordenada_especifica: $("#coord_esp_idenpherm_x").val()+' '+$("#coord_esp_idenpherm_y").val(),
        kilometro_especifico: $("#km_esp_idenpherm").val(),
        unidad_presion_max: $("#cmbunidadpresionmax").val(),
        unidad_presion_disenio: $("#cmbunidadpresiondisenio").val(),
        unidad_presion_min: $("#cmbunidadpresionmin").val(),
        unidad_variaciones_presion: $("#cmbunidadvariacionespres").val()
    };
    var formData = new FormData();
    formData.append('file', $("#fileconstruccionhermeticidad")[0].files[0]);

    Object.keys(params).forEach(key => formData.append(key, params[key]));

    for (var value of formData.values()) {
        console.log(value);
    }
        fetch(apiUrl + webMethod, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();

        })
        .then(data => {
            console.log(typeof data)
            console.log(data)
            if (data.success) {
                console.log(data)
                alert("Información almacenada correctamente");
                $('#construforms').show();
                $('#hermetisidadfrm').hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function saveConstruccioInspeccion() {

    var webMethod = "saveConstruccionInspeccion";

    const formData = new FormData();

    formData.append("kilometro_especifico",$("#km_esp_idenprep").val() )
    formData.append("coordenada_especifica",  $("#coord_esp_idenprep_x").val()+' '+$("#coord_esp_idenprep_y").val(),)
    formData.append("C_0101_0001_id", area)
    // Make sure files are being selected and appended properly
    if($("#C_0309_112")[0].files[0]) {
        formData.append("C_0309_112", $("#C_0309_112")[0].files[0]);
    }
    if($("#C_0309_113")[0].files[0]) {
        formData.append("C_0309_113", $("#C_0309_113")[0].files[0]);
    }
    if($("#C_0309_114")[0].files[0]) {
        formData.append("C_0309_114", $("#C_0309_114")[0].files[0]);
    }
    if($("#C_0309_115")[0].files[0]) {
        formData.append("C_0309_115", $("#C_0309_115")[0].files[0]);
    }
    if ($("#fileconstruccioninspeccion")[0].files[0]) {
        formData.append("file", $("#fileconstruccioninspeccion")[0].files[0]);
    }


    fetch(apiUrl + webMethod, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        
    })
    .then(data => {
        console.log(typeof data)
        console.log(data)
        if (data.success) {
            $("#C_0309_112").val('');
            $("#C_0309_113").val('');
            $("#C_0309_114").val('');
            $("#C_0309_115").val('');

            alert("Información almacenada correctamente");
            $('#construforms').show();
            $('#reportesInspeccionfrm').hide();
        }
    })
    .catch(error => {
        alert("Error: " + error);
    });
}
function saveConstruccioCatodica() {

    var webMethod = "saveConstruccionCatodica";

    var params = {
        C_0101_0001_id: area,
        C_0310_116_id: $("#cmbTipocato").val(),
        C_0310_117_id: $("#cmbtipinstprot").val(),
        nombre: $("#txtnombrecatodica").val(),
        C_0310_118: $("#txtnoserie").val(),
        C_0310_119: $("#txtfabricante").val(),
        C_0310_120: $("#extedoprote").val(),
        coordenada_especifica: $("#coord_esp_idenpprot_x").val()+' '+$("#coord_esp_idenpprot_y").val(),
        kilometro_especifico: $("#km_esp_idenpprot").val()
    };

    var formData = new FormData();
    formData.append('file', $("#fileconstruccioncatodica")[0].files[0]);

    Object.keys(params).forEach(key => formData.append(key, params[key]));

    for (var value of formData.values()) {
        console.log(value);
    }
    
    fetch(apiUrl + webMethod, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();

        })
        .then(data => {
            console.log(typeof data)
            console.log(data)
            if (data.success) {
                console.log(data)
                alert("Información almacenada correctamente");
                $('#construforms').show();
                $('#proteccatodicafrm').hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}




function saveConstruccioSeguridad() {


    var webMethod = "saveConstruccionSeguridad";

    const formData = new FormData();

    formData.append("kilometro_especifico",$("#km_esp_idenpseg").val() )
    formData.append("coordenada_especifica",  $("#coord_esp_idenpprot_x").val()+' '+$("#coord_esp_idenpprot_y").val(),)
    formData.append("C_0101_0001_id", area)
    // Make sure files are being selected and appended properly
    if($("#C_0312_122")[0].files[0]) {
        formData.append("C_0312_122", $("#C_0312_122")[0].files[0]);
    }
    if($("#C_0312_123")[0].files[0]) {
        formData.append("C_0312_123", $("#C_0312_123")[0].files[0]);
    }
    if($("#C_0312_124")[0].files[0]) {
        formData.append("C_0312_124", $("#C_0312_124")[0].files[0]);
    }
    if($("#C_0312_125")[0].files[0]) {
        formData.append("C_0312_125", $("#C_0312_125")[0].files[0]);
    }
    if($("#C_0312_126")[0].files[0]) {
        formData.append("C_0312_126", $("#C_0312_126")[0].files[0]);
    }
    if($("#C_0312_127")[0].files[0]) {
        formData.append("C_0312_127", $("#C_0312_127")[0].files[0]);
    }
    if($("#C_0312_128")[0].files[0]) {
        formData.append("C_0312_128", $("#C_0312_128")[0].files[0]);
    }
    if($("#C_0312_129")[0].files[0]) {
        formData.append("C_0312_129", $("#C_0312_129")[0].files[0]);
    }
    if ($("#fileconstruccionseguridad")[0].files[0]) {
        formData.append("file", $("#fileconstruccionseguridad")[0].files[0]);
    }



    // Log formData to console for debugging (this will not display the content of the files)
    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }


    fetch(apiUrl + webMethod, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        
    })
    .then(data => {
        console.log(typeof data)
        console.log(data)
        if (data.success) {
            $("#C_0312_122").val('');
            $("#C_0312_123").val('');
            $("#C_0312_124").val('');
            $("#C_0312_125").val('');
            $("#C_0312_126").val('');
            $("#C_0312_127").val('');
            $("#C_0312_128").val('');
            $("#C_0312_129").val('');
            alert("Información almacenada correctamente");
            $('#construforms').show();
            $('#seguridadprearranquefrm').hide();
        }
    })
    .catch(error => {
        alert("Error: " + error);
    });

}





function cancelotroCruceServicio() {
    $("#espcruceServicio").hide();
}
function saveotroCruceServicio() {
    var webMethod = "saveCruceServicio";
    var params = {
        C_0304_0095: $("#newCruceServicio").val(),
        descripcion: $("#newDescTipoServicio").val()
    };


    console.log(JSON.stringify(params))
    fetch(apiUrl + webMethod, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response)
            return response.json();

        })
        .then(data => {
            if (data.success) {
                console.log(data.data);
                alert("Información almacenada correctamente");
                loadCmbCruceServicio();
                $("#espcruceServicio").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotroCruceServicio() {
    $('#espcruceServicio').show();
}
function loadCmbCruceServicio() {
    var webMethod = "get_CruceServicioCons";
    $.ajax({
        type: "GET",
        url: apiUrl + webMethod,
        success: function (data) {
            if (data.success) {
                console.log(data.data);
                $("#cmbtipcruceserv").empty();
                $('#cmbtipcruceserv').append($('<option>', {
                    value: 0,
                    text: 'Selecciona...'
                }));
                for (var i = 0; i < data.data.length; i++) {
                    $('#cmbtipcruceserv').append($('<option>', {
                        value: data.data[i].id,
                        text: data.data[i].C_0304_0095
                    }));
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}


function cancelotroTuberiaCruce() {
    $("#espcruceTuberia").hide();
}
function showotroCruceTuberia() {
    $('#espcruceTuberia').show();
}
function saveotroCruceTuberia() {
    var webMethod = "saveTuberiaCons";
    var params = {
        C_0304_0093: $("#newCruceTuberia").val(),
        descripcion: $("#newDescCruceTuberia").val()
    };


    console.log(JSON.stringify(params))
    fetch(apiUrl + webMethod, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response)
            return response.json();

        })
        .then(data => {
            if (data.success) {
                console.log(data.data);
                alert("Información almacenada correctamente");
                loadCmbCruceTuberia();
                $("#espcruceTuberia").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function loadCmbCruceTuberia() {
    var webMethod = "get_Tuberia";
    $.ajax({
        type: "GET",
        url: apiUrl + webMethod,
        success: function (data) {
            if (data.success) {
                console.log(data.data);
                $("#cmntiptub").empty();
                $('#cmntiptub').append($('<option>', {
                    value: 0,
                    text: 'Selecciona...'
                }));
                for (var i = 0; i < data.data.length; i++) {
                    $('#cmntiptub').append($('<option>', {
                        value: data.data[i].id,
                        text: data.data[i].C_0304_0093
                    }));
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}


function cancelotroTransporteCruce() {
    $("#espcruceTransporte").hide();
}


function creartipotecnicaunion() {
    $("#espcruceTransporte").hide();
}


function showotroCruceTransporte() {
    $('#espcruceTransporte').show();
}
function saveotroCruceTransporte() {
    var webMethod = "saveCruceTransporte";
    var params = {
        C_0304_0087: $("#newCruceTransporte").val(),
        descripcion: $("#newDescTipoTransporte").val()
    };


    console.log(JSON.stringify(params))
    fetch(apiUrl + webMethod, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response)
            return response.json();

        })
        .then(data => {
            if (data.success) {
                console.log(data.data);
                alert("Información almacenada correctamente");
                loadCmbCruceTransporte();
                $("#espcruceTransporte").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function loadCmbCruceTransporte() {
    var webMethod = "get_CruceTransporteCons";
    $.ajax({
        type: "GET",
        url: apiUrl + webMethod,
        success: function (data) {
            if (data.success) {
                console.log(data.data);
                $("#cmbetipocrucetrans").empty();
                $('#cmbetipocrucetrans').append($('<option>', {
                    value: 0,
                    text: 'Selecciona...'
                }));
                for (var i = 0; i < data.data.length; i++) {
                    $('#cmbetipocrucetrans').append($('<option>', {
                        value: data.data[i].id,
                        text: data.data[i].C_0304_0087
                    }));
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}




//#endregion
function selectTab(evt, tabName) {
    // Declare all variables

    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("nav-item");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    document.getElementById("Contenido").style.display = "block";
    if (tabName === 'Opcion1') {
        loadDuctos();
       
    }

}



function selectTabupdate(evt, tabName) {
    // Declare all variables

    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("nav-item");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    document.getElementById("Contenido").style.display = "block";


}



function loadtipocostura() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_tipocostura";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmbTipoCostura").empty();
                    $('#cmbTipoCostura').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmbTipoCostura').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0208_0029
                        }));
                    }
                    resolve(data); // Resolve the promise with the data
                } else {
                    reject(new Error('Data not successful')); // Reject if data is not successful
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                reject(thrownError); // Reject the promise with the error
            }
        });
    });
}

function loadtiporecubrimiento() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_tiporecubrimiento";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    console.log(data.data);
                    $("#cmtiporecubrimientobase").empty();
                    $('#cmtiporecubrimientobase').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmtiporecubrimientobase').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0308_0111
                        }));
                    }
                    resolve();  // Resolve the promise when the success condition is met.
                } else {
                    reject(new Error('Data was not successful'));  // Reject the promise if data.success is false.
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                reject(new Error(thrownError));  // Reject the promise when there's an error.
            }
        });
    });
}

function loadtipomaterialdisenio() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_tipomaterialdisenio";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    console.log(data.data);
                    $("#cmbTipoMaterial").empty();
                    $('#cmbTipoMaterial').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmbTipoMaterial').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0204_0011
                        }));
                    }
                    resolve(data); // Resolve the promise with the data
                } else {
                    reject(new Error('Data not successful')); // Reject if data is not successful
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                reject(thrownError); // Reject the promise with the error
            }
        });
    });
}

function loadtipoproteccioncatodica() {
    var webMethod = "get_tipoproteccioncatodica";
    $.ajax({
        type: "GET",
        url: apiUrl + webMethod,
        success: function (data) {
            if (data.success) {
                console.log(data.data);
                $("#cmbTipocato").empty();
                $('#cmbTipocato').append($('<option>', {
                    value: 0,
                    text: 'Selecciona...'
                }));
                for (var i = 0; i < data.data.length; i++) {
                    $('#cmbTipocato').append($('<option>', {
                        value: data.data[i].id,
                        text: data.data[i].C_0310_116
                    }));
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}


function loadtipoinstalacion() {
    var webMethod = "get_tipoinstalacion";
    $.ajax({
        type: "GET",
        url: apiUrl + webMethod,
        success: function (data) {
            if (data.success) {
                console.log(data.data);
                $("#cmbtipinstprot").empty();
                $('#cmbtipinstprot').append($('<option>', {
                    value: 0,
                    text: 'Selecciona...'
                }));
                for (var i = 0; i < data.data.length; i++) {
                    $('#cmbtipinstprot').append($('<option>', {
                        value: data.data[i].id,
                        text: data.data[i].C_0310_117
                    }));
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}

function loadtipotecnica() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_tipotecnica";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmtiptecnicaunion").empty();
                    $('#cmtiptecnicaunion').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {

                        $('#cmtiptecnicaunion').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0302_0049
                        }));
                    }
                    
                    resolve();  // Resolve the promise when the success condition is met.
                } else {
                    reject(new Error('Data was not successful'));  // Reject the promise if data.success is false.
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                reject(new Error(thrownError));  // Reject the promise when there's an error.
            }
        });
    });
}

function loadtipoubicacion() {


    return new Promise((resolve, reject) => {
        var webMethod = "get_tipoubicacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmbmetubicsoldunion").empty();
                $('#cmbmetubicsoldunion').append($('<option>', {
                    value: 0,
                    text: 'Selecciona...'
                }));
                for (var i = 0; i < data.data.length; i++) {
                    $('#cmbmetubicsoldunion').append($('<option>', {
                        value: data.data[i].id,
                        text: data.data[i].C_0302_0054
                    }));
                }
                    
                    resolve();  // Resolve the promise when the success condition is met.
                } else {
                    reject(new Error('Data was not successful'));  // Reject the promise if data.success is false.
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                reject(new Error(thrownError));  // Reject the promise when there's an error.
            }
        });
    });

}


function loadDuctos() {
    var webMethod = "ductos/fetch";
    var params = {
        property: 2,
    };
    $.ajax({
        type: "POST",
        url: apiUrl + webMethod,
        data: params,
        success: function (data) {
            if (data.length > 0 && data !== undefined) {
                console.log(data.data);
                $("#cmbDucto").empty();
                $('#cmbDucto').append($('<option>', {
                    value: 0,
                    text: 'Selecciona...'
                }));
                for (var i = 0; i < data.length; i++) {    
                    console.log(data[i].nombre)              
                    $('#cmbDucto').append($('<option>', {
                        value: data[i].id,
                        text: data[i].nombre
                    }));
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}


function goToStep1() {
    // Simulating click on step-1
    $('a[href="#step-1"]').click();
    
    // Resetting step buttons to initial state
    $('.stepwizard-step a').removeClass('btn-primary').addClass('btn-default').attr('disabled', 'disabled'); // Making all steps disabled
    $('a[href="#step-1"]').addClass('btn-primary').removeClass('btn-default').removeAttr('disabled'); // Enabling only step-1
}


function reg_newArea() {
    reiniciarForms();
}
function reiniciarForms() {
    $('#registro').show();
    $('#forms').hide();
    goToStep1()

    $('#disenioforms').hide();
    loadDuctos();
    $("#cmbTramo").empty();
    $('#cmbTramo').append($('<option>', {
        value: 0,
        text: 'Selecciona...'
    }));
    $("#cmbAreas").empty();
    $('#cmbAreas').append($('<option>', {
        value: 0,
        text: 'Selecciona...'
    }));
}

function atras_pasodos() {
    $('#step-1').show();
    $('#step-2').hide();
}
function atras_pasotres() {
    $('#step-2').show();
    $('#step-3').hide();
}
function saveDisenioGral() {
    var miCadena = $("#fec_fab").val();
    miCadena= miCadena.replace(/["']/g, "");
    var webMethod = "saveIdentificacion";
    var diam_mm = "";
    if ($('#diam_mm').is(':visible')) {
        diam_mm = $('#diam_mm').val();
    }
    else {
        diam_mm = "";
    }
    if ($("#diam_in").val() != "") {
        var params = {
            area_unitaria_id: area,
            longitud: $("#longitud").val(),
            diametro_in: $('#diam_in').val(),
            diametro_mm: diam_mm,
            espesor_mm: $("#esp_mm").val(),
            tipo_material_disenio: $("#cmbTipoMaterial").val(),
            temp_c: $("#temp_c").val(),
            tipo_costura: $("#cmbTipoCostura").val(),
            fecha_fab: $("#fec_fab").val(),
            porcentaje_carbono: $("#porc_carbono").val(),
            resistencia_traccion: $("#res_trac").val(),
            resistencia_elastico: $("#lim_elas").val(),
            coordenada_especifica: $("#coord_esp_iden_x").val()+' '+$("#coord_esp_iden_y").val(),
            kilometro_especifico: $("#km_esp_iden").val(),
            fec_fab_fin: $("#fec_fab_fin").val(),
            diametro_nominal: $("#cmbunidaddiametro").val(),
            espesor_pared: $("#cmbunidadespesor").val(),
            temperatura: $("#cmbunidadtemperatura").val()
        };
        var formData = new FormData();
        formData.append('file', $("#filedisenioidentificacion")[0].files[0]);

        Object.keys(params).forEach(key => formData.append(key, params[key]));
       
        for (var value of formData.values()) {
            console.log(value);
        }
        fetch(apiUrl + webMethod, {
           method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response)
                return response.json();

            })
            .then(data => {
                if (data.success) {
                    console.log(data.data);
                    alert("Información almacenada correctamente");
                    $('#disenioforms').show();
                    $('#identificacionfrm').hide();
                    loadidentificacion();

                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }
    else {
        alert("Es necesario ingresar el diámetro en pulgadas para realizar el registro");
    }
}
function savebasecons() {
    var webMethod = "saveConstruccionGeneral";
    if ($("#fechaconstbase").val() !== "") {
        
        var params = {
            C_0101_0001_id: area,
            C_0301_0048: $("#fechaconstbase").val(),
            C_0306_0108: $("#metrecubbase").val(),
            C_0307_0109: $("#txttiposuelobaseconst").val(),
            C_0307_0110: $("#txtmatrellenobaseconst").val(),
            C_0308_0110: $("#presionhermebasecons").val(),
            unidad_presion_prueba: $("#cmbunidadpresionhermebasecons").val(),
            C_0311_121: $("#cmtiporecubrimientobase").val(),
            coordenada_especifica: $("#coord_esp_idenbasecons_x").val()+' '+$("#coord_esp_idenbasecons_y").val(),
            kilometro_especifico: $("#km_esp_idenbasecons").val()
        };
        var formData = new FormData();
        formData.append('file', $("#fileconstruccionbase")[0].files[0]);

        Object.keys(params).forEach(key => formData.append(key, params[key]));

        for (var value of formData.values()) {
            console.log(value);
        }

       // console.log(JSON.stringify(params))
        fetch(apiUrl + webMethod, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response)
                return response.json();

            })
            .then(data => {
                if (data.success) {
                    console.log(data.data);
                    alert("Información almacenada correctamente");
                    $('#construforms').show();
                    $('#constbasefrm').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }
    else {
        alert("Es necesario ingresar la fecha de construcción para realizar el registro");
    }
}
function saveotroMaterialDisenio() {
    var webMethod = "saveTypeMaterial";
    var params = {
        C_0204_0011: $("#newTipoMaterial").val(),
        descripcion: $("#newDescMaterial").val()
    };


    console.log(JSON.stringify(params))
    fetch(apiUrl + webMethod, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response)
            return response.json();

        })
        .then(data => {
            if (data.success) {
                console.log(data.data);
                alert("Información almacenada correctamente");
                loadtipomaterialdisenio();
                $("#espMaterial").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function saveotroCostura() {
    var webMethod = "saveTypeCostura";
    var params = {
        C_0208_0029: $("#newTipocostura").val(),
        descripcion: $("#newDescCostura").val()
    };


    console.log(JSON.stringify(params))
    fetch(apiUrl + webMethod, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response)
            return response.json();

        })
        .then(data => {
            if (data.success) {
                console.log(data.data);
                alert("Información almacenada correctamente");
                loadtipocostura();
                $("#espCostura").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function cancelotroMaterialDisenio() {
    $("#espMaterial").hide();
}

function cancelotroProteccionCatodica() {
    $("#crearproteccioncatodica").hide();
}

function cancelotroTipoInstalacion() {
    $("#creartipoinstalacion").hide();
}

function cancelotroTipoUbicacion() {
    $("#creartipoubicacionunion").hide();
}


function cancelotroTipoRecubrimiento() {
    $("#creartiporecubrimiento").hide();
}
function cancelotroCostura() {
    $("#espCostura").hide();
}
function saveDisenioPresion()  {
    var webMethod = "savePresion";
    var params = {
        area_unitaria_id: area,
        entidad: $("#txtEntidadEmpresa").val(),
        fecha_calculo: $("#txtfechacalculo").val(),
        metodo_calculo: $("#txtMetodoCalculo").val(),
        presion_nom_psi: $("#txtPresNomPSI").val(),
        presion_dis_psi: $("#txtPresDisenio").val(),
        presion_red_psi: $("#txtPresRedPSI").val(), 
        coordenada_especifica: $("#coord_esp_iden_pres_x").val()+' '+$("#coord_esp_iden_pres_y").val(),
        kilometro_especifico: $("#km_esp_iden_pres").val(),
        pres_nominal: $("#cmbunidadpresnominal").val(),
        pres_disenio: $("#cmbunidadpresiondisenio").val(),
        pres_max_ope: $("#cmbunidadpresionmaxope").val(),
        pres_segmento: $("#cmbunidadpresionsegmento").val()
    };
    var formData = new FormData();
    formData.append('file', $("#filediseniopresion")[0].files[0]);
    Object.keys(params).forEach(key => formData.append(key, params[key]));

    if ($("#txtPresDisenio").val() != "") {
        var i = 0;
        for (var value of formData.values()) {
            console.log(value + " i: "+ i);
        }
    fetch(apiUrl + webMethod, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log(response)
        return response.json();
        
    })
    .then(data => {
        if (data.success) {
            console.log(data.data);
            alert("Información almacenada correctamente");
            $('#disenioforms').show();
            $('#presionfrm').hide();
        }
    })
    .catch(error => {
        alert("Error: " + error);
    });

}

else {
    alert("Es necesario ingresar Presión de diseño (PSI)")
}
}
function saveDisenioProteccion() {
    var webMethod = "saveProteccion";
    var params = {
        area_unitaria_id: area,
        tipo_recubrimiento: $("#txtiporecubrimiento").val(),
        tipo_recubrimiento_2: $("#txtiporecubrimiento_2").val(),
        km_inicial_recubrimiento: $("#txtkminicialrecubrimiento").val(),
        km_final_recubrimiento: $("#txtkmfinalrecubrimiento").val(),
        long_total_recubrimiento: $("#txtlongtotalrecubrimiento").val(),
        empresa_aplico_recubrimiento: $("#txtempresaaplicoservicio").val(),
        fecha_inicio_serv: $("#txtfecinicioservicio").val(),
        fecha_fabricacion: $("#txtfecfabrico").val(),
        fecha_instalacion: $("#txtfecinstalacion").val(),
        fecha_instalacion_2: $("#txtfecinstalacion_2").val(),
        fecha_aplicacion: $("#txtfecaplicacion").val(),
        ubicacion_proteccion_ducto: $("#txtubicacionproteccion").val(),
        orden_aplicacion: $("#txtordenaplicacion").val(),
        localizacion: $("#txtlocalizacion").val(),
        temp_max_funcionamiento: $("#txtTempMaxFuncionamiento").val(),
        motivo_instalacion: $("#txtmotivoinstalacion").val(),
        material_fabricacion: $("#txtmaterialfabricacion").val(),
        espesor_recubrimiento: $("#txtespesorrecubrimiento").val(),
        aislamiento_electrico: $("#cmbdecisionAislamiento").val(),
        control_corrosion: $("#cmbdecisionCorrosion").val(),
        coordenada_especifica: $("#coord_esp_iden_prot_x").val() + ' ' + $("#coord_esp_iden_prot_y").val(),
        kilometro_especifico: $("#km_esp_iden_prot").val()

    };
    var formData = new FormData();
    formData.append('file', $("#filedisenioproteccion")[0].files[0]);

    Object.keys(params).forEach(key => formData.append(key, params[key]));

    for (var value of formData.values()) {
        console.log(value);
    }
    
    if ($("#txtiporecubrimiento").val() != "") {


        fetch(apiUrl + webMethod, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response)
                return response.json();

            })
            .then(data => {
                if (data.success) {
                    console.log(data.data);
                    alert("Información almacenada correctamente");
                    $('#disenioforms').show();
                    $('#proteccionfrm').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }
    else {alert("Es necesario ingresar tipo de recubrimiento")}

}


function saveotroProteccionCatodica() {
    var webMethod = "saveTypeProteccionCatodica";
    var params = {
        C_0310_116: $("#newTipoProteccion").val(),
        descripcion: $("#newDescProteccion").val()
    };


    console.log(JSON.stringify(params))
    fetch(apiUrl + webMethod, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response)
            return response.json();

        })
        .then(data => {
            if (data.success) {
                console.log(data.data);
                alert("Información almacenada correctamente");
                loadtipoproteccioncatodica();
                $("#crearproteccioncatodica").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}



function saveotroTipoInstalacion() {
    var webMethod = "saveTypeInstalacion";
    var params = {
        C_0310_117: $("#newTipoInstalacion").val(),
        descripcion: $("#newDescInstalacion").val()
    };


    console.log(JSON.stringify(params))
    fetch(apiUrl + webMethod, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response)
            return response.json();

        })
        .then(data => {
            if (data.success) {
                console.log(data.data);
                alert("Información almacenada correctamente");
                loadtipoinstalacion();
                $("#creartipoinstalacion").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}


function saveotroTipoTecnica() {
    var webMethod = "saveTypeTecnica";
    var params = {
        C_0302_0049: $("#newTipoTecnica").val(),
        descripcion: $("#newDescTecnica").val()
    };


    console.log(JSON.stringify(params))
    fetch(apiUrl + webMethod, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response)
            return response.json();

        })
        .then(data => {
            if (data.success) {
                console.log(data.data);
                alert("Información almacenada correctamente");
                loadtipotecnica();
                $("#creartipotecnicaunion").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}


function saveotroTipoRecubrimiento() {
    var webMethod = "saveTypeRecubrimiento";
    var params = {
        C_0308_0111: $("#newTipoRecubrimiento").val(),
        descripcion: $("#newDescRecubrimiento").val()
    };


    console.log(JSON.stringify(params))
    fetch(apiUrl + webMethod, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response)
            return response.json();

        })
        .then(data => {
            if (data.success) {
                console.log(data.data);
                alert("Información almacenada correctamente");
                loadtiporecubrimiento();
                $("#creartiporecubrimiento").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}

function saveotroTipoUbicacion() {
    var webMethod = "saveTypeUbicacion";
    var params = {
        C_0302_0054: $("#newTipoUbicacion").val(),
        descripcion: $("#newDescUbicacion").val()
    };


    console.log(JSON.stringify(params))
    fetch(apiUrl + webMethod, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response)
            return response.json();

        })
        .then(data => {
            if (data.success) {
                console.log(data.data);
                alert("Información almacenada correctamente");
                loadtipoubicacion();
                $("#creartipoubicacionunion").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}





function saveDisenioServicio() {

    var webMethod = "disenio_servicio/store";

    const formData = new FormData();
    formData.append("C_0101_0001_id", area)
    // Make sure files are being selected and appended properly
    if($("#inputGroupFile01")[0].files[0]) {
        formData.append("C_0205_0012", $("#inputGroupFile01")[0].files[0]);
    }
    if($("#inputGroupFile02")[0].files[0]) {
        formData.append("C_0205_0013", $("#inputGroupFile02")[0].files[0]);
    }
    if($("#inputGroupFile03")[0].files[0]) {
        formData.append("C_0205_0014", $("#inputGroupFile03")[0].files[0]);
    }
    if($("#inputGroupFile04")[0].files[0]) {
        formData.append("C_0205_0015", $("#inputGroupFile04")[0].files[0]);
    }
    if($("#inputGroupFile05")[0].files[0]) {
        formData.append("C_0205_0016", $("#inputGroupFile05")[0].files[0]);
    }
    if ($("#inputGroupFile06")[0].files[0]) {
        formData.append("file", $("#inputGroupFile06")[0].files[0]);
    }
    // Log formData to console for debugging (this will not display the content of the files)
    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    fetch(apiUrl + webMethod, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        
    })
    .then(data => {
        console.log(typeof data)
        console.log(data)
        if (data.success) {
            console.log(data)
            alert("Información almacenada correctamente");
            $('#disenioforms').show();
            $('#serviciofrm').hide();
        }
    })
    .catch(error => {
        alert("Error: " + error);
    });
}







    


function cancelDisenioGeneral() {
    $('#disenioforms').show();
    $('#identificacionfrm').hide();
}
function cancelDisenioPresion() {
    $('#disenioforms').show();
    $('#presionfrm').hide();
}
function cancelDisenioProteccion() {
    $('#disenioforms').show();
    $('#proteccionfrm').hide();
}
function cancelDisenioServicio() {
    $('#disenioforms').show();
    $('#serviciofrm').hide();
}
//function loadAreas(id) {
//    var webMethod = "areas_unitarias";
//    var params = {
//        id: id,
//    };
//    $.ajax({
//        type: "POST",
//        url: apiUrl + webMethod,
//        data: params,
//        success: function (data) {
//            if (data.success) {
//                console.log(data.data);
//                $("#cmbAreas").empty();
//                //$('#cmbAreas').append($('<option>', {
//                //    value: 0,
//                //    text: 'Selecciona!...'
//                //}));
//                var optioninit = new Option("Selecciona!",0, false, true);
//                $("#cmbAreas").append(optioninit);
//                for (var i = 0; i < data.data.length; i++) {
//                    var option = new Option(data.data[i].nombre, data.data[i].id, false, true);
//                    option.setAttribute('data-kminicial', data.data[i].km_inicial);
//                    option.setAttribute('data-kmfinal', data.data[i].km_final);
//                    option.setAttribute('data-kmorigen', data.data[i].km_origen);
//                    option.setAttribute('data-kmdestino', data.data[i].km_destino);
//                    $("#cmbAreas").append(option);
//                    //$('#mydiv').data('myval');
//                    //$('#cmbAreas').append($('<option>', {
//                    //    value: data.data[i].id,
//                    //    text: data.data[i].nombre,
//                    //    kminicial: data.data[i].km_inicial
//                   // }));
//                }
//                $("#cmbAreas").val(0);
//            }
//        },
//        error: function (xhr, ajaxOptions, thrownError) {

//        }
//    });
//}

function clearPersonas() {
    $('#txtnombreP')[0].value = "";
    $('#txtapellidoPP')[0].value = "";
    $('#txtapellidoMP')[0].value = "";
    $('#txtedadP')[0].value = "";
    $('#txtdireccionP')[0].value = "";
    $('#txtObservaciones')[0].value = "";
    $('#txtsexoP')[0].selectedIndex = 0;

}

function addPersonas() {
        var webMethod = "guardarPersona";
            var params = {
                nombre: $('#txtnombreP')[0].value,
                ap_paterno: $('#txtapellidoPP')[0].value,
                ap_materno: $('#txtapellidoMP')[0].value,
                edad: parseInt($('#txtedadP')[0].value),
                direccion: $('#txtdireccionP')[0].value,
                sexo: $('#txtsexoP')[0].value,
                observaciones: $('#txtObservaciones')[0].value,
                email: $('#txtEmail')[0].value
            };
            $.ajax({
                type: "POST",
                url: apiUrl + webMethod,
                data: params,
                success: function (data) {
                    if (data.success) {
                        alert("El Registro ha sido almacenado");
                        clearPersonas();
                        loadPersonas();
                    }
                    else {

                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {

                }
            });
}

function loadidentificacion() {


        $('#tablaPersonas tbody')[0].innerHTML = "";

    var webMethod = "get_diseniogeneral";
    $.ajax({
        type: "GET",
        url: apiUrl + webMethod,
        success: function (data) {
            
            if (data.success) {
                for (i = 0; i < data.data.length; i++) {
                    var persona = [data.data[i].nombre, data.data[i].C_0201_0006, data.data[i].C_0202_0007, data.data[i].C_0204_0011,
                    data.data[i].C_0208_0029,];
                    llenarTablas(persona, "tablaPersonas");
                    contar_longitud=contar_longitud+data.data[i].C_0201_0006
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}

function consulta() {
    contar_longitud=0;
    var params;
    if (
        $("#cmbDucto_con option:selected").text() !== "Selecciona..." ||
        $("#cmbTramo_con option:selected").text() !== "Selecciona..." ||
        $("#cmbSegmento_con option:selected").text() !== "Selecciona..." ||
        $("#cmbAreas_con option:selected").text() !== "Selecciona..."
    ) {
        if (
            $("#cmbDucto_con option:selected").text() !== "Selecciona..." &&
            $("#cmbTramo_con option:selected").text() == "Selecciona..." &&
            $("#cmbSegmento_con option:selected").text() == "Selecciona..." &&
            $("#cmbAreas_con option:selected").text() == "Selecciona..."
        ) {
            params = {
                id: $("#cmbDucto_con option:selected").val(),
                op:4
            };
            $("#resumenestudio").text("Ducto: " + $("#cmbDucto_con option:selected").text());
        }   
        else if (
            $("#cmbDucto_con option:selected").text() !== "Selecciona..." &&
            $("#cmbTramo_con option:selected").text() != "Selecciona..." &&
            $("#cmbSegmento_con option:selected").text() == "Selecciona..." &&
            $("#cmbAreas_con option:selected").text() == "Selecciona..."
        ) {
            params = {
                id: $("#cmbTramo_con option:selected").val(),
                op: 3
            };
            $("#resumenestudio").text("Ducto: " + $("#cmbDucto_con option:selected").text() + " -->"+" Tramo: " + $("#cmbTramo_con option:selected").text());
        }
        else if (
            $("#cmbDucto_con option:selected").text() !== "Selecciona..." &&
            $("#cmbTramo_con option:selected").text() != "Selecciona..." &&
            $("#cmbSegmento_con option:selected").text() != "Selecciona..." &&
            $("#cmbAreas_con option:selected").text() == "Selecciona..."
        ) {
            params = {
                id: $("#cmbSegmento_con option:selected").val(),
                op: 2
            };
            $("#resumenestudio").text("Ducto: " + $("#cmbDucto_con option:selected").text() + " -->" + " Tramo: " + $("#cmbTramo_con option:selected").text() + " -->"+ " Segmento: " + $("#cmbSegmento_con option:selected").text());
        }
        else if (
            $("#cmbDucto_con option:selected").text() !== "Selecciona..." &&
            $("#cmbTramo_con option:selected").text() != "Selecciona..." &&
            $("#cmbSegmento_con option:selected").text() != "Selecciona..." &&
            $("#cmbAreas_con option:selected").text() != "Selecciona..."
        ) {
            params = {
                id: $("#cmbAreas_con option:selected").val(),
                op: 1
            };
            $("#resumenestudio").text("Ducto: " + $("#cmbDucto_con option:selected").text() + " -->" + " Tramo: " + $("#cmbTramo_con option:selected").text() + " -->" + " Segmento: " + $("#cmbSegmento_con option:selected").text() + " -->" +" Área unitaria: "+$("#cmbAreas_con option:selected").text());
        }

        switch (temaconsulta) {
            case "T1":
                switch (temaconsultadisenio) {
                
                    case "Dis1":
                        $('#tablaPersonas tbody')[0].innerHTML = "";
                        var webMethod = "get_diseniogeneral";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethod,
                            data: params,
                            success: function (data) {
                                if (data.data.datagrid.length > 0) {
                                   //Diametro mm
                                   
                                    //Diametro in
                                    $('#diaincons').text(data.data.diametroin[0].C_0202_0008);
                                    //Espesor mm
                                    $('#espmmcons').text(data.data.espesormm[0].C_0203_0009);
                                    //Espesor in
                                    $('#espincons').text(data.data.espesorin[0].C_0203_0010);
                                    //Especificación material
                                    $('#espmatcons').text(data.data.espmaterial[0].C_0204_0011);
                                    //Temperatura °C
                                    $('#tempconsc').text(data.data.tempc[0].C_0207_0027);
                                    //Temperatura °F
                                    $('#tempconsf').text(data.data.tempf[0].C_0207_0028);
                                    //Fecha fabricación
                                    $('#fecfabcons').text(data.data.fechafab[0].C_0209_0030.split(" ")[0]);
                                    //% carbono
                                    $('#porcons').text(data.data.carbono[0].C_0210_0031);
                                    //% resistencia tracción
                                    $('#restraccons').text(data.data.resistencia[0].C_0210_0032);
                                    //% Límite elástico
                                    $('#limelacons').text(data.data.elastico[0].C_0210_0033);
                                }

                                if (data.success) {
                                    for (i = 0; i < data.data.datagrid.length; i++) {
                                        contar_longitud = contar_longitud + data.data.datagrid[i].C_0201_0006
                                    }
                                    var keysForDisenio = ["id","areaunitaria",  "coordenada_especifica", "kilometro_especifico",
                                        'C_0201_0006',
                                        'C_0202_0007',
                                        'C_0202_0008',
                                        'C_0203_0009',
                                        'C_0203_0010',
                                        'C_0204_0011',
                                        'C_0207_0027',
                                        'C_0207_0028',
                                        'C_0208_0029',
                                        'C_0209_0030',
                                        'C_0209_0030_2',
                                        'C_0210_0031',
                                        'C_0210_0032',
                                        'C_0210_0033'];
                                    processTableDataAndHideNullColumns(data.data.datagrid, "tablaPersonas", keysForDisenio );
                                    contar_longitud=contar_longitud/1000
                                    $('#longitud_total').text(contar_longitud);

                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;                     
                    case "Dis2":
                        $('#tablapresion tbody')[0].innerHTML = "";
                        var webMethodPresion = "get_Presion";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethodPresion,
                            data: params,
                            success: function (data) {
                                if (data.success) {
                                    if (data.data.datagrid.length > 0) {
                                        //Presión diseño
                                        $('#presdiscons').text(data.data.presionpsi[0].C_0206_0022);
                                        //Presion Max PSI
                                        $('#presmaxoppsicons').text(data.data.presionmaxpsi[0].C_0206_0023);
                                        //Presion Max Kg
                                        $('#presmaxopecons').text(data.data.presionmaxkg[0].C_0206_0024);
                                    }
                                    var keysForPresion = ["id","areaunitaria",  "coordenada_especifica", "kilometro_especifico", "C_0206_0017","C_0206_0018", "C_0206_0019","C_0206_0020","C_0206_0021","C_0206_0022", "C_0206_0023", "C_0206_0024","C_0206_0025","C_0206_0026"];
                                    processTableDataAndHideNullColumns(data.data.datagrid, "tablapresion", keysForPresion );
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    case "Dis3":
                        $('#tablaproteccion tbody')[0].innerHTML = "";
                        var webMethodProteccion = "get_Proteccion";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethodProteccion,
                            data: params,
                            success: function (data) {
                                if (data.success) {
                                    if (data.data.datagrid.length > 0) {
                                        //Tipo de recubrimiento
                                        $('#prottiporecubrimiento').text(data.data.tiporecubrimiento[0].C_0211_0034);
                                    }
                                    var keysForPresion = ["id","areaunitaria",  "coordenada_especifica", "kilometro_especifico", 
                                    'C_0211_0034',
                                    'C_0211_0037',
                                    'C_0211_0038',
                                    'C_0211_0039',
                                    'C_0211_0040',
                                    'C_0211_0044',
                                    'C_0211_0045',
                                    'C_0211_0046',
                                    'C_0211_0047',
                                    'C_0211_0048',
                                    'C_0211_0049',
                                    'C_0211_0050',
                                    'C_0211_0051'];
                                    processTableDataAndHideNullColumns(data.data.datagrid, "tablaproteccion", keysForPresion );
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    default:
                }             
                break;
            case "T2":
                switch (temaconsultaconstruccion) {
                    case "Cons1":
                        $('#tablabasecons tbody')[0].innerHTML = "";
                        var webMethodCatodica = "get_construcciongeneral";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethodCatodica,
                            data: params,
                            success: function (data) {
                                if (data.success) {
                                    if (data.data.datagrid.length > 0) {
                                        //Fecha construcción
                                        $('#fechaconsbase').text(data.data.datagrid[0].C_0301_0048.split(" ")[0]);
                                        //Recubrimiento anticorrosivo
                                        $('#recuanticorro').text(data.data.datagrid[0].C_0306_0108);
                                        //Tipo de suelo
                                        $('#tiposueloconsbase').text(data.data.datagrid[0].C_0307_0109);
                                        //Material de relleno
                                        $('#matrellenobasecons').text(data.data.datagrid[0].C_0307_0110);
                                        //Tipo recubrimiento
                                        $('#tiporecconsbase').text(data.data.datagrid[0].C_0311_121);
                                    }

                                    var keysForPresion = ["id","areaunitaria",  "coordenada_especifica", "kilometro_especifico", 
                                    'C_0301_0048',//fecha
                                    'C_0306_0108',//metodo recubrumiento
                                    'C_0307_0109',//tipo suelo
                                    'C_0307_0110',//Material de rellon
                                    'C_0308_0110',//Presion de hermeticidad
                                    'C_0308_0111'];//Tipo de recubrumiento

                                    processTableDataAndHideNullColumns(data.data.datagrid, "tablabasecons", keysForPresion );
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    case "Cons2":
                        $('#tablaunionCons tbody')[0].innerHTML = "";
                        var webMethodUnion = "get_construccionunion";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethodUnion,
                            data: params,
                            success: function (data) {
                                if (data.success) {
                                    if (data.data.datagrid.length > 0) {
                                        //Tipo de técnica
                                        $('#resumenconsuniontecnica').text(data.data.tipotecnica[0].C_0302_0049);
                                    }
                                    var keysForPresion = ["id","areaunitaria",  "coordenada_especifica", "kilometro_especifico", 
                                    'C_0302_0049',
                                    'C_0302_0050',
                                    'C_0302_0051',
                                    'C_0302_0052',
                                    'C_0302_0053',
                                    'C_0302_0054',
                                    'C_0302_0055',
                                    'C_0302_0056',
                                    'C_0302_0057'];
                                    
                                    processTableDataAndHideNullColumns(data.data.datagrid, "tablaunionCons", keysForPresion );
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    case "Cons3":
                        $('#tablaProfundidad tbody')[0].innerHTML = "";
                        var webMethodProfundidad = "get_construccionprofundidad";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethodProfundidad,
                            data: params,
                            success: function (data) {
                                if (data.success) {
                                    
                                    var keysForPresion = ["id","areaunitaria",  "coordenada_especifica", "kilometro_especifico", 
                                    'C_0303_0058',
                                    'C_0303_0059',
                                    'C_0303_0060',
                                    'C_0303_0061',
                                    'C_0303_0062',
                                    'C_0303_0063',
                                    'C_0303_0064',
                                    'C_0303_0065',
                                    'C_0303_0066',
                                    'C_0303_0067',
                                    'C_0303_0068',
                                    'C_0303_0069'];
                                    
                                    processTableDataAndHideNullColumns(data.data, "tablaProfundidad", keysForPresion );
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    case "Cons4":
                        $('#tablaConsCruces tbody')[0].innerHTML = "";
                        var webMethodCruces = "get_construccioncruces";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethodCruces,
                            data: params,
                            success: function (data) {
                                if (data.success) {
                                    for (i = 0; i < data.data.length; i++) {
                                        var persona = [data.data[i].id, data.data[i].areaunitaria, data.data[i].coordenada_especifica, data.data[i].kilometro_especifico, data.data[i].C_0304_0070, data.data[i].C_0304_0071, data.data[i].C_0304_0072, data.data[i].C_0304_0073, data.data[i].C_0304_0074];
                                        llenarTablas(persona, "tablaConsCruces");
                                    }
                                    var keysForPresion = ["id","areaunitaria",  "coordenada_especifica", "kilometro_especifico", 
                                    'C_0304_0070',
                                    'C_0304_0071',
                                    'C_0304_0072',
                                    'C_0304_0073',
                                    'C_0304_0074'
                                ];
                                    
                                    processTableDataAndHideNullColumns(data.data, "tablaConsCruces", keysForPresion );
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    case "Cons5"://tablaHermeticidad
                        $('#tablaHermeticidad tbody')[0].innerHTML = "";
                        var webMethodHermeticidad = "get_construccionhermeticidad";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethodHermeticidad,
                            data: params,
                            success: function (data) {
                                if (data.success) {
                                    if (data.data.length > 0) {
                                        //Tipo catódica
                                        $('#tipocatodicacons').text(data.data[0].C_0310_116);
                                    }
                                    var keysForPresion = ["id","areaunitaria",  "coordenada_especifica", "kilometro_especifico", 
                                    'C_0305_0097',
                                    'C_0305_0098',
                                    'C_0305_0099',
                                    'C_0305_0100',
                                    'C_0305_0101',
                                    'C_0305_0102',
                                    'C_0305_0103',
                                    'C_0305_0104',
                                    'C_0305_0105',
                                    'C_0305_0106'];
                                    
                                    processTableDataAndHideNullColumns(data.data, "tablaHermeticidad", keysForPresion );
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    case "Cons6":
                        $('#tablaconsInspeccion tbody')[0].innerHTML = "";
                        var webMethodInspeccion = "get_construccioninspeccion";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethodInspeccion,
                            data: params,
                            success: function (data) {
                                if (data.success) {

                                    for (i = 0; i < data.data.length; i++) {
                                        var persona = [data.data[i].id, data.data[i].areaunitaria, data.data[i].C_0309_112 + ',' + 'C_0309_112', data.data[i].C_0309_113 + ',' + 'C_0309_113', data.data[i].C_0309_114 + ',' + 'C_0309_114', data.data[i].C_0309_115 + ',' + 'C_0309_115'];
                                        llenarTablasFileInspeccion(persona, "tablaconsInspeccion", data.data[i].id);
                                    }

                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    case "Cons6":
                        $('#tablaconsInspeccion tbody')[0].innerHTML = "";
                        var webMethodInspeccion = "get_construccioninspeccion";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethodInspeccion,
                            data: params,
                            success: function (data) {
                                if (data.success) {

                                    for (i = 0; i < data.data.length; i++) {
                                        var persona = [data.data[i].id, data.data[i].areaunitaria, data.data[i].C_0309_112 + ',' + 'C_0309_112', data.data[i].C_0309_113 + ',' + 'C_0309_113', data.data[i].C_0309_114 + ',' + 'C_0309_114', data.data[i].C_0309_115 + ',' + 'C_0309_115'];
                                        llenarTablasFileInspeccion(persona, "tablaconsInspeccion", data.data[i].id);
                                    }

                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    case "Cons7":
                        $('#tablaConsCatodica tbody')[0].innerHTML = "";
                        var webMethodCatodica = "get_construccioncatodica";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethodCatodica,
                            data: params,
                            success: function (data) {
                                if (data.success) {
                                    if (data.data.datagrid.length > 0) {
                                        //Tipo catódica
                                        $('#tipocatodicacons').text(data.data.conscato[0].C_0310_116);
                                    }
                                    var keysForPresion = ["id","areaunitaria",  "coordenada_especifica", "kilometro_especifico", 
                                    'C_0310_116',
                                    'C_0310_117',
                                    'nombre',
                                    'C_0310_118',
                                    'C_0310_119',
                                    'C_0310_120'];
                                    
                                    processTableDataAndHideNullColumns(data.data.datagrid, "tablaConsCatodica", keysForPresion );
                                        
                                    }
                                },
                                error: function (xhr, ajaxOptions, thrownError) {

                                }
                            });
                        break;
                    case "Cons8":
                        $('#tablaconsSeguridad tbody')[0].innerHTML = "";
                        var webMethodSeguridad = "get_construccionseguridad";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethodSeguridad,
                            data: params,
                            success: function (data) {
                                if (data.success) {
                                  
                                    for (i = 0; i < data.data.length; i++) {
                                        var persona = [data.data[i].id, data.data[i].areaunitaria, data.data[i].C_0312_122 + ',' + 'C_0312_122', data.data[i].C_0312_123 + ',' + 'C_0312_123', data.data[i].C_0312_124 + ',' + 'C_0312_124', data.data[i].C_0312_125 + ',' + 'C_0312_125', data.data[i].C_0312_126 + ',' + 'C_0312_126', data.data[i].C_0312_127 + ',' + 'C_0312_127', data.data[i].C_0312_128 + ',' + 'C_0312_128', data.data[i].C_0312_129 + ',' + 'C_0312_129'];
                                        llenarTablasFileSeguridad(persona, "tablaconsSeguridad", data.data[i].id);
                                    }

                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    default:
                }
                
                break;
            case "T3":
               
                break;
            default:
        }

    }
    else {
        alert("Es necesario seleccionar al menos un tipo para realizar la búsqueda");
    }
   
}
function OcultarConstruccionConsulta() {
    $("#dataconstruccionunion").hide();
    $("#tablaconsSeguridad").hide();
    $("#datacatodica").hide();
    $("#tablaHermeticidad").hide();
    $("#tablaConsCruces").hide();
    $("#tablaProfundidad").hide();
    $("#tablaunionCons").hide();
    $("#tablabasecons").hide();
    $("#databasegeneral").hide();
    $("#tablaconsInspeccion").hide();
}
function ExportarDatos(registros) {


    var encabezados = Object.keys(registros[0]);


    var datos = [encabezados];
    registros.forEach(function (registro) {
        var fila = encabezados.map(function (encabezado) {
            return registro[encabezado];
        });
        datos.push(fila);
    });

    // Creamos una hoja de cálculo
    const hoja = XLSX.utils.aoa_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Datos");
    const nombreArchivo = "dtp.xlsx";
    const libroBuffer = XLSX.write(libro, { bookType: "xlsx", type: "array" });
    const archivoExcel = new Blob([libroBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(archivoExcel, nombreArchivo);
}


function loadDisenioGral() {


    $('#tablaPersonas tbody')[0].innerHTML = "";

    var webMethod = "obtenerPersonas";
    $.ajax({
        type: "GET",
        url: apiUrl + webMethod,
        success: function (data) {
            if (data.success) {
                for (i = 0; i < data.data.length; i++) {
                    var persona = [data.data[i].id,data.data[i].nombre, data.data[i].C_0201_0006, data.data[i].C_0202_0007, data.data[i].C_0204_0011,data.data[i].C_0208_0029,];
                    llenarTablas(persona, "tablaPersonas");
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}

function llenarTablas(obj, nameTabla) {
   // $('#tablaPersonas tbody')[0].innerHTML = "";
    var row = '<tr>';
    for (j = 1; j < obj.length; j++) {
        row = row + '<td>' + obj[j] + '</td>';
    }
    row = row + '<td><a class="add" title="Guardar" data-toggle="tooltip"id="ra' + obj[0] + '" data-id="' + obj[0] +'"><i class="fa fa-floppy-disk"></i></a> &nbsp;&nbsp;<a class="edit" title="Editar" data-toggle="tooltip" id="re' + obj[0] + '" data-id="' + obj[0] +'"><i class="fa fa-pen"></i></a>&nbsp;&nbsp;<a class="delete" title="Eliminar" data-toggle="tooltip" data-id="' + obj[0] +'"><i class="fa fa-trash"></i></a></td>';
    row = row + '</tr>';
    
   $('#' + nameTabla + ' tbody').append(row);
}
function llenarTablasFileSeguridad(obj, nameTabla,id) {
    // $('#tablaPersonas tbody')[0].innerHTML = "";
    var row = '<tr>';
    for (j = 1; j < obj.length; j++) {
        if (obj[j].split(',')[0] !== null && obj[j].split(',')[0] !== "" && obj[j].split(',')[0] !== undefined && obj[j].split(',')[0] !== "null") {
            if (obj[j].split(',')[1] !== undefined) {
                row = row + '<td style="text-align: center;color:green;"><a class="download-icon"  target="_blank"  href=' + apiUrl + 'construccion-seguridad/' + id + '/download/' + obj[j].split(',')[1] + ' title="Descargar" data-toggle="tooltip" id="' + obj[0] + '" data-id="' + obj[0] + '"><i class="fa fa-download"></i></a></td>';
            }
            else {
                row = row + '<td>' + obj[j] + '</td>';
            }
         }
        else {
                row = row + '<td style="text-align: center;color:gray;"><a class="download-icon" disabled title="No existe archivo" data-toggle="tooltip"id="ra' + obj[0] + '" data-id="' + obj[0] + '"><i  class="fa fa-download"></i></a></td>';
            
         }
    }
    row = row + '<td><a class="add" title="Guardar" data-toggle="tooltip"id="ra' + obj[0] + '" data-id="' + obj[0] + '"><i class="fa fa-floppy-disk"></i></a> &nbsp;&nbsp;<a class="edit" title="Editar" data-toggle="tooltip" id="re' + obj[0] + '" data-id="' + obj[0] + '"><i class="fa fa-pen"></i></a>&nbsp;&nbsp;<a class="delete" title="Eliminar" data-toggle="tooltip" data-id="' + obj[0] + '"><i class="fa fa-trash"></i></a></td>';
    row = row + '</tr>';

    $('#' + nameTabla + ' tbody').append(row);
}
function llenarTablasFileInspeccion(obj, nameTabla, id) {
    // $('#tablaPersonas tbody')[0].innerHTML = "";
    var row = '<tr>';
    for (j = 1; j < obj.length; j++) {
        if (obj[j].split(',')[0] !== null && obj[j].split(',')[0] !== "" && obj[j].split(',')[0] !== undefined && obj[j].split(',')[0] !== "null") {
            if (obj[j].split(',')[1] !== undefined) {
                row = row + '<td style="text-align: center;color:green;"><a class="download-icon"  target="_blank"  href=' + apiUrl + 'disenio-inspeccion/' + id + '/download/' + obj[j].split(',')[1] + ' title="Descargar" data-toggle="tooltip" id="' + obj[0] + '" data-id="' + obj[0] + '"><i class="fa fa-download"></i></a></td>';
            }
            else {
                row = row + '<td>' + obj[j] + '</td>';
            }
        }
        else {
            row = row + '<td style="text-align: center;color:gray;"><a class="download-icon" disabled title="No existe archivo" data-toggle="tooltip"id="ra' + obj[0] + '" data-id="' + obj[0] + '"><i  class="fa fa-download"></i></a></td>';

        }
    }
    row = row + '<td><a class="add" title="Guardar" data-toggle="tooltip"id="ra' + obj[0] + '" data-id="' + obj[0] + '"><i class="fa fa-floppy-disk"></i></a> &nbsp;&nbsp;<a class="edit" title="Editar" data-toggle="tooltip" id="re' + obj[0] + '" data-id="' + obj[0] + '"><i class="fa fa-pen"></i></a>&nbsp;&nbsp;<a class="delete" title="Eliminar" data-toggle="tooltip" data-id="' + obj[0] + '"><i class="fa fa-trash"></i></a></td>';
    row = row + '</tr>';

    $('#' + nameTabla + ' tbody').append(row);
}


function llenar_ductos(){


    const webMethod='ductos';
        url=apiUrl+webMethod;
      fetch(url, {
        method: 'GET', // or 'POST', 'PUT', etc.
        headers: headers
      })
          .then(response => response.json())
          .then(data => {
              var selectElement = document.getElementById("cmbDucto");
              var selectElementConsulta = document.getElementById("cmbDucto_con");
              data.ductos.forEach(item => {
                var option = document.createElement("option");
                option.value = item.id; // Using the 'id' property as value
                option.text = item.nombre; // Using the 'nombre' property as display name
                  selectElement.add(option);
                  var option2 = document.createElement("option");
                  option2.value = item.id; // Using the 'id' property as value
                  option2.text = item.nombre; // Using the 'nombre' property as display name
                  selectElementConsulta.add(option);
            });
          })
          .catch(error => console.error("Error fetching data: ", error));
}

$('#cmbDucto').change(function() {
    $("#cmbTramo option:not(:first)").remove();
    var property = $(this).val();
    const webMethod='tramos/fetch';
        url=apiUrl+webMethod;
    if (property) {      
      fetch(url, {
        method: 'POST', // or 'POST', 'PUT', etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'property': property})
      })
          .then(response => response.json())
          .then(data => {
            console.log(data)
              var selectElement = document.getElementById("cmbTramo");
              console.log(data)
              data.forEach(item => {
                var option = document.createElement("option");
                option.value = item.id; // Using the 'id' property as value
                option.text = item.nombre; // Using the 'nombre' property as display name
                selectElement.add(option);
            });
          })
          .catch(error => console.error("Error fetching data: ", error));
    }
  });


//Validation
$(document).ready(function(){
    $(".validate-pattern").on('input', function(e){
        var pattern = new RegExp($(this).attr('pattern'));
        if($(this).val() === ""){
            // If input is empty, remove both classes
            $(this).removeClass('is-valid is-invalid');
        } else if(pattern.test($(this).val())){
            // If input matches pattern, add 'is-valid' and remove 'is-invalid'
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
        } else {
            // If input does not match pattern, add 'is-invalid' and remove 'is-valid'
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
        }
    });
});


function setDropdownValue(dropdownSelector, desiredValue) {
    // Check if the value already exists in the dropdown options
    if ($(dropdownSelector + ' option[value="' + desiredValue + '"]').length == 0) {
        // If the value doesn't exist, create a new option and append it to the dropdown
        $(dropdownSelector).append(new Option(desiredValue, desiredValue));
    }

    // Now set the value of the dropdown to the desired value
    $(dropdownSelector).val(desiredValue).trigger('change');
}



function getNamesByAreaUnitariaId(area_unitaria_id) {
    const webMethod='getNamesByAreaUnitariaId';
    url=apiUrl+webMethod;
    console.log(area_unitaria_id,"id");
    return fetch(url, {
        method: 'POST', // or 'POST', 'PUT', etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'id': area_unitaria_id})
      })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
}



function getidByAreaUnitarianombre(area_unitaria_nombre) {
    const webMethod='getidByNombre';
    url=apiUrl+webMethod;
    return fetch(url, {
        method: 'POST', // or 'POST', 'PUT', etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'nombre': area_unitaria_nombre})
      })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
}


function getAreaIdById(webMethod ,id) {
    url=apiUrl+webMethod;
    return fetch(url, {
        method: 'POST', // or 'POST', 'PUT', etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'id':id})
      })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
}




function validateForm(formId, saveFn) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('.form-control');

    let allInputsValidated = true;

    inputs.forEach(input => {
        if (input.classList.contains('is-invalid')) {
            allInputsValidated = false;
        }
    });

    if (allInputsValidated) {
        saveFn();
    } else {
        alert('Verifique que todos los datos ingresados sean correctos');
    }
}


function resetValidationClasses(divId) {
    const div = document.getElementById(divId);
    const inputs = div.querySelectorAll('.form-control');

    inputs.forEach(input => {
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
    });
}



document.addEventListener("DOMContentLoaded", function() {
    // Get the dropdown element
    const tipoCruceDropdown = document.getElementById("cmbTipcruce");

    // Add event listener for change event
    tipoCruceDropdown.addEventListener("change", function() {
        // Hide all the classes first
        hideAllClasses();

        // Get the selected value
        const selectedValue = this.value;

        // Show the respective class based on the selected value
        switch (selectedValue) {
            case "1":
                showClass("acuatico");
                break;
            case "2":
                showClass("acuatico");
                break;
            case "3":
                showClass("infraestructura");
                break;
            case "4":
                showClass("extranjeros");
                break;
            case "5":
                showClass("comunicacion");
                break;
        }
    });
});

function hideAllClasses() {
    hideClass("acuatico");
    hideClass("infraestructura");
    hideClass("extranjeros");
    hideClass("comunicacion");
}

function hideClass(className) {
    const elements = document.querySelectorAll("." + className);
    elements.forEach(element => {
        element.style.display = "none";
    });
}

function showClass(className) {
    const elements = document.querySelectorAll("." + className);
    elements.forEach(element => {
        element.style.display = "";
    });
}

function consultatoform(e){
    selectTabupdate(e, 'Opcion1');
    document.getElementById('registro').style.display = 'none';
    $("#forms").hide();
    $("#disenioforms").hide();
    $("#identificacionfrm").hide();
    $("#serviciofrm").hide();
    $("#presionfrm").hide();
    $("#proteccionfrm").hide();
    $("#construforms").hide();
    $("#constbasefrm").hide();
    $("#metodounionfrm").hide();
    $("#profenterradofrm").hide();
    $("#tiposcrucesfrm").hide();
    $("#hermetisidadfrm").hide();
    $("#reportesInspeccionfrm").hide();
    $("#proteccatodicafrm").hide();
    $("#seguridadprearranquefrm").hide();


}

function clearInputTextValues(divId) {
    const div = document.getElementById(divId);
    const textInputs = div.querySelectorAll('input[type="text"], input[type="date"]');

    textInputs.forEach(input => {
        input.value = '';
    });
}    

function clearInputTextValuesNew(divId) {
    const div = document.getElementById(divId);
    const textInputs = div.querySelectorAll('input[type="date"], .setAlg');
    const selectInputs = div.querySelectorAll('select');

    textInputs.forEach(input => {
        input.value = '';
    });

    selectInputs.forEach(select => {
        select.selectedIndex = 0;
    });
}



function showDestroyIcons(parentDivId,bandera) {
    if (bandera){
        $(`#${parentDivId} .destroy-icon`).css('display', 'inline');
    }
    else{
    // Select elements with class 'destroy-icon' inside the specified div
    $(`#${parentDivId} .destroy-icon`).css('display', 'none');}
}

$(document).ready(function() {
    $('body').on('click', '.destroy-icon', function(event) {
        if(confirm("¿Seguro quiere borrar ese documento?")) {
        // Use $(this) to turn 'this' into a jQuery object
        let columna = $(this).data('columna');
        let idOtro = $(this).data('id_otro');
        let hrefwebmethod=$(this).attr('href');
        // Prevent default hyperlink behavior and stop propagation
        event.preventDefault();

            console.log(hrefwebmethod)
        fetch(hrefwebmethod, {
            method: 'GET', // or 'POST', 'PUT', etc.
            headers: headers
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'File content erased successfully') {
                let destroyIcon = $(`a[data-columna="${columna}"][data-id_otro="${idOtro}"]`);
                destroyIcon.remove();
            }
        })
        .catch(error => console.error("Error fetching data: ", error));
    }
    });
});





function processTableDataAndHideNullColumns(data, tableId, keys) {
    
    var nonNullColumns = [];
    var numCols = keys.length;
    
    // Initialize nonNullColumns and reset visibility of all columns
    for (var k = 0; k < numCols; k++) {
        nonNullColumns.push(false);
        $('#' + tableId + ' thead th').eq(k).show();
        $('#' + tableId + ' tbody tr').each(function() {
            $(this).find('td').eq(k).show();
        });
    }

    for (i = 0; i < data.length; i++) {
        var persona = keys.map(key => {
            // Check if the value matches the datetime format
            var match = /^(\d{4}-\d{2}-\d{2}) \d{2}:\d{2}:\d{2}$/.exec(data[i][key]);
            if (match) {
                // If it matches, return only the date part
                return match[1];
            }
            return data[i][key];
        });

        // Update nonNullColumns array
        for (var j = 0; j < persona.length; j++) {
            if (persona[j] !== null ) {
                nonNullColumns[j] = true;
            }
        }
        

        llenarTablas(persona, tableId);
    }

    const nonNullColumns1 = nonNullColumns.slice(1);
    for (var j = 1; j < nonNullColumns1.length; j++) {

        if (!nonNullColumns1[j]) {
            $('#' + tableId + ' thead th').eq(j).hide();
            $('#' + tableId + ' tbody tr').each(function() {
                $(this).find('td').eq(j).hide();
            });
        }
    }
}




function clearAllFileInputsInDiv(divId) {
    // Select all file inputs within the specified div and set their value to an empty string
    $(`#${divId} .custom-file-input`).val('');

    // Optionally, if you also want to reset the label
    $(`#${divId} .custom-file-label`).text('Escoje el archivo PDF');
}

jQuery(document).ready(function($){
	$(document).on('click', '.pull-bs-canvas-right, .pull-bs-canvas-left', function(){
		$('body').prepend('<div class="bs-canvas-overlay bg-dark position-fixed w-100 h-100"></div>');
		if($(this).hasClass('pull-bs-canvas-right'))
			$('.bs-canvas-right').addClass('mr-0');
		else
			$('.bs-canvas-left').addClass('ml-0');
		return false;
	});
	
	$(document).on('click', '.bs-canvas-close, .bs-canvas-overlay', function(){
		var elm = $(this).hasClass('bs-canvas-close') ? $(this).closest('.bs-canvas') : $('.bs-canvas');
		elm.removeClass('mr-0 ml-0');
		$('.bs-canvas-overlay').remove();
		return false;
	});
});