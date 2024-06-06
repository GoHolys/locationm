import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  NativeModules,
  Button,
} from 'react-native';

import GetLocation, {
  Location,
  LocationErrorCode,
  isLocationError,
} from 'react-native-get-location';

const {GalleryModule} = NativeModules;

const openGallery = async () => {
  try {
    const result = await GalleryModule.openGallery();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

function App(): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<Location | null>();
  const [error, setError] = useState<LocationErrorCode | null>(null);

  const requestLocation = () => {
    setLoading(true);
    setLocation(null);
    setError(null);

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
      rationale: {
        title: 'Location permission',
        message: 'The app needs the permission to request your location.',
        buttonPositive: 'Ok',
      },
    })
      .then(newLocation => {
        setLoading(false);
        setLocation(newLocation);
      })
      .catch(ex => {
        if (isLocationError(ex)) {
          const {code, message} = ex;
          console.warn(code, message);
          setError(code);
        } else {
          console.warn(ex);
        }
        setLoading(false);
        setLocation(null);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      requestLocation();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  if (error) {
    <SafeAreaView>
      <Text style={styles.title}>
        Couldn't get the location an error occured
      </Text>
    </SafeAreaView>;
  }

  if (loading) {
    return (
      <SafeAreaView>
        <Text style={styles.title}>Loading Location</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Location Details</Text>
      {Object.entries(location || {}).map(([key, value]) => (
        <Text key={key} style={styles.listItem}>
          {key} : {value}
        </Text>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 30,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  listItem: {
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
