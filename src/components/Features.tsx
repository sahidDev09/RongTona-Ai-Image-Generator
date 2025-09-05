import React from "react";
import {
  Zap,
  Palette,
  Users,
  Shield,
  Download,
  Clock,
  Sparkles,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast AI",
      description:
        "Generate stunning transformations in seconds with our optimized Gemini Nano Banana model.",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: Palette,
      title: "Multiple Styles",
      description:
        "Action figures, artwork, vintage photos, and more. Choose from dozens of transformation styles.",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: Users,
      title: "Batch Processing",
      description:
        "Transform multiple images simultaneously. Perfect for content creators and businesses.",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "Your images are processed securely and automatically deleted after transformation.",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: Download,
      title: "HD Downloads",
      description:
        "Download your transformed images in high resolution, perfect for printing and sharing.",
      gradient: "from-red-400 to-pink-500",
    },
    {
      icon: Clock,
      title: "History & Storage",
      description:
        "Access your transformation history and re-download previous creations anytime.",
      gradient: "from-indigo-400 to-blue-500",
    },
  ];

  return (
    <section id="features" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Powerful Features for
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Creative Professionals
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need to transform ordinary photos into extraordinary
            creations with the power of artificial intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105">
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-6 py-3">
            <Sparkles className="w-5 h-5 text-blue-400 mr-2" />
            <span className="text-blue-300 font-medium">
              Join 10,000+ creators already transforming images
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
