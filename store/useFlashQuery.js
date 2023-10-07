import { create } from 'zustand';
import { chatApi } from '../services/client.service';

export const useFlashQuery = create((set, get) => ({
  queries: [
    {
      id: 1,
      question: "Generate a blog post from this video",
      prompt: "generate a detailed blog from this video with heading and point by point",
      type: 'video'
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
