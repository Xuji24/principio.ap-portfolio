import { CredentialGrid } from "@/components/credentials/CredentialGrid";
import { getCredentials } from "@/lib/content/credentials";

export const metadata = { title: "Credentials — Angelo Principio" };

export default function CredentialsPage() {
  return (
    <CredentialGrid subtitle={`${getCredentials().length} certifications across AI, security and fundamentals.`} />
  );
}
