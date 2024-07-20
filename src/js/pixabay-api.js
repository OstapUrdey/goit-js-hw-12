import axios from 'axios'

const URL = "https://pixabay.com/api/";
const API_KEY = '44783879-183c1ceb2e13ce0ff75e5d5ac';

export async function getPicturesByQuery(query, page = 1, perPage = 15) {
  try {
      const response = await axios.get(URL, {
          params: {
              key: API_KEY,
              q: query,
              image_type: 'photo',
              orientation: 'horizontal',
              safesearch: 'true',
              page,
              per_page: perPage,
          },
      });
      return response.data;
  } catch (error) {
      console.error(error);
      throw error;
  }
}