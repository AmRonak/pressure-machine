'use client';
import MenuButton from "@/components/buttons/MenuButton";
import { resetAuth } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(resetAuth());
    router.push('/login');
  }
  
  return (
    <div className="grid-flow-col mx-auto px-28 py-32">
      <p className="sm:text-4xl md:text-4xl lg:text-6xl font-bold">
        MAIN MENU
      </p>
      <div className="grid grid-flow-row grid-cols-4 my-20 gap-20 gap-y-36">
        <MenuButton
          urlPath={'/test-mode'}
          imagePath={'/images/test-mode-btn.svg'}
          buttonText={'Test Mode'}
        />
        <MenuButton
          urlPath={'/recipe'}
          imagePath={'/images/recipe-btn.svg'}
          buttonText={'recipe'}
        />
        <MenuButton
          urlPath={'/parameter-settings'}
          imagePath={'/images/parameter-setting-btn.svg'}
          buttonText={'set parameter'}
        />
        <MenuButton
          urlPath={'/user-creation'}
          imagePath={'/images/user-profile-btn.svg'}
          buttonText={'user profile'}
        />
        <MenuButton
          urlPath={'/reports'}
          imagePath={'/images/reports-btn.svg'}
          buttonText={'reports'}
        />
        <MenuButton
          urlPath={'/master-settings'}
          imagePath={'/images/master-setting-btn.svg'}
          buttonText={'master setting'}
        />
        <MenuButton
          urlPath={'/user-management'}
          imagePath={'/images/user-management-btn.svg'}
          buttonText={'user management'}
        />
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
