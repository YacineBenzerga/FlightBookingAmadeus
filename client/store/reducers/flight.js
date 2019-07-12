import axios from 'axios';

const GOT_DEP_FLIGHTS = 'GOT_DEP_FLIGHTS';
const GOT_RET_FLIGHTS = 'GOT_RET_FLIGHTS';
const SELECTED_FLIGHT = 'SELECTED_FLIGHT';
const FETCHING_FLIGHTS = 'FETCHING_FLIGHTS';
const FILTEREDFLIGHTS = 'FILTEREDFLIGHTS';

const gotDepFlights = flights => ({
  type: GOT_DEP_FLIGHTS,
  flights
});

const gotRetFlights = flights => ({
  type: GOT_RET_FLIGHTS,
  flights
});

export const selectedFlight = flight => ({
  type: SELECTED_FLIGHT,
  flight
});

export const fetchingFlights = () => ({
  type: FETCHING_FLIGHTS
});

export const filteredFlights = flights => ({
  type: FILTEREDFLIGHTS,
  flights
});

export const getDepFlights = (from, to, date) => async dispatch => {
  dispatch(fetchingFlights());
  try {
    const { data } = await axios.get(
      `/api/searchFlights/${from}-${to}-${date}`
    );
    dispatch(gotDepFlights(data));
  } catch (error) {
    console.error(error);
  }
};

export const getRetFlights = (from, to, date) => async dispatch => {
  dispatch(fetchingFlights());
  try {
    const { data } = await axios.get(
      `/api/searchFlights/${from}-${to}-${date}`
    );
    dispatch(gotRetFlights(data));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  isFetching: false,
  depFlights: [],
  retFlights: [],
  filteredFlights: [],
  flight: {}
};

const flightReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_DEP_FLIGHTS:
      return { ...state, depFlights: action.flights, isFetching: false };
    case GOT_RET_FLIGHTS:
      return { ...state, retFlights: action.flights, isFetching: false };
    case FETCHING_FLIGHTS:
      return { ...state, isFetching: true };
    case SELECTED_FLIGHT:
      return { ...state, flight: action.flight };
    case FILTEREDFLIGHTS:
      return { ...state, filteredFlights: action.flights };
    default:
      return state;
  }
};

export default flightReducer;
