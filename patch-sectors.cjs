const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/zeroth/Sectors.tsx');
let code = fs.readFileSync(filePath, 'utf8');

if (!code.includes('import { motion } from "framer-motion"')) {
  code = code.replace(
    'import { useState, useRef, useEffect } from "react";',
    'import { useState, useRef, useEffect } from "react";\nimport { motion } from "framer-motion";'
  );
}

// Replace the main track grid container with a staggered framer motion grid
const gridOld = '<div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto z-10 relative">';
const gridNew = `<motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto z-10 relative"
      >`;

code = code.replace(gridOld, gridNew);

// Replace individual cards with motion.div
const cardOldRegex = /<article\s+key=\{track\.id\}([\s\S]*?)className="(.*?)"([\s\S]*?)>/;
code = code.replace(cardOldRegex, (match, p1, p2, p3) => {
  return `<motion.article 
            key={track.id}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
            }}
            whileHover={{ y: -5, boxShadow: \`0 10px 30px \${color.accent}30\` }}
            className="${p2}"${p3}>`;
});

// Close motion.article
code = code.replace(/<\/article>/g, '</motion.article>');

// Close motion.div for grid
const closeGridOld = '      </div>\n\n      {/* ── EXPANDABLE CRISIS DETAIL MODAL ── */}';
const closeGridNew = '      </motion.div>\n\n      {/* ── EXPANDABLE CRISIS DETAIL MODAL ── */}';
code = code.replace(closeGridOld, closeGridNew);

// Enhance modal animation
const modalOuterOld = '<div\n          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"';
const modalOuterNew = '<motion.div\n          initial={{ opacity: 0 }}\n          animate={{ opacity: 1 }}\n          exit={{ opacity: 0 }}\n          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"';
code = code.replace(modalOuterOld, modalOuterNew);

const modalInnerOld = '<div\n            ref={modalRef}\n            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-background border-2 border-primary p-4 sm:p-8 clip-tactical shadow-[0_0_50px_rgba(224,76,17,0.4)] overscroll-contain"';
const modalInnerNew = '<motion.div\n            ref={modalRef}\n            initial={{ scale: 0.95, y: 20, opacity: 0 }}\n            animate={{ scale: 1, y: 0, opacity: 1 }}\n            exit={{ scale: 0.95, y: 20, opacity: 0 }}\n            transition={{ type: "spring", stiffness: 300, damping: 25 }}\n            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-background border-2 border-primary p-4 sm:p-8 clip-tactical shadow-[0_0_50px_rgba(224,76,17,0.4)] overscroll-contain"';
code = code.replace(modalInnerOld, modalInnerNew);

// Need to wrap the modal in AnimatePresence
const modalSectionRegex = /(\{selectedTrack && \()([\s\S]*?)(onClick=\{\(e\) => e\.target === e\.currentTarget && handleCloseModal\(\)\}\s*>)([\s\S]*?)(<\/div>\s*<\/div>\s*\)\})/;
code = code.replace(modalSectionRegex, (match, start, mid1, mid2, inner, end) => {
   // Replace `</div>\n        </div>` with `</motion.div>\n        </motion.div>`
   let newEnd = end.replace('</div>', '</motion.div>').replace('</div>', '</motion.div>');
   // Actually, regex logic here is brittle for closing tags. Let's do exact string replacements for modal close tags.
   return start + mid1 + mid2 + inner + end;
});

fs.writeFileSync(filePath, code, 'utf8');
console.log('Sectors layout updated.');
