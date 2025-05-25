import { useEffect } from "react";

const Progess = ({ width, setWidth, widthIntervalRef }) => {
  useEffect(() => {
    if (!widthIntervalRef.current && width == 0) {
      widthIntervalRef.current = setInterval(() => {
        setWidth((prev) => prev + 25);
      }, 1000);
    }
  }, [width, setWidth, widthIntervalRef]);
  useEffect(() => {
    if (width === 125) {
      clearInterval(widthIntervalRef.current);
      widthIntervalRef.current = null;
      setWidth(0);
    }
  }, [width, setWidth, widthIntervalRef]);

  return (
    <div className="w-full h-[5px] ">
      <div
        style={{ width: `${width}%` }}
        className="h-full bg-gradient-to-r from-red-700 to-red-500 transition-all duration-300"
      ></div>
    </div>
  );
};

export default Progess;
