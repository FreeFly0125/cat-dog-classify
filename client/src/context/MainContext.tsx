import React, { useState } from "react";
import { IAnimal } from "../types";

interface ProviderProps {
  children: React.ReactNode;
}

interface ContextProps {
  curIndex: number;
  animals: IAnimal[];
  updateAnimals: (animal: IAnimal) => void;
}

export const MainContext = React.createContext<ContextProps>({
  curIndex: 0,
  animals: [],
  updateAnimals: () => {},
});

export const MainProvider: React.FC<ProviderProps> = ({ children }) => {
  const [curIndex, setCurIndex] = useState<number>(0);
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  const updateAnimals = (animal: IAnimal) => {
    if (curIndex == animals.length) {
      setAnimals((prev) => [...prev, animal]);
    } else {
      setAnimals((prev) => prev.map((item, index) =>
        index == curIndex ? animal : item
      ));
    }
    setCurIndex((prev) => ((prev + 1) % 10));
  };

  return (
    <MainContext.Provider
      value={{
        curIndex,
        animals,
        updateAnimals,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
