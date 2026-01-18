import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [sshKey, setSshKey] = useState('')
  const [gpgKey, setGpgKey] = useState('')

  useEffect(() => {
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

  return (
    <div className="container">
      <header>
        <h1>🔍 ascii-chat Discovery Service</h1>
        <p className="subtitle">Official ACDS Public Keys</p>
        <p className="subtitle">
          Part of the <a href="https://github.com/zfogg/ascii-chat" target="_blank" rel="noopener noreferrer">
            ascii-chat
          </a> project
        </p>
      </header>

      <section>
        <h2>📋 About ACDS</h2>
        <p>
          The <strong>ascii-chat Discovery Service (ACDS)</strong> is a core component of{' '}
          <a href="https://github.com/zfogg/ascii-chat" target="_blank" rel="noopener noreferrer">
            ascii-chat
          </a>, a real-time terminal-based video chat application. ACDS enables session discovery using
          memorable three-word strings like <code>happy-sunset-ocean</code> instead of IP addresses.
          It provides NAT traversal, WebRTC signaling, and peer-to-peer connection establishment.
        </p>
        <p>
          <strong>Privacy-first:</strong> ACDS only exchanges connection metadata—your audio and video
          never pass through our servers. All media flows peer-to-peer with end-to-end encryption.
        </p>
      </section>

      <section>
        <h2>🔑 Public Keys</h2>
        <p>
          These Ed25519 public keys are used to verify the identity of the official ACDS server at{' '}
          <code>acds.ascii-chat.com</code>. Download and verify these keys before connecting.
        </p>
        <p>
          Keys are available at:{' '}
          <code>https://acds.ascii-chat.com/key.pub</code> (SSH) and{' '}
          <code>https://acds.ascii-chat.com/key.gpg</code> (GPG)
        </p>

        <h3>SSH Ed25519 Public Key</h3>
        <div className="fingerprint">
          SHA256:Uvr6k+9VjcC60gbVtcvwiVZDsIfB6jZvMuD4G2FME6w
        </div>
        <pre><code>{sshKey || 'Loading...'}</code></pre>
        <a href="/key.pub" download className="download-link">⬇ Download SSH Public Key</a>

        <h3>GPG Ed25519 Public Key</h3>
        <div className="fingerprint">
          0AAE 7D67 D734 6959 74C3  6CEE C380 DA08 AF18 35B9
        </div>
        <pre><code>{gpgKey || 'Loading...'}</code></pre>
        <a href="/key.gpg" download className="download-link">⬇ Download GPG Public Key</a>
      </section>

      <section>
        <h2>📖 Getting Help</h2>
        <p>
          For complete documentation and options, use the built-in help system:
        </p>
        <pre><code>{`# Read the full ascii-chat manual
man ascii-chat

# Get ACDS-specific help and options
ascii-chat discovery-server --help

# General ascii-chat help
ascii-chat --help`}</code></pre>
      </section>

      <section>
        <h2>💻 Usage Examples</h2>

        <h3>Server: Create a Session</h3>
        <pre><code>{`# Start a server and register with ACDS
ascii-chat server --acds \\
  --acds-server acds.ascii-chat.com \\
  --acds-port 27225

# ACDS will return a session string like:
# Session: happy-sunset-ocean`}</code></pre>

        <h3>Client: Join a Session</h3>
        <pre><code>{`# Connect using the session string
ascii-chat client happy-sunset-ocean

# Or with explicit ACDS server (auto-trusts acds.ascii-chat.com over HTTPS)
ascii-chat client happy-sunset-ocean \\
  --acds-server acds.ascii-chat.com`}</code></pre>

        <h3>Manual Key Verification (Optional)</h3>
        <pre><code>{`# Download and verify SSH public key
curl -O https://acds.ascii-chat.com/key.pub
ssh-keygen -lf key.pub

# Verify fingerprint matches: SHA256:Uvr6k+9VjcC60gbVtcvwiVZDsIfB6jZvMuD4G2FME6w

# Connect with explicit key verification
ascii-chat client happy-sunset-ocean \\
  --acds-server acds.ascii-chat.com \\
  --acds-key ./key.pub`}</code></pre>
      </section>

      <section>
        <h2>🔒 Security</h2>
        <ul>
          <li><strong>Automatic Trust:</strong> The ascii-chat client automatically trusts keys from <code>acds.ascii-chat.com</code> downloaded over HTTPS</li>
          <li><strong>Key Verification:</strong> You can manually verify keys using the fingerprints shown above</li>
          <li><strong>Identity Verification:</strong> ACDS supports optional Ed25519 identity verification for servers and clients</li>
          <li><strong>No Media Access:</strong> ACDS never sees your video or audio—only connection metadata</li>
          <li><strong>End-to-End Encryption:</strong> All media flows peer-to-peer with ACIP encryption</li>
        </ul>
      </section>

      <section>
        <h2>🏗️ Running Your Own ACDS Server</h2>
        <p>
          You can run a private ACDS server for your organization. Third-party ACDS servers require
          clients to explicitly configure your public key via the <code>--acds-key</code> flag.
        </p>
        <pre><code>{`# Start your own ACDS server
ascii-chat discovery-server 0.0.0.0 :: --port 27225

# Clients must explicitly trust your key
ascii-chat client session-name \\
  --acds-server your-acds.example.com \\
  --acds-key https://your-acds.example.com/key.pub`}</code></pre>
        <p>
          <strong>Important:</strong> You should share the public key with ascii-chatters in a safe way.
          We recommend pre-sharing them safely somehow or hosting them on a website at a domain you control and
          serving them over HTTPS like we do.
          See the <a href="https://zfogg.github.io/ascii-chat/group__module__acds.html#acds_deployment" target="_blank" rel="noopener noreferrer">ascii-chat documentation</a> for details.
        </p>
      </section>

      <footer>
        <p>
          <a href="https://github.com/zfogg/ascii-chat" target="_blank" rel="noopener noreferrer">📦 GitHub</a>
          {' · '}
          <a href="https://zfogg.github.io/ascii-chat/group__module__acds.html" target="_blank" rel="noopener noreferrer">📚 ACDS Documentation</a>
          {' · '}
          <a href="https://github.com/zfogg/ascii-chat/issues" target="_blank" rel="noopener noreferrer">🐛 Issues</a>
          {' · '}
          <a href="https://github.com/zfogg/ascii-chat/releases" target="_blank" rel="noopener noreferrer">📦 Releases</a>
        </p>
        <p className="legal">
          ascii-chat Discovery Service · Hosted at <code>acds.ascii-chat.com:27225</code>
        </p>
      </footer>
    </div>
  )
}

export default App
