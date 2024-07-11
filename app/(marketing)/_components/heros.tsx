import Image from "next/image";

export const Heros = () => {
  return (
    <div className="flex flex-col max-w-5xl mx-auto justify-center items-center">
      <div className="flex items-center">
        <div className="relative hidden md:block w-[400px] h-[400px] ">
          <Image src={"/notion-1-image.png"} alt="notion-image" fill />
        </div>
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] ">
          <Image src={"/notion-2-image.png"} alt="notion-image" fill />
        </div>
      </div>
    </div>
  );
};
