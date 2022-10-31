"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.euclideanDistance = exports.cosineDistance = exports.pearsonDistance = void 0;
const funtion_1 = require("./funtion");
/**
 * Calcula al distancia de Pearson entre 2 vectores
 * @param {number} u Vector numero 1
 * @param {number} v Vector numero 2
 * @return Distancia de Pearson
 */
function pearsonDistance(u, v) {
    if (u.length != v.length)
        return undefined;
    let averageU = (0, funtion_1.vectorAverage)(u);
    let averageV = (0, funtion_1.vectorAverage)(v);
    let sumatoryTop = 0;
    let sumatoryUBottom = 0;
    let sumatoryVBottom = 0;
    for (let i = 0; i < u.length; i++) {
        sumatoryTop += (u[i] - averageU) * (v[i] - averageV);
        sumatoryUBottom += Math.pow(u[i] - averageU, 2);
        sumatoryVBottom += Math.pow(v[i] - averageV, 2);
    }
    let result = sumatoryTop / Math.sqrt(sumatoryUBottom * sumatoryVBottom);
    if (result < -1 || result > 1)
        return undefined;
    else
        return result;
}
exports.pearsonDistance = pearsonDistance;
/**
 * Calcula la distancia coseno entre 2 vectores
 * @param {number} u Vector numero 1
 * @param {number} v Vector numero 2
 * @return Distancia coseno
 */
function cosineDistance(u, v) {
    if (u.length != v.length)
        return undefined;
    let sumatoryTop = 0;
    let sumatoryUBottom = 0;
    let sumatoryVBottom = 0;
    for (let i = 0; i < u.length; i++) {
        sumatoryTop += u[i] * v[i];
        sumatoryUBottom += Math.pow(u[i], 2);
        sumatoryVBottom += Math.pow(v[i], 2);
    }
    let result = sumatoryTop / (Math.sqrt(sumatoryUBottom * sumatoryVBottom));
    if (result < 0 || result > 1)
        return undefined;
    else
        return result;
}
exports.cosineDistance = cosineDistance;
/**
 * Calcula la distancia euclídea entre 2 vectores de una matriz
 * @param {number} u Fila número 1
 * @param {number} v Fila número 2
 * @param {number} matrix Matriz a emplear
 * @return Distancia euclídea
 */
function euclideanDistance(u, v) {
    if (u.length != v.length)
        return undefined;
    let sumatory = 0;
    for (let i = 0; i < u.length; i++) {
        sumatory += Math.pow(u[i] - v[i], 2);
    }
    return Math.sqrt(sumatory);
}
exports.euclideanDistance = euclideanDistance;
