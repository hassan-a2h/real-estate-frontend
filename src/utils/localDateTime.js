import moment from 'moment-timezone';

function convertToKarachiTime(dateString) {
  // 1. Parse the date string into a moment object (in UTC)
  const utcMoment = moment.utc(dateString);

  // 2. Convert to Karachi time zone
  const karachiMoment = utcMoment.tz("Asia/Karachi");

  // 3. Format the local date according to your desired format
  const formattedKarachiTime = karachiMoment.format();

  return formattedKarachiTime;
}

export default convertToKarachiTime;