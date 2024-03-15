import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/config"
import Aside from "../components/Aside"
import Main from "../components/Main"
import Nav from "../components/Nav"
import { useEffect, useState } from "react"

const FeedPage = () => {
  const [user,setUser] = useState(null)

  //kullanıcı bilgisine abone ol
  useEffect(() => {
    //kullanıcı oturumunu izle 
    const unsub = onAuthStateChanged(auth,(currentUser)=> {setUser(currentUser)})

    //sayfadan ayrılırsa izlemeyi sonlandır
    return () => unsub()
  },[])

  return (
    <div className="feed h-screen bg-black overflow-hidden">
      <Nav user={user}/>
      <Main user={user}/>
      <Aside user={user}/>
    </div>
  )
}

export default FeedPage