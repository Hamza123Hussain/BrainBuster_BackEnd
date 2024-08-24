export const QuestionPrompt = (numberOfQuestions, topic) => {
  return `
    You are an intelligent assistant that generates educational content. Create an array of ${numberOfQuestions} multiple-choice questions (MCQs) on the topic "${topic}". Each question should have the following format:

    1. Question: Provide a concise, clear question.
    2. Options: List four possible answer choices (A, B, C, D).
    3. Correct Answer: Indicate which option (A, B, C, or D) is the correct answer.
    4. Explanation: Provide a brief explanation of why the correct answer is correct.

    Please ensure that the questions are varied and cover different aspects of the topic. The difficulty level should be moderate, suitable for an average learner.

    Example:
    [
      {
        "Question": "What is the capital of France?",
        "Options": ["A) Berlin", "B) Madrid", "C) Paris", "D) Rome"],
        "Correct Answer": "C",
        "Explanation": "Paris is the capital and largest city of France."
      },
      ...
    ]
  `
}
