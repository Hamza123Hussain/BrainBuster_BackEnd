import express from 'express'
import { Port } from './Config.js'
import cors from 'cors'
import AuthRouter from './DB/Routes/AuthRouter.js'
import QuestionAiRouter from './DB/Routes/QuestionAI.js'
import UserRouter from './DB/Routes/UserRouter.js'

const App = express()
// Enable CORS for all origins
const corsOptions = {
  origin: true, // Allow all origins https://notes-app-node-next-9x72.vercel.app/
  optionsSuccessStatus: 200, // For legacy browser support
}

App.use(express.json())
App.use(cors(corsOptions))

App.use('/api/User', UserRouter)
App.use('/api/AIAsk', QuestionAiRouter)

App.use('/api/Auth', AuthRouter)
App.listen(Port, () => {
  console.log(`RUNNING ON ${Port}`)
})
