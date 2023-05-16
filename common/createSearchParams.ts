const createSearchParams = (searchFields: string[], value: string) => {
  if (value === '') return '';
  let searchParamsString = '';

  for (let key in searchFields) {
    searchParamsString =
      searchParamsString + `&like[${key}]=${searchFields[key]},${value}`;
  }

  return searchParamsString;
};

export default createSearchParams;
