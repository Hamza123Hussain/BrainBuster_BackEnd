import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { DB } from '../../../Firebase.js'

export const UpdateUserController = async (req, res) => {
  const { email, newName, newPassword } = req.body

  try {
    // Reference to the user's document in Firestore
    const userDocRef = doc(DB, 'USERS', email)

    // Retrieve the user's document
    const userDoc = await getDoc(userDocRef)

    if (!userDoc.exists()) {
      // User does not exist
      return res.status(404).json({ message: 'USER NOT FOUND' })
    }

    // Prepare the data to update
    const updates = {}
    if (newName) {
      updates.Name = newName
    }
    if (newPassword) {
      // Update password in Firebase Authentication (if needed)
      // Note: Firebase does not support updating passwords directly from Firestore. You must use Firebase Auth methods for that.
      // For security reasons, this should be handled by an authentication controller.
      return res
        .status(400)
        .json({ message: 'Password update is not handled in this endpoint' })
    }

    // Update user details in Firestore
    await updateDoc(userDocRef, updates)

    // Retrieve and return the updated user's data
    const updatedUserDoc = await getDoc(userDocRef)
    if (updatedUserDoc.exists()) {
      return res.status(200).json(updatedUserDoc.data())
    } else {
      return res
        .status(404)
        .json({ message: 'Updated user data could not be retrieved' })
    }
  } catch (error) {
    // Handle any errors during the update
    console.error('UpdateUser error:', error)
    return res
      .status(500)
      .json({ message: 'INTERNAL SERVER ERROR', details: error.message })
  }
}
