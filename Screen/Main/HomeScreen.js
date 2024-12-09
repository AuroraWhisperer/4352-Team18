import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  // SafeAreaView,
  Alert,
  Image,
  Pressable,
} from "react-native";
import TotalDiamonds from "../../components/Display/TotalDiamonds";
import HoursDisplay from "../../components/Display/HoursDisplay";
import GoalsMessage from "../../components/Display/GoalsMessage";
import HomeScreenCard from "../../components/Goals/HomeScreenCard";
import { useMain } from "../../context/MainContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import SafeAreaView from "react-native-safe-area-view";
import { Ionicons } from "@expo/vector-icons";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { goals } = useMain();
  const { petname, familyname } = useAuth();
  const lastGoal = goals.length > 0 ? goals[goals.length - 1] : null;
  const navigation = useNavigation();
  const [hasGoals, setHasGoals] = useState(goals.length > 0);

  // Update `hasGoals` whenever `goals` changes
  useEffect(() => {
    setHasGoals(goals.length > 0);
  }, [goals]);

  // Load custom font using expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      setIsReady(true);
    }

  }, [fontsLoaded]);

  if (!isReady) {
    return null;
  }

  const handleOptionPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    // <SafeAreaProvider>
    <SafeAreaView style={[styles.container]}>
      {/* Header with menu button and greeting */}
      <View style={[styles.header]}>
        <TouchableOpacity
          style={[styles.menuContainer]}
          onPress={() => {
            console.log("Menu button pressed");
            navigation.navigate("PetDetails");
          }}
        >
          <Text style={[styles.menu]}>☰</Text>
        </TouchableOpacity>

        <Text style={[styles.title]}>
          Welcome to {"\n"}
          {petname}'s home!
        </Text>

        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => handleOptionPress("HelpScreen")}
        >
          <Ionicons name="help-circle-outline" size={30} color="#007BFF" />
        </TouchableOpacity>
      </View>

      {/* Row containing GoalsMessage and TotalDiamonds */}
      <View style={[styles.rowContainer]}>
        <GoalsMessage
          onPress={() => {
            console.log("No goals button pressed");
            Alert.alert("No upcoming goals");
          }}
        />

        <TotalDiamonds value={100} />
      </View>

      {/* Display the last goal card if it exists */}
      <View style={[styles.existingGoal]}>
        {lastGoal ? (
          <HomeScreenCard
            goal={lastGoal.goal}
            time={lastGoal.time}
            diamonds={lastGoal.diamonds}
          />
        ) : null}
      </View>

      {/* Main content area including hours display and pet image */}
      <View style={[styles.content]}>
        <View style={styles.overlayContainer}>
          <HoursDisplay />
        </View>

        <View style={[styles.petContainer]}>
          <Pressable
            onPress={() => navigation.navigate("PetDetails")}
            style={({ pressed }) => [
              styles.pet,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <Image
              source={require("../../assets/images/cat.png")}
              style={styles.petImage}
              resizeMode="stretch"
            />
          </Pressable>
        </View>

        <View style={[styles.bottomArea]}></View>
      </View>
    </SafeAreaView>
    // </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7E4C6",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  menuContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 18,
    position: "absolute",
    left: 0,
    zIndex: 10,
  },
  menu: {
    fontSize: 30,
    fontFamily: "MarkoOne-Regular",
  },
  helpButton: {
    position: "absolute",
    right: 0,
    marginRight: 18,
  },
  title: {
    fontSize: 24,
    fontFamily: "MarkoOne-Regular",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  existingGoal: {
    top: Dimensions.get("window").height * 0.04,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    // marginBottom: -Dimensions.get("window").height * 0.09,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayContainer: {
    position: "absolute",
    bottom: Dimensions.get("window").width * 0.7,
    width: "100%",
    alignItems: "center",
    zIndex: 20,
  },
  petContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    zIndex: 10,
  },
  pet: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 0.68,
    resizeMode: "contain",
  },
  petImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  bottomArea: {
    height: 300,
    backgroundColor: "#9C8B71",
    width: Dimensions.get("window").width * 1.5,
    position: "absolute",
    marginBottom: -50,
    marginLeft: -40,
    bottom: 0,
    zIndex: -1,
  },
});
