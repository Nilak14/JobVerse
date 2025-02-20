// ProfileSettings.jsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Briefcase,
  Bell,
  Shield,
  LogOut,
  Camera,
  Save,
  Plus,
  Trash,
  FileText,
  GraduationCap,
  Award,
  MapPin,
} from "lucide-react";

export default function ProfileSettings() {
  const [skills, setSkills] = useState([
    "React.js",
    "Next.js",
    "UI/UX",
    "Tailwind CSS",
    "JavaScript",
  ]);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: any) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col gap-6"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Profile Settings
              </h1>
              <p className="text-gray-500 mt-1">
                Manage your JobVerse profile and preferences
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              Save All Changes
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Content with Tabs */}
            <Tabs defaultValue="personal" className="w-full lg:col-span-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Sidebar */}
                <motion.div variants={itemVariants} className="lg:col-span-3">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center mb-6">
                        <div className="relative mb-4">
                          <Avatar className="h-24 w-24 border-4 border-primary/20">
                            <AvatarImage
                              src="/placeholder/200/200"
                              alt="Profile picture"
                            />
                            <AvatarFallback className="bg-primary/10 text-primary text-xl">
                              JV
                            </AvatarFallback>
                          </Avatar>
                          <Button
                            size="icon"
                            className="h-8 w-8 rounded-full absolute bottom-0 right-0 bg-primary hover:bg-primary/90"
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        </div>
                        <h3 className="text-xl font-medium">Alex Johnson</h3>
                        <p className="text-gray-500 text-sm">UI/UX Designer</p>
                      </div>

                      <Separator className="my-4" />

                      <TabsList className="flex flex-col h-auto p-0 space-y-1">
                        <TabsTrigger
                          value="personal"
                          className="justify-start px-3 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary w-full"
                        >
                          <User className="mr-2 h-4 w-4" />
                          Personal Information
                        </TabsTrigger>
                        <TabsTrigger
                          value="professional"
                          className="justify-start px-3 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary w-full"
                        >
                          <Briefcase className="mr-2 h-4 w-4" />
                          Professional Details
                        </TabsTrigger>
                        <TabsTrigger
                          value="notifications"
                          className="justify-start px-3 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary w-full"
                        >
                          <Bell className="mr-2 h-4 w-4" />
                          Notifications
                        </TabsTrigger>
                        <TabsTrigger
                          value="privacy"
                          className="justify-start px-3 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary w-full"
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Privacy & Security
                        </TabsTrigger>
                      </TabsList>

                      <Separator className="my-4" />

                      <Button
                        variant="outline"
                        className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Tab Contents */}
                <motion.div variants={itemVariants} className="lg:col-span-9">
                  {/* Personal Information Tab */}
                  <TabsContent value="personal" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                          Update your personal details and contact information
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue="Alex" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue="Johnson" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              defaultValue="alex.johnson@example.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              defaultValue="+1 (555) 123-4567"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                              id="address"
                              defaultValue="123 Job Street, Career City, CA 94043"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Select defaultValue="us">
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="us">
                                  United States
                                </SelectItem>
                                <SelectItem value="ca">Canada</SelectItem>
                                <SelectItem value="uk">
                                  United Kingdom
                                </SelectItem>
                                <SelectItem value="au">Australia</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="language">Preferred Language</Label>
                            <Select defaultValue="en">
                              <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="es">Spanish</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                                <SelectItem value="de">German</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <Separator />

                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-primary hover:bg-primary/90">
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Professional Details Tab */}
                  <TabsContent value="professional" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Professional Details</CardTitle>
                        <CardDescription>
                          Showcase your skills, experience, and career
                          preferences
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Job Title</Label>
                            <Input
                              id="title"
                              defaultValue="Senior UI/UX Designer"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="bio">Professional Summary</Label>
                            <Textarea
                              id="bio"
                              rows={4}
                              defaultValue="Passionate UI/UX designer with 5+ years of experience creating user-centered digital experiences for startups and enterprise clients. Specializing in intuitive interfaces and design systems."
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Skills</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {skills.map((skill) => (
                                <Badge
                                  key={skill}
                                  className="bg-primary/10 text-primary hover:bg-primary/20 cursor-default flex items-center gap-1"
                                >
                                  {skill}
                                  <button
                                    onClick={() => removeSkill(skill)}
                                    className="ml-1 rounded-full hover:bg-primary/10 p-0.5"
                                  >
                                    <Trash className="h-3 w-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2 mt-2">
                              <Input
                                placeholder="Add a skill"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyDown={(e) =>
                                  e.key === "Enter" && addSkill()
                                }
                              />
                              <Button
                                onClick={addSkill}
                                size="sm"
                                className="bg-primary hover:bg-primary/90"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium flex items-center">
                                <FileText className="mr-2 h-5 w-5 text-primary" />
                                Work Experience
                              </h3>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-primary text-primary hover:bg-primary/5"
                              >
                                <Plus className="mr-1 h-4 w-4" /> Add Experience
                              </Button>
                            </div>

                            <motion.div
                              className="border rounded-lg p-4 relative"
                              whileHover={{
                                y: -2,
                                boxShadow:
                                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="absolute right-4 top-4 flex gap-1">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 text-gray-500"
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                              <h4 className="font-medium">
                                Senior UX Designer
                              </h4>
                              <p className="text-primary font-medium text-sm">
                                TechCorp Inc.
                              </p>
                              <div className="flex items-center text-gray-500 text-sm mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                San Francisco, CA (Remote)
                              </div>
                              <div className="text-gray-500 text-sm mt-1">
                                Jan 2020 - Present
                              </div>
                              <p className="text-sm mt-2">
                                Led the redesign of the company's flagship
                                product, improving user satisfaction by 35% and
                                increasing retention.
                              </p>
                            </motion.div>

                            <motion.div
                              className="border rounded-lg p-4 relative"
                              whileHover={{
                                y: -2,
                                boxShadow:
                                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="absolute right-4 top-4 flex gap-1">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 text-gray-500"
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                              <h4 className="font-medium">UI Designer</h4>
                              <p className="text-primary font-medium text-sm">
                                DesignHub Studio
                              </p>
                              <div className="flex items-center text-gray-500 text-sm mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                Boston, MA
                              </div>
                              <div className="text-gray-500 text-sm mt-1">
                                Mar 2017 - Dec 2019
                              </div>
                              <p className="text-sm mt-2">
                                Collaborated with development team to implement
                                responsive designs across web and mobile
                                platforms.
                              </p>
                            </motion.div>
                          </div>

                          <Separator />

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium flex items-center">
                                <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                                Education
                              </h3>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-primary text-primary hover:bg-primary/5"
                              >
                                <Plus className="mr-1 h-4 w-4" /> Add Education
                              </Button>
                            </div>

                            <motion.div
                              className="border rounded-lg p-4 relative"
                              whileHover={{
                                y: -2,
                                boxShadow:
                                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="absolute right-4 top-4 flex gap-1">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 text-gray-500"
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                              <h4 className="font-medium">
                                Bachelor of Fine Arts in Graphic Design
                              </h4>
                              <p className="text-primary font-medium text-sm">
                                California Institute of Arts
                              </p>
                              <div className="text-gray-500 text-sm mt-1">
                                2013 - 2017
                              </div>
                              <p className="text-sm mt-2">
                                Graduated summa cum laude. Focused on digital
                                design and UX principles.
                              </p>
                            </motion.div>
                          </div>

                          <Separator />

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium flex items-center">
                                <Award className="mr-2 h-5 w-5 text-primary" />
                                Certifications
                              </h3>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-primary text-primary hover:bg-primary/5"
                              >
                                <Plus className="mr-1 h-4 w-4" /> Add
                                Certification
                              </Button>
                            </div>

                            <motion.div
                              className="border rounded-lg p-4 relative"
                              whileHover={{
                                y: -2,
                                boxShadow:
                                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="absolute right-4 top-4 flex gap-1">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 text-gray-500"
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                              <h4 className="font-medium">
                                Google UX Design Professional Certificate
                              </h4>
                              <p className="text-primary font-medium text-sm">
                                Google & Coursera
                              </p>
                              <div className="text-gray-500 text-sm mt-1">
                                Issued Jun 2021
                              </div>
                            </motion.div>

                            <motion.div
                              className="border rounded-lg p-4 relative"
                              whileHover={{
                                y: -2,
                                boxShadow:
                                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="absolute right-4 top-4 flex gap-1">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 text-gray-500"
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                              <h4 className="font-medium">
                                Adobe Certified Expert - XD
                              </h4>
                              <p className="text-primary font-medium text-sm">
                                Adobe
                              </p>
                              <div className="text-gray-500 text-sm mt-1">
                                Issued Aug 2019
                              </div>
                            </motion.div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-primary hover:bg-primary/90">
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Notifications Tab */}
                  <TabsContent value="notifications" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                        <CardDescription>
                          Manage how and when JobVerse notifies you
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">
                            Email Notifications
                          </h3>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">
                                  Job Recommendations
                                </h4>
                                <p className="text-sm text-gray-500">
                                  Receive personalized job recommendations
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">
                                  Application Updates
                                </h4>
                                <p className="text-sm text-gray-500">
                                  Get updates on your job applications
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">
                                  Recruiter Messages
                                </h4>
                                <p className="text-sm text-gray-500">
                                  Notifications when recruiters contact you
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">JobVerse Events</h4>
                                <p className="text-sm text-gray-500">
                                  Updates about career fairs and webinars
                                </p>
                              </div>
                              <Switch />
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">
                                  Marketing Emails
                                </h4>
                                <p className="text-sm text-gray-500">
                                  Promotional content and special offers
                                </p>
                              </div>
                              <Switch />
                            </div>
                          </div>

                          <Separator />

                          <h3 className="text-lg font-medium">
                            Push Notifications
                          </h3>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">Mobile Alerts</h4>
                                <p className="text-sm text-gray-500">
                                  Enable push notifications on mobile
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">Job Deadlines</h4>
                                <p className="text-sm text-gray-500">
                                  Reminders for application deadlines
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>

                          <Separator />

                          <h3 className="text-lg font-medium">
                            Notification Frequency
                          </h3>
                          <div className="space-y-2">
                            <Label>Email Digest Frequency</Label>
                            <Select defaultValue="daily">
                              <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="realtime">
                                  Real-time
                                </SelectItem>
                                <SelectItem value="daily">
                                  Daily digest
                                </SelectItem>
                                <SelectItem value="weekly">
                                  Weekly digest
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Reset to Default</Button>
                          <Button className="bg-primary hover:bg-primary/90">
                            <Save className="mr-2 h-4 w-4" />
                            Save Preferences
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Privacy & Security Tab */}
                  <TabsContent value="privacy" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Privacy & Security</CardTitle>
                        <CardDescription>
                          Manage your account security and privacy settings
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">
                            Account Security
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="changePassword">Password</Label>
                              <div className="flex gap-2">
                                <Input
                                  id="changePassword"
                                  type="password"
                                  value="••••••••••••"
                                  disabled
                                />
                                <Button variant="outline">Change</Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="twoFactor">
                                Two-Factor Authentication
                              </Label>
                              <div className="flex items-center justify-between p-3 border rounded-md">
                                <div>
                                  <p className="text-sm font-medium">
                                    Secure your account
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Add an extra layer of security
                                  </p>
                                </div>
                                <Button className="bg-primary hover:bg-primary/90">
                                  Enable
                                </Button>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <h3 className="text-lg font-medium">
                            Privacy Settings
                          </h3>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">
                                  Profile Visibility
                                </h4>
                                <p className="text-sm text-gray-500">
                                  Allow recruiters to find your profile
                                </p>
                              </div>
                              <Switch defaultChecked />
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">
                                  Show Salary Expectations
                                </h4>
                                <p className="text-sm text-gray-500">
                                  Display your salary requirements
                                </p>
                              </div>
                              <Switch />
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">
                                  Share Application History
                                </h4>
                                <p className="text-sm text-gray-500">
                                  Allow employers to see your application
                                  history
                                </p>
                              </div>
                              <Switch />
                            </div>
                          </div>

                          <Separator />

                          <h3 className="text-lg font-medium">
                            Data Management
                          </h3>

                          <div className="space-y-3">
                            <Button
                              variant="outline"
                              className="w-full justify-start text-blue-600 hover:text-blue-700 border-blue-100 hover:bg-blue-50"
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              Download My Data
                            </Button>

                            <Button
                              variant="outline"
                              className="w-full justify-start text-red-600 hover:text-red-700 border-red-100 hover:bg-red-50"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Account
                            </Button>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-primary hover:bg-primary/90">
                            <Save className="mr-2 h-4 w-4" />
                            Save Settings
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </motion.div>
              </div>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Add this to your global CSS or tailwind.config.js
// theme: {
//   extend: {
//     colors: {
//       primary: {
//         DEFAULT: '#ff6b00',
//         foreground: 'white',
//       }
//     }
//   }
// }
