import { doc, updateDoc } from 'firebase/firestore'
import { DB } from '../../../Firebase.js'
export const updateAiQuestion = async (req, res) => {
  try {
    const { UserID, RandomID } = req.query // Use req.query instead of req.params
    const { Questions } = req.body

    if (!UserID || !RandomID) {
      return res.status(400).json({ error: 'UserID and RandomID are required' })
    }

    if (!Questions || !Array.isArray(Questions)) {
      return res.status(400).json({ error: 'Questions must be an array' })
    }

    const sanitizedUserID = UserID.replace(/[@.]/g, '_')
    const docRef = doc(
      DB,
      'AiQuestionSuggest',
      sanitizedUserID,
      'AiQuestion',
      RandomID
    )

    await updateDoc(docRef, { Questions })

    res.status(200).json({ message: 'Document updated successfully' })
  } catch (error) {
    console.error('Error updating document:', error)
    res.status(500).json({ error: 'Failed to update document' })
  }
}
