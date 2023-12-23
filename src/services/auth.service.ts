import { env } from "@src/config";
import jwt, { type JwtPayload } from "jsonwebtoken";
import moment, { type Moment } from "moment";
import { IApp } from "@src/interfaces";
import { compare, hash, genSalt } from "bcrypt";

/**
 * Generates a JSON Web Token (JWT) for the given user ID that expires at the specified time.
 * @param userId {string}  - The user ID is to include in the JWT payload.
 * @param  expiresIn {Moment} - The moment object representing the expiration time of the JWT.
 * @param  [secret=env.jwt.accessSecret] {string} - The secret key to use for signing the JWT.
 * @returns {string} - The generated JWT.
 */
const generateToken = (
  userId: string,
  expiresIn: Moment,
  secret: string = env.jwt.accessTokenSecret,
): string => {
  const payload = {
    sub: userId,
    exp: expiresIn.unix(),
    audience: env.siteTitle,
    issuer: env.siteTitle,
  };
  return jwt.sign(payload, secret);
};

/**
 * Verifies the signature and integrity of the given JWT and returns its decoded payload.
 * @param token {string} - The JWT to verify.
 * @param [secret=env.jwt.accessSecret] {string}  - The secret key to use for verifying the JWT.
 * @returns {*} - The decoded JWT payload.
 */
const verifyToken = (
  token: string,
  secret: string = env.jwt.accessTokenSecret,
): string | JwtPayload => {
  return jwt.verify(token, secret);
};

/**
 * Generates an access token and a refresh token for the given user ID.
 * @param userId {string}  - The user ID is to include in the JWT payload.
 * @param tokenType {AppRoles} - The type of token to generate.
 * @returns {AuthTokens} - An object containing the generated access and refresh tokens.
 */
const generateAuthTokens = (
  userId: string,
  tokenType: IApp.AppRoles,
): IApp.AuthTokens => {
  const accessSecret =
    tokenType === IApp.AppRoles.ADMIN
      ? env.jwt.adminAccessTokenSecret
      : env.jwt.accessTokenSecret;
  const refreshSecret =
    tokenType === IApp.AppRoles.ADMIN
      ? env.jwt.adminRefreshTokenSecret
      : env.jwt.refreshTokenSecret;
  const accessTokenExpires = moment().add(env.jwt.accessExpiration, "days");
  const accessToken = generateToken(userId, accessTokenExpires, accessSecret);
  const refreshTokenExpires = moment().add(env.jwt.refreshExpiration, "days");
  const refreshToken = generateToken(
    userId,
    refreshTokenExpires,
    refreshSecret,
  );
  return { access_token: accessToken, refresh_token: refreshToken };
};

/**
 * Function to check encrypted password hash is valid or not using bcrypt.compare function
 * @param  password {string} : Plain text password
 * @param encryptedHash {string} : Encrypted hash
 */
const comparePassword = async (
  password: string,
  encryptedHash: string,
): Promise<boolean> => {
  return await compare(password, encryptedHash);
};

/**
 * Function to encrypt password using bcrypt.hash function
 * @param password {string} : Plain text password
 * @returns {Promise<string>} : Encrypted hash
 */
const encryptPassword = async (password: string): Promise<string> => {
  const salt: string = await genSalt(env.saltRounds);
  return await hash(password, salt);
};

export default {
  generateToken,
  verifyToken,
  generateAuthTokens,
  comparePassword,
  encryptPassword,
};
