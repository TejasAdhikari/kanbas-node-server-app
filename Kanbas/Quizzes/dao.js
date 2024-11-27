import model from "./model.js";


export async function findQuizzesForCourse(courseId) {
    // const { quizzes } = Database;
    // return quizzes.filter((quiz) => quiz.course === courseId);

    return model.find({ course: courseId });
}

export function createQuiz(quiz) {
    delete quiz._id
    return model.create(quiz);

    // const newAssignment = { ...assignment, _id: Date.now().toString() };
    // Database.assignments = [...Database.assignments, newAssignment];
    // return newAssignment;
}

export function deleteQuiz(quizId) {
    // console.log("Type: ", typeof(quizId), "ID: ", quizId);
    return model.deleteOne({ _id: quizId });
}

export function updateQuiz(quizId, quizUpdates) {
    // const { assignments } = Database;
    // const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    // Object.assign(assignment, assignmentUpdates);
    // return assignment;
    return model.updateOne({ _id: quizId }, quizUpdates);
}