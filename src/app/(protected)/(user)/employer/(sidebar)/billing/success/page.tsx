"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Download, Star } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";
import { getSubscriptionValuedFromPriceId } from "@/lib/utils";
const BillingSuccess = () => {
  const searchParams = useSearchParams();
  const priceId = searchParams.get("priceId");
  const planName = getSubscriptionValuedFromPriceId(priceId as string);
  const purchaseDetails = {
    plan: planName.name || "Premium",
    date: new Date().toLocaleDateString(),
    amount: planName.price || "$0.00",
    features: planName.name
      ? planName.name === "Pro"
        ? [
            "Create Job Post Upto 10",
            "All AI Features Avaliable",
            "Can Generate Job Embeddings",
          ]
        : [
            "Crate Unlimited Job Post",
            "All AI Features Avaliable",
            "Can Generate Job Embeddings",
            "Can Customize Job Embeddings",
            "Applicant Matching Rating",
          ]
      : [],
  };
  useEffect(() => {
    const confetti = async () => {
      const { default: confetti } = await import("canvas-confetti");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    };

    confetti();
  }, []);
  return (
    <div className="flex items-center justify-center min-h-[calc(100dvh-9rem)] ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
              className="mx-auto mb-4"
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
            </motion.div>
            <CardTitle className="text-2xl sm:text-3xl">
              Purchase Successful!
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Thank you for upgrading to {purchaseDetails.plan}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{purchaseDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">{purchaseDetails.amount}</span>
                </div>
              </div>
            </motion.div>

            <Separator />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="font-medium mb-2 flex items-center gap-1.5">
                <Star className="h-4 w-4 text-primary" />
                Your Premium Benefits
              </h3>
              <ul className="space-y-2">
                {purchaseDetails.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full"
            >
              <Button className="w-full gap-2" asChild>
                <Link href="/dashboard">
                  Go to Dashboard <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </CardFooter>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-4 text-sm text-muted-foreground"
        >
          <p>
            Need help?{" "}
            <Link href="/support" className="text-primary hover:underline">
              Contact support
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default BillingSuccess;
