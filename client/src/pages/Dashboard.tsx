import { useState, useEffect } from "react";
import { AnimalCard, LoadingSpinner } from "../components";
import { withMainlayout } from "../layout";
import axios from "axios";
import { IAnimal, IAnimalInfoResponse } from "../types";
import { toast } from "react-toastify";

export const Dashboard: React.FC = withMainlayout(() => {
  const [curIndex, setCurIndex] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  const [countdown, setCountDown] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const updateAnimals = (animal: IAnimal) => {
    if (curIndex == animals.length) {
      const prevAnimals: IAnimal[] = animals.map((item) => ({...item, isnew: false}));
      setAnimals((prev) => [...prevAnimals, animal]);
    } else {
      setAnimals((prev) =>
        prev.map((item, index) => (index == curIndex ? animal : {...item, isnew: false}))
      );
    }
    setCurIndex((prev) => (prev + 1) % 10);
  };

  const fetchData = async () => {
    setIsFetching(true);
    const server_url = process.env.REACT_APP_SERVER_URL || "http://localhost:8000";
    const fetch_url = `${server_url}/fetchimgs`;
    try {
      const animalRes = await axios.get<IAnimalInfoResponse>(fetch_url);

      updateAnimals({
        url: animalRes.data.url,
        type: animalRes.data.type,
        fetchtime: animalRes.data.fetch_time,
        isnew: true,
      });

      setTotalCount((prev) => prev + 1);
    } catch (err) {
      toast.error("Failed to fetch animal Data.\nTry again later.");
    };

    setIsFetching(false);
    setCountDown(60);
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
    <>
      <div
        className={`flex-col w-full justify-center p-12  ${
          isFetching ? "blur" : ""
        }`}
      >
        <div className="flex px-48 py-8 gap-20 justify-end">
          <p className="text-black text-xl">Next Fetch: {countdown}</p>
          <p className="text-black text-xl">Total Fetching: {totalCount}</p>
        </div>
        <div className="grid grid-cols-5 justify-between gap-5 tablet:grid-cols-3 mobile:grid-cols-1 px-24">
          {animals.map((animal) => (
            <AnimalCard animal={animal} />
          ))}
        </div>
      </div>
      {isFetching && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
});
