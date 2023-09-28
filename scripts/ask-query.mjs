import { ConversationalRetrievalQAChain } from "langchain/chains";
import { model } from "../config/openai.config.js";
import { HumanMessage } from "langchain/schema";

const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const QA_PROMPT = `You are a helpful AI assistant. Use the following pieces of context to answer the question at the end. However, do not be constrained by the context alone. If you have any ideas that are relevant to the question, please include them in your answer, even if they are outside of the context provided. But make sure that your ideas are still related to the question.

If you need additional information or context to answer the question, please let the user know.

Consider all possible answers to the question, even if they are outside of the context provided, but make sure that your answers are still related to the question.

Instead, use the context to inform your understanding of the question and to generate a more comprehensive and informative answer.

Please provide structure answers. Your answers should strike a balance between being concise and not overly lengthy. If the question is descriptive you can divided answer in sections, if required.

If you don't know the answer, ask the user to rephrase the question with some more context.
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
    chat_history: chat_history.map((c) => new HumanMessage(c)),
  });
  return response;
};
