export const PROMPT_TEMPLATES = {
  summarize: (text) => `Summarize the following:\n\n${text}`,
  explain: (text) =>
    `Explain the following like I'm 5 years old using short, simple bullet points. Format it like this:
. First point
. Second point
Do not use bold text, asterisks, or numbers. Keep it very simple and clear:\n\n${text}`,
  translate: (text, targetLang = "English") =>
    `Translate the following to ${targetLang}:\n\n${text}`,
  generate: (text, context = "") =>
    context
      ? `Write a professional response to:\n\n${context}\n\nOriginal text: ${text}`
      : `Write a professional response to:\n\n${text}`,
  custom: (text, prompt) => `${prompt}\n\n${text}`,
};
