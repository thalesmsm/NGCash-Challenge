import { JwtPayload, sign, verify } from 'jsonwebtoken';

export function generateToken(body: object) {
  const token = sign(body, process.env.JWT_SECRET as string, {
    expiresIn: '24h',
  });
  return token;
}

export default function decodeToken(token: string) {
  const payload = verify(
    token,
    process.env.JWT_SECRET as string,
  ) as JwtPayload;

  return payload;
}
