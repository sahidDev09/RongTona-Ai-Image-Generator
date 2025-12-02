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

  // Retry configuration
  private readonly maxRetries = 3;
  private readonly baseDelayMs = 500;

  async generateImage(options: GenerationOptions): Promise<string> {
    try {
      const prompt = this.enhancePrompt(options.prompt, options.style);

      const response = await this.callGenerateContentWithRetries([prompt]);

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
    } catch (error: any) {
      console.error("Error generating image:", error);
      const code = error?.error?.code || error?.code || error?.statusCode;
      const status = error?.error?.status || error?.status;
      if (
        code === 429 ||
        status === "RESOURCE_EXHAUSTED" ||
        error?.__handledByGeminiService
      ) {
        throw new Error(
          "Failed to generate image: quota or rate limit exceeded. Check your plan and billing: https://ai.google.dev/gemini-api/docs/rate-limits and monitor usage: https://ai.dev/usage?tab=rate-limit"
        );
      }

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

      const response = await this.callGenerateContentWithRetries([
        enhancedPrompt,
        imagePart,
      ]);

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
    } catch (error: any) {
      console.error("Error editing image:", error);
      const code = error?.error?.code || error?.code || error?.statusCode;
      const status = error?.error?.status || error?.status;
      if (
        code === 429 ||
        status === "RESOURCE_EXHAUSTED" ||
        error?.__handledByGeminiService
      ) {
        throw new Error(
          "Failed to edit image: quota or rate limit exceeded. Check your plan and billing: https://ai.google.dev/gemini-api/docs/rate-limits and monitor usage: https://ai.dev/usage?tab=rate-limit"
        );
      }

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

  private async callGenerateContentWithRetries(contents: any[]) {
    const attempt = async (n: number): Promise<any> => {
      try {
        return await ai.models.generateContent({
          model: this.imageModelId,
          contents,
        });
      } catch (err: any) {
        // Inspect possible error shapes to detect rate limits / quota errors
        const code = err?.error?.code || err?.code || err?.statusCode;
        const status = err?.error?.status || err?.status || err?.statusText;

        const isRateLimit =
          code === 429 || status === "RESOURCE_EXHAUSTED" || status === 429;

        if (isRateLimit && n < this.maxRetries) {
          const jitter = Math.random() * 100;
          const delay = this.baseDelayMs * 2 ** n + jitter;
          console.warn(
            `Rate limit detected (attempt ${n + 1}). Retrying in ${Math.round(
              delay
            )}ms...`
          );
          await this.sleep(delay);
          return attempt(n + 1);
        }

        // Not retrying or exhausted retries — rethrow with original info attached
        err.__handledByGeminiService = true;
        throw err;
      }
    };

    return attempt(0);
  }

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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
