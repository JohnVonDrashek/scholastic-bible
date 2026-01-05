import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

// Default prompt for main header image
const DEFAULT_PROMPT = `Medieval illuminated manuscript style header image for a scholarly Catholic Bible study website.
Features: ornate golden Celtic knotwork border, aged parchment texture, Latin scripture text fading into background,
a quill pen and inkwell, scholarly annotations in margins, warm candlelit atmosphere.
Style: reminiscent of the Book of Kells and medieval scriptoriums.
Colors: deep burgundy, gold leaf, aged cream parchment, dark oak wood tones.
Aspect ratio: wide banner format, no text overlays.`;

async function generateImage() {
  // Configuration from environment variables
  const prompt = process.env.PROMPT || DEFAULT_PROMPT;
  const outputPath = process.env.OUTPUT
    ? path.resolve(projectRoot, process.env.OUTPUT)
    : path.join(projectRoot, 'site/public/header.png');
  const aspectRatio = process.env.ASPECT || '16:9';
  const imageCount = parseInt(process.env.COUNT || '1', 10);
  const model = process.env.MODEL || 'imagen-4.0-generate-001';

  // Validate aspect ratio
  const validAspects = ['1:1', '3:4', '4:3', '9:16', '16:9'];
  if (!validAspects.includes(aspectRatio)) {
    console.error(`Invalid aspect ratio: ${aspectRatio}`);
    console.error(`Valid options: ${validAspects.join(', ')}`);
    process.exit(1);
  }

  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Created directory: ${outputDir}`);
  }

  // Initialize Gemini client
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const isGeminiModel = model.startsWith('gemini-');
  console.log(`Generating image with ${isGeminiModel ? 'Gemini' : 'Imagen'}...`);
  console.log(`Model: ${model}`);
  console.log(`Aspect ratio: ${aspectRatio}`);
  console.log(`Output: ${outputPath}`);
  console.log(`Prompt: ${prompt.substring(0, 100)}...`);

  try {
    if (isGeminiModel) {
      // Use Gemini for image generation
      const response = await ai.models.generateContent({
        model,
        contents: {
          role: 'user',
          parts: [{ text: `Generate an image: ${prompt}\n\nAspect ratio: ${aspectRatio}` }]
        },
        config: {
          responseModalities: ['image', 'text']
        }
      });

      // Get the generated image
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            const buffer = Buffer.from(part.inlineData.data, 'base64');
            fs.writeFileSync(outputPath, buffer);
            console.log(`Image saved to: ${outputPath}`);
            return;
          }
          if (part.text) {
            console.log('Model response:', part.text);
          }
        }
      }
      console.error('No image in response');
      process.exit(1);

    } else {
      // Use Imagen for image generation
      const response = await ai.models.generateImages({
        model,
        prompt,
        config: {
          numberOfImages: imageCount,
          aspectRatio,
        },
      });

      if (response.generatedImages && response.generatedImages.length > 0) {
        for (let i = 0; i < response.generatedImages.length; i++) {
          const imgBytes = response.generatedImages[i].image.imageBytes;
          const buffer = Buffer.from(imgBytes, "base64");

          // If multiple images, add index to filename
          let finalPath = outputPath;
          if (imageCount > 1) {
            const ext = path.extname(outputPath);
            const base = outputPath.slice(0, -ext.length);
            finalPath = `${base}-${i + 1}${ext}`;
          }

          fs.writeFileSync(finalPath, buffer);
          console.log(`Image saved to: ${finalPath}`);
        }
      } else {
        console.error('No images generated');
        process.exit(1);
      }
    }
  } catch (error) {
    console.error('Error generating image:', error.message);
    process.exit(1);
  }
}

generateImage();
