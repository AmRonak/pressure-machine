'use client';
import Navigation from "@/components/buttons/Navigation";
import Loading from "@/components/Loading";
import { toatsConfig } from "@/constants/toast";
import { useAuthSelector } from "@/redux/slices/authSlice";
import handleAxiosRequest from "@/util/handleRequest";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserList = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const user = useAuthSelector();
  const router = useRouter();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { data } = await handleAxiosRequest({
          api: 'users'
        });
        setUsers(data)
      } catch (error) {
        setIsError(error.message);
      }
    }
    fetchAllUsers();
    setIsLoading(false);
  }, [])

  const checkboxHandle = (user) => {
    setSelectedUsers((oldSelectedUsers) => (
      oldSelectedUsers.includes(user.id)
      ? oldSelectedUsers.filter(id => id !== user.id)
      : oldSelectedUsers.concat(user.id)
    ))
  };
  
  const handleBlockClick = async () => {
    try {
      const { data } = await handleAxiosRequest({
        api: 'users/block',
        method: 'post',
        payloadData: {
          ids: selectedUsers,
          action: 'block'
        }
      });
      toast.success(data.message, toatsConfig);
      setUsers((oldUsesrList) => oldUsesrList.map((user) => {
        if(data.ids.includes(user.id)) {
          user.active = false;
        }
        return user;
      }));
      setSelectedUsers([]);
    } catch (error) {
      toast.error(error.response.data.message, toatsConfig)
    }
  }

  const handleUnblockClick = async () => {
    try {
      const { data } = await handleAxiosRequest({
        api: 'users/block',
        method: 'post',
        payloadData: {
          ids: selectedUsers,
          action: 'unblock'
        }
      });
      toast.success(data.message, toatsConfig);
      setUsers((oldUsesrList) => oldUsesrList.map((user) => {
        if(data.ids.includes(user.id)) {
          user.active = true;
        }
        return user;
      }));
      setSelectedUsers([]);
    } catch (error) {
      toast.error(error.response.data.message, toatsConfig)
    }
  }

  const handleEditClick = () => {
    router.push(`/user-management/${encodeURIComponent(selectedUsers[0])}`)
    
  }

  const disableEdit = selectedUsers.length === 0 || selectedUsers.includes(user.userDetail.id);
  
  return (
    <div className="grid-flow-col mx-auto px-16 pt-10">
      <div className="flex justify-between items-center">
        <p className="text-5xl lg:text-6xl font-bold uppercase text-wrap max-w-[500px] lg:max-w-[800px]">
          user list
        </p>
        <Navigation />
      </div>
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
          disabled={disableEdit}
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
          disabled={disableEdit}
        >
          <Image
            src={'/images/unblock-btn.svg'}
            width={80}
            height={80}
            alt={`block button`}
          />
        </button>
      </div>
      { isLoading && <Loading /> }
      {
        isError && (
          <p className="p-5 m-5 text-center text-red-500">failed to load users list, please try sometimes later.</p>
        )
      }
      {
        !isError && !isLoading && (
          <table className="my-10 w-full p-4">
            <thead className="p-4">
              <tr className="grid grid-flow-col grid-cols-12 w-full gap-1">
                <th className="p-1"></th>
                <th className="text-start text-xl uppercase col-span-3 col-start-2">user name</th>
                <th className="text-start text-xl uppercase col-span-3 col-start-6">status</th>
                <th className="text-start text-xl uppercase col-span-3 col-start-9">user type</th>
              </tr>
            </thead>
            <tbody className="bg-white overflow-y-scroll" style={{height: "50vh"}}>
                {users.map((user) => (
                  <tr key={`user-${user.username}`} className="grid grid-flow-col grid-cols-12 gap-1">
                    <th>
                      <input
                        id={user.username}
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => checkboxHandle(user)}
                        className="bg-gray-600 border-green-500"
                      />
                    </th>
                    <td className="col-span-3 col-start-2">{user.username}</td>
                    <td className="col-span-3 col-start-6 ml-2">{user.active ? 'Active' : 'Blocked'}</td>
                    <td className="col-span-3 col-start-9 ml-3">{user.userLevel}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )
      }
      <div className="flex">
        <Link href={'/user-management'}>
          <Image
            src={"/images/back_button.svg"}
            width={100}
            height={100}
            alt="back button"
          />
        </Link>
      </div>
    </div>
  );
};

export default UserList;
