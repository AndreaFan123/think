import { useUser } from "@/hooks/useUser";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";

type UserInfoType = {
  id: string;
  email: string;
  username: string;
  xp: number;
  level: number;
  preferred_language: string;
  subscription_status: string;
};

export default function ProfileScreen() {
  const { data: userInfo, isLoading, error } = useUser();

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
          <Text className="text-2xl font-medium">個人頁面</Text>
        </View>
        <View className="w-20 h-20 z-10 bg-black rounded-full flex justify-center items-center">
          <Text className="text-white text-4xl font-semibold">
            {getUserNameInitial(userInfo?.username)}
          </Text>
        </View>
        <View className="min-h-screen bg-gray-300/80 w-full rounded-t-[80px] absolute top-[88px]">
          <View className="w-full flex flex-col gap-6">
            <View className="w-full mt-16 flex flex-col justify-center items-center gap-2">
              <Text className="text-2xl text-gray-800 font-medium">
                {userInfo?.username ?? "Thinker"}
              </Text>
              <Text className="text-xl text-gray-800">
                {userInfo?.email ?? ""}
              </Text>
              <Text className="text-xl text-gray-800">
                訂閱狀態: {userInfo?.subscription_status}
              </Text>
              <Text className="text-center w-full max-w-[400px] text-lg text-gray-800">
                科技業 PM，持續練習英文，希望能夠在未來能夠在外商公司工作！
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
                  挑戰
                </Text>
                <TouchableOpacity>
                  <Text className="text-gray-700">看更多...</Text>
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
