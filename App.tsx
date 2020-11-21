import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
// import logo from "./assets/sparta.jpg";
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from "expo-sharing";

export default function App() {
  interface SelectedImageInfo {
    localUri: string;
  }

  // useStateを使って
  const [selectedImage, setSelectedImage] = React.useState<
    SelectedImageInfo | undefined
  >();

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("カメラロールへのアクセス許可が必要です！");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
    } else {
      const selectedUri = {};
      console.log(pickerResult);
      setSelectedImage({ localUri: pickerResult.uri });
    }
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`お使いのプラットフォームではシェア機能は利用できません`);
      return;
    } else if (selectedImage) {
      await Sharing.shareAsync(selectedImage.localUri);
    }
  };

  if (selectedImage !== (null || undefined)) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage ?.localUri }}
          style={styles.thumbnail}
        />
        <Pressable onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://bit.ly/2ULtog9" }} style={styles.logo} />
      <Text style={styles.instructions}>Hello, Sparta Camp!</Text>
      <Pressable onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
    resizeMode: "contain"
  },
  instructions: {
    color: "#195",
    fontSize: 18,
    marginHorizontal: 15
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 20,
    color: "#fff"
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
