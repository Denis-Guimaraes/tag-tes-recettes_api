const config = () => ({
  app: {
    port: process.env.APP_PORT,
    basePath: process.env.APP_BASE_PATH
  },
  db: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
  mailer: {
    clientId: process.env.MAILER_CLIENT_ID,
    secret: process.env.MAILER_SECRET,
    refreshToken: process.env.MAILER_REFRESH_TOKEN,
    email: process.env.MAILER_EMAIL
  }
});

module.exports = config;
