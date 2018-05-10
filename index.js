const screenshot = require('screenshot-desktop');
const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'results/');

screenshot({filename: dir + 'screenshot.jpg'})
    .then((img) => {
        return Tesseract.recognize(img)
            .progress(message => console.log(message))
            .catch(err => console.error(err))
            .then(result => {
                console.log("OCR: %d paragraphs with %d % confidence.", result.paragraphs.length, result.confidence);
                fs.writeFileSync(dir + './screenshot.txt', result.text.toString())
                fs.writeFileSync(dir + './screenshot.html', result.html.toString());
            });
    })
    .catch((error) => {
        console.error(error);
    })
    .then(() => process.exit(0));

