import express from 'express'

import { getAllAiQuestions } from '../Controllers/Fetch/GettingAllDocs.js'
import { AiQuestionController } from '../Controllers/Create/QuestionsAsk.js'
import { GetDoc } from '../Controllers/Fetch/GettingASingleQuiz.js'

const QuestionAiRouter = express.Router()

QuestionAiRouter.post('/', AiQuestionController)
QuestionAiRouter.get('/GetAll', getAllAiQuestions)
QuestionAiRouter.get('/GetDoc', GetDoc)
//ID as query in getdoc
/**UserID as qury in the get */
export default QuestionAiRouter
