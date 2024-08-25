import { doc, setDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import { DB } from '../../../Firebase.js'
import { ChatSessions } from '../../../GemniConfig.js'
import { QuestionPrompt } from '../../Prompts/Questions.js'
export const AiQuestionController = async (req, res) => {
  const RandomID = uuid() // Unique ID for the document
  try {
    const { Topic, NumberOfQuestions, UserEmail, Difficulty, UserName } =
      req.body
    if (!UserEmail) {
      return res.status(400).json({ error: 'UserEmail is required' })
    }
    if (!Difficulty) {
      return res.status(400).json({ error: 'Difficulty is required' })
    }
    // Sanitize user email to use as part of the document ID
    const sanitizedUserEmail = UserEmail.replace(/[@.]/g, '_')
    // Generate the AI question prompt
    const prompt = QuestionPrompt(NumberOfQuestions, Topic, Difficulty)
    // Send prompt to Gemini AI
    const Gemini_Response = await ChatSessions.sendMessage(prompt)
    const AiResponse = await Gemini_Response.response.text()
    // Sanitize AI response
    const sanitizedAiResponse = AiResponse.replace(/```json|```/g, '').trim()
    // Parse AI response as JSON
    let validatedQuestions
    try {
      validatedQuestions = JSON.parse(sanitizedAiResponse)
    } catch (error) {
      console.error('Failed to parse AI response:', error)
      return res.status(500).json({
        error: 'Failed to parse AI response',
        details: sanitizedAiResponse,
      })
    }
    if (
      Array.isArray(validatedQuestions) &&
      validatedQuestions.length === NumberOfQuestions
    ) {
      // Save the validated AI questions to Firestore
      await setDoc(
        doc(DB, 'AIQUIZ', RandomID), // Use RandomID as the document ID
        {
          MessageID: uuid(),
          Topic,
          NumberOfQuestions,
          UserEmail,
          Difficulty,
          Questions: validatedQuestions,
          ID: RandomID,
          CreatedBy: UserName,
        }
      )
      // Respond with the AI questions
      res.status(200).json(validatedQuestions)
    } else {
      res
        .status(500)
        .json({ error: 'Failed to generate valid AiQuestion recommendations' })
    }
  } catch (error) {
    console.error('Error:', error)
    res
      .status(500)
      .json({ error: 'Failed to generate AiQuestion recommendations' })
  }
}
