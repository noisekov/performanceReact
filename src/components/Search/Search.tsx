import { FC } from 'react';
import { IAction } from '../../page/Home/Home';

const Search: FC<{
  className?: string;
  dispatch: React.ActionDispatch<[action: IAction]>;
}> = ({ dispatch, className }) => {
  function debounce<T>(func: (arg: T) => unknown, time: number) {
    let timeout: number;

    return function (this: unknown, arg: T) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, [arg]), time);
    };
  }

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'searchChange', value: event.target.value });
    },
    500
  );

  return (
    <div className={className}>
      <input
        onInput={handleSearch}
        className="border-1 rounded-xl p-1 border-white-600"
        type="search"
        placeholder="Search name"
      />
    </div>
  );
};

export default Search;
