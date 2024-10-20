import connectMongo from '../../lib/mongodb';
import Account from '../../models/Account';
import { NextApiRequest, NextApiResponse } from 'next';

//MongoDB connectionの例
export default async function handlerreq(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();
  
  if (req.method === 'POST') {
    const { name, email, password, reservationDate, pickupDate, productDetails } = req.body;
    const account = new Account({ name, email, password, reservationDate, pickupDate, productDetails });
    await account.save();
    res.status(200).json({ message: 'Account saved successfully!' });
  } else {
    res.status(400).json({ message: 'Invalid request' });
  }
}
