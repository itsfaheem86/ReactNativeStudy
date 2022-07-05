import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import GoogleFit, {BucketUnit, Scopes} from 'react-native-google-fit';
import {DEFAULT_STEPCOUNT_SOURCE} from './src/constants/strings';

const App = () => {
  const [totalSteps, setTotalStep] = useState(0);

  useEffect(() => {
    const options = {
      scopes: [Scopes.FITNESS_ACTIVITY_READ],
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
            const result = results.find(
              res => res.source == DEFAULT_STEPCOUNT_SOURCE,
            );
            setTotalStep(result.steps[0].value);
          })
          .catch(error => {
            console.log({error});
          });
      })
      .catch(err => {
        console.log({err});
      });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: 'white',
        }}>
        {totalSteps}
      </Text>
    </View>
  );
};

export default App;
