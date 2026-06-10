import { InvitationClient } from "./_components/InvitationClient";
import { EnvelopeLoader } from "./_components/EnvelopeLoader";

export default function Page() {
  return (
    <EnvelopeLoader>
      <InvitationClient pases={1} nombre="" />
    </EnvelopeLoader>
  );
}
