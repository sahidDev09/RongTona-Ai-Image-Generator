import { useState } from "react";
import { Sparkles, Wand2, Download, Loader2 } from "lucide-react";
import {
  geminiService,
  type GenerationOptions,
} from "../services/geminiService";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("action-figure");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const styles = [
    {
      id: "action-figure",
      name: "Action Figure",
      description: "Transform into collectible action figure",
    },
    {
      id: "superhero",
      name: "Superhero",
      description: "Become a caped crusader",
    },
    { id: "anime", name: "Anime", description: "Japanese animation style" },
    {
      id: "realistic",
      name: "Realistic",
      description: "Photorealistic enhancement",
    },
    { id: "vintage", name: "Vintage", description: "Classic retro style" },
    { id: "cartoon", name: "Cartoon", description: "Animated cartoon style" },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const options: GenerationOptions = {
        prompt: prompt.trim(),
        style: selectedStyle,
        quality: "high",
      };

      const imageUrl = await geminiService.generateImage(options);
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error("Generation failed:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement("a");
      link.href = generatedImage;
      link.download = `generated-${Date.now()}.jpg`;
      link.click();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        <div className="flex items-center mb-6">
          <Wand2 className="w-6 h-6 text-purple-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">Generate from Text</h2>
        </div>
        {/* Two-column layout: left controls, right preview (when available) */}
        <div
          className={`grid grid-cols-1 gap-8 ${
            generatedImage ? "md:grid-cols-2" : ""
          }`}>
          {/* Left: Controls */}
          <div className="space-y-6">
            {/* Prompt Input */}
            <div>
              <label className="block text-white font-medium mb-3">
                Describe what you want to create
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A warrior standing on a mountain peak, holding a glowing sword..."
                className="w-full h-32 bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>

            {/* Style Selection */}
            <div>
              <label className="block text-white font-medium mb-3">
                Choose Style
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                      selectedStyle === style.id
                        ? "border-blue-500 bg-blue-500/20"
                        : "border-slate-600 bg-slate-800/30 hover:border-slate-500"
                    }`}>
                    <div className="text-white font-medium">{style.name}</div>
                    <div className="text-slate-400 text-sm mt-1">
                      {style.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center">
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Image
                </>
              )}
            </button>
          </div>

          {/* Right: Preview */}
          {generatedImage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Preview</h3>
                <button
                  onClick={handleDownload}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4">
                <img
                  src={generatedImage}
                  alt="Generated artwork"
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
