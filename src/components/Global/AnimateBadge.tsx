import { cn } from "@/lib/utils";
import * as motion from "framer-motion/client";

interface Props {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  reverse?: boolean;
}
const AnimateBadge = ({ children, className, delay, reverse }: Props) => {
  return (
    <motion.div
      className={cn("", className)}
      initial={{ opacity: 0, x: reverse ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ delay: delay, duration: 0.1, ease: "easeIn" }}
    >
      {children}
    </motion.div>
  );
};
export default AnimateBadge;
