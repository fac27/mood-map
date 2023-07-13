export default async function getRecentlyPlayedSong(
  session: any,
  dateString: string,
  limit: number
) {
  const date = new Date(dateString);
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));

  // Convert the dates to Unix timestamps in milliseconds
  const after = startOfDay.getTime();

  const params = `?limit=50&after=${after}&before=${after}&after&after=${after}`;

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
        console.error(
          "Service didn't reply before timeout. Please try again later."
        );
      } else {
        throw new Error("HTTP error " + response.status);
      }
    } else {
      const responseJson = await response.json();
      console.log("😡", responseJson);
      const trackHrefs = Array.isArray(responseJson.items)
        ? responseJson.items.map((item: any) => ({
            url: item.track.external_urls.spotify,
            time: item.played_at,
          }))
        : [];
      const track = trackHrefs.find(
        (track: any) => new Date(track.played_at).getTime() <= after
      );
      console.log(track);
      return track.url;
    }
  } catch (e) {
    console.error("❌", e);
  }
}
