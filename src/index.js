//Imports
import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import { refs } from './js/refs';
import {
  getImage,
  resetPageCounter,
  incrementPageCounter,
} from './js/api-service';
import { renderMarkup, createMarkup, clearMarkup } from './js/markup';
import {
  disableLoadMoreButton,
  toggleHideLoadMoreBtn,
} from './js/load-more-btn';
import { actionsWithResponse } from './js/message-response.js';

//Vars
var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 0.25,
});

let searchQuery = '';

//Listeners
refs.searchForm.addEventListener('submit', onSubmitClick);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

//Functions
function onSubmitClick(evt) {
  evt.preventDefault();
  searchQuery = getValueFromInput(evt);
  if (!searchQuery) return;

  toggleHideLoadMoreBtn('remove');
  clearMarkup(refs.gallery);
  resetPageCounter();
  renderMarkupOnPage(searchQuery);
}

function onLoadMoreBtnClick() {
  renderMarkupOnPage(searchQuery);
}

async function renderMarkupOnPage(searchQuery) {
  try {
    disableLoadMoreButton(true, 'Loading...');
    const response = await getImage(searchQuery);

    actionsWithResponse(response);
    incrementPageCounter();
    renderMarkup(refs.gallery, createMarkup(response));
    lightboxRefresh();
    disableLoadMoreButton(false, 'Load more');
  } catch (error) {
    Notify.failure(`Error! ${error.message}`);
  }
}

function getValueFromInput(evt) {
  return evt.currentTarget.elements.searchQuery.value.trim('');
}

function lightboxRefresh() {
  lightbox.refresh();
}
