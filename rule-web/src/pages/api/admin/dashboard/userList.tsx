import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Process a GET request
    const users = [
      { userID: '1111-2222-3333-44441', userName: 'Taro Yamamoto', registeredDate: 'September 20, 2023 17:00' },
      { userID: '1111-2222-3333-44442', userName: 'Taro Sato', registeredDate: 'October 12, 2023 16:00' },
      { userID: '1111-2222-3333-44443', userName: 'Taro Iwasaki', registeredDate: 'October 20, 2023 17:00' },
      { userID: '1111-2222-3333-44444', userName: 'Taro Omae', registeredDate: 'December 15, 2023 18:00' },
      { userID: '1111-2222-3333-44445', userName: 'Hanako', registeredDate: 'September 20, 2023 17:00' },
      { userID: '1111-2222-3333-44446', userName: 'Hanako', registeredDate: 'October 12, 2023 16:00' },
      { userID: '1111-2222-3333-44447', userName: 'Hanako', registeredDate: 'October 20, 2023 17:00' },
      { userID: '1111-2222-3333-44448', userName: 'Taro Omae', registeredDate: 'December 15, 2023 18:00' },
      { userID: '1111-2222-3333-44449', userName: 'Taro Yamamoto', registeredDate: 'September 20, 2023 17:00' },
      { userID: '1111-2222-3333-44451', userName: 'Taro Sato', registeredDate: 'October 12, 2023 16:00' },
      { userID: '1111-2222-3333-44452', userName: 'Taro Iwasaki', registeredDate: 'October 20, 2023 17:00' },
      { userID: '1111-2222-3333-44453', userName: 'Taro Omae', registeredDate: 'December 15, 2023 18:00' },
      { userID: '1111-2222-3333-44454', userName: 'Taro Yamamoto', registeredDate: 'September 20, 2023 17:00' },
      { userID: '1111-2222-3333-44455', userName: 'Taro Sato', registeredDate: 'October 12, 2023 16:00' },
      { userID: '1111-2222-3333-44456', userName: 'Taro Iwasaki', registeredDate: 'October 20, 2023 17:00' },
      { userID: '1111-2222-3333-44457', userName: 'Taro Omae', registeredDate: 'December 15, 2023 18:00' },
      { userID: '1111-2222-3333-44458', userName: 'Taro Yamamoto', registeredDate: 'September 20, 2023 17:00' },
      { userID: '1111-2222-3333-44459', userName: 'Taro Sato', registeredDate: 'October 12, 2023 16:00' },
      { userID: '1111-2222-3333-44461', userName: 'Taro Iwasaki', registeredDate: 'October 20, 2023 17:00' },
      { userID: '1111-2222-3333-44462', userName: 'Taro Omae', registeredDate: 'December 15, 2023 18:00' },
      { userID: '1111-2222-3333-44463', userName: 'Taro Yamamoto', registeredDate: 'September 20, 2023 17:00' },
      { userID: '1111-2222-3333-44464', userName: 'Taro Sato', registeredDate: 'October 12, 2023 16:00' },
      { userID: '1111-2222-3333-44465', userName: 'Taro Iwasaki', registeredDate: 'October 20, 2023 17:00' },
      { userID: '1111-2222-3333-44466', userName: 'Taro Omae', registeredDate: 'December 15, 2023 18:00' },
      // Add more users if needed
    ];
    
    res.status(200).json({ users: users });
  } else {
    // Handle any other HTTP method
  }
}