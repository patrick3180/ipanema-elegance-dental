export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, message } = req.body || {};

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  if (name.length > 200 || phone.length > 30 || email.length > 255 || message.length > 2000) {
    return res.status(400).json({ error: 'Um ou mais campos excedem o tamanho máximo permitido' });
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: 'SUA_ACCESS_KEY_AQUI',
        subject: `Nova mensagem do site - ${name}`,
        from_name: name,
        email: email,
        phone: phone,
        message: message,
        to: 'contato@dracarlachristoph.com'
      })
    });

    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: 'Erro ao enviar mensagem' });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
