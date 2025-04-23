import { motion } from "framer-motion";

interface JobNotFoundProps {
  mainText?: string;
  subText?: string;
}

const JobNotFound = ({
  mainText = "We couldn't find any jobs matching your search criteria.",
  subText = "Try adjusting your filters or broadening your search terms to discover more opportunities.",
}: JobNotFoundProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full min-h-[70vh] flex flex-col items-center justify-center p-4 sm:p-8"
    >
      <div className="max-w-lg w-full text-center space-y-6 sm:space-y-8">
        <div className="w-full max-w-[250px] mx-auto mb-8">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <rect width="400" height="300" fill="none" />
            <circle cx="200" cy="150" r="100" fill="#f3f4f6" />
            <circle cx="200" cy="150" r="80" fill="#e5e7eb" />

            <g transform="translate(160, 110)">
              <rect x="0" y="0" width="30" height="40" rx="4" fill="#d1d5db" />
              <rect x="5" y="8" width="20" height="3" rx="1" fill="#9ca3af" />
              <rect x="5" y="16" width="15" height="3" rx="1" fill="#9ca3af" />
              <rect x="5" y="24" width="18" height="3" rx="1" fill="#9ca3af" />

              <rect x="50" y="0" width="30" height="40" rx="4" fill="#d1d5db" />
              <rect x="55" y="8" width="20" height="3" rx="1" fill="#9ca3af" />
              <rect x="55" y="16" width="15" height="3" rx="1" fill="#9ca3af" />
              <rect x="55" y="24" width="18" height="3" rx="1" fill="#9ca3af" />

              <circle
                cx="40"
                cy="60"
                r="15"
                fill="none"
                stroke="#6b7280"
                strokeWidth="4"
              />
              <line
                x1="50"
                y1="70"
                x2="60"
                y2="80"
                stroke="#6b7280"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>

        <div
          className={`space-y-4 transition-all duration-1000 delay-300 transform`}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-primary">
            No Jobs Found
          </h3>
          <p className="text-secondary-foreground text-base sm:text-lg px-4">
            {mainText}
          </p>
          <p className="text-muted-foreground text-sm sm:text-base px-6">
            {subText}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
export default JobNotFound;
