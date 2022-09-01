const asciify = require('asciify-image');

const options = {
    fit: 'box',
    width: 50,
    height: 50
}

const imageToAscii = (image) => asciify(image, options, function (err, asciified) {
    if (err) throw err;

    // Print to console
    console.clear()
    console.log(asciified);
});

module.exports = {
    imageToAscii
}