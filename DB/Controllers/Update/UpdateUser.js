import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { DB, Storage } from '../../../Firebase.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export const UpdateUserController = async (req, res) => {
  const { email, newName } = req.body
  const image = req.file
  let imageUrl = ''
  if (image) {
    // Sanitize the email to be URL-friendly
    const sanitizedEmail = email.replace(/[^a-zA-Z0-9]/g, '_')
    const imagePath = `images/${sanitizedEmail}/${image.originalname}` // Directly use the path string
    const imageRef = ref(Storage, imagePath)
    const imageBuffer = image.buffer
    // Upload the image to Firebase Storage
    await uploadBytes(imageRef, imageBuffer)
    // Get the download URL for the image
    imageUrl = await getDownloadURL(imageRef)
  }
  try {
    // Reference to the user's document in Firestore
    const userDocRef = doc(DB, 'USERS', email)

    // Retrieve the user's document
    const userDoc = await getDoc(userDocRef)

    if (!userDoc.exists()) {
      // User does not exist
      return res.status(404).json({ message: 'USER NOT FOUND' })
    }

    // Update user details in Firestore
    await updateDoc(userDocRef, { Name: newName, imageUrl })

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
