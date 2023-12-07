const Matrix = {
    ops:{
        /**
         * Compares the number of columns of A against
         * the number of columns of matrix B to see if 
         * it is possible to scalar multiply the two matrices
         * @param {number[][]} A - a 2D array of integers representing a matrix
         * @param {number[][]} B - a 2D array of integers representing a matrix
         * @returns {boolean} - returns if 2 matrices can be multiplied together
         */
        canScalar(A, B){
            return A[0].length === B.length;
        },
        
        /**
         * Checks if 2 m x n matrices can be added together
         * @param {number[][]} A - a 2D array of integers representing a matrix
         * @param {number[][]} B - a 2D array of integers representing a matrix
         * @returns {boolean} - returns if 2 matrices can be added together
         */
        canAdd(A, B){
            return (this.size(A, 0) === this.size(B, 0)) && (this.size(A) === this.size(B))
        },
        
        /**
         * Returns a JS object checking if the program can scalar multiply or add
         * two matrices, and contains any relevant error messages
         * @param {number[][]} A - a 2D array of integers representing a matrix
         * @param {number[][]} B - a 2D array of integers representing a matrix
         * @returns {{canScalar: boolean, canAdd: boolean, messages:{}}} - returns a JS object with relevant matrix operation information
         */
        compareSizes(A, B){
            // const messages = { scalar : this.canScalar ? "Can't scalar multiply "}
            const result = {
                canScalar : this.canScalar(A, B),
                canAdd    : this.canAdd(A, B),
                messages  : {}
            }
            if(!result.canScalar) result.messages.scalarError = "Matrices can't be multiplied due to inconsistent sizes";
            if(!result.canAdd) result.messages.addError = "Matrices can't be added due to incompatible sizes";
            return result
        },

        size(A, axis){
            return axis !== undefined ? A[axis].length : A.length
        },

        /**
         * Adds two matrices together
         * @param {number[][]} A - a 2D array of integers representing a matrix
         * @param {number[][]} B - a 2D array of integers representing a matrix
         * @param {number} [a=1] a - scaler for a
         * @param {number} [b=1] b - scaler for a
         * @returns {number[][]} - A 2D array that is the result of adding matrices A and B
         */
        add(A, B, a, b){
            const compared = this.compareSizes(A, B)
            if(!compared.canAdd){
                throw new Error(compared.messages.addError)
            }
            return A.map((rowA, i)=>{
                return rowA.map((eleA, j) => parseFloat((a*eleA + b*B[i][j]).toFixed(3)))
            })
        },
        
        /**
         * Multiplies two matrices together to get a new matrix
         * @param {number[][]} A - a 2D array of integers representing a matrix
         * @param {number[][]} B - a 2D array of integers representing a matrix
         * @returns {number[][]} - A 2D array that is the result of multiplying matrices A and B
         */
        multiply(A, B){
            const compared = this.compareSizes(A, B);
            if(!compared.canScalar){
                throw new Error(compared.messages.scalarError)
            }
            return A.map((rowA) =>
                B[0].map((_, j)=>parseFloat(rowA.reduce((acc, eleA, k) => acc + eleA * B[k][j], 0).toFixed(3)))
            )
        },
        
        /**
         * Multiplies a matrix by some scalar value
         * @param {number[][]} A - a 2D array to multiply by some x
         * @param {number} x - any scalar x 
         * @returns {number[][]}
         */
            scalarMultiply(A, x){
                return A.map((ele, i) => parseFloat(ele.map((num)=> num*x)).toFixed(3))
            },
    },

    vector:{
        validate(u, v){
            if(!Array.isArray(u) || !Array.isArray(v)){
                throw new Error("Both u and v must be arrays")
            }
            if(!u.every(Array.isArray) || !v.every(Array.isArray)){
                throw new Error("Both u and v must be 2D arrays")
            }
            if(u[0].length !== 1 || v[0].length !== 1){
                throw new Error("Both u and v must be vectors (single-column matrices)")
            }
            if(u.length !== v.length){
                throw new Error(`Both u and v must contain the same number of rows: ${u.length} === ${v.length} (${u.length === v.length})`)
            }
        },
        
        isSame(u,v){
            Matrix.vector.compare(u, v)
            return u.reduce((acc, ele, i) => ele[i] === v[i] ? true : acc, false)
        },
        ops:{
            /**
             * Checks if two vectors are orthogonal
             * @param {number[][]} u - first vector
             * @param {number[][]} v - second vector
             * @returns {boolean}
             */
            orthogonal(u, v){
                Matrix.vector.validate(u, v)
                return this.dot(u ,v).flat() == 0
            },
            
            /**
             * Compute the unit vector of vector u
             * @param {number[][]} u 
             * @returns {number[][]}
             */
            unitVector(u){
                return Matrix.ops.scalarMultiply(u, 1 / this.dist(u))
            },

            /**
             * Finds the distance between u and v
             * @param {number[][]} u - first vector 
             * @param {number[][]} v - second vector
             * @returns returns this distance between the two vectors
             */
            distBetween(u, v){
                Matrix.vector.validate(u, v)
                return this.dist(Matrix.ops.add(u, v, 1, -1))
            },

            /**
             * Computes the "Inner" (Dot) product of two vectors
             * @param {number[][]} u - first vector 
             * @param {number[][]} v - second vector
             * @returns {number[][]}
             */
            dot(u, v){
                Matrix.vector.validate(u, v)
                return Matrix.ops.multiply(Matrix.Transformations.transpose(u), v);
            },
            /**
             * Returns the distance (or length or norm) of a vector
             * @param {number[][]} u - vector to find the distance of 
             * @returns 
             */
            dist(u){
                return Math.sqrt(this.dot(u, u))
            },
            /**
             * Checks if a set of vectors is an orthogonal set
             * @param {number[][][]} vectors - an array of vectors
             * @returns {boolean[]} - returns a list of boolean values
             */
            orthogonalSet(vectors){
                // let pairs = vectors.flatMap((_, i) => vectors.slice(i + 1).map(j => [vectors[i], j]));
                return vectors.flatMap((_, i) => vectors.slice(i + 1).map(j => [vectors[i], j])).map((pair, i)=> this.orthogonal(pair[0], pair[1]))

            },
            /**
             * This computes the projection of y onto vector u. The result is a vector that represents
             * the component of y in the direction of u scaled by the length of u
             * @param {number[][]} y - projection vector onto u 
             * @param {number[][]} u - 
             * @returns {number[][]}
             */
            vectorProjection(y, u){
                Matrix.vector.validate(y, u);
                return Matrix.ops.scalarMultiply(u, (this.dot(y, u) / this.dot(u, u)))
                
            }, 
            orthogonalBasis(vectors, y){
                return vectors.map(vector => {
                    let frac = this.scalarProjectionRatio(y, vector);
                    return `$\\frac{${frac.num}}{${frac.denom}}${Matrix.Utilities.toLaTeX(vector)}$`
                }).join(' + \n')
            },
            /**
             * Computes the scalar proejction ratio of the vector y onto the vector u.
             * @param {number[][]} y - project y...
             * @param {number[][]} u - onto u
             * @returns 
             */
            scalarProjectionRatio(y, u){
                Matrix.vector.validate(y, u);
                let vals = [this.dot(y, u), this.dot(u, u)]
                console.log(vals)
                return {num: vals[0], denom: vals[1]}
            }
        }
    },
    Transformations: {
        /**
         * Transposes a matrix
         * @param {number[][]} matrix - A 2D array of integers 
         * @returns {number[][]} - Returns the transpose of that matrix
         */
        transpose: (matrix) => {
            return matrix[0].map((_, r)=> matrix.reduce((ca, row)=> [...ca, row[r]], []))
        }
    },
    Utilities:{
        /**
         * Creates an n x n Identity matrix
         * @param {number} n - Number of rows to to create I_n (n x n Identity matrix) 
         * @param {number} lambda - Scalar value to multiply each value by (good for stochastic stuff)
         * @returns {number[][]} - Returns I_n as a matrix
         */
        makeNxNIdentity(n, lambda){
            // const identity: number[][] = 
            return Array.from({ length: n}, (_, i) => Array.from({length: n}, (_, j) => (i === j ? 1*lambda : 0)))
            // return identity;
        },

        /**
         * Attempts to compute the stochastic gradient of a matrix?
         * @param {number[][]} A 
         * @param {number[][]} vector 
         * @param {number} check_n 
         */
        stochasticGradient(A, vector, check_n){
            console.log(`=====================\nCurrent Iteration: ${check_n}`)
            if(check_n === 0){
                console.log(`Displaying result of ${A} * ${vector}`)
                this.displayMatrix(vector)
            }
            else{
                console.log(`Displaying: ${A} * ${vector}`)
                // this.displayMatrix(A)
                this.displayMatrix(this.multiply(A, vector))
                this.stochasticGradient(A, this.multiply(A, vector), check_n-1)
            }
            
        },

        /**
         * Converts a matrix to LaTeX
         * @param {number[][]} matrix 
         * @returns {string} 
         */
        toLaTeX(matrix){
            let num_slash = '\\\\'
            let t = matrix.reduce((acc, current, idx)=>{
                let row_string = current.map(ele => `${ele}`).join(" & ")
                // ${idx === 0 || idx === matrix.length -1 ? "" : "\\:"} add this after ... num_slash} to get the \\: back
                return `${acc}${row_string}${idx === matrix.length -1 ? "" : num_slash} ` 
        
            }, "")
            // console.log(`\\begin{pmatrix}${t}\\end{pmatrix}`)
            return `\\begin{pmatrix}${t}\\end{pmatrix}`
        
        }
    },

    
    
    findSteadyStateVector(matrix){
        let ssv = Matrix.add(matrix, Matrix.makeNxNIdentity(matrix.length, -1))
        Matrix.displayMatrix(ssv)
        console.log(to_symbolab_matrix(ssv))
    },
    findBasisOfEigenSpace(matrix, eigenValue){
        const identity = this.makeNxNIdentity(matrix[0].length, (-1)*eigenValue)
        return this.add(matrix, identity)
    },


    displayMatrix(A){
        A.forEach(element => {
            console.log(element)
        });
    }
}



const row_reduce = (matrix) =>{
    let cols = []
    matrix = matrix.map(row => {
        cols.push(...row.reduce((a, v, i) => (v == 0 && a.push(i), a), []) )
        return row.includes(0) ? Array(row.length).fill(0) : row;
      })
      
      cols.forEach((i) => {
          matrix = matrix.map(row => row.map((v, idx) => i == idx ? 0 : v))
      })
    for (let row of matrix) console.log(row.join(' '));

    }



const lazyEigens = (matrix, lambdas) =>{
    console.log(`Original Matrix`)
    Matrix.displayMatrix(matrix)
    lambdas.forEach((ele)=>{
        console.log(`Lambda: ${ele}`)
        let temp = Matrix.findBasisOfEigenSpace(matrix, ele)
        // console.log(`Lambda (${ele})=> Row Reduced`)
        // Matrix.displayMatrix(temp)
        to_symbolab_matrix(temp)
        // row_reduce(temp)
    })
}
const quadraticEquation = (a, b,c) =>{
    let left = (-b);
    console.log(a,b,c)
    let right = Math.sqrt(Math.pow(b,2) +(4*a*c))
    let bottom = 2*a;
    return {
        eq: `${left/bottom} +/- ${right/bottom}`,
        plus: (left/bottom) + right/bottom,
        minus: (left/bottom) - right/bottom
    }
}

const findSteadyStateVector = (matrix) =>{
    let ssv = Matrix.add(matrix, Matrix.makeNxNIdentity(matrix.length, -1))
    Matrix.displayMatrix(ssv)
    to_symbolab_matrix(ssv)
}



// // const probs_matrix = [[.1, .6], [.9, .4]]
// const probs_matrix = [[.8, .5], [.2, .5]]
// findSteadyStateVector(probs_matrix)
// console.log(quadraticEquation(1,-7,22))
const mat = [
    [3, -1, 3],
    [-1, 3, 3],
    [6, 6, 2]
]

let relation = [
    [.7, .1, .1],
    [.2, .8, .2],
    [.1, .1, .7]
]
let steady = [
    [1], [0]
]
const Demonstrate = {
    matrices: {
        A: [
            [3, 5, 6],
            [10,4, 8]
        ],
        B: [
            [2, 4],
            [1, 0],
            [5, 1]
        ],
        C: [
            [1, 0, 1],
            [2, 0, 2]
        ]
    },
    get(matrix_id){
        return this.matrices[matrix_id];
    },
    scalarMultiplyMatrices(){
        // Multiplying compatible matrices:
        let AB = Matrix.multiply(this.get('A'), this.get('B'));
        Matrix.displayMatrix(AB);

        // Multiplying incompatible matrices:
        let AC = Matrix.multiply(this.get('A'), this.get('C'));
        // This will error because A's number of columns don't match C's
        // number of rows
    },
    addTwoMatrices(){
        // Adding two compatible matrices:
        let A_C = Matrix.add(this.get("A"), this.get("C"));
        Matrix.displayMatrix(A_C);
        // Adding incompatible matrices:
        let A_B = Matrix.add(this.get("A"), this.get("B"));
        // This will error because A and B are not the same exact
        // sizes (2x3 not compatible with 3x2)
    },
    convertToLaTeX(){
        // Converting a matrix to LaTeX:
        let latexMatrix = Matrix.Utilities.toLaTeX(this.get("A"));
        console.log(latexMatrix);
    },
    transposeMatrix(){
        // Displaying the matrix before transposing
        console.log("Pre-transposed matrix:");
        Matrix.displayMatrix(this.get("A"));
        // Transposing this.matrices["A"] and displaying it
        let transposedMatrix = Matrix.Transformations.transpose(this.get("A"));
        console.log("Post-transposed matrix:");
        Matrix.displayMatrix(transposedMatrix);
    },
    makeNxNIdentity(){
        // Calling the makeNxNIdentity matrix will
        // create an NxN Identity Matrix with each value
        // being some lambda
        let n = 4;
        let lambda = 1;
        // The method takes: n, some number for n rows and cols
        // and some lambda, like 1 would be 1*I_n
        // 2 would be 2*I_n, and so on.
        let I_n = Matrix.makeNxNIdentity(n, lambda);
        Matrix.displayMatrix(I_n);
    }
}
// Demonstrate.makeNxNIdentity()
module.exports = {Matrix};