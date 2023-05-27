import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

// const scheduleHint = 'NOTE: The average single installation appointment takes approx 90 minutes; Double installation 120 minutes; Triple installation 150 minutes';
const scheduleHint = '';
const availabilityHint = 'NOTE: Setting a “Daily Availability” will override these recurring hours';
const dailyHint = 'Tap on a day to adjust your availability.';

const fullDayStart = 900;
const fullDayEnd = 1700;

const strTitleOverlay = 'Select your available hours.';

const arrWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const usTime = [];
const usTimeFullDay = [];
const timesWithStyle = [];

const start = dayjs('1/1/1 6:00 AM');
for (let i = 0; i < 14; ++i) {
  const nextHour = start.add(i, 'hour');
  const time12h = nextHour.format('h:mm A');
  const time24h = Number(nextHour.format('kmm'));
  usTime.push(time12h);
  if ((time24h >= fullDayStart) && (time24h <= fullDayEnd)) usTimeFullDay.push(time24h);
  timesWithStyle.push({ source: time12h, style: false });
}

export {
  scheduleHint, availabilityHint, dailyHint, fullDayStart, fullDayEnd,
  strTitleOverlay, arrWeek, usTime, usTimeFullDay, timesWithStyle
}