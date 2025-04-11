import { AllUserColumn } from "@/columns/all-user-column";
import AdminAllUserTable from "@/components/Table/AdminAllUserTable";
import BoxReveal from "@/components/ui/box-reveal";
import { getAllUser } from "@/data-access/users/getAllUser";
import { Suspense } from "react";

export const metadata = {
  title: "All Users",
  description: "All Users",
};
const AllUser = () => {
  return (
    <section className="space-y-10">
      <BoxReveal>
        <div className="space-y-3">
          <h1 className=" text-xl md:text-2xl font-semibold tracking-tighter">
            User Management
          </h1>
          <p className="text-sm text-muted-foreground  tracking-wide">
            View and manage all users in the system
          </p>
        </div>
      </BoxReveal>
      <Suspense fallback={<div>Loading...</div>}>
        <AllUserDataLoader />
      </Suspense>
    </section>
  );
};
export default AllUser;

const AllUserDataLoader = async () => {
  const users = await getAllUser();

  return (
    <>
      <AdminAllUserTable
        showSerialNumber
        showPagination
        columns={AllUserColumn}
        data={users}
      />
    </>
  );
};
