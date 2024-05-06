import img from "../assets/mockimg.png";
import { IAnimal } from "../types";

interface CardProps {
  animal: IAnimal,
}

export const AnimalCard: React.FC<CardProps> = ({animal}) => {
  const server_url = "http://localhost:8000";
  const imageUrl = `${server_url}${animal.url}`;
  return (
    <div className="p-2 rounded-lg border-2">
      <img src={imageUrl} alt="Animal Image" className="w-48 border-2 rounded-lg" />
      <div className="flex justify-around">
        <p>{animal.type.toUpperCase()}</p>
        <p>{animal.fetchtime.toFixed(2)}s</p>
      </div>
    </div>
  );
};
