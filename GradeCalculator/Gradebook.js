class CourseInformation{

    // const classData = {
    //     courseID: '00101',
    //     students: [{name:"o2i3n", studentID: "12034"}],
    //     grades: [{name: "12034", categories: ['12','14','42'], scores: [100, 1, 40]}]
    // }
    constructor(courseID, instructor){
        this.data = {
            courseID: courseID,
            instructor: instructor,
            students: [],
            gradeBook : [],
            grades: []
        }
    }
    /**
     * Adds a student
     * @param {string} name - Student name
     * @param {string} studentID - Student ID
     */
    addStudent(name, studentID){
        this.data.students.push({name, studentID, grades:[]});
    }
    /**
     * Creates a new course
     * @param {string} courseID - CourseID
     * @param {string} instructor - Instructor name
     */
    createCourse(courseID, instructor){
        this.data.courseID = courseID;
        this.data.instructor = instructor;
    }
    /**
     * @param {Array} weights
     * @param {Array} categories 
     */
    createGradeBook(weights, categories){
        this.data.gradeBook = []
        if(weights.length != categories.length){
            throw new Error(`Lengths of weights (${weights.length}) inconsistent with length of categories (${categories.length}) (${weights.length === categories.length})`)
        }
        categories.forEach((category, idx) =>{
            this.data.gradeBook.push({category: category, weight: weights[idx]})        
        })

    }
    /**
     * Adds an assignment to a students gradebook
     * @param {string} category 
     * @param {number} score 
     * @param {number} studentID 
     */
    addAssignment(category, score, studentID){
        let student = this.data.students.filter((x, i) => x.studentID === studentID)[0]
        let studentGradesCat = student.grades.filter((x, i)=>x.category===category)[0]
        studentGradesCat ?  studentGradesCat.scores.push(score) : student.grades.push({category: category, scores: [score]}) 
    }
    /**
     * Adds many assignments to a students gradebook
     * @param {string} category - category to add assignments to
     * @param {number[]} scores - list of scores for that category 
     * @param {string} studentID - Student ID
     */
    addMany(category, scores, studentID){
        scores.forEach((score)=>{
            this.addAssignment(category, score, studentID)
        })
    }
    /**
     * Returns the weight of a category...
     * @param {string} category - category to get the weight of
     * @returns 
     */
    getWeight(category){
        return this.data.gradeBook.filter((cat) => cat.category === category)[0].weight
    }
    /**
     * Calculates a students grade
     * @param {string} studentID - Student ID
     * @returns 
     */
    calcGrade(studentID){
        const studentGrades = this.data.students.filter((stu)=>stu.studentID === studentID)[0]
        let maxPoints = 0;
        let currentPoints = 0;
        let finalGrade= studentGrades.grades.reduce((acc, cat, i) => {
            // console.log(acc, cat.category, i); 
            let weight = this.data.gradeBook.filter((x, i)=>x.category === cat.category)[0]
            return acc + cat.scores.reduce((sa, ele, j)=>{
                maxPoints += 100 * weight.weight/ cat.scores.length;
                currentPoints += ele * weight.weight / cat.scores.length
                return sa + ele*(weight.weight/cat.scores.length) 
            
            }, 0)
        }
            ,0)
        console.log(`Max possible: ${maxPoints}\nTotal Student Points: ${currentPoints}\nEstimate: ${currentPoints/maxPoints}`)
        return finalGrade / maxPoints * 100
    }
}
function main(){
    let CS3305 = new CourseInformation("3305", "Dr. Bodily");
    [["Zac", '1010'], ["Madson", '401'], ["Pratham", '51'], ["Sansar", '1034']].forEach(
        (ele) => {
            CS3305.addStudent(ele[0], ele[1])
        }
    )
    CS3305.createGradeBook(
        [.3, .2, .15, .1, .25], ['Tests', 'Assignments', 'Performances', 'Attendance', 'Final']
    )
    let scores = {'Performances': [66.67, 86.67, 100, 100], 'Tests': [74.17, 83.33, 88.83], 'Assignments': [100, 80], 'Attendance': [100]}
    console.log(CS3305.data.students.filter((x, _)=>x.studentID === "1010")[0].grades)
    CS3305.addMany('Tests', scores.Tests, '1010')
    CS3305.addMany('Assignments', scores.Assignments, '1010')
    CS3305.addMany('Performances', scores.Performances, '1010')
    CS3305.addMany('Attendance', scores.Attendance, '1010')
    const fg = CS3305.calcGrade('1010');
    console.log(`1010's final grade is: ${fg} % (might be slightly off depending on instructor grading)`)
}

main()