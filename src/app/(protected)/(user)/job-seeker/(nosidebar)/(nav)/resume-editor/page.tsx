import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";

export const metadata: Metadata = {
  title: "Design your resume",
  description: "Create and design your resume",
};
const ResumeEditorPage = () => {
  return <ResumeEditor />;
};
export default ResumeEditorPage;
