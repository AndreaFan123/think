import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Alert,
  Button,
  TouchableOpacity,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

type UserInfoType = {
  email?: string;
  displayName?: string;
};

export default function ProfileScreen() {
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getUserInfo() {
    setIsLoading(true);

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      Alert.alert(error.message);
      setIsLoading(false);
      return;
    }
    setUserInfo({
      email: user?.email,
      displayName: user?.user_metadata.display_name,
    });
    setIsLoading(false);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserNameInitial = (name?: string) => {
    if (name) {
      const firstChar = name.split("")[0];
      const secondChar = name.split("")[1];
      return firstChar + secondChar;
    }
  };

  return (
    <SafeAreaView>
      <View className="mt-8 relative min-h-screen w-full max-w-full flex flex-col gap-7 items-center">
        <View>
          <Text className="text-2xl font-medium">PROFILE</Text>
        </View>
        <View className="w-20 h-20 z-10 bg-black rounded-full flex justify-center items-center">
          <Text className="text-white text-4xl font-semibold">
            {getUserNameInitial(userInfo?.displayName)}
          </Text>
        </View>
        <View className="min-h-screen bg-gray-300/80 w-full rounded-t-[80px] absolute top-[88px]">
          <View className="w-full flex flex-col gap-6">
            <View className="w-full mt-16 flex flex-col justify-center items-center gap-2">
              <Text className="text-2xl text-gray-800 font-medium">
                {userInfo?.displayName ?? "Thinker"}
              </Text>
              <Text className="text-xl text-gray-800">
                {userInfo?.email ?? ""}
              </Text>
              <Text className="text-center w-full max-w-[400px] text-lg text-gray-800">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Quidem, reiciendis.
              </Text>
            </View>
            <View className="flex flex-row items-center justify-center gap-4">
              <TouchableOpacity className="bg-black px-4 py-2 rounded-full">
                <Text className="text-white text-lg font-medium">FOLLOW</Text>
              </TouchableOpacity>
              <TouchableOpacity className="border border-black px-4 py-2 rounded-full">
                <Text className="text-black text-lg font-medium">MESSAGE</Text>
              </TouchableOpacity>
            </View>
            <View className="w-full flex flex-col px-4 pt-11">
              <View className="flex flex-row justify-between">
                <Text className="font-semibold text-xl text-gray-800">
                  Challenges
                </Text>
                <TouchableOpacity>
                  <Text className="text-gray-700">View all</Text>
                </TouchableOpacity>
              </View>
              {/* TODO: Challenge card */}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
