import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

async function editImage() {
  const inputPath = process.env.INPUT;
  const outputPath = process.env.OUTPUT || inputPath;
  const prompt = process.env.PROMPT || "Edit this image";

  if (!inputPath) {
    console.error('INPUT environment variable required');
    console.error('Usage: INPUT="path/to/image.png" PROMPT="edit instruction" node lib/edit-image.js');
    process.exit(1);
  }

  const fullInputPath = path.resolve(projectRoot, inputPath);
  const fullOutputPath = path.resolve(projectRoot, outputPath);

  if (!fs.existsSync(fullInputPath)) {
    console.error(`Input file not found: ${fullInputPath}`);
    process.exit(1);
  }

  // Read image as base64
  const imageBuffer = fs.readFileSync(fullInputPath);
  const imageBase64 = imageBuffer.toString('base64');

  // Initialize Gemini client
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  console.log('Editing image with Gemini...');
  console.log(`Input: ${fullInputPath}`);
  console.log(`Output: ${fullOutputPath}`);
  console.log(`Prompt: ${prompt}`);

  try {
    const response = await ai.models.generateContent({
      model: process.env.MODEL || 'gemini-3-pro-image-preview',
      contents: {
        role: 'user',
        parts: [
          { inlineData: { mimeType: 'image/png', data: imageBase64 } },
          { text: prompt + "\n\nPlease generate the edited image." }
        ]
      },
      config: {
        responseModalities: ['image', 'text']
      }
    });

    // Get the generated image(s)
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          const buffer = Buffer.from(part.inlineData.data, 'base64');
          fs.writeFileSync(fullOutputPath, buffer);
          console.log(`Edited image saved to: ${fullOutputPath}`);
          return;
        }
        if (part.text) {
          console.log('Model response:', part.text);
        }
      }
    }

    console.error('No image in response');
    console.log('Full response:', JSON.stringify(response, null, 2));
    process.exit(1);

  } catch (error) {
    console.error('Error editing image:', error.message);
    process.exit(1);
  }
}

editImage();
