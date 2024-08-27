import { doc, getDoc } from 'firebase/firestore'
import { DB } from '../../../Firebase.js'

export const getQuizAttempts = async (req, res) => {
  try {
    const { UserEmail, docId } = req.query

    if (!UserEmail || !docId) {
      return res.status(400).json({ error: 'UserEmail and docId are required' })
    }

    // Reference to the Firestore document
    const docRef = doc(DB, 'UserAttempts', docId)

    // Fetch the document
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return res.status(404).json({ error: 'Document not found' })
    }

    // Get the document data
    const data = docSnap.data()

    return res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching document data:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
