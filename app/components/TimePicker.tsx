
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { TimerPicker, TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient"; // or `import LinearGradient from "react-native-linear-gradient"`
import { Audio } from "expo-av"; // for audio feedback (click sound as you scroll)
import * as Haptics from "expo-haptics"; // for haptic feedback

const TimePickerComponent = () => {
    const [duration, setDuration] = useState({ hours: 0, minutes: 0, seconds: 0 });


    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [showPickerExample1, setShowPickerExample1] = useState(false);
    const [showPickerExample2, setShowPickerExample2] = useState(false);
    const [alarmStringExample1, setAlarmStringExample1] = useState<
        string | null
    >(null);
    const [alarmStringExample2, setAlarmStringExample2] = useState<
        string | null
    >(null);

    const formatTime = ({
        hours,
        minutes,
        seconds,
    }: {
        hours?: number;
        minutes?: number;
        seconds?: number;
    }) => {
        const timeParts = [];

        if (hours !== undefined) {
            timeParts.push(hours.toString().padStart(2, "0"));
        }
        if (minutes !== undefined) {
            timeParts.push(minutes.toString().padStart(2, "0"));
        }
        if (seconds !== undefined) {
            timeParts.push(seconds.toString().padStart(2, "0"));
        }

        return timeParts.join(":");
    };
    const { width: screenWidth } = useWindowDimensions();
    return (
        <View style={styles.container}>
            <Text >Set Alarm Duration</Text>
            <View
                style={[
                    styles.container,
                    styles.page1Container,
                    { width: screenWidth },
                ]}>
                <Text style={styles.textDark}>
                    {alarmStringExample1 !== null
                        ? "Alarm set for"
                        : "No alarm set"}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setShowPickerExample1(true)}>
                    <View style={styles.touchableContainer}>
                        {alarmStringExample1 !== null ? (
                            <Text style={styles.alarmTextDark}>
                                {alarmStringExample1}
                            </Text>
                        ) : null}
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setShowPickerExample1(true)}>
                            <View style={styles.buttonContainer}>
                                <Text
                                    style={[styles.button, styles.buttonDark]}>
                                    Set Alarm 🔔
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <TimerPickerModal
                    Audio={Audio}
                    closeOnOverlayPress
                    Haptics={Haptics}
                    LinearGradient={LinearGradient}
                    modalProps={{
                        overlayOpacity: 0.2,
                    }}
                    modalTitle="Set Alarm"
                    onCancel={() => setShowPickerExample1(false)}
                    onConfirm={(pickedDuration) => {
                        setAlarmStringExample1(formatTime(pickedDuration));
                        setShowPickerExample1(false);
                    }}
                    setIsVisible={setShowPickerExample1}
                    styles={{
                        theme: "dark",
                    }}
                    visible={showPickerExample1}
                />
            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    page1Container: {
        backgroundColor: "#514242",
    },
    page2Container: {
        backgroundColor: "#F1F1F1",
    },
    page3Container: {
        backgroundColor: "#202020",
    },
    page4Container: {
        backgroundColor: "#F1F1F1",
    },
    textDark: {
        fontSize: 18,
        color: "#F1F1F1",
    },
    textLight: {
        fontSize: 18,
        color: "#202020",
    },
    alarmTextDark: {
        fontSize: 48,
        color: "#F1F1F1",
    },
    alarmTextLight: {
        fontSize: 48,
        color: "#202020",
    },
    touchableContainer: {
        alignItems: "center",
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16,
        overflow: "hidden",
    },
    buttonDark: {
        borderColor: "#C2C2C2",
        color: "#C2C2C2",
    },
    buttonLight: { borderColor: "#8C8C8C", color: "#8C8C8C" },
    buttonContainer: {
        marginTop: 30,
    },
    chevronPressable: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        padding: 8,
    },
    chevronPressable_pressed: {
        opacity: 0.7,
    },
});
export default TimePickerComponent;