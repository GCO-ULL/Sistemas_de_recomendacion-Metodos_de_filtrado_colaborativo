import { finalMatrix, metricResult, search } from './funtion';
import {cosineDistance} from './metrics';

export type metric = "cosineDistance" | "pearsonDistance" | "euclideanDistance";

function simplePredict(matrix: string[][], v: number, t: metric): number | undefined {
    
    if (v < 1 || v > matrix.length)
        return undefined;
    
    // search
    
    
/*

    let primaryRow: number[] = [];
    let neighbourRows: number[][] = [];
    let neighbour = 0;
    for (let j: number = 0; j < matrix[u].length; j++) {
        if (i != j) {
            primaryRow.push(matrix[u][j]);
        }
    }

    

    let sumatoryTop =      console.log(primaryRow);
    for(let i: number = 0; i < v.length; i++)

    let summatoryTop: number = 0;
    let neighbours: number = v.length;
    let aux: number = 0;
    while (aux < neighbours) {
        if (t = "cosineDistance")
            summatoryTop += cosineDistance(u, v[aux], matrix) * matrix[v][i];
        aux ++;
    }
    */
    return 1;
}


function searchNeighbours(u: number, matrixSim: number[][], v: number): number[] {

    if (v < 0 || v >= matrix.length - 1)
        return undefined;
    
    let result: number[] = [];

    let vector: number[] = matrixSim[u];
    let aux: number[] = [];

    for (let i: number = 0; i < vector.length; i++) {
        if (u != i) {
            aux.push(vector[i]);
        }

    }

    aux = aux.sort();
    let neighboursIt: number = 0;
    
    for (let i: number = aux.length - 1; i >= aux.length - v; i--) {
        result.push(vector.indexOf(aux[i]));
    }
    
    console.log(result);
    return result;

}


let matrix = [
    [ '5', '3', '4', '4', '-' ],
    [ '3', '1', '2', '3', '3' ],
    [ '4', '3', '4', '3', '5' ],
    [ '3', '3', '1', '5', '4' ],
    [ '1', '5', '5', '2', '1' ]
]

let m = [
    [ 5, 3, 4, 4],
    [ 3, 1, 2, 3],
    [ 4, 3, 4, 3],
    [ 3, 3, 1, 5]
  ]

searchNeighbours(0, metricResult(m, "pearsonDistance"), 4);
//console.log(simplePredict(0, 0, [1, 2], m, "consineDistance"));