import {createBrowserHistory} from 'history';
import {matchPath} from 'react-router';

// see: https://stackoverflow.com/questions/42672842/how-to-get-history-on-react-router-v4
export const history = createBrowserHistory();

export class PangulNavService {
  /** Return the URL for a specific question by id */
  questionById(questionId, title) {
    return `/questions/${questionId}${title ? '/' + title : ''}`;
  }

  /** Navigatie using the page history */
  navigate(url) {
    history.push(url);
  }

  /** Build a match in a child router url */
  match(url) {
    return matchPath(history.location.pathname, {
      path: url,
      exact: false,
      strict: false,
    });
  }

  /** Return the params on the current url */
  params() {
    const search = history.location.search;
    return new URLSearchParams(search);
  }

  /** Set the params on the page */
  setParams(params) {
    let data = Object.entries(params);
    data = data.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
    const path = history.location.pathname + '?' + data.join('&');
    this.navigate(path);
  }
}
