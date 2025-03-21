"use client";
import { Award, CheckCircle2, Crown, Sparkles, X, Zap } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "../ui/responsive-dailog";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { createCheckoutSession } from "@/actions/stripe/createCheckoutSession";
import { cn } from "@/lib/utils";
import ManageSubscriptionButton from "../applications/ManageSubscriptionButton";
import useCompanyPremiumModal from "@/store/useCompanyPremiumModal";
import { CompanyEliteFeatures, CompanyProFeatures } from "@/lib/data";

const CompanyPremiumModal = ({ currentPlan }: { currentPlan: string }) => {
  const { openCompanyPremiumModal, setOpenCompanyPremiumModal } =
    useCompanyPremiumModal();
  const isFreePlan = currentPlan === "Free";
  const [loading, setLoading] = useState(false);
  const handlePremiumClick = async (priceId: string) => {
    try {
      setLoading(true);
      const redirectUrl = await createCheckoutSession(priceId);
      window.location.href = redirectUrl;
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <ResponsiveModal
      open={openCompanyPremiumModal}
      onOpenChange={setOpenCompanyPremiumModal}
    >
      <ResponsiveModalContent
        isloading={loading ? "true" : undefined}
        className="p-0 md:min-w-[750px] min-w-full"
      >
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
          <Badge
            variant="outline"
            className="bg-white/10 text-white border-white/20 mb-3"
          >
            Upgrade Your Hiring Experience
          </Badge>
          <ResponsiveModalHeader>
            <ResponsiveModalTitle className="text-2xl font-bold text-white">
              Unlock Premium Features
            </ResponsiveModalTitle>
            <ResponsiveModalDescription className="text-white/90 text-base">
              Choose the plan that fits your career goals and take your hiring
              to the next level.
            </ResponsiveModalDescription>
          </ResponsiveModalHeader>
        </div>

        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            {/* Premium Plan */}
            <div className="border rounded-lg p-5 relative transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">JobVerse Pro</h3>
                </div>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold">$9.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {CompanyProFeatures.map((feature) => {
                    return (
                      <li key={feature.name} className="flex items-start gap-2">
                        {feature.avaliable ? (
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                        ) : (
                          <X className="h-4 w-4 text-red-500 shrink-0 mt-1" />
                        )}
                        <span
                          className={cn(
                            "text-sm",
                            !feature.avaliable && "line-through"
                          )}
                        >
                          {feature.name}{" "}
                          <span className="text-muted-foreground text-xs">
                            ({feature.value})
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {isFreePlan ? (
                <Button
                  disabled={loading}
                  onClick={() =>
                    handlePremiumClick(
                      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY!
                    )
                  }
                  variant="outline"
                  className="w-full"
                >
                  Upgrade To Pro
                </Button>
              ) : (
                <></>
              )}
            </div>

            {/* Premium Plus Plan */}
            <div
              className={`border rounded-lg p-5 relative transition-all duration-200 border-primary ring-2 ring-primary/20 hover:border-primary/50
              }`}
            >
              <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
                Best Value
              </Badge>
              <div className="flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">JobVerse Elite</h3>
                </div>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold">$19.99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {CompanyEliteFeatures.map((feature) => {
                    return (
                      <li key={feature.name} className="flex items-start gap-2">
                        {feature.avaliable ? (
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                        ) : (
                          <X className="h-4 w-4 text-red-500 shrink-0 mt-1" />
                        )}
                        <span
                          className={cn(
                            "text-sm",
                            !feature.avaliable && "line-through"
                          )}
                        >
                          {feature.name}{" "}
                          <span className="text-muted-foreground text-xs">
                            ({feature.value})
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {isFreePlan ? (
                <Button
                  disabled={loading}
                  onClick={() =>
                    handlePremiumClick(
                      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ELITE_MONTHLY!
                    )
                  }
                  className="w-full relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 group"
                >
                  <span className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></span>
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4 animate-pulse-subtle" />
                    <span>Upgrade To Elite</span>
                  </div>
                </Button>
              ) : (
                <></>
              )}
            </div>
          </div>
          {!isFreePlan && (
            <ResponsiveModalFooter>
              <ManageSubscriptionButton />
            </ResponsiveModalFooter>
          )}
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
export default CompanyPremiumModal;
