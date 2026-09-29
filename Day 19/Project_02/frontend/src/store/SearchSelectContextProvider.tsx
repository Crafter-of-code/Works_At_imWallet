import axios from 'axios';
import React from 'react';
import { server_url } from './config';
import { appContext } from './AppContextProvider';
import { Flight } from '../screen/booking-screens/components/FlightCard';

type searchSelectContext = {
  searchFlightsData: (data: searchFlightDataType) => void;
  flightsDetails: Flight[];
  setFlightsDetails: React.Dispatch<React.SetStateAction<Flight[]>>;
  loadingSelectData: boolean;
  setLoadingSelectData: React.Dispatch<React.SetStateAction<boolean>>;
};
type searchFlightDataType = {
  from: {
    code: string;
    city: string;
  };
  to: { code: string; city: string };
};
export const searchSelectContext = React.createContext<searchSelectContext>({
  searchFlightsData: (data: searchFlightDataType) => {},
  flightsDetails: [],
  setFlightsDetails: () => {},
  loadingSelectData: false,
  setLoadingSelectData: () => {},
});
export default function SearchSelectContextProvider(props: {
  children: React.ReactNode;
}) {
  const { getRequest, postRequest } = React.useContext(appContext);
  const [flightsDetails, setFlightsDetails] = React.useState<Flight[]>([]);
  const [loadingSelectData, setLoadingSelectData] =
    React.useState<boolean>(false);
  async function searchFlightsData(data: searchFlightDataType) {
    setLoadingSelectData(true);
    console.log(data);
    await postRequest(`${server_url}/api/flight/search`, data)
      .then(response => setFlightsDetails(response?.data.data))
      .catch(err => console.log(err))
      .finally(() => setLoadingSelectData(false));
  }
  return (
    <searchSelectContext.Provider
      value={{
        searchFlightsData,
        flightsDetails,
        setFlightsDetails,
        loadingSelectData,
        setLoadingSelectData,
      }}
    >
      {props.children}
    </searchSelectContext.Provider>
  );
}
