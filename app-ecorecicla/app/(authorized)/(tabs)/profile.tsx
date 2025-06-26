import IconMail from "@/components/svg/mail";
import IconUser from "@/components/svg/user";
import { useAuthSession } from "@/providers/AuthProvider";
import { Feather } from '@expo/vector-icons';
import { Redirect } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const { token, isLoading } = useAuthSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!token?.current) {
    return <Redirect href="/(auth)/sign-up" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Feather name="edit-2" size={16} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>Personal info</Text>
          <TouchableOpacity>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <IconUser width={24} height={24} />
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.infoTittle}>Name</Text>
            <Text style={styles.infoText}>Terry Melton</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <IconMail width={24} height={24} />
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.infoTittle}>E-mail</Text>
            <Text style={styles.infoText}>Terry Melton</Text>
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#007AFF',
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 12,
    elevation: 3,
  },
  infoCard: {
    backgroundColor: "#f4f4f4",
    width: "90%",
    borderRadius: 16,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    fontFamily: 'Roboto-Regular'
  },
  editText: {
    color: "#007AFF",
    fontWeight: "500",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 10,
  },
  infoText: {
    fontSize: 16,
    flexShrink: 1,
  },
  infoTittle: {
    fontSize: 16,
    flexShrink: 1,
    fontWeight: '400',
    color: '#a8a7a5',
    fontFamily: 'Roboto-Regular'
  },
});
