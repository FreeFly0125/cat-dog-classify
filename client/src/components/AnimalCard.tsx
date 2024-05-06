import img from "../assets/mockimg.png";
import { IAnimal } from "../types";

interface CardProps {
  animal: IAnimal,
}

export const AnimalCard: React.FC<CardProps> = ({animal}) => {
  const server_url = "http://localhost:8000";
  const imageUrl = `${server_url}${animal.url}`;
  return (
    <div className="flex flex-col p-2 rounded-lg border-2">
      <div className="flex rounded-lg justify-center">
        <img src={imageUrl} alt="Animal Image" className="w-48" />
      </div>
      <div className="flex justify-around p-2">
        <p className="text-xl text-black">{animal.type.toUpperCase()}</p>
        <p className="text-xl text-black">{animal.fetchtime.toFixed(2)}s</p>
      </div>
    </div>
  );
};
