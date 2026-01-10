import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: "Electronics", to: "/category/electronics" },
      { name: "Fashion", to: "/category/fashion" },
      { name: "Home & Garden", to: "/category/home-garden" },
      { name: "Sports", to: "/category/sports" },
      { name: "Books", to: "/category/books" },
    ],
    company: [
      { name: "About Us", to: "/about" },
      { name: "Careers", to: "/careers" },
      { name: "Press", to: "/press" },
      { name: "Blog", to: "/blog" },
    ],
    support: [
      { name: "Help Center", to: "/help" },
      { name: "Track Order", to: "/trackorders" },
      { name: "Returns", to: "/help" },
      { name: "Shipping Info", to: "/help" },
      { name: "Contact Us", to: "/help" },
    ],
    legal: [
      { name: "Privacy Policy", to: "/privacy" },
      { name: "Terms of Service", to: "/terms" },
      { name: "Cookie Policy", to: "/cookies" },
      { name: "Sitemap", to: "/sitemap" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="text-white text-xl font-semibold">
              Subscribe to our newsletter
            </h3>
            <p className="text-gray-400">
              Get updates on new products and sales
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-80 px-4 py-2 rounded bg-gray-700 text-white"
            />
            <button className="bg-blue-600 px-6 py-2 rounded text-white hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        {/* Brand */}
          <div>
          <h2 className="text-white text-2xl font-bold mb-4">ShopHub</h2>
          <p className="text-gray-400 mb-4">
            Quality products at affordable prices.
          </p>
          <div className="flex gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-gray-800 p-2 rounded-full hover:bg-blue-600"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <h3 className="text-white font-semibold mb-4 capitalize">
              {section}
            </h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  {link.to ? (
                    <Link to={link.to} className="hover:text-white">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="hover:text-white">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <MapPin size={18} />
              <span>123 , India</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} />
              <a href="tel:+919876543210" className="hover:text-white">+91xxxxxxxx</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} />
              <a href="mailto:support@shophub.com" className="hover:text-white">support@shophub.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-400">
        © {currentYear} ShopHub. All rights reserved.
      </div>
    </footer>
  );
}
