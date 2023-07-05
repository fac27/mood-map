import getSessionServer from "./server/session";
import supabaseServer from "./client";

// export async function getUserEntries(user) {
//     const userId = user.userId

// }

//chatGPT
export default async function getUserEntries(id) {
  const { data, error } = await supabaseServer()
    .from("entries")
    .select("*")
    .eq("user_id", id);

  if (error) {
    console.error("Error fetching user entries:", error);
    throw error;
  }
  console.log(data);
  return data;
}

export const entries = async () => {
  const { id } = await getSessionServer();
  return getUserEntries(id);
};

//   //other chatGPT part
//   export default async function getSessionServer() {
//     const {
//       data: { session },
//     } = await supabaseServer().auth.getSession();

//     // Assume checkUser() will return a user object that includes the user's ID
//     const user = await checkUser(session);

//     // Get the user's entries
//     user.entries = await getUserEntries(user.id);

//     return user;
//   }

// const {

//     data: { session },
//   } = await supabaseBrowser.auth.getSession();

//   const user = session.user;
//   mood.user_id = user.id;
//   mood.mood = emotion;
//   const { error } = await supabaseBrowser.from("entries").insert(mood);
//   console.log(`ERROR: ${JSON.stringify(error)}`);
//   if (error === null) link.current.click();
