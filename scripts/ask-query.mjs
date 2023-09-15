import { ConversationalRetrievalQAChain } from "langchain/chains";
import { model } from "../config/openai.config.js";

const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const QA_PROMPT = `You are a helpful AI assistant. Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.

{context}

Question: {question}
Helpful answer in markdown:`;

export const ask = async (vectorStore, question, chat_history = []) => {
  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorStore.asRetriever(),
    {
      qaTemplate: QA_PROMPT,
      questionGeneratorTemplate: CONDENSE_PROMPT,
      // The number of source documents returned is 4 by default
      // returnSourceDocuments: true,
    }
  );
  const response = await chain.call({
    // this shit cost money, use frugally
    question,
    chat_history,
  });
  return response;
};
