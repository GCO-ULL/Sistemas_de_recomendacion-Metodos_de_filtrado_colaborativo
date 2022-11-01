/**
 * Convierte una matriz en una string con '\n'
 * @param matrix Matriz a convertir
 * @returns Cadena resultante
 */
function matrixToString(matrix: string[][]): string {
  let result: string = "";
  matrix.forEach((i: string[]) => {
    i.forEach((j) => {
      result+= j + " ";
    });
    result += "\n";
  });
  return result;
}

/**
 * Limpia la matriz eliminando los posibles '\r'
 * @param matrix Matriz a limpiar
 * @returns Matriz limpia
 */
function cleanMatrix(matrix: string[][]): string[][] {
  let result: string[][] = matrix;
  for (let i: number = 0; i < matrix.length; i++)
    if (result[i][result.length - 1] == '-\r')
      result[i][result.length - 1] = '-';
    else
      result[i][result.length - 1] = parseInt(result[i][result.length - 1]).toString();
  return result;
}

/**
 * Calcula la media entre los elementos de un vector numérico
 * @param {number[]} vector Vector a calcular la media
 * @returns Media
 */
  function vectorAverage(vector: number[]) : number {
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
 function search(matrix:string[][]): number[][] {
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
 function finalMatrix(matrix: string[][], search: number[][]) {
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
 * Calcula las métricas de todos las filas de una matriz numérica dada.
 * @param matrix Matrix a emplear
 * @param t Métrica a utilziar
 * @returns Matriz con valores de las métricas.
 */
function metricResult(matrix: number[][], t: metric) {
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
 function searchNeighbours(u: number, matrixSim: number[][], v: number): number[] {

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

/**
 * Calcula al distancia de Pearson entre 2 vectores
 * @param {number} u Vector numero 1
 * @param {number} v Vector numero 2
 * @return Distancia de Pearson
 */
 function pearsonDistance(u: number[], v: number[]): number | undefined {
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
 function cosineDistance(u: number[], v: number[]): number | undefined {
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
 function euclideanDistance(u: number[], v: number[]): number | undefined {
    if (u.length != v.length)
        return undefined;

    let sumatory: number = 0;

    for (let i: number = 0; i < u.length; i++) {
        sumatory += Math.pow(u[i] - v[i], 2);
    }

    return Math.sqrt(sumatory);
}

/**
 * Metricas permitidas
 */
type metric = "cosineDistance" | "pearsonDistance" | "euclideanDistance";

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

// Matriz leida
let matrixOrg: string[][] = [];
readFile()

/**
 * Lectura del fichero de entrada
 */
function readFile() {
  (<HTMLInputElement>document.getElementById('inputFile')).addEventListener('change', function() {
    var file = new FileReader();
    file.onload = () => {
      matrixOrg = readMatrix(file.result as string);
    }
    file.readAsText(this.files[0]);
  });
}

/**
 * Transforma una string en una matriz separadas por saltos de linea
 * @param matrix Matriz (string)
 * @returns Matriz resultante
 */
function readMatrix(matrix: string): string[][] {
  let newMatrix = [];
  let auxString = matrix.split('\n');
  for (let i = 0; i < auxString.length; i++) {
    newMatrix.push(auxString[i].split(' '));
  }
  return newMatrix;
}


$("#calculate").click(function() {
  // Lectura de tipo de métrica
  var metrics = [...document.getElementsByName("metric")] as HTMLInputElement[];
  metrics = metrics.filter(m => m.checked);
  var metric = undefined;
  if (metrics.length != 0) 
    metric = metrics[0].value;

  // Lectura de numero de vecinos
  var neighbourElement = document.getElementById("neighbour") as HTMLInputElement;
  var neighbours = undefined;
  if (neighbourElement.value)
    neighbours = parseInt(neighbourElement.value);

  // Lectura de tipo de predicción
  var predictions = [...document.getElementsByName("prediction")] as HTMLInputElement[];
  predictions = predictions.filter(p => p.checked);
  var prediction = undefined;
  if (predictions.length != 0) 
    prediction = predictions[0].value;
  
  // Posibles alertas
  let stringAlert: string = "";
  
  if (!metric)
    stringAlert += "- Se debe seleccionar el tipo de metrica a emplear.\n";
  if (!neighbours)
    stringAlert += "- Se debe introducir el numero de vecinos a utilizar.\n";
  if (!prediction)
    stringAlert += "- Se debe seleccionar el tipo de predicion a emplear.\n";
  if (!matrixOrg)
    stringAlert += "- Se debe introducir un fichero con la correspondiente matriz.\n";
  
  if (stringAlert != "")
    alert(stringAlert);
  else { // Si no hay alertas
    let matrix: string[][] = cleanMatrix(matrixOrg); // Matriz a emplear
    let items: number[][] = search(matrix); // Items a calcular
    let values: number[] = []; // Valores de los items calculados
    let error: boolean = false;
    switch(prediction) {
      case 'simple_prediction':
        items.forEach((i) => {
          let aux: number | undefined = simplePredict(i[0], i[1], matrix, neighbours, metric);
          if (typeof aux == 'undefined') 
            error = true;
          else
            values.push(Math.round(aux as number));
        });
        break;
      case 'avg_difference':
        items.forEach((i) => {
          let aux: number | undefined = averagePredict(i[0], i[1], matrix, neighbours, metric);
          if (typeof aux == 'undefined') 
            error = true;
          else
            values.push(Math.round(aux as number));
        });
        break;
      default:
        break;
    }

    // RESULTADO
    if (error) 
      alert("Hubo un error en el calculo, revise los parametros introducidos");
    else {
      let result: string[][] = matrix;
      for (let i: number = 0; i < items.length; i++) {
        result[items[i][0]][items[i][1]] = values[i].toString();
      }  
      alert("RESULTADO OBTENIDO:\n\n" + matrixToString(matrix));
    }
  }
});