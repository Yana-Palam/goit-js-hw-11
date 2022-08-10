import axios from 'axios';
import { SEARCH_PARAMS, BASE_URL } from './const';

let pageCounter = 1;
export let responseCounter = 1;

export async function getImage(searchQuery) {
  try {
    SEARCH_PARAMS.append('q', searchQuery);
    SEARCH_PARAMS.append('page', pageCounter);

    const response = await axios.get(`${BASE_URL}?${SEARCH_PARAMS}`);
    pageCounter += 1;

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export function resetPageCounter() {
  pageCounter = 1;
}

export function incrementResponseCounter() {
  responseCounter += 1;
}

export function resetResponseCounter() {
  responseCounter = 1;
}
