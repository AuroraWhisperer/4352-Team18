import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Alert,
} from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuContainer}
          onPress={() => {
            console.log("Menu button pressed");
            Alert.alert("Menu button pressed");
          }}
        >
          <Text style={styles.menu}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Welcome to {"\n"}Luna's home!</Text>
      </View>

      <View style={styles.rowContainer}>
        <TouchableOpacity>
          <Text style={styles.noGoals}>No Upcoming Goals</Text>
        </TouchableOpacity>

        <View style={styles.currencyContainer}>
          <View style={styles.currency}>
            <Image
              source={require("../assets/images/diamond.png")}
              style={styles.diamond}
            />
            <Text style={styles.currencyText}>100</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.petAndHoursContainer}>
          <TouchableOpacity style={styles.hoursTouchable}>
            <Text style={styles.hours}>Hours spent today: 0 hr</Text>
          </TouchableOpacity>

          <View style={styles.petContainer}>
            <Image
              source={require("../assets/images/cat.png")}
              style={styles.pet}
              resizeMode="stretch"
            />
          </View>
        </View>

        {/* 新增的底部区域 */}
        <View style={styles.bottomArea}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7E4C6",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
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
    paddingHorizontal: 20, // 调整两边的留白
  },
  noGoals: {
    fontSize: 16,
    textDecorationLine: "underline",
    fontWeight: "500",
  },
  currencyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  currency: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  currencyText: {
    marginLeft: 15,
    fontSize: 16,
    marginRight: 5,
    fontWeight: "700",
  },
  diamond: {
    width: 20,
    height: 20,
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
  hoursTouchable: {
    marginBottom: 10, // 调整为与猫图片之间的距离
    alignItems: "center",
  },
  hours: {
    fontSize: 20,
    fontWeight: "500",
    textDecorationLine: "underline",
    textAlign: "center",
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
