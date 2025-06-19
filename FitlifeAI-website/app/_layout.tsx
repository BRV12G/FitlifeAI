import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { UserProvider } from '../contexts/userContext';
import Footer from '@/components/Footer'; // Adjust path based on your project
import Header from '@/components/Header';


export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
          <UserProvider>
      <Slot /> {/* 👈 Renders whatever route is active */}
      </UserProvider>
      <Footer />
    </SafeAreaView>
  );
}

