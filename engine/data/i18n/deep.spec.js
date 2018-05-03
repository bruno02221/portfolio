import deep from "./deep";

describe("deep", () => {
  it("works with no levels deep", () => {
    const data = {
      en: "One",
      pt: "Um"
    };
    expect(deep(data, "en")).toBe("One");
    expect(deep(data, "pt")).toBe("Um");
    expect(deep(data, "ru", "en")).toBe("One");
  });

  it("works when data is not an object", () => {
    expect(deep(5, "en")).toBe(5);
    expect(deep("text", "en")).toBe("text");
    expect(deep(true, "en")).toBe(true);
  });

  it("works with 1 level deep", () => {
    const data = {
      sub: {
        en: "One",
        pt: "Um"
      }
    };
    expect(deep(data, "en").sub).toEqual("One");
    expect(deep(data, "pt").sub).toEqual("Um");
  });

  it("works with 2 levels deep", () => {
    const data = {
      one: {
        two: {
          en: "hello",
          pt: "oi"
        }
      }
    };
    expect(deep(data, "en").one.two).toEqual("hello");
    expect(deep(data, "pt").one.two).toEqual("oi");
  });

  it("works with more than 2 levels deep", () => {
    const data = {
      one: {
        two: {
          three: {
            en: "EN",
            pt: "PT"
          }
        }
      }
    };
    expect(deep(data, "en").one.two.three).toBe("EN");
    expect(deep(data, "pt").one.two.three).toBe("PT");
  });

  it("works with not found properties", () => {
    const data = {
      one: "One"
    };
    expect(deep(data, "en").two).toBeUndefined();
  });

  it("works with nested data", () => {
    const data = {
      sub: {
        en: {
          one: "One",
          two: "Two"
        },
        pt: {
          one: "Um",
          two: "Dois"
        }
      }
    };
    expect(deep(data, "en").sub).toEqual({
      one: "One",
      two: "Two"
    });
    expect(deep(data, "pt").sub).toEqual({
      one: "Um",
      two: "Dois"
    });
  });

  it("uses the defaultLanguage when the specified language is not found", () => {
    const data = {
      en: "Default",
      pt: "Padrão"
    };
    expect(deep(data, "ru", "en")).toEqual("Default");
    expect(deep(data, "ru", "pt")).toEqual("Padrão");
  });
});
