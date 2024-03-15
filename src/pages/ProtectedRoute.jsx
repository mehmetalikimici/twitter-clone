import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../firebase/config';

const ProtectedRoute = () => {
  //kullanıcının yetkisi var mı
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    //anlık olarak kullanıcının oturumunu izle
    //herhangi bir değişimde state'i güncelle
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });

    //kullanıcı sayfadan ayrılırsa izleyicisi kaldır
    return () => unsub();
  }, []);

  //eğer yetkisi yoksa:
  if (isAuth === false) {
    return <Navigate to={'/'} />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
