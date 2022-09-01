require('dotenv').config();

const { imageToAscii } = require('./helpers/imgToAcii');
const {
    menuPrincipal,
    pausa,
    leerInput,
    listaPersonajes,
    confirmar
} = require("./helpers/inquirer");
const Busqueda = require("./models/busqueda");


const main = async () => {


    const busqueda = new Busqueda();

    let opcion;

    do {

        opcion = await menuPrincipal();

        switch (opcion) {
            case 1:
                //Ingresar Personaje
                const personajeBuscado = await leerInput('Busque un personaje');

                //Buscar Personaje
                const resultadoBusqueda = await busqueda.obtenerPersonajes(personajeBuscado);

                //Mostrar resultado
                const idSeleccionado = await listaPersonajes(resultadoBusqueda);
                if (idSeleccionado === 0) continue;

                //Mostrar personaje seleccionado
                const personajeSeleccionado = await resultadoBusqueda.find(personaje => personaje.id === idSeleccionado);

                //Mostrar Resultados
                const { nombre, biografia, trabajo, img, apariencia } = personajeSeleccionado;

                const urlIMG = img.url;

                console.clear();
                console.log('====================');
                console.log(nombre);
                console.log('====================');

                console.log('Full-Name:', biografia['full-name']);
                console.log(`Work: ${trabajo.occupation} - ${trabajo.base}`);
                console.log('Apariencia:');
                console.log(apariencia.gender);
                console.log(apariencia.race);
                console.log(apariencia.height);
                console.log(apariencia.weight);
                console.log(urlIMG);

                const verImagen = await confirmar('¿Ver Imagen?');
                if (verImagen) {
                    console.log('CARGANDO IMAGEN...'.green);
                    imageToAscii(urlIMG);
                    console.clear();
                }

                break;
            case 2:
                console.log({ opcion });
                break;
        }

        if (opcion !== 0) await pausa();

    } while (opcion !== 0);

}

main();