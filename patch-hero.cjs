const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/zeroth/Hero.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Add framer-motion import
if (!code.includes('framer-motion')) {
  code = code.replace(
    'import { loadState, saveState, STORAGE_KEYS } from "@/lib/state-persistence";',
    'import { loadState, saveState, STORAGE_KEYS } from "@/lib/state-persistence";\nimport { motion, AnimatePresence } from "framer-motion";'
  );
}

// 2. Add animation configs just after imports
code = code.replace(
  '/* ─── Cinematic Opening Sequence',
  `// openmotion.design inspired transitions
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

/* ─── Cinematic Opening Sequence`
);

// 3. Update Hero main div to motion.div
code = code.replace(
  '<div className="mx-auto flex max-w-6xl flex-col items-center px-2 py-3 text-center sm:px-6 lg:px-8 sm:py-8">',
  '<motion.div\n          variants={staggerContainer}\n          initial="hidden"\n          animate="visible"\n          className="mx-auto flex max-w-6xl flex-col items-center px-2 py-3 text-center sm:px-6 lg:px-8 sm:py-8">'
);
code = code.replace(
  /<\/div>\s*<\/section>\s*<\/>/g,
  '</motion.div>\n      </section>\n    </>'
);

// 4. Wrap elements inside Hero with motion.div variants={fadeUpBlur}
code = code.replace(
  /<div className="animate-rise/g,
  '<motion.div variants={fadeUpBlur} className="'
);
code = code.replace(
  /<h1 className="animate-rise/g,
  '<motion.h1 variants={fadeUpBlur} className="'
);

// Replace motto reveal manual animation delay classes with Framer Motion staggered chars
code = code.replace(
  /className="animate-motto-reveal([^"]*)"[^>]*>/g,
  'className="motto-reveal$1">'
);

// Replace "style={{ textShadow..." with the actual style if needed, but it's fine.

fs.writeFileSync(filePath, code, 'utf8');
console.log('Hero patched.');
