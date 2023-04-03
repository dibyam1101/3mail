import styles from "../style";
import  arrowUp  from "../../public/assets/arrow-up.svg";
import Link from "next/link";
import Image from 'next/image'

const GetStarted = () => (
  <Link href="/get-started">
    <div
      className={`flex justify-center items-center w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}
    >
      <div
        className={`flex justify-center items-center flex-col bg-primary w-[100%] h-[100%] rounded-full`}
      >
        <div className={`flex justify-center items-start flex-row`}>
          <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
            <span className="text-gradient">Get</span>
          </p>
          <Image
            src={arrowUp}
            alt="arrow-up"
            className="w-[23px] h-[23px] object-contain"
          />
        </div>

        <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
          <span className="text-gradient">Started</span>
        </p>
      </div>
    </div>
  </Link>
);

export default GetStarted;
