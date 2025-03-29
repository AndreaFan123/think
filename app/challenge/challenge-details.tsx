import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useChallenge } from "@/hooks/useChallenge";

export default function ChallengeDetail() {
  const { challengeId } = useLocalSearchParams();
  const {
    data: challenge,
    isLoading,
    error,
  } = useChallenge(challengeId as string);

  return (
    <SafeAreaView>
      {isLoading ? (
        <View className="min-h-screen flex justify-center items-center font-semibold text-2xl">
          <Text>Loading...</Text>
        </View>
      ) : (
        <View className="mt-11 min-h-auto mx-4 flex gap-4 p-4">
          <Text className="text-3xl font-bold text-gray-800">
            {challenge?.title}
          </Text>
          <Text className="text-2xl text-gray-800">{challenge?.content}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
