import { NextApiRequest, NextApiResponse } from 'next';
//hash化のためのbcryptをインポート
import bcrypt from 'bcryptjs';

const users = []; // 仮のユーザーリスト。DBに置換予定。

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // パスワードのハッシュ化
        const hashedPassword = await bcrypt.hash(password, 10);

        // 新しいユーザーをリストに追加
        users.push({ email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};