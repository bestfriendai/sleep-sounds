import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>🎛️ Sound Mixer</Text>
          <Text style={styles.subtitle}>Adjust individual volumes</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.sliderCard}>
            <Text style={styles.sliderEmoji}>🌧️</Text>
            <View style={styles.sliderContent}>
              <Text style={styles.sliderLabel}>Rain</Text>
              <View style={styles.slider}><View style={[styles.sliderFill, { width: '70%' }]} /></View>
            </View>
          </View>

          <View style={styles.sliderCard}>
            <Text style={styles.sliderEmoji}>⛈️</Text>
            <View style={styles.sliderContent}>
              <Text style={styles.sliderLabel}>Thunder</Text>
              <View style={styles.slider}><View style={[styles.sliderFill, { width: '40%' }]} /></View>
            </View>
          </View>

          <View style={styles.timerCard}>
            <Text style={styles.timerTitle}>⏱️ Sleep Timer</Text>
            <View style={styles.timerOptions}>
              <Text style={styles.timerOption}>15 min</Text>
              <Text style={styles.timerOption}>30 min</Text>
              <Text style={styles.timerOption}>1 hour</Text>
              <Text style={styles.timerOptionSelected}>2 hours</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1B4B' },
  header: { padding: 24, backgroundColor: '#312E81', borderBottomRadius: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  subtitle: { fontSize: 14, color: '#A5B4FC', marginTop: 4 },
  content: { padding: 20 },
  sliderCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#312E81', padding: 16, borderRadius: 12, marginBottom: 12 },
  sliderEmoji: { fontSize: 32, marginRight: 16 },
  sliderContent: { flex: 1 },
  sliderLabel: { fontSize: 14, color: '#FFFFFF', marginBottom: 8 },
  slider: { height: 6, backgroundColor: '#4B5563', borderRadius: 3 },
  sliderFill: { height: '100%', backgroundColor: '#8B5CF6', borderRadius: 3 },
  timerCard: { backgroundColor: '#312E81', padding: 20, borderRadius: 12, marginTop: 8 },
  timerTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 12 },
  timerOptions: { flexDirection: 'row', justifyContent: 'space-between' },
  timerOption: { color: '#A5B4FC', fontSize: 14, padding: 8 },
  timerOptionSelected: { color: '#8B5CF6', fontSize: 14, fontWeight: 'bold', padding: 8 }
});
