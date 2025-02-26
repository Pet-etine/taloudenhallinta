import { getDatabase, ref, set } from "firebase/database"; // Correct imports for Firebase Realtime Database
import { db } from "../components/App/firebase"; // Import db from your firebase.js

const uploadData = async (data) => {
    console.log("🔍 Debug: Received data:", data);

    // Extract specific key from the JSON object
    if (!Array.isArray(data)) {
        if (data["All Items _Entire List_"] && Array.isArray(data["All Items _Entire List_"])) {
            data = data["All Items _Entire List_"];  // Use only the items array
        } else {
            console.error("❌ Error: Could not extract valid item list from JSON!", data);
            return;
        }
    }

    try {
        const database = getDatabase();
        for (const item of data) {
            console.log("✅ Uploading item:", item);
            await set(ref(database, `items/${item["Form ID"]}`), item);
        }
        console.log("✅ Data uploaded successfully!");
    } catch (error) {
        console.error("❌ Error uploading data:", error);
    }
};


export default uploadData;
