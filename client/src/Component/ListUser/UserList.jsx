import { useContext, useEffect, useState } from "react";
import UserListCard from "./UserListCard";
import { Context } from "../../Context/Context";

const UserList = () => {
  const { getUsers } = useContext(Context);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getUsers()
      .then((res) => {
       
        setUserList(res.data.data);
      })
      .catch((err) => {
        setUserList([]);
      
      });
  }, []);

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto hide-scrollbar scroll-smooth p-1">
      {userList.length > 0 &&
        userList.map((e, i) => (
          <UserListCard key={i} data={e}  /> // ✅
        ))}
    </div>
  );
};

export default UserList;
