import { doc, setDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import { db } from '../../Firebase.js'
import { chatSessions } from '../../GemniConfig.js'
import { QuestionPrompt } from '../Prompts/Questions.js'

export const AiQuestionController = async (req, res) => {
  const RandomID = uuid() // Unique ID for the document
  try {
    const { Topic, NumberOfQuestions, UserEmail, Difficulty } = req.body

    if (!UserEmail) {
      return res.status(400).json({ error: 'UserEmail is required' })
    }

    if (!Difficulty) {
      return res.status(400).json({ error: 'Difficulty is required' })
    }

    const sanitizedUserEmail = UserEmail.replace(/[@.]/g, '_')

    // Generate the AiQuestion using Gemini AI
    const prompt = QuestionPrompt(NumberOfQuestions, Topic, Difficulty)
    console.log('Prompt:', prompt)

    const Gemini_Response = await chatSessions.sendMessage(prompt) // Pass the prompt string here
    console.log('Gemini_Response:', Gemini_Response)

    const AiResponse = await Gemini_Response.response.text()
    console.log('AI Response Text:', AiResponse)

    // Sanitize AI response to remove backticks and trim any whitespace
    const sanitizedAiResponse = AiResponse.replace(/```json|```/g, '').trim()
    console.log('Sanitized AI Response:', sanitizedAiResponse)

    // Parse AI response as JSON
    let validatedQuestions
    try {
      validatedQuestions = JSON.parse(sanitizedAiResponse)
    } catch (error) {
      console.error('Failed to parse AI response:', error)
      return res
        .status(500)
        .json({
          error: 'Failed to parse AI response',
          details: sanitizedAiResponse,
        })
    }

    if (
      Array.isArray(validatedQuestions) &&
      validatedQuestions.length === NumberOfQuestions
    ) {
      // Save the validated AiQuestions to Firestore
      await setDoc(
        doc(
          db,
          'AiQuestionSuggest',
          sanitizedUserEmail,
          'AiQuestion',
          RandomID
        ),
        {
          MessageID: uuid(),
          Questions: validatedQuestions,
          ID: RandomID,
        }
      )

      // Respond with the AiQuestions
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
