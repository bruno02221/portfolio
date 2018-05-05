const DEFAULT_LANGUAGE = "en";

function deep(data, language, defaultLanguage = DEFAULT_LANGUAGE) {
  if (typeof data === "object") {
    const extractedLang = extractLanguage(data, language);
    if (extractedLang) {
      return extractedLang;
    }

    const extractedDefaultLang = extractLanguage(data, defaultLanguage);
    if (extractedDefaultLang) {
      return extractedDefaultLang;
    }

    return new Proxy(data, deepProxyHandler(language, defaultLanguage));
  }
  return data;
}

const deepProxyHandler = (language, defaultLanguage) => ({
  get: function(obj, prop) {
    return deep(obj[prop], language, defaultLanguage);
  }
});

function extractLanguage(data, language) {
  const re = /^(([a-z]+)(-([A-Z]+))?)$/;
  const matches = re.exec(language);

  if (matches[1] in data) {
    return data[matches[1]];
  }

  if (matches[2] in data) {
    return data[matches[2]];
  }
}

export default deep;
