import { collection, getDocs, query } from 'firebase/firestore'
import { DB } from '../../../Firebase.js'

const sanitizeEmail = (email) => {
  return email.replace(/[^a-zA-Z0-9_]/g, '_') // Replace non-alphanumeric characters with underscores
}

export const GetAiQuestionsController = async (req, res) => {
  const { UserEmail } = req.query

  try {
    if (!UserEmail) {
      return res.status(400).json({ error: 'UserEmail is required' })
    }

    const sanitizedUserEmail = sanitizeEmail(UserEmail)

    // Reference to the user's AiQuestion collection
    const aiQuestionsCollectionRef = collection(
      DB,
      'AiQuestionSuggest',
      sanitizedUserEmail,
      'AiQuestion'
    )

    // Query to get all documents in the AiQuestion collection
    // const aiQuestionsQuery = query(aiQuestionsCollectionRef)

    const querySnapshot = await getDocs(aiQuestionsCollectionRef)

    // Extract data from query results
    const aiQuestions = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    if (aiQuestions.length > 0) {
      res.status(200).json(aiQuestions)
    } else {
      res
        .status(404)
        .json({ message: 'No AI questions found for the given UserEmail' })
    }
  } catch (error) {
    console.error('Error fetching AI questions:', error)
    res
      .status(500)
      .json({ error: 'Failed to fetch AI questions', details: error.message })
  }
}
