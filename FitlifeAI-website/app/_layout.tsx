import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native';

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Slot /> {/* 👈 Renders whatever route is active */}
    </SafeAreaView>
  );
}

