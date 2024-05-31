'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const usersProp = [
  { userName: "Alice123", userType: "ADMIN" },
  { userName: "Bob456", userType: "MANAGER" },
  { userName: "Charlie7", userType: "ADMIN" },
  { userName: "David890", userType: "MANAGER" },
  { userName: "Eve12345", userType: "ADMIN" },
  { userName: "Frank6789", userType: "MANAGER" },
  { userName: "Grace1234", userType: "ADMIN" },
  { userName: "Hank567", userType: "MANAGER" },
  { userName: "Ivy6789", userType: "ADMIN" },
  { userName: "Jack1234", userType: "MANAGER" },
  { userName: "Kara5678", userType: "ADMIN" },
  { userName: "Liam1234", userType: "MANAGER" },
  { userName: "Mia56789", userType: "ADMIN" },
  { userName: "Nina1234", userType: "MANAGER" },
  { userName: "Paul5678", userType: "MANAGER" },
  { userName: "Quinn1234", userType: "ADMIN" },
  { userName: "Rose5678", userType: "MANAGER" },
  { userName: "Sam12345", userType: "ADMIN" },
  { userName: "Tina6789", userType: "MANAGER" },
  { userName: "Uma123456", userType: "ADMIN" },
  { userName: "Vera6789", userType: "MANAGER" },
  { userName: "Will12345", userType: "ADMIN" },
  { userName: "Xena5678", userType: "MANAGER" },
  { userName: "Yara1234", userType: "ADMIN" },
  { userName: "Zane5678", userType: "MANAGER" },
  { userName: "Abby12345", userType: "ADMIN" },
  { userName: "Ben56789", userType: "MANAGER" },
  { userName: "Cara1234", userType: "ADMIN" },
  { userName: "Drew5678", userType: "MANAGER" }
];

const UserList = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const router = useRouter();

  const checkboxHandle = (user) => {
    setSelectedUsers((oldSelectedUsers) => (
      oldSelectedUsers.find(oldSelectedUser => oldSelectedUser.userName === user.userName)
      ? oldSelectedUsers.filter(oldSelectedUser => oldSelectedUser.userName !== user.userName )
      : oldSelectedUsers.concat(user)
    ))
  };

  console.log(selectedUsers);
  
  const handleBlockClick = () => {
    // /user-management/user-modification/${encodeURIComponent(selectedUsers[0].userName)}
  }

  const handleUnblockClick = () => {
    // /user-management/user-modification/${encodeURIComponent(selectedUsers[0].userName)}
  }

  const handleEditClick = () => {
    router.push(`/user-management/${encodeURIComponent(selectedUsers[0].userName)}`)
    // /user-management/user-modification/${encodeURIComponent(selectedUsers[0].userName)}
    
  }

  const disableEdit = selectedUsers.length === 1

  return (
    <div className="grid-flow-col mx-auto px-16 pt-20">
      <p className="text-5xl lg:text-6xl font-bold uppercase mb-20 text-wrap max-w-[500px] lg:max-w-[800px]">
        user list
      </p>
      <div className="flex gap-10 mt-10 p-4 bg-gradient-to-r from-slate-200 to-blue-100">
        <button
          className="flex flex-col items-center disabled:opacity-60"
          onClick={handleEditClick}
          disabled={selectedUsers.length !== 1}
        >
          <Image
            src={'/images/edit-btn.svg'}
            width={80}
            height={80}
            alt={`edit button`}
          />
        </button>
        <button
          className="flex flex-col items-center disabled:opacity-60"
          onClick={handleBlockClick}
          disabled={selectedUsers.length === 0}
        >
          <Image
            src={'/images/block-btn.svg'}
            width={80}
            height={80}
            alt={`block button`}
          />
        </button>
        <button
          className="flex flex-col items-center disabled:opacity-60"
          onClick={handleUnblockClick}
          disabled={selectedUsers.length === 0}
        >
          <Image
            src={'/images/unblock-btn.svg'}
            width={80}
            height={80}
            alt={`block button`}
          />
        </button>
      </div>
      <table className="my-10 w-full p-4">
        <thead className="p-4">
          <tr className="grid grid-flow-col grid-cols-12 w-full gap-1">
            <th className="p-1"></th>
            <th className="text-start text-xl uppercase col-span-5 col-start-2">user name</th>
            <th className="text-start text-xl uppercase col-span-5 col-start-7">user type</th>
          </tr>
        </thead>
        <tbody>
          <div className="bg-white overflow-y-scroll" style={{height: "50vh"}}>
            {usersProp.map((user) => (
              <tr key={`user-${user.userName}`} className="grid grid-flow-col grid-cols-12 gap-1">
                <th>
                  <input
                    id={user.userName}
                    type="checkbox"
                    checked={user.selected}
                    onChange={() => checkboxHandle(user)}
                    className="bg-gray-600 border-green-500"
                  />
                </th>
                <td className="col-span-5 col-start-2">{user.userName}</td>
                <td className="col-span-5 col-start-7">{user.userType}</td>
              </tr>
            ))}
          </div>
        </tbody>
      </table>
      <Link href={'/user-management/'}>
        <Image
          src={"/images/back_button.svg"}
          width={100}
          height={100}
          alt="back button"
        />
      </Link>
    </div>
  );
};

export default UserList;
