import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    questionType: String,
    description: String,
    points: Number,
    correctAnswer: String,
    possibleAnswers: [
        {
          text: String,
          isCorrect: Boolean,
          // _id: false, // Disable automatic `_id` addition by Mongoose
        }, // Array of objects for detailed answers
    ],
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
  },
  // { versionKey: false }, // Disable the __v field
  { collection: "questions" }
);

export default schema;