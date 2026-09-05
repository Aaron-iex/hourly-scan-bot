import re

with open("src/components/zeroth/Hero.tsx", "r") as f:
    code = f.read()

# 1. Imports
if 'framer-motion' not in code:
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
      staggerChildren: 0.15,
      delayChildren: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const fadeUpBlur = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", 
    transition: { type: "spring", stiffness: 200, damping: 20 } 
  },
};

/* ─── Cinematic Opening Sequence"""
if 'staggerContainer' not in code:
    code = code.replace("/* ─── Cinematic Opening Sequence", variants)

# 3. Replace CinematicIntro
intro_old_match = re.search(r"function CinematicIntro.*?return \([\s\S]*?</div>\n  \);\n}", code)
if intro_old_match:
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
    code = code.replace(intro_old_match.group(0), intro_new)

# 4. Hero Stagger wrapper
hero_div_old = '<div className="mx-auto flex max-w-6xl flex-col items-center px-2 py-3 text-center sm:px-6 lg:px-8 sm:py-8">'
hero_div_new = '<motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mx-auto flex max-w-6xl flex-col items-center px-2 py-3 text-center sm:px-6 lg:px-8 sm:py-8">'
code = code.replace(hero_div_old, hero_div_new)
code = re.sub(r'</div>\s*</section>\s*</>', '</motion.div>\n      </section>\n    </>', code)

# 5. Fix tags by using a simple trick: replace `<div className="animate-rise` with `<motion.div variants={fadeUpBlur} className="` 
# AND since HTML tags are properly nested in this file, we can just replace the corresponding `</div>`.
# But wait, we can just use Framer Motion's `motion.div` directly in the file since we know exactly where they are.
# Actually, let's just do an exact string replace for the components.

# DEFCON Badge
code = code.replace('<div className="animate-rise inline-flex items-center', '<motion.div variants={fadeUpBlur} className="inline-flex items-center')
code = code.replace('</Radio>\n            <span className="font-mono-tech text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.25em] text-accent font-bold">\n              DEFCON 1 PROTOCOL {clock ? `// ${clock}` : ""}\n            </span>\n          </div>', '</Radio>\n            <span className="font-mono-tech text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.25em] text-accent font-bold">\n              DEFCON 1 PROTOCOL {clock ? `// ${clock}` : ""}\n            </span>\n          </motion.div>')

# College Header
code = code.replace('<div className="animate-rise w-full max-w-5xl px-1 sm:px-4">', '<motion.div variants={fadeUpBlur} className="w-full max-w-5xl px-1 sm:px-4">')
code = code.replace('</span>\n            </div>\n          </div>', '</span>\n            </div>\n          </motion.div>')

# Main Title (no animate-rise here but `h1` has it)
code = code.replace('<h1 className="animate-rise font-display uppercase">', '<motion.h1 variants={fadeUpBlur} className="font-display uppercase">')
code = code.replace('</span>\n              </h1>', '</span>\n              </motion.h1>')

# Motto
motto_regex = r'<div className="motto-container animate-rise[^>]*>([\s\S]*?)</div>'
def motto_replacer(match):
    inner = match.group(1)
    inner = inner.replace('<span', '<motion.span variants={fadeUpBlur}')
    inner = inner.replace('</span>', '</motion.span>')
    # remove style={{animationDelay}} completely
    inner = re.sub(r' style={{[^}]*}}', '', inner)
    # remove animate-motto-reveal
    inner = inner.replace('animate-motto-reveal ', '')
    return '<motion.div variants={staggerContainer} initial="hidden" animate="visible" className="motto-container mt-3 sm:mt-4" aria-label="CRISIS SENSE THINK ADAPT SURVIVE">' + inner + '</motion.div>'

code = re.sub(motto_regex, motto_replacer, code)

# Countdown
code = code.replace('<div className="animate-rise mt-3 sm:mt-4 px-2 py-1">', '<motion.div variants={fadeUpBlur} className="mt-3 sm:mt-4 px-2 py-1">')
code = code.replace('<FlipDigit value={cd.s} label="Sec" />\n            </div>\n          </div>', '<FlipDigit value={cd.s} label="Sec" />\n            </div>\n          </motion.div>')

# Date & Venue
code = code.replace('<div className="animate-rise mt-3.5 sm:mt-4 flex w-full', '<motion.div variants={fadeUpBlur} className="mt-3.5 sm:mt-4 flex w-full')
code = code.replace('Venue: Jaya Auditorium · Registration queue open\n              </p>\n            </div>\n          </div>', 'Venue: Jaya Auditorium · Registration queue open\n              </p>\n            </div>\n          </motion.div>')

# CTA Buttons
code = code.replace('<div className="animate-rise mt-4 sm:mt-5 flex flex-col', '<motion.div variants={fadeUpBlur} className="mt-4 sm:mt-5 flex flex-col')
code = code.replace('</a>\n            </Button>\n          </div>', '</a>\n            </Button>\n          </motion.div>')

# Prize Info
code = code.replace('<div className="animate-rise mt-3.5 sm:mt-5 flex w-full max-w-lg', '<motion.div variants={fadeUpBlur} className="mt-3.5 sm:mt-5 flex w-full max-w-lg')
code = code.replace('FOOD & WI-FI INCLUDED</p>\n            </div>\n          </div>', 'FOOD & WI-FI INCLUDED</p>\n            </div>\n          </motion.div>')

# Make flicker nicer, convert to framer motion where useful, but css is fine for flicker.

with open("src/components/zeroth/Hero.tsx", "w") as f:
    f.write(code)

print("Hero.tsx patched gracefully.")
