const sluggify = string =>
  string
    .toLowerCase()
    .replace(/[^0-9a-zA-Z -]/g, '')
    .trim()
    .replace(/ +/g, '-');
// console.log(sluggify("Unicorns & Rain-bow's!  "));

const sortByText = (phrases, list) => {
  const sortedList = [...list];
  return sortedList.sort((a, b) => {
    const aText = phrases[a] ? phrases[a].text || 'zz' : 'zz';
    const bText = phrases[b] ? phrases[b].text || 'zz' : 'zz';
    if (aText < bText) {
      return -1;
    }
    if (aText > bText) {
      return 1;
    }
    return 0;
  });
};

export { sluggify, sortByText };
