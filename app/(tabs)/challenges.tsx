import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import ChallengeCard from "@/components/ui/ChallengeCard";

import { Ionicons } from "@expo/vector-icons";
import CategoriesSelector from "@/components/ui/CategoriesSelector";
import { useChallenges } from "@/hooks/useChallenges";

export type ChallengeType = {
  id: string;
  title: string;
  content: string;
  category: string;
  difficulty: string;
  date_used: string;
};

export default function ChallengesScreen() {
  const { data: challengesInfo, isLoading, error } = useChallenges();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();

  const filteredChallenges =
    selectedCategory === "all"
      ? challengesInfo
      : challengesInfo?.filter(
          (challenge) => challenge.category === selectedCategory
        );

  const handleChallengePress = (challengeId: string) => {
    router.push({
      pathname: "/challenge/challenge-details",
      params: { challengeId },
    });
  };

  return (
    <SafeAreaView className="flex-1 mx-2">
      <StatusBar style="dark" />
      {isLoading ? (
        <View className="min-h-screen flex justify-center items-center font-semibold text-2xl">
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          <View className="flex-row justify-between items-center py-7 px-4">
            <Text className="text-3xl text-black font-semibold">今日挑戰</Text>
            <TouchableOpacity>
              <Ionicons name="calendar-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <CategoriesSelector
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <FlatList
            data={filteredChallenges}
            renderItem={({ item }) => (
              <ChallengeCard
                challenge={item}
                onPress={() => handleChallengePress(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.challengesContainer}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  challengesContainer: {
    paddingTop: 20,
    paddingBottom: 120,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
});
