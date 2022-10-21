 function pearson(matrix) {
    let u
    let v
    return sumatorio(u, v, matrix) / sumatorioCuadrado(u, matrix)
}

function sumatorio(u, v, matrix) {
  let result
  for (let i = 0; i < matrix[u].size(); i++) {
  result += matrix[u][i] - media(u, matrix) * matrix[v][i] - media(v, matrix)
  }
  return result
}

function sumatorioCuadrado(u, matrix) {
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

function media(u, matrix) {
  let result
  for (let i = 0; i < matrix[u].size(); i++) {
    result += matrix[u][i]
  }
  return result / matrix[u].size()
}
  
