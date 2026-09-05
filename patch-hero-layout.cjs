const fs = require('fs');
const path = require('path');

const heroPath = path.join(__dirname, 'src/components/zeroth/Hero.tsx');
let heroCode = fs.readFileSync(heroPath, 'utf8');

// 1. Remove CoreEventLoop import
heroCode = heroCode.replace(/import \{ CoreEventLoop \} from "\.\/CoreEventLoop";\n/g, '');

// 2. Remove <CoreEventLoop /> usage block
const loopBlock = '{/* ── Motto: CRISIS→SENSE→THINK→ADAPT→SURVIVE ── */}\n          <motion.div variants={fadeUpBlur}><CoreEventLoop /></motion.div>';
heroCode = heroCode.replace(loopBlock, '');

// 3. Adjust the main container padding to push content down
const oldContainer = 'className="mx-auto flex max-w-6xl flex-col items-center px-2 py-3 text-center sm:px-6 lg:px-8 sm:py-8"';
const newContainer = 'className="mx-auto flex max-w-6xl flex-col items-center justify-end px-2 pt-40 sm:pt-72 pb-12 text-center sm:px-6 lg:px-8 min-h-[90vh]"';
heroCode = heroCode.replace(oldContainer, newContainer);

// Save Hero.tsx
fs.writeFileSync(heroPath, heroCode, 'utf8');

// 4. Delete CoreEventLoop.tsx entirely
const loopPath = path.join(__dirname, 'src/components/zeroth/CoreEventLoop.tsx');
if (fs.existsSync(loopPath)) {
    fs.unlinkSync(loopPath);
}

console.log("Hero layout patched and CoreEventLoop deleted.");
