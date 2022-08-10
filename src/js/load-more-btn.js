import { refs } from './refs';

export function disableLoadMoreButton(value = true, text = 'Loading...') {
  refs.loadMoreBtn.disabled = value;
  refs.loadMoreBtn.textContent = text;
}

export function toggleHideLoadMoreBtn(method) {
  refs.loadMoreBtn.classList[method]('is-hidden');
}
