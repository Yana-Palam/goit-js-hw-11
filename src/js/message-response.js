import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { responseCounter } from './api-service';
import { hideLoadMoreBtn } from './load-more-btn';
import { INFO_MSG, FAILURE_MSG } from './const';

export function actionsWithResponse(response) {
  const { totalHits, hits } = response.data;

  if (hits.length === 0) {
    hideLoadMoreBtn();
    return Notify.failure(FAILURE_MSG);
  }

  if (responseCounter === 1) {
    return Notify.success(`Hooray! We found ${totalHits} images.`);
  }

  if (responseCounter >= totalHits / 40) {
    hideLoadMoreBtn();
    Notify.info(INFO_MSG);
  }
}
