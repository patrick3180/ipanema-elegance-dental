// api/test.js
// Arquivo de teste para verificar se as API Routes funcionam

export default function handler(req, res) {
  console.log('Test API called!');
  
  res.status(200).json({ 
    success: true,
    message: 'API Routes funcionando corretamente!',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    headers: req.headers
  });
}
