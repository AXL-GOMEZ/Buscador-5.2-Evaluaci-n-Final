<?php
function readData(){
  $datajson = fopen('./data-1.json', 'r'); 
  $data = fread($datajson, filesize('./data-1.json')); 
  $data = json_decode($data, true); 
  fclose($datajson);
  return ($data);
};


function getCiudades($getData){ 
  $getCiudades = Array(); 
  foreach ($getData as $Ciudades => $Ciudad) { 
    if(in_array($Ciudad['Ciudad'], $getCiudades)){ 
  
    }else{
      array_push($getCiudades, $Ciudad['Ciudad']); 
    }
  }
  echo json_encode($getCiudades); 
}

function getTipo($getData){ 
  $getTipo = Array(); 
  foreach ($getData as $tipos => $tipo) { 
    if(in_array($tipo['Tipo'], $getTipo)){ 
     
    }else{
      array_push($getTipo, $tipo['Tipo']); 
    }
  }
  echo json_encode($getTipo); 
}
function precioNumero($itemPrecio){ 
  $precio = str_replace('$','',$itemPrecio); 
  $precio = str_replace(',','',$precio); 
  return $precio; 
}

function filterData($filtroCiudad, $filtroTipo, $filtroPrecio,$data){
  $itemList = Array(); 
  if($filtroCiudad == "" and $filtroTipo=="" and $filtroPrecio==""){ 
    foreach ($data as $index => $item) {
      array_push($itemList, $item); 
    }
  }else{ 

    $menor = $filtroPrecio[0]; 
    $mayor = $filtroPrecio[1]; 

      if($filtroCiudad == "" and $filtroTipo == ""){ 
        foreach ($data as $items => $item) {
            $precio = precioNumero($item['Precio']);
        if ( $precio >= $menor and $precio <= $mayor){ 
            array_push($itemList,$item ); 
          }
        }
      }

      if($filtroCiudad != "" and $filtroTipo == ""){ 
          foreach ($data as $index => $item) {
            $precio = precioNumero($item['Precio']);
            if ($filtroCiudad == $item['Ciudad'] and $precio > $menor and $precio < $mayor){ 
              array_push($itemList,$item ); 
            }
        }
      }

      if($filtroCiudad == "" and $filtroTipo != ""){ 
          foreach ($data as $index => $item) {
            $precio = precioNumero($item['Precio']);
            if ($filtroTipo == $item['Tipo'] and $precio > $menor and $precio < $mayor){ 
              array_push($itemList,$item ); 
            }
        }
      }

      if($filtroCiudad != "" and $filtroTipo != ""){ 
          foreach ($data as $index => $item) {
            $precio = precioNumero($item['Precio']);
            if ($filtroTipo == $item['Tipo'] and $filtroCiudad == $item['Ciudad'] and $precio > $menor and $precio < $mayor){ 
              array_push($itemList,$item ); 
            }
        }
      }


  }
  echo json_encode($itemList); 
};


?>
