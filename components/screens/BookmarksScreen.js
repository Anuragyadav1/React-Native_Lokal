import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getBookmarks, removeBookmark } from "../storage/bookmarkStorage";
import JobCard from "../components/JobCard";

export default function BookmarksScreen() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  const loadBookmarks = async () => {
    const bookmarks = await getBookmarks();
    setBookmarkedJobs(bookmarks);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadBookmarks();
    }, [])
  );

  // Function to remove a job from bookmarks immediately
  const handleRemoveBookmark = async (jobId) => {
    await removeBookmark(jobId);
    setBookmarkedJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId)); // ✅ Update UI instantly
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmarked Jobs</Text>
      <FlatList
        data={bookmarkedJobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JobCard job={item} onRemoveBookmark={handleRemoveBookmark} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
});
