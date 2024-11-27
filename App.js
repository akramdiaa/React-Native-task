import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'react-native';


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content"  translucent={true} backgroundColor="transparent"/>
      <AppNavigator/>
      </NavigationContainer>
  );
}

