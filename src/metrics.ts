
let m = [
    [ 5, 3, 4, 4],
    [ 3, 1, 2, 3],
    [ 4, 3, 4, 3],
    [ 3, 3, 1, 5],
    [ 1, 5, 5, 2]
]

// console.log(pearsonDistance(m[0], m[1]));
/**
 * Calcula la media entre los elementos de un vector numérico
 * @param {number[]} vector Vector a calcular la media
 * @returns Media
 */
export function vectorAverage(vector: number[]) : number {
    let result = 0;
    for (let i = 0; i < vector.length; i++) {
        result += vector[i]
    }
    return result / (vector.length);
}  

/**
 * Calcula al distancia de Pearson entre 2 vectores
 * @param {number} u Vector numero 1
 * @param {number} v Vector numero 2
 * @return Distancia de Pearson
 */
export function pearsonDistance(u: number[], v: number[]): number | undefined {
    if (u.length != v.length)
        return undefined;
    
    let averageU = vectorAverage(u);
    let averageV = vectorAverage(v);
    
    let sumatoryTop: number = 0;
    let sumatoryUBottom: number = 0;
    let sumatoryVBottom: number = 0;
    for (let i: number = 0; i < u.length; i++) {
        sumatoryTop += (u[i] - averageU) * (v[i] - averageV);
        sumatoryUBottom += Math.pow(u[i] - averageU, 2);
        sumatoryVBottom += Math.pow(v[i] - averageV, 2);
    }

    let result: number = sumatoryTop / Math.sqrt(sumatoryUBottom * sumatoryVBottom);
    if (result < -1 || result > 1)
        return undefined;
    else
        return result;
}

/**
 * Calcula la distancia coseno entre 2 vectores
 * @param {number} u Vector numero 1
 * @param {number} v Vector numero 2
 * @return Distancia coseno
 */
export function cosineDistance(u: number[], v: number[]): number | undefined {
    if (u.length != v.length)
        return undefined;

    let sumatoryTop: number = 0;
    let sumatoryUBottom: number = 0;
    let sumatoryVBottom: number = 0;

    for (let i: number = 0; i < u.length; i++) {
        sumatoryTop += u[i] * v[i];
        sumatoryUBottom += Math.pow(u[i], 2);
        sumatoryVBottom += Math.pow(v[i], 2);
    }

    let result: number = sumatoryTop / (Math.sqrt(sumatoryUBottom * sumatoryVBottom));
    if (result < 0 || result > 1)
        return undefined;
    else
        return result;
}

/**
 * Calcula la distancia euclídea entre 2 vectores de una matriz
 * @param {number} u Fila número 1
 * @param {number} v Fila número 2
 * @param {number} matrix Matriz a emplear
 * @return Distancia euclídea
 */
export function euclideanDistance(u: number[], v: number[]): number | undefined {
    if (u.length != v.length)
        return undefined;

    let sumatory: number = 0;

    for (let i: number = 0; i < u.length; i++) {
        sumatory += Math.pow(u[i] - v[i], 2);
    }

    return Math.sqrt(sumatory);
}