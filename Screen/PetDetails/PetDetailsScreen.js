import React from "react";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Star from "../../components/Display/Star";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export default function PetDetailsScreen() {
  // Load custom font using expo-font hook
  const [fontsLoaded] = useFonts({
    "MarkoOne-Regular": require("../../assets/fonts/MarkoOne-Regular.ttf"),
  });

  // Return loading state if fonts are not loaded
  if (!fontsLoaded) {
    return undefined;
  }

  const navigation = useNavigation();
  const { petname } = useAuth();

  return (
    // <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Back button to return to previous screen */}
        <TouchableOpacity
          style={styles.backContent}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../../assets/images/backButton.png")}
            style={styles.backImage}
          />
        </TouchableOpacity>

        {/* Pet image */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/PetDetailsTopImage.png")}
            style={styles.petImage}
          />
        </View>

        {/* Pet information */}
        <Text style={styles.title}>
          Welcome to {"\n"}
          {petname}'s house!
        </Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>Name: {petname}</Text>
          <Text style={styles.infoText}>Gender: Female</Text>
          <Text style={styles.infoText}>Age: 3</Text>
        </View>

        {/* Pet rating section */}
        <Text style={styles.conditionTitle}>RATING:</Text>
        <View style={styles.starContainer}>
          <Star filled={true} />
          <Star filled={true} />
          <Star filled={true} />
          <Star filled={false} />
          <Star filled={false} />
        </View>

        {/* Pet condition section */}
        <Text style={styles.conditionTitle}>CONDITION:</Text>
        <View style={styles.conditionContainer}>
          <View style={styles.conditionItem}>
            <Star filled={true} />
            <Text style={styles.conditionText}>HAPPY</Text>
          </View>

          <View style={styles.conditionItem}>
            <Star filled={false} />
            <Text style={styles.conditionText}>HUNGRY</Text>
          </View>

          <View style={styles.conditionItem}>
            <Star filled={true} />
            <Text style={styles.conditionText}>HEALTHY</Text>
          </View>
        </View>
      </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE9D4",
  },
  scrollContainer: {
    backgroundColor: "#FFE9D4",
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  backContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "absolute",
    top: Dimensions.get("window").height * 0.08,
    left: Dimensions.get("window").width * 0.08,
  },
  backImage: {
    width: 24,
    height: 24,
  },
  imageContainer: {
    marginTop: Dimensions.get("window").height * 0.1,
    marginBottom: Dimensions.get("window").height * 0.03,
  },
  petImage: {
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").width * 0.4,
  },
  title: {
    fontSize: 26,
    fontFamily: "MarkoOne-Regular",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginVertical: 10,
    width: "90%",
  },
  infoText: {
    fontSize: 16,
    fontFamily: "MarkoOne-Regular",
    marginVertical: 5,
  },
  conditionTitle: {
    fontSize: 22,
    fontFamily: "MarkoOne-Regular",
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  conditionContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  conditionItem: {
    alignItems: "center",
  },
  conditionText: {
    marginTop: 5,
    fontSize: 18,
    fontFamily: "MarkoOne-Regular",
  },
});
