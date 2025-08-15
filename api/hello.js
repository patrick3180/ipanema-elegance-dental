// api/hello.js
// Teste simples para verificar se as Functions estão funcionando

export default function handler(req, res) {
  console.log('Hello API called!');
  
  const response = {
    success: true,
    message: 'Vercel Functions funcionando! 🎉',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    query: req.query,
    headers: {
      'user-agent': req.headers['user-agent'],
      'host': req.headers['host']
    }
  };
  
  res.status(200).json(response);
}
