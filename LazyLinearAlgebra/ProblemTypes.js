const {Matrix} = require('./Eigen')
const {RowOps} = require("./RowOperations")


const Problems = {
    guassJordanElimination(A){
        return 0;
    },
    /**
     * Computes u*x_1 + v*x_2
     * @param {number[][]} u - vector u 
     * @param {number[][]} v - vector v
     * @param {number | undefined} x_1 - scalar x_1 (to multiply with u)
     * @param {number | undefined} x_2 - scalar x_2 (to multiply with v)
     * @returns {number[][]} 
     */
    multiplyAndAddTwo(u, v, x_1, x_2){
        return Matrix.add(Matrix.scalarMultiply(u, x_1 ?? 1), Matrix.scalarMultiply(v, x_2 ?? 1));
    },
    /**
     * Computes A*x, where A is a matrix and x is a vector
     * @param {number[][]} A - a 2D array
     * @param {number[][]} x - column vector x 
     * @returns {number[][]}
     */
    computeAx(A, x){
        return Matrix.multiply(A, x);
    },
    makeVectorEquation(A, x){
        Matrix.displayMatrix(A)
        Matrix.displayMatrix(x)
        let Ax = this.computeAx(A, x)
        // return x.reduce((acc, col, i) => acc + `${col[0]}*[${A[i]}]` ,  "")
        // return A.reduce((acc, row, i)=> acc + row.map((n, j)=> `${n}*x${j}`).join(" + ") + ` = ${Ax[i][0]}\n`, "")
        return A[0].map((_, j) => `${A.map((row, i) => `${row[j]}*x${i}`).join(" + ")} = ${A.reduce((acc, row, i)=> acc + row[j] * x[i][0], 0)}`).join("\n")
    }
}

module.exports = {Problems}