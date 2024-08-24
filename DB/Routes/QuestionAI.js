import express from 'express'
import { AiQuestionController } from '../Controllers/QuestionsAsk.js'

const QuestionAiRouter = express.Router()

QuestionAiRouter.post('/', AiQuestionController)

export default QuestionAiRouter
