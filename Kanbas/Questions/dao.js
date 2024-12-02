import model from "./model.js";


export async function findQuestionsForQuiz(quizId) {
    // const { quizzes } = Database;
    // return quizzes.filter((quiz) => quiz.course === courseId);
    // console.log(quizId);
    return model.find({ quiz: quizId });
}

export function createQuestion(question) {
    // console.log(question);
    delete question._id
    // if(question.points === null){
    //     question = {
    //         ...question, 
    //         points: 5,
    //     };
    // }
    return model.create(question);
}

export function deleteQuestion(questionId) {
    // console.log("Type: ", typeof(quizId), "ID: ", quizId);
    return model.deleteOne({ _id: questionId });
}

export function updateQuestion(questionId, questionUpdates) {
    // const { assignments } = Database;
    // const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    // Object.assign(assignment, assignmentUpdates);
    // return assignment;
    return model.updateOne({ _id: questionId }, questionUpdates);
}