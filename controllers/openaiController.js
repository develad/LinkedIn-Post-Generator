import { openai } from '../config/openaiConfig.js';

const generateMeta = async (req, res) => {
  const { title } = req.body;
  const description = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Come up with a post for LinkedIn post called ${title}`,
      },
    ],
    // About 1 token for a letter
    max_tokens: 300,
  });

  //   console.log(description.choices[0].message);

  const tags = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Come up with 10 keywords for a LinkedIn post called ${title}. separate each keyword with # and output them in the same line`,
      },
    ],
    // About 1 token for a letter
    max_tokens: 300,
  });

  //   console.log(tags.choices[0].message);

  res.status(200).json({
    description: description.choices[0].message.content,
    tags: tags.choices[0].message.content,
  });
};

const generateImage = async (req, res) => {
  const { prompt } = req.body;
  const img = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    // prompt: 'A cute baby sea otter',
    n: 1,
    size: '1024x1024',
    style: 'vivid',
  });

  // console.log(img.data[0]);

  res.status(200).json({
    image: img.data[0].url,
  });
};

export { generateMeta, generateImage };
