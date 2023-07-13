var apiUrl = "http://201.137.227.60/cenagas/backend/public/api/"; // la url del api guardada en el config.json de la aplicacion
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
                    text: 'Selecciona!...'
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
                    text: 'Selecciona!...'
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
                    text: 'Selecciona!...'
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
                    text: 'Selecciona!...'
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
                    text: 'Selecciona!...'
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
}
function fnFinalizar() {
    //document.getElementById('registro').style.display = 'none';
    //document.getElementById('mnuForm').style.display = 'block';
    $('#registro').hide();
    $('#forms').show();
   
   
}
function fnshowIndentificacion() {
    $('#identificacionfrm').show();
    $('#disenioforms').hide();
    loadtipocostura();
    loadtipomaterialdisenio();
}
function fnshowServicio() {
    $('#serviciofrm').show();
    $('#disenioforms').hide();
}
function fnshowPresion() {
    $('#presionfrm').show();
    $('#disenioforms').hide();
}
function fnshowProteccion() {
    $('#proteccionfrm').show();
    $('#disenioforms').hide();
}
function fnshowdisenioforms() {
    $('#disenioforms').show();
    $('#forms').hide();
    $("#txtductogeneral").val(txtducto);
    $("#txttramogeneral").val(txttramo);
    $("#txtareageneral").val(txtarea);
    $("#txtductopresion").val(txtducto);
    $("#txttramopresion").val(txttramo);
    $("#txtareapresion").val(txtarea);
    $("#txtductoproteccion").val(txtducto);
    $("#txttramoproteccion").val(txttramo);
    $("#txtareaproteccion").val(txtarea);
    $("#txtductoservicio").val(txtducto);
    $("#txttramoservicio").val(txttramo);
    $("#txtareaservicio").val(txtarea);
}
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
        console.log(tabName)
        loadDuctos();
       
    }

    
}
function loadtipocostura() {
    var webMethod = "get_tipocostura";
    $.ajax({
        type: "GET",
        url: apiUrl + webMethod,
        success: function (data) {
            if (data.success) {
                console.log(data.data);
                $("#cmbTipoCostura").empty();
                $('#cmbTipoCostura').append($('<option>', {
                    value: 0,
                    text: 'Selecciona!...'
                }));
                for (var i = 0; i < data.data.length; i++) {
                    $('#cmbTipoCostura').append($('<option>', {
                        value: data.data[i].id,
                        text: data.data[i].C_0208_0029
                    }));
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}
function loadtipomaterialdisenio() {
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
                    text: 'Selecciona!...'
                }));
                for (var i = 0; i < data.length; i++) {
                    $('#cmbTipoMaterial').append($('<option>', {
                        value: data[i].id,
                        text: data[i].C_0204_0011
                    }));
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
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
                    text: 'Selecciona!...'
                }));
                for (var i = 0; i < data.length; i++) {                  
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
function reg_newArea() {
    reiniciarForms();
}
function reiniciarForms() {
    $('#registro').show();
    $('#forms').hide();
    $('#step-1').show();
    $('#step-2').hide();
    $('#step-3').hide();
    $('#disenioforms').hide();
    loadDuctos();
    $("#cmbTramo").empty();
    $('#cmbTramo').append($('<option>', {
        value: 0,
        text: 'Selecciona!...'
    }));
    $("#cmbAreas").empty();
    $('#cmbAreas').append($('<option>', {
        value: 0,
        text: 'Selecciona!...'
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
    var params = {
        area_unitaria_id: area,
        longitud: $("#longitud").val(),
        diametro_mm: $("#diam_in").val(),
        diametro_in: $("#diam_in").val(),
        espesor_mm: $("#esp_mm").val(),
        espesor_in: $("#esp_in").val(),
        tipo_material_disenio: $("#cmbTipoMaterial").val(),
        temp_c: $("#temp_c").val(),
        temp_f: $("#temp_f").val(),
        tipo_costura: $("#cmbTipoCostura").val(),
        fecha_fab: $("#fec_fab").val(),
        porcentaje_carbono: $("#porc_carbono").val(),
        resistencia_traccion: $("#res_trac").val(),
        resistencia_elastico: $("#lim_elas").val(),
        coordenada_especifica: $("#coord_esp_iden").val(),
        kilometro_especifico: $("#km_esp_iden").val(),
        fec_fab_fin: $("#fec_fab_fin").val()
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
            $('#disenioforms').show();
            $('#identificacionfrm').hide();
            loadidentificacion();

        }
    })
    .catch(error => {
        alert("Error: " + error);
    });
}







function saveDisenioPresion()  {
    var webMethod = "savePresion";
    var params = {
        area_unitaria_id: area,
        entidad: $("#cmbEntidad").val(),
        fecha_calculo: $("#txtfechacalculo").val(),
        metodo_calculo: $("#txtMetodoCalculo").val(),
        presion_nom_psi: $("#txtPresNomPSI").val(),
        presion_nom_kg: $("#txtPresNomKG").val(),
        presion_dis_psi: $("#txtPresDisenio").val(),
        presion_max_psi: $("#txtPresMaxPSI").val(),
        presion_max_kg: $("#txtPresMaxKG").val(),
        presion_red_psi: $("#txtPresRedPSI").val(),
        presion_red_kg: $("#txtPresRedKG").val(),
        coordenada_especifica: $("#coord_esp_iden_pres").val(),
        kilometro_especifico: $("#km_esp_iden_pres").val()

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
            $('#disenioforms').show();
            $('#presionfrm').hide();
        }
    })
    .catch(error => {
        alert("Error: " + error);
    });
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
        aislamiento_electrico: $("#txtaislamientoelec").val(),
        control_corrosion: $("#txtcontrolcorrosion").val(),
        coordenada_especifica: $("#coord_esp_iden_prot").val(),
        kilometro_especifico: $("#km_esp_iden_prot").val()

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
            $('#disenioforms').show();
            $('#proteccionfrm').hide();
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
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}

function consulta() {


    $('#tablaPersonas tbody')[0].innerHTML = "";
    var params = {
        area_unitaria_id: $("#cmbAreas_con").val()
    };
    var webMethod = "get_diseniogeneral";
    $.ajax({
        type: "POST",
        url: apiUrl + webMethod,
        data: params,
        success: function (data) {
            if (data.success) {
                for (i = 0; i < data.data.length; i++) {
                    var persona = [data.data[i].nombre, data.data[i].C_0201_0006, data.data[i].C_0202_0007, data.data[i].C_0204_0011,
                    data.data[i].C_0208_0029,];
                    llenarTablas(persona, "tablaPersonas");
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
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
                    var persona = [data.data[i].nombre, data.data[i].C_0201_0006, data.data[i].C_0202_0007, data.data[i].C_0204_0011,
                        data.data[i].C_0208_0029, ];
                    llenarTablas(persona, "tablaPersonas");
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}

function llenarTablas(obj, nameTabla) {

    var row = '<tr>';
    for (j = 0; j < obj.length; j++) {
        row = row + '<td>' + obj[j] + '</td>';
    } 
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