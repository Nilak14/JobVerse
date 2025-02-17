// import { getJobByIdDescription } from "@/data-access/job/getJobForDescriptionById";
// import { Metadata } from "next";

// interface PageProps {
//   params: Promise<{ slug: string }>;
// }

// export const generateMetadata = async ({
//   params,
// }: PageProps): Promise<Metadata> => {
//   const { slug } = await params; // slug is job id here
//   const job = await getJobByIdDescription(slug);
//   if (!job) {
//     return {};
//   }
//   return {
//     title: `${job.title} at ${job.company.name}`,
//     description: job.description,
//   };
// };

// const JobDescriptionPage = async ({ params }: PageProps) => {
//   const { slug } = await params;
//   const job = await getJobByIdDescription(slug);
//   return <div>{slug}</div>;
// };
// export default JobDescriptionPage;

// pages/jobs/[id].tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  BriefcaseBusiness,
  Clock,
  DollarSign,
  BookOpen,
  Award,
  CheckCircle,
  Share2,
  Heart,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Dummy job data
const jobData = {
  id: "cl7g5xr9t0002j8kj8w8j8w8j",
  title: "Senior Frontend Developer",
  jobType: "Full-time",
  workMode: "Remote",
  location: "San Francisco, CA",
  categoryId: "cl7g5xr9t0003j8kj8w8j8w8j",
  category: { name: "Software Development" },
  subcategoryId: "cl7g5xr9t0004j8kj8w8j8w8j",
  subcategory: { name: "Frontend Development" },
  experienceLevel: "3-5 years",
  totalHeads: "2",
  Salary: {
    type: "Range",
    minAmount: 90000,
    maxAmount: 120000,
    currency: "USD",
    rate: "per year",
  },
  benefits: [
    "Health Insurance",
    "401(k) Matching",
    "Flexible Working Hours",
    "Remote Work Options",
    "Professional Development Budget",
  ],
  description: `
# About the Role
We're looking for a passionate Senior Frontend Developer to join our growing team. You'll be responsible for building user interfaces across our platform and ensuring a seamless user experience.

## Responsibilities
- Build reusable components and libraries for future use
- Implement responsive designs that work across all device sizes
- Ensure the technical feasibility of UI/UX designs
- Optimize application for maximum speed and scalability
- Collaborate with backend developers and designers

## Requirements
- 3-5 years of experience in frontend development
- Strong proficiency in JavaScript, including ES6+ features
- Experience with modern frontend frameworks (React, Vue, Angular)
- Knowledge of modern frontend build pipelines and tools
- Understanding of server-side rendering and its benefits
- Experience with responsive design and cross-browser compatibility
- Excellent problem-solving skills and attention to detail
`,
  tags: ["Frontend", "Remote", "React", "JavaScript", "UI/UX"],
  skills: [
    "React",
    "JavaScript",
    "CSS",
    "HTML",
    "TypeScript",
    "Next.js",
    "Redux",
  ],
  minEducationRequired:
    "Bachelor's degree in Computer Science or related field",
  deadline: new Date("2025-04-15"),
  isUrgent: true,
  isFeatured: true,
  status: "ACTIVE",
  company: {
    id: "cl7g5xr9t0005j8kj8w8j8w8j",
    name: "TechSolutions Inc.",
    logo: "/api/placeholder/100/100",
    website: "https://techsolutions-inc.com",
    size: "101-500 employees",
  },
  createdAt: new Date("2025-02-01"),
};

const JobDescriptionPage = () => {
  // const router = useRouter();
  // const { id } = router.query;
  const [job, setJob] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch the job data based on the ID
    if (true) {
      // Simulate API call
      setTimeout(() => {
        setJob(jobData);
      }, 500);
    }
  }, []);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl">Loading job details...</div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft size={16} /> Back to Jobs
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <Avatar className="h-20 w-20 rounded-md border p-2 bg-white">
                      <AvatarImage
                        src={job.company.logo}
                        alt={job.company.name}
                      />
                      <AvatarFallback className="text-xl font-bold">
                        {job.company.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold">{job.title}</h1>
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1 text-gray-600">
                          <BriefcaseBusiness size={16} />
                          {job.company.name}
                        </span>
                        <span className="flex items-center gap-1 text-gray-600">
                          <MapPin size={16} />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-gray-600">
                          <Clock size={16} />
                          Posted {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {job.isUrgent && (
                          <Badge variant="destructive" className="text-xs py-1">
                            Urgent
                          </Badge>
                        )}
                        {job.isFeatured && (
                          <Badge variant="secondary" className="text-xs py-1">
                            Featured
                          </Badge>
                        )}
                        <Badge className="text-xs py-1 bg-blue-100 text-blue-800 hover:bg-blue-100">
                          {job.jobType}
                        </Badge>
                        <Badge className="text-xs py-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                          {job.workMode}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Job Details */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: job.description
                          .replace(
                            /#\s(.*)/g,
                            '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>'
                          )
                          .replace(
                            /##\s(.*)/g,
                            '<h2 class="text-xl font-semibold mt-5 mb-3">$1</h2>'
                          )
                          .replace(/\n- (.*)/g, '<li class="ml-6">$1</li>')
                          .replace(/\n\n/g, "<br/><br/>"),
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Skills and Requirements */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">
                    Skills & Requirements
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Required Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-sm py-1.5 px-3"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {job.minEducationRequired && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">
                          Education
                        </h3>
                        <p className="flex items-center gap-2">
                          <BookOpen size={16} className="text-gray-400" />
                          {job.minEducationRequired}
                        </p>
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Experience
                      </h3>
                      <p className="flex items-center gap-2">
                        <Award size={16} className="text-gray-400" />
                        {job.experienceLevel}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <motion.div variants={itemVariants}>
              <Card className="overflow-hidden">
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-xl font-bold">Job Details</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Salary</span>
                      <div className="font-medium">
                        {job.Salary.type === "Range" ? (
                          <span>
                            {job.Salary.minAmount.toLocaleString()} -{" "}
                            {job.Salary.maxAmount.toLocaleString()}{" "}
                            {job.Salary.currency}
                          </span>
                        ) : (
                          <span>
                            {job.Salary.amount.toLocaleString()}{" "}
                            {job.Salary.currency}
                          </span>
                        )}
                        <span className="text-sm text-gray-500">
                          {" "}
                          {job.Salary.rate}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Job Type</span>
                      <span className="font-medium">{job.jobType}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Work Mode</span>
                      <span className="font-medium">{job.workMode}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Positions</span>
                      <span className="font-medium">{job.totalHeads}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Deadline</span>
                      <div className="flex items-center text-amber-600 font-medium">
                        <Calendar size={16} className="mr-1" />
                        {new Date(job.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Apply Now
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 flex justify-center items-center gap-2"
                      onClick={() => setSaved(!saved)}
                    >
                      <Heart
                        size={16}
                        className={saved ? "fill-red-500 text-red-500" : ""}
                      />
                      {saved ? "Saved" : "Save"}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 flex justify-center items-center gap-2"
                    >
                      <Share2 size={16} />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Company Card */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold">About Company</h2>

                  <div className="flex flex-col items-center space-y-3">
                    <Avatar className="h-16 w-16 rounded-md border p-2 bg-white">
                      <AvatarImage
                        src={job.company.logo}
                        alt={job.company.name}
                      />
                      <AvatarFallback className="text-xl font-bold">
                        {job.company.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold text-center">
                      {job.company.name}
                    </h3>
                    <p className="text-sm text-gray-600 text-center">
                      {job.company.size}
                    </p>
                    <Button variant="outline" className="w-full" size="sm">
                      View Company Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Benefits Card */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold">Benefits</h2>

                  <ul className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle
                          size={18}
                          className="text-green-500 mt-0.5 flex-shrink-0"
                        />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JobDescriptionPage;
