import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TacNativeProvider, ToastProvider } from '@tac-ui/native';
import { AppNavigator } from './src/navigation/DrawerNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TacNativeProvider defaultPreference="system">
        <ToastProvider position="bottom">
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </ToastProvider>
      </TacNativeProvider>
    </GestureHandlerRootView>
  );
}
