import { useState, useEffect, useRef } from "react";

export function SecureSystem() {
  const [screenState, setScreenState] = useState<"startup" | "access-granted" | "terminal">("startup");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [initProgress, setInitProgress] = useState(0);
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [hackMessages, setHackMessages] = useState<string[]>([]);
  const [stats, setStats] = useState({ packets: 0, encryption: 0, access: 0, threat: 0 });
  const [progress, setProgress] = useState(0);
  const codeOutputRef = useRef<HTMLDivElement>(null);
  const currentLineRef = useRef(0);
  const hackIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const statsIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const codeSnippets = [
    {prompt: "[root@secure-server]# ", command: "whoami", delay: 100},
    {prompt: "", string: "root", delay: 50},
    {prompt: "[root@secure-server]# ", command: "uname -a", delay: 100},
    {prompt: "", string: "Linux secure-server 5.15.0 #1 SMP Wed Nov 1 00:00:00 UTC 2023 x86_64 GNU/Linux", delay: 50},
    {prompt: "[root@secure-server]# ", command: "cat /proc/cpuinfo | grep 'model name' | head -1", delay: 100},
    {prompt: "", string: "model name\t: Intel(R) Xeon(R) CPU E5-2699 v4 @ 2.20GHz", delay: 50},
    {prompt: "[root@secure-server]# ", command: "free -h", delay: 100},
    {prompt: "", string: "              total        used        free      shared  buff/cache   available", delay: 30},
    {prompt: "", string: "Mem:           125G         24G         89G        1.2G         11G         99G", delay: 30},
    {prompt: "[root@secure-server]# ", command: "df -h /", delay: 100},
    {prompt: "", string: "Filesystem      Size  Used Avail Use% Mounted on", delay: 30},
    {prompt: "", string: "/dev/nvme0n1p2  2.0T  456G  1.5T  24% /", delay: 30},
    {prompt: "[root@secure-server]# ", command: "ss -tulpn | grep LISTEN", delay: 100},
    {prompt: "", string: "tcp   LISTEN 0      128          0.0.0.0:22          0.0.0.0:*", delay: 30},
    {prompt: "", string: "tcp   LISTEN 0      128          0.0.0.0:80          0.0.0.0:*", delay: 30},
    {prompt: "", string: "tcp   LISTEN 0      128          0.0.0.0:443         0.0.0.0:*", delay: 30},
    {prompt: "", string: "tcp   LISTEN 0      128          0.0.0.0:3306        0.0.0.0:*", delay: 30},
    {prompt: "[root@secure-server]# ", command: "ps aux | grep -E '(ssh|nginx|mysql)' | head -5", delay: 100},
    {prompt: "", string: "root       1234  0.0  0.1  12345  6789 ?        Ss   10:00   0:00 /usr/sbin/sshd", delay: 30},
    {prompt: "", string: "www-data   1235  0.0  0.3  23456  9012 ?        S    10:00   0:00 nginx: worker process", delay: 30},
    {prompt: "[SYSTEM]# ", command: "SESSION_SECURE --status=ACTIVE --user=ROOT", delay: 200},
    {prompt: "", string: "Système sécurisé. Aucune menace détectée.", delay: 100}
  ];

  const hackMessagesList = [
    "Surveillance du trafic réseau...",
    "Analyse des journaux système...",
    "Vérification de l'intégrité des fichiers...",
    "Scan des processus en cours...",
    "Contrôle des connexions établies...",
    "Audit des permissions utilisateur...",
  ];

  const checkPassword = () => {
    if (!password) {
      setErrorMessage("Erreur : Code d'accès requis");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (password === "Motdepasse") {
      setScreenState("access-granted");
      
      // Animation progression
      let width = 0;
      const interval = setInterval(() => {
        width += 2;
        setInitProgress(width);
        if (width >= 100) clearInterval(interval);
      }, 30);
    } else {
      setErrorMessage("Erreur : Code d'accès incorrect");
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
    const text = (snippet.prompt || '') + (snippet.command || '') + (snippet.string || '');
    
    setCodeLines(prev => [...prev, text]);
    setProgress((currentLineRef.current / codeSnippets.length) * 100);
    currentLineRef.current++;

    setTimeout(typeCode, snippet.delay);
  };

  const generateHackMessages = () => {
    const msg = hackMessagesList[Math.floor(Math.random() * hackMessagesList.length)];
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    setHackMessages(prev => [...prev.slice(-4), `[${time}] ${msg}`]);
  };

  const updateStats = () => {
    setStats({
      packets: Math.floor(Math.random() * 5000 + 1000),
      encryption: Math.min(100, Math.floor(Math.random() * 10) + 90),
      access: Math.min(100, currentLineRef.current * 3),
      threat: Math.floor(Math.random() * 5)
    });
  };

  useEffect(() => {
    return () => {
      if (hackIntervalRef.current) clearInterval(hackIntervalRef.current);
      if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-green-500 font-mono overflow-hidden relative">
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
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <div className="scanlines" />

      {/* Startup Screen */}
      {screenState === "startup" && (
        <div className="fixed inset-0 flex flex-col justify-center items-center gap-8 z-50">
          <div className="text-5xl font-bold text-green-500" style={{textShadow: '0 0 20px #0f0'}}>
            SYSTÈME DE SÉCURITÉ
          </div>

          <div className="text-2xl text-cyan-400 text-center">
            [ ACCÈS RESTREINT ]<br/>
            Code d'accès requis
          </div>

          <div className="w-80">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkPassword()}
              className="w-full px-4 py-4 bg-transparent border-2 border-green-500 text-green-500 text-center text-lg font-mono tracking-widest"
              placeholder="Entrez le code d'accès"
              autoFocus
            />
          </div>

          <button
            onClick={checkPassword}
            className="w-80 py-4 bg-gradient-to-r from-green-500 to-green-400 text-black font-bold text-lg hover:scale-105 transition-transform"
          >
            ACCÈS AU SYSTÈME
          </button>

          {errorMessage && (
            <div className="text-red-500" style={{textShadow: '0 0 10px #f00'}}>
              {errorMessage}
            </div>
          )}

          <div className="text-xs text-gray-600">
            Indice : Le code d'accès est "Motdepasse"
          </div>
        </div>
      )}

      {/* Access Granted Screen */}
      {screenState === "access-granted" && (
        <div className="fixed inset-0 flex flex-col justify-center items-center gap-6 bg-black/95 z-50">
          <div className="text-6xl font-bold text-green-500" style={{textShadow: '0 0 30px #0f0'}}>
            ACCÈS AUTORISÉ
          </div>

          <div className="text-3xl text-cyan-400">
            Accès root accordé
          </div>

          <div className="text-lg text-green-500">
            [ Initialisation du système... ]
          </div>

          <div className="w-80 h-1 bg-gray-800">
            <div 
              className="h-full bg-green-500 transition-all"
              style={{width: `${initProgress}%`}}
            />
          </div>

          <button
            onClick={startTerminal}
            className="px-10 py-4 mt-8 bg-gradient-to-r from-green-500 to-cyan-400 text-black font-bold text-xl hover:scale-110 transition-transform"
          >
            ENTRER DANS LE SYSTÈME
          </button>
        </div>
      )}

      {/* Terminal Screen */}
      {screenState === "terminal" && (
        <div className="w-11/12 max-w-4xl mx-auto mt-12 bg-green-950/30 border-2 border-green-500 rounded-lg p-6 space-y-4 z-40">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-green-500/50">
            <div className="text-lg font-bold">
              [root@secure-server] ~ # SESSION ACTIVE - USER: ROOT
            </div>
            <div className="flex gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{animationDelay: '0.5s'}} />
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{animationDelay: '1s'}} />
            </div>
          </div>

          {/* Code Output */}
          <div 
            ref={codeOutputRef}
            className="bg-black/60 border border-green-500/20 rounded p-4 h-80 overflow-y-auto space-y-1 text-sm"
          >
            {codeLines.length === 0 ? (
              <div className="text-green-600">// Initializing system...</div>
            ) : (
              codeLines.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap">{line}</div>
              ))
            )}
          </div>

          {/* Hack Console */}
          <div className="bg-black/90 border border-red-500/30 rounded p-3 h-24 overflow-y-auto space-y-1 text-xs text-red-500">
            {hackMessages.length === 0 ? (
              <div className="text-red-600">// Monitoring system...</div>
            ) : (
              hackMessages.map((msg, i) => <div key={i}>{msg}</div>)
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full h-6 bg-black/80 border border-green-500/30 rounded overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-cyan-400 transition-all"
              style={{width: `${progress}%`}}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { label: 'PACKETS/SEC', value: stats.packets.toLocaleString() },
              { label: 'ENCRYPTION', value: `${stats.encryption}%` },
              { label: 'ACCESS LEVEL', value: `${stats.access}%` },
              { label: 'THREAT', value: `${stats.threat}%` }
            ].map((stat, i) => (
              <div key={i} className="text-center bg-green-500/10 border border-green-500/20 rounded p-2">
                <div className="text-cyan-400 font-bold text-sm md:text-base">{stat.value}</div>
                <div className="text-green-500 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
