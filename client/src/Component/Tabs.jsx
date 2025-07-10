import React from 'react'
import { useNavigate } from 'react-router-dom'

const Tabs = () => {
    const navigate = useNavigate()
    const tab = [


        {
            name:"home",
            url:"/"

        }
        ,{
            name:'settings'
           , url:'/setting'
        }
    ]
  return (
  tab.map((t,i)=>{
    return(
         <div  key={i} className="border    bg-white shadow-lg rounded-xl flex justify-center items-center w-16 h-16 mb-1 cursor-pointer"   onClick={()=>{
            navigate(t.url)
         }}>
    <span className='material-symbols-outlined' style={{fontSize:'32px'}}>
        {t.name}
    </span>
   </div>
    )
  })
  )
}

export default Tabs