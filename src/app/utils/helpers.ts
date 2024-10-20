import dayjs from 'dayjs';
import fs from 'fs';
import config from '@/config';

export const getNow = (format = config.detetime.default) => dayjs().format(format);

export const getRandomFloat = (min, max) => Math.random() * (max - min) + min;

export const randomNumber = (length = 10) => {
  let text = '';
  const possible = '123456789';
  for (let i = 0; i < length; i++) {
    const sup = Math.floor(Math.random() * possible.length);
    text += i > 0 && sup === i ? '0' : possible.charAt(sup);
  }
  return Number(text);
};

export const jsonToCsvBooks = (filename) => {
  const data = fs.readFileSync(filename, 'utf8');
  const json = JSON.parse(data).books;
  const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
  const header = Object.keys(json[0]);
  let csv = json.map((row) => header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(','));
  csv.unshift(header.join(','));
  csv = csv.join('\r\n');
  fs.writeFileSync(`storage/files/${filename}.csv`, csv);
  return csv;
};

export const toString = (data) => {
  if (data === null) {
    return null;
  } else if (['number', 'string', 'boolean'].includes(typeof data)) {
    return data;
  } else {
    return JSON.stringify(data);
  }
};