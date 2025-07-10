import { useContext, useEffect, useState } from "react";
import UserListCard from "./UserListCard";
import { Context } from "../../Context/Context";

const UserList = () => {
  const { getUsers } = useContext(Context);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        const users = res?.data?.data;
        setUserList(Array.isArray(users) ? users : []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setUserList([]);
      }
    };

    fetchUsers();
  }, [getUsers]);

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto hide-scrollbar scroll-smooth p-1">
      {Array.isArray(userList) && userList.length > 0 ? (
        userList.map((user, index) => (
          <UserListCard key={index} data={user} />
        ))
      ) : (
        <div className="text-center text-gray-500 p-4">
          No users found.
        </div>
      )}
    </div>
  );
};

export default UserList;
