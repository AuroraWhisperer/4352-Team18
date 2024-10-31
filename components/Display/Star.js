import React from "react";
import { Image, StyleSheet, View } from "react-native";

const Star = ({ filled }) => {
  return (
    <View>
      <Image
        source={
          filled
            ? require("../../assets/images/star_filled.png")
            : require("../../assets/images/star_empty.png")
        }
        style={styles.heartImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heartImage: {
    width: 24,
    height: 24,
    margin: 2,
  },
});

export default Star;