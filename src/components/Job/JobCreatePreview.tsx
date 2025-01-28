// "use client";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useIsTablet } from "@/hooks/use-tablet";
// import { useCreateJobStore } from "@/store/useCreateJobStore";
// const JobCreatePreview = () => {
//   const isTablet = useIsTablet();
//   return isTablet ? (
//     <Sheet>
//       <SheetTrigger>Open</SheetTrigger>
//       <SheetContent className="min-w-[95%] sm:min-w-[80%]">
//         <SheetHeader className="sr-only">
//           <SheetTitle>Your Job Preview</SheetTitle>
//           <SheetDescription>
//             This is how your job posting will look to job seekers after posting
//           </SheetDescription>
//         </SheetHeader>
//         <div className="mt-10">
//           <JobPreview />
//         </div>
//       </SheetContent>
//     </Sheet>
//   ) : (
//     <div className="mt-10 space-y-5  justify-center ">
//       <div>
//         <h2 className="text-xl font-semibold">Job Preview</h2>
//         <p className="text-sm text-muted-foreground">
//           This is how your job posting will look to job seekers after posting
//         </p>
//       </div>
//       <JobPreview />
//     </div>
//   );
// };
// export default JobCreatePreview;

// function JobPreview() {
//   const { job } = useCreateJobStore();
//   return (
//     <p>{JSON.stringify(job)}</p>
//     // <Tabs defaultValue="card">
//     //   <TabsList className="w-full grid grid-cols-2">
//     //     <TabsTrigger value="card">Card</TabsTrigger>
//     //     <TabsTrigger value="description">Description</TabsTrigger>
//     //   </TabsList>
//     //   <TabsContent value="card">
//     //     <div className="animate-fade-left">
//     //       Make changes to your account here.
//     //     </div>
//     //   </TabsContent>
//     //   <TabsContent value="description">
//     //     <div className="animate-fade-left">Change your password here.</div>
//     //   </TabsContent>
//     // </Tabs>
//   );
// }
const JobCreatePreview = () => {
  return <div>JobCreatePreview</div>;
};
export default JobCreatePreview;
