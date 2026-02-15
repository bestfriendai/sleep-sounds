import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerStyle: { backgroundColor: '#1E1B4B' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }}>
        <Stack.Screen name="index" options={{ title: 'SleepSounds' }} />
        <Stack.Screen name="home" options={{ title: 'Mixer' }} />
        <Stack.Screen name="paywall" options={{ presentation: 'modal', title: 'Premium' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#1E1B4B' } });
