import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Text, View} from 'react-native';
import GoogleFit, {BucketUnit, Scopes} from 'react-native-google-fit';
import {DEFAULT_STEPCOUNT_SOURCE} from './src/constants/strings';

const App = () => {
  const [totalSteps, setTotalStep] = useState(0);

  const reflectCurrentStepCount = () => {
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
        if (result?.steps?.[0]) setTotalStep(result.steps[0].value);
      })
      .catch(error => {
        console.log({error});
      });
  };

  // const sleep = time =>
  //   new Promise(resolve => setTimeout(() => resolve(), time));

  // useEffect(() => {
  //   console.log({isRunning: BackgroundService.isRunning()});
  //   if (!BackgroundService.isRunning()) {
  //     BackgroundService.start(
  //       async args => {
  //         await new Promise(async resolve => {
  //           for (let i = 0; BackgroundService.isRunning(); i++) {
  //             console.log({
  //               msg: 'BackgroundService.Triggering',
  //               args: {...args, i, isRunning: BackgroundService.isRunning()},
  //             });
  //             await sleep(1000);
  //           }
  //         });
  //       },
  //       {
  //         taskName: 'BackgroundService.ForNoReason',
  //         taskTitle: 'Uploading.StepCount',
  //         taskDesc: 'We will upload stepCount in background mode',
  //         taskIcon: {
  //           name: 'ic_launcher',
  //           type: 'mipmap',
  //         },
  //         progressBar: {
  //           max: 100,
  //           value: 18,
  //         },
  //       },
  //     ).then(_ => {
  //       BackgroundService.updateNotification({taskDesc: 'Emitting'});
  //     });
  //   } else {
  //     // BackgroundService.stop();
  //     console.log({msg: 'BackgroundService.done'});
  //   }
  // }, []);

  useEffect(() => {
    const options = {
      scopes: [Scopes.FITNESS_ACTIVITY_READ],
    };
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
    ).then(permissionResponse => {
      if (permissionResponse === PermissionsAndroid.RESULTS.GRANTED) {
        GoogleFit.authorize(options)
          .then(authRes => {
            console.log({authRes});
            GoogleFit.startRecording(recordRes => {
              console.log({recordRes});
              GoogleFit.observeSteps(observeStepsResponse => {
                console.log({observeStepsResponse});
                reflectCurrentStepCount();
              });
            });
            reflectCurrentStepCount();
          })
          .catch(err => {
            console.log({err});
          });
      } else {
      }
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
