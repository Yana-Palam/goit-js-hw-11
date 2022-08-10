import { refs } from './refs';

export function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

export function enableLoadMoreBtn() {
  refs.loadMoreBtn.disabled = false;
  refs.loadMoreBtn.textContent = 'Load more';
}

export function disableLoadMoreBtn() {
  refs.loadMoreBtn.disabled = true;
  refs.loadMoreBtn.textContent = 'Loading...';
}
