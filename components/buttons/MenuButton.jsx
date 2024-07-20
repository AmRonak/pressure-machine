'use client';

import Image from "next/image";
import Link from "next/link";

const MenuButton = ({urlPath, imagePath,buttonText, isLink=true, onClick}) => {
  return (
    <div className="flex flex-col items-center">
      {isLink ? (
        <Link href={urlPath} >
          <Image
            src={imagePath}
            width={250}
            height={250}
            alt={`${buttonText} button`}
          />
          <p className="text-center text-xs lg:text-base xl:text-xl font-bold uppercase mt-6">
            {buttonText}
          </p>
        </Link>
      ) : (
        <button onClick={onClick}>
          <Image
            src={imagePath}
            width={250}
            height={250}
            alt={`${buttonText} button`}
          />
          <p className="text-center xs:text-xs lg:text-base xl:text-xl font-bold uppercase mt-6">
            {buttonText}
          </p>
        </button>
      )}
    </div>
  );
};

export default MenuButton;
