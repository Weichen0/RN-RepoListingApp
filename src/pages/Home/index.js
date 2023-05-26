import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import RepoCard from "../../component/RepoCard";
import { connect } from "react-redux";
import {
  GET_NEXT_PAGE,
  GET_REPO_REQUEST,
  SET_SEARCH_QUERY,
} from "../../../redux/repo/actions";

function mapStateToProps(state, props) {
  return state;
}

const mapDispatchToProps = (dispatch, props) => ({
  fetchRepoData: () => {
    dispatch({
      type: GET_REPO_REQUEST,
    });
  },
  getNextPage: () => {
    dispatch({
      type: GET_NEXT_PAGE,
    });
  },
  setSearchQuery: (searchInput) => {
    dispatch({
      type: SET_SEARCH_QUERY,
      payload: { searchQuery: searchInput },
    });
  },
});

function HomePageView({
  navigation,
  repoList,
  responseCache,
  isFetching,
  error,
  hasMore,
  fetchRepoData,
  getNextPage,
  setSearchQuery,
  page,
  searchQuery,
}) {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchRepoData();
  }, []);

  function handleSearchInputChange(text) {
    setSearchInput(text);
  }

  let debounceTimer;
  useEffect(() => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchInput]);

  // Infinite Scroll Loader Component
  function ListFooter() {
    if (!repoList?.length) return null;
    return (
      <>
        {hasMore ? (
          <View style={{ paddingVertical: 16 }}>
            <ActivityIndicator />
          </View>
        ) : (
          <View>
            <Text
              style={{
                color: "#7A7A7A",
                textAlign: "center",
                paddingVertical: 12,
                fontSize: 14,
              }}
            >
              Shown {responseCache?.total_count ?? 0} results
            </Text>
          </View>
        )}
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.pageContainer}>
        <View style={styles.pageContent}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Home Page</Text>
          <View>
            <TextInput
              onChangeText={handleSearchInputChange}
              style={{
                padding: 8,
                marginVertical: 8,
                borderWidth: 1,
                borderColor: "#E1E1E1",
                borderRadius: 100,
                // placeholderTextColor: "#E1E1E1",
              }}
              placeholder="Search"
            />
          </View>
          {error?.message ? (
            <Text style={{ color: "red" }}> Error: {error?.message}</Text>
          ) : null}

          {searchQuery ? (
            <Text style={{ fontWeight: "bold" }}>
              Searching for "{searchQuery}"
            </Text>
          ) : null}
          <Text style={{ fontWeight: "bold", color: "#7A7A7A" }}>
            Showing {repoList?.length ?? 0} of {responseCache?.total_count ?? 0}{" "}
            Results
          </Text>
        </View>

        {repoList?.length ? (
          <FlatList
            style={styles.scrollContainer}
            data={repoList}
            renderItem={({ item }) => <RepoCard item={item} />}
            keyExtractor={(item) => item?.id.toString()}
            onEndReached={getNextPage}
            onEndReachedThreshold={0.5}
            ListFooterComponent={<ListFooter />}
          />
        ) : !isFetching && !repoList?.length ? (
          <View style={{ textAlign: "center", paddingVertical: 50 }}>
            <Text>No Data</Text>
            {searchQuery?.length ? (
              <Text> {`Searching For "${searchQuery}"`} </Text>
            ) : null}
          </View>
        ) : (
          <ActivityIndicator size="large" style={{ paddingVertical: 100 }} />
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pageContent: {
    padding: 16,
    maxWidth: 500,
    width: "100%",
    marginHorizontal: "auto",
  },
  scrollContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    maxWidth: 500,
    marginHorizontal: "auto",
  },
  heading: {
    fontWeight: "bold",
  },
});

const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePageView);

export default HomePage;
