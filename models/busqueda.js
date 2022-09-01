const axios = require('axios');

class Busqueda {

    constructor() { }

    async obtenerPersonajes(personaje = '') {

        try {

            const instance = axios.create({
                baseURL: `https://www.superheroapi.com/api.php/${process.env.SUPERHERO_APIKEY}/search/${personaje}`
            });

            const { data } = await instance.get();

            if (data.response === 'error') {
                return console.log(`\nERROR: ${data.error}\n`.toUpperCase().red);
            }

            const { results: personajesArr } = data;

            return personajesArr.map(personaje => ({

                id: personaje.id,
                nombre: personaje.name,
                biografia: personaje.biography,
                trabajo: personaje.work,
                img: personaje.image,
                apariencia: personaje.appearance

            }));

        } catch (err) {
            return console.log(err);;
        }

    }

}

module.exports = Busqueda;