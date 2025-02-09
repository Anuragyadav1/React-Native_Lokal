import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BookmarkButton from "./BookmarkButton";

export default function JobCard({ job, onPress, onBookmarkChange }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      
      {/* Full-width Image */}
      <View style={styles.imageContainer}>
        {job.creatives?.length > 0 && job.creatives[0]?.thumb_url ? (
          <Image source={{ uri: job.creatives[0].thumb_url }} style={styles.image} />
        ) : (
          <Ionicons name="image-outline" size={60} color="#ccc" />
        )}
      </View>

      {/* Job Details */}
      <View style={styles.details}>
        <Text style={styles.companyName}>{job.company_name}</Text>
        {/* <Text style={styles.jobRole}>{job.job_role} ({job.job_hours})</Text> */}

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={16} color="#555" />
          <Text style={styles.locationText}>{job.job_location_slug}</Text>
        </View>
{/* 
        <View style={styles.infoRow}>
          <Ionicons name="id-card-outline" size={16} color="#777" />
          <Text style={styles.jobId}>Job ID: {job.id}</Text>
        </View> */}
        <View style={styles.section}>
          <Ionicons name="cash-outline" size={15} color="#555" />
          <Text style={styles.detailText}>{job.salary_min ? `₹${job.salary_min} - ₹${job.salary_max}` : "Salary Not Disclosed"}</Text>
        </View>
        

        {/* Bookmark Button Below All Fields */}
        <BookmarkButton job={job} onBookmarkChange={onBookmarkChange} />
      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingBottom: 12,
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: 120,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  details: {
    width: "90%",
    marginTop: 10,
    alignItems: "center", // Centering content
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  jobRole: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
    textAlign: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  jobId: {
    fontSize: 12,
    color: "#777",
    marginLeft: 4,
  },
});
