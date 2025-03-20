import { ChangeEvent, FC } from 'react';
import { Idata } from '../../apiData/apiData';
import { IAction } from '../../page/Home/Home';

const Dropdown: FC<{
  state: Idata[];
  dispatch: React.ActionDispatch<[action: IAction]>;
}> = ({ state, dispatch }) => {
  const [...regions] = new Set(state.map((elem) => elem.region));

  const handleSelectedOption = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'regionsChange', value: event.target.value });
  };

  return (
    <div className="inline-block ml-2">
      <select
        onChange={handleSelectedOption}
        className="text-black bg-white"
        name="region"
        id="region"
      >
        <option value="defaultValue">select region</option>
        {regions.map((region, index) => (
          <option key={index} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
