document.addEventListener('DOMContentLoaded', function () {
    const URL = '../json/calendario.json';
    let jsonCalendario;
    var anchoPantalla = window.matchMedia("(max-width: 1400px)");
    let aplicacion = document.getElementById('calendario');
    let partidos;
    let carta;
    let encabezado;
    let jornada;
    let fecha;
    let lista;
    let indiceLista;
    let pareja;
    let estado;

    fetch(URL)
        .then(response => response.json())
        .then(repos => {
            jsonCalendario = repos.map(docJson => docJson);

            for (let i = 0; i < jsonCalendario.length; i++) {
                //Crear carta y dar props
                carta = document.createElement('div');
                carta.className = 'card my-3';

                //Crear encabezado
                encabezado = document.createElement('div');
                encabezado.className = 'card-body';

                //Creo jornada y fecha
                jornada = document.createElement('h3');
                jornada.innerText = `Jornada ${jsonCalendario[i].jornada}`;
                jornada.classList = 'card-title text-center';
                fecha = document.createElement('p');
                fecha.innerText = `Límite: ${jsonCalendario[i].fecha}`;
                fecha.className = 'text-center';

                encabezado.append(jornada);
                encabezado.append(fecha);
                //Añadir encabezado a la carta
                carta.append(encabezado);

                partidos = jsonCalendario[i].partidos;
                lista = document.createElement('ul');
                lista.classList.add('list-group');
                lista.classList.add('list-group-flush');

                for (let j = 0; j < partidos.length; j++) {
                    indiceLista = document.createElement('li');
                    indiceLista.className = 'list-group-item';
                    pareja = document.createElement('p');
                    estado = document.createElement('p');

                    pareja.className = 'text-center fw-bold';
                    estado.className = 'text-center';

                    pareja.innerText = partidos[j].parejas;
                    estado.innerText = partidos[j].estado;

                    if (estado.innerText == 'Pendiente') {
                        estado.style = 'color: red;';
                    } else if (estado.innerText == 'Jugado') {
                        estado.style = 'color: green;';
                    } else {
                        estado.style = 'color: black;';
                    }

                    indiceLista.append(pareja);
                    indiceLista.append(estado);
                    lista.append(indiceLista);
                    carta.append(lista);
                }

                //Final:
                aplicacion.append(carta);
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