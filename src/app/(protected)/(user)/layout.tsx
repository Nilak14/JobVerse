import { storeUserLocation } from "@/actions/user/storeLoc";

const UserTypePageLayout = async ({
  children,
}: {
  children: React.ReactElement;
}) => {
  await storeUserLocation();
  return <div>{children}</div>;
};
export default UserTypePageLayout;
