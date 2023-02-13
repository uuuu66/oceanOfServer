export default () => ({
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,

  mongoURL: process.env.MONGO_URL,
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
  swaggerId: process.env.SWAGGER_ID,
  swaggerPwd: process.env.SWAGGER_PWD,
});
