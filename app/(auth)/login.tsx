import React, { useState } from "react";
import { Alert, View, TextInput, TouchableOpacity, Text } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Link, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signInWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      Alert.alert(error.message);
      return;
    }
    if (session) {
      router.push("/");
    }

    setLoading(false);
  }

  return (
    <View className="w-full z-20 relative px-6 max-w-full bg-white min-h-screen flex gap-7 flex-col items-center justify-center">
      <Text className="font-bold text-black text-3xl mb-3">
        歡迎回來！立刻登入 🚀
      </Text>
      <View className="w-full flex flex-col gap-1">
        <Text className="text-xl text-black font-semibold">電子信箱</Text>

        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="輸入電子信箱"
          autoCapitalize={"none"}
          className="placeholder:text-gray-600 text-xl border-2 p-4 rounded-xl border-black"
        />
      </View>
      <View className="w-full flex flex-col gap-1">
        <Text className="text-lg text-black font-semibold">密碼</Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={showPassword ? false : true}
          placeholder="輸入密碼"
          autoCapitalize={"none"}
          className="placeholder:text-gray-600 relative text-xl border-2 p-4 rounded-xl border-black"
        />
        <Entypo
          name={showPassword ? "eye" : "eye-with-line"}
          size={24}
          color="black"
          className="absolute right-7 top-[53%]"
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>
      <View className="w-full max-w-full">
        <TouchableOpacity
          disabled={loading}
          onPress={() => signInWithEmail()}
          className="bg-black rounded-2xl"
        >
          <Text className="text-white text-xl font-medium p-4 text-center">
            登入
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Link className="text-lg text-black font-medium" href="/register">
          還不是會員？{" "}
          <Text className="text-[#F75C2F] font-semibold">快註冊開啟挑戰</Text>
        </Link>
      </View>
    </View>
  );
}
