import { AuthGuard } from "@/modules/auth/ui/components/auth-guard";
import { InvitationView } from "@/modules/organizations/ui/views/invitation-view";

const Page = async (props: PageProps<"/invite/[invitationId]">) => {
  const invitationId = (await props.params).invitationId;

  return (
    <AuthGuard>
      <InvitationView invitationId={invitationId} />
    </AuthGuard>
  );
}

export default Page; 