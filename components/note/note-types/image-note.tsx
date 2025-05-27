import NoteMeta from "./note-meta";

export default function ImageNote({
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
      <img
        src={src}
        alt={description}
        style={{ width: "100%", borderRadius: 8 }}
      />
      <NoteMeta description={description} date={date} />
    </div>
  );
}
