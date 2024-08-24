import express from 'express'
import { Port } from './Config.js'
import cors from 'cors'
import SummaryRouter from './DB/Routes/SummaryRoute.js'
import MusicRouter from './DB/Routes/MusicSuggestRoute.js'
import AuthRouter from './DB/Routes/AuthRouter.js'

const App = express()
// Enable CORS for all origins
const corsOptions = {
  origin: true, // Allow all origins https://notes-app-node-next-9x72.vercel.app/
  optionsSuccessStatus: 200, // For legacy browser support
}

App.use(express.json())
App.use(cors(corsOptions))

App.use('/api/Summary', SummaryRouter)
App.use('/api/Music', MusicRouter)

App.use('/api/Auth', AuthRouter)
App.listen(Port, () => {
  console.log(`RUNNING ON ${Port}`)
})
