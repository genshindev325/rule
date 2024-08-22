import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Process a GET request
    const memberStores = [
      { storeID: '1111-2222-3333-43441', monthRate: '5000', storeName: 'Taro Yamamoto', registeredDate: 'September 20, 2023 17:00' },
      { storeID: '1111-2222-3333-43442', monthRate: '5000', storeName: 'Taro Sato', registeredDate: 'October 12, 2023 16:00' },
      { storeID: '1111-2222-3333-43443', monthRate: '5000', storeName: 'Taro Iwasaki', registeredDate: 'October 20, 2023 17:00' },
      { storeID: '1111-2222-3333-43444', monthRate: '5000', storeName: 'Taro Omae', registeredDate: 'December 15, 2023 18:00' },
      { storeID: '1111-2222-3333-43445', monthRate: '5000', storeName: 'Hanako', registeredDate: 'September 20, 2023 17:00' },
      { storeID: '1111-2222-3333-43446', monthRate: '5000', storeName: 'Hanako', registeredDate: 'October 12, 2023 16:00' },
      { storeID: '1111-2222-3333-43447', monthRate: '5000', storeName: 'Hanako', registeredDate: 'October 20, 2023 17:00' },
      { storeID: '1111-2222-3333-43448', monthRate: '5000', storeName: 'Taro Omae', registeredDate: 'December 15, 2023 18:00' },
      { storeID: '1111-2222-3333-43449', monthRate: '5000', storeName: 'Taro Yamamoto', registeredDate: 'September 20, 2023 17:00' },
      { storeID: '1111-2222-3333-43451', monthRate: '5000', storeName: 'Taro Sato', registeredDate: 'October 12, 2023 16:00' },
      { storeID: '1111-2222-3333-43452', monthRate: '5000', storeName: 'Taro Iwasaki', registeredDate: 'October 20, 2023 17:00' },
      { storeID: '1111-2222-3333-43453', monthRate: '5000', storeName: 'Taro Omae', registeredDate: 'December 15, 2023 18:00' },
      { storeID: '1111-2222-3333-43454', monthRate: '5000', storeName: 'Taro Yamamoto', registeredDate: 'September 20, 2023 17:00' },
      { storeID: '1111-2222-3333-43455', monthRate: '5000', storeName: 'Taro Sato', registeredDate: 'October 12, 2023 16:00' },
      { storeID: '1111-2222-3333-43456', monthRate: '5000', storeName: 'Taro Iwasaki', registeredDate: 'October 20, 2023 17:00' },
      { storeID: '1111-2222-3333-43457', monthRate: '5000', storeName: 'Taro Omae', registeredDate: 'December 15, 2023 18:00' },
      { storeID: '1111-2222-3333-43458', monthRate: '5000', storeName: 'Taro Yamamoto', registeredDate: 'September 20, 2023 17:00' },
      { storeID: '1111-2222-3333-43459', monthRate: '5000', storeName: 'Taro Sato', registeredDate: 'October 12, 2023 16:00' },
      { storeID: '1111-2222-3333-43461', monthRate: '5000', storeName: 'Taro Iwasaki', registeredDate: 'October 20, 2023 17:00' },
      { storeID: '1111-2222-3333-43462', monthRate: '5000', storeName: 'Taro Omae', registeredDate: 'December 15, 2023 18:00' },
      { storeID: '1111-2222-3333-43463', monthRate: '5000', storeName: 'Taro Yamamoto', registeredDate: 'September 20, 2023 17:00' },
      { storeID: '1111-2222-3333-43464', monthRate: '5000', storeName: 'Taro Sato', registeredDate: 'October 12, 2023 16:00' },
      { storeID: '1111-2222-3333-43465', monthRate: '5000', storeName: 'Taro Iwasaki', registeredDate: 'October 20, 2023 17:00' },
      { storeID: '1111-2222-3333-43466', monthRate: '5000', storeName: 'Taro Omae', registeredDate: 'December 15, 2023 18:00' },
      // Get memberstore list from database 
    ];
    
    res.status(200).json({ memberStores: memberStores });
  } else {
    // Handle any other HTTP method
  }
}