import 'expo-router';
export default {
  expo: {
    name: "SleepSounds", slug: "sleep-sounds", version: "1.0.0", orientation: "portrait",
    icon: "./assets/icon.png", userInterfaceStyle: "dark", scheme: "sleepsounds",
    newArchEnabled: true, splash: { image: "./assets/splash.png", resizeMode: "contain", backgroundColor: "#1E1B4B" },
    assetBundlePatterns: ["**/*"], ios: { supportsTablet: true, bundleIdentifier: "com.sleepsounds.app" },
    android: { adaptiveIcon: { foregroundImage: "./assets/icon.png", backgroundColor: "#1E1B4B" }, package: "com.sleepsounds.app" },
    plugins: ["expo-router", ["expo-purchases", { "apiKey": "YOUR_REVENUECAT_API_KEY" }]]
  }
};
