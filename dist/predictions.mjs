import { finalMatrix, metricResult, search, searchNeighbours, vectorAverage } from './funtion';
/**
 * Cálculo de predicciones simple
 * @param u Usuario u
 * @param item Item a calcular
 * @param matrix Matriz a emplear
 * @param v Número de vecinos a utilizar
 * @param t Metrica a emplear
 */
export function simplePredict(u, item, matrix, v, t) {
    if (v < 1 || v > matrix.length || u < 0 || u > matrix.length || item < 0 || item > matrix[u].length)
        return undefined;
    // Matriz de similitudes
    let sim = metricResult(finalMatrix(matrix, search(matrix)), t);
    // Vector de vecinos cercanos
    let neighbours = searchNeighbours(u, sim, v);
    // Sumatorios
    let sumaryBottom = 0;
    let sumaryTop = 0;
    for (let j = 0; j < neighbours.length; j++) {
        sumaryTop += sim[u][neighbours[j]] * parseInt(matrix[neighbours[j]][item]);
        sumaryBottom += Math.abs(sim[u][neighbours[j]]);
    }
    return sumaryTop / sumaryBottom;
}
/**
 * Cálculo de predicciones con la media
 * @param u Usuario u
 * @param item Item a calcular
 * @param matrix Matriz a emplear
 * @param v Número de vecinos a utilizar
 * @param t Metrica a emplear
 */
export function averagePredict(u, item, matrix, v, t) {
    if (v < 1 || v > matrix.length || u < 0 || u > matrix.length || item < 0 || item > matrix[u].length)
        return undefined;
    // Matriz sin '-'
    let finalM = finalMatrix(matrix, search(matrix));
    // Matriz de similitudes
    let sim = metricResult(finalM, t);
    // Vector de vecinos cercanos
    let neighbours = searchNeighbours(u, sim, v);
    // Sumatorios
    let sumaryBottom = 0;
    let sumaryTop = 0;
    // Cálculo
    for (let j = 0; j < neighbours.length; j++) {
        sumaryTop += sim[u][neighbours[j]] * (parseInt(matrix[neighbours[j]][item])) - vectorAverage(finalM[neighbours[j]]);
        sumaryBottom += Math.abs(sim[u][neighbours[j]]);
    }
    return vectorAverage(finalM[u]) + sumaryTop / sumaryBottom;
}
