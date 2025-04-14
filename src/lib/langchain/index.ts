import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
export const fetchAndExtractResumeText = async (resumeLink: string) => {
  const response = await fetch(resumeLink);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const loader = new PDFLoader(new Blob([arrayBuffer]));
  const docs = await loader.load();
  return docs.map((doc) => doc.pageContent).join("\n");
};
