import jwt from 'jsonwebtoken';

export default class TokenService {
    static generateAccessToken(id: number, username: string) {
        return jwt.sign({ id: id, username: username}, process.env.TOKEN_SECRET as string, { expiresIn: '1800s' });
    }
}
