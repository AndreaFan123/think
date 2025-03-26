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
import challengesMockData from "@/mock/mockData";
import { Ionicons } from "@expo/vector-icons";

// 分類列表
const categories = [
  "全部",
  "日常對話",
  "商業英語",
  "發音練習",
  "公眾演講",
  "習語與表達",
];

export default function ChallengesScreen() {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const router = useRouter();

  // 根據選擇的分類過濾挑戰
  const filteredChallenges =
    selectedCategory === "全部"
      ? challengesMockData
      : challengesMockData.filter(
          (challenge) => challenge.category === selectedCategory
        );

  const handleChallengePress = (challenge) => {
    // 導航到挑戰詳情頁面
    router.push({
      pathname: "/challenge/[id]",
      params: { id: challenge.id },
    });
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.categoryItemSelected,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.categoryTextSelected,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* 標題區域 */}
      <View style={styles.header}>
        <Text style={styles.heading}>今日挑戰</Text>
        <TouchableOpacity style={styles.calendarButton}>
          <Ionicons name="calendar-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* 分類選擇器 */}
      <FlatList
        horizontal
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      />

      {/* 挑戰卡片列表 */}
      <FlatList
        data={filteredChallenges}
        renderItem={({ item }) => (
          <ChallengeCard
            challenge={item}
            onPress={() => handleChallengePress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.challengesContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  calendarButton: {
    padding: 8,
  },
  categoriesContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
  },
  categoryItemSelected: {
    backgroundColor: "#4F46E5",
  },
  categoryText: {
    fontSize: 14,
    color: "#666",
  },
  categoryTextSelected: {
    color: "white",
    fontWeight: "500",
  },
  challengesContainer: {
    paddingTop: 8,
    paddingBottom: 20,
  },
});
