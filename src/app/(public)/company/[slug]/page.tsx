interface PageProps {
  params: Promise<{ slug: string }>;
}
const CompanyProfilePage = async ({ params }: PageProps) => {
  const { slug } = await params;
  return <div>{slug}</div>;
};
export default CompanyProfilePage;
