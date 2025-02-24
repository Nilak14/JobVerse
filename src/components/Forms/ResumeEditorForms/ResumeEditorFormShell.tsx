import { PropsWithChildren } from "react";

interface ResumeEditorFormShellProps extends PropsWithChildren {
  title: string;
  description: string;
}
const ResumeEditorFormShell = ({
  description,
  title,
  children,
}: ResumeEditorFormShellProps) => {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
};
export default ResumeEditorFormShell;
