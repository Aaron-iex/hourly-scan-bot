const fs = require('fs');
const path = require('path');

const heroPath = path.join(__dirname, 'src/components/zeroth/Hero.tsx');
let heroCode = fs.readFileSync(heroPath, 'utf8');

// The block to move
const coreLoopBlock = '{/* ── Motto: CRISIS→SENSE→THINK→ADAPT→SURVIVE ── */}\n          <motion.div variants={fadeUpBlur}><CoreEventLoop /></motion.div>';

heroCode = heroCode.replace(coreLoopBlock, '');

// Insert it after the Countdown
const countdownEnd = '<FlipDigit value={cd.s} label="Sec" />\n            </div>\n          </motion.div>';

if (heroCode.includes(countdownEnd)) {
    heroCode = heroCode.replace(countdownEnd, countdownEnd + '\n\n          ' + coreLoopBlock);
}

fs.writeFileSync(heroPath, heroCode, 'utf8');

const loopPath = path.join(__dirname, 'src/components/zeroth/CoreEventLoop.tsx');
let loopCode = fs.readFileSync(loopPath, 'utf8');

// Remove the header part
const headerBlock = /<div className="flex items-center gap-2 mb-4">[\s\S]*?<\/div>\s*<div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 w-full mb-6 mt-2">/;

loopCode = loopCode.replace(headerBlock, '<div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 w-full mb-6 mt-2">');
fs.writeFileSync(loopPath, loopCode, 'utf8');

console.log("Layout patched.");
