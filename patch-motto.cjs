const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/zeroth/Hero.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// Replace motto spans with motion.span and stagger
code = code.replace(
  /<div className="motto-container[^>]*>/,
  '<motion.div variants={staggerContainer} initial="hidden" animate="visible" className="motto-container mt-3 sm:mt-4" aria-label="CRISIS SENSE THINK ADAPT SURVIVE">'
);

code = code.replace(
  /<span className="motto-reveal font-mono-tech text-xs sm:text-sm md:text-base lg:text-lg tracking-\[0\.12em\] sm:tracking-\[0\.2em\] font-medium text-primary\/90" style={{ animationDelay: '[0-9]+ms' }}>/g,
  '<motion.span variants={fadeUpBlur} className="font-mono-tech text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.12em] sm:tracking-[0.2em] font-medium text-primary/90">'
);

code = code.replace(
  /<span className="motto-reveal font-mono-tech text-sm sm:text-base md:text-lg lg:text-xl tracking-\[0\.08em\] sm:tracking-\[0\.12em\] font-semibold text-primary\/70" aria-hidden style={{ animationDelay: '[0-9]+ms' }}>/g,
  '<motion.span variants={fadeUpBlur} className="font-mono-tech text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.08em] sm:tracking-[0.12em] font-semibold text-primary/70" aria-hidden>'
);

code = code.replace(
  /<\/span>/g,
  '</motion.span>'
);

// We need to fix the CinematicIntro closing tags which were not modified but maybe broken by `</span>` replacement?
// Actually, `CinematicIntro` does not use `</span>`. But wait! "JAYA ENGINEERING COLLEGE" uses `span` inside `div`. 
// "Time to Zero Hour" has a `span`. "Makeathon" has a `span`.
// If I replaced ALL `</span>` with `</motion.span>`, I'll break the whole file!
