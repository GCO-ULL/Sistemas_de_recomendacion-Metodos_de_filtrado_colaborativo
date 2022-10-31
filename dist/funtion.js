"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchNeighbours = exports.metricResult = exports.finalMatrix = exports.search = exports.vectorAverage = void 0;
const metrics_1 = require("./metrics");
/**
 * Calcula la media entre los elementos de un vector numérico
 * @param {number[]} vector Vector a calcular la media
 * @returns Media
 */
function vectorAverage(vector) {
    let result = 0;
    for (let i = 0; i < vector.length; i++) {
        result += vector[i];
    }
    return result / (vector.length);
}
exports.vectorAverage = vectorAverage;
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
/**
 * Funcion encargada de calcular el sumatorio superior de la formula de pearson
 * @param u Primera persona
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
 * @param u Primera persona
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
/**
 * Búsqueda de vecionos más cercanos a un usuario
 * @param u Usuario a calcular sus vecinos más proximos
 * @param matrixSim Matriz de similitudes
 * @param v Número de vecinos a emplear
 */
function searchNeighbours(u, matrixSim, v) {
    if (v < 0 || v > matrixSim.length)
        return undefined;
    let result = [];
    let vector = matrixSim[u];
    let aux = [];
    for (let i = 0; i < vector.length; i++) {
        if (u != i) {
            aux.push(vector[i]);
        }
    }
    aux = aux.sort();
    let neighboursIt = 0;
    for (let i = aux.length - 1; i >= aux.length - v; i--) {
        result.push(vector.indexOf(aux[i]));
    }
    return result;
}
exports.searchNeighbours = searchNeighbours;
