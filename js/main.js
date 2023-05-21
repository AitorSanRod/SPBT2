document.addEventListener('DOMContentLoaded', function () {
    const URL = 'json/parejas.json';
    let docJsonParejas;
    var anchoPantalla = window.matchMedia("(max-width: 768px)");

    fetch(URL)
        .then(response => response.json())
        .then(repos => {
            docJsonParejas = repos.map(docJson => docJson);
            docJsonParejas.sort((a, b) => b.puntos - a.puntos);//Orden

            for (let i = 0; i < docJsonParejas.length; i++) {
                document.getElementById('pareja' + i).innerText = docJsonParejas[i].pareja;
                document.getElementById('ganados' + i).innerText = docJsonParejas[i].partidosGanados;
                document.getElementById('puntos' + i).innerText = docJsonParejas[i].puntos;
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