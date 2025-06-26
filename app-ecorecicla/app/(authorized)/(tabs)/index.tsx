import {useAuthSession} from "@/providers/AuthProvider";
import { Redirect } from "expo-router";
import {View, Text} from "react-native";

export default function Index() {
  const {token, isLoading} = useAuthSession()
  
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!token?.current) {
    return <Redirect href="/(auth)/sign-up" />;
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#efefef'
      }}
    >
      <Text>Holi :3</Text>
    </View>
  );
}