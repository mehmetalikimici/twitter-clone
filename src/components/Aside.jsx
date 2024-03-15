import { collection, count, getAggregateFromServer } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import Spinner from './Spinner'

const Aside = () => {
  const [data, setData] = useState(null);
  console.log(data)

  const tweetsColl = collection(db, 'tweets');
  //dökümanlar ile alakalı istatistikleri alma
  //1) koleksiyonun referansı

  //2) sum / average / count metodları
  useEffect(() => {
    //raporlama fonksiyonu
    getAggregateFromServer(tweetsColl, {
      //toplam döküman sayısını hesaplama
      tweetsCount: count(),
    }).then((res) => setData(res.data()));
  }, []);
  return (
    <div className="max-lg:hidden p-3">
      <h2 className='flex items-center gap-2'>Toplam Gönderi Sayısı: {data ? data?.tweetsCount : <Spinner/>}</h2>
    </div>
  );
};

export default Aside;
