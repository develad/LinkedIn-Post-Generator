import { generateMeta } from '../controllers/openaiController.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed',
    });
  }
  await generateMeta(req, res);
}
