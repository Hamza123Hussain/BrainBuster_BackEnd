import express from 'express'
import { UpdateUserController } from '../Controllers/Update/UpdateUser.js'
import { deleteAiQuestion } from '../Controllers/Delete/DeleteQuiz.js'
import { GetAiQuestionsController } from '../Controllers/Fetch/GettingUserQuizzes.js'

const UserRouter = express.Router()

UserRouter.put('/UpdateDoc', UpdateUserController)
UserRouter.delete('/DeleteQuiz', deleteAiQuestion)
UserRouter.get('/GetQuiz', GetAiQuestionsController)
//  UserEmail as query in the get
/**UserID, RandomID as query in the delete */

export default UserRouter
