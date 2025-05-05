import { OpenAI } from 'openai';

if (process.env.NODE_ENV !== 'production') {
  (async () => {
    // dynamic import needs to be async/await
    const dotenv = await import('dotenv');
    dotenv.config();
  })();
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
