import { CheckIcon, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CreateJobTagsProps {
  label: string;
  isSelected: boolean;
}

const CreateJobTags = ({ label, isSelected }: CreateJobTagsProps) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
    >
      <Badge
        className={cn(
          "flex items-center w-fit cursor-pointer p-3 rounded-xl gap-3 text-sm transition-colors duration-200",
          isSelected
            ? "bg-primary/20 text-primary hover:bg-primary/20"
            : "hover:bg-secondary/80"
        )}
        variant="secondary"
      >
        <span>
          {isSelected ? (
            <CheckIcon className="size-5" />
          ) : (
            <Plus className="size-5" />
          )}
        </span>
        <span>{label}</span>
      </Badge>
    </motion.div>
  );
};

export default CreateJobTags;
