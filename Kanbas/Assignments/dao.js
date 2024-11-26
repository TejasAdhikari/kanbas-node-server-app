import Database from "../Database/index.js";
import model from "./model.js";
import CourseModel from "../Courses/model.js";


export async function findAssignmentsForCourse(courseId) {
    // const course = await CourseModel.findOne({ _id: courseId }); 
    // if (!course) {
    //     throw new Error(`Course with name ${courseId} not found`);
    // }
    // return model.find({ course: course.number });
    return model.find({ course: courseId });
}

export function createAssignment(assignment) {
    delete assignment._id
    return model.create(assignment);

    // const newAssignment = { ...assignment, _id: Date.now().toString() };
    // Database.assignments = [...Database.assignments, newAssignment];
    // return newAssignment;
}

export function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
}

export function updateAssignment(assignmentId, assignmentUpdates) {
    // const { assignments } = Database;
    // const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    // Object.assign(assignment, assignmentUpdates);
    // return assignment;
    return model.updateOne({ _id: assignmentId }, assignmentUpdates);
}