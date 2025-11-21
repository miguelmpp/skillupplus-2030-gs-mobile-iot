import React from "react";
import { StyleSheet, View } from "react-native";

type ProgressBarProps = {
  /** valor entre 0 e 1 */
  progress: number;
};

export function ProgressBar({ progress }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(progress, 1)); // garante 0..1

  return (
    <View style={styles.container}>
      <View style={[styles.fill, { width: `${clamped * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 12,
    borderRadius: 999,
    backgroundColor: "#020617",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  fill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#22c55e",
  },
});
