const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/zeroth/Hero.tsx');
let code = fs.readFileSync(filePath, 'utf8');

const regexContainer = /<div className="motto-container[^>]*>([\s\S]*?)<\/div>/g;

code = code.replace(regexContainer, (match, inner) => {
    let newInner = inner.replace(/<span/g, '<motion.span');
    newInner = newInner.replace(/<\/span>/g, '</motion.span>');
    newInner = newInner.replace(/className="motto-reveal([^"]*)"[^>]*>/g, 'variants={fadeUpBlur} className="$1">');
    return `<motion.div variants={staggerContainer} initial="hidden" animate="visible" className="motto-container mt-3 sm:mt-4" aria-label="CRISIS SENSE THINK ADAPT SURVIVE">${newInner}</motion.div>`;
});

fs.writeFileSync(filePath, code, 'utf8');
console.log('Motto patched.');
