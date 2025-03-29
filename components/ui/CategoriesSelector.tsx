import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const categories = ["all", "lifestyle", "culture", "travel", "food", "tech"];

export default function CategoriesSelector({
  selectedCategory,
  onSelectCategory,
}: {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}) {
  const itemWidth = screenWidth / categories.length;

  return (
    <View className="mx-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="w-full"
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            className={`
            flex-row px-4 py-2 h-[30px] w-[20px]
            ${
              selectedCategory === category &&
              "bg-black text-white rounded-full "
            }`}
            onPress={() => onSelectCategory(category)}
          >
            <Text
              className={`text-xl ${
                selectedCategory === category
                  ? "text-white font-semibold"
                  : "text-black"
              }`}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {category.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
