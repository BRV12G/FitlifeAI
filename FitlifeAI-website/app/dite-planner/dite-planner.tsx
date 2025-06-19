import { Dimensions, Image, Text, View} from 'react-native';
import Button from './../components/shared/Button';
export default function DitePlanner() {
  return (
    <View style={{flex: 1}}>
      <Image
        source={require('@/assets/diet-planner/diet-planner-backdrop.png')}
        style={{width: '100%', height: Dimensions.get('screen').height}}
      />
      <View style={{
        position: 'absolute',
        height: Dimensions.get('screen').height,
        backgroundColor:"#0707075e",
        width: '100%',
        alignItems: 'center',
        padding:20,
        
      }}>
        <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold', marginTop: 50}}> FitlifeAI Diet Planner</Text>
        <Text style={{color: 'white', fontSize: 20, marginHorizontal: 20, marginTop: 25, textAlign: 'center', opacity: 0.8}}>Craft delicious, healthy meal plans tailored just for you. Achieve your goal with ease!</Text>
        <Image source={require('@/assets/diet-planner/homepage-girl.png')} style={{width: 300, height: 300, marginTop: 25}} />
        <Button title={'Get Started'} onPress={() => console.log('Get Started')} />
      </View>
    </View>
  );
}