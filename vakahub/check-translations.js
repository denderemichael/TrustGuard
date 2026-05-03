import { translations } from './src/translations.js';

const enKeys = Object.keys(translations.en);
const snKeys = Object.keys(translations.sn || {});
const ndKeys = Object.keys(translations.nd || {});

const missingInSn = enKeys.filter(k => !snKeys.includes(k));
const missingInNd = enKeys.filter(k => !ndKeys.includes(k));

console.log('Missing in Shona:', missingInSn);
console.log('Missing in Ndebele:', missingInNd);
