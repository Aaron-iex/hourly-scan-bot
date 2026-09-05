const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'src/components/zeroth/Sectors.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// The modal outer div needs to be closed with </motion.div>
// And the inner div needs to be closed with </motion.div>
// Let's replace the last two `</div>` before `)}` inside `{selectedTrack && (`

let modalIdx = code.indexOf('{selectedTrack && (');
if (modalIdx !== -1) {
    let before = code.substring(0, modalIdx);
    let after = code.substring(modalIdx);
    // Wrap with AnimatePresence
    if (!after.includes('<AnimatePresence>')) {
        after = '<AnimatePresence>\n      ' + after.replace(')}', ')}\n      </AnimatePresence>');
    }
    
    // Convert </div>\n        </div> to </motion.div>\n        </motion.div>
    after = after.replace(/<\/div>\n\s*<\/div>\n\s*\)\}/, '</motion.div>\n        </motion.div>\n      )}');
    
    // Add AnimatePresence import if missing
    if (!before.includes('AnimatePresence')) {
        before = before.replace('import { motion }', 'import { motion, AnimatePresence }');
    }
    code = before + after;
}

fs.writeFileSync(filePath, code, 'utf8');
console.log('Modal tags fixed.');
