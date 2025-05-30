"use client";
import { useEffect } from "react";
import NoteMeta from "./note-meta";
import Script from "next/script";

const YouTubeEmbed = ({ url }: { url: string }) => {
  // Grab the /{$ID} part from the url and place into
  // https://youtube.com/embed/{$ID}
  // The link can also be
  // https://www.youtube.com/watch?v={$ID}
  let id = url.split("/").pop();
  if (id && id?.includes("watch?v=")) {
    id = id.split("watch?v=").pop();
  }
  url = `https://youtube.com/embed/${id}`;

  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={url}
        title="YouTube video"
        className="min-h-72 w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const InstagramEmbed = ({ url }: { url: string }) => {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).instgrm?.Embeds) {
      (window as any).instgrm.Embeds.process();
    }
  }, [url]);
  return (
    <div className="relative w-full pt-[125%] min-h-52 sm:min-h-72">
      <blockquote
        className="instagram-media absolute top-0 left-0 w-full h-full"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ border: 0, margin: 0, padding: 0 }}
      />
      <Script src={"insta_embed.js"} />
    </div>
  );
};
export default function VideoNote({
  src,
  description,
  date,
}: {
  src: string;
  description: string;
  date?: string;
}) {
  if (src.includes("reel")) {
    return (
      <div>
        <InstagramEmbed url={src} />
        <NoteMeta description={description} date={date} />
      </div>
    );
  } else if (src.includes("youtube") || src.includes("youtu.be")) {
    return (
      <div>
        <YouTubeEmbed url={src} />
        <NoteMeta description={description} date={date} />
      </div>
    );
  }
  return (
    <div>
      <video controls style={{ width: "100%", borderRadius: 8 }}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <NoteMeta description={description} date={date} />
    </div>
  );
}
