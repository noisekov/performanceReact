import { useEffect, useReducer, useState } from 'react';
import Dropdown from '../../components/Dropdown/Dropdown';
import getData, { Idata } from '../../apiData/apiData';
import Search from '../../components/Search/Search';
import Country from '../../components/Country/Country';

export interface IAction {
  type: string;
  payload?: Idata[];
  value?: string;
}
const chandedState = { filterName: '', filterRegion: '', sort: '' };

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
    chandedState.filterName = action.value?.toLowerCase() || '';
  }

  if (action.type === 'region') {
    chandedState.filterRegion = action.value?.toLowerCase() || '';
  }

  const newState = state.originalState.filter((elem) => {
    if (chandedState.filterName && !chandedState.filterRegion) {
      return elem.name.official.toLowerCase().includes(chandedState.filterName);
    }

    if (!chandedState.filterName && chandedState.filterRegion) {
      return elem.region.toLowerCase() === chandedState.filterRegion;
    }

    if (!chandedState.filterName && !chandedState.filterRegion) {
      return true;
    }

    return (
      elem.region.toLowerCase() === chandedState.filterRegion &&
      elem.name.official.toLowerCase().includes(chandedState.filterName)
    );
  });

  if (action.type === 'sort') {
    if (action.value === 'asc') {
      chandedState.sort = 'asc';
    }

    if (action.value === 'desc') {
      chandedState.sort = 'desc';
    }
  }

  newState.sort((a, b) => {
    if (chandedState.sort === 'desc') {
      return a.population - b.population;
    }

    if (chandedState.sort === 'asc') {
      return b.population - a.population;
    }

    return 0;
  });

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
            <Country elem={elem} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Home;
