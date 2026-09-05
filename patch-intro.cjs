const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/zeroth/Hero.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// Replace CinematicIntro logic
code = code.replace(/function CinematicIntro[^]*?return \(/, `function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  return (`);

code = code.replace(/<div\s*className="fixed inset-0 z-\[100\].*?opacity \}\}[^>]*>/,
`<AnimatePresence onExitComplete={onComplete}>
      <motion.div
        key="intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 3.5 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md px-3 py-6 pointer-events-none overflow-hidden"
      >`);

// Now replace the content of CinematicIntro mapping to use framer motion
code = code.replace(/\{DISASTER_SEQUENCE.map[^]*?\}\)\}/,
`{DISASTER_SEQUENCE.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.6, type: "spring", stiffness: 200, damping: 20 }}
            className={\`font-mono-tech text-[11px] sm:text-xs md:text-sm tracking-[0.12em] sm:tracking-[0.2em] uppercase \${item.color}\`}
          >
            {item.text}
          </motion.div>
        ))}`);

// Replace bottom pulse bar
code = code.replace(/\{phase >= 3[^]*?\}\)/, 
`<motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-0 inset-x-0 h-1 bg-primary animate-pulse"
        />`);

code = code.replace(/<\/div>\s*;\s*\}\s*\/\* ─── Floating Ember/, `</motion.div>\n    </AnimatePresence>\n  );\n}\n\n/* ─── Floating Ember`);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Intro patched.');
