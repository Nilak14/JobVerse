import Link from "next/link";

interface RegisterLinksProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const RegisterLinks = ({ children, href, className }: RegisterLinksProps) => {
  return (
    <div className={className}>
      <Link href={href}>{children}</Link>
    </div>
  );
};
export default RegisterLinks;
