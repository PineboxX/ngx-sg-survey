module.exports = {
  "globDirectory": "dist/",
  "globPatterns": [
    "**/*.{txt,png,xml,ico,svg,eot,woff2,ttf,woff,html,js,json,css}"
  ],
  "swDest": "dist/sw.js",
  "swSrc": "src/swModel.js",
  "maximumFileSizeToCacheInBytes": 500000000,
};