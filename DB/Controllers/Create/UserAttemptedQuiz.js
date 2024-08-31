import { doc, getDoc, setDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import { DB } from '../../../Firebase.js'

export const UserAttempts = async (req, res) => {
  const RandomID = uuid() // Unique ID for the document
  try {
    const { UserEmail, QuizID, Score } = req.body
    if (!UserEmail) {
      return res.status(400).json({ error: 'UserEmail is required' })
    }

    if (!QuizID) {
      return res.status(400).json({ error: 'QuizID is required' })
    }

    // Fetch the quiz document from Firestore
    const quizDocRef = doc(DB, 'AIQUIZ', QuizID)
    const quizDocSnap = await getDoc(quizDocRef)

    if (!quizDocSnap.exists()) {
      return res.status(404).json({ error: 'Quiz not found' })
    }

    // Extract only the fields you need
    const quizData = quizDocSnap.data()
    const { CreatedBy, Difficulty, ID, NumberOfQuestions, Topic } = quizData

    // Fetch the user document from Firestore
    const userDocRef = doc(DB, 'USERS', UserEmail)
    const userDocSnap = await getDoc(userDocRef)

    if (!userDocSnap.exists()) {
      return res.status(404).json({ error: 'User not found' })
    }

    const userData = userDocSnap.data()

    try {
      // Store the user attempt in Firestore
      await setDoc(doc(DB, 'UserAttempts', RandomID), {
        AttemptID: RandomID,
        AttemptedBy: UserEmail,
        UserData: userData,
        QuizData: {
          CreatedBy,
          Difficulty,
          ID,
          NumberOfQuestions,
          Topic,
        },
        Score,
        CreatedAt: Date.now(),
      })

      return res.status(200).json(true)
    } catch (error) {
      console.error('Failed to store user attempt:', error)
      return res.status(500).json({ error: 'Failed to store user attempt' })
    }
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
