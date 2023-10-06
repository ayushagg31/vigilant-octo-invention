import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI as langOpenAI } from "langchain/llms/openai";
import OpenAI  from "openai";

import "dotenv/config";

export const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPEN_AI_API_KEY,
});

export const model = new langOpenAI({
  temperature: 1,
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPEN_AI_API_KEY,
});

export const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});