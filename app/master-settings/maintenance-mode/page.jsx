'use client'
import Image from "next/image";
import Link from "next/link";

const MaintenanceMode = () => {
  const handleImageClick = (d) => {
    console.log(d.target.id)
  }
  return (
    <div className="pt-20">
      <div className="px-16">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold uppercase">
          master setting
        </h1>
        <h2 className="mt-4 text-inputBlack text-sm md:text-xl lg:text-3xl font-bold uppercase">
          maintenance mode
        </h2>
      </div>
      <div className="flex justify-around my-28 mx-auto px-4">
        <div className="border-solid border-slate-900 w-44 lg:w-60 xl:w-80 h-36 border-4 border-opacity-25 border-b-0">
          <p
            className="relative bg-white text-inputBlack p-2 -top-4 left-[44px] lg:left-[60px] xl:left-[100px] inline lg:text-2xl font-semibold tracking-widest"
          >
            VALVE
          </p>
          <Image
            id="sv1"
            src={"/images/SV1.svg"}
            width={0}
            height={0}
            alt="back button"
            className="w-24 lg:w-32 xl:w-36 relative top-10 -left-12 lg:-left-16 xl:-left-[70px]"
            onClick={handleImageClick}
          />
          <Image
            id="sv2"
            src={"/images/SV2.svg"}
            width={0}
            height={0}
            alt="back button"
            className="w-24 lg:w-32 xl:w-36 relative -top-14 left-[7.5rem] lg:-top-[90px] xl:-top-[105px] lg:left-44 xl:left-60"
            onClick={handleImageClick}
          />
        </div>
        <div className="flex items-center">
          <div className="border-solid border-slate-900 w-36 lg:w-60 xl:w-80 h-36 border-4 border-opacity-25 border-r-0 border-b-0">
            <p
              className="relative bg-white text-inputBlack p-2 inline font-semibold tracking-widest -top-4 left-[95px] lg:left-[175px] xl:left-[254px] lg:text-2xl"
            >
              MOTOR
            </p>
            <Image
              id="m1"
              src={"/images/M1.svg"}
              width={0}
              height={0}
              alt="back button"
              className="w-24 lg:w-32 xl:w-36 relative top-10 -left-12 lg:-left-16 xl:-left-[70px]"
              onClick={handleImageClick}
            />
            <Image
              id="m2"
              src={"/images/M2.svg"}
              width={0}
              height={0}
              alt="back button"
              className="w-24 lg:w-32 xl:w-36 relative bottom-14 left-24 lg:bottom-[85px] xl:bottom-[100px] lg:left-44 xl:left-[250px]" //w-24 lg:w-32 xl:w-36 relative top-16 left-[90px] lg:bottom-[20px] xl:top-[70px] lg:left-44 xl:left-60
              onClick={handleImageClick}
            />
          </div>
          <div className="border-solid border-slate-900 w-36 lg:w-60 xl:w-80 h-36 border-4 border-opacity-25  border-b-0">
            <Image
              id="m3"
              src={"/images/M3.svg"}
              width={0}
              height={0}
              alt="back button"
              className="w-24 lg:w-32 xl:w-36 relative top-16 left-[90px] lg:top-[75px] xl:top-[70px] lg:left-44 xl:left-60"
              onClick={handleImageClick}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse px-40 mt-72">
        <Link href={'/master-settings'}>
          <Image
            src={"/images/back_button.svg"}
            width={125}
            height={125}
            alt="back button"
          />
        </Link>
      </div>
    </div>
  );
};

export default MaintenanceMode;
