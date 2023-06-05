import moment from 'moment';

export const timestamp = (time: string) => {
  moment.locale('en', {
    relativeTime: {
      s: '%ds',
      ss: '%ds',
      m: '%dm',
      mm: '%dm',
      h: '%dh',
      hh: '%dh',
      d: '%dd',
      dd: '%dd',
      y: '%dy',
      yy: '%dy',
    },
  });

  moment.relativeTimeRounding(Math.floor);

  moment.relativeTimeThreshold('s', 60);
  moment.relativeTimeThreshold('m', 60);
  moment.relativeTimeThreshold('h', 24);
  moment.relativeTimeThreshold('d', 7);
  moment.relativeTimeThreshold('M', 12);

  const duration = moment(new Date(time)).fromNow(true);

  //convert 7 days to 1 week
  if (duration.includes('day')) {
    const days = parseInt(duration.split(' ')[0]);
    if (days >= 7) {
      return Math.floor(days / 7) + 'w';
    }
    return duration;
  }

  //convert months to weeks
  if (duration.includes('month')) {
    const countDays = moment(Date.now()).diff(moment(new Date(time)), 'days');
    return Math.floor(countDays / 7) + 'w';
  }
  return duration;
};
/*
Description:
Input: Time that the event happened
+ Second unit is not show (equal or less than 59 seconds is not show)
+ Minute unit (as known as m) :
  - From 60 seconds (1 minute) to less than 60 minutes => Output: Nm (N is minute, ex: 1m)
+ Hour unit (as known as h):
  - From 60 minutes (1 hour) to less than 24 hours => Output: Nh (N is hour, ex:  1h)
+ Day unit (as known as d):
  - From 24 hours (1 day) to less than 7 days => Output: Nd (N is day, ex: 1d)
+ Week unit (as known as w):
  - From 7 days (1 week) to less than 52 weeks => Output: Nw (N is week, ex: 1w)
+ Year unit (as known as y):
  - 52 weeks (1 year) or more => Output: Ny (N is year, ex: 1y) 
*/

export const newTimeStamp = (
  time: string,
  mapSymbol: { [key: string]: string } = {
    m: ' phút trước',
    h: ' giờ trước',
  }
) => {
  const result = timestamp(time);

  const excludeSymbol = ['d', 'w', 'y'];

  const includeSymbol = ['m', 'h'];

  if (
    excludeSymbol.some(
      (item: string) =>
        result[result?.length - 1].normalize() === item.normalize()
    )
  ) {
    return new Date(time).toLocaleDateString();
  }

  if (
    includeSymbol.some(
      (item: string) =>
        result[result?.length - 1].normalize() === item.normalize()
    )
  ) {
    return (
      result.slice(0, result.length - 1) +
      mapSymbol[result[result?.length - 1] as keyof typeof mapSymbol]
    );
  }
  return 'vừa xong';
};
