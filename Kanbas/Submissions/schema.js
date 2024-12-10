import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    answers: [
      {
        question: { type: mongoose.Schema.Types.ObjectId, ref: "QuestionModel" },
        selectedAnswer: String,
        isCorrect: Boolean,
      },
    ],
    score: Number,
    submittedAt: { type: Date, default: Date.now },
    attempts: Number,

    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  },
  // { versionKey: false }, // Disable the __v field
  { collection: "submissions" }
);

export default schema;