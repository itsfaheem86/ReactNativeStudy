import React, {useEffect} from 'react';
import {View} from 'react-native';
import GoogleFit, {BucketUnit, Scopes} from 'react-native-google-fit';

const App = () => {
  useEffect(() => {
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ,
        Scopes.FITNESS_ACTIVITY_WRITE,
        Scopes.FITNESS_BODY_READ,
        Scopes.FITNESS_BODY_WRITE,
      ],
    };
    GoogleFit.authorize(options)
      .then(res => {
        console.log({res});
        GoogleFit.getDailyStepCountSamples({
          bucketUnit: BucketUnit.HOUR,
        })
          .then(results => {
            console.log({
              results,
            });
          })
          .catch(error => {
            console.log({error});
          });
      })
      .catch(err => {
        console.log({err});
      });
  }, []);
  return <View></View>;
};

export default App;
