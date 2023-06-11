/**this function is use to convert a "MM-YYYY" string is ISO tring */
export default function convertToISO(dateString: string) {
  // Split the date string into month and year
  const [month, year] = dateString.split('-');

  // Create a new Date object using the parsed values
  const date = new Date(`${year}-${month}-01`);

  // Convert the Date object to an ISO string
  const isoString = date.toISOString();

  return isoString;
}
