export const BASE_URL = 'https://pixabay.com/api/';
export const PER_PAGE = 40;

export const SEARCH_PARAMS = new URLSearchParams({
  key: '29138945-719dfadf34447ae392f9f2b7e',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: `${PER_PAGE}`,
});

export const FAILURE_MSG =
  'Sorry, there are no images matching your search query. Please try again.';

export const INFO_MSG =
  "We're sorry, but you've reached the end of search results.";
