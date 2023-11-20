$(function(){
  getCiudades(); 
  getTipo(); 
  hideLoader();
})

function hideLoader(){
  $(".loader").fadeOut("slow");
}

$('#mostrarTodos').on('click', function(){
  $('.progress').show() 
  buscarItem(false); 
})

$('#formulario').on('submit', function(event){
  event.preventDefault(); 
  $('.progress').show() 
  buscarItem(true); 
})

function getCiudades(){ 
  $.ajax({
    url:'./ciudades.php', 
    type: 'GET', 
    data:{},
    success:function(ListCiudad){  
      ListCiudad = validateJson(ListCiudad, 'Ciudad')
      $.each(ListCiudad, function( index, value ) { 
        $('#selectCiudad').append(
          '<option value="'+value+'">'+value+'</option>')  
      });
    }
  }).done(function(){
    $('select').material_select();
  })
}

function getTipo(){ 
  $.ajax({
    url:'./tipo.php', 
    type: 'GET', 
    data:{}, 
    success:function(ListTipo){ 
      ListTipo = validateJson(ListTipo, 'Tipo')
      $.each(ListTipo, function( index, value ) { 
        $('#selectTipo').append('<option value="'+value+'">'+value+'</option>')  
      });
    },
  }).done(function(){
    $('select').material_select();
  })
}

function validateJson(validateJson, lista){
  try { 
    var validateJson = JSON.parse(validateJson) 
    return validateJson
  } catch (e) {
    getError('','SyntaxError '+lista); 
    }
}

function buscarItem(filter){
  if($('.colContenido > .item') != 0){ 
    $('.colContenido > .item').detach() 
  }
  var filtro = getFiltros(filter)
  $.ajax({
    url:'./buscador.php', 
    type: 'GET', 
    data:{filtro}, 
    success:function(items, textStatus, errorThrown ){ 
    
      
      try {
        item = JSON.parse(items); 
      } catch (e) {
        getError(500,'SyntaxError'); 
      }

      $.each(item, function(index, item){ 
        $('.colContenido').append( 
          '<div class="col s12 item">'+
            '<div class="card itemMostrado">'+
              '<img src="./img/home.jpg">'+
                '<div class="card-stacked">'+
                  '<div class="card-content">'+
                    '<p><b>Direccion: </b>'+item.Direccion+'</p>'+ 
                    '<p><b>Ciudad: </b>'+item.Ciudad+'</p>'+ 
                    '<p><b>Teléfono: </b>'+item.Telefono+'</p>'+ 
                    '<p><b>Código postal: </b>'+item.Codigo_Postal+'</p>'+ 
                    '<p><b>Tipo: </b>'+item.Tipo+'</p>'+ 
                    '<p><b>Precio: </b><span class="precioTexto">'+item.Precio+'</span></p>'+ 
                  '</div>'+
                  '<div class="card-action">'+
                    '<a href="#">Ver más</a>'+
                  '</div>'+
                '</div>'+
            '</div>'+
          '</div>'
        )
      })
    },
  }).done(function(){ 
    var totalItems = $('.colContenido > .item').length 
    $('.tituloContenido.card > h5').text("Resultados de la búsqueda: "+ totalItems + " items" )
    $('.progress').hide() 
  }).fail(function( jqXHR, textStatus, errorThrown ){ 
      getError(jqXHR, textStatus) 
  })
}

function getFiltros(filter){
  var rango = $('#rangoPrecio').val(), 
  rango = rango.split(";") 

  if (filter == false){ 
    var getCiudad = '',
        getTipo = '',
        getPrecio = ''
  }else{
    var getPrecio = rango, 
        getCiudad = $('#selectCiudad option:selected').val(), 
        getTipo = $('#selectTipo option:selected').val()
  }

    var filtro = { 
      Precio:getPrecio,
      Ciudad: getCiudad,
      Tipo: getTipo
    }

  return filtro; 
}
