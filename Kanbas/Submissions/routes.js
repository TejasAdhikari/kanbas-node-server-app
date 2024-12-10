import model from "./model.js";
import QuizModel from "../Quizzes/model.js";
import QuestionModel from "../Questions/model.js";

export default function SubmissionRoutes(app) {
  app.get("/api/quizzes/:qid/submission/:userId", async (req, res) => {
      const { qid, userId } = req.params;
    
      try {
        const submission = await model.findOne({ quiz: qid, user: userId });
        // console.log(submission);
        // if (!submission) 
        //   return res.status(404).send("Submission not found");
    
        res.json(submission);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
  });

  app.post("/api/quizzes/:qid/submit", async (req, res) => {
      const { userId, answers } = req.body;
      const { qid } = req.params;

      try {
        const quiz = await QuizModel.findById(qid);
        
        if (!quiz) return res.status(404).send("Quiz not found");

        // Calculate score
        let score = 0;
        for (const answer of answers) {
          // console.log(answer)
          answer.isCorrect = false;
          const question = await QuestionModel.findById(answer.question);
          // const question = quiz.questions.find(
          //   (q) => q._id.toString() === answer.questionId
          // );
          if (question){
            if(question.questionType !== "Fill in the Blank" 
              // && 
              //   question.correctAnswer === answer.selectedAnswer
              ) {
                  for(const possAns of question.possibleAnswers){
                    if(possAns.isCorrect === true && (possAns.text === answer.selectedAnswer)){
                      score += question.points;
                      answer.isCorrect = true;
                    }
                  }
                // score += question.points;
            }
            else{
              for(const corrAns of question.possibleAnswers){
                if(corrAns.text &&
                  answer.selectedAnswer &&
                  corrAns.text.toUpperCase() === answer.selectedAnswer.toUpperCase()){
                    score += question.points;
                    answer.isCorrect = true;
                }
              }
              
            }
            // console.log(question.points);
          }
        }

        const prev = await model.findOne({ quiz: qid, user: userId })
        if(prev){
          const updates = { 
            answers, 
            score,
            attempts: (prev.attempts + 1),
          }
          const submission = await model.updateOne({ quiz: qid, user: userId }, { $set: updates });
          res.status(201).json(submission);
        }
        else{
          const submission = await model.create({
            user: userId,
            quiz: qid,
            answers,
            score,
            attempts: 1,
          });
          res.status(201).json(submission);
        }

        
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
  });
}