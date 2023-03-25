module.exports = () => {
  if (process.env.APP_ENV === "production") {
    const config = require("./app.production.json");
    config.expo.android.config.googleMaps.apiKey = process.env.GOOGLE_API_KEY;

    return config;
  } else {
    return require("./app.json");
  }
};
