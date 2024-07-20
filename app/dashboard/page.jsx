'use client';
import MenuButton from "@/components/buttons/MenuButton";
import { resetAuth } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAuthSelector } from "@/redux/slices/authSlice";
import { useEffect, useState } from "react";
import { SUPER_ADMIN } from "@/constants/constants";
import allMenu from "@/constants/menus";

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useAuthSelector();
  const [displayMenu, setDisplayMenu] = useState([])

  const handleLogout = () => {
    dispatch(resetAuth());
    router.push('/');
  }

  useEffect(() => {
    if(user?.userDetail?.userLevel && user?.userDetail?.userLevel !== SUPER_ADMIN) {
      setDisplayMenu(() => allMenu.filter(({id}) => user?.userDetail?.permissions.includes(id) ))
    }
  }, [router, user])
  

  return (
    <div className="grid-flow-col mx-auto px-16 pt-20">
      <p className="text-5xl lg:text-6xl font-bold">
        MAIN MENU
      </p>
      <div className="grid grid-flow-row grid-cols-4 my-20 gap-10">
        { displayMenu.map(({id, urlPath, imagePath, buttonText}) => (
            <MenuButton
              key={id}
              urlPath={urlPath}
              imagePath={imagePath}
              buttonText={buttonText}
            />
          ))
        }
        <MenuButton
          urlPath={'/logout'}
          imagePath={'/images/logout-btn.svg'}
          buttonText={'logout'}
          isLink={false}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Dashboard;
