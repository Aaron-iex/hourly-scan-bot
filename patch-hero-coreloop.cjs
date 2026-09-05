const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/zeroth/Hero.tsx');
let code = fs.readFileSync(filePath, 'utf8');

if (!code.includes('import { CoreEventLoop }')) {
  code = code.replace(
    'import { browserCompat }',
    'import { CoreEventLoop } from "./CoreEventLoop";\nimport { browserCompat }'
  );
}

// Remove the old motto-container block
const regexMotto = /<motion\.div variants=\{staggerContainer\} initial="hidden" animate="visible" className="motto-container mt-3 sm:mt-4" aria-label="CRISIS SENSE THINK ADAPT SURVIVE">[\s\S]*?<\/motion\.div>/;

if (regexMotto.test(code)) {
  code = code.replace(regexMotto, '<motion.div variants={fadeUpBlur}><CoreEventLoop /></motion.div>');
} else {
  console.log("Could not find motto container");
}

fs.writeFileSync(filePath, code, 'utf8');
console.log('Hero.tsx patched with CoreEventLoop.');
