// Mint a Google API access token from a service-account JSON (in GSC_SERVICE_ACCOUNT_JSON).
// Uses Web Crypto (crypto.subtle) so it runs on BOTH Node (Vercel) and the Cloudflare
// Workers runtime — no Node-only `crypto`/`Buffer`. Returns null if not configured / auth fails.

function b64url(bytes: Uint8Array): string {
  let bin = ''
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i])
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const textToB64url = (text: string) => b64url(new TextEncoder().encode(text))

// UTF-8 bytes of a string as a fresh ArrayBuffer (a valid BufferSource for crypto.subtle).
function strToBuf(text: string): ArrayBuffer {
  const u8 = new TextEncoder().encode(text)
  const buf = new ArrayBuffer(u8.byteLength)
  new Uint8Array(buf).set(u8)
  return buf
}

// Decode a PEM (PKCS#8) private key to a raw DER ArrayBuffer.
function pemToDer(pem: string): ArrayBuffer {
  const body = pem
    .replace(/-----BEGIN [^-]+-----/g, '')
    .replace(/-----END [^-]+-----/g, '')
    .replace(/\s+/g, '')
  const bin = atob(body)
  const buf = new ArrayBuffer(bin.length)
  const der = new Uint8Array(buf)
  for (let i = 0; i < bin.length; i++) der[i] = bin.charCodeAt(i)
  return buf
}

export async function getGoogleAccessToken(scope: string): Promise<string | null> {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON
  if (!raw) return null

  let creds: { client_email?: string; private_key?: string }
  try { creds = JSON.parse(raw) } catch { return null }
  if (!creds.client_email || !creds.private_key) return null

  const now = Math.floor(Date.now() / 1000)
  const header = textToB64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claim = textToB64url(JSON.stringify({
    iss: creds.client_email,
    scope,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }))
  const signingInput = `${header}.${claim}`

  let signature: string
  try {
    const key = await crypto.subtle.importKey(
      'pkcs8',
      pemToDer(creds.private_key),
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['sign'],
    )
    const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, strToBuf(signingInput))
    signature = b64url(new Uint8Array(sig))
  } catch {
    return null
  }

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${signingInput}.${signature}`,
    }),
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.access_token || null
}
