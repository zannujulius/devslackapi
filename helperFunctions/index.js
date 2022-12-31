const DEFAULT_PAGE_LIMIT = 0;
const DEFAULT_PAGE_NUMEBR = 1;
function getPagination(query) {
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMEBR;
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * limit;
  return {
    skip,
    limit,
  };
}

function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

module.exports = {
  getPagination,
  removeDuplicates,
};
