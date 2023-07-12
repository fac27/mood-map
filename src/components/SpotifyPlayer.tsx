'use client'

export function Player({href: href}:{href: string}) {
    const trackId = href.split('/').at(-1)
    return (<iframe style={{borderRadius:'12px', border: 'none'}} src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`} width="100%" height="200" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>)
}