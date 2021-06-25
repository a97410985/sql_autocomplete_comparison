module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/sql_autocomplete_comparison/"
      : "/",

  outputDir: "./docs",

  transpileDependencies: ["vuetify"]
}
