import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FEATURES = ['AI-generated soundscapes', 'Unlimited mixing', 'Sleep timer', 'Background play', 'Offline sounds'];

export default function PaywallScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.badge}>⭐ PREMIUM</Text>
          <Text style={styles.title}>AI Soundscapes</Text>
          <Text style={styles.subtitle}>AI-generated ambient sounds for focus & sleep</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.price}>$4.99<Text style={styles.period}>/month</Text></Text>
          <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Start Free Trial</Text></TouchableOpacity>
        </View>
        <View style={styles.features}>{FEATURES.map((f, i) => <View key={i} style={styles.item}><Text style={styles.check}>✓</Text><Text style={styles.itemText}>{f}</Text></View>)}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1B4B' },
  header: { padding: 32, alignItems: 'center', backgroundColor: '#312E81', borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  badge: { backgroundColor: '#4C1D95', color: '#E9D5FF', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, fontSize: 12, fontWeight: '700', marginBottom: 16 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' },
  subtitle: { fontSize: 16, color: '#A5B4FC', marginTop: 12 },
  card: { margin: 20, padding: 24, backgroundColor: '#312E81', borderRadius: 20, alignItems: 'center' },
  price: { fontSize: 48, fontWeight: 'bold', color: '#FFFFFF' },
  period: { fontSize: 18, color: '#A5B4FC' },
  button: { backgroundColor: '#8B5CF6', paddingVertical: 18, borderRadius: 14, marginTop: 24, width: '100%' },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700', textAlign: 'center' },
  features: { padding: 20 },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  check: { fontSize: 18, color: '#10B981', marginRight: 12 },
  itemText: { fontSize: 15, color: '#A5B4FC' }
});
