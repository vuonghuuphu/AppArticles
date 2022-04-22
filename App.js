import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenHome from './src/Screens/ScreenHome';
import ScreenFrom from './src/Screens/ScreenFrom';
import ScreenDetail from './src/Screens/ScreenDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={ScreenHome} options={{headerShown:false}}/>
      <Stack.Screen name="From" component={ScreenFrom} options={{headerShown:false}}/>
      <Stack.Screen name="Detail" component={ScreenDetail} options={{headerShown:false}}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
