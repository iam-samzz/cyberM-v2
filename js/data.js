/* ========== DATA ========== */

const resources = [
  { type:"article", category:"web-security", level:"beginner", title:"OWASP Top 10", desc:"Understand the most important web application security risks and how developers can reduce them.", source:"OWASP", link:"https://owasp.org/Top10/", date:"Official guide", skill:"Web security" },
  { type:"article", category:"fundamentals", level:"beginner", title:"NIST Cybersecurity Framework", desc:"Explore a structured approach to managing cybersecurity risk through Govern, Identify, Protect, Detect, Respond, and Recover.", source:"NIST", link:"https://www.nist.gov/cyberframework", date:"Official framework", skill:"Risk management" },
  { type:"article", category:"frameworks", level:"intermediate", title:"MITRE ATT&CK Knowledge Base", desc:"Learn how adversary tactics, techniques, and procedures are organized for threat-informed defense.", source:"MITRE", link:"https://attack.mitre.org/", date:"Official knowledge base", skill:"Threat intelligence" },
  { type:"article", category:"fundamentals", level:"beginner", title:"NIST NICE Learning Resources", desc:"Find curated cybersecurity learning and career-development resources across different skill levels.", source:"NIST NICE", link:"https://www.nist.gov/itl/applied-cybersecurity/nice/resources/online-learning-content", date:"Learning directory", skill:"Career foundation" },
  { type:"video", category:"fundamentals", level:"beginner", title:"Cybersecurity Basics", desc:"Start with security concepts, common threats, safe practices, and the role of cybersecurity professionals.", source:"IBM", link:"https://www.youtube.com/results?search_query=IBM+cybersecurity+basics", date:"Video collection", skill:"Security basics" },
  { type:"video", category:"fundamentals", level:"beginner", title:"Networking for Cybersecurity", desc:"Build knowledge of IP addresses, DNS, TCP/IP, ports, protocols, and network troubleshooting.", source:"NetworkChuck", link:"https://www.youtube.com/results?search_query=NetworkChuck+networking+for+cybersecurity", date:"Video collection", skill:"Networking" },
  { type:"video", category:"web-security", level:"beginner", title:"Web Security Learning Videos", desc:"Use guided video lessons to understand web requests, authentication, common vulnerabilities, and secure design.", source:"freeCodeCamp", link:"https://www.youtube.com/results?search_query=freeCodeCamp+web+security+course", date:"Video collection", skill:"Web security" },
  { type:"article", category:"web-security", level:"intermediate", title:"PortSwigger Web Security Academy", desc:"Free interactive training on web vulnerabilities with explanations and practical labs.", source:"PortSwigger", link:"https://portswigger.net/web-security", date:"Interactive academy", skill:"Web testing" },
  { type:"hands-on", category:"hands-on", level:"beginner", title:"TryHackMe Learning Paths", desc:"Follow guided, browser-based cybersecurity labs designed for beginners and progressing learners.", source:"TryHackMe", link:"https://tryhackme.com/", date:"Hands-on platform", skill:"Practical learning" },
  { type:"hands-on", category:"hands-on", level:"beginner", title:"picoCTF Practice", desc:"Solve beginner-friendly security challenges covering cryptography, web exploitation, forensics, and more.", source:"picoCTF", link:"https://picoctf.org/", date:"Challenge platform", skill:"Problem solving" },
  { type:"article", category:"defensive-security", level:"intermediate", title:"SANS Free Resources", desc:"Browse security posters, whitepapers, cheat sheets, and practical defensive security guidance.", source:"SANS Institute", link:"https://www.sans.org/free-resources/", date:"Resource library", skill:"Blue team" },
  { type:"article", category:"defensive-security", level:"intermediate", title:"CISA Cybersecurity Guidance", desc:"Explore practical recommendations for securing systems, identifying threats, and improving resilience.", source:"CISA", link:"https://www.cisa.gov/stopransomware", date:"Official guidance", skill:"Defense" },
  { type:"blog", category:"news", level:"intermediate", title:"Krebs on Security", desc:"Follow investigative reporting and analysis about breaches, fraud, vulnerabilities, and cybercrime.", source:"KrebsOnSecurity", link:"https://krebsonsecurity.com/", date:"Ongoing updates", skill:"Security news" },
  { type:"blog", category:"news", level:"beginner", title:"The Hacker News", desc:"Stay updated with cybersecurity incidents, vulnerabilities, threat research, and industry developments.", source:"The Hacker News", link:"https://thehackernews.com/", date:"Ongoing updates", skill:"Security news" },
  { type:"blog", category:"news", level:"intermediate", title:"Dark Reading", desc:"Read enterprise security news, analysis, and practitioner-focused articles.", source:"Dark Reading", link:"https://www.darkreading.com/", date:"Ongoing updates", skill:"Industry awareness" },
  { type:"blog", category:"news", level:"advanced", title:"Schneier on Security", desc:"Read long-form commentary and analysis on security, privacy, cryptography, and technology policy.", source:"Schneier", link:"https://www.schneier.com/", date:"Ongoing updates", skill:"Security analysis" },
  { type:"article", category:"frameworks", level:"intermediate", title:"MITRE ATT&CK Training Resources", desc:"Use official training materials to understand ATT&CK fundamentals, threat hunting, and detection engineering.", source:"MITRE", link:"https://attack.mitre.org/resources/learn-more-about-attack/training/", date:"Training collection", skill:"Threat detection" },
  { type:"article", category:"fundamentals", level:"beginner", title:"Cybersecurity Career Resources", desc:"Explore learning options and career-development material collected by the NIST NICE initiative.", source:"NIST NICE", link:"https://www.nist.gov/itl/applied-cybersecurity/nice", date:"Career guidance", skill:"Career planning" }
];

const roadmaps = [
  { icon:"🔍", title:"Penetration Tester", desc:"Learn to think like an attacker. Exploit systems, find vulnerabilities, report findings.", tags:["Kali Linux","Burp Suite","Metasploit","OWASP"] },
  { icon:"🛡️", title:"SOC Analyst", desc:"Monitor, detect, and respond to security incidents in real-time.", tags:["SIEM","Splunk","Incident Response","Threat Intel"] },
  { icon:"🌐", title:"Network Security Engineer", desc:"Design and secure network infrastructure against threats.", tags:["Firewalls","IDS/IPS","VPN","Zero Trust"] },
  { icon:"☁️", title:"Cloud Security Specialist", desc:"Secure cloud environments across AWS, Azure, and GCP.", tags:["AWS","Azure","IAM","CSPM"] },
  { icon:"🔬", title:"Malware Analyst", desc:"Reverse-engineer malicious software to understand behavior and impact.", tags:["Reverse Engineering","IDA Pro","Sandboxing","Assembly"] },
  { icon:"📋", title:"GRC Analyst", desc:"Governance, risk, and compliance — the business side of security.", tags:["ISO 27001","NIST","Risk Assessment","Audit"] },
];

const tools = [
  {
    id:"nmap", name:"Nmap", icon:"N", category:"Network Scanner", trending:true,
    brief:"The standard for network discovery and security auditing.",
    overview:"<strong>Nmap</strong> (Network Mapper) is a free, open-source tool for network discovery and security auditing. It uses raw IP packets to determine what hosts are available on the network, what services those hosts are offering, what operating systems they're running, what type of packet filters/firewalls are in use, and dozens of other characteristics.<br><br>It is the industry standard for network mapping and is essential for any security professional. Nmap is versatile — usable for simple network inventory to complex security auditing.",
    features:["Host discovery — find live devices on a network","Port scanning — identify open ports and services","OS detection — fingerprint remote operating systems","Service version detection — identify application versions","Scriptable interaction — NSE (Nmap Scripting Engine) for advanced tasks","Output in multiple formats — XML, grepable, normal"]
  },
  {
    id:"burp", name:"Burp Suite", icon:"B", category:"Web Security Testing", trending:true,
    brief:"The leading toolkit for web application security testing.",
    overview:"<strong>Burp Suite</strong> by PortSwigger is an integrated platform for performing security testing of web applications. It works as an intercepting proxy, allowing you to inspect and modify traffic between your browser and the target application.<br><br>Burp Suite includes tools for scanning, crawling, intruding, and decoding. It is widely considered the gold standard for web application penetration testing.",
    features:["Intercepting proxy — inspect and modify all HTTP/S traffic","Spider — automatically crawl web applications","Scanner — automated vulnerability detection","Intruder — customized brute force and fuzzing","Repeater — manually modify and replay requests","Collaborator — detect out-of-band vulnerabilities"]
  },
  {
    id:"metasploit", name:"Metasploit", icon:"M", category:"Exploitation Framework", trending:true,
    brief:"The world's most used penetration testing framework.",
    overview:"<strong>Metasploit Framework</strong> is the most popular open-source penetration testing platform. It provides information about security vulnerabilities, aids in penetration testing and IDS signature development.<br><br>Owned by Rapid7, Metasploit contains a comprehensive collection of exploits, payloads, auxiliary modules, and post-exploitation tools. It is used by both attackers and defenders to validate security measures.",
    features:["Exploit modules — thousands of ready-to-use exploits","Payloads — generate custom shellcode and reverse shells","Auxiliary modules — scanners, fuzzers, and collectors","Post-exploitation — pivot, escalate, and maintain access","MSFconsole — unified command-line interface","Database integration — track hosts, services, and vulnerabilities"]
  },
  {
    id:"wireshark", name:"Wireshark", icon:"W", category:"Packet Analyzer", trending:false,
    brief:"The most widely-used network protocol analyzer.",
    overview:"<strong>Wireshark</strong> is the world's foremost network protocol analyzer. It lets you capture and interactively browse the traffic running on a computer network. It has a rich and powerful feature set and is the standard across many industries.<br><br>Wireshark is essential for network troubleshooting, analysis, software and communications protocol development, and education.",
    features:["Deep inspection of hundreds of protocols","Live capture and offline analysis","Standard three-pane packet browser","Multi-platform — runs on Windows, Linux, macOS","Rich VoIP analysis","Read/write many different capture file formats"]
  },
  {
    id:"hashcat", name:"Hashcat", icon:"H", category:"Password Recovery", trending:false,
    brief:"Advanced CPU/GPU-based password recovery utility.",
    overview:"<strong>Hashcat</strong> is the world's fastest and most advanced password recovery utility. It supports five unique modes of attack for over 300 highly optimized hashing algorithms.<br><br>Hashcat supports CPU, GPU, and other hardware accelerators on Linux, Windows, and macOS. It is the go-to tool for password cracking assessments and security audits.",
    features:["GPU-accelerated cracking — leverage GPU power for speed","300+ hash types supported","Five attack modes — dictionary, combinator, brute-force, rule-based, hybrid","Distributed cracking — run across multiple systems","Session management — pause and resume attacks","Automatic performance optimization"]
  },
  {
    id:"john", name:"John the Ripper", icon:"J", category:"Password Cracker", trending:false,
    brief:"Open-source password security auditing and recovery tool.",
    overview:"<strong>John the Ripper</strong> is a free, open-source password security auditing and password recovery tool available for many operating systems. It is designed to detect weak Unix passwords, but can also crack a large number of other password hashes.<br><br>John is highly customizable and supports hundreds of hash types through community-contributed patches.",
    features:["Auto-detection of hash types","Dictionary and brute-force attacks","Rule-based word mangling","Single crack mode — use login names as passwords","Incremental mode — systematic character combination","Highly portable — runs on 15+ platforms"]
  },
  {
    id:"splunk", name:"Splunk", icon:"S", category:"SIEM Platform", trending:true,
    brief:"Enterprise security information and event management.",
    overview:"<strong>Splunk</strong> is a leading SIEM (Security Information and Event Management) platform used for searching, monitoring, and analyzing machine-generated data in real-time.<br><br>In cybersecurity, Splunk is used for threat detection, incident response, security analytics, and compliance. Learning Splunk is essential for SOC analyst and security engineer roles.",
    features:["Real-time data indexing and search","Security analytics and correlation","Custom dashboards and alerts","Integration with 1000+ data sources","Splunk Enterprise Security (ES) add-on","Machine learning toolkit for anomaly detection"]
  },
  {
    id:"nessus", name:"Nessus", icon:"N", category:"Vulnerability Scanner", trending:false,
    brief:"Widely deployed vulnerability assessment scanner.",
    overview:"<strong>Nessus</strong> by Tenable is one of the most widely deployed vulnerability scanners. It identifies vulnerabilities, misconfigurations, and compliance issues across your infrastructure.<br><br>Nessus is used for vulnerability assessments, policy compliance checks, and malware detection. It is a must-know tool for penetration testers and security auditors.",
    features:["100,000+ vulnerability checks","Credited and uncredentialed scanning","Compliance auditing — CIS, PCI-DSS, HIPAA","Malware detection and identification","Network discovery and asset inventory","Detailed reporting with remediation guidance"]
  },
  {
    id:"aircrack", name:"Aircrack-ng", icon:"A", category:"Wireless Security", trending:false,
    brief:"Complete suite for WiFi network security assessment.",
    overview:"<strong>Aircrack-ng</strong> is a complete suite of tools to assess WiFi network security. It focuses on monitoring, attacking, testing, and cracking wireless protocols.<br><br>The suite includes tools for packet capture, WEP/WPA/WPA2 cracking, and creating fake access points. It is essential for wireless security professionals.",
    features:["Packet capture and export to text files","Replay attacks, de-authentication, and fake access points","WEP and WPA/WPA2-PSK cracking","Checking WiFi cards and driver capabilities","Scriptable — automate complex attacks","Supports Linux, Windows, macOS, FreeBSD"]
  },
  {
    id:"autopsy", name:"Autopsy", icon:"Au", category:"Digital Forensics", trending:false,
    brief:"Open-source digital forensics platform.",
    overview:"<strong>Autopsy</strong> is the leading open-source digital forensics platform. It is used by law enforcement, military, and corporate examiners to investigate what happened on a computer or mobile device.<br><br>Autopsy provides a graphical interface to The Sleuth Kit and adds powerful features for timeline analysis, keyword search, and hash filtering.",
    features:["File system analysis — NTFS, FAT, Ext2/3/4, HFS+","Timeline analysis — reconstruct event sequences","Keyword search — find evidence with regex support","Hash filtering — identify known good/bad files","Web artifact analysis — browser history, cookies, bookmarks","Mobile forensics — Android and iOS extraction"]
  },
  {
    id:"maltego", name:"Maltego", icon:"Mt", category:"OSINT Tool", trending:true,
    brief:"Open-source intelligence and graphical link analysis.",
    overview:"<strong>Maltego</strong> is a powerful OSINT (Open Source Intelligence) tool used for link analysis and data visualization. It helps investigators find relationships between people, companies, domains, networks, and more.<br><br>Maltego uses transforms to gather data from various sources and presents it in a visual graph, making it invaluable for threat intelligence and investigations.",
    features:["Visual link analysis — graph-based data representation","50+ built-in transforms — DNS, WHOIS, social media, and more","Community edition available for free","Integration with Shodan, VirusTotal, and more","Collaboration features for team investigations","Custom transform development with Python/Java"]
  },
  {
    id:"gophish", name:"GoPhish", icon:"G", category:"Phishing Simulation", trending:false,
    brief:"Open-source phishing toolkit for security awareness.",
    overview:"<strong>GoPhish</strong> is an open-source phishing toolkit designed for businesses and penetration testers. It allows you to send realistic phishing emails and track results.<br><br>GoPhish makes it easy to run phishing simulations to test and improve your organization's security awareness. It includes email templates, landing pages, and detailed reporting.",
    features:["Campaign management — schedule and track phishing campaigns","Email templates — realistic, customizable templates","Landing pages — credential capture pages","Real-time tracking — see who clicks and submits","SMTP integration — use any email provider","REST API — automate and integrate with other tools"]
  }
];