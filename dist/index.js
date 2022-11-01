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
            if (matrix[i][j] == '-' || matrix[i][j] == '-\r') {
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
                    aux.push(pearsonDistance(matrix[i], matrix[j]));
                    j++;
                    break;
                case 'cosineDistance':
                    aux.push(cosineDistance(matrix[i], matrix[j]));
                    j++;
                    break;
                case 'euclideanDistance':
                    aux.push(euclideanDistance(matrix[i], matrix[j]));
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
/**
 * Calcula al distancia de Pearson entre 2 vectores
 * @param {number} u Vector numero 1
 * @param {number} v Vector numero 2
 * @return Distancia de Pearson
 */
function pearsonDistance(u, v) {
    if (u.length != v.length)
        return undefined;
    let averageU = vectorAverage(u);
    let averageV = vectorAverage(v);
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
/**
 * Cálculo de predicciones simple
 * @param u Usuario u
 * @param item Item a calcular
 * @param matrix Matriz a emplear
 * @param v Número de vecinos a utilizar
 * @param t Metrica a emplear
 */
function simplePredict(u, item, matrix, v, t) {
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
function averagePredict(u, item, matrix, v, t) {
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
let matrixOrg;
readFile();
function readFile() {
    document.getElementById('inputFile').addEventListener('change', function () {
        var file = new FileReader();
        file.onload = () => {
            // document.getElementById('output').textContent = file.result as string;
            console.log(file.result);
            matrixOrg = readMatrix(file.result);
        };
        file.readAsText(this.files[0]);
    });
}
function readMatrix(matrix) {
    let newMatrix = [];
    let auxString = matrix.split('\n');
    for (let i = 0; i < auxString.length; i++) {
        newMatrix.push(auxString[i].split(' '));
    }
    return newMatrix;
}
function main() {
    document.getElementById('pearson');
    console.log(document.getElementById('cosine'));
    console.log(document.getElementById('euclidean'));
}
$("#calculate").click(function () {
    // Lectura de tipo de métrica
    var metrics = [...document.getElementsByName("metric")];
    metrics = metrics.filter(m => m.checked);
    var metric = undefined;
    if (metrics.length != 0)
        metric = metrics[0].value;
    // Lectura de numero de vecinos
    var neighbourElement = document.getElementById("neighbour");
    var neighbours = undefined;
    if (neighbourElement.value)
        neighbours = parseInt(neighbourElement.value);
    // Lectura de tipo de predicción
    var predictions = [...document.getElementsByName("prediction")];
    predictions = predictions.filter(p => p.checked);
    var prediction = undefined;
    if (predictions.length != 0)
        prediction = predictions[0].value;
    // Posibles alertas
    let stringAlert = "";
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
        let items = search(matrixOrg);
        let values = [];
        switch (prediction) {
            case 'simple_prediction':
                items.forEach((i) => {
                    let aux = simplePredict(i[0], i[1], matrixOrg, neighbours, metric);
                    if (aux)
                        values.push(Math.round(aux));
                });
                break;
            case 'avg_difference':
                items.forEach((i) => {
                    let aux = averagePredict(i[0], i[1], matrixOrg, neighbours, metric);
                    if (aux)
                        values.push(Math.round(aux));
                });
                break;
            default:
                break;
        }
        let result = matrixOrg;
        for (let i = 0; i < items.length; i++) {
            result[items[i][0]][items[i][1]] = values[i].toString();
        }
        console.log("RESULT:", result);
    }
});
