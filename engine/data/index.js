import { deep } from "./i18n";

const data = require(DATA_PATH);

export function getData(lang) {
  return deep(data, lang);
}

export default getData((window && window.navigator.language) || "en");
