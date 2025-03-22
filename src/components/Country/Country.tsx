import { FC } from 'react';
import { Idata } from '../../apiData/apiData';

const Country: FC<{ elem: Idata }> = ({ elem }) => {
  return (
    <>
      <td className="text-left border-1 border-sky-600 p-2">
        {elem.name.official}
      </td>
      <td className="text-center border-1 border-sky-600 p-2">
        {elem.population}
      </td>
      <td className="text-center border-1 border-sky-600 p-2">{elem.region}</td>
      <td className="text-center border-1 border-sky-600 p-2">
        <img
          src={elem.flags.png}
          alt={elem.flags.alt}
          width="100%"
          height="100%"
        />
      </td>
    </>
  );
};

export default Country;
