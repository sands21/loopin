import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center">
          {/* Logo & Description */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 rounded-xl overflow-hidden">
              <Image
                src="/logo.png"
                alt="Loopin Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Loopin</span>
              <p className="text-sm text-gray-600 font-medium">Modern discussion forum</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-500">
            © {currentYear} Loopin. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 