import axios from 'axios';

const GOT_HOTELS = 'GOT_HOTELS';
const SELECTED_HOTEL = 'SELECTED_HOTEL';
const FETCHING_HOTELS = 'FETCHING_HOTELS';
const FILTEREDHOTELS = 'FILTEREDHOTELS';

const gotHotels = hotels => ({
  type: GOT_HOTELS,
  hotels
});

export const selectedHotel = hotel => ({
  type: SELECTED_HOTEL,
  hotel
});

export const fetchingHotels = () => ({
  type: FETCHING_HOTELS
});

export const filteredHotels = hotels => ({
  type: FILTEREDHOTELS,
  hotels
});

export const getHotels = cityCode => async dispatch => {
  dispatch(fetchingHotels());
  try {
    const { data } = await axios.get(`/api/searchHotels/${cityCode}`);
    dispatch(gotHotels(data));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  isFetching: false,
  allHotels: [],
  filteredHotels: [],
  hotel: {}
};

const hotelReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_HOTELS:
      return { ...state, allHotels: action.hotels, isFetching: false };
    case FETCHING_HOTELS:
      return { ...state, isFetching: true };
    case SELECTED_HOTEL:
      return { ...state, hotel: action.hotel };
    case FILTEREDHOTELS:
      return { ...state, filteredHotels: action.hotels };
    default:
      return state;
  }
};

export default hotelReducer;
