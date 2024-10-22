import { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../lib/mongodb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  if (req.method === 'POST') {
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
  } else {
    res.status(405).json({ message: 'メソッドが許可されていません' });
  }
}