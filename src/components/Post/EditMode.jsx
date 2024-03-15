import { doc, updateDoc } from 'firebase/firestore';
import { useRef, useState } from 'react';
import { BiSolidSave } from 'react-icons/bi';
import { BsTrashFill } from 'react-icons/bs';
import { ImCancelCircle } from 'react-icons/im';
import { IoMdReturnLeft } from 'react-icons/io';
import { db } from '../../firebase/config';

const EditMode = ({ tweet, close }) => {
  const inputRef = useRef();

  const [isPicDeleting, setIsPicDeleting] = useState(false);

  //kaydet butonuna tıklanınca
  const handleSave = async () => {
    //1) input içeriğine eriş
    const newText = inputRef.current.value;

    //2) güncellenecek dökümanın referansını alma
    const tweetRef = doc(db, 'tweets', tweet.id);

    //3) dökümanın yazı içeriğini güncelle
    if (isPicDeleting) {
      //resim siliniyorsa resmi null'a çek
      await updateDoc(tweetRef, {
        textContent: newText,
        imageContent: null,
        isEdited: true,
      });
    } else {
      //resim silinmiyorsa sadece yazıyı güncelle
      await updateDoc(tweetRef, {
        textContent: newText,
        isEdited: true,
      });
    }

    //4) düzenleme modundan çık
    close();
  };
  return (
    <>
      <input
        defaultValue={tweet.textContent}
        ref={inputRef}
        className="rounded p-1 px-2 text-black"
        type="text"
      />
      <button
        onClick={handleSave}
        className="mx-5 p-2 text-green-600 rounded-full shadow hover:shadow-green-500 "
      >
        <BiSolidSave />
      </button>

      <button onClick={close}>
        <ImCancelCircle />
      </button>

      {tweet.imageContent && (
        <div className="relative">
          <img
            className={` ${
              isPicDeleting ? 'blur' : ''
            } my-2 rounded-lg w-full object-cover max-h-[400px]`}
            src={tweet.imageContent}
          />
          <button
            onClick={() => setIsPicDeleting(!isPicDeleting)}
            className="absolute top-0 right-0 text-xl p-2 bg-white transition text-red-500 hover:scale-90 rounded-full"
          >
            {isPicDeleting ? <IoMdReturnLeft /> : <BsTrashFill />}
          </button>
        </div>
      )}
    </>
  );
};

export default EditMode;
