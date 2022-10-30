"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
// console.log("hello world");
leerArchivo('infile.txt');
// function readFile(matrix) {
//   instanceOfFileReader.readAsArrayBuffer(blob);
// }
function leerArchivo(file) {
    // readFile(file, (err, data) => {
    //   if (err) {
    //     console.log('No existe el fichero');
    //   } else {
    //     console.log(data.toString());
    //   }
    // });
    let matrix = [];
    (0, fs_1.readFile)(file, (_, data) => {
        console.log(data.toString());
        let auxString = data.toString().split('\n');
        // console.log('\n');
        console.log(matrix);
        for (let i = 0; i < auxString.length; i++) {
            matrix.push(auxString[i].split(' '));
        }
        // console.log('\n');
        console.log(matrix);
    });
    // pearson(matrix);
}
function example() {
    var reader = new FileReader();
    var doc = document.getElementById("myfile");
    if (doc) {
        console.log(doc.value);
        //leerArchivo(doc.files[0].name);
    }
}
