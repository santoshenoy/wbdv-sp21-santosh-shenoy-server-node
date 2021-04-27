const questionsModel = require('../models/questions/questions-model')
const quizzesModel = require('../models/quizzes/quizzes-model')

const findAllQuestions = () => {
    return questionsModel.find()
}

const findQuestionsForQuiz = (quizID) => {
    return questionsModel.find({quizId: quizID})
}

const findQuestionById = (quid) => {
    return questionsModel.findById(quid)
}

module.exports = {
    findAllQuestions,
    findQuestionsForQuiz,
    findQuestionById
}