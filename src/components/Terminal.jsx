import React, { useState, useRef, useEffect } from 'react';

export default function Terminal({ showToast }) {
    const [history, setHistory] = useState([
        { text: '// Welcome to Sri Nithish\'s Interactive Profile Terminal.', type: 't-dim' },
        { text: '// Type \'help\' to see list of commands, or click buttons below:', type: 't-dim' },
        { text: 'whoami', type: 't-gold', prompt: 'nithish:~$' },
        { text: 'Name: Sri Nithish S', type: 't-blue' },
        { text: 'Role: Cloud Infrastructure &amp; IoT Systems Engineer', type: 't-blue' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const screenRef = useRef(null);
    const inputRef = useRef(null);

    // Auto scroll to bottom of terminal screen
    useEffect(() => {
        if (screenRef.current) {
            screenRef.current.scrollTop = screenRef.current.scrollHeight;
        }
    }, [history]);

    // Focus input on terminal card click
    const handleCardClick = (e) => {
        if (!e.target.closest('.terminal-btn') && !e.target.closest('input')) {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    const appendConsole = (text, type = 't-normal', prompt = '') => {
        setHistory(prev => [...prev, { text, type, prompt }]);
    };

    const executeCommand = (cmdText) => {
        const cmd = cmdText.trim();
        if (!cmd) return;

        appendConsole(cmd, 't-gold', 'nithish:~$');

        const lowerCmd = cmd.toLowerCase();
        if (lowerCmd === 'help') {
            appendConsole('Available commands:<br>' +
                          '  <span class="t-gold">help</span>               - Show this list<br>' +
                          '  <span class="t-gold">whoami</span>             - Basic role details<br>' +
                          '  <span class="t-gold">cat bio.txt</span>        - Professional summary<br>' +
                          '  <span class="t-gold">cat about_me.json</span>  - Education &amp; leadership details<br>' +
                          '  <span class="t-gold">get-stack</span>          - List of technical capabilities<br>' +
                          '  <span class="t-gold">fetch-achievements</span>- Key accomplishments<br>' +
                          '  <span class="t-gold">clear</span>             - Clear screen', 't-normal');
        } else if (lowerCmd === 'whoami') {
            appendConsole('Name: Sri Nithish S', 't-blue');
            appendConsole('Role: Cloud Infrastructure &amp; IoT Systems Engineer', 't-blue');
        } else if (lowerCmd === 'cat bio.txt') {
            appendConsole('Passionate about building scalable backend services, IoT systems, and cloud-native environments. Former Graduate Intern at Mr. Cooper &amp; CSE President at SVCT.', 't-green');
        } else if (lowerCmd === 'cat about_me.json') {
            appendConsole('{\n  "education": "B.E. Computer Science &amp; Engineering, SVCT",\n  "leadership": "President of CSE Association &amp; Programmers Club",\n  "passion": "Building scalable backend pipelines &amp; secure AWS integrations"\n}', 't-normal');
        } else if (lowerCmd.startsWith('get-stack')) {
            appendConsole('[Languages] Python, Java, JavaScript, TypeScript, C/C++', 't-green');
            appendConsole('[Cloud/Infra] AWS (Lambda, IoT Core, IAM, DynamoDB, API Gateway)', 't-blue');
            appendConsole('[Tools] Spring Boot, Node.js, React.js, InfluxDB, ESP32, Docker', 't-amber');
        } else if (lowerCmd.startsWith('fetch-achievements')) {
            appendConsole('- Spearheaded CSE Association at SVCT running tech events for 300+ peers.', 't-normal');
            appendConsole('- Engineered Surplus Food Management microservices at Mr. Cooper.', 't-normal');
            appendConsole('- Developed custom ESP32 MQTT edge gateways syncing with AWS Cloud.', 't-normal');
        } else if (lowerCmd === 'clear') {
            setHistory([]);
            return;
        } else {
            appendConsole(`Command not found: ${cmd}. Type <span class="t-gold">'help'</span> for list of commands.`, 't-amber');
        }
        showToast(`Executed: ${cmd}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            executeCommand(inputValue);
            setInputValue('');
        }
    };

    return (
        <div className="terminal-card" onClick={handleCardClick}>
            <div className="terminal-header">
                <div className="terminal-dots">
                    <div className="terminal-dot dot-red"></div>
                    <div className="terminal-dot dot-amber"></div>
                    <div className="terminal-dot dot-green"></div>
                </div>
                <span className="terminal-title">Sri Nithish's Bio Terminal</span>
                <div style={{ width: '40px' }}></div>
            </div>
            <div className="terminal-body">
                <div id="terminal-screen" ref={screenRef}>
                    {history.map((line, idx) => (
                        <div key={idx} className={line.type}>
                            {line.prompt && (
                                <span className="t-dim" style={{ userSelect: 'none' }}>
                                    {line.prompt}{' '}
                                </span>
                            )}
                            <span dangerouslySetInnerHTML={{ __html: line.text }} />
                        </div>
                    ))}
                    <div className="terminal-input-line">
                        <span className="t-normal" style={{ userSelect: 'none' }}>nithish:~$</span>
                        <input
                            type="text"
                            id="terminal-input"
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="type 'help'..."
                            autoComplete="off"
                            spellCheck="false"
                        />
                    </div>
                </div>
                <div className="terminal-controls">
                    <button className="terminal-btn" onClick={() => executeCommand('cat about_me.json')}>
                        <i className="fa-solid fa-user" style={{ color: 'var(--gold-bright)' }}></i>
                        About Me
                    </button>
                    <button className="terminal-btn" onClick={() => executeCommand('get-stack')}>
                        <i className="fa-solid fa-layer-group" style={{ color: 'var(--amber)' }}></i>
                        Tech Stack
                    </button>
                    <button className="terminal-btn" onClick={() => executeCommand('fetch-achievements')}>
                        <i className="fa-solid fa-trophy" style={{ color: '#34d399' }}></i>
                        Quick Facts
                    </button>
                </div>
            </div>
        </div>
    );
}
