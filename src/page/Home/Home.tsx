import { useEffect, useReducer } from 'react';
import Dropdown from '../../components/Dropdown/Dropdown';
import getData, { Idata } from '../../apiData/apiData';

export interface IAction {
  type: string;
  payload?: Idata[];
  value?: string;
}

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

  if (action.type === 'regionsChange') {
    if (action.value === 'defaultValue') {
      return {
        originalState: state.originalState,
        filteredState: state.originalState,
      };
    }

    const newState = state.originalState.filter(
      (elem) => elem.region === action.value
    );

    return {
      originalState: state.originalState,
      filteredState: newState,
    };
  }
  throw new Error(`Unhandled action type: ${action.type}`);
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

  return (
    <table>
      <thead>
        <tr className="text-center bg-black">
          <td className="border-1 border-sky-600 w-1/3 p-2">Name</td>
          <td className="border-1 border-sky-600 w-1/3 p-2">Population</td>
          <td className="border-1 border-sky-600 w-1/3 p-2">
            Region
            <Dropdown state={state?.originalState || []} dispatch={dispatch} />
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
