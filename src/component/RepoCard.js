import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RepoCard(props) {
  const { owner, name, description, forks, watchers } = props?.item ?? {};
  const { avatar_url } = owner ?? {};

  const navigation = useNavigation();

  // View Repo Nav
  function handleCardPress() {
    navigation.navigate("ViewRepo", { item: props.item });
  }

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#E1E1E1",
          borderRadius: 10,
          padding: 8,
          marginVertical: 4,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              marginRight: 10,
            }}
            source={{ uri: avatar_url }}
            alt={avatar_url}
          />
          <Text style={{ fontWeight: "bold" }}>{name} </Text>
        </View>
        <Text style={{ fontSize: 12, marginTop: 8 }}>{description} </Text>
      </View>
    </TouchableOpacity>
  );
}
