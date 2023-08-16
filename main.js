"use strict";
const toggleButton = document.querySelector(".toggle-button");
const sidebar = document.querySelector(".nav-list");
const listItems = document.querySelector(".list-items");
const  cargItems= document.querySelector(".carga");
const  formcarga= document.querySelector(".conteiner-carga");
const form = document.getElementById('article-form');





document.addEventListener("DOMContentLoaded",async function() {

    recarga();

}); 
function recarga(){
    fetch('http://localhost:3000/items')
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

            const imageElement = item.imagen
                ? `<img class="item-img" src="data:image/png;base64,${item.imagen}" alt="Imagen" data-id="${item.ID}">`
                : '';

            const listItem = `
                <li class="item">
                    <div class="conteiner-list">
                        <img src="${lcEstado}" alt="Estado" class="check" data-id="${item.ID}" estado="${item.estado}">
                        <span>${item.nombre}</span>
                        ${imageElement}
                    </div>
                </li>`;

            templateList += listItem;
        });

        listItemsContainer.innerHTML = templateList; // Agrega a listItemsContainer
    });
}




    toggleButton.addEventListener("click", function() {
    console.log("hiciste click click");
    if (sidebar.classList.contains("open")) {
        console.log("Entro");
        sidebar.classList.remove("open"); // Cierra el sidebar si ya está abierto
    } else {
        console.log("NO Entro");
        sidebar.classList.add("open"); // Abre el sidebar si está cerrado
    }
    });

    cargItems.addEventListener("click", function() {
        console.log("hiciste click click");
        if (formcarga.classList.contains("abre")) {
            console.log("Entro");
            formcarga.classList.remove("abre"); // Cierra el sidebar si ya está abierto
        } else {
            console.log("NO Entro");
            formcarga.classList.add("abre"); // Abre el sidebar si está cerrado
        }
    });

    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Evita el comportamiento predeterminado del formulario
        
        const nombre = form.querySelector('input[name="nombre"]').value;
        const imagen = form.querySelector('input[name="imagen"]').files[0];
        console.log(nombre +""+ imagen)
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('imagen', imagen);
        
        try {
          const response = await fetch('http://localhost:3000/items', {
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

      
    });

    const listItemsContainer = document.querySelector(".list-items");
    listItemsContainer.addEventListener("dblclick",async function(event) {
        // Verifica si algún elemento ascendente tiene la clase .check
        const checkElement = event.target.closest(".check");
        if (checkElement) {
            const dataId = checkElement.getAttribute("data-id");
            const estado = checkElement.getAttribute("estado");
            if (dataId !== null) {
                
               let carga = await modificarEstadoTarea(dataId ,estado)
                console.log("se actualizo");
                recarga();
            }
        }
       
    });

   async function modificarEstadoTarea(id, nuevoEstado) {
        nuevoEstado = nuevoEstado == 0 ? 1 : 0;
        console.log("Nuevo estado:", nuevoEstado); 
        console.log(id);

      let actualiza = await  fetch(`http://localhost:3000/items/${id}`, {
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
      

     


   
  
 



   

