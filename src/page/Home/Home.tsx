import { useEffect, useReducer, useState } from 'react';
import Dropdown from '../../components/Dropdown/Dropdown';
import getData, { Idata } from '../../apiData/apiData';
import Search from '../../components/Search/Search';

export interface IAction {
  type: string;
  payload?: Idata[];
  value?: string;
}
const chandedState = { sortName: '', sortRegion: '' };

function reducer(
  state: { originalState: Idata[]; filteredState: Idata[] },
  action: IAction
): { originalState: Idata[]; filteredState: Idata[] } {
  if (action.type === 'initialState') {
    return {
      originalState: action.payload ?? [],
      filteredState: action.payload ?? [],
    };
  }

  if (action.type === 'name') {
    chandedState.sortName = action.value?.toLowerCase() || '';
  }

  if (action.type === 'region') {
    chandedState.sortRegion = action.value?.toLowerCase() || '';
  }

  const newState = state.originalState.filter((elem) => {
    if (chandedState.sortName && !chandedState.sortRegion) {
      return elem.name.official.toLowerCase().includes(chandedState.sortName);
    }

    if (!chandedState.sortName && chandedState.sortRegion) {
      return elem.region.toLowerCase() === chandedState.sortRegion;
    }

    if (!chandedState.sortName && !chandedState.sortRegion) {
      return true;
    }

    return (
      elem.region.toLowerCase() === chandedState.sortRegion &&
      elem.name.official.toLowerCase().includes(chandedState.sortName)
    );
  });

  if (action.type === 'sort') {
    if (action.value === 'asc') {
      newState.sort((a, b) => b.population - a.population);
    }

    if (action.value === 'desc') {
      newState.sort((a, b) => a.population - b.population);
    }
  }

  return {
    originalState: state.originalState,
    filteredState: newState,
  };
}

const Home = () => {
  const [state, dispatch] = useReducer(reducer, {
    originalState: [
      {
        name: {
          official: '',
        },
        population: 0,
        region: '',
        flags: {
          png: 'png',
          alt: '',
        },
      },
    ],
    filteredState: [
      {
        name: {
          official: '',
        },
        population: 0,
        region: '',
        flags: {
          png: 'png',
          alt: '',
        },
      },
    ],
  });

  useEffect(() => {
    (async function () {
      dispatch({ type: 'initialState', payload: await getData() });
    })();
  }, []);

  const sortHandler = () => {
    setArrow(!arrow);
    dispatch({ type: 'sort', value: arrow ? 'desc' : 'asc' });
  };
  const [arrow, setArrow] = useState(false);

  return (
    <table>
      <thead>
        <tr className="text-center bg-black">
          <td className="border-1 border-sky-600 w-1/3 p-2">
            Name
            <Search className="inline-block ml-2" dispatch={dispatch} />
          </td>
          <td className="border-1 border-sky-600 w-1/3 p-2">
            <span className="cursor-pointer" onClick={sortHandler}>
              Population
              <span className={'inline-block ' + (arrow ? '' : 'rotate-180')}>
                🔼
              </span>
            </span>
          </td>
          <td className="border-1 border-sky-600 w-1/3 p-2">
            Region
            <Dropdown
              className="inline-block ml-2"
              state={state?.originalState || []}
              dispatch={dispatch}
            />
          </td>
          <td className="border-1 border-sky-600 p-2">Flag</td>
        </tr>
      </thead>
      <tbody>
        {state?.filteredState.map((elem, index) => (
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
