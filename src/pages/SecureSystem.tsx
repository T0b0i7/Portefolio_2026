import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AlertItem {
  text: string;
  time: string;
}

export function SecureSystem() {
  const { lang, language } = useLanguage();
  const [screenState, setScreenState] = useState<"startup" | "access-granted" | "terminal">("startup");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [initProgress, setInitProgress] = useState(0);
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [hackMessages, setHackMessages] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [stats, setStats] = useState({
    networkSpeed: 12.4,
    cpuUsage: 34,
    memoryUsage: 7.2,
    threatCount: 3,
    temperature: 42,
    missionProgress: 30
  });
  const [systemTime, setSystemTime] = useState("");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [commandInput, setCommandInput] = useState("");
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<{ sender: string, text: string }[]>([
    {
      sender: "bot",
      text: lang(
        "Bonjour, je suis votre assistant IA CYBER-MATRIX.\nTapez 'help' pour voir les commandes disponibles.",
        "Hello, I am your AI assistant CYBER-MATRIX.\nType 'help' to see available commands."
      )
    }
  ]);
  const [aiInput, setAiInput] = useState("");
  const [cryptoInput, setCryptoInput] = useState("");
  const [cryptoResult, setCryptoResult] = useState("");

  const codeOutputRef = useRef<HTMLDivElement>(null);
  const consoleOutputRef = useRef<HTMLDivElement>(null);
  const aiMessagesRef = useRef<HTMLDivElement>(null);
  const currentLineRef = useRef(0);
  const hackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const statsIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const alertIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const codeSnippets = [
    { prompt: "[root@cyber-matrix]# ", command: "whoami", output: "root" },
    { prompt: "[root@cyber-matrix]# ", command: "uname -a", output: "Linux cyber-matrix 5.15.0 #1 SMP Wed Nov 1 00:00:00 UTC 2024 x86_64 GNU/Linux" },
    { prompt: "[root@cyber-matrix]# ", command: "cat /proc/cpuinfo | grep 'model name' | head -1", output: "model name\t: Intel(R) Xeon(R) CPU E5-2699 v4 @ 2.20GHz" },
    { prompt: "[root@cyber-matrix]# ", command: "free -h", output: "Mem:           125G         24G         89G        1.2G         11G         99G" },
    { prompt: "[root@cyber-matrix]# ", command: "df -h /", output: "/dev/nvme0n1p2  2.0T  456G  1.5T  24% /" },
    { prompt: "[root@cyber-matrix]# ", command: "ss -tulpn | grep LISTEN", output: "tcp   LISTEN 0      128          0.0.0.0:22          0.0.0.0:*\ntcp   LISTEN 0      128          0.0.0.0:80          0.0.0.0:*\ntcp   LISTEN 0      128          0.0.0.0:443         0.0.0.0:*" },
    { prompt: "[root@cyber-matrix]# ", command: "ps aux | grep -E '(ssh|nginx|mysql)' | head -5", output: "root       1234  0.0  0.1  12345  6789 ?        Ss   10:00   0:00 /usr/sbin/sshd\nwww-data   1235  0.0  0.3  23456  9012 ?        S    10:00   0:00 nginx: worker process" },
    { prompt: "[SYSTEM]# ", command: "SESSION_SECURE --status=ACTIVE --user=ROOT", output: lang("Système sécurisé. Aucune menace détectée.", "System secure. No threats detected.") }
  ];

  const hackMessagesList = [
    lang("⚠️ Surveillance du trafic réseau en cours", "⚠️ Monitoring network traffic"),
    lang("🔍 Analyse des journaux système", "🔍 System logs analysis"),
    lang("✓ Vérification de l'intégrité des fichiers", "✓ File integrity check"),
    lang("📊 Scan des processus actifs", "📊 Active processes scan"),
    lang("🔗 Contrôle des connexions établies", "🔗 Established connections check"),
    lang("👥 Audit des permissions utilisateur", "👥 User permissions audit"),
    lang("🛡️ Scan des vulnérabilités détecté", "🛡️ Vulnerability scan detected"),
    lang("📡 Mise à jour des bases de données IDS", "📡 IDS databases updating")
  ];

  const aiResponses: { [key: string]: string | (() => string) } = {
    help: lang(
      "Commandes disponibles:\nstatus - Affiche le statut du système\nscan - Scanne le réseau\nwhoami - Affiche l'utilisateur courant\ntime - Affiche l'heure système\ncrypto - Affiche les outils de cryptographie\nclear - Efface le terminal",
      "Available commands:\nstatus - Display system status\nscan - Scan network\nwhoami - Display current user\ntime - Display system time\ncrypto - Display crypto tools\nclear - Clear terminal"
    ),
    status: lang(
      `Système: OPTIMAL\nCPU: ${stats.cpuUsage}%\nMémoire: ${stats.memoryUsage}/16 GB\nTempérature: ${stats.temperature}°C\nMenaces: ${stats.threatCount}`,
      `System: OPTIMAL\nCPU: ${stats.cpuUsage}%\nMemory: ${stats.memoryUsage}/16 GB\nTemperature: ${stats.temperature}°C\nThreats: ${stats.threatCount}`
    ),
    scan: lang(
      "Scan réseau en cours...\n192.168.1.1 - Routeur principal\n192.168.1.100 - Votre machine\n192.168.1.150 - Serveur inconnu\n192.168.1.200 - Base de données",
      "Network scan in progress...\n192.168.1.1 - Main Router\n192.168.1.100 - Your machine\n192.168.1.150 - Unknown server\n192.168.1.200 - Database"
    ),
    whoami: lang(
      "Utilisateur: AGENT_NEO\nNiveau: QUANTUM\nID: 01101000\nSession: ACTIVE",
      "User: AGENT_NEO\nLevel: QUANTUM\nID: 01101000\nSession: ACTIVE"
    ),
    time: () => lang(`Heure système: ${systemTime}`, `System time: ${systemTime}`),
    crypto: lang(
      "Outils cryptographiques disponibles:\n- Base64 Encode/Decode\n- Chiffre César\n- SHA256\n- MD5",
      "Crypto tools available:\n- Base64 Encode/Decode\n- Caesar Cipher\n- SHA256\n- MD5"
    ),
    default: lang("Commande non reconnue. Tapez 'help' pour l'aide.", "Command not recognized. Type 'help' for help.")
  };

  const checkPassword = () => {
    if (!password) {
      setErrorMessage(lang("ERREUR: Code d'accès requis", "ERROR: Access code required"));
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (password === "Motdepasse") {
      setScreenState("access-granted");
      let width = 0;
      const interval = setInterval(() => {
        width += 2;
        setInitProgress(width);
        if (width >= 100) clearInterval(interval);
      }, 30);
    } else {
      setErrorMessage(lang("ERREUR: Code d'accès incorrect", "ERROR: Incorrect access code"));
      setPassword("");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const startTerminal = () => {
    setScreenState("terminal");
    currentLineRef.current = 0;
    setCodeLines([]);
    typeCode();

    if (hackIntervalRef.current) clearInterval(hackIntervalRef.current);
    hackIntervalRef.current = setInterval(generateHackMessages, 800);

    if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);
    statsIntervalRef.current = setInterval(updateStats, 100);

    if (alertIntervalRef.current) clearInterval(alertIntervalRef.current);
    alertIntervalRef.current = setInterval(generateAlert, 3000);

    if (timeIntervalRef.current) clearInterval(timeIntervalRef.current);
    timeIntervalRef.current = setInterval(updateSystemTime, 1000);
    updateSystemTime();
  };

  const typeCode = () => {
    if (currentLineRef.current >= codeSnippets.length) {
      setTimeout(() => {
        currentLineRef.current = 0;
        setCodeLines([]);
        typeCode();
      }, 5000);
      return;
    }

    const snippet = codeSnippets[currentLineRef.current];
    const line1 = snippet.prompt + snippet.command;
    const line2 = snippet.output;

    setCodeLines(prev => [...prev, line1]);
    setTimeout(() => {
      setCodeLines(prev => [...prev, line2]);
      currentLineRef.current++;
      setTimeout(typeCode, 800);
    }, 300);
  };

  const generateHackMessages = () => {
    const msg = hackMessagesList[Math.floor(Math.random() * hackMessagesList.length)];
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    setHackMessages(prev => [...prev.slice(-5), `[${time}] ${msg}`]);
  };

  const generateAlert = () => {
    const alertTexts = [
      lang("Tentative de connexion non autorisée détectée", "Unauthorized login attempt detected"),
      lang("Scan de ports en cours sur l'interface eth0", "Port scan in progress on eth0 interface"),
      lang("Anomalie détectée dans les logs système", "Anomaly detected in system logs"),
      lang("Trafic réseau suspect détecté", "Suspicious network traffic detected"),
      lang("Utilisation CPU anormale sur le serveur DB", "Abnormal CPU usage on DB server"),
    ];

    if (Math.random() > 0.6) {
      const alertText = alertTexts[Math.floor(Math.random() * alertTexts.length)];
      const now = new Date();
      const time = now.toLocaleTimeString('fr-FR');

      if (consoleOutputRef.current) {
        const alertDiv = document.createElement('div');
        alertDiv.textContent = `[${time}] ⚠️ ${alertText}`;
        consoleOutputRef.current.appendChild(alertDiv);
        consoleOutputRef.current.scrollTop = consoleOutputRef.current.scrollHeight;
      }
    }
  };

  const updateStats = () => {
    setStats(prev => ({
      ...prev,
      networkSpeed: parseFloat((Math.random() * 5 + 10).toFixed(1)),
      cpuUsage: Math.floor(Math.random() * 20 + 30),
      memoryUsage: parseFloat((Math.random() * 2 + 6).toFixed(1)),
      threatCount: Math.floor(Math.random() * 5),
      temperature: Math.floor(Math.random() * 10 + 38),
    }));
  };

  const updateSystemTime = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('fr-FR', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    setSystemTime(time);
  };

  const executeCommand = () => {
    if (!commandInput.trim()) return;

    const cmd = commandInput.toLowerCase().trim();
    let response = aiResponses[cmd] || aiResponses.default;

    if (typeof response === 'function') {
      response = response();
    }

    if (codeOutputRef.current) {
      const cmdLine = document.createElement('div');
      cmdLine.innerHTML = `<span style="color: #ff0">[root]#</span> ${commandInput}`;
      codeOutputRef.current.appendChild(cmdLine);

      const responseLine = document.createElement('div');
      responseLine.innerHTML = `<span style="color: #8f8">${response}</span>`;
      responseLine.style.whiteSpace = 'pre-wrap';
      codeOutputRef.current.appendChild(responseLine);

      codeOutputRef.current.scrollTop = codeOutputRef.current.scrollHeight;
    }

    setCommandInput("");
  };

  const sendAIMessage = () => {
    if (!aiInput.trim()) return;

    const userMsg = { sender: "user", text: aiInput };
    setAiMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const cmd = aiInput.toLowerCase().trim();
      let botResponse = aiResponses[cmd] || aiResponses.default;

      if (typeof botResponse === 'function') {
        botResponse = botResponse();
      }

      const botMsg = { sender: "bot", text: botResponse };
      setAiMessages(prev => [...prev, botMsg]);

      if (aiMessagesRef.current) {
        setTimeout(() => {
          aiMessagesRef.current!.scrollTop = aiMessagesRef.current!.scrollHeight;
        }, 0);
      }
    }, 500);

    setAiInput("");
  };

  const encryptBase64 = () => {
    if (!cryptoInput) return;
    const encoded = btoa(cryptoInput);
    setCryptoResult(`Base64: ${encoded}`);
  };

  const decryptBase64 = () => {
    if (!cryptoInput) return;
    try {
      const decoded = atob(cryptoInput);
      setCryptoResult(lang(`Décodé: ${decoded}`, `Decoded: ${decoded}`));
    } catch (e) {
      setCryptoResult(lang("Erreur: Texte Base64 invalide", "Error: Invalid Base64 text"));
    }
  };

  const encryptCaesar = () => {
    if (!cryptoInput) return;
    const shift = 3;
    let result = '';

    for (let i = 0; i < cryptoInput.length; i++) {
      let char = cryptoInput[i];
      if (char.match(/[a-z]/i)) {
        const code = cryptoInput.charCodeAt(i);
        if (code >= 65 && code <= 90) {
          char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
      }
      result += char;
    }

    setCryptoResult(lang(`César(+3): ${result}`, `Caesar(+3): ${result}`));
  };

  useEffect(() => {
    return () => {
      if (hackIntervalRef.current) clearInterval(hackIntervalRef.current);
      if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);
      if (alertIntervalRef.current) clearInterval(alertIntervalRef.current);
      if (timeIntervalRef.current) clearInterval(timeIntervalRef.current);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-green-500 font-mono overflow-hidden relative" style={{ backgroundColor: '#000', color: '#0f0' }}>
      <style>{`
        .scanlines {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, transparent 50%, rgba(0, 255, 0, 0.03) 50%);
          background-size: 100% 4px;
          pointer-events: none;
          z-index: 10;
          animation: flicker 0.15s infinite;
        }
        
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.95; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .glass-panel {
          background: rgba(0, 30, 0, 0.6);
          border: 2px solid #0f0;
          border-radius: 8px;
          backdrop-filter: blur(10px);
          box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
        }
      `}</style>

      <div className="scanlines" />

      {/* Startup Screen */}
      {screenState === "startup" && (
        <div className="fixed inset-0 flex flex-col justify-center items-center gap-8 z-50 bg-gradient-to-b from-black via-green-900/10 to-black">
          <div
            className="w-40 h-40 rounded-full border-4 border-green-500 flex items-center justify-center animate-spin"
            style={{ borderColor: '#0f0', animation: 'rotate 8s linear infinite' }}
          >
            <div className="w-32 h-32 rounded-full border-2 border-cyan-400 flex items-center justify-center">
              <div className="text-4xl font-bold text-green-500">◆</div>
            </div>
          </div>

          <div className="text-5xl font-bold text-green-500 text-center" style={{ textShadow: '0 0 30px #0f0', letterSpacing: '3px' }}>
            CYBER-MATRIX v2.0
          </div>

          <div className="text-2xl text-cyan-400 text-center" style={{ animation: 'pulse 2s infinite' }}>
            {lang("[ ACCÈS QUANTIQUE REQUIS ]", "[ QUANTUM ACCESS REQUIRED ]")}<br />
            <span className="text-sm">{lang("Système de sécurité niveau 9", "Level 9 Security System")}</span>
          </div>

          <div className="w-96">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkPassword()}
              className="w-full px-5 py-4 bg-transparent border-2 border-green-500 text-cyan-400 text-center text-lg font-mono tracking-widest"
              placeholder={lang("ENTREZ LE CODE D'ACCÈS", "ENTER ACCESS CODE")}
              autoFocus
              style={{ color: '#0ff', borderColor: '#0f0', outline: 'none' }}
            />
          </div>

          <button
            onClick={checkPassword}
            className="w-96 py-4 font-bold text-lg hover:scale-105 transition-transform"
            style={{ background: 'linear-gradient(45deg, #0a0, #0f0)', color: '#000' }}
          >
            {lang("INITIALISER LA CONNEXION", "INITIALIZE CONNECTION")}
          </button>

          {errorMessage && (
            <div className="text-red-500 text-lg font-bold" style={{ textShadow: '0 0 15px #f00', animation: 'pulse 0.5s infinite' }}>
              {errorMessage}
            </div>
          )}

          <div className="text-xs text-green-700">
            {lang("Indice : Le code est \"Motdepasse\" (sensible à la casse)", "Hint: The code is \"Motdepasse\" (case sensitive)")}
          </div>

          <div style={{ color: '#666', fontSize: '12px', marginTop: '30px' }}>
            {lang("Chargement des modules quantiques...", "Loading quantum modules...")} [██████░░░░] 60%
          </div>
        </div>
      )}

      {/* Access Granted Screen */}
      {screenState === "access-granted" && (
        <div className="fixed inset-0 flex flex-col justify-center items-center gap-8 bg-gradient-to-b from-green-900/20 to-black z-50">
          <div className="text-7xl font-bold text-green-500 animate-pulse" style={{ textShadow: '0 0 50px #0f0', letterSpacing: '2px' }}>
            {lang("ACCÈS QUANTIQUE AUTORISÉ", "QUANTUM ACCESS GRANTED")}
          </div>

          <div className="text-2xl text-cyan-400 text-center">
            {lang("Connexion établie avec le réseau CYBER-MATRIX", "Connection established with CYBER-MATRIX network")}<br />
            <span className="text-base text-green-400">{lang("Identification biométrique : VALIDE", "Biometric identification: VALID")}</span>
          </div>

          <div className="text-xl text-cyan-400">
            {lang("Initialisation des systèmes neuronaux...", "Initializing neural systems...")}
          </div>

          <div className="w-96 h-6 bg-black border-2 border-green-500 rounded overflow-hidden">
            <div
              className="h-full transition-all"
              style={{ width: `${initProgress}%`, background: 'linear-gradient(90deg, #0a0, #0f0, #0ff)' }}
            />
          </div>

          <div className="text-sm text-green-700">
            {lang("Chargement des modules : IA (100%) • 3D (85%) • Audio (70%) • Jeux (60%)", "Loading modules: AI (100%) • 3D (85%) • Audio (70%) • Games (60%)")}
          </div>

          <button
            onClick={startTerminal}
            className="px-12 py-4 mt-8 font-bold text-2xl hover:scale-110 transition-transform"
            style={{ background: 'linear-gradient(45deg, #0f0, #0ff, #00f)', color: '#000' }}
          >
            {lang("ENTRER DANS LA MATRICE", "ENTER THE MATRIX")}
          </button>
        </div>
      )}

      {/* Terminal Screen */}
      {screenState === "terminal" && (
        <div className="w-full h-screen p-6 overflow-auto" style={{ background: 'linear-gradient(to bottom, #000, #001100)' }}>
          {/* Header */}
          <div className="glass-panel p-4 mb-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-cyan-400 flex items-center justify-center text-black font-bold"
              >
                JD
              </div>
              <div>
                <div className="text-cyan-400 font-bold">AGENT: NEO</div>
                <div className="text-green-700 text-sm">{lang("Niveau d'accès: QUANTUM • ID: 01101000", "Access Level: QUANTUM • ID: 01101000")}</div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-green-500 font-bold">{lang("MISSION: PROTOCOLE CERBÈRE", "MISSION: CERBERUS PROTOCOL")}</div>
              <div className="w-64 h-2 bg-black border border-green-500 rounded mt-2">
                <div className="h-full bg-gradient-to-r from-green-500 to-cyan-400" style={{ width: `${stats.missionProgress}%` }} />
              </div>
            </div>

            <div className="text-3xl font-mono" style={{ color: '#0ff' }}>{systemTime}</div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-4">
            {/* Stats Panels */}
            <div className="glass-panel p-3">
              <div className="text-green-700 text-xs">{lang("DÉBIT RÉSEAU", "NETWORK SPEED")}</div>
              <div style={{ color: '#0ff', fontSize: '20px', fontFamily: 'monospace' }}>{stats.networkSpeed} Gb/s</div>
            </div>

            <div className="glass-panel p-3">
              <div className="text-green-700 text-xs">{lang("CPU UTILISATION", "CPU USAGE")}</div>
              <div style={{ color: '#0ff', fontSize: '20px', fontFamily: 'monospace' }}>{stats.cpuUsage}%</div>
            </div>

            <div className="glass-panel p-3">
              <div className="text-green-700 text-xs">{lang("MÉMOIRE SYSTÈME", "SYSTEM MEMORY")}</div>
              <div style={{ color: '#0ff', fontSize: '20px', fontFamily: 'monospace' }}>{stats.memoryUsage}/16 GB</div>
            </div>

            <div className="glass-panel p-3">
              <div className="text-green-700 text-xs">{lang("TEMPÉRATURE", "TEMPERATURE")}</div>
              <div style={{ color: '#0ff', fontSize: '20px', fontFamily: 'monospace' }}>{stats.temperature}°C</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4" style={{ height: '500px' }}>
            {/* Terminal */}
            <div className="col-span-2 glass-panel p-4 flex flex-col">
              <div className="flex justify-between items-center pb-3 border-b border-green-500/30">
                <div className="text-cyan-400 font-bold">[root@cyber-matrix] ~ # {lang("TERMINAL QUANTIQUE", "QUANTUM TERMINAL")}</div>
                <div className="flex gap-2">
                  <button onClick={() => setCodeLines([])} className="w-8 h-8 bg-green-500/20 border border-green-500 rounded text-xs hover:bg-green-500/40">⌫</button>
                  <button onClick={() => setAiChatOpen(!aiChatOpen)} className="w-8 h-8 bg-green-500/20 border border-green-500 rounded text-xs hover:bg-green-500/40">AI</button>
                </div>
              </div>

              <div ref={codeOutputRef} className="flex-1 overflow-y-auto bg-black/60 border border-green-500/20 rounded p-3 my-3 text-sm space-y-1" style={{ color: '#0f0' }}>
                {codeLines.length === 0 ? (
                  <div style={{ color: '#006600' }}>// {lang("Initialisation du système...", "System initializing...")}</div>
                ) : (
                  codeLines.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap font-mono text-green-400">
                      {line}
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-2">
                <div style={{ color: '#0ff' }} className="font-bold">[root]#</div>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && executeCommand()}
                  className="flex-1 bg-transparent border-b border-green-500 outline-none text-green-400"
                  placeholder={lang("Entrez une commande...", "Enter a command...")}
                  style={{ color: '#0f0' }}
                />
                <button onClick={executeCommand} className="px-3 py-1 bg-green-500/30 border border-green-500 rounded hover:bg-green-500/50">EXEC</button>
              </div>
            </div>

            {/* Tools Panel */}
            <div className="glass-panel p-4 space-y-3 overflow-y-auto">
              <div>
                <div className="text-cyan-400 text-sm font-bold mb-2">{lang("OUTILS DE HACK", "HACKING TOOLS")}</div>
                <button className="w-full text-left px-3 py-2 bg-green-500/10 border border-green-500 rounded text-xs hover:bg-green-500/20 mb-1">🔌 {lang("CÂBLAGE RÉSEAU", "NETWORK WIRING")}</button>
                <button className="w-full text-left px-3 py-2 bg-green-500/10 border border-green-500 rounded text-xs hover:bg-green-500/20 mb-1">🔐 {lang("DÉCRYPTAGE", "DECRYPTION")}</button>
                <button className="w-full text-left px-3 py-2 bg-green-500/10 border border-green-500 rounded text-xs hover:bg-green-500/20">📡 {lang("SCAN RÉSEAU", "NETWORK SCAN")}</button>
              </div>

              <div>
                <div className="text-cyan-400 text-sm font-bold mb-2">{lang("CRYPTOGRAPHIE", "CRYPTOGRAPHY")}</div>
                <input type="text" value={cryptoInput} onChange={(e) => setCryptoInput(e.target.value)} className="w-full px-2 py-1 bg-black/40 border border-green-500/30 rounded text-xs text-green-400 mb-2" placeholder={lang("Texte à chiffrer", "Text to encrypt")} style={{ color: '#0f0' }} />
                <button onClick={encryptBase64} className="w-full text-left px-2 py-1 bg-green-500/10 border border-green-500 rounded text-xs hover:bg-green-500/20 mb-1">Base64 Encode</button>
                <button onClick={decryptBase64} className="w-full text-left px-2 py-1 bg-green-500/10 border border-green-500 rounded text-xs hover:bg-green-500/20 mb-1">Base64 Decode</button>
                <button onClick={encryptCaesar} className="w-full text-left px-2 py-1 bg-green-500/10 border border-green-500 rounded text-xs hover:bg-green-500/20">{lang("Chiffre César", "Caesar Cipher")}</button>
                {cryptoResult && <div className="text-green-700 text-xs mt-2">{cryptoResult}</div>}
              </div>

              <div>
                <div className="text-cyan-400 text-sm font-bold mb-2">{lang("SYSTÈME", "SYSTEM")}</div>
                <button onClick={() => setDarkMode(!darkMode)} className="w-full text-left px-2 py-1 bg-green-500/10 border border-green-500 rounded text-xs hover:bg-green-500/20">🌙 {lang("MODE SOMBRE", "DARK MODE")}</button>
                <button onClick={() => setAudioEnabled(!audioEnabled)} className="w-full text-left px-2 py-1 bg-green-500/10 border border-green-500 rounded text-xs hover:bg-green-500/20">🔊 {lang("SON", "SOUND")}</button>
              </div>
            </div>
          </div>

          {/* Console */}
          <div className="glass-panel p-4 border-red-500/30" style={{ borderColor: '#f00', background: 'rgba(0, 0, 0, 0.8)' }}>
            <div className="flex justify-between items-center pb-2 border-b border-red-500/30" style={{ color: '#f00', borderColor: '#f00' }}>
              <span>⚠️ {lang("CONSOLE DE SURVEILLANCE - ALERTES TEMPS RÉEL", "MONITORING CONSOLE - REAL-TIME ALERTS")}</span>
              <span>{alerts.length} {lang("ALERTES", "ALERTS")}</span>
            </div>
            <div ref={consoleOutputRef} className="text-xs font-mono h-20 overflow-y-auto mt-2 space-y-1" style={{ color: '#f88' }}>
              {hackMessages.length === 0 ? (
                <div style={{ color: '#666' }}>// {lang("En attente de messages...", "Waiting for messages...")}</div>
              ) : (
                hackMessages.map((msg, i) => <div key={i}>{msg}</div>)
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Chat Popup */}
      {aiChatOpen && screenState === "terminal" && (
        <div className="fixed bottom-6 right-6 w-96 h-96 glass-panel flex flex-col z-40" style={{ borderColor: '#0ff' }}>
          <div className="flex justify-between items-center p-4 border-b border-cyan-400">
            <div style={{ color: '#0ff' }} className="font-bold">🤖 {lang("IA - CYBER ASSISTANT", "AI - CYBER ASSISTANT")}</div>
            <button onClick={() => setAiChatOpen(false)} className="text-red-500 font-bold cursor-pointer">✕</button>
          </div>

          <div ref={aiMessagesRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {aiMessages.map((msg, i) => (
              <div key={i} className={`p-2 rounded max-w-xs ${msg.sender === 'bot' ? 'bg-green-900/40' : 'bg-blue-900/40'} ${msg.sender === 'bot' ? 'mr-auto text-cyan-400' : 'ml-auto text-blue-400'}`}>
                <div className="text-sm whitespace-pre-wrap">{msg.text}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 p-4 border-t border-green-500/30">
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendAIMessage()}
              className="flex-1 px-3 py-2 bg-black/40 border border-green-500 rounded text-xs outline-none"
              placeholder={lang("Parlez à l'IA...", "Talk to AI...")}
              style={{ color: '#0ff' }}
            />
            <button onClick={sendAIMessage} className="px-4 py-2 bg-gradient-to-r from-green-500 to-cyan-400 text-black font-bold rounded hover:scale-105">{lang("ENVOYER", "SEND")}</button>
          </div>
        </div>
      )}
    </div>
  );
}
