'use client'
import AxiosHCO from "@/components/axiosHOC/AxiosHCO";
import { toatsConfig } from "@/constants/toast";
import handleAxiosRequest from "@/util/handleRequest";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Permission = () => {
  const [permission, setPermission] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disableSaving, setDisableSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const { data } = await handleAxiosRequest({api: 'permissions'});
        setPermission(data)
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchUserData();
  }, []);

  const checkboxHandle = (event) => {
    const checkboxItem = event.target.id;
    const id = parseInt(checkboxItem.split('-')[0]);
    const userLevel = checkboxItem.split('-')[1];

    setPermission((oldPermission) => {
      const updatedPermission = oldPermission.map((item) => {
        if (item.id === id) {
          return { ...item, [userLevel]: !item[userLevel] };
        }
        return item;
      });
      return updatedPermission;
    });
  }

  const handleSave = async () => {
    setDisableSaving(true);
    try {
      // disable button while saving
      const { data } = await handleAxiosRequest({api: 'permissions', method: 'put', payloadData: permission});
      setIsLoading(false);
      setPermission(data);
      toast.success('Permissions saved successfully.', toatsConfig)
    } catch (error) {
      toast.error(error.response.data.message, toatsConfig)
    }
    setDisableSaving(false);
  }

  return (
    <div className="grid-flow-col mx-auto px-16 pt-20">
      <p className="text-5xl lg:text-6xl font-bold uppercase mb-20 text-wrap max-w-[500px] lg:max-w-[800px]">
        users permission
      </p>
      <AxiosHCO
        isError={isError}
        isLoading={isLoading}
        errorMessage={'There&rsquo;s an error saving permission, please try again later'}
      >
        <table className="font-thin w-full p-4 border-collapse border border-slate-500 my-24">
          <thead className="">
            <tr className="">
              <th className="border border-slate-600 p-2">PAGE NAME</th>
              <th className="border border-slate-600 p-2">OPERATOR</th>
              <th className="border border-slate-600 p-2">SUPERVISOR</th>
              <th className="border border-slate-600 p-2">MANAGER</th>
              <th className="border border-slate-600 p-2">ADMIN</th>
            </tr>
          </thead>
          <tbody className="">
              {permission.map(({id, module, administrator, manager, operator, supervisor}) => (
                <tr key={`user-${id}`} className="">
                  <th className="border border-slate-600 p-2 text-primaryDark">
                    {module}
                  </th>
                  <td className="border border-slate-600 p-2">
                    <div className="flex justify-center">
                      <input
                        id={`${id}-operator`}
                        type="checkbox"
                        checked={operator}
                        onChange={checkboxHandle}
                      />
                    </div>
                  </td>
                  <td className="border border-slate-600 p-2">
                    <div className="flex justify-center">
                      <input
                        id={`${id}-supervisor`}
                        type="checkbox"
                        checked={supervisor}
                        onChange={checkboxHandle}
                      />
                    </div>
                  </td>
                  <td className="border border-slate-600 p-2">
                    <div className="flex justify-center">
                      <input
                        id={`${id}-manager`}
                        type="checkbox"
                        checked={manager}
                        onChange={checkboxHandle}
                      />
                    </div>
                  </td>
                  <td className="border border-slate-600 p-2">
                    <div className="flex justify-center">
                      <input
                        id={`${id}-administrator`}
                        type="checkbox"
                        checked={administrator}
                        onChange={checkboxHandle}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </AxiosHCO>
      <div className="flex items-center gap-28  my-24">
        <button disabled={disableSaving} type="button" className={`flex flex-col items-center ${disableSaving && 'opacity-80'}`} onClick={handleSave}>
          <Image
            src={'/images/save-btn.svg'}
            width={130}
            height={130}
            alt={`save recipe button`}
          />
        </button>
        <button disabled={disableSaving}>
          <Link href={'/user-management'}>
            <Image
              src={"/images/back_button.svg"}
              width={100}
              height={100}
              alt="back button"
            />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Permission;
