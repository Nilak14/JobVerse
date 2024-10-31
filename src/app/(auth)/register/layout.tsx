import BackButton from "@/components/Global/BackButton";

interface LayoutProps {
  children: React.ReactNode;
}
const RegisterLayout = ({ children }: LayoutProps) => {
  return (
    <main className="relative">
      <div className="absolute top-4 left-4 z-10 lg:top-[7%] lg:left-7">
        <BackButton href="/" className="bg-black border border-gray-700" />
      </div>
      <div className="flex h-screen ">{children}</div>
    </main>
  );
};
export default RegisterLayout;
