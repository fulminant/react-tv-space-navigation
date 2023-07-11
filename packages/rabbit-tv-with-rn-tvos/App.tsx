import { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';

const windowDimensions = Dimensions.get('window');

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OtherProgramsPage } from './src/components/OtherProgramsPage';
import { SimpleRSNApp } from './src/components/SimpleRSNApp';

const Stack = createNativeStackNavigator();

const GoBackConfiguration = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const listener = window.addEventListener('keydown', (event) => {
      if (event.code === 'Backspace') {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }
    });

    return window.removeEventListener('keydown', listener);
  }, []);

  return <></>;
};

function App(): JSX.Element {
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ window });
    });
    return () => subscription?.remove();
  });

  return (
    <NavigationContainer>
      <GoBackConfiguration />
      <View
        // eslint-disable-next-line react-native/no-inline-styles -- dynamic style so inlining is fine
        style={{
          width: dimensions.window.width,
          height: dimensions.window.height,
          backgroundColor: '#333',
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={SimpleRSNApp} />
          <Stack.Screen name="OtherPrograms" component={OtherProgramsPage} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

export default App;
