import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // Import this
import { getBookmarks } from "../storage/bookmarkStorage";
import JobCard from "../components/JobCard";

export default function BookmarksScreen() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  // Fetch bookmarks whenever the page is focused
  useFocusEffect(
    React.useCallback(() => {
      const loadBookmarks = async () => {
        const bookmarks = await getBookmarks();
        setBookmarkedJobs(bookmarks);
      };
      loadBookmarks();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmarked Jobs</Text>
      <FlatList
        data={bookmarkedJobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <JobCard job={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
});
