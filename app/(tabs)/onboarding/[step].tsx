import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const ONBOARDING_STEPS = [
  {
    id: "1",
    title: "不只看你感興趣的",
    description:
      "為了提升你的表達能力，我們會呈現各類主題的文章，而不只是你平常關注的內容。",
    cta: "好的，我願意挑戰",
  },
  {
    id: "2",
    title: "自在表達",
    description: "不要在意口音，也不要在意文法，重要的是勇於表達你的想法。",
    cta: "敢說就會進步，請繼續",
  },
  {
    id: "3",
    title: "限時體驗",
    description:
      "非會員每次錄音僅有30秒時間，僅能使用AI建議3次。請在閱讀完文章後，好好組織想法再開始錄音。",
    cta: "沒問題，我會讀完後思考再說",
  },
  {
    id: "4",
    title: "珍惜機會",
    description: "每一天只有一次挑戰機會，好好把握今天的學習時刻。",
    cta: "開始挑戰",
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
      router.replace("/(tabs)");
    } else {
      const nextStepId = ONBOARDING_STEPS[stepIndex + 1].id;
      router.push(`/onboarding/${nextStepId}`);
    }
  };
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <View>
        <View>
          {ONBOARDING_STEPS.map((step, index) => (
            <View key={index} />
          ))}
        </View>
        <View>
          <Text>{currentStep.title}</Text>
          <Text>{currentStep.description}</Text>
        </View>
        <TouchableOpacity onPress={handleNext}>
          <Text>{currentStep.cta}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
