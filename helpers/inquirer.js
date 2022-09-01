const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Seleccione una opción',
        choices: [
            {
                value: 1,
                name: '1. Buscar Personaje',
            },
            {
                value: 0,
                name: '0. Salir'
            },
        ]
    }
];

const menuPrincipal = async () => {

    console.clear();
    console.log('=============================');
    console.log('    Seleccione una opción    '.green);
    console.log('=============================');

    const { opcion } = await inquirer.prompt(questions);

    return opcion;

}

const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ];

    await inquirer.prompt(question);

}

const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'personaje',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'.red
                }
                return true;
            }
        }
    ];

    const { personaje } = await inquirer.prompt(question);

    return personaje;

}

const listaPersonajes = async (personajes = []) => {

    const choices = personajes.map((personaje, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: personaje.id,
            name: `${idx} ${personaje.nombre} (${personaje.biografia['full-name']})`
        }

    });

    choices.unshift({
        value: 0,
        name: `${'0.'.green} Volver`
    });

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione un Personaje'.green,
            choices
        }
    ];

    const { id } = await inquirer.prompt(question);

    return id;

}

const confirmar = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);

    return ok;

}

module.exports = {
    menuPrincipal,
    pausa,
    leerInput,
    listaPersonajes,
    confirmar
}