'use strict';

/* ════════════════════════════════════════════════════════════════
   LOCAL-STORAGE KEYS
════════════════════════════════════════════════════════════════ */
const LS_OS       = 'terminal_setup_os';
const LS_PROG_MAC = 'terminal_progress_mac';
const LS_PROG_WIN = 'terminal_progress_windows';
const LS_CUR_MAC  = 'terminal_step_id_mac';
const LS_CUR_WIN  = 'terminal_step_id_win';

/* ════════════════════════════════════════════════════════════════
   STEP DATA
════════════════════════════════════════════════════════════════ */
const ALL_STEPS = [

  /* ── 1 ─────────────────────────────────────────────────────── */
  {
    id: 1,
    title: 'Download Claude Desktop',
    shortTitle: 'Download Claude Desktop',
    os: 'both', windowsOnly: false, required: false, optional: false,
    explanation: 'Head to Anthropic\'s official website and download the Claude Desktop application for your operating system.',
    bullets: [
      'Visit <strong>claude.ai/download</strong> in your browser',
      'Click the download button for your operating system',
      'Save the installer file to your Downloads folder'
    ],
    osSpecific: null, subSections: null,
    command: null, hasCopyBtn: false,
    links: [{ text: 'claude.ai/download ↗', url: 'https://claude.ai/download' }],
    tip: null,
    warn: null
  },

  /* ── 2 ─────────────────────────────────────────────────────── */
  {
    id: 2,
    title: 'Install and open the app',
    shortTitle: 'Install the app',
    os: 'both', windowsOnly: false, required: false, optional: false,
    explanation: 'Run the installer and sign in with your Anthropic account to get Claude Desktop up and running.',
    bullets: [],
    osSpecific: {
      mac: {
        heading: 'On Mac',
        bullets: [
          'Open the downloaded <code>.dmg</code> file from Downloads',
          'Drag <strong>Claude</strong> into the <strong>Applications</strong> folder',
          'Launch Claude via <span data-tooltip="Press Cmd+Space to open Spotlight, then type the app name">Spotlight</span> or from Applications',
          'Sign in with your Anthropic account when prompted'
        ]
      },
      windows: {
        heading: 'On Windows',
        bullets: [
          'Run the downloaded <code>.exe</code> installer',
          'Follow the setup wizard — default settings are fine',
          'Launch Claude from the <strong>Start Menu</strong>',
          'Sign in with your Anthropic account when prompted'
        ]
      }
    },
    subSections: null, command: null, hasCopyBtn: false,
    links: [],
    tip: 'Once you see the Claude chat interface, the installation was successful.',
    warn: null
  },

  /* ── 3 ─────────────────────────────────────────────────────── */
  {
    id: 3,
    title: 'Choose a Claude Membership',
    shortTitle: 'Choose a Membership',
    os: 'both', windowsOnly: false, required: true, optional: false,
    explanation: 'Claude Code works best with a paid Claude plan. The free plan has limited usage that may not be enough for sustained development.',
    bullets: [],
    osSpecific: null,
    subSections: [
      {
        heading: '⭐ Recommended: Claude Pro (~$20/month)',
        bullets: [
          'Best option for individual developers',
          'Full access to Claude Code and higher usage limits',
          'Approx. $20/month — cancel any time',
          'Go to <strong>claude.ai → Settings → Billing → Upgrade to Pro</strong>'
        ]
      },
      {
        heading: '🏢 Alternative: Claude Teams',
        bullets: [
          'Designed for companies or collaborative teams',
          'Shared workspace, admin controls, and team management tools',
          'Higher cost — better suited for organisations than individuals'
        ]
      },
      {
        heading: '🆓 Free Plan — Important Note',
        bullets: [
          'The free plan lets you try Claude but is usually not enough for sustained Claude Code use',
          'You may hit rate limits quickly during active development',
          'Upgrade before starting to avoid interruptions'
        ]
      }
    ],
    command: null, hasCopyBtn: false,
    links: [{ text: 'claude.ai/settings ↗', url: 'https://claude.ai/settings' }],
    tip: null,
    warn: 'Claude Pro (or Teams) is strongly recommended for reliable Claude Code usage. Upgrade before continuing.'
  },

  /* ── 4 ─────────────────────────────────────────────────────── */
  {
    id: 4,
    title: 'Turn off Auto-reload and Extra Usage',
    shortTitle: 'Auto-reload & Extra Usage',
    os: 'both', windowsOnly: false, required: false, optional: false,
    explanation: 'Disable Auto-reload and Extra Usage to prevent unexpected charges and unwanted app behaviour.',
    bullets: [
      'Click the <strong>gear icon ⚙</strong> or open the app <strong>Settings</strong>',
      'Find <strong>Auto-reload</strong> and switch it <strong>off</strong>',
      'Find <strong>Extra Usage</strong> and switch it <strong>off</strong>',
      'Save or close the settings panel'
    ],
    osSpecific: null, subSections: null, command: null, hasCopyBtn: false, links: [],
    tip: null,
    warn: 'Leaving Extra Usage on may trigger additional billing if your usage spikes.'
  },

  /* ── 5 ─────────────────────────────────────────────────────── */
  {
    id: 5,
    title: 'Turn off training data sharing',
    shortTitle: 'Disable data sharing',
    os: 'both', windowsOnly: false, required: false, optional: false,
    explanation: 'Opt out of contributing your conversations to model training to keep your code and data private.',
    bullets: [
      'Go to <strong>Settings → Privacy</strong>',
      'Find <em>"Improve Claude for everyone"</em> or <em>"Share usage data"</em>',
      'Toggle it <strong>off</strong>',
      'Your prompts and code won\'t be used to train future models'
    ],
    osSpecific: null, subSections: null, command: null, hasCopyBtn: false, links: [],
    tip: 'Recommended for anyone working with proprietary code or business logic.',
    warn: null
  },

  /* ── 6 ─────────────────────────────────────────────────────── */
  {
    id: 6,
    title: 'Turn on Memory settings',
    shortTitle: 'Enable Memory',
    os: 'both', windowsOnly: false, required: false, optional: false,
    explanation: 'Enable Memory so Claude can remember your preferences, stack, and context across separate conversations.',
    bullets: [
      'Go to <strong>Settings → Memory</strong>',
      'Toggle <strong>Memory on</strong>',
      'Optionally add a note about your preferred language or tech stack',
      'Claude will use this context to give more relevant answers over time'
    ],
    osSpecific: null, subSections: null, command: null, hasCopyBtn: false, links: [],
    tip: 'Try adding: "I work in TypeScript with Next.js and deploy to Railway."',
    warn: null
  },

  /* ── 7 ─────────────────────────────────────────────────────── */
  {
    id: 7,
    title: 'Enable Run on startup and Quick access',
    shortTitle: 'Startup & Quick access',
    os: 'both', windowsOnly: false, required: false, optional: false,
    explanation: 'Keep Claude instantly available by running it at startup and setting up a global keyboard shortcut.',
    bullets: [
      'Open <strong>Settings → General</strong>',
      'Enable <strong>"Run on startup"</strong> (or "Launch at login" on Mac)',
      'Configure the <strong>Quick access</strong> shortcut'
    ],
    osSpecific: {
      mac: {
        heading: 'On Mac',
        bullets: [
          'Enable <strong>"Launch at login"</strong> in Settings → General',
          'Claude will appear in your <strong>menu bar</strong> (top-right)',
          'Quick Access shortcut: typically <kbd>Cmd+Shift+Space</kbd>',
          'Open Claude instantly from any app without switching windows'
        ]
      },
      windows: {
        heading: 'On Windows',
        bullets: [
          'Enable <strong>"Run on startup"</strong> in Settings → General',
          'Claude will appear in the <span data-tooltip="The small icons area at the bottom-right of your taskbar">system tray</span>',
          'Right-click the tray icon to configure the Quick Access shortcut',
          'Use the shortcut to open Claude from any app instantly'
        ]
      }
    },
    subSections: null, command: null, hasCopyBtn: false, links: [],
    tip: null, warn: null
  },

  /* ── 8 ─────────────────────────────────────────────────────── */
  {
    id: 8,
    title: 'Open the Code tab',
    shortTitle: 'Open Code tab',
    os: 'both', windowsOnly: false, required: false, optional: false,
    explanation: 'Claude Desktop includes a dedicated Code tab optimised for software development — better syntax awareness and file context.',
    bullets: [
      'Look for the <strong>Code</strong> tab in the left sidebar or top navigation',
      'Click it to switch to the developer-focused interface',
      'Explore the code-specific options and settings here',
      'This is where you\'ll spend most of your development time with Claude'
    ],
    osSpecific: null, subSections: null, command: null, hasCopyBtn: false, links: [],
    tip: 'The Code tab provides improved syntax highlighting and better file context handling.',
    warn: null
  },

  /* ── 9 ─────────────────────────────────────────────────────── */
  {
    id: 9,
    title: 'Install Git',
    shortTitle: 'Install Git',
    os: 'windows', windowsOnly: true, required: false, optional: false,
    explanation: 'Git is required for version control on Windows. macOS users can skip this — Git comes pre-installed with Xcode Command Line Tools.',
    bullets: [
      'Visit <strong>git-scm.com/download/win</strong>',
      'Download the latest <strong>Git for Windows</strong> installer',
      'Run the installer — the default settings are recommended',
      'Open <strong>Git Bash</strong> or PowerShell and run <code>git --version</code> to confirm'
    ],
    osSpecific: null, subSections: null, command: null, hasCopyBtn: false,
    links: [{ text: 'git-scm.com/download/win ↗', url: 'https://git-scm.com/download/win' }],
    tip: null,
    warn: 'If you see this on Mac, check that you selected the correct OS above.'
  },

  /* ── 10 ────────────────────────────────────────────────────── */
  {
    id: 10,
    title: 'Set up the terminal',
    shortTitle: 'Set up terminal',
    os: 'both', windowsOnly: false, required: false, optional: false,
    explanation: 'Open and configure your terminal — you\'ll need it for the install command in the next step.',
    bullets: [],
    osSpecific: {
      mac: {
        heading: 'On Mac',
        bullets: [
          'Press <kbd>Cmd+Space</kbd> to open <span data-tooltip="macOS built-in search tool — press Cmd+Space to open it">Spotlight</span>',
          'Type <strong>Terminal</strong> and press <kbd>Enter</kbd>',
          'For a better experience, consider <strong>iTerm2</strong> (iterm2.com)',
          'Verify curl: run <code>curl --version</code>'
        ]
      },
      windows: {
        heading: 'On Windows',
        bullets: [
          'Press the <strong>Windows key</strong> → search <strong>Windows Terminal</strong> or <strong>PowerShell</strong>',
          'Right-click → <em>"Run as administrator"</em> if you hit permission errors',
          'Verify <span data-tooltip="curl is a command-line tool for transferring data via URLs">curl</span>: run <code>curl --version</code>',
          '<strong>Git Bash</strong> also works if you installed Git in the previous step'
        ]
      }
    },
    subSections: null, command: null, hasCopyBtn: false, links: [],
    tip: 'Keep your terminal open — you\'ll use it in the next step.',
    warn: null
  },

  /* ── 11 ────────────────────────────────────────────────────── */
  {
    id: 11,
    title: 'Install Claude Code',
    shortTitle: 'Install Claude Code',
    os: 'both', windowsOnly: false, required: false, optional: false,
    explanation: 'Claude Code requires Node.js (v18+). The commands below install Node.js if needed, then install Claude Code globally.',
    bullets: [],
    showBothOS: false,
    osSpecific: {
      mac: {
        heading: 'On Mac',
        bullets: [
          'Copy the install command below',
          'Open <strong>Terminal</strong> — press <kbd>⌘ Space</kbd>, type <strong>Terminal</strong>, press <kbd>Enter</kbd>',
          'Paste with <kbd>⌘ V</kbd> and press <kbd>Enter</kbd>',
          'If you don\'t have Homebrew yet, the command installs it first'
        ],
        command: '( command -v brew >/dev/null 2>&1 || /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" ) && { [ -x /opt/homebrew/bin/brew ] && eval "$(/opt/homebrew/bin/brew shellenv)"; [ -x /usr/local/bin/brew ] && eval "$(/usr/local/bin/brew shellenv)"; true; } && ( command -v node >/dev/null 2>&1 || brew install node ) && npm install -g @anthropic-ai/claude-code && echo "Done! Run: claude"'
      },
      windows: {
        heading: 'On Windows',
        bullets: [
          'Copy the install command below',
          'Open <strong>PowerShell</strong> — press <kbd>Win</kbd>, type <strong>PowerShell</strong>, press <kbd>Enter</kbd>',
          'Right-click to paste, then press <kbd>Enter</kbd>',
          'If Node.js is not installed, the command installs it via <strong>winget</strong>'
        ],
        command: 'Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force; if (!(Get-Command node -ErrorAction SilentlyContinue)) { winget install OpenJS.NodeJS.LTS -e --accept-source-agreements --accept-package-agreements }; npm install -g @anthropic-ai/claude-code; echo "Done! Run: claude"'
      }
    },
    subSections: [
      {
        heading: '🍎 What gets installed on Mac',
        os: 'mac',
        bullets: [
          '<strong>Homebrew</strong> — Package manager for installing developer tools (if not already installed)',
          '<strong>Node.js</strong> — JavaScript runtime required by Claude Code',
          '<strong>Claude Code</strong> — AI coding assistant that runs in your terminal'
        ]
      },
      {
        heading: '🪟 What gets installed on Windows',
        os: 'windows',
        bullets: [
          '<strong>Execution policy</strong> — Allows PowerShell to run developer scripts (current user only)',
          '<strong>Node.js</strong> — JavaScript runtime required by Claude Code (via winget)',
          '<strong>Claude Code</strong> — AI coding assistant that runs in your terminal'
        ]
      }
    ],
    command: null, hasCopyBtn: false, links: [],
    tip: 'Each step checks first — if something is already installed, it is skipped. Safe to re-run.',
    warn: null
  },

  /* ── 12 ────────────────────────────────────────────────────── */
  {
    id: 12,
    title: 'Verify installation',
    shortTitle: 'Verify installation',
    os: 'both', windowsOnly: false, required: false, optional: false,
    explanation: 'Confirm Claude Code was installed correctly by checking the version in a fresh terminal window.',
    bullets: [
      'Open a <strong>new terminal window</strong> (this ensures your <span data-tooltip="PATH is a list of directories your system searches when you run a command">PATH</span> is updated)',
      'Run <code>claude --version</code>',
      'You should see a version number, e.g. <code>claude 1.x.x</code>',
      'If not found, restart your terminal and try again'
    ],
    osSpecific: null, subSections: null,
    command: 'claude --version',
    hasCopyBtn: true, links: [],
    tip: 'If the command is not found, close your terminal completely and open a new one — then try again.',
    warn: null
  },

  /* ── 13 ────────────────────────────────────────────────────── */
  {
    id: 13,
    title: 'Configure Tool Permissions',
    shortTitle: 'Tool permissions',
    os: 'both', windowsOnly: false, required: false, optional: false,
    explanation: 'By default, Claude Code asks for permission before running each tool (reading files, running commands, writing code). You can allow tools to run automatically so you don\'t have to approve every action.',
    bullets: [
      'Start Claude Code by running <code>claude</code> in your terminal',
      'When Claude asks to use a tool, you can type <strong>a</strong> to "always allow" that tool',
      'Alternatively, start Claude Code with <code>claude --dangerously-skip-permissions</code> to auto-approve all tools',
      'You can also type <code>/permissions</code> inside Claude Code to review and manage allowed tools'
    ],
    osSpecific: null, subSections: null, command: null, hasCopyBtn: false, links: [],
    tip: 'Start by allowing tools one at a time with "a" (always allow) until you are comfortable, then consider using the skip-permissions flag.',
    warn: 'The <code>--dangerously-skip-permissions</code> flag grants Claude full access to run shell commands on your machine. Only use it in your own development environment.'
  },

  /* ── 14 ────────────────────────────────────────────────────── */
  {
    id: 14,
    title: 'Connect Google Drive and GitHub',
    shortTitle: 'Connect integrations',
    os: 'both', windowsOnly: false, required: false, optional: true,
    explanation: 'Link your accounts so Claude can read from your Drive and interact with your GitHub repositories.',
    bullets: [
      'In Claude Desktop, go to <strong>Settings → Integrations</strong>',
      'Click <strong>Connect Google Drive</strong> and complete the <span data-tooltip="OAuth lets you authorise an app without sharing your password">OAuth</span> flow',
      'Click <strong>Connect GitHub</strong> and authorise Claude',
      'Choose which repos and Drive folders to share with Claude'
    ],
    osSpecific: null, subSections: null, command: null, hasCopyBtn: false,
    links: [
      { text: 'drive.google.com ↗', url: 'https://drive.google.com' },
      { text: 'github.com ↗', url: 'https://github.com' }
    ],
    tip: 'These integrations let Claude reference your documents and propose pull requests.',
    warn: null
  },

  /* ── 15 ────────────────────────────────────────────────────── */
  {
    id: 15,
    title: 'Enable desktop-commander MCP server',
    shortTitle: 'desktop-commander',
    os: 'both', windowsOnly: false, required: false, optional: true,
    explanation: 'desktop-commander is an <span data-tooltip="MCP (Model Context Protocol) servers extend Claude\'s capabilities by connecting it to external tools and services">MCP server</span> that gives Claude Desktop the ability to run terminal commands, manage files, and control your desktop. It connects Claude Desktop to your local system so it can execute commands on your behalf.',
    bullets: [
      'Follow the two steps below in order',
      'You will need your terminal open and Claude Desktop installed'
    ],
    osSpecific: null,
    subSections: [
      {
        heading: '1. Install via terminal',
        bullets: [
          'Run: <code>npx @anthropic-ai/desktop-commander setup</code>',
          'This installs and configures the MCP server automatically',
          'If prompted to install a package, type <strong>y</strong> and press Enter'
        ]
      },
      {
        heading: '2. Restart Claude Desktop',
        bullets: [
          'Fully quit Claude Desktop (not just close the window)',
          'On Mac: click <strong>Claude</strong> in the menu bar → <strong>Quit Claude</strong>',
          'On Windows: right-click the Claude icon in the system tray → <strong>Quit</strong>',
          'Re-open Claude Desktop'
        ]
      },
      {
        heading: '3. Verify it works',
        bullets: [
          'Open a new conversation in Claude Desktop',
          'You should see a <strong>hammer icon 🔨</strong> or <strong>tools icon</strong> indicating MCP servers are connected',
          'Try asking: <em>"List the files in my home directory"</em>',
          'If Claude can list your files, desktop-commander is working'
        ]
      }
    ],
    command: 'npx @anthropic-ai/desktop-commander setup',
    hasCopyBtn: true, links: [],
    tip: 'If the setup command doesn\'t work, you can also install manually: run <code>npm install -g @anthropic-ai/desktop-commander</code>, then open Claude Desktop → Settings → Developer → Edit Config, and add the server to your config file.',
    warn: null
  }

]; // END ALL_STEPS


/* ════════════════════════════════════════════════════════════════
   STATE
════════════════════════════════════════════════════════════════ */
let selectedOS    = null;
let filteredSteps = [];
let currentIndex  = 0;
let completedSet  = new Set();


/* ════════════════════════════════════════════════════════════════
   SCREEN HELPERS
════════════════════════════════════════════════════════════════ */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}


/* ════════════════════════════════════════════════════════════════
   AUTO-DETECT OS
════════════════════════════════════════════════════════════════ */
function autoDetectOS() {
  const plat = navigator.platform || '';
  const ua   = navigator.userAgent || '';
  let detected = null;
  if (/Mac/.test(plat) || /Mac/.test(ua)) detected = 'mac';
  else if (/Win/.test(plat) || /Windows/.test(ua)) detected = 'windows';

  const note = document.getElementById('autodetectNote');
  if (detected && note) {
    const label = detected === 'mac' ? 'Mac' : 'Windows';
    note.textContent = `We detected ${label} — click the button above to confirm, or choose the other.`;
    const btn = document.getElementById(detected === 'mac' ? 'macBtn' : 'winBtn');
    if (btn) btn.classList.add('detected');
  }

  return detected;
}


/* ════════════════════════════════════════════════════════════════
   OS SELECTION
════════════════════════════════════════════════════════════════ */
function selectOS(os) {
  selectedOS = os;
  localStorage.setItem(LS_OS, os);
  loadProgress();
  initWizard();
}

function changeOS() {
  localStorage.removeItem(LS_OS);
  selectedOS = null;
  showScreen('osScreen');
}

/* ════════════════════════════════════════════════════════════════
   OS SWITCH PANEL
════════════════════════════════════════════════════════════════ */
function toggleOsPanel(e) {
  if (e) e.stopPropagation();
  const panel = document.getElementById('osSwitchPanel');
  const item  = document.getElementById('chooseItem');
  if (!panel) return;
  const isOpen = panel.classList.toggle('is-open');
  if (item) item.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  syncOsSwitchBtns();
}

function closeOsPanel() {
  const panel = document.getElementById('osSwitchPanel');
  const item  = document.getElementById('chooseItem');
  if (panel) panel.classList.remove('is-open');
  if (item)  item.setAttribute('aria-expanded', 'false');
}

function syncOsSwitchBtns() {
  const mac = document.getElementById('osSwitchMac');
  const win = document.getElementById('osSwitchWin');
  if (!mac || !win) return;
  mac.classList.toggle('is-active', selectedOS === 'mac');
  win.classList.toggle('is-active', selectedOS === 'windows');
}

function switchOS(os) {
  if (os === selectedOS) { closeOsPanel(); return; }
  selectedOS = os;
  localStorage.setItem(LS_OS, os);
  loadProgress();
  const firstIncomplete = filteredSteps.findIndex(s => !completedSet.has(s.id));
  currentIndex = firstIncomplete >= 0 ? firstIncomplete : 0;
  closeOsPanel();
  renderAll();
}


/* ════════════════════════════════════════════════════════════════
   PROGRESS STORAGE
════════════════════════════════════════════════════════════════ */
function getProgKey() { return selectedOS === 'mac' ? LS_PROG_MAC : LS_PROG_WIN; }
function getCurKey()  { return selectedOS === 'mac' ? LS_CUR_MAC  : LS_CUR_WIN;  }

function loadProgress() {
  const raw = localStorage.getItem(getProgKey());
  completedSet = raw ? new Set(JSON.parse(raw)) : new Set();

  filteredSteps = ALL_STEPS.filter(s => s.os === 'both' || s.os === selectedOS);

  const savedStepId = parseInt(localStorage.getItem(getCurKey()) || '0', 10);
  const idx = filteredSteps.findIndex(s => s.id === savedStepId);
  currentIndex = idx >= 0 ? idx : 0;
}

function saveProgress() {
  localStorage.setItem(getProgKey(), JSON.stringify([...completedSet]));
  const currentStep = filteredSteps[currentIndex];
  if (currentStep) localStorage.setItem(getCurKey(), String(currentStep.id));
}


/* ════════════════════════════════════════════════════════════════
   WIZARD INIT
════════════════════════════════════════════════════════════════ */
function initWizard() {
  filteredSteps = ALL_STEPS.filter(s => s.os === 'both' || s.os === selectedOS);
  currentIndex  = Math.min(currentIndex, filteredSteps.length - 1);
  currentIndex  = Math.max(currentIndex, 0);

  document.getElementById('osPill').textContent =
    selectedOS === 'mac' ? 'Mac' : 'Windows';

  showScreen('wizardScreen');
  renderAll();
}

function renderAll() {
  renderSidebar();
  renderDots();
  renderDetail();
  updateNav();
  syncOsSwitchBtns();
}


/* ════════════════════════════════════════════════════════════════
   SIDEBAR (step sub-list)
════════════════════════════════════════════════════════════════ */
function renderSidebar() {
  const list = document.getElementById('stepSubList');
  list.innerHTML = filteredSteps.map((step, i) => {
    const isActive = i === currentIndex;
    const isDone   = completedSet.has(step.id);
    const cls = ['step-sub-item',
      isActive ? 'is-active' : '',
      isDone   ? 'is-done'   : ''
    ].filter(Boolean).join(' ');

    const dotContent = isDone
      ? '✓'
      : `<span style="font-size:.58rem;font-weight:700">${i + 1}</span>`;

    const winBadge = step.windowsOnly
      ? '<span class="sub-win-badge">Win</span>' : '';

    return `
      <li class="${cls}"
          onclick="goToStep(${i})"
          role="button" tabindex="0"
          onkeydown="if(event.key==='Enter'||event.key===' ')goToStep(${i})">
        <span class="sub-dot">${dotContent}</span>
        <span style="flex:1;min-width:0">${step.shortTitle}</span>
        ${winBadge}
      </li>`;
  }).join('');

  // Scroll active item into view
  const active = list.querySelector('.is-active');
  if (active) active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });

  // Update mobile button label
  const mob = document.getElementById('mobStepLabel');
  if (mob) {
    const step = filteredSteps[currentIndex];
    mob.textContent = step ? `Step ${currentIndex + 1}: ${step.shortTitle}` : 'Steps';
  }
}


/* ════════════════════════════════════════════════════════════════
   PROGRESS DOTS
════════════════════════════════════════════════════════════════ */
function renderDots() {
  const row = document.getElementById('progressDots');
  row.innerHTML = filteredSteps.map((step, i) => {
    const isDone    = completedSet.has(step.id);
    const isCurrent = i === currentIndex;
    const cls = ['prog-dot',
      isDone    ? 'dot-done'    : '',
      isCurrent ? 'dot-current' : ''
    ].filter(Boolean).join(' ');
    const title = `Step ${i + 1}: ${step.shortTitle}${isDone ? ' ✓' : ''}`;
    return `<div class="${cls}" onclick="goToStep(${i})" title="${title}" role="button" tabindex="0"></div>`;
  }).join('');

  // Update progress bar and step counter
  const done    = filteredSteps.filter(s => completedSet.has(s.id)).length;
  const total   = filteredSteps.length;
  const pct     = total > 0 ? Math.round(done / total * 100) : 0;
  const fill    = document.getElementById('progressBarFill');
  const label   = document.getElementById('progressLabel');
  const counter = document.getElementById('stepCounter');
  if (fill)    fill.style.width = pct + '%';
  if (label)   label.textContent = `${done} of ${total} completed`;
  if (counter) counter.textContent = `Step ${currentIndex + 1} of ${total}`;
}


/* ════════════════════════════════════════════════════════════════
   DETAIL CARD
════════════════════════════════════════════════════════════════ */
function renderDetail() {
  const step   = filteredSteps[currentIndex];
  const os     = selectedOS;
  const isDone = completedSet.has(step.id);
  let   html   = '';

  /* Badges */
  html += '<div class="card-meta">';
  html += `<span class="badge badge-step">Step ${currentIndex + 1} of ${filteredSteps.length}</span>`;
  if (step.required)    html += '<span class="badge badge-required">Required</span>';
  if (step.optional)    html += '<span class="badge badge-optional">Optional</span>';
  if (step.windowsOnly) html += '<span class="badge badge-win-only">Windows Only</span>';
  html += '</div>';

  /* Title */
  html += `<h2 class="card-title">${step.title}</h2>`;

  /* Explanation */
  html += `<p class="card-explanation">${step.explanation}</p>`;

  /* Shared bullets */
  if (step.bullets && step.bullets.length > 0) {
    html += `<ul class="card-bullets">${step.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
  }

  /* OS-specific subsections */
  if (step.osSpecific) {
    const primary    = step.osSpecific[os];
    const otherOS    = os === 'mac' ? 'windows' : 'mac';
    const other      = step.osSpecific[otherOS];
    const otherLabel = otherOS === 'mac' ? 'Mac' : 'Windows';
    const primaryCls = os === 'mac' ? 'mac-section' : 'windows-section';
    const otherCls   = otherOS === 'mac' ? 'mac-section' : 'windows-section';

    if (primary) {
      html += `
        <div class="os-section ${primaryCls}">
          <p class="os-section-heading">${primary.heading}</p>
          <ul>${primary.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
          ${primary.command ? `<div class="cmd-block"><code>${escHtml(primary.command)}</code><button class="copy-btn" onclick="copyCommand(this)">Copy</button></div>` : ''}
        </div>`;
    }
    if (other) {
      if (step.showBothOS) {
        html += `
          <div class="os-section ${otherCls}">
            <p class="os-section-heading">${other.heading}</p>
            <ul>${other.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
            ${other.command ? `<div class="cmd-block"><code>${escHtml(other.command)}</code><button class="copy-btn" onclick="copyCommand(this)">Copy</button></div>` : ''}
          </div>`;
      } else {
        html += `
          <button class="toggle-other-os" onclick="toggleOtherOS(this)">
            Show ${otherLabel} instructions ▾
          </button>
          <div class="os-section ${otherCls} hidden" id="otherOsBlock">
            <p class="os-section-heading">${other.heading}</p>
            <ul>${other.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
            ${other.command ? `<div class="cmd-block"><code>${escHtml(other.command)}</code><button class="copy-btn" onclick="copyCommand(this)">Copy</button></div>` : ''}
          </div>`;
      }
    }
  }

  /* Named sub-sections */
  if (step.subSections && step.subSections.length > 0) {
    step.subSections.forEach(sec => {
      if (sec.os && sec.os !== os) return;
      html += `<h4 class="card-sub-heading">${sec.heading}</h4>`;
      html += `<ul class="card-bullets">${sec.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
    });
  }

  /* Command block */
  if (step.command) {
    html += `
      <div class="cmd-block">
        <code>${escHtml(step.command)}</code>
        ${step.hasCopyBtn ? '<button class="copy-btn" onclick="copyCommand(this)">Copy</button>' : ''}
      </div>`;
  }

  /* Tip */
  if (step.tip) {
    html += `<div class="tip-box"><span class="box-icon">💡</span><span>${step.tip}</span></div>`;
  }

  /* Warning */
  if (step.warn) {
    html += `<div class="warn-box"><span class="box-icon">⚠️</span><span>${step.warn}</span></div>`;
  }

  /* Links */
  if (step.links && step.links.length > 0) {
    html += '<div class="card-links">';
    step.links.forEach(l => {
      html += `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="card-link">${l.text}</a>`;
    });
    html += '</div>';
  }

  /* Mark as complete */
  html += `
    <hr class="card-divider" />
    <button class="mark-complete-btn ${isDone ? 'is-done' : ''}" onclick="toggleComplete()">
      <span class="mcb-circle">${isDone ? '✓' : ''}</span>
      <span class="mcb-label">${isDone ? 'Completed' : 'Mark as complete'}</span>
    </button>`;

  document.getElementById('stepCard').innerHTML = html;
  document.getElementById('appMain').scrollTop = 0;
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}


/* ════════════════════════════════════════════════════════════════
   TOGGLE OTHER OS SECTION
════════════════════════════════════════════════════════════════ */
function toggleOtherOS(btn) {
  const block      = document.getElementById('otherOsBlock');
  if (!block) return;
  const otherLabel = selectedOS === 'mac' ? 'Windows' : 'Mac';
  const hidden     = block.classList.contains('hidden');
  block.classList.toggle('hidden');
  btn.textContent = hidden
    ? `Hide ${otherLabel} instructions ▴`
    : `Show ${otherLabel} instructions ▾`;
}


/* ════════════════════════════════════════════════════════════════
   NAVIGATION
════════════════════════════════════════════════════════════════ */
function updateNav() {
  const back = document.getElementById('navBack');
  const next = document.getElementById('navNext');
  if (back) back.disabled = (currentIndex === 0);
  const isLast = currentIndex === filteredSteps.length - 1;
  if (next) next.textContent = isLast ? 'Finish ✓' : 'Next →';
}

function prevStep() {
  if (currentIndex > 0) {
    currentIndex--;
    saveProgress();
    renderAll();
  }
}

function nextStep() {
  if (currentIndex < filteredSteps.length - 1) {
    currentIndex++;
    saveProgress();
    renderAll();
  } else {
    showSuccess();
  }
}

function skipStep() {
  if (currentIndex < filteredSteps.length - 1) {
    currentIndex++;
    saveProgress();
    renderAll();
  } else {
    showSuccess();
  }
}

function goToStep(index) {
  currentIndex = index;
  saveProgress();
  renderAll();
  closeSidebar();
}


/* ════════════════════════════════════════════════════════════════
   MARK AS COMPLETE
════════════════════════════════════════════════════════════════ */
function toggleComplete() {
  const step = filteredSteps[currentIndex];
  if (!step) return;
  if (completedSet.has(step.id)) {
    completedSet.delete(step.id);
  } else {
    completedSet.add(step.id);
  }
  saveProgress();
  renderSidebar();
  renderDots();

  const isDone = completedSet.has(step.id);
  const btn = document.querySelector('.mark-complete-btn');
  if (btn) {
    btn.classList.toggle('is-done', isDone);
    btn.querySelector('.mcb-circle').textContent = isDone ? '✓' : '';
    btn.querySelector('.mcb-label').textContent  = isDone ? 'Completed' : 'Mark as complete';
  }
}


/* ════════════════════════════════════════════════════════════════
   COPY COMMAND
════════════════════════════════════════════════════════════════ */
function copyCommand(btn) {
  const step = filteredSteps[currentIndex];
  // Get command from osSpecific if available, otherwise from step.command
  let cmd = null;
  if (step.osSpecific && step.osSpecific[selectedOS] && step.osSpecific[selectedOS].command) {
    cmd = step.osSpecific[selectedOS].command;
  } else if (step.command) {
    cmd = step.command;
  }
  if (!cmd) return;

  const onCopied = () => {
    btn.textContent = '✓ Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2400);
  };

  const fallback = () => {
    const ta = Object.assign(document.createElement('textarea'), {
      value: cmd,
      style: 'position:fixed;opacity:0'
    });
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (_) {}
    document.body.removeChild(ta);
  };

  if (navigator.clipboard && location.protocol !== 'file:') {
    navigator.clipboard.writeText(cmd).then(onCopied).catch(() => { fallback(); onCopied(); });
  } else {
    fallback(); onCopied();
  }
}


/* ════════════════════════════════════════════════════════════════
   SUCCESS SCREEN
════════════════════════════════════════════════════════════════ */
function showSuccess() {
  const step = filteredSteps[currentIndex];
  if (step) completedSet.add(step.id);
  saveProgress();

  document.getElementById('successOsBadge').textContent =
    selectedOS === 'mac' ? 'Mac Setup Complete' : 'Windows Setup Complete';

  showScreen('successScreen');
}

function restartWizard() {
  localStorage.removeItem(getProgKey());
  localStorage.removeItem(getCurKey());
  localStorage.removeItem(LS_OS);
  completedSet.clear();
  currentIndex  = 0;
  selectedOS    = null;
  filteredSteps = [];
  showScreen('osScreen');
}


/* ════════════════════════════════════════════════════════════════
   START OVER (with confirmation)
════════════════════════════════════════════════════════════════ */
function confirmRestart() {
  const done = completedSet.size;
  const msg  = done > 0
    ? `You have ${done} completed step${done > 1 ? 's' : ''}. Start over and clear progress?`
    : 'Start over from the beginning?';
  if (window.confirm(msg)) restartWizard();
}


/* ════════════════════════════════════════════════════════════════
   MOBILE SIDEBAR TOGGLE
════════════════════════════════════════════════════════════════ */
function toggleSidebar() {
  const sidebar  = document.getElementById('appSidebar');
  const overlay  = document.getElementById('sidebarOverlay');
  const isOpen   = sidebar.classList.contains('is-open');
  sidebar.classList.toggle('is-open', !isOpen);
  overlay.classList.toggle('hidden', isOpen);
}

function closeSidebar() {
  document.getElementById('appSidebar').classList.remove('is-open');
  document.getElementById('sidebarOverlay').classList.add('hidden');
}


/* ════════════════════════════════════════════════════════════════
   KEYBOARD NAVIGATION
════════════════════════════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  if (!document.getElementById('wizardScreen').classList.contains('active')) return;
  const tag = document.activeElement.tagName;
  if (tag === 'INPUT' || tag === 'BUTTON' || tag === 'A' || tag === 'TEXTAREA') return;
  if (e.key === 'ArrowRight') { e.preventDefault(); nextStep(); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); prevStep(); }
});


/* ════════════════════════════════════════════════════════════════
   BOOT
════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const saved    = localStorage.getItem(LS_OS);
  const detected = autoDetectOS();

  if (saved === 'mac' || saved === 'windows') {
    selectedOS = saved;
    loadProgress();
    initWizard();
  } else if (detected) {
    selectedOS = detected;
    localStorage.setItem(LS_OS, detected);
    loadProgress();
    initWizard();
  } else {
    showScreen('osScreen');
  }

  // Close OS panel on outside click
  document.addEventListener('click', (e) => {
    const panel = document.getElementById('osSwitchPanel');
    const item  = document.getElementById('chooseItem');
    if (panel && panel.classList.contains('is-open')) {
      if (!item.contains(e.target) && !panel.contains(e.target)) {
        closeOsPanel();
      }
    }
  });
});
