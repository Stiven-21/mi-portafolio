import { motion } from "framer-motion";

const AnimatedListItem = ({ children }: { children: React.ReactNode }) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return <motion.div variants={variants}>{children}</motion.div>;
};

export default AnimatedListItem;
