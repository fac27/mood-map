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
    if (!response.ok) {
      if (response.status === 504) {
        console.error("Service didn't reply before timeout. Please try again later.");
      } else {
        throw new Error('HTTP error ' + response.status);
      }
    } else {
    const responseJson = await response.json();
    console.log('😡',responseJson)
    // const tracks = responseJson.items.track.href;
    const trackHrefs = Array.isArray(responseJson.items)
    ? responseJson.items.map((item: any) => item.track.href)
    : [];
    return trackHrefs[trackHrefs.length - 1];
    }
  } catch (e) {
    console.error("❌", e);
  }
}
