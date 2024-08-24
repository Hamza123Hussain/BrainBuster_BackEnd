import { doc, deleteDoc } from 'firebase/firestore'
import { DB } from '../../../Firebase.js'

export const deleteAiQuestion = async (req, res) => {
  try {
    const { UserID, RandomID } = req.query // Use req.query instead of req.params

    if (!UserID || !RandomID) {
      return res.status(400).json({ error: 'UserID and RandomID are required' })
    }

    const sanitizedUserID = UserID.replace(/[@.]/g, '_')
    const docRef = doc(
      DB,
      'AiQuestionSuggest',
      sanitizedUserID,
      'AiQuestion',
      RandomID
    )

    await deleteDoc(docRef)

    res.status(200).json({ message: 'Document deleted successfully' })
  } catch (error) {
    console.error('Error deleting document:', error)
    res.status(500).json({ error: 'Failed to delete document' })
  }
}
