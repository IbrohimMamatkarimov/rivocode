interface VideoPlayerProps {
  videoId: string;
  title: string;
  // Seconds into the video this lesson's segment begins. Omit (or 0) to
  // start from the beginning.
  startSeconds?: number;
}

export function VideoPlayer({ videoId, title, startSeconds }: VideoPlayerProps) {
  const startParam = startSeconds ? `&start=${Math.max(0, Math.floor(startSeconds))}` : "";
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-black shadow-elevated">
      <div className="relative aspect-video w-full">
        <iframe
          className="absolute inset-0 h-full w-full"
          // iv_load_policy=3 hides the creator's own annotation/end cards
          // (the channel-branding overlay some videos show mid-playback).
          // rel=0 + modestbranding=1 minimize related-video and logo chrome.
          // YouTube's own small watermark/link is required by their embed
          // terms and can't be removed by the embedding site.
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&iv_load_policy=3${startParam}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}
