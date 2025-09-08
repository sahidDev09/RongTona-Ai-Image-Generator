import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Upload, Sparkles, ArrowRight } from "lucide-react";

const Hero = () => {
  const [isDragging, setIsDragging] = useState(false);

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
    // Handle file upload logic here
  };

  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-cyan-300 rounded-full animate-bounce opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-2">
            <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-blue-300 text-sm font-medium">
              Powered by Gemini Nano Banana AI
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-6 leading-tight mt-16">
            Sculpt Reality with
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Digital AI
            </span>
          </h1>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
            Upload any image and watch our advanced AI transform it into
            stunning action figures, artistic masterpieces, or professional
            edits. No design skills required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/studio"
              className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center">
              Start Creating
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 hover:shadow-lg"
              onClick={() => navigate("/demo")}>
              Watch Demo
            </button>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-8 mt-12 text-slate-400 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              No watermarks
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              HD quality
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Instant results
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300">
            <div
              className={`relative border-2 border-dashed rounded-xl p-12 transition-all duration-300 ${
                isDragging
                  ? "border-blue-400 bg-blue-500/10"
                  : "border-slate-600 hover:border-slate-500 bg-slate-800/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}>
              <div className="text-center">
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
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            <div className="mt-6 flex justify-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-75"></div>
                <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>

          {/* Floating cards preview */}
          <div className="absolute -top-4 -right-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-4 transform rotate-6 hover:rotate-12 transition-transform duration-300">
            <div className="w-16 h-16 bg-white/20 rounded-lg"></div>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg p-4 transform -rotate-6 hover:-rotate-12 transition-transform duration-300">
            <div className="w-16 h-16 bg-white/20 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
