import "react-native-url-polyfill/auto";
import { useEffect, useState } from "react";
import { Slot, Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

import "../global.css";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
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
    if (!session && !isLoading && !hasCompletedOnboarding) {
      router.replace("/onboarding/1");
    } else {
      router.replace("/");
    }
  }, [isLoading, hasCompletedOnboarding, router]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (isLoading) {
    return (
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
    );
  }

  return <Slot />;
}
