import re

with open("src/components/zeroth/SiteNav.tsx", "r") as f:
    code = f.read()

# Imports
if "framer-motion" not in code:
    code = code.replace(
        'import { Button } from "@/components/ui/button";',
        'import { Button } from "@/components/ui/button";\nimport { motion, AnimatePresence } from "framer-motion";'
    )

# Desktop nav buttons (Lines 68+)
desktop_btn_pattern = r'(<button\s+key=\{l\.id\}\s+onClick=\{.*?\}\s+)className=\{`relative px-3 py-2 font-mono-tech text-\[11px\] uppercase tracking-\[0\.2em\] transition-colors group touch-manipulation \$\{[^`]*\}`\}(\s+aria-current=\{.*?\}\s+>)([\s\S]*?)(</button>)'

def desktop_btn_replacer(match):
    start = match.group(1)
    aria = match.group(2)
    inner = match.group(3)
    
    # We remove the span absolute bottom-0 entirely
    inner = re.sub(r'<span\s+className=\{`absolute bottom-0 left-0 h-px bg-accent transition-all duration-300 \$\{[\s\S]*?\}`\}\s*/>', '', inner)
    
    new_class = '''className={`group relative flex items-center px-3 py-2 font-mono-tech text-[11px] uppercase tracking-[0.2em] transition-colors touch-manipulation before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:bg-accent before:content-[''] before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:origin-left hover:before:scale-x-100 ${
                activeTab === l.id ? "text-accent before:scale-x-100 before:origin-left" : "text-muted-foreground hover:text-accent"
              }`}'''
    
    return start + new_class + aria + inner + '</button>'

code = re.sub(desktop_btn_pattern, desktop_btn_replacer, code)

# Mobile Menu
mobile_menu_start_old = '{open && (\n        <div className="border-t border-border bg-background/98 px-4 pb-5 pt-2 backdrop-blur-xl md:hidden animate-rise">'
mobile_menu_start_new = '''<AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="border-t border-border bg-background/98 px-4 pb-5 pt-2 backdrop-blur-xl md:hidden"
        >'''
code = code.replace(mobile_menu_start_old, mobile_menu_start_new)

# Mobile menu buttons
mobile_btn_pattern = r'(<button\s+key=\{l\.id\}\s+onClick=\{.*?\}\s+)style=\{\{\s*animationDelay:[^\}]*\}\}\s+className=\{`animate-slide-x (.*?)`\}([\s\S]*?)(</button>)'

def mobile_btn_replacer(match):
    start = match.group(1).replace('<button', '<motion.button')
    classes = match.group(2)
    inner = match.group(3)
    
    new_start = f'''{start}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={{`{classes}`}}'''
    return new_start + inner + '</motion.button>'

code = re.sub(mobile_btn_pattern, mobile_btn_replacer, code)

# Close AnimatePresence
code = code.replace('Register squad\n          </Button>\n        </div>\n      )}', 'Register squad\n          </Button>\n        </motion.div>\n      )}\n      </AnimatePresence>')

with open("src/components/zeroth/SiteNav.tsx", "w") as f:
    f.write(code)

print("SiteNav patched gracefully.")
