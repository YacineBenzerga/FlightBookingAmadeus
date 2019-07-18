import axios from 'axios';

const GOT_DEP_FLIGHTS = 'GOT_DEP_FLIGHTS';
const GOT_RET_FLIGHTS = 'GOT_RET_FLIGHTS';
const SELECTED_DEP_FLIGHT = 'SELECTED_DEP_FLIGHT';
const SELECTED_RET_FLIGHT = 'SELECTED_RET_FLIGHT';
const FETCHING_FLIGHTS = 'FETCHING_FLIGHTS';
const FILTEREDFLIGHTS = 'FILTEREDFLIGHTS';
const RESET_ALL_FLIGHTS = 'RESET_ALL_FLIGHTS';
const FETCHED_RET_FLIGHT = 'FETCHED_RET_FLIGHT';

const gotDepFlights = flights => ({
  type: GOT_DEP_FLIGHTS,
  flights
});

const gotRetFlights = flights => ({
  type: GOT_RET_FLIGHTS,
  flights
});

export const resetAllFlights = () => ({
  type: RESET_ALL_FLIGHTS
});

export const selectedDepFlight = flight => ({
  type: SELECTED_DEP_FLIGHT,
  flight
});

export const selectedRetFlight = flight => ({
  type: SELECTED_RET_FLIGHT,
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
  fetchedRetFlight: false,
  depFlights: [],
  retFlights: [],
  filteredFlights: [],
  sDepFlight: {},
  sRetFlight: {}
};

const flightReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_DEP_FLIGHTS:
      return { ...state, depFlights: action.flights, isFetching: false };
    case GOT_RET_FLIGHTS:
      return { ...state, retFlights: action.flights, isFetching: false };
    case FETCHING_FLIGHTS:
      return { ...state, isFetching: true };
    case SELECTED_DEP_FLIGHT:
      return { ...state, sDepFlight: action.sDepFlight };
    case SELECTED_RET_FLIGHT:
      return {
        ...state,
        sRetFlight: action.sRetFlight
      };
    case FILTEREDFLIGHTS:
      return { ...state, filteredFlights: action.flights };
    case RESET_ALL_FLIGHTS:
      return initialState;
    default:
      return state;
  }
};

export default flightReducer;
