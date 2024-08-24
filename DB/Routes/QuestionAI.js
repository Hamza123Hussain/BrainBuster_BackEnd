import express from 'express'

import { getAllAiQuestions } from '../Controllers/Fetch/GettingAllDocs.js'
import { AiQuestionController } from '../Controllers/Create/QuestionsAsk.js'

const QuestionAiRouter = express.Router()

QuestionAiRouter.post('/', AiQuestionController)
QuestionAiRouter.get('/GetAll', getAllAiQuestions)
/**UserID as qury in the get */
export default QuestionAiRouter
