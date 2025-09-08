// React import not required with modern JSX runtime
import { Sparkles, Twitter, Github, Mail } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    product: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "API Docs", href: "#" },
      { name: "Gallery", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Community", href: "#" },
      { name: "Status", href: "#" },
      { name: "Terms", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="border-t border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg mr-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">RongTona Ai</span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Transform your images with cutting-edge AI technology. Create
              stunning visuals in seconds.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors duration-300"
                  aria-label={social.label}>
                  <social.icon className="w-5 h-5 text-slate-300" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2025 RongTona AI. All rights reserved to SAHID AHMED
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-slate-400 hover:text-white text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white text-sm transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
