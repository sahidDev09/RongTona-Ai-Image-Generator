import { GoogleGenAI } from "@google/genai";

// Define and export ImageEditOptions interface here
export interface ImageEditOptions {
  image: File;
  prompt: string;
  style?: string;
}

const API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("Google Gemini API key is not configured");
}

// Initialize the modern GenAI SDK
const ai = new GoogleGenAI({ apiKey: API_KEY });

export interface GenerationOptions {
  prompt: string;
  style?: string;
  aspectRatio?: string;
  quality?: string;
}

export class GeminiImageService {
  // Model for image generation/editing via Gemini API
  private readonly imageModelId = "gemini-2.5-flash-image-preview";

  async generateImage(options: GenerationOptions): Promise<string> {
    try {
      const prompt = this.enhancePrompt(options.prompt, options.style);

      const response = await ai.models.generateContent({
        model: this.imageModelId,
        contents: [prompt],
      });

      // Find the first image part in the response and return it as a data URL
      type InlinePart = {
        inlineData?: { data: string; mimeType?: string };
        text?: string;
      };
      const parts: InlinePart[] =
        (response.candidates?.[0]?.content?.parts as InlinePart[]) ?? [];
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const mime = part.inlineData.mimeType || "image/png";
          return `data:${mime};base64,${part.inlineData.data}`;
        }
      }

      throw new Error("No image returned by Gemini.");
    } catch (error) {
      console.error("Error generating image:", error);
      throw new Error("Failed to generate image. Please try again.");
    }
  }

  async editImage(options: ImageEditOptions): Promise<string> {
    try {
      // Convert image to base64
      const imageDataUrl = await this.fileToBase64(options.image);
      const base64 = imageDataUrl.split(",")[1];

      const imagePart = {
        inlineData: {
          data: base64,
          mimeType: options.image.type || "image/png",
        },
      };

      const enhancedPrompt = `Transform this image: ${options.prompt}. Style: ${
        options.style || "action figure"
      }. Maintain the subject's key features and natural lighting.`;

      const response = await ai.models.generateContent({
        model: this.imageModelId,
        contents: [enhancedPrompt, imagePart],
      });

      type InlinePart = {
        inlineData?: { data: string; mimeType?: string };
        text?: string;
      };
      const parts: InlinePart[] =
        (response.candidates?.[0]?.content?.parts as InlinePart[]) ?? [];
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const mime = part.inlineData.mimeType || "image/png";
          return `data:${mime};base64,${part.inlineData.data}`;
        }
      }

      throw new Error("No edited image returned by Gemini.");
    } catch (error) {
      console.error("Error editing image:", error);
      throw new Error("Failed to edit image. Please try again.");
    }
  }

  private enhancePrompt(prompt: string, style?: string): string {
    const styleEnhancements: Record<string, string> = {
      "action-figure":
        "as a detailed action figure with articulated joints, dynamic pose, heroic proportions",
      superhero:
        "as a superhero with cape, mask, muscular build, dramatic lighting",
      anime: "in anime art style with large eyes, vibrant colors, dynamic hair",
      realistic: "photorealistic with professional lighting and composition",
      vintage:
        "in vintage photography style with sepia tones and classic composition",
      cartoon:
        "as a cartoon character with exaggerated features and bright colors",
    };

    const enhancement = style ? styleEnhancements[style] || "" : "";
    // Encourage coherent visuals
    return `${prompt} ${enhancement}. Highly detailed, coherent composition, professional lighting.`.trim();
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

export const geminiService = new GeminiImageService();
