/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const BlinkitLoader = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute inset-0 bg-[#FFD500] rounded-full animate-ping"></div>
        <div className="relative w-20 h-20 bg-[#FFD500] rounded-full flex items-center justify-center">
          <span className="text-black text-xl font-bold">Blinkit</span>
        </div>
      </div>
    </div>
  );
};

export default BlinkitLoader;