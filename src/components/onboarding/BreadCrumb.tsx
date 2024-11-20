import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { OnBoardingStep } from "@/lib/types";

interface BreadCrumbProps {
  steps: OnBoardingStep[];
  currentStep: string;
  setCurrentStep: (step: string) => void;
}
const BreadCrumb = ({
  steps,
  currentStep,
  setCurrentStep,
}: BreadCrumbProps) => {
  return (
    <section>
      <Breadcrumb>
        <BreadcrumbList>
          {}
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </section>
  );
};
export default BreadCrumb;
