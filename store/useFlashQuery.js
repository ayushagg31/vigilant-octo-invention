import { create } from 'zustand';
import { chatApi } from '../services/client.service';

export const useFlashQuery = create((set, get) => ({
  queries: [
    {
      id: 1,
      question: "Generate a blog article 📜",
      prompt: "generate a detailed blog from this video with heading and point by point, include numberic values to heading.",
      type: 'video'
    },
    {
      id: 2,
      question: "Key insights 💬",
      prompt: "generate key insights of this video points by point in numeric order and a quick summary at the end",
      type: 'video'
    },
    {
      id: 3,
      question: "Create a twitter thread 🧵",
      prompt: "generate a highly engaging and interesting twitter thread with subheading in numeric order from this video, also add followup questions for engagement",
      type: 'document'
    },
    {
      id: 4,
      question: "Generate a summary from this 📜",
      prompt: "generate a detailed summary from this document with heading and point by point, include numberic values to heading.",
      type: 'pdf'
    },
    {
      id: 5,
      question: "Generate a blog article 📜",
      prompt: "generate a detailed blog from this document with heading and point by point, include numberic values to heading.",
      type: 'pdf'
    },
    {
      id: 6,
      question: "Key insights 💬",
      prompt: "generate key insights of this document points by point in numeric order and a quick summary at the end",
      type: 'pdf'
    },
    {
      id: 7,
      question: "Create a twitter thread 🧵",
      prompt: "generate a highly engaging and interesting twitter thread with subheading in numeric order from this video, also add followup questions for engagement",
      type: 'pdf'
    }
  ],
  fetchQuery: async (id, collectionId) => {
    const QUERY = get().queries.find(query => query.id === id)?.prompt;
    try {
      const response = await chatApi({
        question: QUERY,
        history: [],
        collectionId,
      });
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
}));
