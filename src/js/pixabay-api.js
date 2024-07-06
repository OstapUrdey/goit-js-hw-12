const URL = "https://pixabay.com/api/";

export function getPicturesByQuery(query) {
    const API_KEY = "44783879-183c1ceb2e13ce0ff75e5d5ac";

    return fetch(`${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`).then(
      (res) => {  
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      }
    );
  }