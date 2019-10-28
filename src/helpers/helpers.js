const sluggify = string =>
  string
    .toLowerCase()
    .replace(/[^0-9a-zA-Z -]/g, '')
    .trim()
    .replace(/ +/g, '-');
// console.log(sluggify("Unicorns & Rain-bow's!  "));

export { sluggify };
