import { finalMatrix, metricResult, search, searchNeighbours, vectorAverage } from './funtion';
import {cosineDistance} from './metrics';

export type metric = "cosineDistance" | "pearsonDistance" | "euclideanDistance";

/**
 * Cálculo de predicciones simple
 * @param u Usuario u
 * @param item Item a calcular
 * @param matrix Matriz a emplear
 * @param v Número de vecinos a utilizar
 * @param t Metrica a emplear
 */
function simplePredict(u: number, item: number, matrix: string[][], v: number, t: metric): number | undefined {
    
    if (v < 1 || v > matrix.length || u < 0 || u > matrix.length || item < 0 || item > matrix[u].length)
        return undefined;
    
    // Matriz de similitudes
    let sim: number[][] = metricResult(finalMatrix(matrix, search(matrix)), t);
    // Vector de vecinos cercanos
    let neighbours: number[] = searchNeighbours(u, sim, v);
    // Sumatorios
    let sumaryBottom: number = 0;
    let sumaryTop: number = 0;

    for (let j: number = 0; j < neighbours.length; j++) {
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
function averagePredict(u: number, item: number, matrix: string[][], v: number, t: metric): number | undefined {
    
    if (v < 1 || v > matrix.length || u < 0 || u > matrix.length || item < 0 || item > matrix[u].length)
        return undefined;
    // Matriz sin '-'
    let finalM: number[][] = finalMatrix(matrix, search(matrix));
    // Matriz de similitudes
    let sim: number[][] = metricResult(finalM, t);
    // Vector de vecinos cercanos
    let neighbours: number[] = searchNeighbours(u, sim, v);
    // Sumatorios
    let sumaryBottom: number = 0;
    let sumaryTop: number = 0;
    // Cálculo
    for (let j: number = 0; j < neighbours.length; j++) {
        sumaryTop += sim[u][neighbours[j]] * (parseInt(matrix[neighbours[j]][item])) - vectorAverage(finalM[neighbours[j]]);
        sumaryBottom += Math.abs(sim[u][neighbours[j]]);
    }
    return vectorAverage(finalM[u]) + sumaryTop / sumaryBottom;
}