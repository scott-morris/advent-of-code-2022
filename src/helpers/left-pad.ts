// Public.

function leftPad(str, { width = 2, padWith = '0' } = {}) {
  const padded = `${padWith.repeat(width)}${str}`;
  return padded.slice(0 - width);
}

module.exports = leftPad;
