'use client';

import Image from "next/image";
import Link from "next/link";

const MenuButton = ({urlPath, imagePath,buttonText, isLink=true, onClick}) => {
  return (
    isLink ? (
      <Link href={urlPath} className="flex flex-col items-center">
        <Image
          src={imagePath}
          width={250}
          height={250}
          alt={`${buttonText} button`}
        />
        <p className="xs:text-xs md:text-xs lg:text-xl font-bold uppercase">
          {buttonText}
        </p>
      </Link>
    ) : (
      <button onClick={onClick} href={urlPath} className="flex flex-col items-center">
        <Image
          src={imagePath}
          width={250}
          height={250}
          alt={`${buttonText} button`}
        />
        <p className="xs:text-xs md:text-xs lg:text-xl font-bold uppercase">
          {buttonText}
        </p>
      </button>
    )
  );
};

export default MenuButton;
