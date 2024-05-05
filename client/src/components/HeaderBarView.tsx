import React from "react";

export const HeaderBarView: React.FC = () => {
  return (
    <div className="z-20 sticky top-0 w-full min-h-28 max-h-28 flex p-3 flex-row shadow-md shadow-black justify-between items-center xl:py-[1.375rem] bg-gradient-to-r from-[#644c4c] to-[#461b2a]">
      <div className="w-48 text-white text-2xl">Cats & Dogs</div>
    </div>
  );
};
