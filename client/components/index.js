/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar';
export { default as FlightFilter } from './FlightSearch/flightFilter';
export { default as HotelSearch } from './HotelSearch/hotelFilter';
export { default as FlightResults } from './FlightSearch/flightResults';
export { default as FlightView } from './FlightSearch/flightView';
export { default as HotelView } from './HotelSearch/hotelView';
