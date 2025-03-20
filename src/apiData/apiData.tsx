export interface Idata {
  name: {
    official: string;
  };
  population: number;
  region: string;
  flags: {
    png: string;
    alt: string;
  };
}

const getData = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const data: Promise<Idata[]> = await response.json();

  return data;
};

export default getData;
