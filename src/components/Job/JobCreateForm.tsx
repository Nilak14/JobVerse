// "use client";
// import { Job } from "@prisma/client";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { CreateJobSchema, CreateJobSchemaType } from "@/schema/CreateJobSchema";
// import { useCreateJobStore } from "@/store/useCreateJobStore";
// import { useEffect } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface JobCreatePageProps {
//   job: Job;
// }
// const JobCreateForm = ({ job }: JobCreatePageProps) => {
//   const form = useForm<CreateJobSchemaType>({
//     defaultValues: {
//       title: job.title,
//       totalHeads: "0",
//     },
//     mode: "onChange",
//     resolver: zodResolver(CreateJobSchema),
//   });
//   const { setJob } = useCreateJobStore();

//   useEffect(() => {
//     const { unsubscribe } = form.watch(async (value) => {
//       const isValid = await form.trigger();
//       if (!isValid) return;
//       if (isValid) {
//         setJob({ ...value });
//       }
//     });
//     return unsubscribe;
//   }, [form]);

//   const onSubmit = (data: CreateJobSchemaType) => {
//     console.log(data);
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-8 mt-5 pr-10"
//       >
//         <FormField
//           control={form.control}
//           name="title"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Title</FormLabel>
//               <FormControl>
//                 <Input placeholder="Eg: Sales Manager" {...field} />
//               </FormControl>

//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="totalHeads"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Number of people to hire for this job</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a verified email to display" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="1">1</SelectItem>
//                   <SelectItem value="2">2</SelectItem>
//                   <SelectItem value="3">3</SelectItem>
//                   <SelectItem value="4">4</SelectItem>
//                   <SelectItem value="5">5</SelectItem>
//                   <SelectItem value="5">5</SelectItem>
//                 </SelectContent>
//               </Select>

//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// };
// export default JobCreateForm;

const JobCreateForm = () => {
  return <div>JobCreateForm</div>;
};
export default JobCreateForm;
