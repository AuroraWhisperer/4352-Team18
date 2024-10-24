import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import CurrencyDisplay from "../../components/CurrencyDisplay";
import HoursDisplay from "../../components/HoursDisplay";
import GoalsMessage from "../../components/GoalsMessage";
import ExistingGoalCard from "../../components/ExistingGoalCard";
import { useApp } from "../../context/AppContext";

export default function HomeScreen() {
  const { goals } = useApp();
  const lastGoal = goals.length > 0 ? goals[goals.length - 1] : null;

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.header]}>
        <TouchableOpacity
          style={[styles.menuContainer]}
          onPress={() => {
            console.log("Menu button pressed");
            Alert.alert("Menu button pressed");
          }}
        >
          <Text style={[styles.menu]}>☰</Text>
        </TouchableOpacity>
        <Text style={[styles.title]}>Welcome to {"\n"}Luna's home!</Text>
      </View>

      <View style={[styles.rowContainer]}>
        <GoalsMessage
          onPress={() => {
            console.log("No goals button pressed");
            Alert.alert("No upcoming goals");
          }}
        />

        <CurrencyDisplay value={100} />
      </View>

      <View style={[styles.existingGoal]}>
        {lastGoal ? (
          <ExistingGoalCard
            goal={lastGoal.goal}
            time={lastGoal.time}
            diamonds={lastGoal.diamonds}
          />
        ) : null}
      </View>

      <View style={[styles.content]}>
        <View style={[styles.petAndHoursContainer]}>
          <HoursDisplay hours={0} />

          <View style={[styles.petContainer]}>
            <Image
              source={require("../../assets/images/cat.png")}
              style={[styles.pet]}
              resizeMode="stretch"
            />
          </View>
        </View>

        <View style={[styles.bottomArea]}></View>
      </View>
    </SafeAreaView>
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  menuContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 30,
    position: "absolute",
    left: 0,
    zIndex: 10,
  },
  menu: {
    fontSize: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  existingGoal: {
    top: Dimensions.get('window').height * 0.04,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  petAndHoursContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  petContainer: {
    justifyContent: "flex-end",
    zIndex: 1,
    alignItems: "center",
  },
  pet: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 0.8,
  },
  bottomArea: {
    height: 200,
    backgroundColor: "#9C8B71",
    width: Dimensions.get("window").width * 1.5,
    position: "absolute",
    marginBottom: -50,
    marginLeft: -40,
    bottom: 0,
    zIndex: -1,
  },
});
