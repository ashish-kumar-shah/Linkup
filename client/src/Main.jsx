import React, { useContext } from "react";
import { Context } from "./Context/Context";
import logo from './logo.png'
import { Outlet } from "react-router-dom";
import Tabs from "./Component/Tabs";

const Main = () => {
  const { useIsMobile,User } = useContext(Context);
  const isMobile = useIsMobile();
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col ">
      <div className="top w-full h-[10vh]  shrink-0 flex bg-gray-100  pl-4 justify-between items-center ">
       <div className="logo h-20 w-20 rounded-full  bg-gren-200">
            <img src= {logo}
             alt="avtar"  className="w-20 h-20 rounded-full   object-scale-down translate-y-1.5 "/>
          </div>
        <div className="side-right flex justify-center items-center gap-1 pr-4">
          <div className="name p-2">
            <span className="text-lg font-semibold text-gray-600 ">
              {
   User?.user?.name
              }
            </span>
          </div>
          <div className="avtar h-14 w-14 border rounded-full">
            <img src= {User?.user?.avtar}
             alt="avtar"  className="w-14 h-14 rounded-full"/>
          </div>
        </div>
      </div>
      <div className="content h-[80vh] md:h-[90vh] flex w-full">
        {!isMobile && (
          <div className="side-bar h-full w-20 shrink-0 flex bg-gray-100 flex-col pt-4 p-2 ">
            <Tabs/>
          </div>
        )}

       
        <div className="content w-full h-full flex border bg-white rounded-xl">
        <Outlet/>
        </div>
      </div>
      {isMobile && (
        <div className="bottom w-full h-[10vh] border shrink-0 flex justify-evenly items-center ">
     <Tabs/>
        </div>
      )}
    </div>
  );
};

export default Main;
