import ConnectLinkedin from "@/components/linkedin/ConnectLinkedin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Settings page for admin",
};
const SettingsPage = () => {
  return (
    <div>
      <ConnectLinkedin />
    </div>
  );
};
export default SettingsPage;
