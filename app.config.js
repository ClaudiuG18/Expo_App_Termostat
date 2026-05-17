export default {
  expo: {
    name: "droidThermo",
    slug: "droidThermo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "droidthermo",
    userInterfaceStyle: "automatic",
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      predictiveBackGestureEnabled: false,
      package: "com.claudiughise.droidThermo",
    },
    plugins: [
      [
        "expo-build-properties",
        {
          android: {
            usesCleartextTraffic: true,
          },
        },
      ],
    ],
    extra: {
      eas: {
        projectId: "da3b71d1-431d-4eac-8548-fea98f71904f",
      },
    },
  },
};
