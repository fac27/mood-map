export default async function getRecentlyPlayedSong(
  session: any,
  dateString: string,
  limit: number
) {
  const date = new Date(dateString);
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));

  // Convert the dates to Unix timestamps in milliseconds
  const after = startOfDay.getTime();

  const params = `?limit=${limit}&after=${after}`;

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
    const responseJson = await response.json();
    // const tracks = responseJson.items.track.href;
    const trackHrefs = responseJson.items.map((item: any) => item.track.href);

    return trackHrefs;
  } catch (e) {
    console.error("❌", e);
  }
}
