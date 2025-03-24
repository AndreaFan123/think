import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Text, View, SafeAreaView, Alert } from "react-native";

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
      <View className="pt-11 px-4 bg-[#d7d5ff] min-h-screen w-full max-w-full flex flex-col items-center">
        <View className="w-20 absolute top-5 left-1/2 translate-x-[-50%] z-10 shadow-md h-20 rounded-full bg-[#342d9b] flex items-center justify-center">
          <Text className="text-white text-4xl font-semibold">
            {getUserNameInitial(userInfo?.displayName)}
          </Text>
        </View>
        <View className="bg-white relative pt-20 pb-12 rounded-md w-full max-w-full flex flex-col gap-2 mt-4 items-center">
          <Text className="text-3xl font-semibold text-[#342d9b]">
            {userInfo?.displayName ?? "User"}
          </Text>
          <Text className="text-2xl font-medium text-[#342d9b]">
            {userInfo?.email}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
