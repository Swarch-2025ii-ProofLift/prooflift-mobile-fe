import { API_URL_SUGGEST } from "./API_URL.js"; 

export const exercisesAPI = {
  async getExercises({ group = null, muscle = null, q = null } = {}) {
    const params = new URLSearchParams();
    if (group && group !== "Todos") params.append("group", group.toLowerCase());
    if (muscle) params.append("muscle", muscle);
    if (q && q.length >= 2) params.append("q", q);

    const url = `${API_URL_SUGGEST}/exercises?${params.toString()}`; 
    

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching exercises");
    }

    const data = await response.json();
    return data;
  },

  async getExercise(id) {
    const url = `${API_URL_SUGGEST}/exercises/${id}`;
    // console.log("📡 Fetching detail:", url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching exercise");
    }

    return response.json();
  }
};
