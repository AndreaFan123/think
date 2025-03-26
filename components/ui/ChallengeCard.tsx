import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ChallengeCard = ({ challenge, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {/* 標籤區塊 */}
      <View style={styles.tagsContainer}>
        <View style={styles.levelTag}>
          <Text style={styles.levelText}>{challenge.level}</Text>
        </View>
        {challenge.isNew && (
          <View style={styles.newTag}>
            <Text style={styles.newTagText}>新挑戰</Text>
          </View>
        )}
      </View>

      {/* 標題和描述 */}
      <Text style={styles.title}>{challenge.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {challenge.description}
      </Text>

      {/* 詳細資訊 */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{challenge.estimatedTime}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="star-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{challenge.points} 點</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="people-outline" size={16} color="#666" />
          <Text style={styles.detailText}>
            {challenge.completedCount} 人完成
          </Text>
        </View>
      </View>

      {/* 挑戰按鈕 */}
      <TouchableOpacity style={styles.startButton} onPress={onPress}>
        <Text style={styles.startButtonText}>開始挑戰</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tagsContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  levelTag: {
    backgroundColor: "#E6F7FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  levelText: {
    color: "#1890FF",
    fontSize: 12,
    fontWeight: "500",
  },
  newTag: {
    backgroundColor: "#FFF7E6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  newTagText: {
    color: "#FA8C16",
    fontSize: 12,
    fontWeight: "500",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    lineHeight: 20,
  },
  detailsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  detailText: {
    fontSize: 12,
    color: "white",
    marginLeft: 4,
  },
  startButton: {
    backgroundColor: "black", // 紫色系，符合您的主題
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  startButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default ChallengeCard;
