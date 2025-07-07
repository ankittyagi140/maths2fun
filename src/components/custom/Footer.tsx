'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer:React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-700 via-purple-700 to-pink-600 border-t-4 border-yellow-200 shadow-2xl text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-extrabold mb-5 tracking-wide font-['Comic_Sans_MS']">About Us</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="hover:text-yellow-300 transition-colors font-semibold">
                  Our Mission
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-xl font-extrabold mb-5 tracking-wide font-['Comic_Sans_MS']">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="hover:text-yellow-300 transition-colors font-semibold">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-yellow-300 transition-colors font-semibold">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-extrabold mb-5 tracking-wide font-['Comic_Sans_MS']">Contact</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-yellow-300 transition-colors font-semibold">
                  Contact Form
                </Link>
              </li>
              <li>
                <a href="mailto:support@maths2fun.com" className="hover:text-yellow-300 transition-colors font-semibold">
                  support@maths2fun.com
                </a>
              </li>
              <li>
                <Link href={"/help"} className='hover:text-yellow-300 transition-colors font-semibold'>Help & Support</Link>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-xl font-extrabold mb-5 tracking-wide font-['Comic_Sans_MS']">Follow Us</h3>
            <div className="flex gap-5 items-center">
              <a href="#" aria-label="Facebook" className="hover:text-yellow-300 transition-colors"><Facebook size={28} /></a>
              <a href="#" aria-label="Twitter" className="hover:text-yellow-300 transition-colors"><Twitter size={28} /></a>
              <a href="#" aria-label="Instagram" className="hover:text-yellow-300 transition-colors"><Instagram size={28} /></a>
              <a href="mailto:support@maths2fun.com" aria-label="Email" className="hover:text-yellow-300 transition-colors"><Mail size={28} /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-lg font-semibold">
            <span className="mr-2">© {new Date().getFullYear()} maths2fun</span> | All rights reserved <span className="ml-2">🎲</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;