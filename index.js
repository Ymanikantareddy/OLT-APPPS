import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import RNFetchBlob from 'rn-fetch-blob';

RNFetchBlob.config({
    trusty: true, // Enable custom trust manager
  });
AppRegistry.registerComponent(appName, () => App);
