module.exports = {
  publicPath: process.env.NODE_ENV === "production"
    ? "/articles-mini-catalog/"
    : "/"
};
