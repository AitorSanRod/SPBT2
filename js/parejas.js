document.addEventListener('DOMContentLoaded', function () {
    const URL = '../json/parejas.json';
    let docJsonParejas;
    let jugadorUno;
    let jugadorDos;
    var anchoPantalla = window.matchMedia("(max-width: 1400px)");

    fetch(URL)
        .then(response => response.json())
        .then(repos => {
            docJsonParejas = repos.map(docJson => docJson);

            for (let i = 0; i < docJsonParejas.length; i++) {
                document.querySelector('#nombrePareja' + i).innerText = docJsonParejas[i].pareja;
                document.querySelector('#textoPareja' + i).innerText = docJsonParejas[i].texto;
                jugadorUno = docJsonParejas[i].jugadores[0];
                jugadorDos = docJsonParejas[i].jugadores[1];
                document.querySelector('#jugadores' + i).innerText = `${jugadorUno} y ${jugadorDos}`;
                document.querySelector('#puntos' + i).innerText = docJsonParejas[i].puntos;
                document.querySelector('#partidos' + i).innerText = docJsonParejas[i].partidosGanados;
                document.querySelector('#img' + i).src = docJsonParejas[i].imagen;
            }

        })
        .catch(err => console.log(err));

    function myFunction(anchoPantalla) {
        if (anchoPantalla.matches) { // If media query matches
            document.getElementById('menuResponsive').style.display = 'flex';
            document.getElementById('cabecera').style.display = 'none';
            document.getElementById('listaEquipos').className = 'row w-100 justify-content-center';
        } else {
            document.getElementById('menuResponsive').style.display = 'none';
            document.getElementById('cabecera').style.display = 'flex';
            document.getElementById('listaEquipos').className = 'row w-100';
        }
    }

    myFunction(anchoPantalla) // Call listener function at run time
    anchoPantalla.addListener(myFunction) // Attach listener function on state changes
});