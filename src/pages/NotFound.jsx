export default function NotFound() {
  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-8 py-4 sm:py-8">
      <header className="text-center mb-8 sm:mb-12 pb-6 sm:pb-8 border-b-2 border-gray-800">
        <h1 className="text-6xl sm:text-7xl mb-4 text-red-500 font-bold">404</h1>
        <p className="text-gray-500 text-2xl sm:text-3xl mb-2">Page Not Found</p>
        <p className="text-gray-500 text-base sm:text-lg">
          The page you're looking for doesn't exist.
        </p>
      </header>

      <section className="mb-8 sm:mb-12">
        <h2 className="text-[#4a9eff] text-2xl sm:text-3xl border-b border-gray-800 pb-2 mb-4">🏠 Go Back</h2>
        <p>
          <a href="/" className="inline-block mt-4 px-4 py-2 bg-[#1a1a1a] border border-[#4a9eff] rounded text-[#4a9eff] hover:bg-[#4a9eff] hover:text-[#0a0a0a] transition-all">
            ← Back to ACDS Home
          </a>
        </p>
      </section>

      <section className="mb-8 sm:mb-12">
        <h2 className="text-[#4a9eff] text-2xl sm:text-3xl border-b border-gray-800 pb-2 mb-4">📚 Quick Links</h2>
        <ul className="leading-loose ml-6 text-sm sm:text-base">
          <li className="mb-2">
            <a href="/" className="text-[#4a9eff] hover:underline">ACDS Public Keys</a> - Download Ed25519 keys for the official discovery server
          </li>
          <li className="mb-2">
            <a href="https://ascii-chat.com" target="_blank" rel="noopener noreferrer" className="text-[#4a9eff] hover:underline">ascii-chat Website</a> - Main project documentation
          </li>
          <li className="mb-2">
            <a href="https://github.com/zfogg/ascii-chat" target="_blank" rel="noopener noreferrer" className="text-[#4a9eff] hover:underline">GitHub Repository</a> - Source code and releases
          </li>
          <li className="mb-2">
            <a href="https://zfogg.github.io/ascii-chat/group__module__acds.html" target="_blank" rel="noopener noreferrer" className="text-[#4a9eff] hover:underline">ACDS Documentation</a> - Technical details
          </li>
        </ul>
      </section>

      <footer className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t-2 border-gray-800 text-center text-gray-600 text-sm sm:text-base">
        <p>
          <a href="https://github.com/zfogg/ascii-chat" target="_blank" rel="noopener noreferrer" className="text-[#4a9eff] hover:underline">📦 GitHub</a>
          {' · '}
          <a href="https://zfogg.github.io/ascii-chat/group__module__acds.html" target="_blank" rel="noopener noreferrer" className="text-[#4a9eff] hover:underline">📚 ACDS Documentation</a>
          {' · '}
          <a href="https://github.com/zfogg/ascii-chat/issues" target="_blank" rel="noopener noreferrer" className="text-[#4a9eff] hover:underline">🐛 Issues</a>
          {' · '}
          <a href="https://github.com/zfogg/ascii-chat/releases" target="_blank" rel="noopener noreferrer" className="text-[#4a9eff] hover:underline">📦 Releases</a>
        </p>
        <p className="text-gray-700 text-xs sm:text-sm mt-4">
          ascii-chat Discovery Service
        </p>
      </footer>
    </div>
  )
}
