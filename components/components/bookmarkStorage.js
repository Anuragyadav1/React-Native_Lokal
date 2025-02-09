// bookmarkStorage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const BOOKMARKS_KEY = "bookmarks";

export const getBookmarks = async () => {
  const data = await AsyncStorage.getItem(BOOKMARKS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveBookmark = async (job) => {
  const bookmarks = await getBookmarks();
  if (!bookmarks.some((item) => item.id === job.id)) {
    const newBookmarks = [...bookmarks, job];
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
  }
};

export const removeBookmark = async (jobId) => {
  const bookmarks = await getBookmarks();
  const updatedBookmarks = bookmarks.filter((item) => item.id !== jobId);
  await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
};