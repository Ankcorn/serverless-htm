const cookCamel = (str) =>
  str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
const camelize = (s) => s.replace(/-./g, (x) => x[1].toUpperCase());

const validHeaders = [
  "immutable",
  "stale-while-revalidate",
  "stale-if-error",
  "must-revalidate",
  "no-cache",
  "no-store",
  "no-transform",
  "public",
  "private",
  "proxy-revalidate",
  "max-age",
  "s-maxage",
];

const numericHeaders = [
  "stale-while-revalidate",
  "stale-if-error",
  "max-age",
  "s-maxage",
];

function parseOption(key, value) {
  const name = cookCamel(key);

  if (!validHeaders.includes(name)) {
    throw Error(
      `SERVERLESS-HTM: options.cacheControl ${key} is not valid. Try one of ${validHeaders.map(
        camelize
      )}`
    );
  }

  if (numericHeaders.includes(name)) {
    if (typeof value !== "number") {
      throw Error(
        `SERVERLESS-HTM: options.cacheControl ${key} should be a number`
      );
    }

    return `${name}=${value}`;
  }

  if (typeof value !== "boolean") {
    throw Error(
      `SERVERLESS-HTM: options.cacheControl ${key} should be a boolean`
    );
  }

  return name;
}

function buildCacheHeader(caching) {
  const defaults = {
    noCache: true,
    noStore: true,
    mustRevalidate: true,
    maxAge: 0,
    sMaxage: 0,
  };

  const cacheControl = { ...defaults, ...caching };

  return Object.entries(cacheControl).reduce(
    (sum, el) => `${sum}, ${parseOption(...el)}`,
    ""
  );
}

module.exports = buildCacheHeader;
