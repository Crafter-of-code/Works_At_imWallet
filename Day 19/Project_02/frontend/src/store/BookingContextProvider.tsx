import React, { Children } from 'react';
type bookingContextType = {};
export const bookingContext = React.createContext<bookingContextType>({});
export default function BookingContextProvider(props: {
  children: React.ReactNode;
}) {
  return (
    <bookingContext.Provider value={{}}>
      {props.children}
    </bookingContext.Provider>
  );
}
