function objectEquals(
  initValues: { [key: string]: any },
  currentValues: { [key: string]: any }
) {
  for (let key in initValues) {
    if (initValues[key] !== currentValues[key]) return false;
  }
  return true;
}
export default objectEquals;
