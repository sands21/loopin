import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo & Description */}
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Loopin</span>
              <p className="text-sm text-gray-600 font-medium">Modern discussion forum</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-8 text-sm text-gray-600">
            <Link href="/about" className="hover:text-purple-600 transition-colors font-medium">
              About
            </Link>
            <Link href="/privacy" className="hover:text-purple-600 transition-colors font-medium">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-purple-600 transition-colors font-medium">
              Terms
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          © {currentYear} Loopin. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 