// /api/config.js — Vercel Serverless Function
// Lee las env vars del servidor y las expone al cliente de forma segura

export default function handler(req, res) {
  // Solo GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verificar que las variables existen
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    return res.status(500).json({ error: 'Missing environment variables' })
  }

  // Cache 5 minutos (la config no cambia)
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')

  res.status(200).json({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_ANON_KEY
  })
}
