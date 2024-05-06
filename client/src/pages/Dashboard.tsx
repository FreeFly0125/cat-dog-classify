import { useState, useEffect } from "react";
import { AnimalCard } from "../components";
import { withMainlayout } from "../layout";
import axios from "axios";
import { IAnimal, IAnimalInfoResponse } from "../types";
import { url } from "inspector";

export const Dashboard: React.FC = withMainlayout(() => {
  const [curIndex, setCurIndex] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  const [countdown, setCountDown] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const updateAnimals = (animal: IAnimal) => {
    if (curIndex == animals.length) {
      setAnimals((prev) => [...prev, animal]);
    } else {
      setAnimals((prev) =>
        prev.map((item, index) => (index == curIndex ? animal : item))
      );
    }
    setCurIndex((prev) => (prev + 1) % 10);
  };

  const fetchData = async () => {
    setIsFetching(true);
    const animalRes = await axios.get<IAnimalInfoResponse>(
      "http://localhost:8000/fetchimgs"
    );

    updateAnimals({
      url: animalRes.data.url,
      type: animalRes.data.type,
      fetchtime: animalRes.data.fetch_time,
    });

    setIsFetching(false);
    setTotalCount((prev) => prev + 1);
    setCountDown(60 - Math.floor(animalRes.data.fetch_time));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (countdown == 0) {
        fetchData();
      }
      setCountDown((prev) => (prev == 0 ? 60 : prev - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdown]);

  return (
    <div className="flex-col w-full justify-center p-12">
      <div className="flex px-48 py-8 gap-20 justify-end">
        <p className="text-black text-xl">Next Fetch: {countdown}</p>
        <p className="text-black text-xl">Total Fetching: {totalCount}</p>
      </div>
      <div className="relative">
        <div className={`grid grid-cols-5 justify-between gap-5 tablet:grid-cols-3 mobile:grid-cols-1 px-24 ${isFetching? 'blur' : ''}`}>
          {animals.map((animal) => (
            <AnimalCard animal={animal} />
          ))}
        </div>
        {isFetching && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <p className="text-3xl max-w-max">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
});
