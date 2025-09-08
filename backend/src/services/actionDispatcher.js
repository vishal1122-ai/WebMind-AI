import { PROMPT_TEMPLATES } from "../../prompts/templates.js";
import axios from "axios";

export async function dispatchAction({
  action,
  text,
  language = "en",
  userPrompt = null,
  apiKey,
}) {
  let prompt = "";

  if (action === "translate") {
    if (!userPrompt || userPrompt.trim().length === 0) {
      throw new Error("Please specify a target language.");
    }
    prompt = `Translate the following text to ${userPrompt}:\n\n${text}`;
  } else if (action === "custom") {
    if (!userPrompt || userPrompt.trim().length === 0) {
      throw new Error("Please enter your custom prompt.");
    }
    prompt = `${userPrompt}:\n\n${text}`;
  } else {
    const promptBuilder = PROMPT_TEMPLATES[action];
    if (!promptBuilder) throw new Error("Invalid action");
    prompt = promptBuilder(text);
  }

  // ✅ Safe content filtering
  const blacklist = ["delete", "shutdown", "format", "malware", "attack"];
  const combinedText = `${userPrompt || ""} ${text}`.toLowerCase();
  for (let word of blacklist) {
    if (combinedText.includes(word)) {
      throw new Error("❌ Prompt blocked due to unsafe content.");
    }
  }

  // ✅ Call OpenRouter API
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "mistralai/mistral-small",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  // ✅ Fallback check
  if (!response.data.choices?.length) {
    throw new Error("AI did not return a valid response.");
  }

  return response.data.choices[0].message.content.trim();
}
