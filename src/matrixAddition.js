export const matrixAddition = (matrix1, matrix2) => {
    return matrix1.map((row, i) => row.map((cell, j) => cell + matrix2[i][j]));
  };  