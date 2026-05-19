import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({ id: "talent-iq" });

// ✅ Create / Sync User
const syncUser = inngest.createFunction(
  {
    id: "sync-user",
    triggers: { event: "clerk/user.created" }, // 🔥 NEW SYNTAX
  },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } = event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses?.[0]?.email_address || "",
      name: [first_name, last_name].filter(Boolean).join(" "),
      profileImage: image_url,
    };

    // ✅ Prevent duplicate users
    await User.findOneAndUpdate(
      { clerkId: id },
      newUser,
      { upsert: true, new: true }
    );

    // ✅ Stream user sync
    try {
      await upsertStreamUser({
        id: id.toString(),
        name: newUser.name,
        image: newUser.profileImage,
      });
    } catch (err) {
      console.error("Stream error:", err.message);
    }
  }
);

// ✅ Delete User
const deleteUserFromDB = inngest.createFunction(
  {
    id: "delete-user-from-db",
    triggers: { event: "clerk/user.deleted" }, // 🔥 NEW SYNTAX
  },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;

    await User.deleteOne({ clerkId: id });

    try {
      await deleteStreamUser(id.toString());
    } catch (err) {
      console.error("Stream delete error:", err.message);
    }
  }
);

// ✅ Export all functions
export const functions = [syncUser, deleteUserFromDB];