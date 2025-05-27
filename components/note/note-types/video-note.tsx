import NoteMeta from "./note-meta";

export default function VideoNote({
  src,
  description,
  date,
}: {
  src: string;
  description: string;
  date?: string;
}) {
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
