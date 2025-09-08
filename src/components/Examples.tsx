// React import not required with modern JSX runtime
import { ArrowRight, Star } from "lucide-react";

const Examples = () => {
  const examples = [
    {
      title: "Portrait to Action Hero",
      description:
        "Professional headshot transformed into dynamic action figure",
      beforeImage:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      afterImage:
        "https://i.guim.co.uk/img/media/3f576c7239a0f5fe3398a051aa19eceee599440f/879_273_5441_4353/master/5441.jpg?width=1020&dpr=2&s=none&crop=none",
      category: "Portrait",
    },
    {
      title: "Pet to Superhero",
      description: "Your furry friend becomes a caped crusader",
      beforeImage:
        "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
      afterImage:
        "https://comicvine.gamespot.com/a/uploads/scale_small/12/124259/9795208-ezgif-5d544aba15dd95.jpg",
      category: "Pet",
    },
    {
      title: "Family to Fantasy",
      description: "Turn family photos into epic fantasy characters",
      beforeImage:
        "https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=400",
      afterImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkLqjux8dhRMdjvj44gwWJULPglY78hxY5kQ&s",
      category: "Family",
    },
  ];

  return (
    <section id="examples" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-blue-900/20"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-purple-500/10 border border-purple-500/20 rounded-full px-6 py-2 mb-6">
            <Star className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-purple-300 text-sm font-medium">
              See the Magic
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Real Transformations
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              From Our Users
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Upload any photo and get professional-quality action figure artwork.
            See what's possible with our AI.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105">
              <div className="relative">
                <div className="grid grid-cols-2 gap-0">
                  {/* Before Image */}
                  <div className="relative">
                    <img
                      src={example.beforeImage}
                      alt="Before transformation"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                      Before
                    </div>
                  </div>

                  {/* After Image */}
                  <div className="relative">
                    <img
                      src={example.afterImage}
                      alt="After transformation"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      After
                    </div>
                  </div>
                </div>

                {/* Arrow overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight className="w-6 h-6 text-slate-800" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white">
                    {example.title}
                  </h3>
                  <span className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                    {example.category}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {example.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Ready to transform your images?
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Join thousands of creators who are already using DigitalSculpt AI
              to bring their imagination to life.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
              Start Creating Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Examples;
