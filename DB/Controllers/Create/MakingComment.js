import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { DB } from '../../../Firebase.js'
export const create_commment = async (req, res) => {
  const randomId = uuidv4()
  try {
    const { message, UserEmail, QUIZID, UserImage, UserName } = req.body
    // Fetch the user document from Firestore
    const userDoc = await getDoc(doc(DB, 'USERS', UserEmail))
    if (userDoc.exists()) {
      // Update the post document with the new comment
      await updateDoc(doc(DB, 'AIQUIZ', QUIZID), {
        comments: arrayUnion({
          CommentID: randomId,
          Text: message,
          UserName,
          UserEmail,
          CreatedAt: Date.now(),
          UserImage,
        }),
      })
      res.status(200).json({
        CommentID: randomId,
        Text: message,
        UserName,
        UserEmail,
        CreatedAt: Date.now(),
        UserImage,
      })
    } else {
      res.status(404).json({ success: false, message: 'User not found' })
    }
  } catch (error) {
    console.error('Error adding comment:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}
