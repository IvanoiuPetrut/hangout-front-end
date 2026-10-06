import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET environment variable is not set");
}

const ACCESS_TOKEN_EXPIRES_IN = "7d";

function signAccessToken(userId: string): string {
  return jwt.sign({}, jwtSecret, {
    subject: userId,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
}

function verifyAccessToken(token: string): string {
  const payload = jwt.verify(token, jwtSecret);
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
