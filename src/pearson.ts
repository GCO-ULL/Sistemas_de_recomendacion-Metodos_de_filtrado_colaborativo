function pearson(matrix) {
  let u = matrix[0]
  for (let i = 2; i < matrix[1]; i++) {
    let v = matrix[i]
    let result = sumatorio(u, v, matrix) / sumatorioCuadrado(u, v, matrix)
    console.log('Usuario ', v, result)
  }
}

function sumatorio(u, v, matrix) {
  let result
  let mediaU = media(u, matrix)
  let mediaV = media(v, matrix)
  for (let i = 0; i < matrix[u].size(); i++) {
  result += matrix[u][i] - mediaU * matrix[v][i] - mediaV
  }
  return result
}

function sumatorioCuadrado(u, v, matrix) {
  let result_u
  let result_v
  let final_result
  for (let i = 0; i < matrix[u].size(); i++) {
    result_u += Math.pow(matrix[u][i] - media(u, matrix), 2)
    result_v += Math.pow(matrix[v][i] - media(v, matrix), 2)
  }
  final_result = Math.sqrt(result_u * result_v)
  return final_result
}

function media(x, matrix) {
  let result
  for (let i = 0; i < matrix[x].size(); i++) {
    result += matrix[x][i]
  }
  return result / matrix[x].size()
}
  
