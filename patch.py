import re

with open("src/components/zeroth/Hero.tsx", "r") as f:
    code = f.read()

# 1. Imports
code = code.replace(
    'import { loadState, saveState, STORAGE_KEYS } from "@/lib/state-persistence";',
    'import { loadState, saveState, STORAGE_KEYS } from "@/lib/state-persistence";\nimport { motion, AnimatePresence } from "framer-motion";'
)

# 2. Add variants
variants = """// openmotion.design inspired transitions
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const fadeUpBlur = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", 
    transition: { type: "spring", stiffness: 250, damping: 25 } 
  },
};

/* ─── Cinematic Opening Sequence"""
code = code.replace("/* ─── Cinematic Opening Sequence", variants)

# 3. Replace CinematicIntro
intro_old = re.search(r"function CinematicIntro.*?return \(\n    <div\n      className=\"fixed inset-0.*?</div>\n  \);\n}", code, flags=re.DOTALL).group(0)
intro_new = """function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setShow(false), 4500);
    return () => clearTimeout(id);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md px-3 py-6 pointer-events-none overflow-hidden"
        >
          <div className="absolute inset-0 scanlines opacity-60 pointer-events-none" />
          <div className="absolute inset-0 grid-tactical opacity-15 pointer-events-none" />

          <div className="relative mb-4 sm:mb-6 shrink-0">
            <AlertTriangle className="size-10 sm:size-14 text-primary animate-pulse" />
            <div className="absolute inset-0 animate-ping">
              <AlertTriangle className="size-10 sm:size-14 text-primary opacity-30" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 sm:gap-3 w-full max-w-[92vw] sm:max-w-xl text-center">
            {DISASTER_SEQUENCE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.7, type: "spring", stiffness: 200, damping: 20 }}
                className={`font-mono-tech text-[11px] sm:text-xs md:text-sm tracking-[0.12em] sm:tracking-[0.2em] uppercase ${item.color}`}
              >
                {item.text}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 3.5, duration: 1 }}
            className="absolute bottom-0 inset-x-0 h-1 bg-primary"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}"""
code = code.replace(intro_old, intro_new)

# 4. Hero Stagger wrapper
hero_div_old = '<div className="mx-auto flex max-w-6xl flex-col items-center px-2 py-3 text-center sm:px-6 lg:px-8 sm:py-8">'
hero_div_new = '<motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mx-auto flex max-w-6xl flex-col items-center px-2 py-3 text-center sm:px-6 lg:px-8 sm:py-8">'
code = code.replace(hero_div_old, hero_div_new)
code = re.sub(r'</div>\n      </section>\n    </>', '</motion.div>\n      </section>\n    </>', code)

# 5. Replace all `<div className="animate-rise` with `<motion.div variants={fadeUpBlur} className="`
code = code.replace('<div className="animate-rise', '<motion.div variants={fadeUpBlur} className="')
code = code.replace('</div>\n\n          {/* ── College Header', '</motion.div>\n\n          {/* ── College Header')
code = code.replace('</div>\n\n            <div className="mt-2.5', '</motion.div>\n\n            <div className="mt-2.5')
# Need a better way to close `<motion.div>`.
# Let's just use regex for the start tag, and then change the closing tag manually if it's too hard.
# Actually, it's safer to just change `<div className="animate-rise...` to `<motion.div variants={fadeUpBlur} className="...` 
# and then run an HTML parser? No, regex is fine if I just replace `animate-rise` with `variants={fadeUpBlur}` and leave it as `motion.div`.
# Wait, changing `div` to `motion.div` requires changing the closing `</div>`.
