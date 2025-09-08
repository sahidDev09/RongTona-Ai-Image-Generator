// React import not required with modern JSX runtime
import { Check, Star } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "Forever",
      description: "Perfect for trying out our AI transformations",
      features: [
        "5 transformations per month",
        "Basic AI styles",
        "HD downloads",
        "Community support",
      ],
      buttonText: "Get Started",
      buttonStyle: "bg-white/10 hover:bg-white/20 border border-white/20",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "For content creators and professionals",
      features: [
        "500 transformations per month",
        "All AI styles + premium ones",
        "Batch processing",
        "Priority processing",
        "4K downloads",
        "Email support",
      ],
      buttonText: "Start Pro Trial",
      buttonStyle:
        "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For teams and businesses",
      features: [
        "Unlimited transformations",
        "Custom AI model training",
        "API access",
        "White-label solution",
        "Team collaboration",
        "Dedicated support",
      ],
      buttonText: "Contact Sales",
      buttonStyle: "bg-white/10 hover:bg-white/20 border border-white/20",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Choose Your Plan
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 hover:transform hover:scale-105 ${
                plan.popular
                  ? "border-blue-500/50 shadow-2xl shadow-blue-500/10"
                  : "border-white/10 hover:border-white/20"
              }`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-slate-400 mb-4">{plan.description}</p>
                <div className="flex items-end justify-center">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-slate-400 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-slate-300">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  plan.buttonStyle
                } ${
                  plan.popular
                    ? "text-white hover:shadow-2xl hover:shadow-blue-500/25"
                    : "text-white"
                }`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400">
            All plans include SSL security, 99.9% uptime, and our happiness
            guarantee.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
