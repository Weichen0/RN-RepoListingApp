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
import RepoCard from "../component/RepoCard";

export default function HomePage({ navigation }) {
  const [repoList, setRepoList] = useState([]); // list of repo data
  const [responseCache, setResponseCache] = useState({}); // storing repetitive data like total_counts from first load
  const [page, setPage] = useState(1); // page index
  const [searchQuery, setSearchQuery] = useState(""); // search query from text field
  const [error, setError] = useState(""); // error state
  const [hasMore, setHasMore] = useState(true); // infinite scroll cont state
  const [isFetching, setIsFetching] = useState(false); // loading state from api
  const [mutate, setMutate] = useState(false); // update page search req

  //fetch from git api and update states
  async function fetchRepoData() {
    if (!isFetching) {
      setIsFetching(true);
      try {
        const url = `https://api.github.com/search/repositories?q=topic:react-native${
          searchQuery.length
            ? `+in:title ${encodeURIComponent(`${searchQuery}`)}+in:iname`
            : ``
        }&page=${page}`;

        const response = await fetch(url, { method: "GET" });

        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }

        const data = await response.json();

        // Update data list
        setRepoList((repoList) => [...repoList, ...data.items]);

        // Save meta data
        setResponseCache({
          total_count: data.total_count ?? 0,
          incomplete_result: data.incomplete_result ?? false,
        });
      } catch (error) {
        setError(error);
      } finally {
        setIsFetching(false);
      }
    }
  }

  //next page
  function getNextPage() {
    if (hasMore && !isFetching) {
      setPage((page) => page + 1);
      setMutate(true);
    }
  }

  //set search query with debounce
  function handleSearchInputChange(text) {
    setSearchQuery(text);
  }

  // fetch data
  useEffect(
    function () {
      fetchRepoData();
      setMutate(false);
    },
    [mutate]
  );

  //check if infinite scroll still has more data
  useEffect(
    function () {
      if (repoList?.length >= responseCache?.total_count) {
        setHasMore(false);
      }
    },
    [repoList.length, responseCache.total_count]
  );

  //on search
  function searchHandler() {
    setPage(1);
    setError({});
    setHasMore(true);
    setRepoList([]);
    setResponseCache({});
    setMutate(true);
  }

  let debounceTimer;
  useEffect(
    function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchHandler();
      }, 500);
    },
    [searchQuery]
  );

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
      <StatusBar translucent barStyle="dark-content" />
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
                placeholderTextColor: "#E1E1E1",
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
