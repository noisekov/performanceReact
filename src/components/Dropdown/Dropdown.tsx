import { ChangeEvent, FC } from 'react';
import { Idata } from '../../apiData/apiData';
import { IAction } from '../../page/Home/Home';

const Dropdown: FC<{
  className?: string;
  state: Idata[];
  dispatch: React.ActionDispatch<[action: IAction]>;
}> = ({ state, dispatch, className }) => {
  const [...regions] = new Set(state.map((elem) => elem.region));

  const handleSelectedOption = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'region', value: event.target.value });
  };

  return (
    <div className={className}>
      <select
        onChange={handleSelectedOption}
        className="text-black bg-white"
        name="region"
        id="region"
      >
        <option value="">select region</option>
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
