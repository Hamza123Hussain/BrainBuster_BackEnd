import { collection, getDocs } from 'firebase/firestore'
import { DB } from '../../../Firebase.js'
export const getAllAiQuestions = async (req, res) => {
  try {
    // Reference to the AIQUIZ collection
    const aiQuizRef = collection(DB, 'AIQUIZ')
    // Get all documents in the AIQUIZ collection
    const querySnapshot = await getDocs(aiQuizRef)

    const allDocuments = []
    // Iterate through each document in the AIQUIZ collection
    querySnapshot.forEach((docSnapshot) => {
      allDocuments.push({ id: docSnapshot.id, ...docSnapshot.data() })
    })
    res.status(200).json(allDocuments)
  } catch (error) {
    console.error('Error fetching all documents:', error)
    res.status(500).json({ error: 'Failed to fetch all documents' })
  }
}
