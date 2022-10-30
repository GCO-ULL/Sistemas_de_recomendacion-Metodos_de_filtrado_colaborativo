import {cosineDistance} from './metrics';

type metric = "cosineDistance";

function simplePredict(u: number, i: number, v: number[], matrix: number[][], t: metric): number | undefined {
    
    if (u < 0 || u > matrix.length || v.length == 0 || i < 0 || i > matrix[u].length)
        return undefined;

    let primaryRow: number[] = [];
    let neighbourRows: number[][] = [];
    let neighbour = 0;
    for (let j: number = 0; j < matrix[u].length; j++) {
        if (i != j) {
            primaryRow.push(matrix[u][j]);
        }
    }
    

    console.log(primaryRow);
/*
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


let m = [
    [ 5, 3, 4, 4, -],
    [ 3, 1, 2, 3, 4],
    [ 4, 3, 4, 3, 5],
    [ 3, 3, 1, 5, 6],
    [ 1, 5, 5, 2, 7]
]


console.log(simplePredict(0, 0, [1, 2], m, "consineDistance"));