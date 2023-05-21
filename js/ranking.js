let tabla = document.querySelector('#tabla');

document.addEventListener('DOMContentLoaded', function () {
    const URL = '../json/jugadores.json';
    let jugadores;
    let nuevaLinea;
    let nuevaCabecera;
    let nombre;
    let puntos;
    let jugados;
    let ganados;
    let longitud;
    var anchoPantalla = window.matchMedia("(max-width: 768px)");

    fetch(URL)
        .then(response => response.json())
        .then(repos => {
            jugadores = repos.map(docJson => docJson);

            longitud = jugadores.length;
            jugadores.sort((a, b) => b.puntos - a.puntos);//Orden

            for (let i = 0; i < longitud; i++) {
                nuevaLinea = document.createElement('tr');
                nuevaCabecera = document.createElement('th');
                nuevaCabecera.innerText = i + 1;

                nombre = document.createElement('td');
                nombre.innerText = jugadores[i].nombre;

                puntos = document.createElement('td');
                puntos.innerText = jugadores[i].puntos;

                jugados = document.createElement('td');
                jugados.innerText = jugadores[i].partidosJugados;

                ganados = document.createElement('td');
                ganados.innerText = jugadores[i].partidosGanados;

                nuevaLinea.appendChild(nuevaCabecera);
                nuevaLinea.appendChild(nombre);
                nuevaLinea.appendChild(puntos);
                nuevaLinea.appendChild(jugados);
                nuevaLinea.appendChild(ganados);

                tabla.appendChild(nuevaLinea);
            }

        })
        .catch(err => console.log(err));

    function myFunction(anchoPantalla) {
        if (anchoPantalla.matches) { // If media query matches
            document.getElementById('menuResponsive').style.display = 'flex';
            document.getElementById('cabecera').style.display = 'none';
        } else {
            document.getElementById('menuResponsive').style.display = 'none';
            document.getElementById('cabecera').style.display = 'flex';
        }
    }

    myFunction(anchoPantalla) // Call listener function at run time
    anchoPantalla.addListener(myFunction) // Attach listener function on state changes

});