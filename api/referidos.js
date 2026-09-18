export default async function handler(req, res) {
  const { user } = req.query;

  if (!user) {
    return res.status(400).json({ ok: false, error: "Falta el parametro user" });
  }

  try {
    const API_TOKEN = process.env.TRYNDER_API_KEY;

    if (!API_TOKEN) {
      return res.status(500).json({ ok: false, error: "API key no configurada en Vercel" });
    }

    const response = await fetch(`https://trynderdex.frenfun.xyz/api/referidos?user=${encodeURIComponent(user)}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`
      }
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Error al consultar la API de Trynderdex:", error);
    return res.status(500).json({ ok: false, error: "Error interno del servidor" });
  }
}
