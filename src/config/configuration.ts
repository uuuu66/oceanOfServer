export default () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME || '15m',
  mongoURL: process.env.MONGO_URL,
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
  swaggerId: process.env.SWAGGER_ID,
  swaggerPwd: process.env.SWAGGER_PWD,
});
