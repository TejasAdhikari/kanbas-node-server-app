import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    questionType: String,
    description: String,
    points: Number,
    correctAnswer: String,
    possibleAsnwers: [
        {
          text: String,
          isCorrect: Boolean,
        }, // Array of objects for detailed answers
    ],
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
  },
  { collection: "questions" }
);

export default schema;