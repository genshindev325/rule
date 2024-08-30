import type { NextApiRequest, NextApiResponse } from 'next'
 
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Process a GET request
    const storeSales = [
      { storeName: '居酒屋1', sales: '12356', salesForecast: '15356', totalDepositedAmount: '12356' },
      { storeName: '居酒屋2', sales: '23589', salesForecast: '24623', totalDepositedAmount: '23589' },
      { storeName: '居酒屋3', sales: '8535', salesForecast: '18236', totalDepositedAmount: '8535' },
      { storeName: '居酒屋1', sales: '9389', salesForecast: '29491', totalDepositedAmount: '9389' },
      { storeName: '居酒屋2', sales: '14765', salesForecast: '17856', totalDepositedAmount: '19999' },
      { storeName: '居酒屋3', sales: '2356', salesForecast: '12256', totalDepositedAmount: '23476' },
      { storeName: '居酒屋1', sales: '12356', salesForecast: '15356', totalDepositedAmount: '12356' },
      { storeName: '居酒屋2', sales: '23589', salesForecast: '24623', totalDepositedAmount: '23589' },
      { storeName: '居酒屋3', sales: '8535', salesForecast: '18236', totalDepositedAmount: '8535' },
      { storeName: '居酒屋1', sales: '9389', salesForecast: '29491', totalDepositedAmount: '9389' },
      { storeName: '居酒屋2', sales: '14765', salesForecast: '17856', totalDepositedAmount: '19999' },
      { storeName: '居酒屋3', sales: '2356', salesForecast: '12256', totalDepositedAmount: '23476' },
      { storeName: '居酒屋1', sales: '12356', salesForecast: '15356', totalDepositedAmount: '12356' },
      { storeName: '居酒屋2', sales: '23589', salesForecast: '24623', totalDepositedAmount: '23589' },
      { storeName: '居酒屋3', sales: '8535', salesForecast: '18236', totalDepositedAmount: '8535' },
      { storeName: '居酒屋1', sales: '9389', salesForecast: '29491', totalDepositedAmount: '9389' },
      { storeName: '居酒屋2', sales: '14765', salesForecast: '17856', totalDepositedAmount: '19999' },
      { storeName: '居酒屋3', sales: '2356', salesForecast: '12256', totalDepositedAmount: '23476' },
      { storeName: '居酒屋1', sales: '12356', salesForecast: '15356', totalDepositedAmount: '12356' },
      { storeName: '居酒屋2', sales: '23589', salesForecast: '24623', totalDepositedAmount: '23589' },
      { storeName: '居酒屋3', sales: '8535', salesForecast: '18236', totalDepositedAmount: '8535' },
      { storeName: '居酒屋1', sales: '9389', salesForecast: '29491', totalDepositedAmount: '9389' },
      { storeName: '居酒屋2', sales: '14765', salesForecast: '17856', totalDepositedAmount: '19999' },
      { storeName: '居酒屋3', sales: '2356', salesForecast: '12256', totalDepositedAmount: '23476' },
      { storeName: '居酒屋1', sales: '12356', salesForecast: '15356', totalDepositedAmount: '12356' },
      { storeName: '居酒屋2', sales: '23589', salesForecast: '24623', totalDepositedAmount: '23589' },
      { storeName: '居酒屋3', sales: '8535', salesForecast: '18236', totalDepositedAmount: '8535' },
      { storeName: '居酒屋1', sales: '9389', salesForecast: '29491', totalDepositedAmount: '9389' },
      { storeName: '居酒屋2', sales: '14765', salesForecast: '17856', totalDepositedAmount: '19999' },
      { storeName: '居酒屋3', sales: '2356', salesForecast: '12256', totalDepositedAmount: '23476' },
      // Add more users if needed
    ];
    
    res.status(200).json({ storeSales: storeSales });
  } else {
    // Handle any other HTTP method
  }
}
