import NoteMeta from "./note-meta";

export default function TextNote({
  text,
  date,
}: {
  text: string;
  date?: string;
}) {
  return (
    <div className="p-2">
      <p className="text-sm sm:text-base md:text-lg text-left whitespace-pre-wrap">
        {text}
      </p>
      <NoteMeta description={""} date={date} />
    </div>
  );
}
