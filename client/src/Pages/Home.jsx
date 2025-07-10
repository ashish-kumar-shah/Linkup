import React, { useContext } from 'react'
import UserList from '../Component/ListUser/UserList'
import Chat from './Chat'
import { Context } from '../Context/Context'

const Home = () => {
  const {useIsMobile} = useContext(Context)
  const isMonile = useIsMobile()
  return (
<div className="w-full h-full flex  shrink-0">
  <div className="h-full  w-full md:w-fit border-r shrink-0 flex bg-white md:rounded-tl-xl">
  <UserList/>
  </div>
  {
    !isMonile && (
  <div className="cntent-of-page w-full h-full flex bg-gray-300">
    <Chat/>
  </div>
    )

  }

</div>  )
}

export default Home