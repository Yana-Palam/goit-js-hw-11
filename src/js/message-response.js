import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { pageCounter } from './api-service';
import { toggleHideLoadMoreBtn } from './load-more-btn';
import { INFO_MSG, FAILURE_MSG, PER_PAGE } from './const';

export function actionsWithResponse(response) {
  const { totalHits, hits } = response.data;

  if (hits.length === 0) {
    toggleHideLoadMoreBtn('add');
    return Notify.failure(FAILURE_MSG);
  }

  if (pageCounter === 1) {
    return Notify.success(`Hooray! We found ${totalHits} images.`);
  }

  if (pageCounter >= Math.floor(totalHits / PER_PAGE)) {
    toggleHideLoadMoreBtn('add');
    Notify.info(INFO_MSG);
  }
}
