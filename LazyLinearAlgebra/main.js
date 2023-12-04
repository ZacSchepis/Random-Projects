const chemParser = require('./chemParser')
const {RowOps} = require("./RowOperations")
const {Matrix} = require('./Eigen')
const {Problems} = require('./ProblemTypes')


// const {ChemParser} = require('./chemParser')
// chemParser.ChemParser("2 H2 + O2 = 2 H2O")
const A = [
    [3, 10,3,4],
    [30, 3, 2,3],
    [30, 5, -1,1],
    [5, 1,2, 5]
]

const B = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
]
const CoFactor= (r, c) => Math.pow((-1), r+c)

const C = [
    [1, 5, 0],
    [2, 4, -1],
    [0, -2, 0]
]
// 3.1 Exercise # 3 matrix
const D = [
    [2, -2, 3],
    [3, 1, 2],
    [1, 3, -1]
]

// 3.1 Exercise # 5 matrix
const E = [
    [2, 3, -3],
    [4, 0, 3], 
    [6, 1, 5]
]

// 3.1 Exercise #9 matrix
const F = [
    [4, 0, 0, 5],
    [1, 7, 2, -5],
    [3, 0, 0, 0],
    [8, 3, 1, 7]
]
// 3.1 Exercise #1 matrix. Expected: -18
const H = [
    [3, 5, -6, 4],
    [0, -2, 3, -3],
    [0, 0, 1, 5],
    [0, 0, 0, 3]
]

// 3.1 Exercise # 13 matrix
const G = [
    [4, 0, -7, 3, -5],
    [0, 0, 2, 0, 0],
    [7, 3, -6, 4, -8],
    [5, 0, 5, 2, -3],
    [0, 0, 9, -1, 2]
]
let u = [[1,2],[3,4]]
let v = [[0,1],[1,0]]

const J = [
    [5, 1, -8, 4],
    [-2, -7, 3, -5],
    [1,2,3,4]
]
const x = [
    [5,1],
    [-1,2],
    [3,3],
    [-2,4],
]
let Jx = Matrix.multiply(J, x);

let vectorEq = J.map((Jrow, idx)=> x.map((row, i)=> `${row[0]}*${Jrow[i]}`).join(" + ") + ` = ${Jx[idx]}`).join("\n")
console.log(vectorEq)
// console.log(Problems.makeVectorEquation(J, x))
// console.log(Problems.multiplyAndAddTwo(u, v))
// console.log(Matrix.scalarMultiply(H, 2))


// console.log(Matrix.Utilities.toLaTeX(G))
// let detA = RowOps.shrink(H, 0,  0,1 );
// console.log(detA)



// idxs.forEach((ele)=>{
//     let a_s = RowOps.shrink(C, 0, ele)
//     console.log(`Iter.: ${ele} (C[0][ele]: ${C[0][ele]})`)
//     Matrix.displayMatrix(a_s)
//     // detA += CoFactor(0, ele)*RowOps.findDeterminant2x2(a_s)
// })
// Matrix.displayMatrix(shrunk)

// console.log(detA)
// RowOps.det(A)
