import { useEffect, useRef, useState } from "react";
import { userStory } from "./data/story";

export default function App() {
  const [currIndex, setCurrIndex] = useState(0);
  const [openStoryView, setOpenStoryView] = useState(false);
  const intervalRef = useRef(null);
  const [fadeKey, setFadeKey] = useState(0);
  useEffect(() => {
    if (intervalRef.current && currIndex == userStory.length - 1) {
      clearInterval(intervalRef.current);
    }
  }, [currIndex]);
  const handleStartIndex = (index) => {
    setFadeKey((prev) => prev + 1);
    setCurrIndex(index);
    setOpenStoryView(true);
    intervalRef.current = setInterval(() => {
      setCurrIndex((prev) => prev + 1);
      setFadeKey((prev) => prev + 1);
    }, 5000);
  };
  const handlePreviousStory = () => {
    if (currIndex != 0) {
      setFadeKey((prev) => prev + 1);
      setCurrIndex((prev) => prev - 1);
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrIndex((prev) => prev + 1);
        setFadeKey((prev) => prev + 1);
      }, 5000);
    } else {
      clearInterval(intervalRef.current);
    }
  };
  const handleNextStory = () => {
    if (currIndex != userStory.length - 1) {
      setFadeKey((prev) => prev + 1);
      setCurrIndex((prev) => prev + 1);
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrIndex((prev) => prev + 1);
        setFadeKey((prev) => prev + 1);
      }, 5000);
    } else {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-green-500 to-green-500 bg-clip-text text-transparent font-extrabold flex justify-center py-2 items-center text-xl">
        Cactrogram
      </div>
      <div className="hidden lg:flex justify-center  text-green-400 font-extrabold">
        Switch to Mobile Screen Mode for better experience.
      </div>
      <div className="lg:hidden w-full h-fit py-2 px-2 overflow-x-auto">
        <div className="flex space-x-4">
          {userStory.map((user, index) => (
            <div
              key={user.userId}
              className="shrink-0"
              onClick={() => handleStartIndex(index)}
            >
              <img
                src={user.userImage}
                alt="user_img"
                className="w-[90px] h-[90px] rounded-full object-cover border-4 border-pink-500"
              />
              <div className="text-[15px] font-bold text-[#313131] flex justify-center">
                {user.userName}
              </div>
            </div>
          ))}
        </div>
      </div>
      {openStoryView && (
        <div className="fixed top-0 left-0 w-full h-full">
          <div
            className="absolute left-0 top-0 h-full w-1/2 cursor-pointer"
            onClick={handlePreviousStory}
          ></div>
          <div
            className="absolute right-0 top-0 h-full w-1/2 cursor-pointer"
            onClick={handleNextStory}
          ></div>

          <div
            className="absolute right-2 top-2  font-extrabold text-white z-10 bg-gray-500 rounded-full px-2 py-2"
            onClick={(e) => {
              e.stopPropagation();
              setOpenStoryView(false);
              clearInterval(intervalRef.current);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="absolute top-0 left-2 flex">
            <div className="flex justify-center items-center py-2">
              <img
                key={fadeKey}
                src={userStory[currIndex].userImage}
                alt="user_img"
                className="w-[40px] h-[40px] rounded-full animate-fade-in"
              />
            </div>
            <div className="flex justify-center items-center font-bold text-[14px] px-1">
              {userStory[currIndex].userName}
            </div>
          </div>
          <img
            src={userStory[currIndex].storyImage}
            alt="story_img"
            className="w-full h-full"
          />
        </div>
      )}
    </>
  );
}
