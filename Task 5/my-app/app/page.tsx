import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white w-full h-full">
      <div className="flex flex-col gap-2 ">
        <label htmlFor="message">Message: </label>
        <input type="text" id="message" />
      </div>
    </div>
  );
}
