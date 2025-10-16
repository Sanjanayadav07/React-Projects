// src/data.js

export const API_KEY = 'AIzaSyBmjZ-tXZQ4vmtdOu48MKNnPe-WE4euwMY';

export const value_converter = (value) => {
  if (value >= 1_000_000) {
    return Math.floor(value / 1_000_000) + "M";
  } else if (value >= 1_000) {
    return Math.floor(value / 1_000) + "K";
  } else {
    return value;
  }
};
