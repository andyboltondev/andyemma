export const cycle = 50;

export const dates = {
  together: Date.parse('20 Aug 2017 00:00:00 GMT'),
  engaged: null,
  married: null,
};

export const units = {
  years: 31556952000 / cycle,
  months: 2592000000 / cycle,
  weeks: 604800000 / cycle,
  days: 86400000 / cycle,
  hours: 3600000 / cycle,
  minutes: 60000 / cycle,
  seconds: 1000 / cycle,
};

export const unitKeys = Object.keys(units);

export const dateKeys = Object.keys(dates);

const emptyCounter = unitKeys.reduce(function(result, key) {
  result[key] = null;
  return result;
}, {});

export const counters = dateKeys.reduce(function(result, key) {
  result[key] = { ...emptyCounter };

  return result;
}, {});

export const percentages = dateKeys.reduce(function(result, key) {
  result[key] = { ...emptyCounter };
  return result;
}, {});
