import React from 'react';
import { Upload, Sparkles, Download, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Your Image',
      description: 'Drag and drop or select any image from your device. We support all major formats.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Sparkles,
      title: 'Choose AI Style',
      description: 'Select from action figure, artistic, vintage, or create custom transformation styles.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Download,
      title: 'Download Result',
      description: 'Get your transformed image in HD quality, ready to share or print.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Transform your images in just three simple steps with our AI-powered platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center group">
                <div className={`inline-flex p-6 rounded-2xl bg-gradient-to-br ${step.color} mb-6 group-hover:scale-110 transition-transform duration-300 relative`}>
                  <step.icon className="w-8 h-8 text-white" />
                  <div className="absolute -top-2 -right-2 bg-white text-slate-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-slate-300 leading-relaxed">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 -right-6 lg:-right-8">
                  <ArrowRight className="w-6 h-6 text-slate-500" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">Ready to see the magic?</h3>
            <p className="text-slate-300 mb-6">Try our AI image transformation for free. No credit card required.</p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
              Try Free Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;