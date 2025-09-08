import { useState, useRef } from "react";
import { Upload, Sparkles, Download, Loader2, X } from "lucide-react";
import { geminiService } from "../services/geminiService";
import type { ImageEditOptions } from "../services/geminiService";

const ImageEditor = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("action-figure");
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setEditedImage(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const files = input.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
    // Clear the input so selecting the same file again triggers change
    input.value = "";
  };

  const handleEdit = async () => {
    if (!selectedImage || !editPrompt.trim()) return;

    setIsEditing(true);
    try {
      const options: ImageEditOptions = {
        image: selectedImage,
        prompt: editPrompt.trim(),
        style: selectedStyle,
      };

      const editedImageUrl = await geminiService.editImage(options);
      setEditedImage(editedImageUrl);
    } catch (error) {
      console.error("Edit failed:", error);
      alert("Failed to edit image. Please try again.");
    } finally {
      setIsEditing(false);
    }
  };

  const handleDownload = (imageUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = filename;
    link.click();
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setEditedImage(null);
    setEditPrompt("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        <div className="flex items-center mb-6">
          <Sparkles className="w-6 h-6 text-blue-400 mr-3" />
          <h2 className="text-2xl font-bold text-white">
            Transform Your Image
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Upload Section */}
          <div>
            <label className="block text-white font-medium mb-3">
              Upload Image
            </label>
            {!imagePreview ? (
              <div
                className={`relative border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer ${
                  isDragging
                    ? "border-blue-400 bg-blue-500/10"
                    : "border-slate-600 hover:border-slate-500 bg-slate-800/50"
                } aspect-square overflow-hidden flex items-center justify-center`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}>
                <div className="text-center px-6">
                  <Upload
                    className={`w-12 h-12 mx-auto mb-4 transition-colors ${
                      isDragging ? "text-blue-400" : "text-slate-400"
                    }`}
                  />
                  <p className="text-slate-300 mb-2 font-medium">
                    Drop your image here
                  </p>
                  <p className="text-slate-500 text-sm">or click to browse</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            ) : (
              <div className="relative border-2 border-dashed border-slate-600 rounded-xl bg-slate-800/50 aspect-square overflow-hidden">
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-300 z-10">
                  <X className="w-4 h-4" />
                </button>
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          {/* Result Section */}
          <div>
            <label className="block text-white font-medium mb-3">
              Transformed Result
            </label>
            {editedImage ? (
              <div className="relative border-2 border-slate-600 rounded-xl bg-slate-800/50 aspect-square overflow-hidden">
                {/* In-image overlay header */}
                <div className="absolute top-0 left-0 right-0 z-10 p-3 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    Transformed Image
                  </h3>
                  <button
                    onClick={() =>
                      handleDownload(
                        editedImage,
                        `transformed-${Date.now()}.jpg`
                      )
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors duration-300 flex items-center text-sm shadow-md">
                    <Download className="w-4 h-4 mr-1.5" />
                    Download
                  </button>
                </div>
                <img
                  src={editedImage}
                  alt="Transformed"
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="relative border-2 border-dashed border-slate-600 rounded-xl bg-slate-800/50 aspect-square overflow-hidden flex items-center justify-center text-center">
                <div>
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-slate-500" />
                  <p className="text-slate-400">
                    Your transformed image will appear here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full-width Edit Controls */}
        {imagePreview && (
          <div className="mt-8 space-y-6">
            <div>
              <label className="block text-white font-medium mb-3">
                Transformation Prompt
              </label>
              <textarea
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
                placeholder="Transform this person into a superhero with cape and mask..."
                className="w-full h-32 bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>

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

            <button
              onClick={handleEdit}
              disabled={!editPrompt.trim() || isEditing}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center">
              {isEditing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Transforming...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Transform Image
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageEditor;
