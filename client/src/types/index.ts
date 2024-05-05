export interface IAnimal {
  url: string;
  type: string;
  fetchtime: number;
}

export interface IAnimalInfoResponse {
  url: string;
  fetch_time: number;
  type: string;
  message: string;
}
