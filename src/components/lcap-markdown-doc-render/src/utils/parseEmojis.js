const full_json = require('markdown-it-emoji/lib/data/full.json');

export default (str) => String(str).replace(/:(.+?):/g, (placeholder, key) => full_json.default[key] || placeholder);
