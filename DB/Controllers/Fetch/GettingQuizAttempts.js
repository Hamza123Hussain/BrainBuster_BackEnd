import { collection, getDocs, query, where } from 'firebase/firestore'
import { DB } from '../../../Firebase.js'

export const getQuizAttempts = async (req, res) => {
  try {
    const { UserEmail } = req.query

    // Validate that UserEmail is provided
    if (!UserEmail) {
      return res.status(400).json({ error: 'UserEmail is required' })
    }

    // Reference to the UserAttempts collection
    const userAttemptsRef = collection(DB, 'UserAttempts')

    // Create a query against the collection
    const userAttemptsQuery = query(
      userAttemptsRef,
      where('AttemptedBy', '==', UserEmail)
    )

    // Fetch documents based on the query
    const querySnapshot = await getDocs(userAttemptsQuery)

    if (querySnapshot.empty) {
      return res.status(404).json({ error: 'No attempts found for this user' })
    }

    // Collecting all document data
    const attempts = []
    querySnapshot.forEach((doc) => {
      attempts.push({ id: doc.id, ...doc.data() })
    })

    return res.status(200).json(attempts)
  } catch (error) {
    console.error('Error fetching document data:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
