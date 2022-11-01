// import {readFile} from 'fs';

// const rl = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// let matri = [
//   [ '1' ],
//   [ '5' ],
//   [ '5', '3', '4', '4', '-' ],
//   [ '3', '1', '2', '3', '3' ],
//   [ '4', '3', '4', '3', '5' ],
//   [ '3', '3', '1', '5', '4' ],
//   [ '1', '5', '5', '2', '1' ]
// ]

let matrixOrg;

readFile()
function readFile() {
  (<HTMLInputElement>document.getElementById('inputFile')).addEventListener('change', function() {
    var file = new FileReader();
    file.onload = () => {
      // document.getElementById('output').textContent = file.result as string;
      console.log(file.result);
      matrixOrg = readMatrix(file.result as string);
    }
    file.readAsText(this.files[0]);
  });
}

function readMatrix(matrix) {
  let newMatrix = [];
  let auxString = matrix.split('\n');
  for (let i = 0; i < auxString.length; i++) {
    newMatrix.push(auxString[i].split(' '));
  }
  return newMatrix;
}

function main() {
  console.log(document.getElementById('pearson'));
  console.log(document.getElementById('cosine'));
  console.log(document.getElementById('euclidean'));
}




