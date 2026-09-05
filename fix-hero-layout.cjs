const fs = require('fs');
const path = require('path');

const heroPath = path.join(__dirname, 'src/components/zeroth/Hero.tsx');
let heroCode = fs.readFileSync(heroPath, 'utf8');

// 1. Revert main container
const currentContainer = 'className="mx-auto flex max-w-6xl flex-col items-center justify-end px-2 pt-40 sm:pt-72 pb-12 text-center sm:px-6 lg:px-8 min-h-[90vh]"';
const originalContainer = 'className="mx-auto flex max-w-6xl flex-col items-center px-2 py-3 text-center sm:px-6 lg:px-8 sm:py-8"';
heroCode = heroCode.replace(currentContainer, originalContainer);

// 2. Add large margin to Countdown to create a gap for the boy's face
const oldClock = '{/* ── Split-Flap Countdown ── */}\n          <motion.div variants={fadeUpBlur} className="mt-3 sm:mt-4 px-2 py-1">';
const newClock = '{/* ── Split-Flap Countdown ── */}\n          <motion.div variants={fadeUpBlur} className="mt-32 sm:mt-64 px-2 py-1">';
heroCode = heroCode.replace(oldClock, newClock);

fs.writeFileSync(heroPath, heroCode, 'utf8');
console.log("Hero layout fixed.");
