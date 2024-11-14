import React from "react";
import { useFonts } from "expo-font";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../../context/AuthContext.js";

export default function ProfileScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  const handleSettingsPress = () => {
    navigation.navigate("SettingsScreen");
  };

  const handleHistoryPress = () => {
    navigation.navigate("HistoryScreen");
  };

  const handleGuidancePress = () => {
    navigation.navigate("GuidanceScreen");
  };

  const { username, familyname, email, isAdmin } = useAuth();

  const handleEmailPress = () => {
    // console.log("Email button pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={handleSettingsPress}
      >
        <Icon name="settings-outline" size={34} color="#333" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>PetConnect</Text>

        <Image
          source={require("../../assets/images/StartScreenImage.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.TextWrapper}>
        <Text style={styles.text}>
          {isAdmin ? username : familyname} Family
        </Text>
      </View>

      <TouchableOpacity style={styles.usernameCard} onPress={handleEmailPress}>
        <View style={styles.usernameContent}>
          <Icon
            name="person-outline"
            size={24}
            color="#FFA726"
            style={styles.icon}
          />
          <View>
            <Text style={styles.usernameText}>Username: {username}</Text>
            <Text style={styles.emailText}>Email: {email}</Text>
          </View>
        </View>
        <Icon name="chevron-forward-outline" size={24} color="#FFA726" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.historyCard} onPress={handleHistoryPress}>
        <View style={styles.historyContent}>
          <Icon
            name="time-outline"
            size={24}
            color="#FFA726"
            style={styles.icon}
          />
          <Text style={styles.historyText}>View History Goals</Text>
        </View>
        <Icon name="chevron-forward-outline" size={24} color="#FFA726" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.guidanceCard}
        onPress={handleGuidancePress}
      >
        <View style={styles.historyContent}>
          <Icon
            name="help-circle-outline"
            size={24}
            color="#FFA726"
            style={styles.icon}
          />
          <Text style={styles.historyText}>App Guidance</Text>
        </View>
        <Icon name="chevron-forward-outline" size={24} color="#FFA726" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7E4C6",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: Dimensions.get("window").height * 0.07,
  },
  settingsButton: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.06,
    right: Dimensions.get("window").width * 0.06,
    zIndex: 1,
    padding: 15,
    borderRadius: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: "MarkoOne-Regular",
    marginTop: Dimensions.get("window").height * 0.06,
    marginBottom: 5,
    textAlign: "center",
  },
  content: {
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").width * 0.4,
    marginTop: 5,
  },
  TextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.01,
  },
  text: {
    fontSize: 32,
    fontFamily: "MarkoOne-Regular",
    fontWeight: "bold",
    color: "#333",
  },
  usernameCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FDF4E7",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFA726",
    top: Dimensions.get("window").height * 0.05,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 30,
  },
  usernameContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  usernameText: {
    fontSize: 20,
    color: "#FFA726",
    fontWeight: "bold",
  },
  emailText: {
    fontSize: 16,
    color: "#FFA726", 
    marginTop: 5,
  },
  historyCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FDF4E7",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFA726",
    top: Dimensions.get("window").height * 0.05,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 10,
  },
  guidanceCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FDF4E7",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFA726",
    top: Dimensions.get("window").height * 0.06,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  historyContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  historyText: {
    fontSize: 18,
    color: "#FFA726",
    fontWeight: "bold",
  },
});
