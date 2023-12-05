const {Matrix} = require('./Eigen')

// /**
//  * 
//  * @param {Array[Array]} A 
//  */
// function 
const RowOps = {
    addRowsWithScalar(matrix, rowIdx1, rowIdx2, scalar){
        // console.log(matrix, rowIdx1, rowIdx2, scalar)
        matrix = matrix[rowIdx1].map((ele, idx)=> ele + matrix[rowIdx2][idx]*scalar)
        return matrix
    },
    colOrRowExpansion(A, val){
        return A.reduce((acc, row, index)=>
            (acc.push({ colOrRow: val, index: index, zeroes_count: row.reduce((count, num) => (num === 0 ? count + 1 : count), 0)}), acc) ,[]
        )
    },
    getMax(ls){
        let max = 0;
        let res;
        // .filter(([_, x]) => x === upc)
        ls.forEach((ele)=> 
        {
            if(ele.zeroes_count > max){
                max = ele.zeroes_count;
                res = ele
            }
        })
        // console.log(res)
        return res
    },
            // det += A[s][col] * this.shrink(A.filter((_, rowIdx) => rowIdx !== s).map(row => row.filter((_, colIdx) => colIdx !== col)), s + 1, 0, sum + A[s][col] * Math.pow(-1, s + col));
    CoFactor(r, c){
        return Math.pow((-1), r+c)
    },
    findDeterminant2x2(A){
        return A[0][0]*A[1][1] + (-1)*A[0][1]*A[1][0]
    },
    /**
     * My attempt at calculating the determinant of an n by n matrix
     * @param {number[][]} A - a 2D array (matrix)
     * @param {number} s - some start value (the row to cofactor expand on)
     * @param {number} sum - running sum (0)
     * @param {number} mult - some multiplicity (1)
     * @returns {number}
     */
    shrink(A, s, sum, mult){
        // If the length of A is 2:
        //  return detA * mult + sum
        return A.length === 2 
            ? sum + mult * this.findDeterminant2x2(A) 
            // Else A[s].reduce()...
            : A[s].reduce((acc, _, e) =>
                // returning this.shrink(), passing in the newly shrunken matrix,
                this.shrink(
                // this will just make a nxn matrix go to (n-1) x (n-1) excluding some row and columns
                A.filter((_, rowIdx) => rowIdx !== s).map(row => row.filter((_, colIdx) => colIdx !== e)), 
                // s (constant), 
                s, 
                // sum becomes sum + acc,
                sum + acc, 
                // and mult becomes A[s][e] * (-1) ** (s+e) 
                mult*A[s][e] * this.CoFactor(s, e)),
             0)
    },
    // With LU Decomposition, we eliminate the subdiagonal entreis
    // in the first column of A 
    // [
            // 1 2 3 4 -> 1 2 3 4 (a_{2,1} / a_{1, 1} - A_{2} (row 2))
            // 5 6 7 8 -> 
            // 9 1 2 4
            // 4 2 0 1 
    // ]
    /**
     * 
     * @param {number[][]} A 
     */
    LUDecomp(A, start){
        let B;
        if(start === A.length-1) return A;
        let firstCol0s = A.map((row, i)=>
            i === start ? A[i] : A[i].map((ele, idx) => (A[i][idx] - (A[i][0]/A[0][0])*A[0][idx] ))
)
        console.log(firstCol0s)
        return this.LUDecomp(firstCol0s, start+1)
        // Matrix.displayMatrix(firstCol0s)
    },
    /**
     * TODO : Finish this beast.
     * Essentially, this is supposed to calculate the determinant of any NxN matrix
     * But I haven't finished it yet because I am still working
     * on the logic for the code that shrinks the matrices and such....so, check back
     * later
     * @param {number[][]} A 
     */
    det(A){
        console.log(A)
        // Determinant of A:
        if(A[0].length !== A.length){
            throw new Error([
                'Can only get det A if A is an n by n matrix:',
                `${A.length} x ${A[0].length}`,
                `(${A[0].length === A.length})`
            ].join(" "))
        }
        let colIdxs = this.colOrRowExpansion(Matrix.Transformations.transpose(A), "col")
        let rowIdxs = this.colOrRowExpansion(A, "row")
        // let idxs = colOrRowExpansion(A)
        let max = this.getMax([...colIdxs, ...rowIdxs])
        console.log(max)
        if(max === undefined){
            let rowIdx = Array.from({length: A.length }, (_, index)=> index)
            let colIdx = Array.from({length: A.length }, (_, index) => index)
            console.log(rowIdx, colIdx)
            // expansion on first row...
            
        }
        else if(max.colOrRow === 'col'){
            // expansion on x column
        }
        else if(max.colOrRow === 'row'){
            // expansion on x row
        }
        // console.log(this.getMax(), rowIdxs)

    },
}

module.exports = {RowOps}