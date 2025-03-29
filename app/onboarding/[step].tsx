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
    title: "大聲閱讀",
    description:
      "研究顯示，大聲閱讀並重覆練習將有助於提升英文的敏感度。你準備好了嗎？",
    cta: "我準備好了！",
    image: (
      <Image
        source={require("@/assets/images/onboarding/speaking.png")}
        className="w-[350px] h-[350px] self-center"
      />
    ),
  },
  {
    id: "2",
    title: "不要害怕或擔心",
    description: "唸錯或唸得不好聽？只要持續練習，一定會有所進步！",
    cta: "Let's Go",
    image: (
      <Image
        source={require("@/assets/images/onboarding/running.png")}
        className="w-[350px] h-[350px] self-center"
      />
    ),
  },
  {
    id: "3",
    title: "每日挑戰，不要有壓力",
    description: "將你的練習錄下來，你將會看到自己的進步",
    cta: "開始挑戰",
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
                <Text className="text-3xl font-bold text-black">
                  {currentStep.title}
                </Text>
                <Text className="text-xl text-center text-black">
                  {currentStep.description}
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleNext}
                className="bg-black rounded-2xl"
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
