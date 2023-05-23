import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Svg, Path } from "react-native-svg";

function ForksIcon() {
  return (
    <Svg
      aria-hidden="true"
      height={16}
      viewBox="0 0 16 16"
      version="1.1"
      width={16}
      data-view-component="true"
      className="octicon octicon-repo-forked mr-2"
      fill="#7A7A7A"
    >
      <Path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
    </Svg>
  );
}
function StarsIcon() {
  return (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="#7A7A7A"
      className="octicon octicon-star mr-2"
      aria-hidden="true"
      data-view-component="true"
    >
      <Path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z" />
    </Svg>
  );
}
function WatchersIcon() {
  return (
    <Svg
      aria-hidden="true"
      height="16"
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      data-view-component="true"
      className="octicon octicon-eye mr-2"
      fill="#7A7A7A"
    >
      <Path d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z" />
    </Svg>
  );
}

const icons = {
  forks: <ForksIcon />,
  stars: <StarsIcon />,
  watchers: <WatchersIcon />,
};

// Component for stats
function Stamp({ label, value }) {
  return (
    <View style={styles.stamps}>
      <View style={styles.stampLabel}>{label}</View>
      <Text style={styles.stampValue}>{value}</Text>
    </View>
  );
}

export default function ViewRepoPage({ navigation, route }) {
  const { item } = route.params ?? {};
  const {
    owner,
    name,
    description,
    forks_count,
    watchers_count,
    stargazers_count,
    language,
  } = item ?? {};
  const { avatar_url } = owner ?? {};

  // Back nav
  function handleBack() {
    navigation.navigate("Home");
  }

  return (
    <>
      <SafeAreaView style={styles.pageContainer}>
        <View style={styles.pageContent}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity title="" onPress={handleBack}>
              <Text style={{ fontWeight: 500, color: "blue" }}>{`< Back`}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 12,
                marginVertical: 16,
                borderWidth: 1,
                borderColor: "#E1E1E1",
              }}
              source={{ uri: avatar_url }}
              alt={avatar_url}
            />

            <Text style={{ fontWeight: "bold", fontSize: 24 }}>{name}</Text>
            <View style={{ marginTop: 8 }}>
              <Text style={{ color: "blue" }}>{language}</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              {forks_count ? (
                <Stamp value={forks_count} label={icons?.forks} />
              ) : null}
              {watchers_count ? (
                <Stamp value={watchers_count} label={icons?.watchers} />
              ) : null}
              {stargazers_count ? (
                <Stamp value={stargazers_count} label={icons?.stars} />
              ) : null}
            </View>
            <Text style={{ fontSize: 14, marginTop: 8 }}>{description}</Text>

            {/* <Text
          style={{
            marginTop: 100,
            borderTopWidth: 1,
            borderTopColor: "black",
          }}
        >
          {JSON.stringify(item)}
        </Text> */}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  pageContainer: { backgroundColor: "white", minHeight: "100%" },
  pageContent: {
    padding: 16,
    maxWidth: 500,
    width: "100%",
    marginHorizontal: "auto",
  },
  stamps: {
    margin: 1,
    padding: 6,
    borderRadius: 4,
    backgroundColor: "white",
    borderColor: "#E1E1E1",
    borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  stampLabel: {
    display: "flex",
    marginRight: 8,
    alignSelf: "center",
    justifyContent: "center",
    color: "#7A7A7A",
  },
  stampValue: {
    alignSelf: "center",
    color: "#7A7A7A",
  },
});
