import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { DB } from '../../../Firebase.js'
export const deletecomment = async (req, res) => {
  try {
    const { QUIZID, CommentID } = req.query

    console.log('Received QUIZID:', QUIZID)
    console.log('Received CommentID:', CommentID)

    // Fetch the post document from Firestore
    const postDoc = await getDoc(doc(DB, 'AIQUIZ', QUIZID))

    if (postDoc.exists()) {
      const postData = postDoc.data()
      console.log('Current Post Data:', postData)

      // Ensure comments is an array and filter out the comment to be deleted
      if (Array.isArray(postData.comments)) {
        const updatedComments = postData.comments.filter(
          (comment) => comment.CommentID !== CommentID
        )
        console.log('Updated Comments:', updatedComments)

        // Update the post document with the new comments array
        await updateDoc(doc(DB, 'AIQUIZ', QUIZID), {
          comments: updatedComments,
        })

        res
          .status(200)
          .json({ success: true, message: 'Comment deleted successfully' })
      } else {
        res
          .status(400)
          .json({ success: false, message: 'Comments field is not an array' })
      }
    } else {
      res.status(404).json({ success: false, message: 'Post not found' })
    }
  } catch (error) {
    console.error('Error deleting comment:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}
