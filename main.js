'use strict'   
const card_image = document.querySelector(".content-list");
const form = document.querySelector(".form")

document.addEventListener("DOMContentLoaded", function(){

  recarga()

  if (!card_image.classList.contains('card__image-left')) {

    console.log("no trae nada")
  }else{
    card_image.click();
    console.log("Ejecuta")
  }
 
 
});

card_image.addEventListener("dblclick",async function(event){
    // Verifica si algún elemento ascendente tiene la clase .check
    const checkElement = event.target.closest(".card__image-left");
    if (checkElement) {
        const dataId = checkElement.getAttribute("data-id");
        const estado = checkElement.getAttribute("estado");
        if (dataId !== null) {
            
           let carga = await modificarEstadoTarea(dataId ,estado)
            console.log(carga);
            recarga();
        }
    }


  console.log("hice click");
});

function recarga(async){
  const lista = document.querySelector(".content-list")
  fetch('http://localhost:3001/items')
  .then(response => {
      if (!response.ok) {
          throw new Error('Error en la solicitud');
      }
      return response.json();
  })
     .then(data => {
      let templateList = '';
      data.forEach(function(item) {
          let lcEstado = item.estado === 1 ? './img/cheque.png' : './img/boton-x.png';
          const imageElement = item.imagen ? `<img class="card__image-rigth" src="data:image/png;base64,${item.imagen}" alt="Imagen" data-id="${item.ID}">`   : '';
          const listItem = `
          <li class="content-list__item">              
              <picture class="content-list__img-left">
                  <img id="card-image" src="${lcEstado}" alt="Estado" class="card__image-left" data-id="${item.ID}" estado="${item.estado}">
              </picture>
              <span> ${item.nombre} </span>
              <picture class="content-list__img-rigth">
                  <a href="#">
                      ${imageElement}
                  </a>
              </picture>        
          </li>`;
          templateList += listItem;
      });

      lista.innerHTML = templateList; // Agrega a listItemsContainer
  });
}

async function modificarEstadoTarea(id, nuevoEstado) {
  nuevoEstado = nuevoEstado == 0 ? 1 : 0;
 // console.log("Nuevo estado:", nuevoEstado); 
 // console.log(id);

let actualiza = await fetch(`http://localhost:3001/items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "estado": nuevoEstado }),
   
  })
  .then(response => {
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      return response.json();
    })
    .then(data => {
      console.log(data.message);
     
    })
    .catch(error => {
      console.log("Error:", Error);
    
    });
}

form.addEventListener("submit", async function(event) {
  event.preventDefault(); // Evita el comportamiento predeterminado del formulario
  
  const nombre = form.querySelector('input[name="nombre"]').value;
  const imagen = form.querySelector('input[name="imagen"]').files[0];
  console.log(nombre +""+ imagen)
  const formData = new FormData();
  formData.append('nombre', nombre);
  formData.append('imagen', imagen);
  
  try {
    const response = await fetch('http://localhost:3001/items', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      console.log('Tarea creada exitosamente');
    } else {
      console.error('Error al crear la tarea');
    }
  } catch (error) {
    console.error('Error de red:', error);
  }


})