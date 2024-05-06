import { useContext, useEffect } from "react";
import { AnimalCard } from "../components";
import { withMainlayout } from "../layout";
import { MainContext } from "../context";
import axios from "axios";
import { IAnimalInfoResponse } from "../types";

export const Dashboard: React.FC = withMainlayout(() => {
  const { animals, updateAnimals } =
    useContext(MainContext);

  return (
    <div className="flex w-full justify-center pt-24">
      <div className="grid grid-cols-5 justify-between gap-5 tablet:grid-cols-3 mobile:grid-cols-1">
        {animals.map((animal) => (
          <AnimalCard animal={animal} />
        ))}
      </div>
    </div>
  );
});
