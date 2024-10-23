import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import User from '../../models/User'; // ユーザーモデルのインポート

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      // ユーザーが既に存在するか確認
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'このメールアドレスは既に登録されています' });
      }

      // パスワードをハッシュ化
      const hashedPassword = bcrypt.hashSync(password, 10);

      // 新しいユーザーを作成
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();

      // ユーザー登録が完了したら自動的にログイン
      const session = await getSession({ req });
      if (session) {
        return res.status(201).json({ message: 'ユーザー登録が完了し、ログインしました' });
      }

      res.status(201).json({ message: 'ユーザー登録が完了しました' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: '不明なエラーが発生しました' });
      }
    }
  } else {
    res.status(405).json({ message: 'メソッドが許可されていません' });
  }
}