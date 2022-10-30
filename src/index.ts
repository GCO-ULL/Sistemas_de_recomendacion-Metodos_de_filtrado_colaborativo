
import {readFile} from 'fs';
import {pearson} from '../';

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
  readFile(file, (_, data) => {
    console.log(data.toString());
    let auxString = data.toString().split('\n');
    console.log('\n');
    console.log(matrix);
    for (let i = 0; i < auxString.length; i++) {
      matrix.push(auxString[i].split(' '));
    }
    console.log('\n');
    console.log(matrix);
  });
  pearson(matrix);
}