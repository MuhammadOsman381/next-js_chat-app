import Link from "next/link";
import logo from "../assets/WhatsApp Image 2024-08-13 at 2.19.02 AM.jpeg";
import Image from "next/image";
const Nav = () => {
  

  return (
    <header className="mt-0  mx-auto w-full  border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-2  ">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src={logo}
                  width={40}
                  height={40}
                  className="mix-blend-multiply object-cover"
                  alt="Picture of the author"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
