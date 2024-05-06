import newBadgeImg from "../assets/new.png";
import { IAnimal } from "../types";

interface CardProps {
  animal: IAnimal;
}

interface InfoSpanProps {
  type: string;
  fetchtime: number;
}

const InfoSpan: React.FC<InfoSpanProps> = ({ type, fetchtime }) => {
  return (
    <div className="flex justify-around p-2">
      <div className="flex items-center">
        <p className="">type:</p>
        <p className="text-xl font-bold text-black px-3">
          {type.toUpperCase()}
        </p>
      </div>
      <div className="flex items-end">
        <p className="text-xs text-black">{fetchtime.toFixed(2)}s</p>
      </div>
    </div>
  );
};

export const AnimalCard: React.FC<CardProps> = ({ animal }) => {
  const server_url = "http://localhost:8000";
  const imageUrl = `${server_url}${animal.url}`;
  return (
    <div className="flex flex-col p-2 rounded-lg border-2">
      <div className="flex rounded-lg justify-center relative">
        <div className="relative">
          <img src={imageUrl} alt="Animal Image" className="w-48" />
          {animal.isnew && (
            <img className="absolute top-0 left-0" src={newBadgeImg} />
          )}
        </div>
      </div>
      <InfoSpan type={animal.type} fetchtime={animal.fetchtime} />
    </div>
  );
};
