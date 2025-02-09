import React from "react";
import { 
  View, Text, Button, StyleSheet, TouchableOpacity, Linking, ScrollView, Image 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BookmarkButton from "../components/BookmarkButton";

export default function JobDetailScreen({ route }) {
  const { job } = route.params;

  const handleCallHR = () => {
    if (job.custom_link) {
      Linking.openURL(job.custom_link);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Full-width Job Image */}
      {job.creatives?.length > 0 && job.creatives[0]?.thumb_url ? (
        <Image source={{ uri: job.creatives[0].thumb_url }} style={styles.fullWidthImage} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Ionicons name="image-outline" size={80} color="#ccc" />
        </View>
      )}

      {/* Job Title & Company */}
      <View style={styles.headerText}>
        <Text style={styles.companyName}>{job.company_name}</Text>
      </View>

      {/* Job Details */}
      <View style={styles.section}><Text style={styles.detailText}>Job Id: {job.id || "Not mentioned"}</Text></View>
      <View style={styles.section}><Ionicons name="location-outline" size={20} color="#555" /><Text style={styles.detailText}>{job.job_location_slug}</Text></View>
      <View style={styles.section}><Ionicons name="briefcase-outline" size={20} color="#555" /><Text style={styles.detailText}>{job.job_role} ({job.job_hours})</Text></View>
      <View style={styles.section}><Ionicons name="cash-outline" size={20} color="#555" /><Text style={styles.detailText}>{job.salary_min ? `₹${job.salary_min} - ₹${job.salary_max}` : "Salary Not Disclosed"}</Text></View>
      <View style={styles.section}><Ionicons name="calendar-outline" size={20} color="#555" /><Text style={styles.detailText}>Experience: {job.primary_details?.Experience || "Not mentioned"}</Text></View>
      <View style={styles.section}><Ionicons name="call-outline" size={20} color="#555" /><Text style={styles.detailText}>Contact: {job.whatsapp_no || "Not mentioned"}</Text></View>
      <View style={styles.section}><Text style={styles.detailText}>Category: {job.job_category || "Not mentioned"}</Text></View>
      <View style={styles.section}><Text style={styles.detailText}>Applied: {job.num_applications || "Not mentioned"}</Text></View>
      <View style={styles.section}><Text style={styles.detailText}>Openings: {job.openings_count || "Not mentioned"}</Text></View>

      {/* Job Description */}
      <Text style={styles.subHeading}>Job Description</Text>
      <Text style={styles.description}>{job.title || "No description available"}</Text>

      {/* Call HR Button */}
      <TouchableOpacity style={styles.callButton} onPress={handleCallHR}>
        <Ionicons name="call-outline" size={20} color="#fff" />
        <Text style={styles.callButtonText}>{job.button_text || "Call HR"}</Text>
      </TouchableOpacity>

      {/* Bookmark Button */}
      <BookmarkButton job={job} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  fullWidthImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  imagePlaceholder: {
    width: "100%",
    height: 200,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    padding: 15,
    alignItems: "center",
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#666",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    paddingHorizontal: 15,
    color: "#444",
  },
  description: {
    fontSize: 16,
    paddingHorizontal: 15,
    color: "#666",
    marginBottom: 20,
  },
  callButton: {
    flexDirection: "row",
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
    marginTop: 15,
  },
  callButtonText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 8,
  },
});
