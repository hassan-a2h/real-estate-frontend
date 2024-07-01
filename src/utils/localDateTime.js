import moment from 'moment-timezone';

function convertToKarachiTime(dateString, options = {}) {
  const utcMoment = moment.utc(dateString);

  const karachiMoment = utcMoment.tz("Asia/Karachi");
  const formattedKarachiTime = karachiMoment.format();

  if (options?.onlyHours) {
    return formattedKarachiTime?.split('T')[1].slice(0, 5).replace('.', ':');
  }

  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed
  const currentDay = currentDate.getDate();

  let [ messageYear, messageMonth, messageDay ] = formattedKarachiTime.split('T')[0].split('-'); 
  let finalDate = '';

  if (currentYear != messageYear) {
    finalDate += Number(currentYear) - Number(messageYear);
    const unit = +finalDate > 1 ? 'years' : 'year';
    return finalDate + ` ${unit} ago`;
  } else if (currentMonth != messageMonth) {
    finalDate += Number(currentMonth) - Number(messageMonth);
    const unit = +finalDate > 1 ? 'months' : 'month';
    return finalDate + ` ${unit} ago`;
  } else if (currentDay != messageDay) {
    finalDate += Number(currentDay) - Number(messageDay);
    const unit = +finalDate > 1 ? 'days' : 'day';
    return finalDate + ` ${unit} ago`;
  }

  return formattedKarachiTime?.split('T')[1].slice(0, 5).replace('.', ':');
}

export default convertToKarachiTime;