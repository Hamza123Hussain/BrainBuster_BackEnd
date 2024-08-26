import express from 'express'
import { getAllAiQuestions } from '../Controllers/Fetch/GettingAllDocs.js'
import { AiQuestionController } from '../Controllers/Create/QuestionsAsk.js'
import { GetDoc } from '../Controllers/Fetch/GettingASingleQuiz.js'
import { create_commment } from '../Controllers/Create/MakingComment.js'
import { deletecomment } from '../Controllers/Delete/DeleteComment.js'
const QuestionAiRouter = express.Router()
QuestionAiRouter.post('/', AiQuestionController)
QuestionAiRouter.get('/GetAll', getAllAiQuestions)
QuestionAiRouter.get('/GetDoc', GetDoc)
//ID as query in getdoc
/**UserID as qury in the get */
QuestionAiRouter.post('/NewComment', create_commment)
QuestionAiRouter.delete('/DeleteComment', deletecomment)
/** QUIZID, CommentID as query in delete */
export default QuestionAiRouter
