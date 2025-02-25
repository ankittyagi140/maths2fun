'use client';

import Link from 'next/link';

const Footer:React.FC = () => {
  return (
    <footer className="bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white hover:text-[#FFE66D]">
                  Our Mission
                </Link>
              </li>
              {/* <li>
                <Link href="/team" className="text-white hover:text-[#FFE66D]-600">
                  Team
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-white hover:text-[#FFE66D]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white hover:text-[#FFE66D]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-white hover:text-[#FFE66D]">
                  Contact Form
                </Link>
              </li>
              <li>
                <a href="mailto:support@maths2fun.com" className="text-white hover:text-[#FFE66D]">
                  support@maths2fun.com
                </a>
              </li>
              <li>
                <Link href={"/help"} className='text-white hover:text-[#FFE66D]'>Help & Support</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white text-center">
          <p className="text-sm text-white">
            © {new Date().getFullYear()} maths2fun. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;