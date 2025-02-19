"use client";
import { motion } from "framer-motion";
import { Logo } from "../LandingPage/NavBar";
const NavLogo = () => {
  return (
    <section className="flex-1 h-full flex items-center">
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          whileHover={{
            scale: 1.05,
            rotate: [0, -5, 5, -5, 0],
            transition: { duration: 0.5 },
          }}
        >
          <Logo showText={false} fill="#e9590c" height="40" width="40" />
        </motion.div>
        <motion.p
          className="text-xl font-semibold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-500"
          whileHover={{ scale: 1.03 }}
        >
          <span className="font-bold">Job</span>Verse
        </motion.p>
      </motion.div>
    </section>
  );
};
export default NavLogo;
