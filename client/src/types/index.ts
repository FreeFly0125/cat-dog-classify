export interface IAnimal {
  url: string;
  type: string;
  fetchtime: number;
  isnew: boolean;
}

export interface IAnimalInfoResponse {
  url: string;
  fetch_time: number;
  type: string;
  message: string;
}
