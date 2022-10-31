"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const funtion_1 = require("./funtion");
function simplePredict(matrix, v, t) {
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
function searchNeighbours(u, matrixSim, v) {
    let result = [];
    let min = Math.min(...matrixSim[u]);
    console.log(min);
    //     // for (let i: number = 0; i < matrixSim[u].length; i++) {
    //             }
    //}
    return result;
    // }
    // 
    // // 
    // // // Miren que le paso la matriz sin la columna no se si hay que cambiarlo }
    // // function averagePredict(matrix: string[][], v: number, t: metric): number | undefined {
    // //     let itemPosition: number[][] = search(matrix);
    //let matrixSim : number[][] = metricResult(finalMatrix(matrix, itemPosition), t);
    // //     let sim = matrixSim
}
let matrix = [
    ['5', '3', '4', '4', '-'],
    ['3', '1', '2', '3', '3'],
    ['4', '3', '4', '3', '5'],
    ['3', '3', '1', '5', '4'],
    ['1', '5', '5', '2', '1']
];
let m = [
    [5, 3, 4, 4],
    [3, 1, 2, 3],
    [4, 3, 4, 3],
    [3, 3, 1, 5]
];
searchNeighbours(0, (0, funtion_1.metricResult)(m, "pearsonDistance"), 2);
//console.log(simplePredict(0, 0, [1, 2], m, "consineDistance"));
