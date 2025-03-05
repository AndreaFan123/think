import { useEffect, useState } from "react";
import { Slot, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";

import "../global.css";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const router = useRouter();

  const checkOnboardingStatus = async () => {
    try {
      const value = await AsyncStorage.getItem("hasCompletedOnboarding");
      setHasCompletedOnboarding(value === "true");
    } catch (error) {
      console.error("Error checking onboarding status", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!hasCompletedOnboarding) {
        router.replace("/onboarding");
      }
    }
  }, [isLoading, hasCompletedOnboarding, router]);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <Slot />;
}
