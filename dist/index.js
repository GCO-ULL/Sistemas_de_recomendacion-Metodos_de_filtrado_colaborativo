"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
let matri = [
    ['1'],
    ['5'],
    ['5', '3', '4', '4', '-'],
    ['3', '1', '2', '3', '3'],
    ['4', '3', '4', '3', '5'],
    ['3', '3', '1', '5', '4'],
    ['1', '5', '5', '2', '1']
];
// console.log("hello world");
//leerArchivo('infile.txt');
// function readFile(matrix) {
//   instanceOfFileReader.readAsArrayBuffer(blob);
// }
/*
function leerArchivo(file) {
  // readFile(file, (err, data) => {
  //   if (err) {
  //     console.log('No existe el fichero');
  //   } else {
  //     console.log(data.toString());
  //   }
  // });
  let matrix = [];
  readFile(file, (_, data) => {
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
  var doc = document.getElementById("myfile") as HTMLInputElement | null;
  if (doc) {
    console.log(doc.value);
    //leerArchivo(doc.files[0].name);
  }
}
*/
readline.question('Who are you?', (name) => {
    console.log(typeof name);
    if (typeof name == 'number') {
        console.log(name + 2);
    }
    else {
        console.log('No es un numero');
    }
    readline.close();
});
