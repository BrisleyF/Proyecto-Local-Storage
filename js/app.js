// variable 
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];



// event listeners 
eventListeners();

function eventListeners() {
    // cuando el usuario agrega un nuevo tweets
    formulario.addEventListener("submit", agregarTweet );

    // cuando el documento esta listo 
    document.addEventListener("DOMContentLoaded", () => {
        tweets = JSON.parse( localStorage.getItem("tweets")) || [];

        console.log(tweets);

        crearHTML();
    })
}




// funciones
function agregarTweet(e) {
    e.preventDefault();

    // textarea donde el usuario escribe 
    const tweet = document.querySelector("#tweet").value;

    // validacion
    if(tweet === "") {
        mostrarError("un mensaje no puede ir vacio");
        return; // evita que se ejecute mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // añadir al arreglo de tweets 
    tweets = [...tweets, tweetObj];

    // una vez agregado vamos a crear el html
    crearHTML();

    // resetear el formulario
    formulario.reset();
}

// mostrar mensaje de error 
function mostrarError(error) {

    const mostrarError = document.createElement("p");
    mostrarError.textContent = error;
    mostrarError.classList.add("error");

    // insertando en el contenido 
    const contenido = document.querySelector("#contenido");
    contenido.appendChild(mostrarError);

    setTimeout(() => {
        mostrarError.remove();
    }, 3000);
}

// muestra un listado de los tweets
function crearHTML() {

    limpairHTML();

    if( tweets.length > 0 ) {
        tweets.forEach (tweet => {

            // agregar un boton de eliminar 
            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar-tweet");
            btnEliminar.innerHTML = "X";

            // añadir la funcion de eliminar 
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //crear el html
            const li = document.createElement("li");

            // añadir texto
            li.innerHTML = tweet.tweet;

            // asignar el boton 
            li.appendChild(btnEliminar);

            //insertar en el html
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// le agrega los tweets actuales a local storage
function sincronizarStorage() {
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

// eliminar un tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id );

    crearHTML();
}

// limpair el html
function limpairHTML() {
    while( listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

