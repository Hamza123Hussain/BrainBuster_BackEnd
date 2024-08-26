export const QuestionPrompt = (numberOfQuestions, topic, difficulty) => {
  return `
    You are an intelligent assistant that generates educational content. Create an array of ${numberOfQuestions} multiple-choice questions (MCQs) on the topic "${topic}". Each question should have the following format:

    1. Question: Provide a concise, clear question.
    2. Options: List four possible answer choices without any letter labels (just the options).
    3. Correct Answer: Provide the full text of the correct option as the answer.
    4. Explanation: Provide a brief explanation of why the correct answer is correct.

    The difficulty level of the questions should be "${difficulty}". Ensure that the questions are varied and cover different aspects of the topic.

    Example:
    [
      {
        "Question": "What is the capital of France?",
        "Options": ["Berlin", "Madrid", "Paris", "Rome"],
        "Correct_Answer": "Paris",
        "Explanation": "Paris is the capital and largest city of France."
      },
      ...
    ]
  `
}
