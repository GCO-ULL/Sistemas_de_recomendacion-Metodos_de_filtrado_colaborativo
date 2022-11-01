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
readFile();
function readFile() {
    document.getElementById('inputFile').addEventListener('change', function () {
        var file = new FileReader();
        file.onload = () => {
            // document.getElementById('output').textContent = file.result as string;
            console.log(file.result);
            matrixOrg = readMatrix(file.result);
        };
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
    document.getElementById('pearson');
    console.log(document.getElementById('cosine'));
    console.log(document.getElementById('euclidean'));
}
$("#calculate").click(function () {
    // Lectura de tipo de métrica
    var metrics = [...document.getElementsByName("metric")];
    metrics = metrics.filter(m => m.checked);
    var metric = undefined;
    if (metrics.length != 0)
        metric = metrics[0].value;
    // Lectura de numero de vecinos
    var neighbourElement = document.getElementById("neighbour");
    var neighbours = undefined;
    if (neighbourElement.value)
        neighbours = parseInt(neighbourElement.value);
    // Lectura de tipo de predicción
    var predictions = [...document.getElementsByName("prediction")];
    predictions = predictions.filter(p => p.checked);
    var prediction = undefined;
    if (predictions.length != 0)
        prediction = predictions[0].value;
    console.log("Metric = ", metric);
    console.log("Neighbours = ", neighbours);
    console.log("prediction = ", prediction);
});
