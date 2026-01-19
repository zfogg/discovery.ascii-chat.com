import { useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'

function Home() {
  const [sshKey, setSshKey] = useState('')
  const [gpgKey, setGpgKey] = useState('')
  const [baseUrl, setBaseUrl] = useState('')

  useEffect(() => {
    // Get the current domain
    setBaseUrl(window.location.origin)

    // Fetch public keys
    fetch('/key.pub')
      .then(r => r.text())
      .then(text => setSshKey(text.trim()))
      .catch(e => console.error('Failed to load SSH key:', e))

    fetch('/key.gpg')
      .then(r => r.text())
      .then(text => setGpgKey(text.trim()))
      .catch(e => console.error('Failed to load GPG key:', e))
  }, [])

  const handleSshDownload = () => {
    if (window.gtag) {
      window.gtag('event', 'download_ssh_key')
    }
  }

  const handleGpgDownload = () => {
    if (window.gtag) {
      window.gtag('event', 'download_gpg_key')
    }
  }

  const handleLinkClick = (url, text) => {
    if (window.gtag) {
      window.gtag('event', 'link_click', {
        link_url: url,
        link_text: text
      })
    }
  }

  return (
    <>
      <div className="max-w-[900px] mx-auto px-4 sm:px-8 py-4 sm:py-8">
        <header className="text-center mb-8 sm:mb-12 pb-6 sm:pb-8 border-b-2 border-gray-800">
          <h1 className="text-3xl sm:text-4xl mb-2 text-[#4a9eff] font-bold">🔍 ascii-chat Discovery Service</h1>
          <p className="text-gray-500 text-base sm:text-lg my-0">Official ACDS Public Keys</p>
          <p className="text-gray-500 text-base sm:text-lg my-0">
            Part of the <a href="https://ascii-chat.com" target="_blank" rel="noopener noreferrer" className="text-[#4a9eff] hover:underline" onClick={() => handleLinkClick('https://ascii-chat.com', 'ascii-chat website (header)')}>
              ascii-chat
            </a> project
          </p>
        </header>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-[#4a9eff] text-2xl sm:text-3xl border-b border-gray-800 pb-2 mb-4">📋 About ACDS</h2>
          <p className="leading-relaxed mb-4 text-sm sm:text-base">
            The <strong>ascii-chat Discovery Service (ACDS)</strong> is a core component of{' '}
            <a href="https://ascii-chat.com" target="_blank" rel="noopener noreferrer" className="text-[#4a9eff] hover:underline" onClick={() => handleLinkClick('https://ascii-chat.com', 'ascii-chat website (about)')}>
              ascii-chat
            </a>, a real-time terminal-based video chat application. ACDS enables session discovery using
            memorable three-word strings like <code className="bg-[#1a1a1a] px-1 py-0.5 rounded">happy-sunset-ocean</code> instead of IP addresses.
            It provides NAT traversal, WebRTC signaling, and peer-to-peer connection establishment.
          </p>
          <p className="leading-relaxed mb-4 text-sm sm:text-base">
            <strong>Privacy-first:</strong> ACDS only exchanges connection metadata—your audio and video
            never pass through our servers. All media flows peer-to-peer with end-to-end encryption.
          </p>
          <p className="leading-relaxed mb-4 text-sm sm:text-base">
            Session strings use 2,500 curated adjectives and 5,000 nouns derived from WordNet and filtered by word frequency,
            providing 62.5 billion possible combinations with excellent collision resistance (~250k concurrent sessions before first collision).
          </p>

          <h3 className="text-[#e0e0e0] text-lg sm:text-xl mt-6 mb-2">🏗️ Official ACDS Infrastructure</h3>
          <p className="leading-relaxed mb-4 text-sm sm:text-base">The official ACDS deployment consists of two components:</p>
          <ul className="leading-loose ml-6 text-sm sm:text-base">
            <li className="mb-2">
              <strong>This website</strong> (<code className="bg-[#1a1a1a] px-1 py-0.5 rounded">{window.location.hostname}</code>) - Serves public keys over HTTPS
            </li>
            <li className="mb-2">
              <strong>ACDS server</strong> (<code className="bg-[#1a1a1a] px-1 py-0.5 rounded">discovery-server.ascii-chat.com:27225</code>) - Handles session management (TCP)
            </li>
          </ul>
          <p className="leading-relaxed mb-4 text-sm sm:text-base">
            The ascii-chat client is programmed to automatically connect to{' '}
            <code className="bg-[#1a1a1a] px-1 py-0.5 rounded">discovery-server.ascii-chat.com:27225</code> and trust keys from this website.
          </p>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-[#4a9eff] text-2xl sm:text-3xl border-b border-gray-800 pb-2 mb-4">🔑 Public Keys</h2>
          <p className="leading-relaxed mb-4 text-sm sm:text-base">
            These Ed25519 public keys are used to verify the identity of the official ACDS server at{' '}
            <code className="bg-[#1a1a1a] px-1 py-0.5 rounded">{window.location.hostname}</code>. Download and verify these keys before connecting.
          </p>
          <p className="leading-relaxed mb-4 text-sm sm:text-base">Keys are available at:</p>
          <ul className="leading-loose ml-6 text-sm sm:text-base">
            <li className="mb-2">
              <a href="/key.pub" target="_blank" rel="noopener noreferrer" className="text-[#4a9eff] hover:underline">
                <code className="bg-[#1a1a1a] px-1 py-0.5 rounded">{baseUrl}/key.pub</code>
              </a> (SSH)
            </li>
            <li className="mb-2">
              <a href="/key.gpg" target="_blank" rel="noopener noreferrer" className="text-[#4a9eff] hover:underline">
                <code className="bg-[#1a1a1a] px-1 py-0.5 rounded">{baseUrl}/key.gpg</code>
              </a> (GPG)
            </li>
          </ul>

          <h3 className="text-[#e0e0e0] text-lg sm:text-xl mt-6 mb-2">SSH Ed25519 Public Key</h3>
          <p className="leading-relaxed mb-4 text-sm sm:text-base"><strong>Fingerprint:</strong></p>
          <div className="fingerprint">
            SHA256:Uvr6k+9VjcC60gbVtcvwiVZDsIfB6jZvMuD4G2FME6w
          </div>
          <p className="leading-relaxed mb-4 text-sm sm:text-base"><strong>Public Key:</strong></p>
          <pre className="bg-[#1a1a1a] p-4 rounded-lg overflow-x-auto border border-gray-800"><code>{sshKey || 'Loading...'}</code></pre>
          <a href="/key.pub" download className="inline-block mt-2 mb-4 px-4 py-2 bg-[#1a1a1a] border border-[#4a9eff] rounded text-[#4a9eff] hover:bg-[#4a9eff] hover:text-[#0a0a0a] transition-all" onClick={handleSshDownload}>⬇ Download SSH Public Key</a>

          <h3 className="text-[#e0e0e0] text-lg sm:text-xl mt-6 mb-2">GPG Ed25519 Public Key</h3>
          <p className="leading-relaxed mb-4 text-sm sm:text-base"><strong>Fingerprint:</strong></p>
          <div className="fingerprint">
            0AAE 7D67 D734 6959 74C3  6CEE C380 DA08 AF18 35B9
          </div>
          <p className="leading-relaxed mb-4 text-sm sm:text-base"><strong>Public Key:</strong></p>
          <pre className="bg-[#1a1a1a] p-4 rounded-lg overflow-x-auto border border-gray-800"><code>{gpgKey || 'Loading...'}</code></pre>
          <a href="/key.gpg" download className="inline-block mt-2 mb-4 px-4 py-2 bg-[#1a1a1a] border border-[#4a9eff] rounded text-[#4a9eff] hover:bg-[#4a9eff] hover:text-[#0a0a0a] transition-all" onClick={handleGpgDownload}>⬇ Download GPG Public Key</a>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-[#4a9eff] text-2xl sm:text-3xl border-b border-gray-800 pb-2 mb-4">📖 Getting Help</h2>
          <p className="leading-relaxed mb-4 text-sm sm:text-base">
            For complete documentation and options, use the built-in help system:
          </p>
          <pre className="bg-[#1a1a1a] p-4 rounded-lg overflow-x-auto border border-gray-800"><code>{`# Read the full ascii-chat manual
man ascii-chat

# Get ACDS-specific help and options
ascii-chat discovery-server --help

# General ascii-chat help
ascii-chat --help`}</code></pre>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-[#4a9eff] text-2xl sm:text-3xl border-b border-gray-800 pb-2 mb-4">💻 Usage Examples</h2>

          <h3 className="text-[#e0e0e0] text-lg sm:text-xl mt-6 mb-2">Server: Create a Session</h3>
          <pre className="bg-[#1a1a1a] p-4 rounded-lg overflow-x-auto border border-gray-800"><code>{`# Start a server and register with ACDS (uses discovery-server.ascii-chat.com by default)
ascii-chat server --acds

# ACDS will return a session string like:
# Session: happy-sunset-ocean`}</code></pre>

          <h3 className="text-[#e0e0e0] text-lg sm:text-xl mt-6 mb-2">Client: Join a Session</h3>
          <pre className="bg-[#1a1a1a] p-4 rounded-lg overflow-x-auto border border-gray-800"><code>{`# Connect using the session string (uses discovery-server.ascii-chat.com by default)
ascii-chat client happy-sunset-ocean

# That's it! No configuration needed - the client automatically:
# - Connects to discovery-server.ascii-chat.com:27225
# - Trusts keys from ${window.location.hostname}
# - Looks up the session and connects to the server`}</code></pre>

          <h3 className="text-[#e0e0e0] text-lg sm:text-xl mt-6 mb-2">Manual Key Verification (Optional)</h3>
          <pre className="bg-[#1a1a1a] p-4 rounded-lg overflow-x-auto border border-gray-800"><code>{`# Download and verify SSH public key
curl -O ${baseUrl}/key.pub
ssh-keygen -lf key.pub

# Verify fingerprint matches: SHA256:Uvr6k+9VjcC60gbVtcvwiVZDsIfB6jZvMuD4G2FME6w

# Connect with explicit key verification (optional - automatic by default)
ascii-chat client happy-sunset-ocean --acds-key ./key.pub`}</code></pre>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-[#4a9eff] text-2xl sm:text-3xl border-b border-gray-800 pb-2 mb-4">🔒 Security</h2>
          <ul className="leading-loose ml-6 text-sm sm:text-base">
            <li className="mb-2"><strong>Automatic Trust:</strong> The ascii-chat client automatically trusts keys from <code className="bg-[#1a1a1a] px-1 py-0.5 rounded">discovery.ascii-chat.com</code> downloaded over HTTPS (official server only)</li>
            <li className="mb-2"><strong>Key Verification:</strong> You can manually verify keys using the fingerprints shown above</li>
            <li className="mb-2"><strong>Identity Verification:</strong> ACDS supports optional Ed25519 identity verification for servers and clients</li>
            <li className="mb-2"><strong>No Media Access:</strong> ACDS never sees your video or audio—only connection metadata</li>
            <li className="mb-2"><strong>End-to-End Encryption:</strong> All media flows peer-to-peer with ACIP encryption</li>
          </ul>
        </section>

        <section className="mb-8 sm:mb-12">
          <h2 className="text-[#4a9eff] text-2xl sm:text-3xl border-b border-gray-800 pb-2 mb-4">🏗️ Running Your Own ACDS Server</h2>
          <p className="leading-relaxed mb-4 text-sm sm:text-base">
            You can run a private ACDS server for your organization. Third-party ACDS servers require
            clients to explicitly configure your public key via the <code className="bg-[#1a1a1a] px-1 py-0.5 rounded">--acds-key</code> flag.
          </p>
          <pre className="bg-[#1a1a1a] p-4 rounded-lg overflow-x-auto border border-gray-800"><code>{`# Start your own ACDS server with SSH and GPG keys
ascii-chat discovery-server 0.0.0.0 :: --port 27225 \\
  --key ~/.ssh/id_ed25519 \\
  --key gpg:YOUR_GPG_KEY_ID

# Server with GPG key
ascii-chat server --key gpg:SERVER_GPG_KEY_ID

# Client connects with explicit ACDS trust and authenticates with SSH key
ascii-chat client session-name \\
  --acds-server your-acds.example.com \\
  --acds-key https://your-acds.example.com/key.pub \\
  --key ~/.ssh/id_ed25519 \\
  --server-key gpg:SERVER_GPG_KEY_ID`}</code></pre>
          <p className="leading-relaxed mb-4 text-sm sm:text-base">
            <strong>Important:</strong> You should share the public key with ascii-chatters in a safe way.
            We recommend pre-sharing them safely somehow or hosting them on a website at a domain you control and
            serving them over HTTPS like we do.
            See the <a href="https://zfogg.github.io/ascii-chat/group__module__acds.html#acds_deployment" target="_blank" rel="noopener noreferrer" className="text-[#4a9eff] hover:underline" onClick={() => handleLinkClick('https://zfogg.github.io/ascii-chat/group__module__acds.html#acds_deployment', 'ACDS deployment documentation')}>ascii-chat documentation</a> for details.
          </p>
        </section>

        <footer className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t-2 border-gray-800 text-center text-gray-600 text-sm sm:text-base">
          <p>
            <a href="https://github.com/zfogg/ascii-chat" target="_blank" rel="noopener noreferrer" className="text-[#4a9eff] hover:underline" onClick={() => handleLinkClick('https://github.com/zfogg/ascii-chat', 'GitHub (footer)')}>📦 GitHub</a>
            {' · '}
            <a href="https://zfogg.github.io/ascii-chat/group__module__acds.html" target="_blank" rel="noopener noreferrer" className="text-[#4a9eff] hover:underline" onClick={() => handleLinkClick('https://zfogg.github.io/ascii-chat/group__module__acds.html', 'ACDS Documentation (footer)')}>📚 ACDS Documentation</a>
            {' · '}
            <a href="https://github.com/zfogg/ascii-chat/issues" target="_blank" rel="noopener noreferrer" className="text-[#4a9eff] hover:underline" onClick={() => handleLinkClick('https://github.com/zfogg/ascii-chat/issues', 'Issues')}>🐛 Issues</a>
            {' · '}
            <a href="https://github.com/zfogg/ascii-chat/releases" target="_blank" rel="noopener noreferrer" className="text-[#4a9eff] hover:underline" onClick={() => handleLinkClick('https://github.com/zfogg/ascii-chat/releases', 'Releases')}>📦 Releases</a>
          </p>
          <p className="text-gray-700 text-xs sm:text-sm mt-4">
            ascii-chat Discovery Service · Hosted at <code className="bg-[#1a1a1a] px-1 py-0.5 rounded">{window.location.hostname}:27225</code>
          </p>
        </footer>
      </div>
      <Analytics />
    </>
  )
}

export default Home
