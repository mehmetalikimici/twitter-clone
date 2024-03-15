import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { BsCardImage } from 'react-icons/bs';
import { db, storage } from '../firebase/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { toast } from 'react-toastify';
import Spinner from './Spinner'
import { useState } from 'react';

const Form = ({ user }) => {
  const [isLoading,setIsLoading] = useState(false)


  const tweetsCol = collection(db, 'tweets');
  // dosya eğer resim ise resmi storage'a yükle
  // resmin url'ini fonksiyonun çağırıldığı yere döndür
  const uploadImage = async (file) => {
    //1) dosya resim değil ise fonksiyonu durdur
    if (!file || !file.type.startsWith('image')) return null;
    //2) dosyanın yükeleneceği yerin referansını oluştur
    //aynı isimde dosya yüklendiğinde eski olanın üzerine yazdığı için
    //uniq id ile birliklte dosya adını değiştir
    const fileRef = ref(storage, v4() + file.name);
    //3) referansını oluşturduğumuz yere dosyayı yükle
    await uploadBytes(fileRef, file);
    //4) yüklenen dosyanın url'ine eriş
    return await getDownloadURL(fileRef)
  };

  //formun gönderilmesi
  const handleSubmit = async (e) => {
    //tweet koleksiyonunun referansını al

    e.preventDefault();

    //inputlardaki verilere eriş
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    //yazı veya resim içeriği yoksa uyarı ver
    if(!textContent && !imageContent) return toast.info('Lütfen içerik giriniz.')

    setIsLoading(true);

    //resmi yükle
    const url = await uploadImage(imageContent);

    //tweet koleksiyonuna yeni döküman ekle
    await addDoc(tweetsCol, {
      textContent,
      imageContent:url,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        image: user.photoURL,
      },
      likes: [],
      isEdited: false,
    });

    //formu sıfırla
    e.target.reset();
    //yüklenmeyi sonlandır
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b-[1px] border-gray-700"
    >
      <img
        className="h-[35px] md:h-[45px] mt-1 rounded-full"
        src={user?.photoURL}
        alt="profile-pic"
      />
      <div className="w-full">
        <input
          type="text"
          className="w-full bg-transparent my-2 outline-none md:text-lg"
          placeholder="Neler Oluyor?"
        />
        <div className="flex justify-between items-center">
          <label
            htmlFor="image-input"
            className="hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full"
          >
            <BsCardImage />
          </label>

          <input className="hidden" type="file" id="image-input" />
          <button disabled={isLoading} className="bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800">
            {isLoading ? <Spinner/> : 'Tweetle'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
