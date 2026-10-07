import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET environment variable is not set");
}
if (jwtSecret.length < 32) {
  console.warn(
    "WARNING: JWT_SECRET is shorter than 32 characters, so login tokens could be brute-forced. Use a long random value, e.g. `openssl rand -hex 32`."
  );
}

const ACCESS_TOKEN_EXPIRES_IN = "7d";
// Pinned so a token can never pick its own verification algorithm
const JWT_ALGORITHM = "HS256";

function signAccessToken(userId: string): string {
  return jwt.sign({}, jwtSecret, {
    algorithm: JWT_ALGORITHM,
    subject: userId,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
}

function verifyAccessToken(token: string): string {
  if (typeof token !== "string") {
    throw new Error("Missing token");
  }
  const payload = jwt.verify(token, jwtSecret, {
    algorithms: [JWT_ALGORITHM],
  });
  if (typeof payload === "string" || !payload.sub) {
    throw new Error("Invalid token payload");
  }
  return payload.sub;
}

async function verifyTokens(req, res, next) {
  const accessToken = req.headers["access-token"];

  if (!accessToken) {
    return res.status(401).json({ message: "Missing tokens" });
  }

  try {
    verifyAccessToken(accessToken);
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid tokens" });
  }
}

async function verifyTokenSocket(token) {
  try {
    verifyAccessToken(token);
    return true;
  } catch (err) {
    return false;
  }
}

async function getUserId(accessToken) {
  try {
    return verifyAccessToken(accessToken);
  } catch (err) {
    return null;
  }
}

export { verifyTokens, getUserId, verifyTokenSocket, signAccessToken };
