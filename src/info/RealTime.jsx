import { useEffect } from 'react';
import { getRealTimeData } from '../api/getData';

export default function RealTime() {
  useEffect(() => {
    const getData = async () => {
      const result = await getRealTimeData();
      console.log(result);
    };

    getData();
  }, []);
  return <div>RealTime</div>;
}
