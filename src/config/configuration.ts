export default () => ({
  jwtSecret: process.env.JWT_SECRET,
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME,
});
