import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.AUTH_SECRET;

if (!secretKey) {
  throw new Error("AUTH_SECRET is not configured.");
}

const secret = new TextEncoder().encode(secretKey);

export async function createSession(user) {
  return await new SignJWT({
    userId: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySession(token) {
  try {
    const { payload } = await jwtVerify(token, secret);

    return payload;
  } catch {
    return null;
  }
}