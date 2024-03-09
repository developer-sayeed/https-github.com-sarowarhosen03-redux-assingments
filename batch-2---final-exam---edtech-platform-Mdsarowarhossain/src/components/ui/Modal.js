import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ open, control, children, fullHeight = false }) {
  return (
    open && (
      <AnimatePresence>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.3,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.3,
            },
          }}
          onClick={control}
          className="fixed w-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></motion.div>
        <motion.div
          key={open}
          initial={{
            x: 100,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
            },
          }}
          exit={{
            x: 100,
            opacity: 0,

            transition: {
              duration: 0.3,
            },
          }}
          className={`bg-black text-white lg:w-[700px] w-[500px] absolute top-0 bottom-0 left-0 right-0 m-auto transform z-20 rounded-lg shadow-lg ${
            fullHeight ? "h-screen" : "h-[20rem]"
          }`}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    )
  );
}
