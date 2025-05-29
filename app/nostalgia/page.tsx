import { getNotes } from "@/lib/actions";
import NotesPage from "./notes";

export default async function NostalgiaPage() {
  const resp = await getNotes({ all: true });
  if (resp.status != 200) {
    console.error(resp.error);
    return (
      <div>"An Error occured while retrieving the notes:" {resp.error}</div>
    );
  }
  // console.log(resp.notes);
  return (
    <>
      <NotesPage notesInfo={resp.notes} />
    </>
  );
}
