import BackButton from "@/components/Global/BackButton";
import Container from "@/components/Global/Container";

interface PageProps {
  params: Promise<{ id: string }>;
}
export const metadata = {
  title: "User Details",
  description: "View user details",
};
const UserDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;
  return (
    <Container>
      <BackButton className="mt-5" />
    </Container>
  );
};
export default UserDetailsPage;

const UserDetailsDataLoader = async (id: string) => {};
