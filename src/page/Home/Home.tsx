import { useEffect, useState } from 'react';

interface Idata {
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
const Home = () => {
  const [data, setData] = useState<Idata[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data: Idata[] = await response.json();
    setData(data);
    console.log(data);
  };

  return (
    <table>
      <thead></thead>
      <tbody>
        <tr className="text-center bg-black">
          <td className="border-1 border-sky-600 w-1/3 p-2">Name</td>
          <td className="border-1 border-sky-600 w-1/3 p-2">Population</td>
          <td className="border-1 border-sky-600 w-1/3 p-2">Region</td>
          <td className="border-1 border-sky-600 p-2">Flag</td>
        </tr>
        {data.map((elem, index) => (
          <tr key={index}>
            <td className="text-left border-1 border-sky-600 p-2">
              {elem.name.official}
            </td>
            <td className="text-center border-1 border-sky-600 p-2">
              {elem.population}
            </td>
            <td className="text-center border-1 border-sky-600 p-2">
              {elem.region}
            </td>
            <td className="text-center border-1 border-sky-600 p-2">
              <img
                src={elem.flags.png}
                alt={elem.flags.alt}
                width="100%"
                height="100%"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Home;
