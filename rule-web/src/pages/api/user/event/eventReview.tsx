import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust as needed
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Respond to preflight request
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Process a POST request
    const title = '街コン・合コン・飲み会イベント';
    const date = '2023年9月20日 17:00~20:00';
    const imageUrl = '/image/img_1.png';
    const map = '/image/img_5.png';
    const maleFee = 5000;
    const maleTotal = 8;
    const males = 7;
    const femaleFee = 2000;
    const femaleTotal = 8;
    const females = 2;
    const rateEvent = 3;
    const rateStore = 4;
    const description = 'イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。イベントの説明が入ります。';
    const types = ['20代以上', '大学生Only', 'アニメ好き'];

    res.status(200).json({
      title: title,
      date: date,
      imageUrl: imageUrl,
      map: map,
      maleFee: maleFee,
      maleTotal: maleTotal,
      males: males,
      femaleFee: femaleFee,
      femaleTotal: femaleTotal,
      females: females,
      rateEvent: rateEvent,
      rateStore: rateStore,
      description: description,
      types: types
    });
  } else if (req.method === 'POST') {
    // Handle any other HTTP method
    const userID = req.body.userID;
  } else {

  }
}