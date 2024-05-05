import { useContext, useEffect, useState } from "react";
import { AnimalCard } from "../components";
import { withMainlayout } from "../layout";
import axios from "axios";
import { IAnimal, IAnimalInfoResponse } from "../types";

export const Dashboard: React.FC = withMainlayout(() => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);

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
