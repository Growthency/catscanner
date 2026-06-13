import crypto from 'crypto'

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

// Mint a Google API access token from a service-account JSON (in GSC_SERVICE_ACCOUNT_JSON).
// Pure Node crypto — no extra dependency. Returns null if not configured / auth fails.
export async function getGoogleAccessToken(scope: string): Promise<string | null> {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON
  if (!raw) return null

  let creds: { client_email?: string; private_key?: string }
  try { creds = JSON.parse(raw) } catch { return null }
  if (!creds.client_email || !creds.private_key) return null

  const now = Math.floor(Date.now() / 1000)
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claim = b64url(JSON.stringify({
    iss: creds.client_email,
    scope,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }))

  let signature: string
  try {
    signature = b64url(crypto.sign('RSA-SHA256', Buffer.from(`${header}.${claim}`), creds.private_key))
  } catch {
    return null
  }

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${header}.${claim}.${signature}`,
    }),
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.access_token || null
}
