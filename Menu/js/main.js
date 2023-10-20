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
var temaconsultaanalisis = "";
var temaconsultaoperacion="";
var area_unitaria_id;
var contar_longitud=0;
const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
});



$(document).ready(function () {
    //$('#ms').change(function () {
    //    console.log($(this).val());
    //}).multipleSelect({
    //    width: '100%'
    //});
   
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
                tramo=data[0].tramo_id

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
    $(document).on("click", ".deleteprop", function (e) {       
        if (confirm("¿Seguro quiere borrar ese registro?")) {
            $(this).closest('tr').remove();
        }
    });
    document.getElementById('filepruebabasecons').addEventListener('change', handleFileSelect, false);
    $(document).on("click", ".delete", function (e) {
        temaconsulta=$("#cmbTemasPrincipal_con").val() ;
        temaconsultadisenio=$("#cmbTemasDisenio_con").val() ;
        temaconsultaconstruccion=$("#cmbTemasConstruccion_con").val() ;
        temaconsultaanalisis = $("#cmbTemasAnalisis_con").val();
        temaconsultaoperacion = $("#cmbTemasOperacion_con").val();
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
                case "T3":
                    switch(temaconsultaanalisis){
                        case "Op1":
                            webMethod = "analisisgeneral/destroy";
                            break;
                        case "Op2":
                            webMethod = "analisisgeoespacial/destroy";
                            break;
                        case "Op3":
                            webMethod = "analisisplanos/destroy";
                            break;
                        case "Op4":
                            webMethod = "analisisriesgosincidentes/destroy";
                            break;
                        case "Op5":
                            webMethod = "analisisingenieria/destroy";
                            break;
                        case "Op6":
                            webMethod = "analisisriesgo/destroy";
                            break;
                        case "Op7":
                            webMethod = "operaciondocumental/destroy";
                            break;
                            
                        default:}
                        break;
                case "T4":
                    switch(temaconsultaanalisis){
                        case "Ana1":
                            webMethod = "analisisgeneral/destroy";
                            break;
                        case "Ana2":
                            webMethod = "analisisgeoespacial/destroy";
                            break;
                        case "Ana3":
                            webMethod = "analisisplanos/destroy";
                            break;
                        case "Ana4":
                            webMethod = "analisisriesgosincidentes/destroy";
                            break;
                        case "Ana5":
                            webMethod = "analisisingenieria/destroy";
                            break;
                        case "Ana6":
                            webMethod = "analisisriesgo/destroy";
                            break;
                        case "Ana7":
                            webMethod = "analisisdocumental/destroy";
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

            case "T3":
                console.log(row_id)
                switch (temaconsultaoperacion) {
                    case "Op1"://Pendiente
                        consultatoform(e);
                        getAreaIdById("getAreaIdByOperacionVandalismoId", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            fnshowOperacionGeneral(id_d = row_id);
                        });
                        break;
                    case "Op2":
                        
                        consultatoform(e);
                        getAreaIdById("getAreaIdByOperacionInstalacionesId", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            fnshowOperacionInstalacion(id_d = row_id);
                        });
                        break;
                    case "Op3":
                        consultatoform(e);
                        getAreaIdById("getAreaIdByOperacionHistFugaId", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            fnshowOperacionHistorialFugas(id_d = row_id);
                        });
                        break;
                    case "Op4":
                        consultatoform(e);
                        getAreaIdById("getAreaIdByOperacionMonitoreoCorrosionId", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            console.log(area,'area')
                            fnshowOperacionMonitoreoCorrosion(id_d = row_id);
                        });
                        break;

                    case "Op5":
                        consultatoform(e);
                        getAreaIdById("getAreaIdByOperacionHistReparacionesId", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            fnshowOperacionHistorialReparaciones(id_d = row_id);
                        });
                        break;

                    case "Op6":
                        consultatoform(e);
                        getAreaIdById("getAreaIdByOperacionHistReparacionesId", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            fnshowOperacionVandalismo(id_d = row_id);
                        });
                        break;
                    case "Op7":
                        consultatoform(e);
                        getAreaIdById("getAreaIdByOpDocumentalId", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            fnshowOperacionDocumental(id_d = row_id);
                        });
                        break;




                    default:
                }
                break;
            case "T4":
                switch (temaconsultaanalisis) {
                    case "Ana1":
                        consultatoform(e)
                        getAreaIdById("getAreaIdByAnalisisId", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            fnshowAnalisisGeneral(id_d = row_id);
                        });

                        break;
                    case "Ana2":
                        consultatoform(e)
                        getAreaIdById("getAnalisisGeoespacialById", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            fnshowAnalisisGeoespacial(id_d = row_id);
                        });

                        break;
                    case "Ana6":
                        consultatoform(e);
                        getAreaIdById("getAreaIdByAnalisisRiesgoId", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            fnshowAnalisisriesdis(id_d = row_id);
                        });
                        break;

                        case "Ana7":
                            consultatoform(e);
                            getAreaIdById("getAreaIdByDocumentalId", row_id).then(data => {
                                setDropdownValue('#cmbAreas', data.area_unitaria_id);
                                area = data.area_unitaria_id;
                                fnshowAnalisisDocumental(id_d = row_id);
                            });
                            break;
                    case "Ana4":
                        consultatoform(e)
                        getAreaIdById("getAnalisisRiesgosIncidentesById", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            fnshowRiesgosIncidentes(id_d = row_id);
                        });

                        break;
                    case "Ana5":
                        consultatoform(e)
                        getAreaIdById("getAnalisisIngenieriaById", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            fnshowAnalisisIngenieria(id_d = row_id);
                        });

                        break;
                    case "Ana3":
                        consultatoform(e)
                        getAreaIdById("getAreaIdByAnalisisPlanosId", row_id).then(data => {
                            setDropdownValue('#cmbAreas', data.area_unitaria_id);
                            area = data.area_unitaria_id;
                            fnshowAnalisisPlanos(id_d = row_id);
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
    //Combo Tramos documental
    
    var selector = document.getElementsByName('cmbtramosdoc');
    element = $(selector);
   
    element.on('change', function () {
        loadAreaDocument(this.value);
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
                $("#cmbTemasAnalisis_con").hide();
                $("#cmbTemasOperacion_con").hide();
             break;
            case "T2":
                $("#cmbTemasDisenio_con").hide();
                $("#cmbTemasConstruccion_con").show()
                $("#cmbTemasAnalisis_con").hide();
                $("#cmbTemasOperacion_con").hide();
            break;
            case "T3":
                $("#cmbTemasAnalisis_con").hide();
                $("#cmbTemasOperacion_con").show();
                $("#cmbTemasConstruccion_con").hide();
                $("#cmbTemasDisenio_con").hide();
                break;
            case "T4":
                $("#cmbTemasAnalisis_con").show();
                $("#cmbTemasConstruccion_con").hide();
                $("#cmbTemasDisenio_con").hide();
                $("#cmbTemasOperacion_con").hide();
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
                ocultartablasanalisis()
                ocultartablasoperacion()
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
                ocultartablasanalisis()
                ocultartablasoperacion()
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
                ocultartablasoperacion()
                OcultarConstruccionConsulta();
                ocultartablasanalisis()
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
                ocultartablasoperacion()
                ocultartablasanalisis()
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
                ocultartablasoperacion()
                ocultartablasanalisis()
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
                ocultartablasoperacion()
                ocultartablasanalisis()
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
                ocultartablasanalisis();
                ocultartablasoperacion();
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
                ocultartablasanalisis();
                ocultartablasoperacion();
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
                ocultartablasanalisis();
                ocultartablasoperacion();
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
                $("#tablaConsCatodica").hide();
                $("#datadisenioproteccion").hide();
                break;
            case "Cons7":
                ocultartablasdisenio();
                ocultartablasanalisis();
                ocultartablasoperacion();
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
                ocultartablasanalisis();
                ocultartablasoperacion();
                $("#dataconstruccionunion").hide();
                $("#tablaconsSeguridad").show();
                $("#datacatodica").hide();
                $("#tablaHermeticidad").hide();
                $("#tablaConsCruces").hide();
                $("#tablaProfundidad").hide();
                $("#tablaunionCons").hide();
                $("#tablaConsCatodica").hide();
                $("#tablabasecons").hide();
                $("#databasegeneral").hide();
                $("#tablaconsInspeccion").hide();
                $("#datadisenioproteccion").hide();
                break;
            default:
        }
    });
    const selectTemasOperacion = document.getElementById('cmbTemasOperacion_con');
    selectTemasOperacion.addEventListener('change', function handleChange(event) {
        temaconsultaoperacion = event.target.value;
        switch (event.target.value) {
            case "Op1":
                OcultarConstruccionConsulta();
                ocultartablasdisenio();
                ocultartablasanalisis()
                ocultartablasoperacion();
                $("#tablaOperacionGeneral").show();
                break;
            case "Op2":
                OcultarConstruccionConsulta();
                ocultartablasdisenio();
                ocultartablasanalisis()
                ocultartablasoperacion();
                $("#tablaOperacionInstalaciones").show();
                break;
            case "Op3":
                ocultartablasoperacion();
                $("#tablaOperacionFugas").show();
                OcultarConstruccionConsulta();
                ocultartablasdisenio();
                ocultartablasanalisis()
                break;
            case "Op4":
                OcultarConstruccionConsulta();
                ocultartablasdisenio();
                ocultartablasanalisis()
                ocultartablasoperacion();

                $("#tablaOperacionCorrosion").show();


                
            break;
            case "Op5":
                OcultarConstruccionConsulta();
                ocultartablasdisenio();
                ocultartablasanalisis()
                ocultartablasoperacion();
                $("#tablaOperacionHistorialReparaciones").show();
                

            break;
            case "Op6":
                OcultarConstruccionConsulta();
                ocultartablasdisenio();
                ocultartablasanalisis()
                ocultartablasoperacion();
                $("#tablaOperacionVandalismo").show()


                break;
            case "Op7":
                OcultarConstruccionConsulta();
                ocultartablasdisenio();
                ocultartablasanalisis()
                ocultartablasoperacion();
                $("#tablaOperacionDocumental").show();

                break;
            default:
        }
    });
    //Combo Tema Analisis
    const selectTemasAnalisis = document.getElementById('cmbTemasAnalisis_con');
    selectTemasAnalisis.addEventListener('change', function handleChange(event) {
        temaconsultaanalisis = event.target.value;
        switch (event.target.value) {
            case "Ana1":
                OcultarConstruccionConsulta();
                ocultartablasdisenio();
                ocultartablasoperacion();
                $("#tablaAnalisisGral").show();
                $("#tablaAnalisisGeoespacial").hide();
                $("#tablaAnalisisRiesgoIncidentes").hide();
                $("#tablaAnalisisIngenieria").hide();
                $("#tablaAnalisisDocumental").hide();
                $("#tablaAnalisisRiesgos").hide();
                $("#tablaAnalisisPlanos").hide();
                break;
            case "Ana2":
                OcultarConstruccionConsulta();
                ocultartablasdisenio();
                ocultartablasoperacion();
                $("#tablaAnalisisGral").hide();
                $("#tablaAnalisisGeoespacial").show();
                $("#tablaAnalisisRiesgoIncidentes").hide();
                $("#tablaAnalisisIngenieria").hide();
                $("#tablaAnalisisDocumental").hide();
                $("#tablaAnalisisRiesgos").hide();
                $("#tablaAnalisisPlanos").hide();
                break;
            case "Ana3":
                OcultarConstruccionConsulta();
                ocultartablasdisenio();
                ocultartablasoperacion();
                $("#tablaAnalisisGral").hide();
                $("#tablaAnalisisPlanos").show();
                $("#tablaAnalisisGeoespacial").hide();
                $("#tablaAnalisisRiesgoIncidentes").hide();
                $("#tablaAnalisisIngenieria").hide();
                $("#tablaAnalisisDocumental").hide();
                $("#tablaAnalisisRiesgos").hide();
                break;
            case "Ana6":
                OcultarConstruccionConsulta();
                ocultartablasdisenio();
                ocultartablasoperacion();
                $("#tablaAnalisisGral").hide();
                $("#tablaAnalisisGeoespacial").hide();
                $("#tablaAnalisisRiesgoIncidentes").hide();
                $("#tablaAnalisisIngenieria").hide();
                $("#tablaAnalisisDocumental").hide();
                $("#tablaAnalisisRiesgos").show();
                $("#tablaAnalisisPlanos").hide();
                
            break;
            case "Ana7":
                OcultarConstruccionConsulta();
                ocultartablasdisenio();
                ocultartablasoperacion();
                $("#tablaAnalisisGral").hide();
                $("#tablaAnalisisGeoespacial").hide();
                $("#tablaAnalisisRiesgoIncidentes").hide();
                $("#tablaAnalisisIngenieria").hide();
                $("#tablaAnalisisDocumental").show();
                $("#tablaAnalisisRiesgos").hide();
                $("#tablaAnalisisPlanos").hide();
            break;
            case "Ana4":
                OcultarConstruccionConsulta();
                ocultartablasdisenio();
                ocultartablasoperacion();
                $("#tablaAnalisisGral").hide();
                $("#tablaAnalisisGeoespacial").hide();
                $("#tablaAnalisisRiesgoIncidentes").hide();
                $("#tablaAnalisisIngenieria").hide();
                $("#tablaAnalisisDocumental").hide();
                $("#tablaAnalisisRiesgoIncidentes").show();
                $("#tablaAnalisisPlanos").hide();
                break;
            case "Ana5":
                OcultarConstruccionConsulta();
                ocultartablasdisenio();
                ocultartablasoperacion();
                $("#tablaAnalisisGral").hide();
                $("#tablaAnalisisGeoespacial").hide();
                $("#tablaAnalisisRiesgoIncidentes").hide();
                $("#tablaAnalisisIngenieria").show();
                $("#tablaAnalisisDocumental").hide();
                $("#tablaAnalisisRiesgos").hide();
                $("#tablaAnalisisPlanos").hide();
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

function ocultartablasanalisis() {
    $("#tablaAnalisisGral").hide();
    $("#tablaAnalisisGeoespacial").hide();
    $("#tablaAnalisisRiesgoIncidentes").hide();
    $("#tablaAnalisisIngenieria").hide();
    $("#tablaAnalisisDocumental").hide();
    $("#tablaAnalisisRiesgos").hide();
    $("#tablaAnalisisPlanos").hide();

}


function ocultartablasoperacion() {
    $("#tablaOperacionVandalismo").hide()
                $("#tablaOperacionCorrosion").hide();
                $("#tablaOperacionDocumental").hide();
                $("#tablaOperacionHistorialReparaciones").hide();
                $("#tablaOperacionFugas").hide();
                $("#tablaOperacionInstalaciones").hide();


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
    $(divSelector + " table.setAlg").prop("disabled", bandera);
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
function consultaDatosIdentificacionArea(id_d = null) {
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 1, "tbl_iden_disenio");
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
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 1, "tbl_prot_disenio");

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
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo,area,26,'tbl_serv_disenio')
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
        if($("#inputGroupFile06")[0].files[0]) {
            formData.append('file', $("#inputGroupFile06")[0].files[0]);
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
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 1, "tbl_pres_disenio");

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

function updateDiseniopresion() {
    if ($("#btn_updatepresion").text() === "Actualizar") {
        inhabilitarform("#presionfrm", false);
        showDestroyIcons('presionfrm', true);
        $("#btn_updatepresion").text('Guardar');
    }
    else {
        
        var params = {
            id:idDiseniopresion,
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
        var webMethod = "updatePresion";
        fetch(apiUrl + webMethod, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                // Other headers go here. For example:
                // 'Authorization': 'Bearer YOUR_TOKEN'
            },
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
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 1, "tbl_base_construccion");

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

function consultaDatosConsUnion(id_d = null) {
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 1, "tbl_union_construccion");
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


function consultaDatosConsProfundidad(id_d = null) {
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 6, "tbl_prof_construccion");
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
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 9, "tbl_insp_construccion");
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
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 11, "tbl_segu_construccion");
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
        formData.append("kilometro_especifico",$("#km_esp_idenpseg").val() )
        formData.append("coordenada_especifica",  $("#coord_esp_idenpseg_x").val()+' '+$("#coord_esp_idenpseg_x").val(),)
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
function fnsshowAnalisisforms() {
    $('#analisisforms').show();
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
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 7, "tbl_cruces_construccion");


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
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 8, "tbl_herme_construccion");
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
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 10, "tbl_cato_construccion");
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
    
    $('#analisisforms').hide();
    $('#operacionforms').hide();
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



var nivelconsulta=""
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
            nivelconsulta="Ducto"
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
            nivelconsulta="Tramo"
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
            nivelconsulta="Segmento"
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
            nivelconsulta="Area"
            $("#resumenestudio").text("Ducto: " + $("#cmbDucto_con option:selected").text() + " -->" + " Tramo: " + $("#cmbTramo_con option:selected").text() + " -->" + " Segmento: " + $("#cmbSegmento_con option:selected").text() + " -->" +" Área unitaria: "+$("#cmbAreas_con option:selected").text());
        }

        switch (temaconsulta) {
            case "T1":
                switch (temaconsultadisenio) {
                
                    case "Dis1":
                        $('#tablaPersonas tbody')[0].innerHTML = "";
                        $('#tablaPersonas tbody:not(:first)').remove();
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
                                        //'C_0202_0007',
                                        'C_0202_0008',
                                        //'C_0203_0009',
                                        'C_0203_0010',
                                        'C_0204_0011',
                                        'C_0207_0027',
                                        'C_0207_0028',
                                        'C_0208_0029',
                                        'C_0209_0030',
                                        'C_0209_0030_2',
                                        'C_0210_0031',
                                        'C_0210_0032',
                                        'C_0210_0033','tramo'];
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
                        $('#tablapresion tbody:not(:first)').remove();
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
                                    var keysForPresion = ["id","areaunitaria",  "coordenada_especifica", "kilometro_especifico", "C_0206_0017","C_0206_0018", "C_0206_0019","C_0206_0020","C_0206_0021","C_0206_0022", "C_0206_0023", "C_0206_0024","C_0206_0025","C_0206_0026",'tramo'];
                                    processTableDataAndHideNullColumns(data.data.datagrid, "tablapresion", keysForPresion );
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    case "Dis3":
                        $('#tablaproteccion tbody')[0].innerHTML = "";

                        $('#tablaproteccion tbody:not(:first)').remove();
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
                                    'C_0211_0051',
                                    'tramo'];
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
                        $('#tablabasecons tbody:not(:first)').remove();
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
                                    'C_0308_0111',
                                'tramo'];//Tipo de recubrumiento

                                    processTableDataAndHideNullColumns(data.data.datagrid, "tablabasecons", keysForPresion );
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    case "Cons2":
                        $('#tablaunionCons tbody')[0].innerHTML = "";
                        $('#tablaunionCons tbody:not(:first)').remove();
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
                                    'C_0302_0057','tramo'];
                                    
                                    processTableDataAndHideNullColumns(data.data.datagrid, "tablaunionCons", keysForPresion );
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    case "Cons3":
                        $('#tablaProfundidad tbody')[0].innerHTML = "";
                        $('#tablaProfundidad tbody:not(:first)').remove();
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
                                    'C_0303_0069','tramo'];
                                    
                                    processTableDataAndHideNullColumns(data.data, "tablaProfundidad", keysForPresion );
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    case "Cons4":
                        $('#tablaConsCruces tbody')[0].innerHTML = "";
                        $('#tablaConsCruces tbody:not(:first)').remove();
                        var webMethodCruces = "get_construccioncruces";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethodCruces,
                            data: params,
                            success: function (data) {
                                if (data.success) {
                                    
                                    var keysForPresion = ["id","areaunitaria",  "coordenada_especifica", "kilometro_especifico", 
                                    'C_0304_0070',
                                    'C_0304_0071',
                                    'C_0304_0072',
                                    'C_0304_0073',
                                    'C_0304_0074',
                                    'tramo'
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
                        $('#tablaHermeticidad tbody:not(:first)').remove();
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
                                    'C_0305_0106','tramo'];
                                    
                                    processTableDataAndHideNullColumns(data.data, "tablaHermeticidad", keysForPresion );
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    case "Cons6":
                        $('#tablaconsInspeccion tbody')[0].innerHTML = "";
                        $('#tablaconsInspeccion tbody:not(:first)').remove();
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
                        $('#tablaConsCatodica tbody:not(:first)').remove();
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
                                    'C_0310_120',
                                'tramo'];
                                    
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
                console.log(temaconsultaoperacion)
                switch (temaconsultaoperacion) {
                    case "Op2":
                        $('#tablaOperacionInstalaciones tbody')[0].innerHTML = "";
                        $('#tablaOperacionInstalaciones tbody:not(:first)').remove();
                        var webMethodFugas = "get_OperacionInstalaciones";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethodFugas,
                            data: params,
                            success: function (data) {
                                if (data.success) {
                                    var keysForPresion = ["id", "areaunitaria", "coordenada_especifica", "kilometro_especifico",
                                        'C_0401_130',
                                        'C_0401_131',
                                        'C_0401_132',
                                        'C_0401_133',
                                        'C_0401_134',
                                        'C_0401_135',
                                        'C_0401_136',
                                        'C_0401_137',
                                        'C_0401_138',
                                        'tramo'];
                                    for (var i = 0; i < data.data.datagrid.length; i++) {
                                        switch (data.data.datagrid[i].C_0401_130) {
                                            case "1":
                                                data.data.datagrid[i].C_0401_130 = "Trampa de envío y/o recibo";
                                            break;
                                            case "2":
                                                data.data.datagrid[i].C_0401_130 = "Válvula";
                                                break;
                                            case "3":
                                                data.data.datagrid[i].C_0401_130 = "Marcador";
                                                break;
                                            case "4":
                                                data.data.datagrid[i].C_0401_130 = "Tee";
                                                break;
                                            case "5":
                                                data.data.datagrid[i].C_0401_130 = "Tapas";
                                                break;
                                            case "6":
                                                data.data.datagrid[i].C_0401_130 = "Bridas";
                                                break;
                                            case "7":
                                                data.data.datagrid[i].C_0401_130 = "Medidor";
                                                break;
                                            case "8":
                                                data.data.datagrid[i].C_0401_130 = "Conexión de rama";
                                                break;
                                            case "9":
                                                data.data.datagrid[i].C_0401_130 = "Codos";
                                                break;
                                            case "10":
                                                data.data.datagrid[i].C_0401_130 = "Reductor";
                                                break;
                                            case "11":
                                                data.data.datagrid[i].C_0401_130 = "Ventilación de escape o tubería de ventilación";
                                                break;
                                            case "12":
                                                data.data.datagrid[i].C_0401_130 = "Tubería de revestimiento";
                                                break;
                                        }
                                    }
                                    processTableDataAndHideNullColumns(data.data.datagrid, "tablaOperacionInstalaciones", keysForPresion);

                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    case "Op3":
                        $('#tablaOperacionFugas tbody')[0].innerHTML = "";
                        $('#tablaOperacionFugas tbody:not(:first)').remove();
                        var webMethodFugas = "get_OperacionHistorialFugas";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethodFugas,
                            data: params,
                            success: function (data) {
                                if (data.success) {

                                    var keysForPresion = ["id", "areaunitaria", "coordenada_especifica", "kilometro_especifico",
                                        'C_0406_214',
                                        'C_0406_215',
                                        'C_0406_216',
                                        'C_0406_217',
                                        'C_0406_218',
                                        'C_0406_219',
                                        'C_0406_220',
                                        'C_0406_221',
                                        'C_0406_222',
                                        'C_0406_223',
                                        'C_0406_224',
                                        'C_0406_225',
                                        'C_0406_226',
                                        'C_0406_227',
                                        'C_0406_228',
                                        'C_0406_229',
                                        'C_0406_230',
                                        'C_0406_231',
                                        'tramo'];

                                    processTableDataAndHideNullColumns(data.data.datagrid, "tablaOperacionFugas", keysForPresion);

                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                case "Op4":
                    $('#tablaOperacionCorrosion tbody')[0].innerHTML = "";
                    $('#tablaOperacionCorrosion tbody:not(:first)').remove();
                    var webMethodCatodica = "get_OperacionMonitoreoCorrosion";
                    $.ajax({
                        type: "POST",
                        url: apiUrl + webMethodCatodica,
                        data: params,
                        success: function (data) {
                            if (data.success) {

                                var keysForPresion = ["id","areaunitaria",  "coordenada_especifica", "kilometro_especifico", 
                                'unidades_medida', 
                                'cupones', 
                                'fecha_instalacion',
                                'fecha_retiro',
                                'fecha_registro', 
                                'nombre_cupon',
                                'peso',
                                'peso_final',
                                'valocidad_corrosion',   
                            'tramo'];
                                
                                processTableDataAndHideNullColumns(data.data.datagrid, "tablaOperacionCorrosion", keysForPresion );
                                    
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                break;
                //case "Op5":
                //$('#tablaOperacionHistorialReparaciones tbody')[0].innerHTML = "";
                //$('#tablaOperacionHistorialReparaciones tbody:not(:first)').remove();
                //var webMethodCatodica = "get_OperacionHistorialReparaciones";
                //$.ajax({
                //    type: "POST",
                //    url: apiUrl + webMethodCatodica,
                //    data: params,
                //    success: function (data) {
                //        if (data.success) {

                //            var keysForPresion = ["id","areaunitaria",  "coordenada_especifica", "kilometro_especifico", 
                //            'C_0415_254',
                //            'C_0415_255',
                //            'C_0415_256',
                //            'C_0415_257',
                //            'C_0415_258', 
                //           'C_0415_259',
                //            'C_0415_260',
                //            'C_0415_261',
                //            'C_0415_262',
                //            'C_0415_263',
                //            'C_0415_264',
                //            'C_0415_265',
                //            'C_0415_266',
                //            'C_0415_267', 
                //           'C_0415_268', 
                //           'C_0415_269', 
                //           'C_0415_271',
                //            'C_0415_272',
                //            'C_0415_273',
                //            'C_0415_274',
                //            'C_0415_275', 
                //           'C_0415_276', 
                //           'C_0415_277', 
                //           'C_0415_278', 
                //           'C_0415_279', 
                //           'C_0415_280',
                           
                //        'tramo'];
                            
                //            processTableDataAndHideNullColumns(data.data.datagrid, "tablaOperacionHistorialReparaciones", keysForPresion );
                                
                //            }
                //        },
                //        error: function (xhr, ajaxOptions, thrownError) {

                //        }
                //    });
                //break;

                case "Op5":
                $('#tablaOperacionHistorialReparaciones tbody')[0].innerHTML = "";
                $('#tablaOperacionHistorialReparaciones tbody:not(:first)').remove();
                var webMethodCatodica = "get_OperacionHistorialReparaciones";
                $.ajax({
                    type: "POST",
                    url: apiUrl + webMethodCatodica,
                    data: params,
                    success: function (data) {
                        if (data.success) {

                            var keysForPresion = ["id","areaunitaria",  "coordenada_especifica", "kilometro_especifico", 
                            'C_0415_254',
                            'C_0415_255',
                            'C_0415_256',
                            'C_0415_257',
                            'C_0415_258', 
                           'C_0415_259',
                            'C_0415_260',
                            'C_0415_261',
                            'C_0415_262',
                            'C_0415_263',
                            'C_0415_264',
                            'C_0415_265',
                            'C_0415_266',
                            'C_0415_267', 
                           'C_0415_268', 
                           'C_0415_269', 
                           'C_0415_271',
                            'C_0415_272',
                            'C_0415_273',
                            'C_0415_274',
                            'C_0415_275', 
                           'C_0415_276', 
                           'C_0415_277', 
                           'C_0415_278', 
                           'C_0415_279', 
                           'C_0415_280',
                           
                        'tramo'];
                            
                            processTableDataAndHideNullColumns(data.data.datagrid, "tablaOperacionHistorialReparaciones", keysForPresion );
                                
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {

                        }
                    });
                break;

            case "Op6":
                $('#tablaOperacionVandalismo tbody')[0].innerHTML = "";
                $('#tablaOperacionVandalismo tbody:not(:first)').remove();
                var webMethodCatodica = "get_OperacionVandalismo";
                $.ajax({
                    type: "POST",
                    url: apiUrl + webMethodCatodica,
                    data: params,
                    success: function (data) {
                        if (data.success) {

                            var keysForPresion = ["id","areaunitaria",  "coordenada_especifica", "kilometro_especifico", 
                            'C_0416_281',
                        'C_0416_282',
                        'C_0416_283',
                        'C_0416_284',
                        'id_C_0416_285',
                        'id_C_0416_286',
                        'C_0416_287',
                        'C_0416_288',
                        'C_0416_289',
                        'C_0416_290',
                        'C_0416_291',
                        'id_C_0416_292',
                        'C_0416_293',
                        'C_0416_294',
                        'C_0416_295',
                        'C_0416_296',
                        'C_0416_297',
                        'C_0416_298',
                        'tramo'];
                            
                            processTableDataAndHideNullColumns(data.data.datagrid, "tablaOperacionVandalismo", keysForPresion );
                                
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {

                        }
                    });
                break;
                case "Op7":
                            $('#tablaOperacionDocumental tbody')[0].innerHTML = "";
                            var webMethodSeguridad = "get_operaciondocumental";
                            $.ajax({
                                type: "POST",
                                url: apiUrl + webMethodSeguridad,
                                data: params,
                                success: function (data) {
                                    if (data.success) {
                                    
                                        for (i = 0; i < data.data.length; i++) {
                                            var persona = [data.data[i].id, data.data[i].areaunitaria, data.data[i].historial_condiciones+ ',' + 'historial_condiciones', data.data[i].fase_producto + ',' + 'fase_producto', data.data[i].presencia_cloruros + ',' + 'presencia_cloruros', data.data[i].cis_documentalop + ',' + 'cis_documentalop', data.data[i].dcvgopdocumental + ',' + 'dcvgopdocumental', data.data[i].perfil_potenciales + ',' + 'perfil_potenciales', data.data[i].mfl_opdocumental + ',' + 'mfl_opdocumental', data.data[i].ultrasonido_haz + ',' + 'ultrasonido_haz', data.data[i].reporte_espesores + ',' + 'reporte_espesores', data.data[i].geometra_opdocumental + ',' + 'geometra_opdocumental',
                                            data.data[i].calibracion_curvas + ',' + 'calibracion_curvas',
                                            data.data[i].liquidos_penetrantes + ',' + 'liquidos_penetrantes',
                                            data.data[i].ondas_guiadas + ',' + 'ondas_guiadas',
                                            data.data[i].inspeccion_radiografica + ',' + 'inspeccion_radiografica',
                                            data.data[i].inspeccion_muestral + ',' + 'inspeccion_muestral',
                                            data.data[i].constancias_prueba_hermeticidad + ',' + 'constancias_prueba_hermeticidad',
                                            data.data[i].auditorias_opdocumental + ',' + 'auditorias_opdocumental',
                                            data.data[i].prueba_dielectrica + ',' + 'prueba_dielectrica',
                                            data.data[i].reporte_insvisual + ',' + 'reporte_insvisual',
                                            data.data[i].prueba_neumatica + ',' + 'prueba_neumatica',
                                            data.data[i].perfil_resistividad + ',' + 'perfil_resistividad',
                                            data.data[i].ph_bpa + ',' + 'ph_bpa',
                                            data.data[i].ph_bsr + ',' + 'ph_bsr',
                                            data.data[i].inspeccion_electromagnetica + ',' + 'inspeccion_electromagnetica',
                                            data.data[i].determinación_resistencia + ',' + 'determinación_resistencia',
                                            data.data[i].atenuacion_corriente + ',' + 'atenuacion_corriente',
                                            data.data[i].rehabilitacion_anticorrosiva + ',' + 'rehabilitacion_anticorrosiva'];
                                           

                                            llenarTablasFileDocumentalOperacion(persona, "tablaOperacionDocumental", data.data[i].id);
                                        }

                                    }
                                },
                                error: function (xhr, ajaxOptions, thrownError) {

                                }
                            });
                            break;
                        }
                        break;
            case "T4":
                switch (temaconsultaanalisis) {

                    case "Ana1":
                        $('#tablaAnalisisGral tbody')[0].innerHTML = "";
                        $('#tablaAnalisisGral tbody:not(:first)').remove();
                        var webMethod = "get_Analisisgeneral";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethod,
                            data: params,
                            success: function (data) {
                                //if (data.success) {
                                //    for (i = 0; i < data.data.datagrid.length; i++) {
                                //        var persona = [data.data.datagrid[i].id, data.data.datagrid[i].areaunitaria, data.data.datagrid[i].coordenada_especifica, data.data.datagrid[i].kilometro_especifico, data.data.datagrid[i].compania, data.data.datagrid[i].porcentaje_posee, data.data.datagrid[i].fabricante_producto];
                                //        llenarTablas(persona, "tablaAnalisisGral");
                                //    }
                                //}
                                if (data.success) {

                                    var keysForPresion = ["id", "areaunitaria", "coordenada_especifica", "kilometro_especifico",
                                        'compania',
                                        'porcentaje_posee',
                                        'fabricante_producto',
                                        'origen_instalacion',
                                        'pais',
                                        'estado',
                                        'ciudad',
                                        'sector',
                                        'tramo'];

                                    processTableDataAndHideNullColumns(data.data.datagrid, "tablaAnalisisGral", keysForPresion);

                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    case "Ana2":
                        $('#tablaAnalisisGeoespacial tbody')[0].innerHTML = "";
                        $('#tablaAnalisisGeoespacial tbody:not(:first)').remove();
                        var webMethod = "get_AnalisisGeoespacial";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethod,
                            data: params,
                            success: function (data) {
                                if (data.success) {

                                    var keysForPresion = ["id", "areaunitaria", "coordenada_especifica", "kilometro_especifico",
                                        'clase_localizacion',
                                        'fecha_determinacion',
                                        'autoridad_determina',
                                        'id_documento',
                                        'poblacion_total',
                                        'densidad_poblacion',
                                        'fecha_dato',
                                        'metodo_determinacion', 'fuente_informacion','tramo'];

                                    processTableDataAndHideNullColumns(data.data.datagrid, "tablaAnalisisGeoespacial", keysForPresion);

                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    case "Ana6":
                        $('#tablaAnalisisRiesgos tbody')[0].innerHTML = "";
                        $('#tablaAnalisisRiesgos tbody:not(:first)').remove();
                        var webMethodCatodica = "getAnalisisRiesgoDisenio";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethodCatodica,
                            data: params,
                            success: function (data) {
                                if (data.success) {
                                    
                                    var keysForPresion = ["id","areaunitaria",  "coordenada_especifica", "kilometro_especifico", 
                                    'zona_riesgo',
                                    'dependencia_determina',
                                    'elementos_expuestos',
                                    'fecha',
                                    'clase_localizacion',
                                    'estado_historico',
                                    'estado_actual',
                                    'riesgo',
                                'tramo'];
                                    
                                    processTableDataAndHideNullColumns(data.data.datagrid, "tablaAnalisisRiesgos", keysForPresion );
                                        
                                    }
                                },
                                error: function (xhr, ajaxOptions, thrownError) {

                                }
                            });
                        break;
                    

                    case "Ana7":
                        $('#tablaAnalisisDocumental tbody')[0].innerHTML = "";
                        var webMethodSeguridad = "get_analisisdocumental";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethodSeguridad,
                            data: params,
                            success: function (data) {
                                if (data.success) {
                                  
                                    for (i = 0; i < data.data.length; i++) {
                                        var persona = [data.data[i].id, data.data[i].areaunitaria, data.data[i].diagramas_tuberia+ ',' + 'diagramas_tuberia', data.data[i].planos_actualizados_ducto + ',' + 'planos_actualizados_ducto', data.data[i].certificados_materiales + ',' + 'certificados_materiales', data.data[i].planos_reportes + ',' + 'planos_reportes', data.data[i].reportes_condiciones_seguidad + ',' + 'reportes_condiciones_seguidad', data.data[i].especificaciones_estandares_regulados + ',' + 'especificaciones_estandares_regulados', data.data[i].planes_respuesta_emergencia + ',' + 'planes_respuesta_emergencia', data.data[i].registro_cumplimiento + ',' + 'registro_cumplimiento', data.data[i].evaluaciones_tecnicas + ',' + 'evaluaciones_tecnicas', data.data[i].manuales_fabricante + ',' + 'manuales_fabricante'];
                                        llenarTablasFileDocumental(persona, "tablaAnalisisDocumental", data.data[i].id);
                                    }

                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;

                    case "Ana4":
                        $('#tablaAnalisisRiesgoIncidentes tbody')[0].innerHTML = "";
                        $('#tablaAnalisisRiesgoIncidentes tbody:not(:first)').remove();
                        var webMethod = "get_AnalisisRiesgosIncidentes";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethod,
                            data: params,
                            success: function (data) {
                            //    if (data.success) {
                            //        for (i = 0; i < data.data.datagrid.length; i++) {
                            //            var persona = [data.data.datagrid[i].id, data.data.datagrid[i].areaunitaria, data.data.datagrid[i].coordenada_especifica, data.data.datagrid[i].kilometro_especifico, data.data.datagrid[i].tiporiesgo, data.data.datagrid[i].poblado, data.data.datagrid[i].municipio];
                            //            llenarTablas(persona, "tablaAnalisisRiesgoIncidentes");
                            //        }
                            //    }
                            //},
                            //error: function (xhr, ajaxOptions, thrownError) {

                            //}
                                if (data.success) {

                                    var keysForPresion = ["id", "areaunitaria", "coordenada_especifica", "kilometro_especifico",
                                        'tiporiesgo',
                                        'fecha',
                                        'hora_ocurrencia_evento',
                                        'hora_control_evento',
                                        'poblado',
                                        'municipio',
                                        'estado',
                                        'causa_accidente', 'causa_construccion', 'numero_lesionado', 'tipo_evento', 'hora_final_reparacion', 'exposicion', 'altura_max_exposicion', 'distancia_aguas_abajo', 'observacion','tramo'];

                                    processTableDataAndHideNullColumns(data.data.datagrid, "tablaAnalisisRiesgoIncidentes", keysForPresion);

                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    case "Ana5":
                        $('#tablaAnalisisIngenieria tbody')[0].innerHTML = "";
                        $('#tablaAnalisisIngenieria tbody:not(:first)').remove();
                        var webMethod = "get_AnalisisIngenieria";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethod,
                            data: params,
                            success: function (data) {
                            //    if (data.success) {
                            //        for (i = 0; i < data.data.datagrid.length; i++) {
                            //            var persona = [data.data.datagrid[i].id, data.data.datagrid[i].areaunitaria, data.data.datagrid[i].coordenada_especifica, data.data.datagrid[i].kilometro_especifico, data.data.datagrid[i].tiporegulacion, data.data.datagrid[i].gradoacero, data.data.datagrid[i].fecha_inicio_servicio];
                            //            llenarTablas(persona, "tablaAnalisisIngenieria");
                            //        }
                            //    }
                            //},
                            //error: function (xhr, ajaxOptions, thrownError) {

                            //}
                                if (data.success) {
                                var keysForPresion = ["id", "areaunitaria", "coordenada_especifica", "kilometro_especifico",
                                    'tiporegulacion',
                                    'gradoacero',
                                    'fecha_inicio_servicio',
                                    'fecha_instalacion',
                                    'es_tuberia_portadora',
                                    'puede_inspeccion_linea',
                                    'puede_inspeccion_raspaduras',
                                    'tecnicasoldadura', 'fecha_fabricacion', 'materialingenieria', 'ciudad_molino_construccion', 'diametro_nominal', 'es_tuberia_original', 'segmentoingeneria', 'limite_elastico_minimo', 'especificacion_disenio', 'criterios_construccion', 'estado_historico', 'estado_actual','tramo'];

                                processTableDataAndHideNullColumns(data.data.datagrid, "tablaAnalisisIngenieria", keysForPresion);

                            }
                        },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    case "Ana3":
                        $('#tablaAnalisisPlanos tbody')[0].innerHTML = "";
                        var webMethod = "get_AnalisisPlanos";
                        $.ajax({
                            type: "POST",
                            url: apiUrl + webMethod,
                            data: params,
                            success: function (data) {
                                if (data.success) {

                                    var keysForPresion = ["id", "areaunitaria", "coordenada_especifica", "kilometro_especifico",
                                        'fecha_indetificacion',
                                        'fecha_registro',
                                        'tuberia_sobre_suelo',
                                        'tuberia_encima_agua',
                                        'tuberia_altamar',
                                        'perforacion_direccional_horizontal','condicion_prosedencia','tramo'];

                                    processTableDataAndHideNullColumns(data.data.datagrid, "tablaAnalisisPlanos", keysForPresion);

                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {

                            }
                        });
                        break;
                    default:
                }
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

// function llenarTablas(obj, nameTabla) {
//    // $('#tablaPersonas tbody')[0].innerHTML = "";
//     var row = '<tr>';
//     for (j = 1; j < obj.length; j++) {
//         row = row + '<td>' + obj[j] + '</td>';
//     }
//     row = row + '<td><a class="add" title="Guardar" data-toggle="tooltip"id="ra' + obj[0] + '" data-id="' + obj[0] +'"><i class="fa fa-floppy-disk"></i></a> &nbsp;&nbsp;<a class="edit" title="Editar" data-toggle="tooltip" id="re' + obj[0] + '" data-id="' + obj[0] +'"><i class="fa fa-pen"></i></a>&nbsp;&nbsp;<a class="delete" title="Eliminar" data-toggle="tooltip" data-id="' + obj[0] +'"><i class="fa fa-trash"></i></a></td>';
//     row = row + '</tr>';
    
//    $('#' + nameTabla + ' tbody').append(row);
// }

// $(document).ready(function() {
//     $('#tablas').on('click', 'table tbody tr.hideable-row', function() {
//         // Toggle the visibility of the following rows until the next 'hideable-row' or the end of the tbody
//         var $nextRows = $(this).nextAll();
//         $nextRows.each(function() {
//             if ($(this).hasClass('hideable-row')) {
//                 return false; // Exit the loop
//             }
//             $(this).slideToggle({
//                 duration: 200, // You can adjust the duration as needed
//                 easing: 'linear' // One of jQuery UI's easing options
//             }); // This will animate the visibility toggle
//         });
//     });
// });


$(document).ready(function() {
$('#tablas').on('click', 'table tbody tr.hideable-row', function() {
    // Get the clicked row's parent tbody
    var parentTbody = $(this).closest('tbody');
    
    // Toggle the rows below the clicked row in the same tbody until the next hideable-row
    $(this).closest('tr').nextUntil('.hideable-row').toggleClass('d-none');
});
});




function llenarTablas(obj, nameTabla) {
    var category = obj.pop(); 
    // Assuming 4th column determines category
    var row = '<tr class="content-row">';
    for (j = 1; j < obj.length; j++) {
        
        row = row + '<td>' + obj[j] + '</td>';
    }
    row = row + '<td><a class="add" title="Guardar" data-toggle="tooltip" id="ra' + obj[0] + '" data-id="' + obj[0] +'"><i class="fa fa-floppy-disk"></i></a> &nbsp;&nbsp;<a class="edit" title="Editar" data-toggle="tooltip" id="re' + obj[0] + '" data-id="' + obj[0] +'"><i class="fa fa-pen"></i></a>&nbsp;&nbsp;<a class="delete" title="Eliminar" data-toggle="tooltip" data-id="' + obj[0] +'"><i class="fa fa-trash"></i></a></td>';
    row = row + '</tr>';
    
   
    if (nivelconsulta==="Ducto"){
        var temaconsultavar;
        if (temaconsulta==="T1"){
            temaconsultavar=temaconsultadisenio
        } else if (temaconsulta==="T2"){
            temaconsultavar=temaconsultaconstruccion
        } else if(temaconsulta==="T4"){temaconsultavar=temaconsultaanalisis}
        else if (temaconsulta==="T3"){temaconsultavar=temaconsultaoperacion}
        var escapedCategory = removeSpecialCharacters(category)
        
        // Check if tbody for this category exists
        if ($('#' + escapedCategory+temaconsultavar).length === 0) {
           
            // If not, create a new tbody for this category
            $('#'+nameTabla).append('<tbody class="dynamic-tbody" id="' + escapedCategory+temaconsultavar + '"><tr class="hideable-row"><td colspan="100%" style="background-color:#f5f5f5; text-align:center;"><a class="toggle-category"><strong>Tramo: ' + category + '</strong></a></td></tr></tbody>');
        }

    // Append row to the appropriate tbody
            $('#' + escapedCategory+temaconsultavar).append(row);}
    else{

        $('#' + nameTabla).append(row);

    }
}

function removeSpecialCharacters(str) {
    return str.replace(/[^a-zA-Z0-9_]/g, '');
}

function jqSelectorEscape(str) {
    return str.replace(/([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~ ])/g, '\\$1');
}

function llenarTablasFileDocumental(obj, nameTabla,id) {
    // $('#tablaPersonas tbody')[0].innerHTML = "";
    var row = '<tr>';
    for (j = 1; j < obj.length; j++) {
        if (obj[j].split(',')[0] !== null && obj[j].split(',')[0] !== "" && obj[j].split(',')[0] !== undefined && obj[j].split(',')[0] !== "null") {
            if (obj[j].split(',')[1] !== undefined) {
                row = row + '<td style="text-align: center;color:green;"><a class="download-icon"  target="_blank"  href=' + apiUrl + 'analisis-documental/' + id + '/download/' + obj[j].split(',')[1] + ' title="Descargar" data-toggle="tooltip" id="' + obj[0] + '" data-id="' + obj[0] + '"><i class="fa fa-download"></i></a></td>';
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


function llenarTablasFileDocumentalOperacion(obj, nameTabla,id) {
    // $('#tablaPersonas tbody')[0].innerHTML = "";
    var row = '<tr>';
    for (j = 1; j < obj.length; j++) {
        if (obj[j].split(',')[0] !== null && obj[j].split(',')[0] !== "" && obj[j].split(',')[0] !== undefined && obj[j].split(',')[0] !== "null") {
            if (obj[j].split(',')[1] !== undefined) {
                row = row + '<td style="text-align: center;color:green;"><a class="download-icon"  target="_blank"  href=' + apiUrl + 'operacion-documental/' + id + '/download/' + obj[j].split(',')[1] + ' title="Descargar" data-toggle="tooltip" id="' + obj[0] + '" data-id="' + obj[0] + '"><i class="fa fa-download"></i></a></td>';
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



document.addEventListener("DOMContentLoaded", function() {
    // Get the dropdown element
    const tipoCruceDropdown = document.getElementById("riesdis_id_riesgo");

    // Add event listener for change event
    tipoCruceDropdown.addEventListener("change", function() {
        // Hide all the classes first
        hideAllClasses1();

        // Get the selected value
        const selectedValue = this.value;

        // Show the respective class based on the selected value
        switch (selectedValue) {
            case "1":
                showClass("sismo");
                break;
            case "2":
                showClass("desplazamiento");
                break;
            case "3":
                showClass("clima");
                break;
            case "4":
                showClass("inundacion");
                break;
            case "5":
                showClass("descarga");
                break;
            case "6":
                showClass("vientos");
                break;
            case "7":
                showClass("tornados");
                break;
        }
    });
    // Get the dropdown element
    const tipoInstalacionDropdown = document.getElementById("cmb_tipoInstalacion");

    // Add event listener for change event
    tipoInstalacionDropdown.addEventListener("change", function () {
        // Hide all the classes first
        hideAllClassesinstalaciones();

        // Get the selected value
        const selectedValue = this.value;

        // Show the respective class based on the selected value
        switch (selectedValue) {
            case "1":
                showClass("uno");
                break;
            case "2":
                showClass("dos");
                break;
            case "3":
                showClass("tres");
                break;
            case "4":
                showClass("cuatro");
                break;
            case "5":
                showClass("cinco");
                break;
            case "6":
                showClass("seis");
                break;
            case "7":
                showClass("siete");
                break;
            case "8":
                showClass("ocho");
                break;
            case "9":
                showClass("nueve");
                break;
            case "10":
                showClass("diez");
                break;
            case "11":
                showClass("once");
                break;
            case "12":
                showClass("doce");
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



function hideAllClasses1() {
    hideClass("sismo");
    hideClass("desplazamiento");
    hideClass("clima");
    hideClass("descarga");
    hideClass("vientos");
    hideClass("tornados");
    hideClass("inundacion");
}
function hideAllClassesinstalaciones() {
    hideClass("uno");
    hideClass("dos");
    hideClass("tres");
    hideClass("cuatro");
    hideClass("cinco");
    hideClass("seis");
    hideClass("siete");
    hideClass("ocho");
    hideClass("nueve");
    hideClass("diez");
    hideClass("once");
    hideClass("doce");
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

    $("#generalanalisisform").hide();
    $("#infogeoespacialanalisisform").hide();
    $("#planosanalisisform").hide();
    
    
    $("#documentalopfrm").hide();
    $("#instalacionesoperacionfrm").hide();
    $("#vandalismooperacionfrm").hide();
    $("#historialreparacionesoperacionfrm").hide();
    $("#monitoreocorrosionoperacionfrm").hide();
    $("#historialfugasderramesoperacionfrm").hide();
    $("#generaloperacionfrm").hide();

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
    $('#' + tableId + ' tbody:not(:first)').remove();
    
    $('#' + tableId+ ' tbody').each(function() {
        $(this).empty();
    });
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
//#region Métodos Análisis
//#region General
async function fnshowAnalisisGeneral(id_d = null) {
    $('#generalanalisisform').show();
    $('#analisisforms').hide();
    try {
        if (id_d) {
            await consultaDatosAnalisisGeneral(id_d = id_d);
        }
        else { consultaDatosAnalisisGeneral(); }

        //// If you want to do something after all functions have completed, you can do it here

    } catch (error) {
        console.error("An error occurred:", error);
    }
    resetValidationClasses('generalanalisisform');
}
function cancelAnalisisGeneral() {
    $('#analisisforms').show();
    $('#generalanalisisform').hide();
}
function saveAnalisisGral() {
    var webMethod = "saveAnalisisGeneral";
    if ($("#compania_analisis").val() != "") {
        var params = {
            C_0101_0001_id: area,
            compania: $("#compania_analisis").val(),
            porcentaje_posee: $('#porc_posee_analisis').val(),
            fabricante_producto: $('#fabricante_ducto_analisis').val(),
            origen_instalacion: $("#origen_instalacion_analisis").val(),
            pais: $("#pais_analisis").val(),
            estado: $("#estado_analisis").val(),
            ciudad: $("#ciudad_analisis").val(),
            sector: $("#sector_analisis").val(),
            coordenada_especifica: $("#coord_esp_iden_x_analisis").val() + ' ' + $("#coord_esp_iden_y_analisis").val(),
            kilometro_especifico: $("#km_esp_iden_analisis").val()
        };
        var formData = new FormData();
        Object.keys(params).forEach(key => formData.append(key, params[key]));

       
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
                    $('#analisisforms').show();
                    $('#generalanalisisform').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }
    else {
        alert("Es necesario ingresar la compañía para realizar el registro");
    }
}
function consultaDatosAnalisisGeneral(id_d = null) {
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 12, "tbl_gral_analisis");
    var webMethod;
    var params;
    if (id_d) {
        webMethod = "getAnalisisGeneralById";
        params = {
            id: id_d
        };
    }

    else {

        webMethod = "get_Analisisgeneral";
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
                var infodata;
                if (webMethod === "getAnalisisGeneralById")
                    infodata = (data.data);
                else if (webMethod === "get_Analisisgeneral")
                    infodata = (data.data.datagrid);
                if (infodata.length > 0) {
                    if (webMethod === "getAnalisisGeneralById")
                        llenarDatosActualizacionAnalisisGeneral(infodata);
                    else if (webMethod === "get_Analisisgeneral")
                        llenarDatosActualizacionAnalisisGeneral(infodata);
                    $("#btn_savegeneral_analisis").hide();
                    $("#btn_updategeneral_analisis").show();
                    $("#btn_newgeneral_analisis").show();
                    $("#btn_updategeneral_analisis").text('Actualizar')
                }
                else {

                    clearInputTextValues('generalanalisisform');
                    inhabilitarform("#generalanalisisform", false)
                    $("#btn_savegeneral_analisis").show();
                    $("#btn_updategeneral_analisis").hide();
                    $("#btn_newgeneral_analisis").hide();

                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;

                    $("#txtductoanalisisgeneral").val(ducto_nombre);
                    $("#txttramoanalisisgeneral").val(tramo_nombre);
                    $("#txtareaanalisisgeneral").val(area_unitaria_nombre);
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });

}
var idAnalisisgral;
function llenarDatosActualizacionAnalisisGeneral(data) {
    $("#btn_updateidentificacion").text('Actualizar');
    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== null) {
        const coords = data[0].coordenada_especifica.split(' ');
        $("#coord_esp_iden_x_analisis").val(coords[0]);
        $("#coord_esp_iden_y_analisis").val(coords[1]);
    }
    else {
        $("#coord_esp_iden_x_analisis").val("");
        $("#coord_esp_iden_y_analisis").val("");
    }
    $("#km_esp_iden_analisis").val(data[0].kilometro_especifico);
    $("#compania_analisis").val(data[0].compania);
    $("#porc_posee_analisis").val(data[0].porcentaje_posee);
    $("#fabricante_ducto_analisis").val(data[0].fabricante_producto);
    $("#origen_instalacion_analisis").val(data[0].origen_instalacion);
    $("#pais_analisis").val(data[0].pais);
    $("#estado_analisis").val(data[0].estado);
    $("#ciudad_analisis").val(data[0].ciudad);
    $("#sector_analisis").val(data[0].sector);
    idAnalisisgral = data[0].id;
    inhabilitarform("#generalanalisisform", true);   
}
function updateAnalisisGeneral() {
    if ($("#btn_updategeneral_analisis").text() === "Actualizar") {
        inhabilitarform("#generalanalisisform", false)
        $("#btn_updategeneral_analisis").text('Guardar');
        showDestroyIcons('generalanalisisform', true);
    }
    else {
        var params = {
        };
        var webMethod = "";
        webMethod = "updateAnalisisGeneral";
        params = {
            id: idAnalisisgral,
            C_0101_0001_id: area,
            compania: $("#compania_analisis").val(),
            porcentaje_posee: $('#porc_posee_analisis').val(),
            fabricante_producto: $('#fabricante_ducto_analisis').val(),
            origen_instalacion: $("#origen_instalacion_analisis").val(),
            pais: $("#pais_analisis").val(),
            estado: $("#estado_analisis").val(),
            ciudad: $("#ciudad_analisis").val(),
            sector: $("#sector_analisis").val(),
            coordenada_especifica: $("#coord_esp_iden_x_analisis").val() + ' ' + $("#coord_esp_iden_y_analisis").val(),
            kilometro_especifico: $("#km_esp_iden_analisis").val()
        };
        var formData = new FormData();
        Object.keys(params).forEach(key => formData.append(key, params[key]));

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
                    $('#analisisforms').show();
                    $('#generalanalisisform').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }
}
function nuevoAnalisisGeneral() {

    $("#btn_savegeneral_analisis").show();
    $("#btn_newgeneral_analisis").hide();
    $("#btn_updategeneral_analisis").hide();
    clearInputTextValuesNew('generalanalisisform');
    inhabilitarform("#generalanalisisform", false);

}
//#endregion


//#region Geoespacial
async function fnshowAnalisisGeoespacial(id_d = null) {
    $('#infogeoespacialanalisisform').show();
    $('#analisisforms').hide();
    try {
        if (id_d) {
            await consultaDatosAnalisisGeoespacial(id_d = id_d);
        }
        else { consultaDatosAnalisisGeoespacial(); }

        //// If you want to do something after all functions have completed, you can do it here

    } catch (error) {
        console.error("An error occurred:", error);
    }
    resetValidationClasses('infogeoespacialanalisisform');
}
function consultaDatosAnalisisGeoespacial(id_d = null) {
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 13, "tbl_geo_analisis");
    var webMethod;
    var params;
    if (id_d) {
        webMethod = "getAnalisisGeoespacialById";
        params = {
            id: id_d
        };
    }

    else {

        webMethod = "get_AnalisisGeoespacial";
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
                var infodata;
                if (webMethod === "getAnalisisGeoespacialById")
                    infodata = (data.data);
                else if (webMethod === "get_AnalisisGeoespacial")
                    infodata = (data.data.datagrid);
                if (infodata.length > 0) {
                    if (webMethod === "getAnalisisGeoespacialById")
                        llenarDatosActualizacionAnalisisGeoespacial(infodata);
                    else if (webMethod === "get_AnalisisGeoespacial")
                        llenarDatosActualizacionAnalisisGeoespacial(infodata);
                    $("#btn_savegeoespacial_analisis").hide();
                    $("#btn_updategeoespacial_analisis").show();
                    $("#btn_newgeoespacial_analisis").show();
                    $("#btn_updategeoespacial_analisis").text('Actualizar')
                }
                else {

                    clearInputTextValues('generalanalisisform');
                    inhabilitarform("#generalanalisisform", false)
                    $("#btn_savegeoespacial_analisis").show();
                    $("#btn_updategeoespacial_analisis").hide();
                    $("#btn_newgeoespacial_analisis").hide();

                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;

                    $("#txtductogeogenera_geo").val(ducto_nombre);
                    $("#txttramogeogeneral_geo").val(tramo_nombre);
                    $("#txtareageogeneral_geo").val(area_unitaria_nombre);
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });

}
function cancelAnalisisGeoespacial() {
    $('#analisisforms').show();
    $('#infogeoespacialanalisisform').hide();
}
function saveAnalisisGeoespacial() {
    var webMethod = "saveAnalisisGeoespecial";
  
        var params = {
            C_0101_0001_id: area,
            clase_localizacion: $("#cmb_claselocalizacion_geo").val(),
            fecha_determinacion: $('#fecha_determinacion_geo').val(),
            autoridad_determina: $('#autoridad_determina_geo').val(),
            id_documento: $("#idocomento_geo").val(),
            poblacion_total: $("#pobtot_geo").val(),
            densidad_poblacion: $("#densidadpob_geo").val(),
            fecha_dato: $("#fechadato_geo").val(),
            metodo_determinacion: $("#metododeterminacion_geo").val(),
            fuente_informacion: $("#fuenteinformacion_geo").val(),
            coordenada_especifica: $("#coord_esp_iden_x_geo").val() + ' ' + $("#coord_esp_iden_y_geo").val(),
            kilometro_especifico: $("#km_esp_iden_geo").val()
        };
        var formData = new FormData();
        Object.keys(params).forEach(key => formData.append(key, params[key]));


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
                    $('#analisisforms').show();
                    $('#infogeoespacialanalisisform').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });   
}
var idAnalisisGo;
function llenarDatosActualizacionAnalisisGeoespacial(data) {
    $("#btn_updategeoespacial_analisis").text('Actualizar');
    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== null) {
        const coords = data[0].coordenada_especifica.split(' ');
        $("#coord_esp_iden_x_geo").val(coords[0]);
        $("#coord_esp_iden_y_geo").val(coords[1]);
    }
    else {
        $("#coord_esp_iden_x_geo").val("");
        $("#coord_esp_iden_y_geo").val("");
    }
    $("#cmb_claselocalizacion_geo option:contains(" + data[0].clase_localizacion + ")").attr('selected', 'selected');
    $("#km_esp_iden_geo").val(data[0].kilometro_especifico);
    $("#fecha_determinacion_geo").val(data[0].fecha_determinacion.split(" ")[0]);
    $("#autoridad_determina_geo").val(data[0].autoridad_determina);
    $("#idocomento_geo").val(data[0].id_documento);
    $("#pobtot_geo").val(data[0].poblacion_total);
    $("#densidadpob_geo").val(data[0].densidad_poblacion);
    $("#fechadato_geo").val(data[0].fecha_dato.split(" ")[0]);
    $("#metododeterminacion_geo").val(data[0].metodo_determinacion);
    $("#fuenteinformacion_geo").val(data[0].fuente_informacion);
    idAnalisisGo = data[0].id;
    inhabilitarform("#infogeoespacialanalisisform", true);
}
function updateAnalisisGeoespacial() {
    if ($("#btn_updategeoespacial_analisis").text() === "Actualizar") {
        inhabilitarform("#infogeoespacialanalisisform", false)
        $("#btn_updategeoespacial_analisis").text('Guardar');
        showDestroyIcons('infogeoespacialanalisisform', true);
    }
    else {
        var params = {
        };
        var webMethod = "";
        webMethod = "updateAnalisisGeoespacial";
        params = {
            id: idAnalisisGo,
            C_0101_0001_id: area,
            clase_localizacion: $("#cmb_claselocalizacion_geo").val(),
            fecha_determinacion: $('#fecha_determinacion_geo').val(),
            autoridad_determina: $('#autoridad_determina_geo').val(),
            id_documento: $("#idocomento_geo").val(),
            poblacion_total: $("#pobtot_geo").val(),
            densidad_poblacion: $("#densidadpob_geo").val(),
            fecha_dato: $("#fechadato_geo").val(),
            metodo_determinacion: $("#metododeterminacion_geo").val(),
            fuente_informacion: $("#fuenteinformacion_geo").val(),
            coordenada_especifica: $("#coord_esp_iden_x_geo").val() + ' ' + $("#coord_esp_iden_y_geo").val(),
            kilometro_especifico: $("#km_esp_iden_geo").val()
        };
        var formData = new FormData();
        Object.keys(params).forEach(key => formData.append(key, params[key]));

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
                    $('#analisisforms').show();
                    $('#infogeoespacialanalisisform').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }
}
function nuevoAnalisisGeoespacial() {

    $("#btn_savegeoespacial_analisis").show();
    $("#btn_newgeoespacial_analisis").hide();
    $("#btn_updategeoespacial_analisis").hide();
    clearInputTextValuesNew('infogeoespacialanalisisform');
    inhabilitarform("#infogeoespacialanalisisform", false);

}
//#endregion
//#region Planos
async function fnshowAnalisisPlanos(id_d = null) {
    $('#planosanalisisform').show();
    $('#analisisforms').hide();
    try {
        if (id_d) {
            await consultaDatosAnalisisPlanos(id_d = id_d);
        }
        else { consultaDatosAnalisisPlanos(); }

        //// If you want to do something after all functions have completed, you can do it here

    } catch (error) {
        console.error("An error occurred:", error);
    }
    resetValidationClasses('planosanalisisform');
}
function consultaDatosAnalisisPlanos(id_d = null) {
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 14, "tbl_plano_analisis");
    var webMethod;
    var params;
    if (id_d) {
        webMethod = "getAnalisisPlanosById";
        params = {
            id: id_d
        };
    }

    else {

        webMethod = "get_AnalisisPlanos";
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
                var infodata;
                if (webMethod === "getAnalisisPlanosById")
                    infodata = (data.data);
                else if (webMethod === "get_AnalisisPlanos")
                    infodata = (data.data.datagrid);
                if (infodata.length > 0) {
                    if (webMethod === "getAnalisisPlanosById")
                        llenarDatosActualizacionAnalisisPlanos(infodata);
                    else if (webMethod === "get_AnalisisPlanos")
                        llenarDatosActualizacionAnalisisPlanos(infodata);
                    $("#btn_saveplanos_analisis").hide();
                    $("#btn_updateplanos_analisis").show();
                    $("#btn_newplanos_analisis").show();
                    $("#btn_updateplanos_analisis").text('Actualizar')
                }
                else {

                    clearInputTextValues('planosanalisisform');
                    inhabilitarform("#planosanalisisform", false)
                    $("#btn_saveplanos_analisis").show();
                    $("#btn_updateplanos_analisis").hide();
                    $("#btn_newplanos_analisis").hide();
                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;

                    $("#txtductogeogenera_planos").val(ducto_nombre);
                    $("#txttramogeogeneral_planos").val(tramo_nombre);
                    $("#txtareageogeneral_planos").val(area_unitaria_nombre);
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });

}
var idAnalisisPlanos;
function llenarDatosActualizacionAnalisisPlanos(data) {
    $("#btn_updateplanos_analisis").text('Actualizar');
    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== null) {
        const coords = data[0].coordenada_especifica.split(' ');
        $("#coord_esp_iden_x_planos").val(coords[0]);
        $("#coord_esp_iden_y_planos").val(coords[1]);
    }
    else {
        $("#coord_esp_iden_x_planos").val("");
        $("#coord_esp_iden_y_planos").val("");
    }   
    $("#km_esp_iden_planos").val(data[0].kilometro_especifico);
    $("#fecha_identificacion_planos").val(data[0].fecha_indetificacion.split(" ")[0]);
    $("#fecha_registro_planos").val(data[0].fecha_registro.split(" ")[0]);
    $("#cmb_tuberisobresuelo_plano option:contains(" + data[0].tuberia_sobre_suelo + ")").attr('selected', 'selected');
    $("#cmb_tuberiencimaagua_plano option:contains(" + data[0].tuberia_encima_agua + ")").attr('selected', 'selected');
    $("#cmb_tuberiaaltamar_plano option:contains(" + data[0].tuberia_altamar + ")").attr('selected', 'selected');
    $("#cmb_perforaciondireccional_plano option:contains(" + data[0].perforacion_direccional_horizontal + ")").attr('selected', 'selected');
    $("#condicionprocedencia_plano").val(data[0].condicion_prosedencia);
    if (data[0].planos_mapas_reportes !== "" && data[0].planos_mapas_reportes !== null) {
        // Find the correct input group using the data-column attribute
        const inputGroup = document.querySelector(`#filefrmplano`);
        const customFileDiv = inputGroup.querySelector('#fileconteinerplano ');

        if (customFileDiv) {
            // Create the download icon
            const downloadIcon = document.createElement('a');
            downloadIcon.href = `${apiUrl}analisis-planos/${data[0].id}/download`;
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
            destroyIcon.href = `${apiUrl}analisis-planos/${data[0].id}/destroy`;
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
    idAnalisisPlanos = data[0].id;
    inhabilitarform("#planosanalisisform", true);
}
function cancelAnalisisPlanos() {
    $('#analisisforms').show();
    $('#planosanalisisform').hide();
}
/*
function saveAnalisisPlanos() {
    var webMethod = "saveAnalisisPlanos";
    var params = {
         area_unitaria_id: area,
        fecha_indetificacion: $("#fecha_identificacion_planos").val(),
        fecha_registro: $('#fecha_registro_planos').val(),
        tuberia_sobre_suelo: $('#cmb_tuberisobresuelo_plano').val(),
        tuberia_encima_agua: $("#cmb_tuberiencimaagua_plano").val(),
        tuberia_altamar: $("#cmb_tuberiaaltamar_plano").val(),
        perforacion_direccional_horizontal: $("#cmb_perforaciondireccional_plano").val(),
        condicion_prosedencia: $("#condicionprocedencia_plano").val(),
        coordenada_especifica: $("#coord_esp_iden_x_planos").val() + ' ' + $("#coord_esp_iden_y_planos").val(),
        kilometro_especifico: $("#km_esp_iden_planos").val()
        };
        var formData = new FormData();
       //formData.append('planos_mapas_reportes', $("#fileplanosmapasreportes")[0].files[0]);

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
                    //$('#analisisforms').show();
                    //$('#infogeoespacialanalisisform').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
}*/
function saveAnalisisPlanos() {
    var webMethod = "saveAnalisisPlanos";
    const formData = new FormData();

    formData.append("kilometro_especifico", $("#km_esp_iden_planos").val())
    formData.append("coordenada_especifica", $("#coord_esp_iden_x_planos").val() + ' ' + $("#coord_esp_iden_y_planos").val(),)
    formData.append("C_0101_0001_id", area)
    formData.append("fecha_indetificacion", $('#fecha_identificacion_planos').val())
    formData.append("fecha_registro", $('#fecha_registro_planos').val())
    formData.append("tuberia_sobre_suelo", $('#cmb_tuberisobresuelo_plano').val())
    formData.append("tuberia_encima_agua", $('#cmb_tuberiencimaagua_plano').val())
    formData.append("tuberia_altamar", $('#cmb_tuberiaaltamar_plano').val())
    formData.append("perforacion_direccional_horizontal", $('#cmb_perforaciondireccional_plano').val())
    formData.append("condicion_prosedencia", $('#condicionprocedencia_plano').val())
    formData.append('planos_mapas_reportes', $("#fileplanosmapasreportes")[0].files[0]);
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
                console.log(data.data);
                alert("Información almacenada correctamente");
                    $('#analisisforms').show();
                    $('#planosanalisisform').hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}

function updateAnalisisPlanos() {
    if ($("#btn_updateplanos_analisis").text() === "Actualizar") {
        inhabilitarform("#planosanalisisform", false)
        $("#btn_updateplanos_analisis").text('Guardar');
        showDestroyIcons('planosanalisisform', true);
    }
    else {
        var params = {
        };
        var webMethod = "";
        webMethod = "updateAnalisisPlanos";
        /*
        params = {
            id: idAnalisisGo,
            C_0101_0001_id: area,
            clase_localizacion: $("#cmb_claselocalizacion_geo").val(),
            fecha_determinacion: $('#fecha_determinacion_geo').val(),
            autoridad_determina: $('#autoridad_determina_geo').val(),
            id_documento: $("#idocomento_geo").val(),
            poblacion_total: $("#pobtot_geo").val(),
            densidad_poblacion: $("#densidadpob_geo").val(),
            fecha_dato: $("#fechadato_geo").val(),
            metodo_determinacion: $("#metododeterminacion_geo").val(),
            fuente_informacion: $("#fuenteinformacion_geo").val(),
            coordenada_especifica: $("#coord_esp_iden_x_geo").val() + ' ' + $("#coord_esp_iden_y_geo").val(),
            kilometro_especifico: $("#km_esp_iden_geo").val()
        };
        var formData = new FormData();
        Object.keys(params).forEach(key => formData.append(key, params[key]));*/
        const formData = new FormData();
        formData.append("kilometro_especifico", $("#km_esp_iden_planos").val())
        formData.append("coordenada_especifica", $("#coord_esp_iden_x_planos").val() + ' ' + $("#coord_esp_iden_y_planos").val(),)
        formData.append("C_0101_0001_id", area)
        formData.append("id", idAnalisisPlanos)
        formData.append("fecha_indetificacion", $('#fecha_identificacion_planos').val())
        formData.append("fecha_registro", $('#fecha_registro_planos').val())
        formData.append("tuberia_sobre_suelo", $('#cmb_tuberisobresuelo_plano').val())
        formData.append("tuberia_encima_agua", $('#cmb_tuberiencimaagua_plano').val())
        formData.append("tuberia_altamar", $('#cmb_tuberiaaltamar_plano').val())
        formData.append("perforacion_direccional_horizontal", $('#cmb_perforaciondireccional_plano').val())
        formData.append("condicion_prosedencia", $('#condicionprocedencia_plano').val())
        formData.append('planos_mapas_reportes', $("#fileplanosmapasreportes")[0].files[0]);

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
                    $('#analisisforms').show();
                    $('#planosanalisisform').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }
}
function nuevoAnalisisPlanos() {

    $("#btn_saveplanos_analisis").show();
    $("#btn_newplanos_analisis").hide();
    $("#btn_updateplanos_analisis").hide();
    clearInputTextValuesNew('planosanalisisform');
    inhabilitarform("#planosanalisisform", false);

}
//#endregion planos



// Documental

function cancelAnalisisDocumental() {
    $('#analisisforms').show();
    $('#documentallisisform').hide();
}


var idAnaDocumental;

function fnshowAnalisisDocumental(id_d=null) {
    $('#documentallisisform').show();
    if (id_d){
        consultaDatosAnaDocumental(id_d=id_d);}
       else { consultaDatosAnaDocumental();}
    
    $('#analisisforms').hide();
    resetValidationClasses('documentallisisform')
   
}


function nuevoAnalisisDocumental(){

    $("#btn_savedocumentos_analisis").show();
    //$("#btn_newseguridad").hide();
    $("#btn_newdocumentoss_analisis").hide();
    clearInputTextValuesNew('documentallisisform');
    inhabilitarform("#documentallisisform", false);

}



function consultaDatosAnaDocumental(id_d = null) {
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 18, "tbl_doc_analisis");
    clearAllFileInputsInDiv('documentallisisform')
    clearInputTextValues('documentallisisform');
    var webMethod;
    var params;
    if (id_d) {
        webMethod = "getAnalisisDocumentalById";
        params = {
            id: id_d
        };
    } else {
        webMethod = "getAnalisisDocumental";
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
        
        const { id: serviceId, success:success,coordenada_especifica:coordenada_especifica,kilometro_especifico:kilometro_especifico, ...columnsData } = data;
        if (success){
        idAnaDocumental=serviceId
        if (data.coordenada_especifica !== "" && data.coordenada_especifica !== null&& data.coordenada_especifica !== null) {
            const coords = data.coordenada_especifica.split(' ');
            $("#coord_esp_iden_x_analisis_documental").val(coords[0]);
            $("#coord_esp_iden_y_analisis_documental").val(coords[1]);
        }
        else{$("#coord_esp_iden_y_analisis_documental").val("");
        $("#coord_esp_iden_y_analisis_documental").val("");}    

        $("#km_esp_iden_analisis_documental").val(data.kilometro_especifico)
        Object.values(columnsData).forEach(item => {
            if (item.hasFile) {
                // Find the correct input group using the data-column attribute
                const inputGroup = document.querySelector(`.input-group[data-column="${item.column}"]`);
                const customFileDiv = inputGroup.querySelector('.custom-file');
        
                if (customFileDiv) {
                    // Create the download icon
                    const downloadIcon = document.createElement('a');
                    downloadIcon.href = `${apiUrl}analisis-documental/${serviceId}/download/${item.column}`;
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
                    destroyIcon.href = `${apiUrl}analisis-documental/${serviceId}/destroy/${item.column}`;
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
        $("#btn_updatedocumentos_analisis").text("Actualizar") 
        $("#btn_updatedocumentos_analisis").show()
        inhabilitarform("#documentallisisform", true)
        $("#btn_savedocumentos_analisis").hide();
        //$("#btn_newseguridad").show();
        $("#btn_newdocumentoss_analisis").hide();
        showDestroyIcons('documentallisisform',false);
    }

    else {

        inhabilitarform("#documentallisisform", false)
        $("#btn_savedocumentos_analisis").show();
        $("#btn_newdocumentoss_analisis").hide();
        $("#btn_updatedocumentos_analisis").hide();
        showDestroyIcons('documentallisisform',false);
    }


    getNamesByAreaUnitariaId(area).then(data => {
        let area_unitaria_nombre = data.area_unitaria_nombre;
        let tramo_nombre = data.tramo_nombre;
        let ducto_nombre = data.ducto_nombre;
    
        $("#txtductogeneral").val(ducto_nombre);
        $("#txttramogeneral").val(tramo_nombre);
        $("#txtareageneral").val(area_unitaria_nombre);
        $("#txtductooperaciondocumental").val(ducto_nombre);
        $("#txttramoanalisisdocumental").val(tramo_nombre);
        $("#txtareaanalisisdocumental").val(area_unitaria_nombre);


    })

    })
    .catch(error => console.error('Error fetching data:', error));
}

function saveAnalisisDocumental() {


    var webMethod = "saveAnaDocumental";

    const formData = new FormData();

    formData.append("kilometro_especifico",$("#km_esp_iden_analisis_documental").val() )
    formData.append("coordenada_especifica",  $("#coord_esp_iden_x_analisis_documental").val()+' '+$("#coord_esp_iden_y_analisis_documental").val(),)
    formData.append("C_0101_0001_id", area)
    // Make sure files are being selected and appended properly
    if($("#diagramas_tuberia")[0].files[0]) {
        formData.append("diagramas_tuberia", $("#diagramas_tuberia")[0].files[0]);
    }
    if($("#planos_actualizados_ducto")[0].files[0]) {
        formData.append("planos_actualizados_ducto", $("#planos_actualizados_ducto")[0].files[0]);
    }
    if($("#certificados_materiales")[0].files[0]) {
        formData.append("certificados_materiales", $("#certificados_materiales")[0].files[0]);
    }
    if($("#planos_reportes")[0].files[0]) {
        formData.append("planos_reportes", $("#planos_reportes")[0].files[0]);
    }
    if($("#reportes_condiciones_seguidad")[0].files[0]) {
        formData.append("reportes_condiciones_seguidad", $("#reportes_condiciones_seguidad")[0].files[0]);
    }
    if($("#especificaciones_estandares_regulados")[0].files[0]) {
        formData.append("especificaciones_estandares_regulados", $("#especificaciones_estandares_regulados")[0].files[0]);
    }
    if($("#planes_respuesta_emergencia")[0].files[0]) {
        formData.append("planes_respuesta_emergencia", $("#planes_respuesta_emergencia")[0].files[0]);
    }
    if($("#registro_cumplimiento")[0].files[0]) {
        formData.append("registro_cumplimiento", $("#registro_cumplimiento")[0].files[0]);
    }
    if ($("#evaluaciones_tecnicas")[0].files[0]) {
        formData.append("evaluaciones_tecnicas", $("#evaluaciones_tecnicas")[0].files[0]);
    }
    if ($("#manuales_fabricante")[0].files[0]) {
        formData.append("manuales_fabricante", $("#manuales_fabricante")[0].files[0]);
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
            $("#diagramas_tuberia").val('');
            $("#planos_actualizados_ducto").val('');
            $("#certificados_materiales").val('');
            $("#planos_reportes").val('');
            $("#reportes_condiciones_seguidad").val('');
            $("#especificaciones_estandares_regulados").val('');
            $("#planes_respuesta_emergencia").val('');
            $("#registro_cumplimiento").val('');
            $("#evaluaciones_tecnicas").val('');
            $("#manuales_fabricante").val('');
            alert("Información almacenada correctamente");
            $('#analisisforms').show();
            $('#documentallisisform').hide();
        }
    })
    .catch(error => {
        alert("Error: " + error);
    });

}

function updateAnalisisDocumental() {
    if ($("#btn_updatedocumentos_analisis").text() === "Actualizar") {
        inhabilitarform("#documentallisisform", false);
        showDestroyIcons('documentallisisform',true);
        $("#btn_updatedocumentos_analisis").text('Guardar');
    }
    else {
        var webMethod = "updateAnaDocumental";

        const formData = new FormData();
        formData.append("id", idAnaDocumental)
        formData.append("kilometro_especifico",$("#km_esp_iden_analisis_documental").val() )
        formData.append("coordenada_especifica",  $("#coord_esp_iden_x_analisis_documental").val()+' '+$("#coord_esp_iden_y_analisis_documental").val(),)
        formData.append("C_0101_0001_id", area)
        // Make sure files are being selected and appended properly
        if($("#diagramas_tuberia")[0].files[0]) {
            formData.append("diagramas_tuberia", $("#diagramas_tuberia")[0].files[0]);
        }
        if($("#planos_actualizados_ducto")[0].files[0]) {
            formData.append("planos_actualizados_ducto", $("#planos_actualizados_ducto")[0].files[0]);
        }
        if($("#certificados_materiales")[0].files[0]) {
            formData.append("certificados_materiales", $("#certificados_materiales")[0].files[0]);
        }
        if($("#planos_reportes")[0].files[0]) {
            formData.append("planos_reportes", $("#planos_reportes")[0].files[0]);
        }
        if($("#reportes_condiciones_seguidad")[0].files[0]) {
            formData.append("reportes_condiciones_seguidad", $("#reportes_condiciones_seguidad")[0].files[0]);
        }
        if($("#especificaciones_estandares_regulados")[0].files[0]) {
            formData.append("especificaciones_estandares_regulados", $("#especificaciones_estandares_regulados")[0].files[0]);
        }
        if($("#planes_respuesta_emergencia")[0].files[0]) {
            formData.append("planes_respuesta_emergencia", $("#planes_respuesta_emergencia")[0].files[0]);
        }
        if($("#registro_cumplimiento")[0].files[0]) {
            formData.append("registro_cumplimiento", $("#registro_cumplimiento")[0].files[0]);
        }
        if ($("#evaluaciones_tecnicas")[0].files[0]) {
            formData.append("evaluaciones_tecnicas", $("#evaluaciones_tecnicas")[0].files[0]);
        }
        if ($("#manuales_fabricante")[0].files[0]) {
            formData.append("manuales_fabricante", $("#manuales_fabricante")[0].files[0]);
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
                $('#analisisforms').show();
                $('#documentallisisform').hide();
                $("#btn_updatedocumentos_analisis").text("Actualizar")
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
    }
}

// Riesgo de diseño

async function fnshowAnalisisriesdis(id_d = null) {
    $('#riesdisanalisisform').show();
    $('#analisisforms').hide();
    await loadElemento();
    await loadRiesgo();
    try {
        if (id_d) {
            await consultaDatosAnalisisriesdis(id_d = id_d);
        }
        else { consultaDatosAnalisisriesdis(); }

        //// If you want to do something after all functions have completed, you can do it here

    } catch (error) {
        console.error("An error occurred:", error);
    }
    resetValidationClasses('riesdisanalisisform');
}
function cancelAnalisisriesdis() {
    $('#analisisforms').show();
    $('#riesdisanalisisform').hide();
}
function saveAnalisisRepDis() {
    var webMethod = "saveAnalisisRiesgoDisenio";
    if (area) {
        var params = {
            C_0101_0001_id: area,
            coordenada_especifica: $("#coord_esp_iden_x_ana_RiesDis").val()+' '+$("#coord_esp_iden_y_ana_RiesDis").val(),
            kilometro_especifico: $("#km_esp_iden_ana_RiesDis").val(),
            zona_riesgo: $("#riesdis_zona_riesgo").val(),
            dependencia_determina: $("#riesdis_dependencia_determina").val(),
            id_elementos_expuestos: $("#riesdis_id_elementos_expuestos").val(),
            fecha: $("#riesdis_fecha").val(),
            clase_localizacion: $("#riesdis_clase_localizacion").val(),
            estado_historico: $("#riesdis_estado_historico").val(),
            estado_actual: $("#riesdis_estado_actual").val(),
            id_riesgo: $("#riesdis_id_riesgo").val(),
            A1: $("#riesdis_a1").val(),
            A2: $("#riesdis_a2").val(),
            A3: $("#riesdis_a3").val(),
            A4: $("#riesdis_a4").val(),
            A5: $("#riesdis_a5").val(),
            A6: $("#riesdis_a6").val(),
            A7: $("#riesdis_a7").val(),
            A8: $("#riesdis_a8").val(),
            A9: $("#riesdis_a9").val(),
            A10: $("#riesdis_a10").val(),
            A11: $("#riesdis_a11").val(),
            A12: $("#riesdis_a12").val()
        };
        var formData = new FormData();
        Object.keys(params).forEach(key => formData.append(key, params[key]));

       
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
                    $('#analisisforms').show();
                    $('#riesdisanalisisform').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }
    else {
        alert("Es necesario ingresar la compañía para realizar el registro");
    }
}
function consultaDatosAnalisisriesdis(id_d = null) {
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 17, "tbl_riesgdis_analisis");
    var webMethod;
    var params;
    if (id_d) {
        webMethod = "getAnalisisRiesgoDisenioById";
        params = {
            id: id_d
        };
    }

    else {

        webMethod = "getAnalisisRiesgoDisenio";
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
                var infodata;
                if (webMethod === "getAnalisisRiesgoDisenioById")
                    infodata = (data.data);
                else if (webMethod === "getAnalisisRiesgoDisenio")
                    infodata = (data.data.datagrid);
                if (infodata.length > 0) {
                    if (webMethod === "getAnalisisRiesgoDisenioById")
                        llenarDatosActualizacionAnalisisriesdis(infodata);
                    else if (webMethod === "getAnalisisRiesgoDisenio")
                        llenarDatosActualizacionAnalisisriesdis(infodata);
                    $("#btn_saveriesdis_analisis").hide();
                    $("#btn_updateriesdis_analisis").show();
                    $("#btn_updateriesdis_analisis").text('Actualizar')
                    $("#btn_newriesdis_analisis").show();
                }
                else {

                    clearInputTextValues('riesdisanalisisform');
                    inhabilitarform("#riesdisanalisisform", false)
                    $("#btn_saveriesdis_analisis").show();
                    $("#btn_updateriesdis_analisis").hide();
                    $("#btn_newriesdis_analisis").hide();

                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;

                    $("#txtductoanalisisRiesDis").val(ducto_nombre);
                    $("#txttramoanalisisRiesDis").val(tramo_nombre);
                    $("#txtareaanalisisRiesDis").val(area_unitaria_nombre);
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });

}
var idAnalisisRiesDis;
function llenarDatosActualizacionAnalisisriesdis(data) {
    $("#btn_updateidentificacion").text('Actualizar');
    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== null) {
        const coords = data[0].coordenada_especifica.split(' ');
        $("#coord_esp_iden_x_ana_RiesDis").val(coords[0]);
        $("#coord_esp_iden_y_ana_RiesDis").val(coords[1]);
    }
    else {
        $("#coord_esp_iden_x_ana_RiesDis").val("");
        $("#coord_esp_iden_y_ana_RiesDis").val("");
    }
    $("#km_esp_iden_ana_RiesDis").val(data[0].kilometro_especifico);
    $("#riesdis_zona_riesgo").val(data[0].zona_riesgo);
    $("#riesdis_dependencia_determina").val(data[0].dependencia_determina);
    $("#riesdis_id_elementos_expuestos").val(data[0].id_elementos_expuestos);
    if (data[0].fecha!== "" && data[0].fecha!== null) {
        $("#riesdis_fecha").val(data[0].fecha.split(" ")[0]);
    }else{ $("#riesdis_fecha").val("");}
    
    $("#riesdis_clase_localizacion").val(data[0].clase_localizacion);
    $("#riesdis_estado_historico").val(data[0].estado_historico);
    $("#riesdis_estado_actual").val(data[0].estado_actual);
    $("#riesdis_id_riesgo").val(data[0].id_riesgo);
    $("#riesdis_a1").val(data[0].A1);
    $("#riesdis_a2").val(data[0].A2);
    $("#riesdis_a3").val(data[0].A3);
    $("#riesdis_a4").val(data[0].A4);
    $("#riesdis_a5").val(data[0].A5);
    $("#riesdis_a6").val(data[0].A6);
    $("#riesdis_a7").val(data[0].A7);
    $("#riesdis_a8").val(data[0].A8);
    $("#riesdis_a9").val(data[0].A9);
    $("#riesdis_a10").val(data[0].A10);
    $("#riesdis_a11").val(data[0].A11);
    $("#riesdis_a12").val(data[0].A12);

    idAnalisisRiesDis = data[0].id;
    inhabilitarform("#riesdisanalisisform", true);   
}
function updateAnalisisriesdis() {
    if ($("#btn_updateriesdis_analisis").text() === "Actualizar") {
        inhabilitarform("#riesdisanalisisform", false)
        $("#btn_updateriesdis_analisis").text('Guardar');
        showDestroyIcons('riesdisanalisisform', true);
    }
    else {
        var params = {
        };
        var webMethod = "";
        webMethod = "updateAnalisisRiesgoDisenio";
        var params = {
            id:idAnalisisRiesDis,
            C_0101_0001_id: area,
            coordenada_especifica: $("#coord_esp_iden_x_ana_RiesDis").val()+' '+$("#coord_esp_iden_y_ana_RiesDis").val(),
            kilometro_especifico: $("#km_esp_iden_ana_RiesDis").val(),
            zona_riesgo: $("#riesdis_zona_riesgo").val(),
            dependencia_determina: $("#riesdis_dependencia_determina").val(),
            id_elementos_expuestos: $("#riesdis_id_elementos_expuestos").val(),
            fecha: $("#riesdis_fecha").val(),
            clase_localizacion: $("#riesdis_clase_localizacion").val(),
            estado_historico: $("#riesdis_estado_historico").val(),
            estado_actual: $("#riesdis_estado_actual").val(),
            id_riesgo: $("#riesdis_id_riesgo").val(),
            A1: $("#riesdis_a1").val(),
            A2: $("#riesdis_a2").val(),
            A3: $("#riesdis_a3").val(),
            A4: $("#riesdis_a4").val(),
            A5: $("#riesdis_a5").val(),
            A6: $("#riesdis_a6").val(),
            A7: $("#riesdis_a7").val(),
            A8: $("#riesdis_a8").val(),
            A9: $("#riesdis_a9").val(),
            A10: $("#riesdis_a10").val(),
            A11: $("#riesdis_a11").val(),
            A12: $("#riesdis_a12").val()
        };
        var formData = new FormData();
        Object.keys(params).forEach(key => formData.append(key, params[key]));

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
                    $('#analisisforms').show();
                    $('#riesdisanalisisform').hide();
                    $("#btn_updateriesdis_analisis").text('Actualizar')
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }
}
function nuevoAnalisisriesdis() {

    $("#btn_saveriesdis_analisis").show();
    $("#btn_newriesdis_analisis").hide();
    $("#btn_updateriesdis_analisis").hide();
    clearInputTextValuesNew('riesdisanalisisform');
    inhabilitarform("#riesdisanalisisform", false);

}


//CAt Riesgos
function cancelotroRiesgoDis() {
    $("#espRiesgoDis").hide();
}
function saveotroRiesgoDis() {
    var webMethod = "saveTypeRiesgos";
    var params = {
        nombre: $("#newRiesgoDis").val(),
        descripcion: $("#newDescRiesgoDis").val()
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
                loadRiesgo();
                $("#espRiesgoDis").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotroRiesgo() {
    $('#espRiesgoDis').show();
}
function loadRiesgo() {
    var webMethod = "get_tiporiesgos";
    $.ajax({
        type: "GET",
        url: apiUrl + webMethod,
        success: function (data) {
            if (data.success) {
                console.log(data.data);
                $("#riesdis_id_riesgo").empty();
                $('#riesdis_id_riesgo').append($('<option>', {
                    value: 0,
                    text: 'Selecciona...'
                }));
                for (var i = 0; i < data.data.length; i++) {
                    $('#riesdis_id_riesgo').append($('<option>', {
                        value: data.data[i].id,
                        text: data.data[i].nombre
                    }));
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}

//Cat Elementos Expuestos
function cancelotroElemento() {
    $("#espElemento_Expuesto").hide();
}
function saveotroElemento() {
    var webMethod = "saveTypeElemento";
    var params = {
        nombre: $("#newElemento").val(),
        descripcion: $("#newDescElemento").val()
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
                loadElemento();
                $("#espElemento_Expuesto").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotroElemento() {
    $('#espElemento_Expuesto').show();
}
function loadElemento() {
    var webMethod = "get_tipoelemento";
    $.ajax({
        type: "GET",
        url: apiUrl + webMethod,
        success: function (data) {
            if (data.success) {
                console.log(data.data);
                $("#riesdis_id_elementos_expuestos").empty();
                $('#riesdis_id_elementos_expuestos').append($('<option>', {
                    value: 0,
                    text: 'Selecciona...'
                }));
                for (var i = 0; i < data.data.length; i++) {
                    $('#riesdis_id_elementos_expuestos').append($('<option>', {
                        value: data.data[i].id,
                        text: data.data[i].nombre
                    }));
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}

//#region Riesgos e incidentes
async function fnshowRiesgosIncidentes(id_d = null) {
    $('#riesgosincidentesanalisisform').show();
    $('#analisisforms').hide();
    try {
        await loadtiporiesgo();


        if (id_d) {
            await consultaDatosAnalisisRiesgosIncidentes(id_d = id_d);
        }
        else { consultaDatosAnalisisRiesgosIncidentes(); }

        // If you want to do something after all functions have completed, you can do it here

    } catch (error) {
        console.error("An error occurred:", error);
    }
    resetValidationClasses('riesgosincidentesanalisisform');
}
function loadtiporiesgo() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_tiporiesgo";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tiporiesgo_ri").empty();
                    $('#cmb_tiporiesgo_ri').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tiporiesgo_ri').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].nombre
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
var idAnalisisRiesgosIncidentes;
function consultaDatosAnalisisRiesgosIncidentes(id_d = null) {
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 15, "tbl_riesinci_analisis");
    var webMethod;
    var params;
    if (id_d) {
        webMethod = "getAnalisisRiesgosIncidentesById";
        params = {
            id: id_d
        };
    }

    else {

        webMethod = "get_AnalisisRiesgosIncidentes";
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
                var infodata;
                if (webMethod === "getAnalisisRiesgosIncidentesById")
                    infodata = (data.data);
                else if (webMethod === "get_AnalisisRiesgosIncidentes")
                    infodata = (data.data.datagrid);
                if (infodata.length > 0) {
                    if (webMethod === "getAnalisisRiesgosIncidentesById")
                        llenarDatosActualizacionAnalisisRiesgosIncidentes(infodata);
                    else if (webMethod === "get_AnalisisRiesgosIncidentes")
                        llenarDatosActualizacionAnalisisRiesgosIncidentes(infodata);
                    $("#btn_saveRiesgosIncidentes_analisis").hide();
                    $("#btn_updateRiesgosIncidentes_analisis").show();
                    $("#btn_newRiesgosIncidentes_analisis").show();
                    $("#btn_updateRiesgosIncidentes_analisis").text('Actualizar')
                }
                else {

                    clearInputTextValues('riesgosincidentesanalisisform');
                    inhabilitarform("#riesgosincidentesanalisisform", false)
                    $("#btn_saveRiesgosIncidentes_analisis").show();
                    $("#btn_updateRiesgosIncidentes_analisis").hide();
                    $("#btn_newRiesgosIncidentes_analisis").hide();

                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;

                    $("#txtductogeogenera_ri").val(ducto_nombre);
                    $("#txttramogeogeneral_ri").val(tramo_nombre);
                    $("#txtareageogeneral_ri").val(area_unitaria_nombre);
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });


}
function llenarDatosActualizacionAnalisisRiesgosIncidentes(data) {
    $("#btn_updateRiesgosIncidentes_analisis").text('Actualizar');
    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== null) {
        const coords = data[0].coordenada_especifica.split(' ');
        $("#coord_esp_iden_x_ri").val(coords[0]);
        $("#coord_esp_iden_y_ri").val(coords[1]);
    }
    else {
        $("#coord_esp_iden_x_ri").val("");
        $("#coord_esp_iden_y_ri").val("");
    }
    $("#km_esp_iden_ri").val(data[0].kilometro_especifico);
    $("#cmb_tiporiesgo_ri option:contains(" + data[0].tiporiesgo + ")").attr('selected', 'selected');
    $("#fecha_ri").val(data[0].fecha.split(" ")[0]);
    $("#horaocurrenciaevento_ri").val(data[0].hora_ocurrencia_evento);
    $("#horacontrolevento_ri").val(data[0].hora_control_evento);
    $("#poblado_ri").val(data[0].poblado);
    $("#municipio_ri").val(data[0].municipio);
    $("#estado_ri").val(data[0].estado);
   // $("#causaaccidente_ri").val(data[0].causa_accidente);
    $("#causaaccidente_ri option:contains(" + data[0].causa_accidente + ")").attr('selected', 'selected');
    $("#causaconstruccion_ri option:contains(" + data[0].causa_construccion + ")").attr('selected', 'selected');
    //$("#causaconstruccion_ri").val(data[0].causa_construccion);
    $("#numlesionados_ri").val(data[0].numero_lesionado);
    $("#tipoevento_ri").val(data[0].tipo_evento);
    $("#horafinalreparacion_ri").val(data[0].hora_final_reparacion);
    //$("#exposicion_ri").val(data[0].exposicion);
    $("#exposicion_ri option:contains(" + data[0].exposicion + ")").attr('selected', 'selected');
    $("#alturamaxexposicion_ri").val(data[0].altura_max_exposicion);
    $("#distanciaaguasabajo_ri").val(data[0].distancia_aguas_abajo);
    $("#observacion_ri").val(data[0].observacion);
    idAnalisisRiesgosIncidentes = data[0].id;
    inhabilitarform("#riesgosincidentesanalisisform", true);
}
function saveAnalisisRiesgosIncidentes() {
    var webMethod = "saveAnalisisRiesgosIncidentes";

    var params = {
        C_0101_0001_id: area,
        id_tipo_riesgo: $("#cmb_tiporiesgo_ri").val(),
        fecha: $('#fecha_ri').val(),
        hora_ocurrencia_evento: $('#horaocurrenciaevento_ri').val(),
        hora_control_evento: $("#horacontrolevento_ri").val(),
        poblado: $("#poblado_ri").val(),
        municipio: $("#municipio_ri").val(),
        estado: $("#estado_ri").val(),
        causa_accidente: $("#causaaccidente_ri").val(),
        causa_construccion: $("#causaconstruccion_ri").val(),
        numero_lesionado: $("#numlesionados_ri").val(),
        tipo_evento: $("#tipoevento_ri").val(),
        hora_final_reparacion: $("#horafinalreparacion_ri").val(),
        exposicion: $("#exposicion_ri").val(),
        altura_max_exposicion: $("#alturamaxexposicion_ri").val(),
        distancia_aguas_abajo: $("#distanciaaguasabajo_ri").val(),
        observacion: $("#observacion_ri").val(),
        coordenada_especifica: $("#coord_esp_iden_x_ri").val() + ' ' + $("#coord_esp_iden_y_ri").val(),
        kilometro_especifico: $("#km_esp_iden_ri").val()
    };
    var formData = new FormData();
    Object.keys(params).forEach(key => formData.append(key, params[key]));


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
                $('#analisisforms').show();
                $('#riesgosincidentesanalisisform').hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function updateAnalisisRiesgosIncidentes() {
    if ($("#btn_updateRiesgosIncidentes_analisis").text() === "Actualizar") {
        inhabilitarform("#riesgosincidentesanalisisform", false)
        $("#btn_updateRiesgosIncidentes_analisis").text('Guardar');
        showDestroyIcons('riesgosincidentesanalisisform', true);
    }
    else {
        var params = {
        };
        var webMethod = "";
        webMethod = "updateAnalisisRiesgosIncidentes";
        params = {
            id: idAnalisisRiesgosIncidentes,
            C_0101_0001_id: area,
            id_tipo_riesgo: $("#cmb_tiporiesgo_ri").val(),
            fecha: $('#fecha_ri').val(),
            hora_ocurrencia_evento: $('#horaocurrenciaevento_ri').val(),
            hora_control_evento: $("#horacontrolevento_ri").val(),
            poblado: $("#poblado_ri").val(),
            municipio: $("#municipio_ri").val(),
            estado: $("#estado_ri").val(),
            causa_accidente: $("#causaaccidente_ri").val(),
            causa_construccion: $("#causaconstruccion_ri").val(),
            numero_lesionado: $("#numlesionados_ri").val(),
            tipo_evento: $("#tipoevento_ri").val(),
            hora_final_reparacion: $("#horafinalreparacion_ri").val(),
            exposicion: $("#exposicion_ri").val(),
            altura_max_exposicion: $("#alturamaxexposicion_ri").val(),
            distancia_aguas_abajo: $("#distanciaaguasabajo_ri").val(),
            observacion: $("#observacion_ri").val(),
            coordenada_especifica: $("#coord_esp_iden_x_ri").val() + ' ' + $("#coord_esp_iden_y_ri").val(),
            kilometro_especifico: $("#km_esp_iden_ri").val()
        };
        var formData = new FormData();
        Object.keys(params).forEach(key => formData.append(key, params[key]));

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
                    $('#analisisforms').show();
                    $('#riesgosincidentesanalisisform').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }
}
function cancelAnalisisRiesgosIncidentes() {
    $('#analisisforms').show();
    $('#riesgosincidentesanalisisform').hide();
}
function nuevoAnalisisRiesgoIncidentes() {

    $("#btn_saveRiesgosIncidentes_analisis").show();
    $("#btn_newRiesgosIncidentes_analisis").hide();
    $("#btn_updateRiesgosIncidentes_analisis").hide();
    clearInputTextValuesNew('riesgosincidentesanalisisform');
    inhabilitarform("#riesgosincidentesanalisisform", false);

}
function saveotroRiesgo() {
    var webMethod = "saveTypeRiesgo";
    var params = {
        nombre: $("#newTipoRiesgo").val(),
        descripcion: $("#newDescRiesgo").val()
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
                loadtiporiesgo();
                $("#espTipoRiesgo").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function espRiesgo() {
    $('#espTipoRiesgo').show();
}
function cancelotroRiesgo() {
    $("#espTipoRiesgo").hide();
}
//#endregion Riesgos e incidentes

//#region Analisis de Ingeniería
async function fnshowAnalisisIngenieria(id_d = null) {
    $('#ingenieriaanalisisform').show();
    $('#analisisforms').hide();
    try {
        await loadtiporegulacion();
        await loadgradoacero();
        await loadtecnicasoldadura();
        await loadmaterial();
        await loadsegmento();
        if (id_d) {
            await consultaDatosAnalisisIngenieria(id_d = id_d);
        }
        else { consultaDatosAnalisisIngenieria(); }

        // If you want to do something after all functions have completed, you can do it here

    } catch (error) {
        console.error("An error occurred:", error);
    }
    resetValidationClasses('ingenieriaanalisisform');
}
function loadtiporegulacion() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_tiporegulacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tiporegulacion_di").empty();
                    $('#cmb_tiporegulacion_di').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tiporegulacion_di').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].nombre
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
function loadgradoacero() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_gradoacero";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_gradoacero_di").empty();
                    $('#cmb_gradoacero_di').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_gradoacero_di').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].nombre
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
function loadtecnicasoldadura() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_TecnicaSoldadura";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tecnicasoldadura_di").empty();
                    $('#cmb_tecnicasoldadura_di').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tecnicasoldadura_di').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].nombre
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
function loadmaterial() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_MaterialIngenieria";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_Material_di").empty();
                    $('#cmb_Material_di').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_Material_di').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].nombre
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
function loadsegmento() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_SegmentoIngenieria";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tiposeging_di").empty();
                    $('#cmb_tiposeging_di').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tiposeging_di').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].nombre
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
var idAnalisisIngenieria;
function consultaDatosAnalisisIngenieria(id_d = null) {
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 16, "tbl_inge_analisis");
    var webMethod;
    var params;
    if (id_d) {
        webMethod = "getAnalisisIngenieriaById";
        params = {
            id: id_d
        };
    }

    else {

        webMethod = "get_AnalisisIngenieria";
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
                var infodata;
                if (webMethod === "getAnalisisIngenieriaById")
                    infodata = (data.data);
                else if (webMethod === "get_AnalisisIngenieria")
                    infodata = (data.data.datagrid);
                if (infodata.length > 0) {
                    if (webMethod === "getAnalisisIngenieriaById")
                        llenarDatosActualizacionAnalisisIngenieria(infodata);
                    else if (webMethod === "get_AnalisisIngenieria")
                        llenarDatosActualizacionAnalisisIngenieria(infodata);
                    $("#btn_saveIngenieria_analisis").hide();
                    $("#btn_updateIngenieria_analisis").show();
                    $("#btn_newIngenieria_analisis").show();
                    $("#btn_updateIngenieria_analisis").text('Actualizar')
                }
                else {

                    clearInputTextValues('ingenieriaanalisisform');
                    inhabilitarform("#ingenieriaanalisisform", false)
                    $("#btn_saveIngenieria_analisis").show();
                    $("#btn_updateIngenieria_analisis").hide();
                    $("#btn_newIngenieria_analisis").hide();

                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;

                    $("#txtductogeogenera_di").val(ducto_nombre);
                    $("#txttramogeogeneral_di").val(tramo_nombre);
                    $("#txtareageogeneral_di").val(area_unitaria_nombre);
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });


}
function llenarDatosActualizacionAnalisisIngenieria(data) {
    $("#btn_updateRiesgosIncidentes_analisis").text('Actualizar');
    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== null) {
        const coords = data[0].coordenada_especifica.split(' ');
        $("#coord_esp_iden_x_di").val(coords[0]);
        $("#coord_esp_iden_y_di").val(coords[1]);
    }
    else {
        $("#coord_esp_iden_x_di").val("");
        $("#coord_esp_iden_y_di").val("");
    }
    $("#km_esp_iden_di").val(data[0].kilometro_especifico);
    $("#cmb_tiporegulacion_di option:contains(" + data[0].tiporegulacion + ")").attr('selected', 'selected');
    $("#cmb_gradoacero_di option:contains(" + data[0].gradoacero + ")").attr('selected', 'selected');
    $("#cmb_tecnicasoldadura_di option:contains(" + data[0].tecnicasoldadura + ")").attr('selected', 'selected');
    $("#cmb_Material_di option:contains(" + data[0].materialingenieria + ")").attr('selected', 'selected');
    $("#cmb_tiposeging_di option:contains(" + data[0].segmentoingeneria + ")").attr('selected', 'selected');    
    $("#fecha_inicio_servicio_di").val(data[0].fecha_inicio_servicio.split(" ")[0]);
    $("#fecha_instalacion_di").val(data[0].fecha_instalacion.split(" ")[0]);
    $("#cmbdecisionestuberiaaisladora option:contains(" + data[0].es_tuberia_portadora + ")").attr('selected', 'selected');
    $("#cmbdecisionesinspeccionenlinea option:contains(" + data[0].puede_inspeccion_linea + ")").attr('selected', 'selected');
    $("#cmbdecisionestuberiasolopuedeserinspeccionada option:contains(" + data[0].puede_inspeccion_raspaduras + ")").attr('selected', 'selected');
    $("#fecha_fabricacion_di").val(data[0].fecha_fabricacion.split(" ")[0]);
    if (data[0].feha_fabricacion_final !== "" && data[0].feha_fabricacion_final !== null) {
        $("#fecha_fabricacion_final_di").val(data[0].feha_fabricacion_final.split(" ")[0]);
    }
    $("#ciudadmolino_di").val(data[0].ciudad_molino_construccion);
    $("#diam_nom_di").val(data[0].diametro_nominal);
    $("#cmbdecisionestuberiaoriginal option:contains(" + data[0].es_tuberia_original + ")").attr('selected', 'selected');
    $("#lim_elas_di").val(data[0].limite_elastico_minimo);
    $("#esp_dis_di").val(data[0].especificacion_disenio);
    $("#cri_cons_di").val(data[0].criterios_construccion);
    $("#edo_his_di").val(data[0].estado_historico);
    $("#edo_act_di").val(data[0].estado_actual);
    idAnalisisIngenieria = data[0].id;
    inhabilitarform("#ingenieriaanalisisform", true);
}
function saveAnalisisIngenieria() {
    var webMethod = "saveAnalisisIngenieria";

    var params = {
        C_0101_0001_id: area,
        id_tipo_regulacion: $("#cmb_tiporegulacion_di").val(),
        id_grado_acero: $("#cmb_gradoacero_di").val(),
        fecha_inicio_servicio: $('#fecha_inicio_servicio_di').val(),
        fecha_instalacion: $('#fecha_instalacion_di').val(),
        es_tuberia_portadora: $('#cmbdecisionestuberiaaisladora').val(),
        puede_inspeccion_linea: $("#cmbdecisionesinspeccionenlinea").val(),
        puede_inspeccion_raspaduras: $("#cmbdecisionestuberiasolopuedeserinspeccionada").val(),
        id_tecnica_soldadura: $("#cmb_tecnicasoldadura_di").val(),
        fecha_fabricacion: $("#fecha_fabricacion_di").val(),
        feha_fabricacion_final: $("#fecha_fabricacion_final_di").val(),
        id_material: $("#cmb_Material_di").val(),
        ciudad_molino_construccion: $("#ciudadmolino_di").val(),
        diametro_nominal: $("#diam_nom_di").val(),
        es_tuberia_original: $("#cmbdecisionestuberiaoriginal").val(),
        id_tipo_segmento: $("#cmb_tiposeging_di").val(),
        limite_elastico_minimo: $("#lim_elas_di").val(),
        especificacion_disenio: $("#esp_dis_di").val(),
        criterios_construccion: $("#cri_cons_di").val(),
        estado_historico: $("#edo_his_di").val(),
        estado_actual: $("#edo_act_di").val(),
        coordenada_especifica: $("#coord_esp_iden_x_di").val() + ' ' + $("#coord_esp_iden_y_di").val(),
        kilometro_especifico: $("#km_esp_iden_di").val()
    };
    var formData = new FormData();
    Object.keys(params).forEach(key => formData.append(key, params[key]));


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
                $('#analisisforms').show();
                $('#ingenieriaanalisisform').hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function updateAnalisisIngenieria() {


    if ($("#btn_updateIngenieria_analisis").text() === "Actualizar") {
        inhabilitarform("#ingenieriaanalisisform", false)
        $("#btn_updateIngenieria_analisis").text('Guardar');
        showDestroyIcons('riesgosincidentesanalisisform', true);
    }
    else {
        var params = {
        };
        var webMethod = "";
        webMethod = "updateAnalisisIngenieria";
        params = {
            id: idAnalisisIngenieria,
            C_0101_0001_id: area,
            id_tipo_regulacion: $("#cmb_tiporegulacion_di").val(),
            id_grado_acero: $("#cmb_gradoacero_di").val(),
            fecha_inicio_servicio: $('#fecha_inicio_servicio_di').val(),
            fecha_instalacion: $('#fecha_instalacion_di').val(),
            es_tuberia_portadora: $('#cmbdecisionestuberiaaisladora').val(),
            puede_inspeccion_linea: $("#cmbdecisionesinspeccionenlinea").val(),
            puede_inspeccion_raspaduras: $("#cmbdecisionestuberiasolopuedeserinspeccionada").val(),
            id_tecnica_soldadura: $("#cmb_tecnicasoldadura_di").val(),
            fecha_fabricacion: $("#fecha_fabricacion_di").val(),
            feha_fabricacion_final: $("#fecha_fabricacion_final_di").val(),
            id_material: $("#cmb_Material_di").val(),
            ciudad_molino_construccion: $("#ciudadmolino_di").val(),
            diametro_nominal: $("#diam_nom_di").val(),
            es_tuberia_original: $("#cmbdecisionestuberiaoriginal").val(),
            id_tipo_segmento: $("#cmb_tiposeging_di").val(),
            limite_elastico_minimo: $("#lim_elas_di").val(),
            especificacion_disenio: $("#esp_dis_di").val(),
            criterios_construccion: $("#cri_cons_di").val(),
            estado_historico: $("#edo_his_di").val(),
            estado_actual: $("#edo_act_di").val(),
            coordenada_especifica: $("#coord_esp_iden_x_di").val() + ' ' + $("#coord_esp_iden_y_di").val(),
            kilometro_especifico: $("#km_esp_iden_di").val()
        };
        var formData = new FormData();
        Object.keys(params).forEach(key => formData.append(key, params[key]));

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
                    $('#analisisforms').show();
                    $('#ingenieriaanalisisform').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }
}
function cancelAnalisisIngenieria() {
    $('#analisisforms').show();
    $('#ingenieriaanalisisform').hide();
}
function nuevoAnalisisRiesgoIngenieria() {

    $("#btn_saveIngenieria_analisis").show();
    $("#btn_newIngenieria_analisis").hide();
    $("#btn_updateIngenieria_analisis").hide();
    clearInputTextValuesNew('ingenieriaanalisisform');
    inhabilitarform("#ingenieriaanalisisform", false);

}
function saveotroRegulacion() {
    var webMethod = "saveTypeRegulacion";
    var params = {
        nombre: $("#newTipoRegulacion").val(),
        descripcion: $("#newDescRegulacion").val()
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
                loadtiporegulacion();
                $("#espregulacion").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function espRegulacion() {
    $('#espregulacion').show();
}
function cancelotroRegulacion() {
    $("#espregulacion").hide();
}
function saveotroAcero() {
    var webMethod = "saveGradoAcero";
    var params = {
        nombre: $("#newGradoAcero").val(),
        descripcion: $("#newDescGradoAcero").val()
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
                loadgradoacero();
                $("#espGradoAcero").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function espGracoAcero() {
    $('#espGradoAcero').show();
}
function cancelotroGradoAcero() {
    $("#espGradoAcero").hide();
}
function saveotrotecnicasoldadura() {
    var webMethod = "saveTecnicaSoldadura";
    var params = {
        nombre: $("#newtecnicasoldadura").val(),
        descripcion: $("#newDesctecnicasoldadura").val()
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
                loadtecnicasoldadura();
                $("#esptecnicasoldadura").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function esptecsoldadura() {
    $('#esptecnicasoldadura').show();
}
function cancelotroTecnicaSoldadura() {
    $("#esptecnicasoldadura").hide();te
}
function saveotromaterialing() {
    var webMethod = "saveMaterialIngenieria";
    var params = {
        nombre: $("#newmaterialing").val(),
        descripcion: $("#newDescmaterialing").val()
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
                loadmaterial();
                $("#espmaterialing").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function espmaterialing() {
    $('#espmaterialing').show();
}
function cancelotromaterialing() {
    $("#espmaterialing").hide(); te
}
function saveotromsegmentoing() {
    var webMethod = "saveSegmentoIngenieria";
    var params = {
        nombre: $("#newmtiposegmento").val(),
        descripcion: $("#newDesctiposegmento").val()
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
                loadsegmento();
                $("#esptiposegmento").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function espsegmento() {
    $('#esptiposegmento').show();
}
function cancelotrosegmento() {
    $("#esptiposegmento").hide(); 
}
//#endregion Analsis de Ingenieria


//#endregion 

//#region Carga Documental
function fnshowdocument() {
    document.getElementById('registro').style.display = 'none';
    $("#documentalfrm").show();
    loadTramosDocuments();

}
function cancelDocumental_() {
    document.getElementById('registro').style.display = '';
    $("#documentalfrm").hide();

}
function loadTramosDocuments() {

   
    //$("#cmbtramosdoc option:not(:first)").remove();
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
                var selector = document.getElementsByName('cmbtramosdoc');
                element = $(selector);
                element.empty();
                element.append($('<option>', {
                    value: 0,
                    text: 'Selecciona...'
                }));
                for (var i = 0; i < data.length; i++) {
                    element.append($('<option>', {
                        value: data[i].id,
                        text: data[i].nombre
                    }));
                }
            })
            .catch(error => console.error("Error fetching data: ", error));
    }

}
function loadAreaDocument() {
    $("#areasdocuments option:not(:first)").remove();
    var selector = document.getElementsByName('cmbtramosdoc');
    element = $(selector);
    var property = element.val();
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

                $("#areasdocuments").empty();
                //$('#areasdocuments').append($('<option>', {
                //    value: 0,
                //    text: 'Selecciona...'
                //}));
                for (var i = 0; i < data.length; i++) {
                    $('#areasdocuments').append($('<option>', {
                        value: data[i].id,
                        text: data[i].nombre
                    }));
                }
            })
            .catch(error => console.error("Error fetching data: ", error));
    }
}
function savedocumentoreferenciado() {    
    var webMethod = "createDocumento";
    const formData = new FormData();
    var areas = [];
    $("#areasdocuments option:selected").each(function (i) {
        areas.push($(this).val());
    });
    if (areas.length <= 0) {
        var selector = document.getElementsByName('cmbtramosdoc');
        element = $(selector);
        formData.append("tramo_id", element.val());
    }
    formData.append('file', $("#inputfiledocument")[0].files[0]);
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
                saveDocumentAreasForms(data.datos.id);
               // alert("Información almacenada correctamente");
               
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function saveDocumentAreasForms(idDoc) {

    var webMethod = "GuardarDocumentoArea";
    const formData = new FormData();
    var forms = [];
    $('#lstforms').find('input:checked').each(function () {
        forms.push($(this)[0].value);
    });
    var areas = [];
    $("#areasdocuments option:selected").each(function (i) {
        areas.push($(this).val());
    });
    areas.forEach((area) => {
        formData.append("area_id[]", area);
    });
    forms.forEach((form) => {
        formData.append("form_id[]", form);
    });
    formData.append("documentos_id", idDoc);
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
                //console.log(data.datos.id);
                alert("Información almacenada correctamente");

            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function get_relateddocuments(tramo_id,area_id,form_id,table) {
    var webMethod = "getDocumento";
    const formData = new FormData();
    formData.append("tramo_id", tramo_id);
    formData.append("area_id", area_id);
    formData.append("form_id", form_id);
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
                $('#'+table+' tbody')[0].innerHTML = "";
                $('#' + table +' tbody:not(:first)').remove();
                for (i = 0; i < data.data.datagrid.length; i++) {
                    var persona = [data.data.datagrid[i].id, data.data.datagrid[i].nombre];
                    llenarTablasdocuments(persona, table);
              }
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function llenarTablasdocuments(obj, nameTabla) {



    //var category = obj.pop();
    // Assuming 4th column determines category
    var row = '<tr class="content-row">';
    for (var j = 0; j < obj.length; j++) {
        if (j === 0) {
            row = row + '<td style="text-align: center;color:green;"><a class="download-icon" target="_blank" href="' + apiUrl + 'documentos/' + obj[j] + '/download/"' +' title="Descargar"><i  class="fa fa-download"></i></a> </td>';
        }
       else{
             row = row + '<td>' + obj[j] + '</td>';
       }
    }
    //row = row + '<td><a class="add" title="Guardar" data-toggle="tooltip" id="ra' + obj[0] + '" data-id="' + obj[0] + '"><i class="fa fa-floppy-disk"></i></a> &nbsp;&nbsp;<a class="edit" title="Editar" data-toggle="tooltip" id="re' + obj[0] + '" data-id="' + obj[0] + '"><i class="fa fa-pen"></i></a>&nbsp;&nbsp;<a class="delete" title="Eliminar" data-toggle="tooltip" data-id="' + obj[0] + '"><i class="fa fa-trash"></i></a></td>';
    row = row + '</tr>';
  $('#' + nameTabla).append(row);
}
//#endregion






//#region Historail de Fugas 
function fnsshowOperacionforms() {
    $('#operacionforms').show();
    $('#forms').hide();
}
async function fnshowOperacionHistorialFugas(id_d = null) {
    $('#historialfugasderramesoperacionfrm').show();
    $('#operacionforms').hide();
    try {
        await loadtipohisfugasOp();
        await loadtipoeventohisfugasOp();
        await loadtiporecuperacionhisfugasOp();
        if (id_d) {
            await consultaDatosHistFugOperacion(id_d = id_d);
        }
        else {
            consultaDatosHistFugOperacion();
        }

        //// If you want to do something after all functions have completed, you can do it here

    } catch (error) {
        console.error("An error occurred:", error);
    }
   // resetValidationClasses('planosanalisisform');
}
function loadtipohisfugasOp() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_histfugtipoOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipohisfug").empty();
                    $('#cmb_tipohisfug').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipohisfug').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0406_218
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
function loadtipoeventohisfugasOp() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_histfugtipoeventoOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipoeventohisfug").empty();
                    $('#cmb_tipoeventohisfug').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipoeventohisfug').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0406_219
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
function loadtiporecuperacionhisfugasOp() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_histfugtiporeparacionOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tiporeparacionhisfug").empty();
                    $('#cmb_tiporeparacionhisfug').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tiporeparacionhisfug').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0406_225
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
function showotrotipohistfugasOp() {
    $('#espTipohisfug').show();
}

function cancelotroTipoHisFugOp() {
    $("#espTipohisfug").hide();
}
function saveotroTipoHisFugaOp() {
    var webMethod = "savehistfugtipoOperacion";
    var params = {
        C_0406_218: $("#newTipohisfug").val(),
        descripcion: $("#newDeschisfug").val()
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
                loadtipohisfugasOp();
                $("#espTipohisfug").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrotipoeventohistfugasOp() {
    $('#esptipoeventohisfug').show();
}

function cancelotroTipoeventoHisFugOp() {
    $("#esptipoeventohisfug").hide();
}
function saveotroTipoeventoHisFugaOp() {
    var webMethod = "savehistfugtipoeventoOperacion";
    var params = {
        C_0406_219: $("#newTipoEventohisfug").val(),
        descripcion: $("#newDescTipoEventohisfug").val()
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
                loadtipoeventohisfugasOp();
                $("#esptipoeventohisfug").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrotiporeparacionhistfugasOp() {
    $('#espTiporeparacionhisfug').show();
}

function cancelotroTiporeparacionHisFugOp() {
    $("#espTiporeparacionhisfug").hide();
}
function saveotroTiporeparacionHisFugaOp() {
    var webMethod = "savehistfugtiporeparacionOperacion";
    var params = {
        C_0406_225: $("#newTiporeparacionhisfug").val(),
        descripcion: $("#newDescreparacionhisfug").val()
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
                loadtiporecuperacionhisfugasOp();
                $("#espTiporeparacionhisfug").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function savehistfugOp() {
    var webMethod = "saveHistorialFugas";

    var params = {
        C_0101_0001_id: area,
        C_0406_214: $("#txtresidenciahisfug").val(),
        C_0406_215: $('#txtpobladohisfug').val(),
        C_0406_216: $('#txtmunicipiohisfug').val(),
        C_0406_217: $("#txtestadohisfug").val(),
        id_C_0406_218: $("#cmb_tipohisfug").val(),
        id_C_0406_219: $("#cmb_tipoeventohisfug").val(),
        C_0406_220: $("#fec_hisfug").val(),
        C_0406_221: $("#txthoraocurrenciahisfug").val(),
        C_0406_222: $("#txthorariofinalhisfug").val(),
        C_0406_223: $("#txthoractrlhisfug").val(),
        C_0406_224: $("#txtarregloconthisfug").val(),
        id_C_0406_225: $("#cmb_tiporeparacionhisfug").val(),
        C_0406_226: $("#txtobservacioneshisfug").val(),
        C_0406_227: $("#txtoficioaseahisfug").val(),
        C_0406_228: $("#txtreportesiniestrohisfug").val(),
        C_0406_229: $("#txtnosiniestrohisfug").val(),
        C_0406_230: $("#txtnohisfug").val(),
        C_0406_231: $("#txtevento_hisfug").val(),
        coordenada_especifica: $("#coord_esp_hisfug_x").val() + ' ' + $("#coord_esp_hisfug_y").val(),
        kilometro_especifico: $("#km_esp_hisfug").val()
    };
    var formData = new FormData();
    Object.keys(params).forEach(key => formData.append(key, params[key]));


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
                $('#operacionforms').show();
                $('#historialfugasderramesoperacionfrm').hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function updateOperacionHistFugOp() {


    if ($("#btn_updateHisFug_operacion").text() === "Actualizar") {
        inhabilitarform("#historialfugasderramesoperacionfrm", false)
        $("#btn_updateHisFug_operacion").text('Guardar');
        showDestroyIcons('historialfugasderramesoperacionfrm', true);
    }
    else {
        var params = {
        };
        var webMethod = "";
        webMethod = "updateOperacionHistorialFugas";
        params = {
            id: idHistFugOp,
            C_0101_0001_id: area,
            C_0406_214: $("#txtresidenciahisfug").val(),
            C_0406_215: $('#txtpobladohisfug').val(),
            C_0406_216: $('#txtmunicipiohisfug').val(),
            C_0406_217: $("#txtestadohisfug").val(),
            id_C_0406_218: $("#cmb_tipohisfug").val(),
            id_C_0406_219: $("#cmb_tipoeventohisfug").val(),
            C_0406_220: $("#fec_hisfug").val(),
            C_0406_221: $("#txthoraocurrenciahisfug").val(),
            C_0406_222: $("#txthorariofinalhisfug").val(),
            C_0406_223: $("#txthoractrlhisfug").val(),
            C_0406_224: $("#txtarregloconthisfug").val(),
            id_C_0406_225: $("#cmb_tiporeparacionhisfug").val(),
            C_0406_226: $("#txtobservacioneshisfug").val(),
            C_0406_227: $("#txtoficioaseahisfug").val(),
            C_0406_228: $("#txtreportesiniestrohisfug").val(),
            C_0406_229: $("#txtnosiniestrohisfug").val(),
            C_0406_230: $("#txtnohisfug").val(),
            C_0406_231: $("#txtevento_hisfug").val(),
            coordenada_especifica: $("#coord_esp_hisfug_x").val() + ' ' + $("#coord_esp_hisfug_y").val(),
            kilometro_especifico: $("#km_esp_hisfug").val()
        };
        var formData = new FormData();
        Object.keys(params).forEach(key => formData.append(key, params[key]));

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
                    $('#operacionforms').show();
                    $('#historialfugasderramesoperacionfrm').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }
}
function cancelOperacionHisFugas() {
    $('#operacionforms').show();
    $('#historialfugasderramesoperacionfrm').hide();
}
function cancelOperacioMonitoreo() {
    $('#operacionforms').show();
    $('#monitoreocorrosionoperacionfrm').hide();
}
function consultaDatosHistFugOperacion(id_d = null) {
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 21, "tbl_histfug_operacion");
    var webMethod;
    var params;
    if (id_d) {
        webMethod = "getOperacionHisFugaById";
        params = {
            id: id_d
        };
    }

    else {

        webMethod = "get_OperacionHistorialFugas";
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
                var infodata;
                if (webMethod === "getOperacionHisFugaById")
                    infodata = (data.data);
                else if (webMethod === "get_OperacionHistorialFugas")
                    infodata = (data.data.datagrid);
                if (infodata.length > 0) {
                    if (webMethod === "getOperacionHisFugaById")
                        llenarDatosHisFugOp(infodata);
                    else if (webMethod === "get_OperacionHistorialFugas")
                        llenarDatosHisFugOp(infodata);
                    $("#btn_saveHisFug_operacion").hide();
                    $("#btn_updateHisFug_operacion").show();
                    $("#btn_newHisFug_operacion").show();
                }
                else {

                    clearInputTextValues('historialfugasderramesoperacionfrm');
                    inhabilitarform("#historialfugasderramesoperacionfrm", false)
                    $("#btn_saveHisFug_operacion").show();
                    $("#btn_updateHisFug_operacion").hide();

                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;

                    $("#txtductohisfug").val(ducto_nombre);
                    $("#txttramohisfug").val(tramo_nombre);
                    $("#txtareahisfug").val(area_unitaria_nombre);
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });


}
var idHistFugOp;
function llenarDatosHisFugOp(data) {

    $("#btn_updateHisFug_operacion").text('Actualizar');
    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== null) {
        const coords = data[0].coordenada_especifica.split(' ');
        $("#coord_esp_hisfug_x").val(coords[0]);
        $("#coord_esp_hisfug_y").val(coords[1]);
    }
    else {
        $("#coord_esp_hisfug_x").val("");
        $("#coord_esp_hisfug_y").val("");
    }
    $("#km_esp_hisfug").val(data[0].kilometro_especifico);
    $("#txtresidenciahisfug").val(data[0].C_0406_214);
    $("#txtpobladohisfug").val(data[0].C_0406_215);
    $("#txtmunicipiohisfug").val(data[0].C_0406_216);
    $("#txtestadohisfug").val(data[0].C_0406_217);
    $("#cmb_tipohisfug option:contains(" + data[0].C_0406_218 + ")").attr('selected', 'selected');
    $("#cmb_tipoeventohisfug option:contains(" + data[0].C_0406_219 + ")").attr('selected', 'selected');
    $("#fec_hisfug").val(data[0].C_0406_220.split(' ')[0]);
    $("#txthoraocurrenciahisfug").val(data[0].C_0406_221);
    $("#txthorariofinalhisfug").val(data[0].C_0406_222);
    $("#txthoractrlhisfug").val(data[0].C_0406_223);
    $("#txtarregloconthisfug").val(data[0].C_0406_224);
    $("#cmb_tiporeparacionhisfug option:contains(" + data[0].C_0406_225 + ")").attr('selected', 'selected');
    $("#txtobservacioneshisfug").val(data[0].C_0406_226);
    $("#txtoficioaseahisfug").val(data[0].C_0406_227);
    $("#txtreportesiniestrohisfug").val(data[0].C_0406_228);
    $("#txtnosiniestrohisfug").val(data[0].C_0406_229);
    $("#txtnohisfug").val(data[0].C_0406_231);
    $("#txtevento_hisfug").val(data[0].C_0210_0033);
    idHistFugOp = data[0].id;
    inhabilitarform("#historialfugasderramesoperacionfrm", true);
}
function nuevoOperacionHistFugas() {

    $("#btn_saveHisFug_operacion").show();
    $("#btn_newHisFug_operacion").hide();
    $("#btn_updateHisFug_operacion").hide();
    clearInputTextValuesNew('historialfugasderramesoperacionfrm');
    inhabilitarform("#historialfugasderramesoperacionfrm", false);

}
//#endregion



//#region Monitoreo de Corrosión
function nuevoOperacionMonitoreo() {

    $("#btn_saveMonitoreoCorrosion_operacion").show();
    $("#btn_newMonitoreoCorrosion_operacion").hide();
    $("#btn_updateMonitoreoCorrosion_operacion").hide();
    clearInputTextValuesNew('monitoreocorrosionoperacionfrm');
    inhabilitarform("#monitoreocorrosionoperacionfrm", false);

}
async function fnshowOperacionMonitoreoCorrosion(id_d = null) {
    $('#monitoreocorrosionoperacionfrm').show();
    $('#operacionforms').hide();
    try {
        if (id_d) {
            await consultaDatosMonitoreoCorrosionOperacion(id_d = id_d);
        }
        else {
            consultaDatosMonitoreoCorrosionOperacion();
        }

        //// If you want to do something after all functions have completed, you can do it here

    } catch (error) {
        console.error("An error occurred:", error);
    }
    // resetValidationClasses('planosanalisisform');
}
function consultaDatosMonitoreoCorrosionOperacion(id_d = null) {
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 22, "tbl_moncorr_operacion");
    var webMethod;
    var params;
    if (id_d) {
        webMethod = "getOperacionMonitoreoCorrosionById";
        params = {
            id: id_d
        };
    }

    else {

        webMethod = "get_OperacionMonitoreoCorrosion";
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
                var infodata;
                if (webMethod === "getOperacionMonitoreoCorrosionById")
                    infodata = (data.data);
                else if (webMethod === "get_OperacionMonitoreoCorrosion")
                    infodata = (data.data.datagrid);
                if (infodata.length > 0) {
                    if (webMethod === "getOperacionMonitoreoCorrosionById")
                        llenarDatosMonitoreoCorrosion(infodata);
                    else if (webMethod === "get_OperacionMonitoreoCorrosion")
                        llenarDatosMonitoreoCorrosion(infodata);
                    $("#btn_saveMonitoreoCorrosion_operacion").hide();
                    $("#btn_updateMonitoreoCorrosion_operacion").show();
                    $("#btn_newMonitoreoCorrosion_operacion").show();
                }
                else {

                    clearInputTextValues('monitoreocorrosionoperacionfrm');
                    inhabilitarform("#monitoreocorrosionoperacionfrm", false)
                    $("#btn_saveMonitoreoCorrosion_operacion").show();
                    $("#btn_updateMonitoreoCorrosion_operacion").hide();

                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;

                    $("#txtductomonitoreoop").val(ducto_nombre);
                    $("#txttramomonitoreoop").val(tramo_nombre);
                    $("#txtareamonitoreoop").val(area_unitaria_nombre);
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });


}
var idMonitoreoCorrosiongOp;
function llenarDatosMonitoreoCorrosion(data) {

    $("#btn_updateMonitoreoCorrosion_operacion").text('Actualizar');
    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== null) {
        const coords = data[0].coordenada_especifica.split(' ');
        $("#coord_esp_monitoreoop_x").val(coords[0]);
        $("#coord_esp_monitoreoop_y").val(coords[1]);
    }
    else {
        $("#coord_esp_monitoreoop_x").val("");
        $("#coord_esp_monitoreoop_y").val("");
    }
    $("#km_esp_monitoreoop").val(data[0].kilometro_especifico);
    $("#txtunidadesmedidaop").val(data[0].unidades_medida);
    $("#txtcuponesop").val(data[0].cupones);
    $("#fec_instalacionmonitoreoop").val(data[0].fecha_instalacion.split(' ')[0]);
    $("#fec_retiroomonitoreoop").val(data[0].fecha_retiro.split(' ')[0]);
    $("#fec_registromonitoreoop").val(data[0].fecha_registro.split(' ')[0]);
    $("#txtnombrecuponmonitoreoop").val(data[0].nombre_cupon);
    $("#txtpesomonitoreoop").val(data[0].peso);
    $("#txtPesoFinalmonitoreoop").val(data[0].peso_final);
    $("#txtvalocidadcorrosionop").val(data[0].valocidad_corrosion);
    idMonitoreoCorrosiongOp = data[0].id;
    inhabilitarform("#monitoreocorrosionoperacionfrm", true);
}
function saveMonitoreoCorrosionOp() {
    var webMethod = "saveMonitoreoCorrosionOp";

    var params = {
        C_0101_0001_id: area,
        unidades_medida: $("#txtunidadesmedidaop").val(),
        cupones: $('#txtcuponesop').val(),
        fecha_instalacion: $('#fec_instalacionmonitoreoop').val(),
        fecha_retiro: $("#fec_retiroomonitoreoop").val(),
        fecha_registro: $("#fec_registromonitoreoop").val(),
        nombre_cupon: $("#txtnombrecuponmonitoreoop").val(),
        peso: $("#txtpesomonitoreoop").val(),
        peso_final: $("#txtPesoFinalmonitoreoop").val(),
        valocidad_corrosion: $("#txtvalocidadcorrosionop").val(),
        coordenada_especifica: $("#coord_esp_monitoreoop_x").val() + ' ' + $("#coord_esp_monitoreoop_y").val(),
        kilometro_especifico: $("#km_esp_monitoreoop").val()
    };
    var formData = new FormData();
    Object.keys(params).forEach(key => formData.append(key, params[key]));


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
                $('#operacionforms').show();
                $('#monitoreocorrosionoperacionfrm').hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function updateOperacionMonitoreoCorrosion() {


    if ($("#btn_updateMonitoreoCorrosion_operacion").text() === "Actualizar") {
        inhabilitarform("#monitoreocorrosionoperacionfrm", false)
        $("#btn_updateMonitoreoCorrosion_operacion").text('Guardar');
        showDestroyIcons('monitoreocorrosionoperacionfrm', true);
    }
    else {
        var params = {
        };
        var webMethod = "";
        webMethod = "updateMonitoreoCorrosionOp";
        params = {
            id: idMonitoreoCorrosiongOp,
            C_0101_0001_id: area,
            unidades_medida: $("#txtunidadesmedidaop").val(),
            cupones: $('#txtcuponesop').val(),
            fecha_instalacion: $('#fec_instalacionmonitoreoop').val(),
            fecha_retiro: $("#fec_retiroomonitoreoop").val(),
            fecha_registro: $("#fec_registromonitoreoop").val(),
            nombre_cupon: $("#txtnombrecuponmonitoreoop").val(),
            peso: $("#txtpesomonitoreoop").val(),
            peso_final: $("#txtPesoFinalmonitoreoop").val(),
            valocidad_corrosion: $("#txtvalocidadcorrosionop").val(),
            coordenada_especifica: $("#coord_esp_monitoreoop_x").val() + ' ' + $("#coord_esp_monitoreoop_y").val(),
            kilometro_especifico: $("#km_esp_monitoreoop").val()
        };
        var formData = new FormData();
        Object.keys(params).forEach(key => formData.append(key, params[key]));

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
                    $('#operacionforms').show();
                    $('#monitoreocorrosionoperacionfrm').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }
}
//#endregion

//#region Historial Reparaciones
async function fnshowOperacionHistorialReparaciones(id_d = null) {
    $('#historialreparacionesoperacionfrm').show();
    $('#operacionforms').hide();
    try {
        await loadtipomanguitoOp();
        await loadtiporecubrimientoHistRepOp();
        await loadtipofallaHistRepOp();
        if (id_d) {
            await consultaDatosHistRepOperacion(id_d = id_d);
        }
        else {
            consultaDatosHistRepOperacion();
        }

        //// If you want to do something after all functions have completed, you can do it here

    } catch (error) {
        console.error("An error occurred:", error);
    }
    // resetValidationClasses('planosanalisisform');
}
function loadtipomanguitoOp() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_histReptipoManguitoOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipomanguitohisrep").empty();
                    $('#cmb_tipomanguitohisrep').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipomanguitohisrep').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0415_262
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
function loadtiporecubrimientoHistRepOp() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_histReptipoRecubrimientoOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tiporecaplicadohisrep").empty();
                    $('#cmb_tiporecaplicadohisrep').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tiporecaplicadohisrep').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0415_274
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
function loadtipofallaHistRepOp() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_histReptipofallaOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipofallahisrep").empty();
                    $('#cmb_tipofallahisrep').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipofallahisrep').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0415_279   
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
function cancelotroTipoManguitoOp() {
    $("#espTipoManguitohisrep").hide();
}

function showotrotipoManguitoOp() {
    $('#espTipoManguitohisrep').show();
}
function saveotroTipoManguitoOp() {
    var webMethod = "savehistReptipoeManguitoOperacion";
    var params = {
        C_0415_262: $("#newTipomanguitohisrep").val(),
        descripcion: $("#newDescmanguitohisrep").val()
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
                loadtipomanguitoOp();
                $("#espTipoManguitohisrep").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function cancelotroTipoRecubrimientoHistRepOp() {
    $("#esptiporecaplicadohisrep").hide();
}

function showotrotipoRecubrimientoHistRepOp() {
    $('#esptiporecaplicadohisrep').show();
}
function saveotroTipoRecubrimientoHistRepOp() {
    var webMethod = "savehistReptipoeRecubrimientoOperacion";
    var params = {
        C_0415_274: $("#newTiporecaplicadohisrep").val(),
        descripcion: $("#newDescTiporecaplicadohisrep").val()
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
                loadtiporecubrimientoHistRepOp();
                $("#esptiporecaplicadohisrep").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function cancelotroTipoFallaHistRepOp() {
    $("#espTipofallahisrep").hide();
}

function showotrotipoFallaHistRepOp() {
    $('#espTipofallahisrep').show();
}
function saveotroTipoFallaHistRepOp() {
    var webMethod = "savehistReptipoFallaOperacion";
    var params = {
        C_0415_279: $("#newTipofallahisrep").val(),
        descripcion: $("#newDesctipofallahisrep").val()
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
                loadtipofallaHistRepOp();
                $("#espTipofallahisrep").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function consultaDatosHistRepOperacion(id_d = null) {
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 23, "tbl_hisrep_operacion");
    var webMethod;
    var params;
    if (id_d) {
        webMethod = "getOperacionHisReparacionById";
        params = {
            id: id_d
        };
    }

    else {

        webMethod = "get_OperacionHistorialReparaciones";
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
                var infodata;
                if (webMethod === "getOperacionHisReparacionById")
                    infodata = (data.data);
                else if (webMethod === "get_OperacionHistorialReparaciones")
                    infodata = (data.data.datagrid);
                if (infodata.length > 0) {
                    if (webMethod === "getOperacionHisReparacionById")
                        llenarDatosHisRepOp(infodata);
                    else if (webMethod === "get_OperacionHistorialReparaciones")
                        llenarDatosHisRepOp(infodata);
                    $("#btn_saveHisRep_operacion").hide();
                    $("#btn_updateHisRep_operacion").show();
                    $("#btn_newHisRep_operacion").show();
                }
                else {

                    clearInputTextValues('historialreparacionesoperacionfrm');
                    inhabilitarform("#historialreparacionesoperacionfrm", false)
                    $("#btn_saveHisRep_operacion").show();
                    $("#btn_updateHisRep_operacion").hide();

                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;

                    $("#txtductohisrep").val(ducto_nombre);
                    $("#txttramohisrep").val(tramo_nombre);
                    $("#txtareahisrep").val(area_unitaria_nombre);
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });


}
var idHistRepOp;
function llenarDatosHisRepOp(data) {

    $("#btn_updateHisRep_operacion").text('Actualizar');
    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== null) {
        const coords = data[0].coordenada_especifica.split(' ');
        $("#coord_esp_hisrep_x").val(coords[0]);
        $("#coord_esp_hisrep_y").val(coords[1]);
    }
    else {
        $("#coord_esp_hisrep_x").val("");
        $("#coord_esp_hisrep_y").val("");
    }
    $("#km_esp_hisrep").val(data[0].kilometro_especifico);
    $("#fecinsta_hisrep").val(data[0].C_0415_254.split(' ')[0]);
    $("#cmbcuentarecubrimiento option:contains(" + data[0].C_0415_255 + ")").attr('selected', 'selected');
    $("#cmbmanguitopresurizado option:contains(" + data[0].C_0415_256 + ")").attr('selected', 'selected');
    $("#cmbencuentramanguito option:contains(" + data[0].C_0415_257 + ")").attr('selected', 'selected');
    $("#fecfab_hisrep").val(data[0].C_0415_258.split(' ')[0]);
    $("#txtfabricantehisrep").val(data[0].C_0415_259);
    $("#txtmaterialhisrep").val(data[0].C_0415_260);
    $("#txtpresionmahisrep").val(data[0].C_0415_261);
    $("#cmb_tipomanguitohisrep option:contains(" + data[0].C_0415_262 + ")").attr('selected', 'selected');
    $("#txtnoseriehisrep").val(data[0].C_0415_263);
    $("#cmbestadohisrep option:contains(" + data[0].C_0415_264 + ")").attr('selected', 'selected');
    $("#txtesptuberiahisrep").val(data[0].C_0415_265);
    $("#txtespnominalhisrep").val(data[0].C_0415_266);
    $("#txtpruebahidrohisrep").val(data[0].C_0415_267);
    $("#fecprueba_hisrep").val(data[0].C_0415_268.split(' ')[0]);
    $("#txtequipohisrep").val(data[0].C_0415_269);
    $("#txtlongitudenvolhisrep").val(data[0].C_0415_271);
    $("#txtobservacionhisrep").val(data[0].C_0415_272);
    $("#fecinspliquidos_hisrep").val(data[0].C_0415_273.split(' ')[0]);
    $("#cmb_tiporecaplicadohisrep option:contains(" + data[0].C_0415_274 + ")").attr('selected', 'selected');
    $("#txtlongitudrecbhisrec").val(data[0].C_0415_275);
    $("#txtindicadoreshisrep").val(data[0].C_0415_276);
    $("#txtdefectohisrep").val(data[0].C_0415_277);
    $("#fecreparacion_hisrep").val(data[0].C_0415_278.split(' ')[0]);
    $("#cmb_tipofallahisrep option:contains(" + data[0].C_0415_279 + ")").attr('selected', 'selected');
    $("#txtmodoreparacionhisrep").val(data[0].C_0415_280);
    idHistRepOp = data[0].id;
    inhabilitarform("#historialreparacionesoperacionfrm", true);
}
function nuevoOperacionHistReparacion() {

    $("#btn_saveHisRep_operacion").show();
    $("#btn_newHisRep_operacion").hide();
    $("#btn_updateHisRep_operacion").hide();
    clearInputTextValuesNew('historialreparacionesoperacionfrm');
    inhabilitarform("#historialreparacionesoperacionfrm", false);

}
function savehistReparacionOp() {
    var webMethod = "saveHistorialReparacionesOp";

    var params = {
        C_0101_0001_id: area,
        C_0415_254: $("#fecinsta_hisrep").val(),
        C_0415_255: $('#cmbcuentarecubrimiento').val(),
        C_0415_256: $('#cmbencuentramanguito').val(),
        C_0415_257: $("#cmbencuentramanguito").val(),
        C_0415_258: $("#fecfab_hisrep").val(),
        C_0415_259: $("#txtfabricantehisrep").val(),
        C_0415_260: $("#txtmaterialhisrep").val(),
        C_0415_261: $("#txtpresionmahisrep").val(),
        id_C_0415_262: $("#cmb_tipomanguitohisrep").val(),
        C_0415_263: $("#txtnoseriehisrep").val(),
        C_0415_264: $("#cmbestadohisrep").val(),
        C_0415_265: $("#txtesptuberiahisrep").val(),
        C_0415_266: $("#txtespnominalhisrep").val(),
        C_0415_267: $("#txtpruebahidrohisrep").val(),
        C_0415_268: $("#fecprueba_hisrep").val(),
        C_0415_269: $("#txtequipohisrep").val(),
        C_0415_271: $("#txtlongitudenvolhisrep").val(),
        C_0415_272: $("#txtobservacionhisrep").val(),
        C_0415_273: $("#fecinspliquidos_hisrep").val(),
        id_C_0415_274: $("#cmb_tiporecaplicadohisrep").val(),
        C_0415_275: $("#txtlongitudrecbhisrec").val(),
        C_0415_276: $("#txtindicadoreshisrep").val(),
        C_0415_277: $("#txtdefectohisrep").val(),
        C_0415_278: $("#fecreparacion_hisrep").val(),
        id_C_0415_279: $("#cmb_tipofallahisrep").val(),
        C_0415_280: $("#txtmodoreparacionhisrep").val(),
        coordenada_especifica: $("#coord_esp_hisrep_x").val() + ' ' + $("#coord_esp_hisrep_y").val(),
        kilometro_especifico: $("#km_esp_hisrep").val()
    };
    var formData = new FormData();
    Object.keys(params).forEach(key => formData.append(key, params[key]));


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
                $('#operacionforms').show();
                $('#historialreparacionesoperacionfrm').hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function updateOperacionHistorialReparaciones() {


    if ($("#btn_updateHisRep_operacion").text() === "Actualizar") {
        inhabilitarform("#historialreparacionesoperacionfrm", false)
        $("#btn_updateHisRep_operacion").text('Guardar');
        showDestroyIcons('historialreparacionesoperacionfrm', true);
    }
    else {
        var params = {
        };
        var webMethod = "";
        webMethod = "updateHistorialReparacionesOp";
        params = {
            id: idHistRepOp,
            C_0101_0001_id: area,
            C_0415_254: $("#fecinsta_hisrep").val(),
            C_0415_255: $('#cmbcuentarecubrimiento').val(),
            C_0415_256: $('#cmbencuentramanguito').val(),
            C_0415_257: $("#cmbencuentramanguito").val(),
            C_0415_258: $("#fecfab_hisrep").val(),
            C_0415_259: $("#txtfabricantehisrep").val(),
            C_0415_260: $("#txtmaterialhisrep").val(),
            C_0415_261: $("#txtpresionmahisrep").val(),
            id_C_0415_262: $("#cmb_tipomanguitohisrep").val(),
            C_0415_263: $("#txtnoseriehisrep").val(),
            C_0415_264: $("#cmbestadohisrep").val(),
            C_0415_265: $("#txtesptuberiahisrep").val(),
            C_0415_266: $("#txtespnominalhisrep").val(),
            C_0415_267: $("#txtpruebahidrohisrep").val(),
            C_0415_268: $("#fecprueba_hisrep").val(),
            C_0415_269: $("#txtequipohisrep").val(),
            C_0415_271: $("#txtlongitudenvolhisrep").val(),
            C_0415_272: $("#txtobservacionhisrep").val(),
            C_0415_273: $("#fecinspliquidos_hisrep").val(),
            id_C_0415_274: $("#cmb_tiporecaplicadohisrep").val(),
            C_0415_275: $("#txtlongitudrecbhisrec").val(),
            C_0415_276: $("#txtindicadoreshisrep").val(),
            C_0415_277: $("#txtdefectohisrep").val(),
            C_0415_278: $("#fecreparacion_hisrep").val(),
            id_C_0415_279: $("#cmb_tipofallahisrep").val(),
            C_0415_280: $("#txtmodoreparacionhisrep").val(),
            coordenada_especifica: $("#coord_esp_hisrep_x").val() + ' ' + $("#coord_esp_hisrep_y").val(),
            kilometro_especifico: $("#km_esp_hisrep").val()
        };
        var formData = new FormData();
        Object.keys(params).forEach(key => formData.append(key, params[key]));

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
                    $('#operacionforms').show();
                    $('#historialreparacionesoperacionfrm').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }
}
function cancelOperacionHisReparacion() {
    $('#operacionforms').show();
    $('#historialreparacionesoperacionfrm').hide();
}
//#endregion
//#region Vandalismo
async function fnshowOperacionVandalismo(id_d = null) {
    $('#vandalismooperacionfrm').show();
    $('#operacionforms').hide();
    try {
        await loadtipovandalismoOp();
        await loadtipoeventovandalismoOp();
        await loadtiporecuperacionhisvandalismoOp();
        if (id_d) {
            await consultaDatosVandalismogOperacion(id_d = id_d);
        }
        else {
            consultaDatosVandalismogOperacion();
        }

        //// If you want to do something after all functions have completed, you can do it here

    } catch (error) {
        console.error("An error occurred:", error);
    }
    // resetValidationClasses('planosanalisisform');
}
function loadtipovandalismoOp() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_VanTipoOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipovanda").empty();
                    $('#cmb_tipovanda').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipovanda').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0416_285
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
function loadtipoeventovandalismoOp() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_VanTipoEventoOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipoeventovan").empty();
                    $('#cmb_tipoeventovan').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipoeventovan').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0416_286
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
function loadtiporecuperacionhisvandalismoOp() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_VanTipoReparacionOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tiporeparacionvan").empty();
                    $('#cmb_tiporeparacionvan').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tiporeparacionvan').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0416_292
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
function showotrotipovandalismoOp() {
    $('#espTipovandalismo').show();
}

function cancelotroTipoVan() {
    $("#espTipovandalismo").hide();
}
function saveotroTipoVan() {
    var webMethod = "saveVanTipoOperacion";
    var params = {
        C_0416_285: $("#newTipovan").val(),
        descripcion: $("#newDesTipovan").val()
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
                loadtipovandalismoOp();
                $("#espTipovandalismo").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrotipoeventovanOp() {
    $('#esptipoeventovan').show();
}

function cancelotroTipoeventovanOp() {
    $("#esptipoeventovan").hide();
}
function saveotroTipoeventovanOp() {
    var webMethod = "saveVanTipoEventoOperacion";
    var params = {
        C_0416_286: $("#newTipoEventovan").val(),
        descripcion: $("#newDescTipoEventovan").val()
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
                loadtipoeventovandalismoOp();
                $("#esptipoeventovan").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrotiporeparacionvanOp() {
    $('#espTiporeparacionvan').show();
}

function cancelotroTiporeparacionvanOp() {
    $("#espTiporeparacionvan").hide();
}
function saveotroTiporeparacionvanOp() {
    var webMethod = "saveVanTipoReparacionOperacion";
    var params = {
        C_0416_292: $("#newTiporeparacionvan").val(),
        descripcion: $("#newDescreparacionvan").val()
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
                loadtiporecuperacionhisvandalismoOp();
                $("#espTiporeparacionvan").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function savevandalismoOp() {
    var webMethod = "saveVandalismoOperacion";

    var params = {
        C_0101_0001_id: area,
        C_0416_281: $("#txtresidenciavanda").val(),
        C_0416_282: $('#txtpobladovanda').val(),
        C_0416_283: $('#txtmunicipiovanda').val(),
        C_0416_284: $("#txtestadovanda").val(),
        id_C_0416_285: $("#cmb_tipovanda").val(),
        id_C_0416_286: $("#cmb_tipoeventovan").val(),
        C_0416_287: $("#fec_van").val(),
        C_0416_288: $("#txthoraocurrenciavan").val(),
        C_0416_289: $("#txthorariofinalvan").val(),
        C_0416_290: $("#txthoractrlvan").val(),
        C_0416_291: $("#txtarregloctrlvan").val(),
        id_C_0416_292: $("#cmb_tiporeparacionvan").val(),
        C_0416_293: $("#txtobservacionesvan").val(),
        C_0416_294: $("#txtoficioaseavan").val(),
        C_0416_295: $("#txtreportesiniestrovan").val(),
        C_0416_296: $("#txtnosiniestrovan").val(),
        C_0416_297: $("#txtnovan").val(),
        C_0416_298: $("#txtevento_van").val(),
        coordenada_especifica: $("#coord_esp_vanda_x").val() + ' ' + $("#coord_esp_vanda_y").val(),
        kilometro_especifico: $("#km_esp_vanda").val()
    };
    var formData = new FormData();
    Object.keys(params).forEach(key => formData.append(key, params[key]));


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
                $('#operacionforms').show();
                $('#vandalismooperacionfrm').hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function updateOperacioVandalismoOp() {


    if ($("#btn_updateVan_operacion").text() === "Actualizar") {
        inhabilitarform("#vandalismooperacionfrm", false)
        $("#btn_updateVan_operacion").text('Guardar');
        showDestroyIcons('vandalismooperacionfrm', true);
    }
    else {
        var params = {
        };
        var webMethod = "";
        webMethod = "updateVandalismoOp";
        params = {
            id: idvandalismoOp,
            C_0101_0001_id: area,
            C_0416_281: $("#txtresidenciavanda").val(),
            C_0416_282: $('#txtpobladovanda').val(),
            C_0416_283: $('#txtmunicipiovanda').val(),
            C_0416_284: $("#txtestadovanda").val(),
            id_C_0416_285: $("#cmb_tipovanda").val(),
            id_C_0416_286: $("#cmb_tipoeventovan").val(),
            C_0416_287: $("#fec_van").val(),
            C_0416_288: $("#txthoraocurrenciavan").val(),
            C_0416_289: $("#txthorariofinalvan").val(),
            C_0416_290: $("#txthoractrlvan").val(),
            C_0416_291: $("#txtarregloctrlvan").val(),
            id_C_0416_292: $("#cmb_tiporeparacionvan").val(),
            C_0416_293: $("#txtobservacionesvan").val(),
            C_0416_294: $("#txtoficioaseavan").val(),
            C_0416_295: $("#txtreportesiniestrovan").val(),
            C_0416_296: $("#txtnosiniestrovan").val(),
            C_0416_297: $("#txtnovan").val(),
            C_0416_298: $("#txtevento_van").val(),
            coordenada_especifica: $("#coord_esp_vanda_x").val() + ' ' + $("#coord_esp_vanda_y").val(),
            kilometro_especifico: $("#km_esp_vanda").val()
        };
        var formData = new FormData();
        Object.keys(params).forEach(key => formData.append(key, params[key]));

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
                    $('#operacionforms').show();
                    $('#vandalismooperacionfrm').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }
}
function cancelOperacionVandalismo() {
    $('#operacionforms').show();
    $('#vandalismooperacionfrm').hide();
}
function consultaDatosVandalismogOperacion(id_d = null) {
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 24, "tbl_vand_operacion");
    var webMethod;
    var params;
    if (id_d) {
        webMethod = "getOperacionVandalismoById";
        params = {
            id: id_d
        };
    }

    else {

        webMethod = "get_OperacionVandalismo";
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
                var infodata;
                if (webMethod === "getOperacionVandalismoById")
                    infodata = (data.data);
                else if (webMethod === "get_OperacionVandalismo")
                    infodata = (data.data.datagrid);
                if (infodata.length > 0) {
                    if (webMethod === "getOperacionVandalismoById")
                        llenarDatosVandalismoOp(infodata);
                    else if (webMethod === "get_OperacionVandalismo")
                        llenarDatosVandalismoOp(infodata);
                    $("#btn_saveVang_operacion").hide();
                    $("#btn_updateVan_operacion").show();
                    $("#btn_newVan_operacion").show();
                }
                else {

                    clearInputTextValues('vandalismooperacionfrm');
                    inhabilitarform("#vandalismooperacionfrm", false)
                    $("#btn_saveVang_operacion").show();
                    $("#btn_updateVan_operacion").hide();

                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;

                    $("#txtductovanda").val(ducto_nombre);
                    $("#txttramovanda").val(tramo_nombre);
                    $("#txtareavanda").val(area_unitaria_nombre);
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });


}
var idvandalismoOp;
function llenarDatosVandalismoOp(data) {
    $("#btn_updateVan_operacion").text('Actualizar');
    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== null) {
        const coords = data[0].coordenada_especifica.split(' ');
        $("#coord_esp_vanda_x").val(coords[0]);
        $("#coord_esp_vanda_y").val(coords[1]);
    }
    else {
        $("#coord_esp_vanda_x").val("");
        $("#coord_esp_vanda_y").val("");
    }
    $("#km_esp_vanda").val(data[0].kilometro_especifico);
    $("#txtresidenciavanda").val(data[0].C_0416_281);
    $("#txtpobladovanda").val(data[0].C_0416_282);
    $("#txtmunicipiovanda").val(data[0].C_0416_283);
    $("#txtestadovanda").val(data[0].C_0416_284);
    $("#cmb_tipovanda option:contains(" + data[0].id_C_0416_285 + ")").attr('selected', 'selected');
    $("#cmb_tipoeventovan option:contains(" + data[0].id_C_0416_286 + ")").attr('selected', 'selected');
    $("#fec_van").val(data[0].C_0416_287.split(' ')[0]);
    $("#txthoraocurrenciavan").val(data[0].C_0416_288);
    $("#txthorariofinalvan").val(data[0].C_0416_289);
    $("#txthoractrlvan").val(data[0].C_0416_290);
    $("#txtarregloctrlvan").val(data[0].C_0416_291);
    $("#cmb_tiporeparacionvan option:contains(" + data[0].id_C_0416_292 + ")").attr('selected', 'selected');
    $("#txtobservacionesvan").val(data[0].C_0416_293);
    $("#txtoficioaseavan").val(data[0].C_0416_294);
    $("#txtreportesiniestrovan").val(data[0].C_0416_295);
    $("#txtnosiniestrovan").val(data[0].C_0416_296);
    $("#txtnovan").val(data[0].C_0416_297);
    $("#txtevento_van").val(data[0].C_0416_298);
    idvandalismoOp = data[0].id;
    inhabilitarform("#vandalismooperacionfrm", true);
}
function nuevoOperacionVandalismo() {

    $("#btn_saveVang_operacion").show();
    $("#btn_newVan_operacion").hide();
    $("#btn_updateVan_operacion").hide();
    clearInputTextValuesNew('vandalismooperacionfrm');
    inhabilitarform("#vandalismooperacionfrm", false);

}
//#endregion

//#region Instalaciones
//#region Show, Save and Update
async function fnshowOperacionInstalacion(id_d = null) {
    $('#instalacionesoperacionfrm').show();
    $('#operacionforms').hide();
    try {
        await loadtipoLanzadorOp();
        await loadtipoDispositivo();
        await loadtipoValvula();
        await loadtipoOperador();
        await loadtipoConexionOp();
        await loadtipoMarcador();
        await loadtipoTee();
        await loadtipoCierre();
        await loadtipoBriada();
        await loadtipoEspecificacionBriada();
        await loadtipoMedidor();
        await loadtipoConexionRama();
        await loadtipoGradosCodo();
        await loadtipoEspecificacionDisenioCodo();
        await loadGradoReductor();
        await loadTipoReductor();
        await loadEspecificacionesDisenioReductor();
        await loadTipoTuberia();
        if (id_d) {
            await consultaDatosInstalacionesOperacion(id_d = id_d);
        }
        else {
            consultaDatosInstalacionesOperacion();
        }

        //// If you want to do something after all functions have completed, you can do it here

    } catch (error) {
        console.error("An error occurred:", error);
    }
    // resetValidationClasses('planosanalisisform');
}


function cancelOperacionInstalaciones(){
    $('#operacionforms').show();
    $('#instalacionesoperacionfrm').hide();
}
function consultaDatosInstalacionesOperacion(id_d = null) {
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
   get_relateddocuments(tramo, area, 20, "tbl_instalaciones_operacion");
    var webMethod;
    var params;
    if (id_d) {
        webMethod = "getOperacionInstalacionesById";
        params = {
            id: id_d
        };
    }

    else {

        webMethod = "get_OperacionInstalaciones";
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
                var infodata;
                if (webMethod === "getOperacionInstalacionesById")
                    infodata = (data.data);
                else if (webMethod === "get_OperacionInstalaciones")
                    infodata = (data.data.datagrid);
                if (infodata.length > 0) {
                    if (webMethod === "getOperacionInstalacionesById")
                        llenarDatosInstalacionesOp(infodata);
                    else if (webMethod === "get_OperacionInstalaciones")
                        llenarDatosInstalacionesOp(infodata);
                    $("#btn_saveInstalacion_operacion").hide();
                    $("#btn_updateInstalacion_operacion").show();
                    $("#btn_newInstalacion_operacion").show();
                }
                else {

                    clearInputTextValues('instalacionesoperacionfrm');
                    inhabilitarform("#instalacionesoperacionfrm", false)
                    $("#btn_saveInstalacion_operacion").show();
                    $("#btn_updateInstalacion_operacion").hide();

                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;

                    $("#txtductoinsta").val(ducto_nombre);
                    $("#txttramoinsta").val(tramo_nombre);
                    $("#txtareainsta").val(area_unitaria_nombre);
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });


}
var idInstalacionesOp;
function llenarDatosInstalacionesOp(data) {

    
    $("#btn_updateInstalacion_operacion").text('Actualizar');
    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== null) {
    //#region Generales
    const coords = data[0].coordenada_especifica.split(' ');
    $("#coord_esp_insta_x").val(coords[0]);
    $("#coord_esp_insta_y").val(coords[1]);
    }
    else {
        $("#coord_esp_insta_x").val("");
        $("#coord_esp_insta_y").val("");
    }
    $("#km_esp_insta").val(data[0].kilometro_especifico);
    $("#cmb_tipoInstalacion").val(data[0].C_0401_130);
    $("#txtidentificadorinsta").val(data[0].C_0401_131);
    $("#fec_inicio_insta").val(data[0].C_0401_132.split(' ')[0]);
    $("#fec_instalacion_insta").val(data[0].C_0401_133.split(' ')[0]);
    $("#fec_Fab_insta").val(data[0].C_0401_134.split(' ')[0]);
    $("#cmb_matfabinsta option:contains(" + data[0].C_0401_135 + ")").attr('selected', 'selected');
    $("#txtfabricanteinsta").val(data[0].C_0401_136);
    $("#txtedoactualinsta").val(data[0].C_0401_137);
    $("#txtedohistoinsta").val(data[0].C_0401_138);
     //#endregion
    //#region Tipo Trampa
    $("#txtdiamcanoninsta").val(data[0].C_0401_139);
    $("#cmb_orientacanioninsta option:contains(" + data[0].C_0401_140 + ")").attr('selected', 'selected');
    $("#txtespdisenioinsta").val(data[0].C_0401_141);
    $("#txtespesornominalcanioninsta").val(data[0].C_0401_142);
    $("#txtmaxperdidaespesorinsta").val(data[0].C_0401_143);
    $("#cmb_tipolanzadorinsta option:contains(" + data[0].C_0401_145 + ")").attr('selected', 'selected');
    $("#cmb_tipodispositivonsta option:contains(" + data[0].C_0401_146 + ")").attr('selected', 'selected');
    $("#txtlongmaxpermdisprascadorinsta").val(data[0].C_0401_148);
    $("#txtdiametromaxdispotivoinsta").val(data[0].C_0401_149);
    $("#txtpresmaxdisenioinsta").val(data[0].C_0401_150);
    $("#txtlongmedidacanioninsta").val(data[0].C_0401_151);
    $("#txtmecanismocierreinsta").val(data[0].C_0401_152);
    //#endregion
    //#region Válvula
    $("#cmb_tipovalvulainstainsta option:contains(" + data[0].C_0401_153 + ")").attr('selected', 'selected');
    $("#cmb_edofuncionalinsta option:contains(" + data[0].C_0401_154 + ")").attr('selected', 'selected');
    $("#cmb_Operacionformremotainsta option:contains(" + data[0].C_0401_155 + ")").attr('selected', 'selected');
    $("#cmb_valvsegucrinsta option:contains(" + data[0].C_0401_156 + ")").attr('selected', 'selected');
    $("#txtmarcamodvalinsta").val(data[0].C_0401_157);
    $("#txtoperadovalinsta").val(data[0].C_0401_158);
    $("#cmb_tipooperadorinsta option:contains(" + data[0].C_0401_159 + ")").attr('selected', 'selected');
    $("#txtdiamextvalvinsta").val(data[0].C_0401_160);
    $("#txtespediseniovalvinsta").val(data[0].C_0401_161);
    $("#txtpresionmaxdiseniovalvinsta").val(data[0].C_0401_162);
    $("#txtptiempotardallegarvalvulaemerinsta").val(data[0].C_0401_163);
    $("#cmb_poscvalvdisinsta option:contains(" + data[0].C_0401_164 + ")").attr('selected', 'selected');
    $("#cmb_posfuncvalvinsta option:contains(" + data[0].C_0401_165 + ")").attr('selected', 'selected');
    $("#cmb_prinfuninsta option:contains(" + data[0].C_0401_166 + ")").attr('selected', 'selected');
    $("#cmb_tipoconexinsta option:contains(" + data[0].C_0401_167 + ")").attr('selected', 'selected');
    $("#txtpresionpruebavalvinsta").val(data[0].C_0401_168);
    //#endregion
    //#region Marcador
    $("#cmb_tipomarcadorinsta option:contains(" + data[0].C_0401_169 + ")").attr('selected', 'selected');
    //#endrefion
    //#region Tee
    $("#cmb_tipoteeinsta option:contains(" + data[0].C_0401_170 + ")").attr('selected', 'selected');
    $("#fec_presuinicial_insta").val(data[0].C_0401_171.split(' ')[0]);
    $("#txtdiamextramaTinsta").val(data[0].C_0401_172);
    $("#txtdiamextentradaactvnsta").val(data[0].C_0401_173);
    $("#txtespesorparednominsta").val(data[0].C_0401_174);
    $("#txtespdisenioinsta").val(data[0].C_0401_175);
    $("#txtdiamextsalidainnsta").val(data[0].C_0401_176);
    //#endregion
    //#region Tapas
    $("#cmb_tipocierratapasinsta option:contains(" + data[0].C_0401_177 + ")").attr('selected', 'selected');
    $("#txtdiamextdelactivoinsta").val(data[0].C_0401_178);
    //#endregion
    //#region Briadas
    $("#cmb_tipobridainsta option:contains(" + data[0].C_0401_179 + ")").attr('selected', 'selected');
    $("#txtpresmaxopbridainsta").val(data[0].C_0401_180);
    $("#cmb_tipoespdiseniobriadainsta option:contains(" + data[0].C_0401_181 + ")").attr('selected', 'selected');
    //#endregion
    //#region Medidor
    $("#cmb_tipomedidorinsta option:contains(" + data[0].C_0401_182 + ")").attr('selected', 'selected');
    $("#txtnoserieemedidorinsta").val(data[0].C_0401_183);
    //#endregion
    //#region Conexión Rama
    $("#cmb_tipoconexramainsta option:contains(" + data[0].C_0401_184 + ")").attr('selected', 'selected');
    $("#txtgrosornomconexramainsta").val(data[0].C_0401_185);
    $("#txtdiamextconexraminsta").val(data[0].C_0401_186);
    $("#txtespdisenioconexramainsta").val(data[0].C_0401_187);
    //#endregion
    //#region Codos
    $("#txtAngulocurvhoriCodosinsta").val(data[0].C_0401_188);
    $("#txtradiocodoinsta").val(data[0].C_0401_189);
    $("#cmb_tipogradocodo option:contains(" + data[0].C_0401_190 + ")").attr('selected', 'selected');
    $("#txtdiamcodoextinsta").val(data[0].C_0401_191);
    $("#txtespesorcodonominsta").val(data[0].C_0401_192);
    $("#txtdiamextsalidacodosinsta").val(data[0].C_0401_193);
    $("#cmb_tipoespdiseniocodo option:contains(" + data[0].C_0401_194 + ")").attr('selected', 'selected');
    $("#txtangulocurvverticodoinsta").val(data[0].C_0401_195);
    //#endregion
    //#region Reductor
    $("#cmb_tipogradoreductor option:contains(" + data[0].C_0401_196 + ")").attr('selected', 'selected');
    $("#txtdiametroextreductorentradaactivoinsta").val(data[0].C_0401_197);
    $("#txtdiametroextreductorsalidaactivoinsta").val(data[0].C_0401_198);
    $("#cmb_tiporeductor option:contains(" + data[0].C_0401_199 + ")").attr('selected', 'selected');
    $("#cmb_tipoespdisreductor option:contains(" + data[0].C_0401_200 + ")").attr('selected', 'selected');
    $("#cmb_tipoventilacion option:contains(" + data[0].C_0401_201 + ")").attr('selected', 'selected');
    $("#txtlogcarcasainsta").val(data[0].C_0401_202);
    $("#cmb_aislamientotubinsta option:contains(" + data[0].C_0401_203 + ")").attr('selected', 'selected');
    $("#cmb_cuentaventilacioninsta option:contains(" + data[0].C_0401_204 + ")").attr('selected', 'selected');
    $("#txtespparednomventiinsta").val(data[0].C_0401_205);
    $("#txtnomventiiinsta").val(data[0].C_0401_206);
    $("#txtdiamextventiinsta").val(data[0].C_0401_207);
    //#endregion
    idInstalacionesOp = data[0].id;
    inhabilitarform("#instalacionesoperacionfrm", true);
    //show class
    showfields_instalacion($("#cmb_tipoInstalacion").val());
}
function showfields_instalacion(selectedValue) {
    switch (selectedValue) {
        case "1":
            showClass("uno");
            break;
        case "2":
            showClass("dos");
            break;
        case "3":
            showClass("tres");
            break;
        case "4":
            showClass("cuatro");
            break;
        case "5":
            showClass("cinco");
            break;
        case "6":
            showClass("seis");
            break;
        case "7":
            showClass("siete");
            break;
        case "8":
            showClass("ocho");
            break;
        case "9":
            showClass("nueve");
            break;
        case "10":
            showClass("diez");
            break;
        case "11":
            showClass("once");
            break;
        case "12":
            showClass("doce");
            break;
    }
}
function nuevoInstalacionesOperacion() {

    $("#btn_saveInstalacion_operacion").show();
    $("#btn_newInstalacion_operacion").hide();
    $("#btn_updateInstalacion_operacion").hide();
    clearInputTextValuesNew('instalacionesoperacionfrm');
    inhabilitarform("#instalacionesoperacionfrm", false);

}
function saveInstalacionesOp() {
    var webMethod = "saveInstalacionesOperacion";

    var params = {
        C_0101_0001_id: area,
        C_0401_130: $("#cmb_tipoInstalacion").val(),
        C_0401_131: $("#fec_inicio_insta").val(),
        C_0401_132: $("#fec_instalacion_insta").val(),
        C_0401_133: $("#fec_instalacion_insta").val(),
        C_0401_134: $("#fec_Fab_insta").val(),
        C_0401_135: $("#cmb_matfabinsta").val(),
        C_0401_136: $("#txtfabricanteinsta").val(),
        C_0401_137: $("#txtedoactualinsta").val(),
        C_0401_138: $("#txtedohistoinsta").val(),
        C_0401_139: $("#txtdiamcanoninsta").val(),
        C_0401_140: $("#cmb_orientacanioninsta").val(),
        C_0401_141: $("#txtespdisenioinsta").val(),
        C_0401_142: $("#txtespesornominalcanioninsta").val(),
        C_0401_143: $("#txtmaxperdidaespesorinsta").val(),
        C_0401_145: $("#cmb_tipolanzadorinsta ").val(),
        C_0401_146: $("#cmb_tipodispositivonsta").val(),
        C_0401_148: $("#txtlongmaxpermdisprascadorinsta").val(),
        C_0401_149: $("#txtdiametromaxdispotivoinsta").val(),
        C_0401_150: $("#txtpresmaxdisenioinsta").val(),
        C_0401_151: $("#txtlongmedidacanioninsta").val(),
        C_0401_152: $("#txtmecanismocierreinsta").val(),
        C_0401_153:$("#cmb_tipovalvulainstainsta").val(),
        C_0401_154:$("#cmb_edofuncionalinsta").val(),
        C_0401_155:$("#cmb_Operacionformremotainsta").val(),
        C_0401_156:$("#cmb_valvsegucrinsta").val(),
        C_0401_157:$("#txtmarcamodvalinsta").val(),
        C_0401_158:$("#txtoperadovalinsta").val(),
        C_0401_159:$("#cmb_tipooperadorinsta").val(),
        C_0401_160:$("#txtdiamextvalvinsta").val(),
        C_0401_161:$("#txtespediseniovalvinsta").val(),
        C_0401_162:$("#txtpresionmaxdiseniovalvinsta").val(),
        C_0401_163:$("#txtptiempotardallegarvalvulaemerinsta").val(),
        C_0401_164:$("#cmb_poscvalvdisinsta").val(),
        C_0401_165:$("#cmb_posfuncvalvinsta").val(),
        C_0401_166:$("#cmb_prinfuninsta").val(),
        C_0401_167:$("#cmb_tipoconexinsta").val(),
        C_0401_168:$("#txtpresionpruebavalvinsta").val(),
        C_0401_169:$("#cmb_tipomarcadorinsta").val(),
        C_0401_170:$("#cmb_tipoteeinsta").val(),
        C_0401_171:$("#fec_presuinicial_insta").val(),
        C_0401_172:$("#txtdiamextramaTinsta").val(),
        C_0401_173:$("#txtdiamextentradaactvnsta").val(),
        C_0401_174:$("#txtespesorparednominsta").val(),
        C_0401_175:$("#txtespdisenioinsta").val(),
        C_0401_176:$("#txtdiamextsalidainnsta").val(),
        C_0401_177:$("#cmb_tipocierratapasinsta").val(),
        C_0401_178:$("#txtdiamextdelactivoinsta").val(),
        C_0401_179:$("#cmb_tipobridainsta").val(),
        C_0401_180:$("#txtpresmaxopbridainsta").val(),
        C_0401_181: $("#cmb_tipoespdiseniobriadainsta").val(),
        C_0401_182:$("#cmb_tipomedidorinsta").val(),
        C_0401_183:$("#txtnoserieemedidorinsta").val(),
        C_0401_184:$("#cmb_tipoconexramainsta").val(),
        C_0401_185:$("#txtgrosornomconexramainsta").val(),
        C_0401_186:$("#txtdiamextconexraminsta").val(),
        C_0401_187:$("#txtespdisenioconexramainsta").val(),
        C_0401_188:$("#txtAngulocurvhoriCodosinsta").val(),
        C_0401_189:$("#txtradiocodoinsta").val(),
        C_0401_190:$("#cmb_tipogradocodo").val(),
        C_0401_191:$("#txtdiamcodoextinsta").val(),
        C_0401_192:$("#txtespesorcodonominsta").val(),
        C_0401_193:$("#txtdiamextsalidacodosinsta").val(),
        C_0401_194:$("#cmb_tipoespdiseniocodo").val(),
        C_0401_195:$("#txtangulocurvverticodoinsta").val(),
        C_0401_196:$("#cmb_tipogradoreductor").val(),
        C_0401_197:$("#txtdiametroextreductorentradaactivoinsta").val(),
        C_0401_198:$("#txtdiametroextreductorsalidaactivoinsta").val(),
        C_0401_199:$("#cmb_tiporeductor").val(),
        C_0401_200:$("#cmb_tipoespdisreductor").val(),
        C_0401_201:$("#cmb_tipoventilacion").val(),
        C_0401_202:$("#txtlogcarcasainsta").val(),
        C_0401_203:$("#cmb_aislamientotubinsta").val(),
        C_0401_204:$("#cmb_cuentaventilacioninsta").val(),
        C_0401_205:$("#txtespparednomventiinsta").val(),
        C_0401_206:$("#txtnomventiiinsta").val(),
        C_0401_207:$("#txtdiamextventiinsta").val(),
        coordenada_especifica: $("#coord_esp_insta_x").val() + ' ' + $("#coord_esp_insta_y").val(),
        kilometro_especifico: $("#km_esp_insta").val()
    };
    var formData = new FormData();
    Object.keys(params).forEach(key => formData.append(key, params[key]));


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
                $('#operacionforms').show();
                $('#instalacionesoperacionfrm').hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function updateOperacioInstalacionesOp() {


    if ($("#btn_updateInstalacion_operacion").text() === "Actualizar") {
        inhabilitarform("#instalacionesoperacionfrm", false)
        $("#btn_updateInstalacion_operacion").text('Guardar');
        showDestroyIcons('instalacionesoperacionfrm', true);
    }
    else {
        var params = {
        };
        var webMethod = "";
        webMethod = "updateInstalacionesOperacion";
        params = {
            id: idInstalacionesOp,
            C_0101_0001_id: area,
            C_0401_130: $("#cmb_tipoInstalacion").val(),
            C_0401_131: $("#fec_inicio_insta").val(),
            C_0401_132: $("#fec_instalacion_insta").val(),
            C_0401_133: $("#fec_instalacion_insta").val(),
            C_0401_134: $("#fec_Fab_insta").val(),
            C_0401_135: $("#cmb_matfabinsta").val(),
            C_0401_136: $("#txtfabricanteinsta").val(),
            C_0401_137: $("#txtedoactualinsta").val(),
            C_0401_138: $("#txtedohistoinsta").val(),
            C_0401_139: $("#txtdiamcanoninsta").val(),
            C_0401_140: $("#cmb_orientacanioninsta").val(),
            C_0401_141: $("#txtespdisenioinsta").val(),
            C_0401_142: $("#txtespesornominalcanioninsta").val(),
            C_0401_143: $("#txtmaxperdidaespesorinsta").val(),
            C_0401_145: $("#cmb_tipolanzadorinsta ").val(),
            C_0401_146: $("#cmb_tipodispositivonsta").val(),
            C_0401_148: $("#txtlongmaxpermdisprascadorinsta").val(),
            C_0401_149: $("#txtdiametromaxdispotivoinsta").val(),
            C_0401_150: $("#txtpresmaxdisenioinsta").val(),
            C_0401_151: $("#txtlongmedidacanioninsta").val(),
            C_0401_152: $("#txtmecanismocierreinsta").val(),
            C_0401_153: $("#cmb_tipovalvulainstainsta").val(),
            C_0401_154: $("#cmb_edofuncionalinsta").val(),
            C_0401_155: $("#cmb_Operacionformremotainsta").val(),
            C_0401_156: $("#cmb_valvsegucrinsta").val(),
            C_0401_157: $("#txtmarcamodvalinsta").val(),
            C_0401_158: $("#txtoperadovalinsta").val(),
            C_0401_159: $("#cmb_tipooperadorinsta").val(),
            C_0401_160: $("#txtdiamextvalvinsta").val(),
            C_0401_161: $("#txtespediseniovalvinsta").val(),
            C_0401_162: $("#txtpresionmaxdiseniovalvinsta").val(),
            C_0401_163: $("#txtptiempotardallegarvalvulaemerinsta").val(),
            C_0401_164: $("#cmb_poscvalvdisinsta").val(),
            C_0401_165: $("#cmb_posfuncvalvinsta").val(),
            C_0401_166: $("#cmb_prinfuninsta").val(),
            C_0401_167: $("#cmb_tipoconexinsta").val(),
            C_0401_168: $("#txtpresionpruebavalvinsta").val(),
            C_0401_169: $("#cmb_tipomarcadorinsta").val(),
            C_0401_170: $("#cmb_tipoteeinsta").val(),
            C_0401_171: $("#fec_presuinicial_insta").val(),
            C_0401_172: $("#txtdiamextramaTinsta").val(),
            C_0401_173: $("#txtdiamextentradaactvnsta").val(),
            C_0401_174: $("#txtespesorparednominsta").val(),
            C_0401_175: $("#txtespdisenioinsta").val(),
            C_0401_176: $("#txtdiamextsalidainnsta").val(),
            C_0401_177: $("#cmb_tipocierratapasinsta").val(),
            C_0401_178: $("#txtdiamextdelactivoinsta").val(),
            C_0401_179: $("#cmb_tipobridainsta").val(),
            C_0401_180: $("#txtpresmaxopbridainsta").val(),
            C_0401_181: $("#cmb_tipoespdiseniobriadainsta").val(),
            C_0401_182: $("#cmb_tipomedidorinsta").val(),
            C_0401_183: $("#txtnoserieemedidorinsta").val(),
            C_0401_184: $("#cmb_tipoconexramainsta").val(),
            C_0401_185: $("#txtgrosornomconexramainsta").val(),
            C_0401_186: $("#txtdiamextconexraminsta").val(),
            C_0401_187: $("#txtespdisenioconexramainsta").val(),
            C_0401_188: $("#txtAngulocurvhoriCodosinsta").val(),
            C_0401_189: $("#txtradiocodoinsta").val(),
            C_0401_190: $("#cmb_tipogradocodo").val(),
            C_0401_191: $("#txtdiamcodoextinsta").val(),
            C_0401_192: $("#txtespesorcodonominsta").val(),
            C_0401_193: $("#txtdiamextsalidacodosinsta").val(),
            C_0401_194: $("#cmb_tipoespdiseniocodo").val(),
            C_0401_195: $("#txtangulocurvverticodoinsta").val(),
            C_0401_196: $("#cmb_tipogradoreductor").val(),
            C_0401_197: $("#txtdiametroextreductorentradaactivoinsta").val(),
            C_0401_198: $("#txtdiametroextreductorsalidaactivoinsta").val(),
            C_0401_199: $("#cmb_tiporeductor").val(),
            C_0401_200: $("#cmb_tipoespdisreductor").val(),
            C_0401_201: $("#cmb_tipoventilacion").val(),
            C_0401_202: $("#txtlogcarcasainsta").val(),
            C_0401_203: $("#cmb_aislamientotubinsta").val(),
            C_0401_204: $("#cmb_cuentaventilacioninsta").val(),
            C_0401_205: $("#txtespparednomventiinsta").val(),
            C_0401_206: $("#txtnomventiiinsta").val(),
            C_0401_207: $("#txtdiamextventiinsta").val(),
            coordenada_especifica: $("#coord_esp_insta_x").val() + ' ' + $("#coord_esp_insta_y").val(),
            kilometro_especifico: $("#km_esp_insta").val()
        };
        var formData = new FormData();
        Object.keys(params).forEach(key => formData.append(key, params[key]));

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
                    $('#operacionforms').show();
                    $('#instalacionesoperacionfrm').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }
}
//#endregion
//#region catalogos
//#region Tipo Lanzador
function loadtipoLanzadorOp() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_TipoLanzadorOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipolanzadorinsta").empty();
                    $('#cmb_tipolanzadorinsta').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipolanzadorinsta').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0401_145
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
function saveotroTipoLanzadorOp() {
    var webMethod = "saveTipoLanzadorOperacion";
    var params = {
        C_0401_145: $("#newTipolanzador").val(),
        descripcion: $("#newDesTipoLanzador").val()
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
                loadtipoLanzadorOp();
                $("#espTipolanzadorinsta").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotroTipoLanzador() {
    $('#espTipolanzadorinsta').show();
}
//#endregion Tipo Lanzador

//#region Tipo dispositivo
function loadtipoDispositivo() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_TipoDispositivoOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipodispositivonsta").empty();
                    $('#cmb_tipodispositivonsta').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipodispositivonsta').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0401_146
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
function saveotroTipoDispositivoOp() {
    var webMethod = "saveTipoDispositivoOperacion";
    var params = {
        C_0401_146: $("#newTipodispositivo").val(),
        descripcion: $("#newDesTipoDispositivo").val()
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
                loadtipoDispositivo();
                $("#espTipoDispositivoinsta").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrodispostivoinstaOp() {
    $('#espTipoDispositivoinsta').show();
}
//#endregion 

//#region Tipo válvula
function loadtipoValvula() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_TipoValvulaOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipovalvulainstainsta").empty();
                    $('#cmb_tipovalvulainstainsta').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipovalvulainstainsta').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0401_153
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
function saveotroTipovalvulainstalacion() {
    var webMethod = "saveTipoValvulaOperacion";
    var params = {
        C_0401_153: $("#newTipovalvulainsta").val(),
        descripcion: $("#newDesTipovalvulainsta").val()
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
                loadtipoValvula();
                $("#espTipovalvulaisntalacion").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrotipovalvulainstalacion() {
    $('#espTipovalvulaisntalacion').show();
}
//#endregion
//#region Tipo operador
function loadtipoOperador() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_TipoOperadorOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipooperadorinsta").empty();
                    $('#cmb_tipooperadorinsta').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipooperadorinsta').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0401_159
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
function saveotroTipoOperador() {
    var webMethod = "saveTipoOperadorOperacion";
    var params = {
        C_0401_159: $("#newTipooperador").val(),
        descripcion: $("#newDesTipooperador").val()
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
                loadtipoOperador();
                $("#espTipooperador").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrotipooperadorinstalacion() {
    $('#espTipooperador').show();
}
//#endregion
//#region Tipo conexión
function loadtipoConexionOp() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_TipoConexionOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipoconexinsta").empty();
                    $('#cmb_tipoconexinsta').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipoconexinsta').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0401_167
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
function saveotroTipoConexion() {
    var webMethod = "saveTipoConexionOperacion";
    var params = {
        C_0401_167: $("#newTipooconex").val(),
        descripcion: $("#newDesTipoconex").val()
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
                loadtipoConexionOp();
                $("#espTipoconex").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrotipoconex() {
    $('#espTipoconex').show();
}
//#endregion 

//#region Tipo marcador
function loadtipoMarcador() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_TipoMarcadorOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipomarcadorinsta").empty();
                    $('#cmb_tipomarcadorinsta').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipomarcadorinsta').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0401_169
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
function saveotroTipomarcador() {
    var webMethod = "saveTipoMarcadorOperacion";
    var params = {
        C_0401_169: $("#newTipoomarcador").val(),
        descripcion: $("#newDesTipomarcador").val()
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
                loadtipoMarcador();
                $("#espTipomarcador").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrotipomarcador() {
    $('#espTipomarcador').show();
}

//#endregion
//#region Tipo Tee
function loadtipoTee() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_TipoTeeOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipoteeinsta").empty();
                    $('#cmb_tipoteeinsta').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipoteeinsta').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0401_170
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
function saveotroTipoTee() {
    var webMethod = "saveTipoTeeOperacion";
    var params = {
        C_0401_170: $("#newTipotee").val(),
        descripcion: $("#newDesTipotee").val()
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
                loadtipoTee();
                $("#espTipotee").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrotipotee() {
    $('#espTipotee').show();
}
//#endregion

//#region Tipo cierre
function loadtipoCierre() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_TipoCierreOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipocierratapasinsta").empty();
                    $('#cmb_tipocierratapasinsta').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipocierratapasinsta').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0401_177
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
function saveotroTipocierretapas() {
    var webMethod = "saveTipoCierreOperacion";
    var params = {
        C_0401_177: $("#newTipocierretapas").val(),
        descripcion: $("#newDesTipocierretapas").val()
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
                loadtipoCierre();
                $("#espTipocierretapas").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrotipocierretapas() {
    $('#espTipocierretapas').show();
}
//#endregion 
//#region Tipo Brida
function loadtipoBriada() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_TipoBrigadaOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipobridainsta").empty();
                    $('#cmb_tipobridainsta').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipobridainsta').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0401_179
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
function saveotroTipobrida() {
    var webMethod = "saveTipoBrigadaOperacion";
    var params = {
        C_0401_179: $("#newTipobrida").val(),
        descripcion: $("#newDesTipobrida").val()
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
                loadtipoBriada();
                $("#espTipocbrida").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrotipobrida() {
    $('#espTipocbrida').show();
}
//#endregion

//#region Especificaciones de diseño briada
function loadtipoEspecificacionBriada() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_EspDisenioBriadaInstaOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipoespdiseniobriadainsta").empty();
                    $('#cmb_tipoespdiseniobriadainsta').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipoespdiseniobriadainsta').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0401_181
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
function saveotroTipoespdisenioBriada() {
    var webMethod = "saveEspDisenioBriadaOperacion";
    var params = {
        C_0401_181: $("#newTipoespdisenBriada").val(),
        descripcion: $("#newDesTipespdisenBriada").val()
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
                loadtipoEspecificacionBriada();
                $("#espTipoespdisenioBriada").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrotipoespdisenioBriadainsta() {
    $('#espTipoespdisenioBriada').show();
}
//#endregion
//#region Tipo medidor
function loadtipoMedidor() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_TipoMedidorOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipomedidorinsta").empty();
                    $('#cmb_tipomedidorinsta').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipomedidorinsta').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0401_182
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
function saveotroTipomedidor() {
    var webMethod = "saveTipoMedidorOperacion";
    var params = {
        C_0401_182: $("#newTipomedidor").val(),
        descripcion: $("#newDesTipmedidor").val()
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
                loadtipoMedidor();
                $("#espTipomedidor").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrotipomedidorinsta() {
    $('#espTipomedidor').show();
}
//#endregion
//#region Tipo conexión rama
function loadtipoConexionRama() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_TipoConexionRamaOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipoconexramainsta").empty();
                    $('#cmb_tipoconexramainsta').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipoconexramainsta').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0401_184
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
function saveotroTipoconexrama() {
    var webMethod = "saveTipoConexionRamaOperacion";
    var params = {
        C_0401_184: $("#newTipoconexrama").val(),
        descripcion: $("#newDesTipconexrama").val()
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
                loadtipoConexionRama();
                $("#espTipoconexrama").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrotipoconexramainsta() {
    $('#espTipoconexrama').show();
}
//#endregion
//#region Grado Codos
function loadtipoGradosCodo() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_GradoCodosInstaOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipogradocodo").empty();
                    $('#cmb_tipogradocodo').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipogradocodo').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0401_190
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
function saveotroTipogradocodo() {
    var webMethod = "saveGradoCodosOperacion";
    var params = {
        C_0401_190: $("#newTipogradocodo").val(),
        descripcion: $("#newDesTipogradocodo").val()
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
                loadtipoGradosCodo();
                $("#espTipogradocodo").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrotipocodogrado() {
    $('#espTipogradocodo').show();
}
//#endregion
//#region Especificación Diseño Codos
function loadtipoEspecificacionDisenioCodo() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_GradoCodosInstaOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipoespdiseniocodo").empty();
                    $('#cmb_tipoespdiseniocodo').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipoespdiseniocodo').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0401_194
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
function saveotroTipoespdiseniocodo() {
    var webMethod = "saveGradoCodosOperacion";
    var params = {
        C_0401_194: $("#newTipogradocodo").val(),
        descripcion: $("#newDesTipogradocodo").val()
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
                loadtipoEspecificacionDisenioCodo();
                $("#espTipoespecifidiseniocodo").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrotipoespecificacionesdiseniocodogrado() {
    $('#espTipoespecifidiseniocodo').show();
}
//#endregion

//#region Grado reductor
function loadGradoReductor() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_GradoReductorInstaOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipogradoreductor").empty();
                    $('#cmb_tipogradoreductor').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipogradoreductor').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0401_196
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
function saveotroTipogradoreductor() {
    var webMethod = "saveGradoReductorOperacion";
    var params = {
        C_0401_196: $("#newTipogradoreductor").val(),
        descripcion: $("#newDesTipogradoreductor").val()
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
                loadGradoReductor();
                $("#espTipogradoreductor").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrotipogradoreductor() {
    $('#espTipogradoreductor').show();
}
//#endregion
//#region Tipo Reductor
function loadTipoReductor() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_TipoReductorOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tiporeductor").empty();
                    $('#cmb_tiporeductor').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tiporeductor').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0401_199
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
function saveotroTiporeductor() {
    var webMethod = "saveTipoReductorOperacion";
    var params = {
        C_0401_199: $("#newTiporeductor").val(),
        descripcion: $("#newDesTiporeductor").val()
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
                loadTipoReductor();
                $("#espTiporeductor").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrotiporeductor() {
    $('#espTiporeductor').show();
}
//#endregion
//#region  Especificacion Diseño Reducor
function loadEspecificacionesDisenioReductor() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_EspReductorInstaOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipoespdisreductor").empty();
                    $('#cmb_tipoespdisreductor').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipoespdisreductor').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0401_200
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
function saveotroTipoespdisreductor() {
    var webMethod = "saveEspReductorOperacion";
    var params = {
        C_0401_200: $("#newTipoespdisreductor").val(),
        descripcion: $("#newDesTipoespdisreductor").val()
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
                loadEspecificacionesDisenioReductor();
                $("#espEspecificacionDisenioreductor").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrotipoespdisreductor() {
    $('#espEspecificacionDisenioreductor').show();
}
//#endregion
//#region  Tuberia
function loadTipoTuberia() {
    return new Promise((resolve, reject) => {
        var webMethod = "get_TuberiaRevestimientoOperacion";
        $.ajax({
            type: "GET",
            url: apiUrl + webMethod,
            success: function (data) {
                if (data.success) {
                    $("#cmb_tipoventilacion").empty();
                    $('#cmb_tipoventilacion').append($('<option>', {
                        value: 0,
                        text: 'Selecciona...'
                    }));
                    for (var i = 0; i < data.data.length; i++) {
                        $('#cmb_tipoventilacion').append($('<option>', {
                            value: data.data[i].id,
                            text: data.data[i].C_0401_201
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
function saveotroTipoventilacion() {
    var webMethod = "saveTipoTuberiaRevestimientoOperacion";
    var params = {
        C_0401_201: $("#newTipoventilacion").val(),
        descripcion: $("#newDesTipoventilacion").val()
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
                loadTipoTuberia();
                $("#espTipoventilacion").hide();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function showotrotipoventilacion() {
    $('#espTipoventilacion').show();
}
//#endregion
//#endregion
//#endregion
//#endregion



//#Operacion Documental



function cancelOperacionDocumental() {
    $('#operacionforms').show();
    $('#documentalopfrm').hide();
}


var idOpDocumental;

function fnshowOperacionDocumental(id_d=null) {
    $('#documentalopfrm').show();
    if (id_d){
        consultaDatosOpDocumental(id_d=id_d);}
       else { consultaDatosOpDocumental();}
    
    $('#operacionforms').hide();
    resetValidationClasses('documentallisisform')
   
}


function nuevoOperacionDocumental(){

    $("#btn_savedocumentos_operacion").show();
    //$("#btn_newseguridad").hide();
    $("#btn_newdocumentoss_operacion").hide();
    $("#btn_updatedocumentos_operacion").hide();
    clearInputTextValuesNew('documentalopfrm');
    clearAllFileInputsInDiv('documentalopfrm')
    inhabilitarform("#documentalopfrm", false);

}



function consultaDatosOpDocumental(id_d = null) {
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 25, "tbl_doc_operacion1");
    clearAllFileInputsInDiv('documentalopfrm')
    clearInputTextValues('documentalopfrm');
    var webMethod;
    var params;
    if (id_d) {
        webMethod = "getOperacionDocumentalById";
        params = {
            id: id_d
        };
    } else {
        webMethod = "getOperacionDocumental";
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
        
        const { id: serviceId, success:success,coordenada_especifica:coordenada_especifica,kilometro_especifico:kilometro_especifico, ...columnsData } = data;
        if (success){
        idOpDocumental=serviceId
        if (data.coordenada_especifica !== "" && data.coordenada_especifica !== null&& data.coordenada_especifica !== null) {
            const coords = data.coordenada_especifica.split(' ');
            $("#coord_esp_iden_x_operacion_documental").val(coords[0]);
            $("#coord_esp_iden_y_operacion_documental").val(coords[1]);
        }
        else{$("#coord_esp_iden_y_operacion_documental").val("");
        $("#coord_esp_iden_y_operacion_documental").val("");}    

        $("#km_esp_iden_operacion_documental").val(data.kilometro_especifico)
        Object.values(columnsData).forEach(item => {
            if (item.hasFile) {
                // Find the correct input group using the data-column attribute
                const inputGroup = document.querySelector(`.input-group[data-column="${item.column}"]`);
                const customFileDiv = inputGroup.querySelector('.custom-file');
        
                if (customFileDiv) {
                    // Create the download icon
                    const downloadIcon = document.createElement('a');
                    downloadIcon.href = `${apiUrl}operacion-documental/${serviceId}/download/${item.column}`;
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
                    destroyIcon.href = `${apiUrl}operacion-documental/${serviceId}/destroy/${item.column}`;
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
        $("#btn_updatedocumentos_operacion").text("Actualizar") 
        $("#btn_updatedocumentos_operacion").show()
        inhabilitarform("#documentalopfrm", true)
        $("#btn_savedocumentos_operacion").hide();
        //$("#btn_newseguridad").show();
        $("#btn_newdocumentoss_operacion").show();
        showDestroyIcons('documentalopfrm',false);
    }

    else {

        inhabilitarform("#documentalopfrm", false)
        $("#btn_savedocumentos_operacion").show();
        $("#btn_newdocumentoss_operacion").hide();
        $("#btn_updatedocumentos_operacion").hide();
        showDestroyIcons('documentalopfrm',false);
    }


    getNamesByAreaUnitariaId(area).then(data => {
        let area_unitaria_nombre = data.area_unitaria_nombre;
        let tramo_nombre = data.tramo_nombre;
        let ducto_nombre = data.ducto_nombre;
    
        $("#txtductogeneral").val(ducto_nombre);
        $("#txttramogeneral").val(tramo_nombre);
        $("#txtareageneral").val(area_unitaria_nombre);
        $("#txtductooperaciondocumental").val(ducto_nombre);
        $("#txttramooperaciondocumental").val(tramo_nombre);
        $("#txtareaoperaciondocumental").val(area_unitaria_nombre);


    })

    })
    .catch(error => console.error('Error fetching data:', error));
}

function saveOperacionDocumental() {


    var webMethod = "saveOpDocumental";

    const formData = new FormData();

    formData.append("kilometro_especifico",$("#km_esp_iden_operacion_documental").val() )
    formData.append("coordenada_especifica",  $("#coord_esp_iden_x_operacion_documental").val()+' '+$("#coord_esp_iden_y_operacion_documental").val(),)
    formData.append("C_0101_0001_id", area)
    // Make sure files are being selected and appended properly
    const itemsToSubstitute = [
        "historial_condiciones",
        "fase_producto",
        "presencia_cloruros",
        "cis_documentalop",
        "dcvgopdocumental",
        "perfil_potenciales",
        "mfl_opdocumental",
        "ultrasonido_haz",
        "reporte_espesores",
        "geometra_opdocumental",
        "calibracion_curvas",
        "liquidos_penetrantes",
        "ondas_guiadas",
        "inspeccion_radiografica",
        "inspeccion_muestral",
        "constancias_prueba_hermeticidad",
        "auditorias_opdocumental",
        "prueba_dielectrica",
        "reporte_insvisual",
        "prueba_neumatica",
        "perfil_resistividad",
        "ph_bpa",
        "ph_bsr",
        "inspeccion_electromagnetica",
        "determinación_resistencia",
        "atenuacion_corriente",
        "rehabilitacion_anticorrosiva"
      ];
      
      // Loop through the list and substitute "diagrama determinacion_resistencia"
      for (const item of itemsToSubstitute) {
        console.log($(`#${item}`)[0])
        if ($(`#${item}`)[0].files[0]) {
            
          formData.append(`${item}`, $(`#${item}`)[0].files[0]);
        }
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
            $("#diagramas_tuberia").val('');
            $("#planos_actualizados_ducto").val('');
            $("#certificados_materiales").val('');
            $("#planos_reportes").val('');
            $("#reportes_condiciones_seguidad").val('');
            $("#especificaciones_estandares_regulados").val('');
            $("#planes_respuesta_emergencia").val('');
            $("#registro_cumplimiento").val('');
            $("#evaluaciones_tecnicas").val('');
            $("#manuales_fabricante").val('');
            alert("Información almacenada correctamente");
            $('#operacionforms').show();
            $('#documentalopfrm').hide();
        }
    })
    .catch(error => {
        alert("Error: " + error);
    });

}

function updateOperacionDocumental() {
    if ($("#btn_updatedocumentos_operacion").text() === "Actualizar") {
        inhabilitarform("#documentalopfrm", false);
        showDestroyIcons('documentalopfrm',true);
        $("#btn_updatedocumentos_operacion").text('Guardar');
    }
    else {
        var webMethod = "updateOpDocumental";

        const formData = new FormData();
        formData.append("id", idOpDocumental)
        formData.append("kilometro_especifico",$("#km_esp_iden_operacion_documental").val() )
        formData.append("coordenada_especifica",  $("#coord_esp_iden_x_operacion_documental").val()+' '+$("#coord_esp_iden_y_operacion_documental").val(),)
        formData.append("C_0101_0001_id", area)
        // Make sure files are being selected and appended properly
        const itemsToSubstitute = [
            "historial_condiciones",
            "fase_producto",
            "presencia_cloruros",
            "cis_documentalop",
            "dcvgopdocumental",
            "perfil_potenciales",
            "mfl_opdocumental",
            "ultrasonido_haz",
            "reporte_espesores",
            "geometra_opdocumental",
            "calibracion_curvas",
            "liquidos_penetrantes",
            "ondas_guiadas",
            "inspeccion_radiografica",
            "inspeccion_muestral",
            "constancias_prueba_hermeticidad",
            "auditorias_opdocumental",
            "prueba_dielectrica",
            "reporte_insvisual",
            "prueba_neumatica",
            "perfil_resistividad",
            "ph_bpa",
            "ph_bsr",
            "inspeccion_electromagnetica",
            "determinación_resistencia",
            "atenuacion_corriente",
            "rehabilitacion_anticorrosiva"
          ];
          
          // Loop through the list and substitute "diagrama determinacion_resistencia"
          for (const item of itemsToSubstitute) {
            if ($(`#${item}`)[0].files[0]) {
              formData.append(`${item}`, $(`#${item}`)[0].files[0]);
            }
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
                $('#operacionforms').show();
                $('#documentalopfrm').hide();
                $("#btn_updatedocumentos_operacion").text("Actualizar")
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
    }
}
//#region Operación General
function nuevoOperacionGral() {

    $("#btn_saveMonitoreoCorrosion_operacion").show();
    $("#btn_newMonitoreoCorrosion_operacion").hide();
    $("#btn_updateMonitoreoCorrosion_operacion").hide();
    clearInputTextValuesNew('monitoreocorrosionoperacionfrm');
    inhabilitarform("#monitoreocorrosionoperacionfrm", false);

}
async function fnshowOperacionGeneral(id_d = null) {
    $('#generaloperacionfrm').show();
    $('#operacionforms').hide();
 
    try {
        if (id_d) {
            await consultaDatosGeneralperacion(id_d = id_d);
        }
        else {
            consultaDatosGeneralperacion();
        }

        //// If you want to do something after all functions have completed, you can do it here

    } catch (error) {
        console.error("An error occurred:", error);
    }
    resetValidationClasses('generaloperacionfrm');
}
function addpropertytotable() {
    llenarTablasGraloperacion('tbl_gral_propiedades', $("#txtdatoprop").val(), $("#cmbtipoprop").val());
    $("#txtdatoprop").val('');
    $("#cmbtipoprop").val(0);
}
function llenarTablasGraloperacion(nameTabla, propiedad, tipo) {
    // $('#tablaPersonas tbody')[0].innerHTML = "";
    var row = '<tr>';
    row = row + '<td>' + propiedad + '</td>';
    row = row + '<td>' + tipo + '</td>';
    row = row + '<td><a class="deleteprop" title="Eliminar" data-toggle="tooltip"><i class="fa fa-trash"></i></a></td>';
    row = row + '</tr>';
    $('#' + nameTabla + ' tbody').append(row);
    
}
function consultaDatosGeneralperacion(id_d = null) {
    const existingDownloadIcons = document.querySelectorAll('.download-icon, .destroy-icon');
    existingDownloadIcons.forEach(icon => icon.remove());
    get_relateddocuments(tramo, area, 19, "tbl_gralOperacion");
    var webMethod;
    var params;
    if (id_d) {
        webMethod = "getGeneralOperacionById";
        params = {
            id: id_d
        };
    }

    else {

        webMethod = "get_OperacionGral";
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
                var infodata;
                if (webMethod === "getGeneralOperacionById")
                    infodata = (data.data);
                else if (webMethod === "get_OperacionGral")
                    infodata = (data.data.datagrid);
                if (infodata.length > 0) {
                    if (webMethod === "getGeneralOperacionById")
                        llenarDatosGeneralOperacion(infodata);
                    else if (webMethod === "get_OperacionGral")
                        llenarDatosGeneralOperacion(infodata);
                    $("#btn_saveconsgeneralOp").hide();
                    $("#btn_updateconsgeneralOp").show();
                    $("#btn_newconsgeneralOp").show();
                }
                else {
                    clearInputTextValues('generaloperacionfrm');
                    inhabilitarform("#generaloperacionfrm", false)
                    $("#btn_saveconsgeneralOp").show();
                    $("#btn_updateconsgeneralOp").hide();

                }

                getNamesByAreaUnitariaId(area).then(data => {
                    let area_unitaria_nombre = data.area_unitaria_nombre;
                    let tramo_nombre = data.tramo_nombre;
                    let ducto_nombre = data.ducto_nombre;

                    $("#txtductogeneraloperacion").val(ducto_nombre);
                    $("#txttramogeneraloperacion").val(tramo_nombre);
                    $("#txtareageneraloperacion").val(area_unitaria_nombre);
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });


}
var idGeneralOp;
function llenarDatosGeneralOperacion(data) {

    $("#btn_updateconsgeneralOp").text('Actualizar');
    if (data[0].coordenada_especifica !== "" && data[0].coordenada_especifica !== null) {
        const coords = data[0].coordenada_especifica.split(' ');
        $("#coord_esp_gralop_x").val(coords[0]);
        $("#coord_esp_gralopl_y").val(coords[1]);
    }
    else {
        $("#coord_esp_gralop_x").val("");
        $("#coord_esp_gralopl_y").val("");
    }
    $("#km_esp_gralop").val(data[0].kilometro_especifico);
    $("#txtvolumentrans").val(data[0].C_0403_211);
    $("#cmbcrucesotrosductos option:contains(" + data[0].C_0414_253 + ")").attr('selected', 'selected');
    $('#tbl_gral_propiedades tbody')[0].innerHTML = "";
    data.forEach(function (da) {
        llenarTablasGraloperacion('tbl_gral_propiedades', da.dato_propiedad, da.tipo_propiedad);
    });
    idGeneralOp = data[0].id;
    inhabilitarform("#generaloperacionfrm", true);
}
function saveGeneralOp() {
    var webMethod = "createGeneralOp";
    const formData = new FormData();
    formData.append("C_0101_0001_id", area);
    formData.append("C_0403_211", $("#txtvolumentrans").val());
    formData.append("C_0414_253", $("#cmbcrucesotrosductos").val());
    formData.append("kilometro_especifico", $("#km_esp_gralop").val());
    formData.append("coordenada_especifica", $("#coord_esp_gralop_x").val() + ' ' + $("#coord_esp_gralopl_y").val());
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
                saveGeneralDetalleOp(data.datos.id);
                // alert("Información almacenada correctamente");

            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function saveGeneralDetalleOp(idproperty) {
    var webMethod = "saveDetailProperties";
    const formData = new FormData();
    var datainfo = [];
    var tipoprop = [];
    $('#tbl_gral_propiedades tr').each(function (indexFila) {
        $(this).children('td').each(function (indexColumna) {
            if (indexColumna === 0) {
                campo1 = $(this).text();
                datainfo.push(campo1);
            };
            if (indexColumna === 1) {
                campo1 = $(this).text();
                tipoprop.push(campo1);
            };
        });
    });
    datainfo.forEach((data) => {
        formData.append("propertydata[]", data);
    });
    tipoprop.forEach((tipo) => {
        formData.append("property[]", tipo);
    });
    formData.append("property_id", idproperty);
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
                //console.log(data.datos.id);
                alert("Información almacenada correctamente");
                $('#generaloperacionfrm').hide();
                $('#operacionforms').show();
            }
        })
        .catch(error => {
            alert("Error: " + error);
        });
}
function updateOperacionGeneral() {


    if ($("#btn_updateconsgeneralOp").text() === "Actualizar") {
        inhabilitarform("#generaloperacionfrm", false)
        $("#btn_updateconsgeneralOp").text('Guardar');
        showDestroyIcons('generaloperacionfrm', true);
    }
    else {
        var params = {
        };
        var webMethod = "";
        webMethod = "updateGeneralOpProperties";
        const formData = new FormData();
        var datainfo = [];
        var tipoprop = [];
        $('#tbl_gral_propiedades tr').each(function (indexFila) {
            $(this).children('td').each(function (indexColumna) {
                if (indexColumna === 0) {
                    campo1 = $(this).text();
                    datainfo.push(campo1);
                };
                if (indexColumna === 1) {
                    campo1 = $(this).text();
                    tipoprop.push(campo1);
                };
            });
        });
        datainfo.forEach((data) => {
            formData.append("propertydata[]", data);
        });
        tipoprop.forEach((tipo) => {
            formData.append("property[]", tipo);
        });
        formData.append("id", idGeneralOp);
        formData.append("property_id", idGeneralOp);
        formData.append("C_0101_0001_id", area);
        formData.append("C_0403_211", $("#txtvolumentrans").val());
        formData.append("C_0414_253", $("#cmbcrucesotrosductos").val());
        formData.append("kilometro_especifico", $("#km_esp_gralop").val());
        formData.append("coordenada_especifica", $("#coord_esp_gralop_x").val() + ' ' + $("#coord_esp_gralopl_y").val());
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
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
                    $('#operacionforms').show();
                    $('#generaloperacionfrm').hide();
                }
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }
}
function cancelGeneralOp() {
    $('#generaloperacionfrm').hide();
    $('#operacionforms').show();
}
//#endregion