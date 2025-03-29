import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ChallengeType } from "@/app/(tabs)/challenges";

export default function ChallengeCard({
  challenge,
  onPress,
}: {
  challenge: ChallengeType;
  onPress: () => void;
}) {
  const cleanTime = (time: string) => {
    const splitTime = time.split("T")[0];
    return splitTime;
  };

  return (
    <TouchableOpacity
      className="mx-4 border p-4 rounded-xl flex gap-4 items-start"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View>
        <Text className="font-semibold">
          {challenge.difficulty.toUpperCase()}
        </Text>
      </View>
      <View>
        <Text className="font-semibold text-2xl">{challenge.title}</Text>
      </View>
      <View>
        <Text>{cleanTime(challenge.date_used) + " 00:00 am"}</Text>
      </View>

      <TouchableOpacity className="bg-black rounded-xl" onPress={onPress}>
        <Text className="text-white text-xl w-full text-center py-2">
          開始挑戰
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
