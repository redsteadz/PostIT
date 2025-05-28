import Image from "next/image";
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
      <Image
        src={src}
        quality={60}
        loading="lazy"
        width={400}
        height={800}
        alt={description}
        style={{ width: "100%", borderRadius: 8 }}
      />
      <NoteMeta description={description} date={date} />
    </div>
  );
}
