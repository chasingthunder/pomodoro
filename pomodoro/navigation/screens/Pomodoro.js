import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Pomodoro({ navigation }) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isResting, setIsResting] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          if (minutes > 0) {
            setSeconds(59);
            setMinutes((prevMinutes) => prevMinutes - 1);
          } else {
            if (isResting) {
              setIsResting(false);
              setMinutes(25); // Tempo de trabalho 
            } else {
              setIsResting(true);
              setMinutes(5); // Tempo de descanso 
            }
            setSeconds(0);
          }
        }
      }, 1000); 
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, isResting]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
    setMinutes(0);
  };

  const increaseTime = (resting) => {
    setIsResting(resting);
    if (minutes < 60) {
      setMinutes((prevMinutes) => prevMinutes + 1);
    }
  };

  const decreaseTime = (resting) => {
    setIsResting(resting);
    if (minutes > 0 || (minutes === 0 && seconds > 0)) {
      if (seconds === 0) {
        setMinutes((prevMinutes) => prevMinutes - 1);
        setSeconds(59);
      } else {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }
  };

  const buttonColor = isResting ? "#008000" : "#FF0000";
  const styles = getStyles(buttonColor);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{isResting ? "Hora do descanso" : "Hora de trabalhar"}</Text>
      <Text style={[styles.timer, { color: "white", fontSize: 60 }]}>
        {`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setIsActive(!isActive)}
          style={[styles.button, { backgroundColor: "#000" }]}
        >
          <Text style={{ color: "white", paddingHorizontal: 20, paddingVertical: 10 }}>
            {isActive ? "Pausar" : "Iniciar"}
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonSpacer} />
        <TouchableOpacity onPress={handleReset} style={[styles.button, { backgroundColor: "#000" }]}>
          <Text style={{ color: "white", paddingHorizontal: 20, paddingVertical: 10 }}>Reiniciar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomSubContainer}>
          <Text style={styles.bottomText}>Trabalho</Text>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity disabled={isActive && !isResting} onPress={() => decreaseTime(false)} style={[styles.bottomButton, { backgroundColor: buttonColor }]}>
              <Feather name="chevron-down" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity disabled={isActive && !isResting} onPress={() => increaseTime(false)} style={[styles.bottomButton, { backgroundColor: buttonColor }]}>
              <Feather name="chevron-up" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSubContainer}>
          <Text style={styles.bottomText}>Descanso</Text>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity disabled={isActive && isResting} onPress={() => decreaseTime(true)} style={[styles.bottomButton, { backgroundColor: buttonColor }]}>
              <Feather name="chevron-down" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity disabled={isActive && isResting} onPress={() => increaseTime(true)} style={[styles.bottomButton, { backgroundColor: buttonColor }]}>
              <Feather name="chevron-up" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const getStyles = (backgroundColor) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 36,
    marginBottom: 20,
    fontWeight: "bold",
  },
  timer: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    borderRadius: 5,
  },
  buttonSpacer: {
    width: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  bottomSubContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
  },
  bottomText: {
    color: "white",
    fontSize: 24,
    marginRight: 10,
  },
  bottomButtonContainer: {
    flexDirection: "row",
  },
  bottomButton: {
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
