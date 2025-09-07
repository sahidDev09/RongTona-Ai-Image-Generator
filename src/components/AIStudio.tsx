import React, { useState } from 'react';
import { Wand2, Upload, Sparkles } from 'lucide-react';
import ImageGenerator from './ImageGenerator';
import ImageEditor from './ImageEditor';

const AIStudio = () => {
  const [activeTab, setActiveTab] = useState<'generate' | 'edit'>('generate');

  const tabs = [
    {
      id: 'generate' as const,
      name: 'Generate from Text',
      icon: Wand2,
      description: 'Create images from text descriptions'
    },
    {
      id: 'edit' as const,
      name: 'Transform Image',
      icon: Upload,
      description: 'Upload and transform existing images'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-blue-300 text-sm font-medium">AI Studio</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-6">
            Create & Transform
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              with AI Magic
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Generate stunning images from text or transform your existing photos into action figures, artwork, and more.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-2">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">{tab.name}</div>
                    <div className="text-xs opacity-80">{tab.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {activeTab === 'generate' && <ImageGenerator />}
          {activeTab === 'edit' && <ImageEditor />}
        </div>
      </div>
    </div>
  );
};

export default AIStudio;