interface CompanySettingsHeaderProps {
  title: string;
  description: string;
}
const CompanySettingsHeader = ({
  description,
  title,
}: CompanySettingsHeaderProps) => {
  return (
    <div className="mb-5 space-y-2">
      <h2 className="text-xl">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
export default CompanySettingsHeader;
