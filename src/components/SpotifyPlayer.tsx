"use client";

export function Player({ href }: { href: string }) {
  const track = href.split('/')
  track.splice(3, 0, 'embed')
  return (
    <iframe
      style={{ borderRadius: "12px", border: "none" }}
      src={track.join('/')}
      width="100%"
      height="200"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
}
