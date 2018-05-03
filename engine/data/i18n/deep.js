const DEFAULT_LANGUAGE = "en";

function deep(data, language, defaultLanguage = DEFAULT_LANGUAGE) {
  if (typeof data === "object") {
    if (language in data) return data[language];
    if (defaultLanguage in data) return data[defaultLanguage];
    return new Proxy(data, deepProxyHandler(language, defaultLanguage));
  }
  return data;
}

const deepProxyHandler = (language, defaultLanguage) => ({
  get: function(obj, prop) {
    return deep(obj[prop], language, defaultLanguage);
  }
});

export default deep;
