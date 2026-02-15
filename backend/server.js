import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/uiux", async (req, res) => {
  try {
    const { userInput } = req.body;

    const response = await openai.responses.create({
      model: "gpt-4.1",
      input: [
        {
          role: "system",
          content: `
You are a senior UI/UX expert.
Only provide information related to:
- UI components
- UX best practices
- Usability improvements
- Accessibility
- Interaction design
- User flows

If the request is outside UI/UX scope, respond:
"This request is outside UI/UX scope."

Respond ONLY in JSON format:
{
  "problem": string,
  "ux_principles": string[],
  "ui_suggestions": string[],
  "accessibility_notes": string[]
}
          `
        },
        {
          role: "user",
          content: userInput
        }
      ],
      response_format: { type: "json_object" }
    });

    const output = response.output[0].content[0].text;

    const parsed = JSON.parse(output);

    res.json(parsed);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "UI/UX generation failed" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
