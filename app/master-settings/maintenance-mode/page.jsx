import Image from "next/image";
import Link from "next/link";
import React from "react";

const MaintenanceMode = () => {
  return (
    <div className="grid-flow-col px-16 py-20">
      <div>
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold uppercase">
          master setting
        </h1>
        <h2 className="mt-4 text-inputBlack text-sm md:text-xl lg:text-3xl font-bold uppercase">
          maintenance mode
        </h2>
      </div>
      <Link href={'/master-settings'}>
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

export default MaintenanceMode;
