const chemParser = require('./chemParser')
const {RowOps} = require("./RowOperations")
const {Matrix} = require('./Matrix')
const {Problems} = require('./ProblemTypes')
const vector = (v) => v.map(ele => [ele])
const zeroVector = (n) => { return Array.from({ length: n }, (_, i) => Array.from({length: 1}, (_, j) => 0))}
// let isOr = Matrix.vector.ops.orthogonalSet([u_1, u_2, u_3])


// const toMatrix = (vectors) =>{
//     return vectors.map((_, vIdx) => {
//         return vectors[vIdx].map((_, rIdx) => {
//             // console.log(vectors[vIdx][rIdx] , rIdx)
//             console.log([...vectors[rIdx]])
//             return vectors[vIdx][rIdx]
//         })
//     })
//     // return 0
// }

const toMatrix = (vectors) => {
    return vectors[0].map((_, row)=> vectors.map((_, col) => vectors[col][row][0]))
}
/**
 * 
 * @param {number[][]} matrix 
 * @returns {number[][][]}
 */
const toVectors = (matrix) =>{
    return matrix[0].map((_, row)=> matrix.map((_, col) => [matrix[col][row]]))
}

/**
 * 
 * @param {number[][][]} vectors 
 * @returns {number[][][]}
 */
const GramSchmidt = (vectors) =>{

}
const recursiveAddition = (vectors, testVec) => {
    return vectors.reduce((acc, ele, i) => {
    // console.log(acc, ele)
        return Matrix.ops.add(acc, ele, 1, -1)
}, testVec )}
// ? testVec : zeroVector(vectors[0].length)



let A = [
    [3, -5, 1],
    [1, 1, 1],
    [-1, 5, -2],
    [3, -7, 8]
]
let B = [
    [1, 2, 5],
    [-1, 1, -4],
    [-1, 4, -3],
    [1, -4, 7],
    [1, 2, 1]
]
let ans = [
    [3,  1,-3],
    [1,  3, 1], 
    [-1, 3, 1],
    [3, -1, 3]
]
const asVec = toVectors(B);
let r = Matrix.vector.ops.GramSchmidt(asVec)



console.log(r[0])
const wrap = (vectors) => {
    return `$$\\left\\{\n\t${vectors.map((ele, i) => Matrix.Utilities.toLaTeX(ele)).join("\n\t")}\n\\right\\}$$`
}

console.log(`The Gram-Schmidt Process of:\n${wrap(asVec)}\nis this:\n${wrap(r[0])}`)
// console.log(wrap(r[0]))


// let str_res = '$\\left\\{\n$'
// r[0].forEach((ele, i)=>{
//     str_res += "\t$"+Matrix.Utilities.toLaTeX(ele)+"$\n"
//     // console.log(`$\\left\{${Matrix.Utilities.toLaTeX(ele)}]$\n`);
// })
// console.log(str_res+"$\\right\\}$")
// let first = asVec.shift()

// console.log(`Shifted element (first)$${Matrix.Utilities.toLaTeX(first)}$`)
// asVec.forEach((ele, i)=>{
//     console.log(`(post shift) Vectors[${i}]: $${Matrix.Utilities.toLaTeX(ele)}$\n`);
// })



let added = recursiveAddition(asVec, asVec[0])
let temp = asVec[0]

// let gs = JackShit(asVec)

// let r = asVec.map((ele, i) => i === 0? asVec[0] : i +1 === asVec.length ? asVec[i] : Matrix.ops.add(asVec[i], asVec[i+1], 1, 1))
// console.log([...asVec[1]])
// console.log(r)
// // Matrix.vector.ops.GramSchmidt(asVec)


// let w = [asVec[0]];
// let v = [asVec[0]];

// let p_1 = Matrix.vector.ops.orthogonalBasis([asVec[0]], asVec[1])
// let p_2 = Matrix.vector.ops.orthogonalBasis([asVec])

// asVec.forEach((vector_, i)=>{
//     console.log(vector_)
// })






// console.log(testVectors)





// let x1 = vector([3, 6,0])
// let x2 = vector([1, 2,2])
// // Matrix.vector.ops.GramSchmidt([x1, x2])
// let xs = [x1, x2]
// let w = [xs[0]];
// let vs = [xs[0]];



// console.log(Matrix.vector.ops.hat(y, u ))
// console.log(Matrix.vector.ops.hat([[1], [7]], [[-4], [2]]))

// let pairs = orthSet.flatMap((_, i) => orthSet.slice(i + 1).map(j => [i, j]));

// // makePairs(vectors){
// //     return vectors.map((ele, i) => )
// // }
// console.log(pairs)

/*

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
// let Jx = Matrix.multiply(J, x);
*/
// let vectorEq = J.map((Jrow, idx)=> x.map((row, i)=> `${row[0]}*${Jrow[i]}`).join(" + ") + ` = ${Jx[idx]}`).join("\n")
// console.log(vectorEq)
// const byjusEx = [
//     [1, 1, 1],
//     [3, 1, -3],
//     [1, -2, -5]
// ]
// // const luDecomposition = (matrix) => matrix.map((row, i) => matrix[i].map((val, j) => j < i ? matrix[j].reduce((acc, cur, k) => acc - cur * matrix[i][k], val) : val));

// // console.log(luDecomposition(byjusEx))
// const luDecomp = (matrix) =>{
//     return matrix.map((row, i)=>{
//         return matrix[i].map((val, j) => 
//         j !== i 
//             ? val : 
//             matrix[j].reduce((acc, cur, idx)=> acc - cur * matrix[i][idx], val) )
//     })
// }

// let res = luDecomp(byjusEx)
// console.log(res)







// let idx = [0,1,2]
// let res = idx.map((ele)=>{
//     let row = byjusEx[ele].slice();
//     for(let i =0; i < ele; i++){
//         // byjusEx[ele][i] = a_{ele, i}, byjusEx[i][i]] = a_{i, i}
//         let factor = byjusEx[ele][i] / byjusEx[i][i]
//         for(let j=0; j < byjusEx[ele].length; j++){
//             row[j] -= factor * byjusEx[i][j]
//         }
//     }
//     return row
    
    
    // console.log(`Iter: ${ele}`)
    // return byjusEx.map((_, idx)=>{
    //     return byjusEx[idx].map((val, i) => i === idx ? val : val - byjusEx[ele][i]*(byjusEx[ele][idx] / byjusEx[ele][ele]))
    // })
    // let temp = byjusEx.filter((_, i)=> i !== ele)
    // Matrix.displayMatrix(temp)
// })
// Matrix.displayMatrix(res)
// console.log(res)


// let test = [...byjusEx.filter()]
// console.log(test)
// console.log(RowOps.LUDecomp(byjusEx, 0))

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
