//Imports
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import { refs } from './js/refs';
import {
  getImage,
  resetPageCounter,
  incrementResponseCounter,
  resetResponseCounter,
} from './js/api-service';
import { renderMarkup, createMarkup, clearMarkup } from './js/markup';
import {
  showLoadMoreBtn,
  disableLoadMoreBtn,
  enableLoadMoreBtn,
} from './js/load-more-btn';
import { actionsWithResponse } from './js/message-response.js';

//Vars
var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 0.25,
});

let searchQuery = '';

//Run

//Listeners
refs.searchForm.addEventListener('submit', onSubmitClick);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

//Functions
function onSubmitClick(evt) {
  evt.preventDefault();
  searchQuery = getValueFromInput(evt);
  if (!searchQuery) return;

  showLoadMoreBtn();
  resetResponseCounter();
  clearMarkup(refs.gallery);
  resetPageCounter();
  renderMarkupOnPage(searchQuery);
}

function onLoadMoreBtnClick() {
  renderMarkupOnPage(searchQuery);
}

async function renderMarkupOnPage(searchQuery) {
  try {
    disableLoadMoreBtn();
    const response = await getImage(searchQuery);

    actionsWithResponse(response);
    incrementResponseCounter();
    renderMarkup(refs.gallery, createMarkup(response));
    lightboxRefresh();
    enableLoadMoreBtn();
  } catch (error) {
    Notify.failure(`Error! ${error}`);
  }
}

function getValueFromInput(evt) {
  return evt.currentTarget.elements.searchQuery.value.trim('');
}

function lightboxRefresh() {
  lightbox.refresh();
}
