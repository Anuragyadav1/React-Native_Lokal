import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { saveBookmark, removeBookmark, getBookmarks } from "../storage/bookmarkStorage";

export default function BookmarkButton({ job, onRemoveBookmark }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const checkBookmark = async () => {
      const bookmarks = await getBookmarks();
      setBookmarked(bookmarks.some((item) => item.id === job.id));
    };
    checkBookmark();
  }, []);

  const toggleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(job.id);
      setBookmarked(false);
      if (onRemoveBookmark) {
        onRemoveBookmark(job.id); // ✅ Notify parent component to update UI instantly
      }
    } else {
      await saveBookmark(job);
      setBookmarked(true);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, bookmarked ? styles.removeButton : styles.addButton]}
      onPress={toggleBookmark}
    >
      <Text style={styles.text}>{bookmarked ? "Remove Bookmark" : "Bookmark"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { padding: 8, borderRadius: 5, marginTop: 10 },
  addButton: { backgroundColor: "blue" },
  removeButton: { backgroundColor: "red" },
  text: { color: "white", textAlign: "center" }
});
