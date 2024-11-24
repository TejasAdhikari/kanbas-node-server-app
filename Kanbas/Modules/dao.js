import Database from "../Database/index.js";
import model from "./model.js";
import CourseModel from "../Courses/model.js"
import mongoose from "mongoose";

// var mongoose = require('mongoose');

export async function findModulesForCourse(courseId) {
    // console.log(typeof(objectId));
    const course = await CourseModel.findOne({ _id: courseId }); 
    if (!course) {
        throw new Error(`Course with name ${courseId} not found`);
    }
    return model.find({ course: course.number });
}

export function createModule(module) {
    delete module._id
    return model.create(module);
}

export function deleteModule(moduleId) {
    return model.deleteOne({ _id: moduleId });
}

export function updateModule(moduleId, moduleUpdates) {
    return model.updateOne({ _id: moduleId }, moduleUpdates);
}
  
   
