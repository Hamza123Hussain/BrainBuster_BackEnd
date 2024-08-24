import { collection, getDocs } from 'firebase/firestore'
import { DB } from '../../../Firebase.js'
export const getAllAiQuestions = async (req, res) => {
  try {
    const { UserID } = req.query // Use req.query instead of req.params

    if (!UserID) {
      return res.status(400).json({ error: 'UserID and are required' })
    }

    const querySnapshot = await getDocs(collection(DB, 'AiQuestionSuggest'))

    const allDocuments = []
    querySnapshot.forEach((docSnapshot) => {
      docSnapshot.forEach((subCollection) => {
        allDocuments.push({ id: subCollection.id, ...subCollection.data() })
      })
    })

    res.status(200).json(allDocuments)
  } catch (error) {
    console.error('Error fetching all documents:', error)
    res.status(500).json({ error: 'Failed to fetch all documents' })
  }
}
