import express from 'express'
import { UpdateUserController } from '../Controllers/Update/UpdateUser.js'
import { deleteAiQuestion } from '../Controllers/Delete/DeleteQuiz.js'
import { GetAiQuestionsController } from '../Controllers/Fetch/GettingUserQuizzes.js'
import multer from 'multer'
import { GetUserController } from '../Controllers/Fetch/GettingUserDetails.js'
import { UserAttempts } from '../Controllers/Create/UserAttemptedQuiz.js'
import { getQuizAttempts } from '../Controllers/Fetch/GettingQuizAttempts.js'
const UserRouter = express.Router()
const upload = multer({ storage: multer.memoryStorage() })
UserRouter.put('/UpdateUser', upload.single('image'), UpdateUserController)
UserRouter.delete('/DeleteQuiz', deleteAiQuestion)
UserRouter.get('/GetQuiz', GetAiQuestionsController)
UserRouter.get('/GetUser', GetUserController)
UserRouter.post('/UserAttempts', UserAttempts)
UserRouter.get(`/GettingAttempts`, getQuizAttempts)
//  UserEmail as query in the get
/**UserID, RandomID as query in the delete */

export default UserRouter
