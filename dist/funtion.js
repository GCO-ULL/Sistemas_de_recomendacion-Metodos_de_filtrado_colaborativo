"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricResult = exports.pearson = exports.finalMatrix = exports.search = void 0;
const metrics_1 = require("./metrics");
let matri = [
    ['1'],
    ['5'],
    ['5', '3', '4', '4', '-'],
    ['3', '1', '2', '3', '3'],
    ['4', '3', '4', '3', '5'],
    ['3', '3', '1', '5', '4'],
    ['1', '5', '5', '2', '1']
];
let matrix_ = newMatrix(matri);
let numberSearch = search(matrix_);
pearson(finalMatrix(matrix_, numberSearch), numberSearch);
/**
 * Función encargada de quitar los dos primero valores de la matriz que indica
 * el tamaño maximo y minimo de esta.
 * @param matrix matriz original
 * @returns devuelve la matriz sin los dos primeros valores
 */
function newMatrix(matrix) {
    let newMatrix = [];
    for (let i = 2; i < matrix.length; i++) {
        newMatrix.push(matrix[i]);
    }
    return newMatrix;
}
/**
 * Función encargada de buscar en la matriz la posicion de los items no conocidos
 * @param matrix matriz original sin valores iniciales
 * @returns devuelve un array de arrays con la posicion de los items no conocidos
 */
function search(matrix) {
    let toSearch = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j] == '-') {
                toSearch.push([i, j]);
            }
        }
    }
    return toSearch;
}
exports.search = search;
/**
 * Funcion encaragda de eliminar las clolumnas donde se encuentran los items no
 * conocidos
 * @param {string[][]} matrix  matriz original
 * @param {number[][]} search posicion de los items no conocidos
 * @returns devuelve la matriz sin las columnas donde se encuentran los items no
 * conocidos
 */
function finalMatrix(matrix, search) {
    let finalMatrix = [];
    let aux = 0;
    for (let i = 0; i < matrix.length; i++) {
        let auxMatrix = [];
        for (let j = 0; j < matrix[i].length; j++) {
            if (search[aux][1] != j) {
                auxMatrix.push(parseInt(matrix[i][j], 10));
            }
        }
        finalMatrix.push(auxMatrix);
    }
    return finalMatrix;
}
exports.finalMatrix = finalMatrix;
function pearson(matrix, search) {
    let u = search[0][0];
    for (let i = 1; i < matrix.length; i++) {
        let v = i;
        let result = sumatorio(u, v, matrix) / sumatorioCuadrado(u, v, matrix);
        if (result > -1 && result < 1) {
            let outString = 'sim(Persona ' + u + ', Persona ' + v + ') = ' + result.toFixed(2);
            if (result = 1) {
                outString += ' (Correlación directa perfecta)';
            }
            else if (result = -1) {
                outString += ' (Correlación inversa perfecta)';
            }
            else if (result > 0 && result < 1) {
                outString += ' (Correlacion directa)';
            }
            else if (result < 0 && result > -1) {
                outString += ' (Correlacion inversa)';
            }
            else if (result = 0) {
                outString += ' (No hay correlación)';
            }
            else {
                outString = '(Error)';
            }
            console.log(outString);
        }
        else {
            console.log('Error al calcular pearson');
            return false;
        }
    }
    return true;
}
exports.pearson = pearson;
/**
 * Funcion encargada de calcular el sumatorio superior de la formula de pearson
 * @param u Priemra persona
 * @param v Segunda persona
 * @param matrix matriz original sin las columnas donde se encuentran los items no conocidos
 * @returns devuelve el resultado del sumatorio superior de la formula de pearson
 */
function sumatorio(u, v, matrix) {
    let result = 0;
    let mediaU = media(u, matrix);
    let mediaV = media(v, matrix);
    for (let i = 0; i < matrix[u].length; i++) {
        result += (matrix[u][i] - mediaU) * (matrix[v][i] - mediaV);
    }
    return result;
}
/**
 * Funcion encargada de calcular el sumatorio inferior de la formula de pearson
 * y luego aplicarla la raiz cuadrada
 * @param u Priemra persona
 * @param v Segunda persona
 * @param matrix matriz original sin las columnas donde se encuentran los items
 * no conocidos
 * @returns devuelve el resultado del sumatorio inferior de la formula de pearson
 */
function sumatorioCuadrado(u, v, matrix) {
    let result_u = 0;
    let result_v = 0;
    let final_result;
    for (let i = 0; i < matrix[u].length; i++) {
        result_u += Math.pow(matrix[u][i] - media(u, matrix), 2);
        result_v += Math.pow(matrix[v][i] - media(v, matrix), 2);
    }
    final_result = Math.sqrt(result_u * result_v);
    return final_result;
}
function media(x, matrix) {
    let result = 0;
    for (let i = 0; i < matrix[x].length; i++) {
        result += matrix[x][i];
    }
    return result / (matrix[x].length);
}
/**
 * Calcula las métricas de todos las filas de una matriz numérica dada.
 * @param matrix Matrix a emplear
 * @param t Métrica a utilziar
 * @returns Matriz con valores de las métricas.
 */
function metricResult(matrix, t) {
    let result = [];
    for (let i = 0; i < matrix.length; i++) {
        let aux = [];
        let j = 0;
        while (j < matrix.length) {
            switch (t) {
                case 'pearsonDistance':
                    aux.push((0, metrics_1.pearsonDistance)(matrix[i], matrix[j]));
                    j++;
                    break;
                case 'cosineDistance':
                    aux.push((0, metrics_1.cosineDistance)(matrix[i], matrix[j]));
                    j++;
                    break;
                case 'euclideanDistance':
                    aux.push((0, metrics_1.euclideanDistance)(matrix[i], matrix[j]));
                    j++;
                    break;
                default:
                    return undefined;
            }
        }
        result.push(aux);
    }
    return result;
}
exports.metricResult = metricResult;
let m = [
    [5, 3, 4, 4],
    [3, 1, 2, 3],
    [4, 3, 4, 3],
    [3, 3, 1, 5]
];
console.log(metricResult(m, "pearsonDistance"));
