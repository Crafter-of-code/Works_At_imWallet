import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import SafeAreaContainer from '../../../../component/SafeAreaContainer';
import { searchSelectContext } from '../../../../store/SearchSelectContextProvider';
import FlightCard from '../../components/FlightCard';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../../../component/Loader';
const FlightSelectScreen = ({ route }: { route: any }): React.ReactElement => {
  const nav = useNavigation<any>();
  const {
    flightsDetails,
    searchFlightsData,
    loadingSelectData,
    setLoadingSelectData,
  } = React.useContext(searchSelectContext);
  useEffect(() => {
    console.log(route.params);
    const data = {
      from: route.params.from,
      to: route.params.to,
    };
    searchFlightsData(data);
    console.log(flightsDetails);
  }, []);
  return (
    <>
      <SafeAreaContainer>
        {loadingSelectData ? (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Loader
                showLoader={loadingSelectData}
                setShowLoader={setLoadingSelectData}
              />
            </View>
          </>
        ) : (
          <ScrollView>
            {flightsDetails.length ? (
              flightsDetails.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <FlightCard
                      key={index}
                      flight={item}
                      onSelect={() =>
                        nav.navigate('FlightDetails', {
                          params: { flightId: item.Flight_Key },
                        })
                      }
                    />
                  </React.Fragment>
                );
              })
            ) : (
              <View>
                <Text>Not found</Text>
              </View>
            )}
          </ScrollView>
        )}
      </SafeAreaContainer>
    </>
  );
};
export default FlightSelectScreen;
