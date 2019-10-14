import React from 'react';
import { cycle, units, unitKeys, dateKeys, dates, counters, percentages } from '../data';

import './App.css';

class App extends React.Component {
  state = {
    now: Date.now(),
  };

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ now: Date.now() }), cycle);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateCounters = () => {
    // get current time from state
    const { now } = this.state;

    // loop through date keys & get date and counter objects
    dateKeys.forEach(key => {
      const date = dates[key];
      const counter = counters[key];
      const percentage = percentages[key];

      // ignore if no date value is set
      if (date !== null) {
        // calculate time difference and adjust to cycle value
        let totalTime = (now - date) / cycle;

        // set count object values
        unitKeys.forEach(unit => {
          counter[unit] = Math.floor(totalTime / units[unit]);
          totalTime -= counter[unit] * units[unit];
          Math.floor((percentage[unit] = (totalTime / units[unit]) * 100));
        });
      }
    });
  };

  getOrdinalSuffix = number => {
    if (number % 10 === 1 && number !== 11) return 'st';
    if (number % 10 === 2 && number !== 12) return 'nd';
    if (number % 10 === 3 && number !== 13) return 'rd';
    return 'th';
  };

  formatDate = timestamp => {
    const date = new Date(timestamp);
    const ordinal = this.getOrdinalSuffix(date.getDate);
    const formattedDate = date
      .toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      .replace(',', '')
      .replace(` ${date.getDate()} `, ` ${date.getDate()}${ordinal} `);

    return formattedDate;
  };

  counterTitle = value =>
    value
      .toLowerCase()
      .charAt(0)
      .toUpperCase() + value.slice(1);

  listItems = period =>
    unitKeys.map((unit, unitIndex) => {
      const value = counters[period][unit];
      const label = value !== 1 ? unit : unit.replace(/s$/i, '');

      const percentage = 100 - percentages[period][unit];

      const radius = 54;
      const circumference = 2 * Math.PI * radius;
      const dashoffset = circumference * (percentage / 100);

      const progressStyle = {
        strokeDasharray: circumference,
        strokeDashoffset: dashoffset,
      };

      const className = `counter__item counter__item--${unit}`;
      return (
        <li key={unitIndex} className={className}>
          <svg className="progress" width="120" height="120" viewBox="0 0 120 120">
            <circle className="progress__meter" cx="60" cy="60" r={radius} strokeWidth="12" />
            <circle className="progress__value" cx="60" cy="60" r={radius} strokeWidth="12" style={progressStyle} />
          </svg>
          <span className="counter__value">{value}</span>
          <span className="counter__label">{label}</span>
        </li>
      );
    });

  counterList = () =>
    dateKeys.map((period, dataIndex) => {
      // check of date has been set..
      if (dates[period] === null) return null;

      const date = this.formatDate(dates[period]);
      const title = this.counterTitle(period);
      const items = this.listItems(period);

      const className = `counter counter--${period}`;
      return (
        <div key={dataIndex} className={className}>
          <h2 className="counter__title">
            {title} Since
            <span className="counter__subtitle">{date}</span>
          </h2>
          <ul className="counter__list">{items}</ul>
        </div>
      );
    });

  render() {
    this.updateCounters();

    return (
      <div className="wrapper">
        <h1>Andy &amp; Emma</h1>
        {this.counterList()}
      </div>
    );
  }
}

export default App;
