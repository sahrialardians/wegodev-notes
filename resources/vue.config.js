module.exports = {
    publicPath: process.env.NODE_ENV === "production"
        ? "dist/" // jika iya jalankan path dist/
        : "./",   // jika tidak jalankan path ./
  outputDir: "../dist",
  indexPath: "../index.html",
  devServer: {
    public: "localhost:8081",
    host: "localhost",
    port: 8081
  }
};