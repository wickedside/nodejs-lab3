export const matrixAddition = (matrix1, matrix2) => {
    if (!matrix1 || !matrix2 || matrix1.length !== matrix2.length || matrix1.some((row, i) => row.length !== matrix2[i].length)) {
        throw new Error("Матрицы должны быть одинаковые и не пустые");
    }
    return matrix1.map((row, i) => 
        row.map((cell, j) => cell + matrix2[i][j])
    );
};