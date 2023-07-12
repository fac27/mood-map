export default async function getRecentlyPlayedSong(
  session: any,
  dateString: string,
  limit: number
) {
  const date = new Date(dateString).getTime();
  const startOfDay = date - (date % 86400000);
  // Convert the dates to Unix timestamps in milliseconds
  const before = startOfDay + 86400000;
  const params = `?limit=${limit}&before=${before}`;

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/recently-played${params}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.provider_token}`,
        },
      }
    );
    console.log("🎶", response.status);
    const responseJson = await response.json();
    // const tracks = responseJson.items.track.href;
    const trackHrefs = responseJson.items.map((item: any) => item.track.href);

    return trackHrefs;
  } catch (e) {
    console.error("❌", e);
  }
}
