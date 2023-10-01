import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '34756753-b2a76777b50bc049ab8c28d3e',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const fetchImages = async (searchQuery, page) => {
  const response = await axios.get(`?q=${searchQuery}&page=${page}`);
  return response.data;
};
export function requiredValues(data) {
  return data.map(({ id, tags, largeImageURL, webformatURL }) => ({
    id,
    tags,
    largeImageURL,
    webformatURL,
  }));
}
