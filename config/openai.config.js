import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { Configuration, OpenAIApi } from "openai";
import "dotenv/config";

export const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPEN_AI_API_KEY,
});

export const model = new OpenAI({
  temperature: 0.75,
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPEN_AI_API_KEY,
});

export const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
);
