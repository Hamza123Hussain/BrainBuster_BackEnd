import { collection, getDocs, query, where } from 'firebase/firestore'
import { DB } from '../../../Firebase.js'

export const GetAiQuestionsController = async (req, res) => {
  const { UserEmail } = req.query
  try {
    if (!UserEmail) {
      return res.status(400).json({ error: 'UserEmail is required' })
    }
    // Reference to the AIQUIZ collection
    const aiQuestionsCollectionRef = collection(DB, 'AIQUIZ')
    // Create a query to filter documents by UserEmail
    const aiQuestionsQuery = query(
      aiQuestionsCollectionRef,
      where('UserEmail', '==', UserEmail)
    )
    // Get documents matching the query
    const querySnapshot = await getDocs(aiQuestionsQuery)
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
