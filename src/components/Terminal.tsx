import React, { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  text: string;
  type: string;
  prompt?: string;
}

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: '// Welcome to Sri Nithish\'s Interactive Profile Terminal.', type: 'text-muted/60 font-mono text-[11px]' },
    { text: '// Type \'help\' to see a list of commands, or click buttons below:', type: 'text-muted/60 font-mono text-[11px]' },
    { text: 'whoami', type: 'text-primary font-mono font-semibold text-xs', prompt: 'nithish:~$' },
    { text: 'Name: Sri Nithish S', type: 'text-foreground font-mono text-xs' },
    { text: 'Role: Cloud Infrastructure Engineer & Systems Developer', type: 'text-[#8cc8f8] font-mono text-xs' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom of terminal screen
  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on terminal card click
  const handleCardClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.terminal-btn') && !(e.target as HTMLElement).closest('input')) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const appendConsole = (text: string, type = 'text-foreground font-mono text-xs', prompt = '') => {
    setHistory(prev => [...prev, { text, type, prompt }]);
  };

  const executeCommand = (cmdText: string) => {
    const cmd = cmdText.trim();
    if (!cmd) return;

    appendConsole(cmd, 'text-primary font-mono font-semibold text-xs', 'nithish:~$');

    const lowerCmd = cmd.toLowerCase();
    if (lowerCmd === 'help') {
      appendConsole('Available commands:<br>' +
                    '  <span class="text-primary font-bold">help</span>               - Show this list<br>' +
                    '  <span class="text-primary font-bold">whoami</span>             - Basic role details<br>' +
                    '  <span class="text-primary font-bold">cat bio.txt</span>        - Professional summary<br>' +
                    '  <span class="text-primary font-bold">cat about_me.json</span>  - Education &amp; leadership details<br>' +
                    '  <span class="text-primary font-bold">get-stack</span>          - List of technical capabilities<br>' +
                    '  <span class="text-primary font-bold">fetch-achievements</span>- Key accomplishments<br>' +
                    '  <span class="text-primary font-bold">clear</span>             - Clear screen', 'text-muted-foreground font-mono text-xs');
    } else if (lowerCmd === 'whoami') {
      appendConsole('Name: Sri Nithish S', 'text-foreground font-mono text-xs');
      appendConsole('Role: Cloud Infrastructure Engineer &amp; Systems Developer', 'text-[#8cc8f8] font-mono text-xs');
    } else if (lowerCmd === 'cat bio.txt') {
      appendConsole('Passionate about building scalable backend services, IoT systems, and cloud-native environments. Former Graduate Intern at Mr. Cooper &amp; CSE Association President at SVCT.', 'text-[#2dfd38]/90 font-mono text-xs');
    } else if (lowerCmd === 'cat about_me.json') {
      appendConsole('{\n  "education": "B.E. Computer Science &amp; Engineering, SVCT",\n  "leadership": "President of CSE Association &amp; Programmers Club",\n  "passion": "Building scalable backend pipelines &amp; secure AWS integrations"\n}', 'text-muted-foreground font-mono text-xs');
    } else if (lowerCmd.startsWith('get-stack')) {
      appendConsole('[Languages] Python, Java, JavaScript, TypeScript, C/C++', 'text-[#2dfd38]/90 font-mono text-xs');
      appendConsole('[Cloud/Infra] AWS (Lambda, IoT Core, IAM, DynamoDB, API Gateway)', 'text-[#8cc8f8] font-mono text-xs');
      appendConsole('[Tools] Spring Boot, Node.js, React.js, InfluxDB, ESP32, Docker', 'text-[#ffd479] font-mono text-xs');
    } else if (lowerCmd.startsWith('fetch-achievements')) {
      appendConsole('- Spearheaded CSE Association at SVCT running tech events for 300+ peers.', 'text-foreground font-mono text-xs');
      appendConsole('- Engineered Surplus Food Management microservices at Mr. Cooper.', 'text-foreground font-mono text-xs');
      appendConsole('- Developed custom ESP32 MQTT edge gateways syncing with AWS Cloud.', 'text-foreground font-mono text-xs');
    } else if (lowerCmd === 'clear') {
      setHistory([]);
      return;
    } else {
      appendConsole(`Command not found: ${cmd}. Type <span class="text-primary font-bold">'help'</span> for list of commands.`, 'text-destructive font-mono text-xs');
    }
    showToast(`Executed: ${cmd}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputValue);
      setInputValue('');
    }
  };

  return (
    <div 
      className="w-full bg-black/75 backdrop-blur-md rounded-xl border border-border/60 shadow-2xl relative overflow-hidden flex flex-col h-[380px]"
      onClick={handleCardClick}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-border/40 select-none">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/85"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/85"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/85"></div>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Sri Nithish's Interactive Profile Terminal</span>
        <div className="w-[30px]"></div>
      </div>

      {/* Terminal Output */}
      <div 
        ref={screenRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2.5 scrollbar-thin scrollbar-thumb-white/10"
      >
        {history.map((line, idx) => (
          <div key={idx} className={line.type}>
            {line.prompt && (
              <span className="text-primary font-bold mr-1.5 select-none">
                {line.prompt}
              </span>
            )}
            <span dangerouslySetInnerHTML={{ __html: line.text }} className="whitespace-pre-wrap" />
          </div>
        ))}
        
        {/* Terminal Input Line */}
        <div className="flex items-center gap-1.5">
          <span className="text-primary font-bold select-none">nithish:~$</span>
          <input
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type 'help'..."
            className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-xs p-0 focus:ring-0 placeholder:text-muted-foreground/30"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>

      {/* Quick Access Control Buttons */}
      <div className="grid grid-cols-3 border-t border-border/40 bg-white/[0.01]">
        <button 
          className="terminal-btn py-3 text-[10px] font-mono font-bold tracking-wider uppercase border-r border-border/40 hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer text-center text-muted-foreground"
          onClick={() => executeCommand('cat about_me.json')}
        >
          📂 Profile
        </button>
        <button 
          className="terminal-btn py-3 text-[10px] font-mono font-bold tracking-wider uppercase border-r border-border/40 hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer text-center text-muted-foreground"
          onClick={() => executeCommand('get-stack')}
        >
          ⚙️ Tech Stack
        </button>
        <button 
          className="terminal-btn py-3 text-[10px] font-mono font-bold tracking-wider uppercase hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer text-center text-muted-foreground"
          onClick={() => executeCommand('fetch-achievements')}
        >
          🏆 Achievements
        </button>
      </div>

      {/* Simple floating toast notifications */}
      {toastMessage && (
        <div className="absolute bottom-16 right-4 px-3 py-1.5 rounded bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] animate-fade-in shadow-md shadow-primary/5">
          {toastMessage}
        </div>
      )}

    </div>
  );
};
export default Terminal;
