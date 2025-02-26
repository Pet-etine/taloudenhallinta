import { getDatabase, ref, set } from "firebase/database"; // Correct imports for Firebase Realtime Database
import { db } from "../components/App/firebase"; // Import db from your firebase.js

const uploadData = async (data) => {
    console.log("🔍 Debug: Received data:", data);

    // Extract the correct key from JSON
    if (!Array.isArray(data)) {
        if (data["All Items _Entire List_"] && Array.isArray(data["All Items _Entire List_"])) {
            data = data["All Items _Entire List_"];
        } else {
            console.error("❌ Error: Data is not a valid array!", data);
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