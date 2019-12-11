import {
  DATA_SENT_EVENT,
  NOTIFICATION_ERROR,
  NOTIFICATION_SUCCESS,
  SEND_ERROR,
  SEND_START,
  SEND_SUCCESS,
} from '../constants';

export const API_PATH_ATTR = 'action';
export const DEFAULT_CONTENT_TYPE = 'application/json';
export const SUCCESS_MESSAGE_ATTRIBUTE = 'data-success-message';

function checkStatus(response) {
  console.log(response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

export const ApiHandler = (emitter) => (formEl) => formEl.addEventListener(DATA_SENT_EVENT, (e) => {
  const {data} = e.detail;
  const formName = formEl.getAttribute('name');
  if (emitter) {
    emitter.emit(SEND_START, formEl.getAttribute('name'));
  }
  console.log(data);
  fetch(formEl.getAttribute(API_PATH_ATTR), {
    method: 'POST',
    headers: {
      'Content-Type': DEFAULT_CONTENT_TYPE,
    },
    mode: 'no-cors',
    body: JSON.stringify(data),
  })
    .then(checkStatus)
    .then(parseJSON)
    .then((res) => {
      if (emitter) {
        emitter.emit(SEND_SUCCESS, formName);
        emitter.emit(NOTIFICATION_SUCCESS, formEl.getAttribute(SUCCESS_MESSAGE_ATTRIBUTE));
      }
    })
    .catch((error) => {
      console.error('request failed', error);
      console.log()
      debugger;
      if (emitter) {
        emitter.emit(SEND_ERROR, formName);
        emitter.emit(NOTIFICATION_ERROR, error);
      }
    });
});
