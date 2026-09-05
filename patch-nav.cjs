const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/zeroth/SiteNav.tsx');
let code = fs.readFileSync(filePath, 'utf8');

if (!code.includes('framer-motion')) {
  code = code.replace(
    'import { Button } from "@/components/ui/button";',
    'import { Button } from "@/components/ui/button";\nimport { motion, AnimatePresence } from "framer-motion";'
  );
}

// Replace the desktop tabs styling to use skiper40 Link000 style underline
code = code.replace(
  /className=\{`relative px-3 py-2 font-mono-tech text-\[11px\] uppercase tracking-\[0\.2em\] transition-colors group touch-manipulation \$\{[\s\S]*?\}\`\}/,
  `className={\`group relative flex items-center px-3 py-2 font-mono-tech text-[11px] uppercase tracking-[0.2em] transition-colors touch-manipulation before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:bg-accent before:content-[''] before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:origin-left hover:before:scale-x-100 \${
                activeTab === l.id ? "text-accent before:scale-x-100 before:origin-left" : "text-muted-foreground hover:text-accent"
              }\`}`
);

// Remove the old span absolute bottom-0 span
code = code.replace(
  /<span\s*className=\{`absolute bottom-0 left-0 h-px bg-accent transition-all duration-300 \$\{\s*activeTab === l\.id \? "w-full" : "w-0 group-hover:w-full"\s*\}\`\}\s*\/>/g,
  ''
);

// Replace mobile menu with AnimatePresence
code = code.replace(
  /\{open && \(\s*<div className="border-t border-border bg-background\/98 px-4 pb-5 pt-2 backdrop-blur-xl md:hidden animate-rise">/,
  `<AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="border-t border-border bg-background/98 px-4 pb-5 pt-2 backdrop-blur-xl md:hidden"
        >`
);

code = code.replace(
  /<button\s*key=\{l\.id\}\s*onClick=\{[^}]*\}\s*style=\{\{ animationDelay: `\$\{i \* 0\.05\}s` \}\}\s*className=\{`animate-slide-x/g,
  `<motion.button
              key={l.id}
              onClick={() => handleTab(l.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={\`flex`
);

code = code.replace(
  /<\/span>\s*<\/button>/g,
  '</span>\n            </motion.button>'
);

code = code.replace(
  /Register squad\s*<\/Button>\s*<\/div>\s*\)\}/g,
  `Register squad
          </Button>
        </motion.div>
      )}
      </AnimatePresence>`
);

fs.writeFileSync(filePath, code, 'utf8');
console.log('SiteNav patched.');
