import { useState, useRef } from "react";

// ─── In CRA, static assets go in /public and are referenced via %PUBLIC_URL%
// or process.env.PUBLIC_URL at runtime. Place your files as:
//   public/assets/back-to-home.mpeg
//   public/assets/hero.png
import celebrationSound from "./assets/back-to-home.mpeg";
import cakePhoto from "./assets/hero.png";


const MONTHS = [
  { id: "oct2025", label: "October",   year: "2025", emoji: "🍂"},
  { id: "nov2025", label: "November",  year: "2025", emoji: "🌙"},
  { id: "dec2025", label: "December",  year: "2025", emoji: "❄️"},
  { id: "jan2026", label: "January",   year: "2026", emoji: "🌟"},
  { id: "feb2026", label: "February",  year: "2026", emoji: "💌" },
  { id: "mar2026", label: "March",     year: "2026", emoji: "🌸"},
  { id: "apr2026", label: "April",     year: "2026", emoji: "🌷"},
  { id: "may2026", label: "May",       year: "2026", emoji: "☀️"},
  { id: "jun2026", label: "June",      year: "2026", emoji: "🌊"},
  { id: "jul2026", label: "July",      year: "2026", emoji: "🔥"},
  { id: "aug2026", label: "August",    year: "2026", emoji: "🌻"},
  { id: "sep2026", label: "September", year: "2026", emoji: "🍃"},
  { id: "oct2026", label: "October",   year: "2026", emoji: "🎖️"},
  { id: "nov2026", label: "November",  year: "2026", emoji: "🏅"},
];

const MONTH_LETTERS = {
  oct2025: `Hazem,\n\nFirst month apart and it was so hard. You didn't have your phone yet, and I was waiting for even the tiniest call from you. I kept opening our chat and looking at your photos, just to feel close.\n\nI missed you so much, but I'm proud of you. Always here, waiting.\n\n— Reem 🐱`,
  nov2025: `Hazem,\n\nTwo months. Still waiting for your calls, sending you reels hoping you'd see them when you get a break. Counting the days until you get leave, imagining seeing you again.\n\nI'm proud of you, I love you, and I can't wait to hold you.\n\n— Reem 🐱`,
  dec2025: `Hazem,\n\nThree months. I was waiting for you to finish training at the center. Finally you came down, and I felt relieved. I kept sending you messages and reels, wanting to stay close.\n\nI'm so proud of you and happy you're safe. Miss you always.\n\n— Reem 🐱`,
  jan2026: `Hazem,\n\nFour months. New year! I was so happy we could start a new year together, even from a distance. Waiting for you to come down so I could finally see you was the best feeling.\n\nI'm proud of you, I love you, and I missed you more than ever.\n\n— Reem 🐱`,
  feb2026: `Hazem,\n\nFive months. Valentine's, my birthday, and Ramadan… I wished so much to spend them with you. I missed you every single day, opening our chats and looking at your photos, imagining you here.\n\nI'm proud of you, I love you, and I can't wait for the day we celebrate together.\n\n— Reem 🐱 ❤️`,
  mar2026: `Hazem,\n\nSix months. It was your birthday this month, and I so badly wanted to celebrate with you. I kept imagining your smile and how I'd spoil you. I missed you, sent messages, sent reels, thinking about you all the time.\n\nI'm proud of you, I love you, and I'm waiting to celebrate your day together.\n\n— Reem 🐱`,
  apr2026: `Hazem,\n\nSeven months. Both of us busy — you in the army, me at work. Still, my heart feels closer to you every day. I'm proud of how hard you work and how you keep going.\n\nI love you, I miss you, and I'm always thinking of you.\n\n— Reem 🐱`,
  may2026: `Hazem,\n\nEight months. Life is busy, and distance is tough, but my feelings haven't changed — if anything, they grow stronger. I'm proud of you, I love you, and I miss you constantly.\n\nCan't wait for when we're together again.\n\n— Reem 🐱`,
  jun2026: `Hazem,\n\nNine months. Same as before — work, duties, distance. Still I open our chats, look at your photos, and feel proud of you every day. Our love keeps growing despite the miles.\n\nI'm proud of you, I love you, and I can't wait to see you.\n\n— Reem 🐱`,
  jul2026: `Hazem,\n\nTen months. Double digits! Life's busy, but my heart is full thinking of you. I'm proud of you, happy for everything you're achieving, and my love for you keeps getting stronger.\n\nMiss you every single day.\n\n— Reem 🐱`,
  aug2026: `Hazem,\n\nEleven months. Busy days, long calls, quick messages — all still make me smile. I'm proud of you, love you, and I'm always waiting to hear from you.\n\nCounting down the days till you're back.\n\n— Reem 🐱`,
  sep2026: `Hazem,\n\nTwelve months. One year of missing you, of small calls, chats, photos, and hope. I'm proud of you, I love you more every day, and I feel every bit of this distance — but it can't shake us.\n\nTwo months left!\n\n— Reem 🐱`,
  oct2026: `Hazem,\n\nThirteen months. Anniversary month! The day we first met, the day our story began. I don't know if we'll get to celebrate the 13th together, but just knowing you're mine makes me happy.\n\nI'm proud of you, I love you, and I'm waiting, as always.\n\n— Reem 🐱`,
  nov2026: `Hazem,\n\nFourteen months. You did it. You actually did it.\n\nI waited, I missed you, I loved you through every single moment of this — and now you're free. You're finally coming home.\n\nI'm so proud of you, I love you endlessly, and I cannot wait to finally be with you.\n\nThis is the last letter. The rest we write together. 💛\n\n— Reem 🐱 ✨`,
};

const SUPPORT_MESSAGES = [
  { icon: "🤍", text: "Hazem, I'm proud of you in the quiet way. The steady way. The forever way." },
  { icon: "🌤️", text: "Even on your hardest days, you're still my favorite person." },
  { icon: "📞", text: "Your voice fixes more in me than you know. Keep going — I'm waiting for that call." },
  { icon: "🐱", text: "Hi. Just a reminder that your girl is extremely in love with you. Continue." },
  { icon: "🌙", text: "Sleep well tonight, Hazem. I'm ending my day thinking about you — peacefully." },
  { icon: "💛", text: "Nothing about distance changed how I look at you. Still the same eyes. Still the same heart." },
  { icon: "✨", text: "You look very strong from here. And very loved." },
  { icon: "🫶", text: "If today was heavy, come here. I'm mentally holding your hand." },
  { icon: "📆", text: "Another day done. See? You're closer to me already." },
  { icon: "😌", text: "I like the way you handle hard things. It's attractive, actually." },
  { icon: "💬", text: "I don't need long conversations. Just knowing you're okay makes me calm." },
  { icon: "🌅", text: "One day we'll wake up and this will be over. Until then, I'm yours." },
  { icon: "🥹", text: "Hazem, you're doing something difficult — and you're doing it well." },
  { icon: "🤭", text: "Imagine thinking you could go through this without me being obsessed with you. Impossible." },
  { icon: "🌊", text: "If the day feels overwhelming, remember I'm steady. We're steady." },
  { icon: "🧠", text: "Don't overthink it. Just finish today and come back to me." },
  { icon: "💌", text: "I still get butterflies. Yes. Even now." },
  { icon: "🏡", text: "You're not just counting months. You're building our future." },
  { icon: "🫂", text: "I'm not going anywhere, Hazem. Not on easy days. Not on hard ones." },
  { icon: "💪", text: "You're stronger than you feel right now. And I'm softer than I look when it comes to you." },
  { icon: "🌟", text: "You're my calm and my chaos at the same time. Mostly calm though. Be calm." },
  { icon: "📷", text: "I look at your photos and smile like an idiot. So don't quit. I need more reasons to smile." },
  { icon: "😅", text: "Handle your business so you can come back and handle me." },
  { icon: "🤍", text: "I chose you once. I'm still choosing you." },
  { icon: "🌙", text: "Long night? I'm under the same sky thinking about you." },
  { icon: "🎯", text: "Focus on finishing. I'll focus on loving you. Deal?" },
  { icon: "🧩", text: "Even when you feel tired, you're still exactly who I fell for." },
  { icon: "🌷", text: "You don't lose me on bad days. You just get extra softness." },
  { icon: "📣", text: "Hazem, you are deeply loved. That's not changing." },
  { icon: "🫶", text: "If today is hard, let it be hard. Just don't doubt us." },
  { icon: "😌", text: "Every month you complete makes me prouder and slightly more dramatic about you." },
  { icon: "💞", text: "You're worth waiting for. Easily." },
  { icon: "🔥", text: "Confidence check: you're still very attractive and very mine." },
  { icon: "🌄", text: "This chapter ends. And when it does, I'm right there." },
  { icon: "🧸", text: "Consider this your daily reminder that someone is ridiculously in love with you." },
  { icon: "📍", text: "Wherever you are right now, that's where my heart is looking." },
  { icon: "🤝", text: "We're doing this together. Just from different locations." },
  { icon: "🌤️", text: "Hard days don't scare me. Losing you would. So just stay strong." },
  { icon: "💗", text: "You're not alone in this. You're loved through it." },
  { icon: "😏", text: "Finish strong, soldier. Your girl is waiting." }
];

const STORAGE_KEY = "hazem_v5_unlocked";

const SOLDIER_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAABECAYAAADHsbZQAAASjUlEQVR4nO2aeXCcZ33HP8977r2r1eq0Lku2ZMc2kXM4jh0SktgwITQtNBTacqQtzFCGEjptGaZMS9tpKW3/oQdHMxCgDTQQoECYFDqEBJwQYqdOjA/Zsi3J1mVde2mP9376x2odO5Zlu1nKdKa/mZ3V6H33eb7f5/ndzyOklPxfFuUXDeDVyv8T+EXLz4eAlMArbevnY2sNJyClBCEAAQT4rr3yRKwQa6yIuheqfwshXvWgpdwMdnFGLufnCXwPX6p0brxFRBOZGokGzFEXEQRBQ0DXgU2d3C+P7H+S9evXE0goVyuEwyFQQ2zcfo8wzPCrn+sCaYgK1dUmO3ea4two27ffQLo5gy8lni8pVxzGR0c4dXS/rL0fNGJaALRGrH59hInRFyW2Szafp1yqsJjPY4ZM4tEoqeY0nrWElA3a8RXRGjKKENi2RbW8TFM8TCbdRHNTCqewjFd1sWWZUtlCyCUcu4wZil+TLUgpEUKc/24ogfqg5WIB33PwA4P5xSwjh4/wyT/7G9aZBs0JHcdyeN3bfotdb/xtAt9HUdWrnqMOerWda5gbVYRHPpslEo1z+PBR/uFTn6EY0bAUn44mFd2rokoXoagNdaeNUSHAsQqyJZPi0EuH+MIXvsj8YpYbrruOmzLtjBw6wM27XseOvfdSD3G+76+5slcr/2MCUkqCIFiJHxIzkhGPfOW78kc//D497a10tLTyhpu38+t338Xxk7fSu2kzyTt/WUgpUbVLp5VSnlfHVxJaTffrIhqZTh/7yX/K8Se+wVBfHzPLWb7x42f4+w++H+k72NEWtB33Ck1RKRYLnB4bk5nmZpFIJolGo2irkLocgQuD7jUTqL9v21W+8/hX5czMPBJJa2uKvVt6KD1/EE0VdHS28IefeghfCprCJjfe+UZ+5f1/LKSUfOWRL8uJiTPcsvMWVE1FCAiZIeKJOB0dnSKVSl0y74UE6n9LKa9dhaSUKIrCX33iI/LhL32GeCyBoeuUKmVSf/4nbBzcyqHRGTorYXbtfQvffvppxuazpIsO1UqFrz32dXn40CF27byZPXv3nEfl+QEjx0/IkeOjcveunWsaRbFYxDRNTNO8th3wfR9VVXnyqSfk+z7wG+y+eQflSoUz07MIIehuz/Dut7+P6UUPRQFd04mFQwSBxA98Tp8+xeTUFFtbA9JRQTrTjprsIJZIk0g18dKLL+IrIXbvvU+Yuoam6+grH1VViUQilMtl9u3bJ7dv3y462juunkDdyDzP4c2/dpfcPbyZB+7/VYqlMg89+lV+9PwLKAJ6O7fS1TmApipEIhEM3cA0TdraWjk5dgZ3eZY7OvIsVqBJtzhUyBBICALB+rTgwOERem59GzcPb6FStdA0HU3TUFWVUChEuVyipaWVvr4+EY/Hr06FasA9dF3nm99+VMYMyYMPPIBl2XRkQjz47ncyevosc0vzLGWzLBdcYrEoTckmbKtC/+Agv/+ud4mRkePyiw8/xIEZiOmCvBqi7BvomoKPoGKXqHpg6DrVahXHdXEcd2XnFXzf57Of/QyRSIQHP/gh2drSenWBTAiBrutYlsXXv/mvvOPNb0YgkEhsx2VdWxu3Dg+Tzy/T193Dpo2DrGvvYGLmONdtTvKOt9yJqmls27ZVvO+978UyezjtruPwchvRpg6SrX0YsTSxgd18+OP/zB237cJH4FgVVEUSCpkYhkkqlWLHjh0MDQ0hFMHc/PzaO1BXr3w+z4c//HtyZPQwiYTGQHcvS7kc0UgYwzAQQGdrC9mlApWKi+0skV8+g66X2djXjeovMTO6X6Ysi8y50zz42n6OTs4TTbeiDtzEvn3PEo4kyHT0Mrhpq0AGmE5OfuxznyUaCfGxv/yESKaaMQ2Du+/ecxHGNQkEgY+qanzu8/8kH3nky6zf0IputFCqlElEopi2w3Q2x+jpM2zZ0M99e+5iXUeGHds30d35epqTaVRVoOsG3uhBStUSUtPxHJuWjdtoGbpejE3Py9nZGXK5HLfu2kkQBAR2lbbiJOcWsty0+3b6+gYuwBScT+yuSKCeKM+emyaR1EgkEuSLRZ76yXNsWT9IIAPOTp/jtbfexPreDu7csYO9d+2iraWZfH6ZfLGIUDQQAiNk4ltVBCA9l/7BQaK9G7ClJsrlsnQch1gshqIoYIZwA8Hv7tnBug19eOUiSjiGIkTtOS/Hgqsy4tdsvZEveQ/h+z66pvPswUNEtRiO5xMydcbPTDF+dpKlXJ6FpTyGruN5PiDwVzJPEQrhuA6u5RFLtWJ2DgoZBOdzIlVVa+CkxHdstMDnvp034ttVvMUZGerdJFZLAtc04jrL3btvF4lECtdxUBSBZTtULQvpe3iez9jEJOMT06iaxtP79nPoyAlcz8f3/Zr7DXyIx1lMJJmLxlmMxQiQCEVB0zUURRAEAZZlgxCURw9Iv1xk2fawfQm+f1mMaxKob9fAwEY2bBiiWq2iaRpVu8rcwjxLS0vk83kMw0DXdRSh4Hk+p8bO4vs+iVgM1/EplavkXQ/iccx0moJd4vCz35DF7AxN6Qy6bmI7HseOHiQ7flBapw+BpiMCBwIP6TkriF5uQNRt4Ipu1Pd9FEVhfd8AtuOgKQqW6zCXzxIyQ1QqFSzLOj+goWsMDvRSKBV57Hvf5+DIcUqVEsvlMioCU9OIRaN4ToWRA9+VcxOHZVdnmg19LcS1CtOTR3BUBTyLcGcfWjSOmm5fSS1eTr+vyQYANE2rMQc0RWX83AzJSIxMIolpGIRMk6plM7UwxwsnjzI2OclSvsg3H/0eSd1ieuwwejhCpWJhWRapVJJ8vsixg0+x+/o2otF+AJwACpEwibaNxLfdLvxyETWaWMF/aYp0RQJ1pkvZJVRVRUqQUmC7LvtHR4iHoySicbzAx/OqFEtFPM8nYur0NofBrdA+eItAMeSRF55m9MQknu8RDhnE41F6ejtRVA3bcZGAkAGBGSW08QYhAK0O/nILeyUCiqIgpSRXyBI3FB54/QYiTSmQJj995gCRTApVNylVPLTsIk2dJkIIFMDyJM9+65MMXvcV2nuvFwf3H5DZ7CKxeILicpmq5VCpWMRiYWLxGC2ZJLFEmt4td4hQKLZS+MPLfY9rJPByISEpl8uYhkomadK6rhVBiDMxwfbtPbR0rMMpu3z870aYL/gYGghV5ey5Aben30IIQeD77LzzF8SLLzwvz0yME08kaWpKUyrbLJcsSicnuGXXLm648x6haqE1q7CLFnith0IIgsBHCIW33v+b6JrAD8CXBpWqheP7VGyfqqNQWC4xtWBxatbixGSFU7M247MV0Gsq4AcB6Uwb7/nQn4qBoa2Uloucm53GdSp4bpUNm7Zwy93318BfQ7fwiipUjx0d69pRFUk8mSaZSpJfyqEIhUQqTSSWoJTNIoUkElLRhEDVFHRNkIiFzy+GlAFtHd/8gI/8tavfQisOvXZuaJoCpNTaYoJFkM/28B0TSCmkO1WkNimtZ7FbcHvxIFKPYHXjyLlE2HcNwhbj5OsK+OUmqBEIhFYpgdXdRqEcYzYWoqoWMLbGsYW0QHy8pJAAAAAASUVORK5CYII=";

function SoldierSVG() {
  return (
    <img src={SOLDIER_IMG} alt="soldier"
      style={{ width: 38, height: 54, objectFit: "contain", display: "block" }} />
  );
}

function HeartSVG({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#b96070">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

function Checkbox({ checked }) {
  return (
    <div style={{
      width: 18, height: 18,
      border: `2px solid ${checked ? "var(--olive)" : "#ccc"}`,
      borderRadius: 4,
      background: checked ? "var(--olive)" : "transparent",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
      transition: "all .25s ease",
      boxShadow: checked ? "0 0 6px rgba(74,103,65,.35)" : "none"
    }}>
      {checked && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <polyline points="1.5,5 4,7.5 8.5,2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );
}

function FireworksBurst({ x, y, color, delay }) {
  const lines = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 360;
    const rad = (angle * Math.PI) / 180;
    const x2 = Math.cos(rad) * 38;
    const y2 = Math.sin(rad) * 38;
    return { x2, y2 };
  });
  return (
    <g transform={`translate(${x},${y})`} style={{ animation: `burst 1.2s ease-out ${delay}s forwards`, opacity: 0 }}>
      {lines.map((l, i) => (
        <line key={i} x1="0" y1="0" x2={l.x2} y2={l.y2}
          stroke={color} strokeWidth="2.5" strokeLinecap="round"
          style={{ animation: `lineOut 1s ease-out ${delay + i * 0.02}s forwards`, opacity: 0 }} />
      ))}
      <circle cx="0" cy="0" r="5" fill={color} style={{ animation: `dotPop 0.4s ease-out ${delay}s forwards`, opacity: 0 }} />
    </g>
  );
}

export default function App() {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const [activeMonth, setActiveMonth] = useState(null);
  const [particles, setParticles] = useState([]);
  const [supportMsg, setSupportMsg] = useState(null);
  const [supportKey, setSupportKey] = useState(0);
  const [novStep, setNovStep] = useState("letter");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const supportRef = useRef(null);
  const audioRef = useRef(null);

  const totalDone = Object.keys(unlocked).length;
  const progress = (totalDone / MONTHS.length) * 100;
  const percentage = Math.round(progress);
  const soldierPos = progress;
  const allComplete = totalDone === MONTHS.length;

  const save = (d) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch {} };

  const fireConfetti = () => {
    const C = ["#f9d5e5","#ffd6a5","#d4e8d0","#ffeaa7","#c9a84c","#f0c0d0","#c8f1ff"];
    let s = Date.now();
    const r = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return Math.abs(s) / 0x7fffffff; };
    setParticles(Array.from({ length: 40 }, (_, i) => ({
      id: i, x: r() * 100, delay: r() * 1.2, size: r() * 12 + 5,
      color: C[Math.floor(r() * C.length)]
    })));
    setTimeout(() => setParticles([]), 4000);
  };

  const playSound = () => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    } catch {}
  };

  const handleReset = () => {
    setUnlocked({}); save({});
    setShowResetConfirm(false);
    setActiveMonth(null);
    setNovStep("letter");
    setShowFireworks(false);
  };

  const handleCard = (month, idx) => {
    const done = !!unlocked[month.id];
    const isNext = !done && (idx === 0 || !!unlocked[MONTHS[idx - 1]?.id]);
    if (!done && !isNext) return;
    if (!done) {
      const next = { ...unlocked, [month.id]: true };
      setUnlocked(next); save(next);
      fireConfetti();
      if (month.id === "nov2026") {
        setShowFireworks(true);
        setTimeout(() => setShowFireworks(false), 5000);
      }
    }
    setNovStep("letter");
    setActiveMonth({ month, idx });
  };

  const getSupport = () => {
    const idx = Math.floor(Math.random() * SUPPORT_MESSAGES.length);
    setSupportMsg(SUPPORT_MESSAGES[idx]);
    setSupportKey(k => k + 1);
    setTimeout(() => supportRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
  };

  const isFinalMonth = activeMonth?.month?.id === "nov2026";
  const closeModal = () => { setActiveMonth(null); setNovStep("letter"); };

  const fwColors = ["#ffd700","#ff6b9d","#7ed6df","#f9ca24","#badc58","#e056fd","#ff9f43"];
  const fwBursts = Array.from({ length: 14 }, (_, i) => ({
    x: 60 + Math.sin(i * 1.7) * 220 + (i % 3) * 80,
    y: 50 + Math.cos(i * 2.1) * 130 + (i % 2) * 60,
    color: fwColors[i % fwColors.length],
    delay: (i % 5) * 0.22
  }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --cream:#faf7f2;--white:#fff;--ink:#22201e;--ink2:#5a5450;
          --gold:#b8973e;--gold-l:#e8d99a;
          --olive:#4a6741;--olive-l:#cddbc8;
          --rose:#b96070;--rose-l:#f0d0d8;
          --sand:#e4ddd4;--deep:#28201c;
        }
        html{scroll-behavior:smooth}
        body{background:var(--cream);color:var(--ink);font-family:'DM Sans',sans-serif;min-height:100vh;overflow-x:hidden;line-height:1.6}
        body::before{content:'';position:fixed;inset:0;z-index:0;
          background:radial-gradient(ellipse at 8% 5%,rgba(184,151,62,.07) 0%,transparent 50%),
                     radial-gradient(ellipse at 92% 95%,rgba(74,103,65,.06) 0%,transparent 50%),
                     radial-gradient(ellipse at 50% 50%,rgba(185,96,112,.04) 0%,transparent 55%);
          pointer-events:none}

        @keyframes fall{0%{transform:translateY(-10px) rotate(0deg);opacity:1}100%{transform:translateY(105vh) rotate(800deg) scale(.3);opacity:0}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glow{0%,100%{box-shadow:0 0 0 0 rgba(184,151,62,0)}50%{box-shadow:0 0 18px 4px rgba(184,151,62,.22)}}
        @keyframes floatS{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-7px)}}
        @keyframes pulse-heart{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
        @keyframes slideIn{from{opacity:0;transform:translateY(20px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes burst{0%{opacity:1;transform:scale(0)}60%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.1)}}
        @keyframes lineOut{0%{opacity:0;stroke-dasharray:0 100}30%{opacity:1}100%{opacity:0;stroke-dasharray:40 100}}
        @keyframes dotPop{0%{opacity:0;r:0}40%{opacity:1;r:6}100%{opacity:0;r:3}}
        @keyframes fwFadeIn{from{opacity:0}to{opacity:1}}
        @keyframes fwFadeOut{from{opacity:1}to{opacity:0}}
        @keyframes cakeBounce{0%{transform:scale(0) rotate(-8deg);opacity:0}60%{transform:scale(1.07) rotate(2deg);opacity:1}80%{transform:scale(.97) rotate(-1deg)}100%{transform:scale(1) rotate(0deg);opacity:1}}

        .pcl{position:fixed;inset:0;pointer-events:none;z-index:999;overflow:hidden}
        .wrap{position:relative;z-index:1;max-width:900px;margin:0 auto;padding:52px 20px 100px}

        .fw-overlay{position:fixed;inset:0;z-index:998;pointer-events:none;animation:fwFadeIn .3s ease both}
        .fw-overlay.fading{animation:fwFadeOut .8s ease 3.8s both}

        .hdr{text-align:center;margin-bottom:48px;animation:fadeUp .6s ease both}
        .hdr-tag{display:inline-block;font-size:10px;font-weight:500;letter-spacing:.32em;text-transform:uppercase;color:var(--olive);background:var(--olive-l);padding:5px 16px;border-radius:4px;margin-bottom:18px}
        .hdr h1{font-family:'Lora',serif;font-size:clamp(2.5rem,6.5vw,4.2rem);font-weight:600;color:var(--ink);line-height:1.1;margin-bottom:4px}
        .hdr h1 em{font-style:italic;color:var(--rose)}
        .hdr-period{font-size:11px;letter-spacing:.32em;text-transform:uppercase;color:var(--gold);margin:12px 0;display:flex;align-items:center;justify-content:center;gap:12px}
        .hdr-line{width:36px;height:1px;background:var(--gold-l)}
        .hdr-sub{font-family:'Lora',serif;font-style:italic;font-size:.98rem;color:var(--ink2);line-height:1.7;margin-top:8px}

        .prog-box{background:var(--white);border:1px solid var(--gold-l);border-radius:20px;padding:24px 26px 20px;margin-bottom:16px;box-shadow:0 2px 18px rgba(0,0,0,.05);animation:fadeUp .6s .08s ease both}
        .prog-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
        .prog-lbl{font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:var(--olive);font-weight:500}
        .prog-n{font-family:'Lora',serif;font-size:1rem;color:var(--ink)}
        .prog-n span{color:var(--rose);font-style:italic}
        .prog-n .pct{font-size:.8rem;color:var(--gold);margin-left:6px;font-style:normal}
        .track-wrap{position:relative;margin-bottom:10px;padding-top:72px}
        .track{position:relative;height:10px;background:var(--sand);border-radius:9999px;overflow:visible}
        .fill{height:100%;background:linear-gradient(to right,var(--olive),var(--gold));border-radius:9999px;transition:width 1s cubic-bezier(.22,1,.36,1)}
        .soldier{position:absolute;bottom:10px;transition:left 1s cubic-bezier(.22,1,.36,1);animation:floatS 2.8s ease-in-out infinite;z-index:3;filter:drop-shadow(0 4px 8px rgba(0,0,0,.22))}
        .prog-pct-row{display:flex;align-items:center;justify-content:space-between;margin-top:4px}
        .prog-pct-bar{font-size:11px;font-weight:500;color:var(--gold);letter-spacing:.04em}
        .prog-sub{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#aaa}
        .rank-row{display:flex;align-items:center;gap:10px;margin-top:12px;padding-top:12px;border-top:1px solid var(--sand)}
        .rank-lbl{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#bbb}
        .stars{display:flex;gap:3px;margin-left:auto}
        .star{font-size:13px}

        .reset-row{display:flex;justify-content:flex-end;margin-bottom:10px}
        .reset-btn{background:none;border:1px solid #e0d8ce;border-radius:8px;padding:6px 14px;font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#b0a8a0;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:6px}
        .reset-btn:hover{border-color:var(--rose);color:var(--rose);background:var(--rose-l)}
        .reset-confirm{background:var(--white);border:1px solid var(--rose-l);border-radius:12px;padding:14px 18px;display:flex;align-items:center;gap:12px;justify-content:space-between;margin-bottom:12px;box-shadow:0 2px 12px rgba(185,96,112,.1);animation:fadeUp .2s ease both}
        .reset-confirm-txt{font-size:11px;color:var(--rose);font-weight:500}
        .reset-confirm-btns{display:flex;gap:8px}
        .rc-yes{background:var(--rose);color:white;border:none;border-radius:7px;padding:6px 14px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;font-weight:500}
        .rc-no{background:none;color:#aaa;border:1px solid #e0d8ce;border-radius:7px;padding:6px 14px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;cursor:pointer}

        .support-zone{margin-bottom:36px;display:flex;flex-direction:column;align-items:center;gap:14px;animation:fadeUp .6s .14s ease both}
        .sup-lbl{font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:var(--rose);text-align:center}
        .sup-btn{background:var(--rose);color:white;border:none;border-radius:12px;padding:13px 26px;font-family:'DM Sans',sans-serif;font-size:12px;letter-spacing:.2em;text-transform:uppercase;font-weight:500;cursor:pointer;box-shadow:0 4px 16px rgba(185,96,112,.28);transition:transform .2s,box-shadow .2s;display:flex;align-items:center;gap:9px}
        .sup-btn:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(185,96,112,.36)}
        .sup-btn:active{transform:translateY(0)}
        .sup-card{width:100%;max-width:540px;background:var(--white);border:1px solid var(--rose-l);border-left:3px solid var(--rose);border-radius:14px;padding:20px 22px;display:flex;gap:14px;align-items:flex-start;box-shadow:0 4px 18px rgba(185,96,112,.08);animation:fadeUp .35s cubic-bezier(.22,1,.36,1) both}
        .sup-icon{font-size:1.7rem;flex-shrink:0}
        .sup-text{font-family:'Lora',serif;font-size:.98rem;line-height:1.72;color:var(--deep);font-style:italic}

        .divider{display:flex;align-items:center;gap:14px;margin:0 0 30px}
        .div-line{flex:1;height:1px;background:linear-gradient(to right,transparent,var(--gold-l),transparent)}
        .div-txt{font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);white-space:nowrap}

        .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(185px,1fr));gap:15px}

        .card{border-radius:18px;padding:21px 17px;border:1px solid transparent;position:relative;overflow:hidden;transition:transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s;animation:fadeUp .5s ease both;user-select:none}
        .card.locked{background:#eeebe6;border-color:#e0dbd4;cursor:not-allowed;opacity:.82}
        .card.nxt{background:var(--white);border-color:var(--olive-l);box-shadow:0 0 0 2px var(--olive-l);cursor:pointer}
        .card.nxt:hover{transform:translateY(-4px);box-shadow:0 8px 26px rgba(74,103,65,.16),0 0 0 2px var(--olive)}
        .card.done{background:var(--white);border-color:var(--gold-l);box-shadow:0 3px 14px rgba(184,151,62,.1);cursor:pointer}
        .card.done:hover{transform:translateY(-4px);box-shadow:0 10px 28px rgba(185,96,112,.14)}
        .card.final.done{background:linear-gradient(135deg,#fffbee,#fff2f5);border-color:var(--gold);animation:glow 2.8s ease-in-out infinite;cursor:pointer}
        .card.final.done:hover{transform:translateY(-4px)}

        .c-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:11px}
        .c-emoji{font-size:1.65rem;filter:grayscale(1);transition:filter .3s}
        .card.done .c-emoji,.card.nxt .c-emoji{filter:grayscale(0)}
        .c-check{width:20px;height:20px;background:linear-gradient(135deg,var(--rose),var(--gold));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;color:white;flex-shrink:0}
        .c-lock{font-size:.82rem;opacity:.22}
        .c-arrow{font-size:.95rem;color:var(--olive)}
        .c-year{font-size:9px;letter-spacing:.22em;text-transform:uppercase;display:block;margin-bottom:2px}
        .card.locked .c-year{color:#c0bab4}
        .card.done .c-year,.card.nxt .c-year{color:var(--gold)}
        .c-name{font-family:'Lora',serif;font-size:1.3rem;font-weight:500;display:block;margin-bottom:11px}
        .card.locked .c-name{color:#c4bfba}
        .card.done .c-name,.card.nxt .c-name{color:var(--ink)}
        .c-pill{font-size:9px;letter-spacing:.13em;text-transform:uppercase;padding:3px 10px;border-radius:9999px;display:inline-block;font-weight:500}
        .card.locked .c-pill{background:#e4dfd8;color:#b5b0aa}
        .card.done .c-pill{background:#fde8ec;color:var(--rose)}
        .card.nxt .c-pill{background:var(--olive-l);color:var(--olive)}
        .c-hint{display:block;font-family:'Lora',serif;font-style:italic;font-size:.74rem;color:var(--olive);margin-top:7px;opacity:.8}
        .c-checkbox-row{display:flex;align-items:center;gap:7px;margin-top:9px;padding-top:9px;border-top:1px solid rgba(0,0,0,.06)}
        .c-checkbox-lbl{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#aaa}
        .card.done .c-checkbox-lbl{color:var(--olive)}

        .overlay{position:fixed;inset:0;z-index:200;background:rgba(28,20,18,.56);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeUp .22s ease both}
        .modal{background:var(--cream);border-radius:22px;max-width:560px;width:100%;max-height:88vh;overflow-y:auto;padding:38px 34px;position:relative;border:1px solid var(--gold-l);box-shadow:0 30px 70px rgba(28,20,18,.26);animation:fadeUp .3s cubic-bezier(.22,1,.36,1) both}
        .m-close{position:absolute;top:14px;right:14px;background:none;border:1px solid var(--sand);border-radius:50%;width:32px;height:32px;cursor:pointer;font-size:.85rem;color:var(--ink2);display:flex;align-items:center;justify-content:center;transition:background .2s;font-family:sans-serif}
        .m-close:hover{background:var(--rose-l)}
        .m-hdr{text-align:center;margin-bottom:22px}
        .m-emoji{font-size:2.5rem;display:block;margin-bottom:8px}
        .m-badge{display:inline-block;background:var(--olive-l);color:var(--olive);font-size:9px;letter-spacing:.22em;text-transform:uppercase;padding:4px 12px;border-radius:4px;margin-bottom:10px;font-weight:500}
        .m-title{font-family:'Lora',serif;font-size:1.85rem;font-weight:600;color:var(--ink);margin-bottom:4px}
        .m-rank{font-family:'Lora',serif;font-style:italic;font-size:.88rem;color:var(--gold)}
        .m-div{display:flex;align-items:center;gap:12px;margin:18px 0}
        .m-div-line{flex:1;height:1px;background:var(--gold-l)}
        .letter{background:var(--white);border:1px solid #ede8e0;border-radius:14px;padding:26px 22px;position:relative}
        .letter::before{content:'"';font-family:'Lora',serif;font-size:4rem;line-height:1;color:var(--gold-l);position:absolute;top:6px;left:14px;pointer-events:none}
        .letter-text{font-family:'Lora',serif;font-size:.98rem;line-height:1.88;color:var(--deep);white-space:pre-wrap;padding-top:22px}
        .m-footer{text-align:center;margin-top:18px;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#b0a8a0}

        .next-mission-btn{display:block;width:100%;margin-top:18px;background:linear-gradient(135deg,var(--rose),var(--gold));color:white;border:none;border-radius:12px;padding:14px 20px;font-family:'DM Sans',sans-serif;font-size:12px;letter-spacing:.22em;text-transform:uppercase;font-weight:500;cursor:pointer;box-shadow:0 4px 18px rgba(184,151,62,.28);transition:transform .2s,box-shadow .2s}
        .next-mission-btn:hover{transform:translateY(-2px);box-shadow:0 8px 26px rgba(184,151,62,.38)}

        .celebration-screen{text-align:center;animation:slideIn .5s cubic-bezier(.22,1,.36,1) both;display:flex;flex-direction:column;align-items:center;gap:16px}
        .cel-title{font-family:'Lora',serif;font-size:2rem;font-weight:600;line-height:1.2;background:linear-gradient(135deg,var(--rose),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .cake-photo{width:100%;max-width:400px;border-radius:18px;border:3px solid var(--gold-l);box-shadow:0 8px 30px rgba(184,151,62,.22);object-fit:contain;height:auto;display:block;animation:cakeBounce .7s cubic-bezier(.22,1,.36,1) both}
        .cel-next-btn{width:100%;background:linear-gradient(135deg,var(--rose),var(--gold));color:white;border:none;border-radius:12px;padding:14px 20px;font-family:'DM Sans',sans-serif;font-size:12px;letter-spacing:.22em;text-transform:uppercase;font-weight:500;cursor:pointer;box-shadow:0 4px 18px rgba(184,151,62,.28);transition:transform .2s,box-shadow .2s}
        .cel-next-btn:hover{transform:translateY(-2px);box-shadow:0 8px 26px rgba(184,151,62,.38)}

        .mission-section{margin-top:6px}
        .mission-card{background:linear-gradient(145deg,#1e1612,#2a1e18);border:1px solid var(--gold);border-radius:16px;padding:28px 24px;text-align:center}
        .mc-tag{font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);display:block;margin-bottom:14px}
        .mc-title{font-family:'Lora',serif;font-size:1.5rem;font-weight:600;color:white;line-height:1.3;margin-bottom:12px}
        .mc-title em{font-style:italic;color:var(--gold)}
        .mc-mission-name{font-family:'Lora',serif;font-style:italic;font-size:1.15rem;color:#f0d0d8;margin-bottom:8px}
        .mc-mission-name strong{color:white;font-style:normal}
        .mc-sub{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:#7a6860;margin-bottom:22px}
        .accept-btn{background:linear-gradient(135deg,var(--rose),var(--gold));color:white;border:none;border-radius:10px;padding:13px 30px;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.24em;text-transform:uppercase;font-weight:500;cursor:pointer;box-shadow:0 5px 20px rgba(184,151,62,.3);transition:transform .2s,box-shadow .2s}
        .accept-btn:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(184,151,62,.42)}

        .accepted-screen{text-align:center;padding:8px 0;animation:slideIn .45s cubic-bezier(.22,1,.36,1) both;display:flex;flex-direction:column;align-items:center;gap:10px}
        .accepted-heart{font-size:3rem;line-height:1;animation:pulse-heart 1.4s ease-in-out infinite}
        .accepted-tag{display:inline-block;background:linear-gradient(135deg,var(--rose-l),#ffeaa7);color:var(--rose);font-size:9px;letter-spacing:.22em;text-transform:uppercase;padding:5px 16px;border-radius:9999px;font-weight:500;border:1px solid var(--rose-l);box-shadow:0 2px 10px rgba(185,96,112,.14)}
        .accepted-title{font-family:'Lora',serif;font-size:1.6rem;font-weight:600;color:var(--ink);line-height:1.25}
        .accepted-title em{font-style:italic;color:var(--rose)}
        .accepted-msg{font-family:'Lora',serif;font-style:italic;font-size:.9rem;color:var(--deep);line-height:1.65;background:var(--white);border:1px solid #ede8e0;border-radius:12px;padding:16px 18px;text-align:left;white-space:pre-wrap;border-left:3px solid var(--rose);max-width:100%}
        .accepted-stars{display:flex;align-items:center;justify-content:center;gap:5px}
        .accepted-close{background:var(--white);color:var(--ink);border:1.5px solid var(--gold-l);border-radius:10px;padding:11px 26px;font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:.22em;text-transform:uppercase;font-weight:500;cursor:pointer;transition:background .2s,transform .2s}
        .accepted-close:hover{background:var(--gold-l);transform:translateY(-1px)}

        @media(max-width:600px){.grid{grid-template-columns:1fr 1fr;gap:11px}.modal{padding:26px 16px}.prog-box{padding:18px 15px}}
        @media(max-width:380px){.grid{grid-template-columns:1fr}}
      `}</style>

      <audio ref={audioRef} src={celebrationSound} preload="auto" />

      {particles.length > 0 && (
        <div className="pcl">
          {particles.map(p => (
            <div key={p.id} style={{
              position: "absolute", left: `${p.x}%`, top: "-16px",
              width: p.size, height: p.size, background: p.color, borderRadius: "50%",
              animation: `fall 1.9s ease-in ${p.delay}s forwards`
            }} />
          ))}
        </div>
      )}

      {showFireworks && (
        <div className="fw-overlay fading" style={{ pointerEvents: "none" }}>
          <svg width="100%" height="100%" viewBox="0 0 700 500" preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg">
            {fwBursts.map((b, i) => (
              <FireworksBurst key={i} x={b.x} y={b.y} color={b.color} delay={b.delay} />
            ))}
          </svg>
        </div>
      )}

      <div className="wrap">
        <div className="hdr">
          <div className="hdr-tag">🎖️ For Hazem · From Reem</div>
          <h1>Hazem's <em>Journey</em></h1>
          <div className="hdr-period">
            <div className="hdr-line" /> Oct 2025 → Nov 2026 <div className="hdr-line" />
          </div>
          <p className="hdr-sub">
            I'm truly happy to be a part of your journey.<br />
            My heart feels lucky to walk this path with you.
          </p>
        </div>

        <div className="prog-box">
          <div className="prog-top">
            <div className="prog-lbl">🎯 Mission Progress</div>
            <div className="prog-n">
              <span>{totalDone}</span> of 14 months
              <span className="pct">({percentage}%)</span>
            </div>
          </div>
          <div className="track-wrap">
            <div className="soldier" style={{ left: allComplete ? "calc(100% - 19px)" : `calc(${soldierPos}% - 19px)` }}>
              <SoldierSVG />
            </div>
            <div className="track">
              <div className="fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="prog-pct-row">
              <div className="prog-pct-bar">{percentage}% complete</div>
              <div className="prog-sub">
                {14 - totalDone > 0
                  ? `${14 - totalDone} month${14 - totalDone !== 1 ? "s" : ""} until home`
                  : "🎊 Mission Complete!"}
              </div>
            </div>
          </div>
          <div className="rank-row">
            <div className="rank-lbl">Rank</div>
            <div className="stars">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className="star"
                  style={{ color: i < Math.ceil((totalDone / 14) * 5) ? "var(--gold)" : "#ddd" }}>★</span>
              ))}
            </div>
          </div>
        </div>

        <div className="reset-row">
          {!showResetConfirm ? (
            <button className="reset-btn" onClick={() => setShowResetConfirm(true)}>↺ &nbsp;Reset all months</button>
          ) : (
            <div className="reset-confirm">
              <span className="reset-confirm-txt">Reset all progress?</span>
              <div className="reset-confirm-btns">
                <button className="rc-no" onClick={() => setShowResetConfirm(false)}>Cancel</button>
                <button className="rc-yes" onClick={handleReset}>Yes, reset</button>
              </div>
            </div>
          )}
        </div>

        <div className="support-zone" ref={supportRef}>
          <div className="sup-lbl">💌 Hard day, Hazem? Press this.</div>
          <button className="sup-btn" onClick={getSupport}>
            <HeartSVG size={15} />&nbsp; Get a message from Reem
          </button>
          {supportMsg && (
            <div key={supportKey} className="sup-card">
              <span className="sup-icon">{supportMsg.icon}</span>
              <p className="sup-text">{supportMsg.text}</p>
            </div>
          )}
        </div>

        <div className="divider">
          <div className="div-line" /><div className="div-txt">✦ Monthly Letters ✦</div><div className="div-line" />
        </div>

        <div className="grid">
          {MONTHS.map((m, idx) => {
            const done = !!unlocked[m.id];
            const isNext = !done && (idx === 0 || !!unlocked[MONTHS[idx - 1]?.id]);
            const locked = !done && !isNext;
            const isFinal = idx === MONTHS.length - 1;
            let cls = "card " + (done ? "done" + (isFinal ? " final" : "") : isNext ? "nxt" : "locked");
            return (
              <div key={m.id} className={cls} style={{ animationDelay: `${idx * .03}s` }}
                onClick={() => handleCard(m, idx)}
                title={locked ? "Complete previous months first" : done ? "Read your letter" : "Tap to unlock!"}>
                <div className="c-top">
                  <span className="c-emoji">{m.emoji}</span>
                  {done && <div className="c-check">✓</div>}
                  {locked && <span className="c-lock">🔒</span>}
                  {isNext && <span className="c-arrow">→</span>}
                </div>
                <span className="c-year">{m.year}</span>
                <span className="c-name">{m.label}</span>
                <span className="c-pill">
                  {done ? "✦ Letter inside" : isNext ? "→ Unlock" : "Locked"}
                </span>
                {isNext && !isFinal && <span className="c-hint">Your letter is waiting 💌</span>}
                {isNext && isFinal && <span className="c-hint">The final month 🎊</span>}
                {done && isFinal && <span className="c-hint" style={{ color: "var(--rose)" }}>You made it home. 💛</span>}
                <div className="c-checkbox-row">
                  <Checkbox checked={done} />
                  <span className="c-checkbox-lbl">{done ? "Month complete" : locked ? "Locked" : "Tap to complete"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeMonth && (
        <div className="overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="m-close" onClick={closeModal}>✕</button>

            {(!isFinalMonth || novStep === "letter") && (
              <>
                <div className="m-hdr">
                  <span className="m-emoji">{activeMonth.month.emoji}</span>
                  <div className="m-badge">🎖️ {activeMonth.month.year} · Unlocked</div>
                  <div className="m-title">{activeMonth.month.label}</div>
                </div>
                <div className="m-div">
                  <div className="m-div-line" /><HeartSVG size={15} /><div className="m-div-line" />
                </div>
                <div className="letter">
                  <p className="letter-text">{MONTH_LETTERS[activeMonth.month.id]}</p>
                </div>
                {isFinalMonth && (
                  <button className="next-mission-btn" onClick={() => { playSound(); setNovStep("celebration"); }}>
                    🎂 &nbsp; Open your celebration →
                  </button>
                )}
                {!isFinalMonth && (
                  <div className="m-footer">
                    {activeMonth.month.label} {activeMonth.month.year} · Always yours, Reem 🐱
                  </div>
                )}
              </>
            )}

            {isFinalMonth && novStep === "celebration" && (
              <div className="celebration-screen">
                <div className="cel-title">Welcome home, Hazem. 🎖️</div>
                <img src={cakePhoto} alt="Celebration" className="cake-photo" />
                <button className="cel-next-btn" onClick={() => setNovStep("mission")}>
                  🎖️ &nbsp; Continue to Next Mission →
                </button>
              </div>
            )}

            {isFinalMonth && novStep === "mission" && (
              <div className="mission-section">
                <div className="m-hdr">
                  <span className="m-emoji">🎊</span>
                  <div className="m-badge">⭐ All 14 Months Complete</div>
                  <div className="m-title" style={{ color: "var(--ink)" }}>You did it, Hazem.</div>
                  <div className="m-rank">General of Reem's Heart</div>
                </div>
                <div className="m-div">
                  <div className="m-div-line" /><HeartSVG size={15} /><div className="m-div-line" />
                </div>
                <div className="mission-card">
                  <span className="mc-tag">🎖️ Final Mission Briefing 🎖️</span>
                  <div className="mc-title">"Are you ready for the<br />next mission, Hazem?"</div>
                  <div className="mc-mission-name">Mission Name: &nbsp;<strong>Marry Reem.</strong></div>
                  <div className="mc-sub" style={{ marginBottom: 20 }}>
                    Difficulty: You already know the answer &nbsp;|&nbsp; Reward: Everything 🐱
                  </div>
                  <button className="accept-btn" onClick={() => setNovStep("accepted")}>
                    ✓ &nbsp; Mission Accepted
                  </button>
                </div>
                <div className="m-footer" style={{ marginTop: 16 }}>
                  November 2026 · The beginning of everything ✦
                </div>
              </div>
            )}

            {isFinalMonth && novStep === "accepted" && (
              <div className="accepted-screen">
                <span className="accepted-heart">💛</span>
                <div className="accepted-tag">✦ Mission Accepted ✦</div>
                <div className="accepted-title">Let's move to the<br /><em>next mission</em> together.</div>
                <p className="accepted-msg">{`You survived the distance, the waiting, every hard day — and I was right here the whole time.\n\nNow the real adventure begins. Together. Always.\n\n— Reem 🐱`}</p>
                <div className="accepted-stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ fontSize: "1.1rem", color: "var(--gold)" }}>★</span>
                  ))}
                </div>
                <button className="accepted-close" onClick={closeModal}>
                  Close &amp; Begin ✦
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}