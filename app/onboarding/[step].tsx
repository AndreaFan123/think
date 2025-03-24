import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";

const ONBOARDING_STEPS = [
  {
    id: "1",
    title: "Read out aloud",
    description:
      "Research shows that reading out loud can help improve your English pronunciation.",
    cta: "Yes, I'm ready!",
    image: (
      <Image
        source={require("@/assets/images/onboarding/speaking.png")}
        className="w-[350px] h-[350px] self-center"
      />
    ),
  },
  {
    id: "2",
    title: "Don't be afraid",
    description:
      "Don't be afraid to make mistakes. The more you speak, the better you'll get.",
    cta: "Let's do this",
    image: (
      <Image
        source={require("@/assets/images/onboarding/running.png")}
        className="w-[350px] h-[350px] self-center"
      />
    ),
  },
  {
    id: "3",
    title: "Daily Challenge, no pressure",
    description:
      "Record yourself reading a short article every day. You can listen to it and see how you improve over time.",
    cta: "Let's Go",
    image: (
      <Image
        source={require("@/assets/images/onboarding/exploring.png")}
        className="w-[350px] h-[350px] self-center"
      />
    ),
  },
];
export default function OnboardingStep() {
  const router = useRouter();
  const { step } = useLocalSearchParams();
  const stepId = typeof step === "string" ? step : "1";
  const currentStep =
    ONBOARDING_STEPS.find((step) => step.id === stepId) || ONBOARDING_STEPS[0];
  const stepIndex = ONBOARDING_STEPS.findIndex((step) => step.id === stepId);

  const handleNext = () => {
    if (stepIndex === ONBOARDING_STEPS.length - 1) {
      router.replace("/login");
    } else {
      const nextStepId = ONBOARDING_STEPS[stepIndex + 1].id;
      router.push(`/onboarding/${nextStepId}`);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-white">
        <StatusBar style="dark" />
        <View className="px-4 w-full max-w-full flex flex-col h-full justify-center">
          <View>
            {ONBOARDING_STEPS.map((step, index) => (
              <View key={index} />
            ))}
          </View>
          <View>
            <View>{currentStep.image}</View>
            <View className="flex flex-col mt-11 gap-7">
              <View className="flex flex-col items-center gap-2">
                <Text className="text-3xl font-bold text-indigo-800">
                  {currentStep.title}
                </Text>
                <Text className="text-xl text-center text-indigo-800">
                  {currentStep.description}
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleNext}
                className="bg-indigo-700 rounded-2xl"
              >
                <Text className="text-white text-xl font-medium p-4 text-center">
                  {currentStep.cta}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
