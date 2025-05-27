import NoteMeta from "./note-meta";

export default function AudioNote({
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
      <audio controls style={{ width: "100%" }}>
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <NoteMeta description={description} date={date} />
    </div>
  );
}
