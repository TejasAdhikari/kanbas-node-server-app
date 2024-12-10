import * as quizzesDao from "./dao.js"
import * as questionsDao from "../Questions/dao.js"
import model from "./model.js";

export default function QuizRoutes(app) {
    app.delete("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const status = await quizzesDao.deleteQuiz(quizId);
        res.send(status);
    });
    app.put("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
        res.send(status);
    });    


    //For Questions
    app.get("/api/quizzes/:quizId/questions", async (req, res) => {
        const { quizId } = req.params;
        const questions = await questionsDao.findQuestionsForQuiz(quizId);
        res.json(questions);
    });
    app.post("/api/quizzes/:quizId/questions", async (req, res) => {
        const { quizId } = req.params;
        const question = {...req.body, quiz: quizId,};

        // const quizDetails = model.findById(quizId);
        
        // const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
        const quiz = await model.findOne({ _id: quizId });
        console.log(quiz);
        // const quizUpdates = {...quiz, points:(quiz.points + question.points)};
        await model.updateOne({ _id: quizId }, { $set: {points:(quiz.points + question.points)}}); // Correct
        // const status = await quizzesDao.updateQuiz(quizId, quizUpdates);

        const newQuestion = await questionsDao.createQuestion(question);
        res.send(newQuestion);
    });
}