"use client";
import MenuButton from "@/components/buttons/MenuButton";
import { resetAuth } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAuthSelector } from "@/redux/slices/authSlice";
import { useEffect, useState } from "react";
import { SUPER_ADMIN } from "@/constants/constants";
import allMenu from "@/constants/menus";
import Navigation from "@/components/buttons/Navigation";
import handleAxiosRequest from "@/util/handleRequest";
import { useDevicesSelector } from "@/redux/slices/devices";
import { LOGGED_IN } from "@/constants/devicesStatus";
import LogoutConfirmModal from "@/components/modals/LogoutModal";

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useAuthSelector();
  const { devices } = useDevicesSelector();
  const [displayMenu, setDisplayMenu] = useState(allMenu);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    let foundLoggedInDevice = devices.find(
      (device) => device.status === LOGGED_IN
    );

    if (foundLoggedInDevice) {
      setIsModalOpen(true);
    } else {
      await logoutAction();
    }
  };

  const logoutAction = async () => {
    try {
      if (user?.userDetail?.userLevel !== SUPER_ADMIN) {
        await handleAxiosRequest({
          api: `auditLog/`,
          method: "post",
          payloadData: {
            log: `${user.userDetail.username} Logged out from System ${user.userDetail.systemSerialNumber}`,
            oldValue: null,
            newValue: null,
            category: "General",
            comment: "User Logged out from System",
          },
        });
      }
      dispatch(resetAuth());
      if (isModalOpen) {
        setIsModalOpen(false);
      }
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (
      user?.userDetail?.userLevel &&
      user?.userDetail?.userLevel !== SUPER_ADMIN
    ) {
      setDisplayMenu(() =>
        allMenu.filter(({ id }) => user?.userDetail?.permissions.includes(id))
      );
    }
  }, [router, user]);

  return (
    <div className="grid-flow-col mx-auto px-16 pt-10">
      <div className="flex justify-between items-center">
        <p className="text-5xl lg:text-6xl font-bold">MAIN MENU</p>
        <Navigation />
      </div>
      <div className="grid grid-flow-row grid-cols-4 mb-10 mt-5 gap-10">
        {displayMenu.map(({ id, urlPath, imagePath, buttonText }) => (
          <MenuButton
            key={id}
            urlPath={urlPath}
            imagePath={imagePath}
            buttonText={buttonText}
          />
        ))}
        <MenuButton
          urlPath={"/logout"}
          imagePath={"/images/logout-btn.svg"}
          buttonText={"logout"}
          isLink={false}
          onClick={handleLogout}
        />
      </div>

      <LogoutConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogout={logoutAction}
      />
    </div>
  );
};

export default Dashboard;
