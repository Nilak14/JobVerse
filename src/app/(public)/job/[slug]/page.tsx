interface PageProps {
  params: Promise<{ slug: string }>;
}
const JobDescriptionPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  return <div>{slug}</div>;
};
export default JobDescriptionPage;
