import { Button } from "@/components/ui/button";
import Link from "next/link";

const MockInterviewPage = async () => {
  return (
    <>
      <h3>Mock Interview</h3>
      <Button asChild>
        <Link href="/job-seeker/generate-interview">Start Call</Link>
      </Button>
    </>
  );
};
export default MockInterviewPage;
