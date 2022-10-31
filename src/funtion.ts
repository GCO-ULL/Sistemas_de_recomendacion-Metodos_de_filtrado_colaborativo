
import {metric} from './predictions';
import {pearsonDistance, cosineDistance, euclideanDistance} from './metrics';

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
 * Función encargada de quitar los dos primero valores de la matriz que indica
 * el tamaño maximo y minimo de esta.
 * @param matrix matriz original
 * @returns devuelve la matriz sin los dos primeros valores
 */
function newMatrix(matrix: string[][]) {
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
export function search(matrix:string[][]): number[][] {
  let toSearch:number[][] = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] == '-') {
        toSearch.push([i, j]);
      }
    }
  }
  return toSearch;
}


/**
 * Funcion encaragda de eliminar las clolumnas donde se encuentran los items no
 * conocidos
 * @param {string[][]} matrix  matriz original
 * @param {number[][]} search posicion de los items no conocidos
 * @returns devuelve la matriz sin las columnas donde se encuentran los items no
 * conocidos
 */
export function finalMatrix(matrix: string[][], search: number[][]) {
  let finalMatrix: number[][] = [];
  let aux: number = 0;
  for (let i = 0; i < matrix.length; i++) {
    let auxMatrix: number[] = [];
    for (let j = 0; j < matrix[i].length; j++) {
      if (search[aux][1] != j) {
        auxMatrix.push(parseInt(matrix[i][j], 10));
      }
    }
    finalMatrix.push(auxMatrix);
  }
  return finalMatrix;
}


/**
 * Funcion encargada de calcular el sumatorio superior de la formula de pearson
 * @param u Primera persona
 * @param v Segunda persona
 * @param matrix matriz original sin las columnas donde se encuentran los items no conocidos
 * @returns devuelve el resultado del sumatorio superior de la formula de pearson
 */
function sumatorio(u: number, v: number, matrix: number[][]) : number {
  let result: number = 0;
  let mediaU = media(u, matrix)
  let mediaV = media(v, matrix)
  for (let i = 0; i < matrix[u].length; i++) {
    result += (matrix[u][i] - mediaU) * (matrix[v][i] - mediaV)
  }
  return result
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
function sumatorioCuadrado(u, v, matrix) : number{
  let result_u: number = 0
  let result_v: number = 0
  let final_result
  for (let i = 0; i < matrix[u].length; i++) {
    result_u += Math.pow(matrix[u][i] - media(u, matrix), 2)
    result_v += Math.pow(matrix[v][i] - media(v, matrix), 2)
  }
  final_result = Math.sqrt(result_u * result_v)
  return final_result
}

function media(x: number, matrix: number[][]) : number {
  let result = 0;
  for (let i = 0; i < matrix[x].length; i++) {
    result += matrix[x][i]
  }
  return result / (matrix[x].length);
}

/**
 * Calcula las métricas de todos las filas de una matriz numérica dada.
 * @param matrix Matrix a emplear
 * @param t Métrica a utilziar
 * @returns Matriz con valores de las métricas.
 */
export function metricResult(matrix: number[][], t: metric) {
  let result: number[][] = [];

  for (let i: number = 0; i < matrix.length; i++) {
    let aux: number[] = [];
    let j = 0;
    while (j < matrix.length) {
      switch(t) {
        case 'pearsonDistance':
            aux.push(pearsonDistance(matrix[i], matrix[j]));
            j++;
            break;
        case 'cosineDistance':
            aux.push(cosineDistance(matrix[i], matrix[j]))
            j++;
            break;
        case 'euclideanDistance':
            aux.push(euclideanDistance(matrix[i], matrix[j]))
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

/**
 * Búsqueda de vecionos más cercanos a un usuario
 * @param u Usuario a calcular sus vecinos más proximos
 * @param matrixSim Matriz de similitudes
 * @param v Número de vecinos a emplear
 */
export function searchNeighbours(u: number, matrixSim: number[][], v: number): number[] {

  if (v < 0 || v > matrixSim.length)
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

  return result;
}