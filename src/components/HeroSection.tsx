import { useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const DRONE_IMAGE =
  "https://cdn.poehali.dev/projects/dfb49ee8-efb6-4a16-899e-6b2691fe21f4/files/d5db5c51-517f-4d0a-80ac-bd336571e4a3.jpg";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const droneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }[] = [];

    const colors = ["rgba(0,153,255,", "rgba(255,136,0,", "rgba(0,200,255,"];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ")";
        ctx.fill();
      });
      particles.forEach((p, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,153,255,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    // Движение дрона-фото по экрану
    const drone = droneRef.current;
    if (drone) {
      let t = 0;
      let droneAnimId: number;
      const moveDrone = () => {
        t += 0.006;
        const w = canvas.width;
        const h = canvas.height;
        const x = w * 0.1 + Math.sin(t * 0.5) * w * 0.55 + Math.sin(t * 0.9 + 1.2) * w * 0.08;
        const y = h * 0.1 + Math.sin(t * 0.35 + 0.5) * h * 0.4 + Math.cos(t * 0.6) * h * 0.08;

        // угол наклона по направлению движения
        const dx = Math.cos(t * 0.5) * 0.55 * Math.PI * w + Math.cos(t * 0.9 + 1.2) * 0.08 * Math.PI * w;
        const tiltX = Math.sin(t * 0.35 + 0.5) * 6;
        const tiltZ = Math.atan2(dx, 200) * (180 / Math.PI) * 0.3;

        drone.style.transform = `translate(${x}px, ${y}px) rotateX(${tiltX}deg) rotateZ(${tiltZ}deg)`;
        droneAnimId = requestAnimationFrame(moveDrone);
      };
      moveDrone();

      return () => {
        cancelAnimationFrame(animId);
        cancelAnimationFrame(droneAnimId);
      };
    }

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-background grid-bg"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Летящий дрон — настоящее фото */}
      <div
        ref={droneRef}
        className="absolute top-0 left-0 pointer-events-none z-[1] will-change-transform"
        style={{ width: 220, height: 220, marginLeft: -110, marginTop: -110 }}
      >
        <div className="relative w-full h-full">
          {/* ореол */}
          <div className="absolute inset-0 rounded-full bg-brand-blue/20 blur-2xl scale-110" />
          <img
            src={DRONE_IMAGE}
            alt="дрон"
            className="w-full h-full object-cover rounded-2xl opacity-80 drop-shadow-2xl"
            style={{ filter: "drop-shadow(0 0 18px rgba(0,153,255,0.5))" }}
          />
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-orange/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-6 py-24 pt-32 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 text-brand-blue text-sm font-body">
              <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
              Поставщик комплектующих для БПЛА
            </div>

            <h1 className="font-display text-5xl md:text-6xl xl:text-7xl font-bold leading-tight text-foreground animate-slide-up">
              Движущая сила{" "}
              <span className="text-gradient-blue block">ваших дронов</span>
            </h1>

            <p className="text-lg text-muted-foreground font-body leading-relaxed max-w-lg animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Высокотехнологичные решения от СВ-ТехноГрупп — прямые поставки
              комплектующих из Китая и собственное производство аккумуляторов в
              России
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <button
                onClick={() => scrollTo("#contacts")}
                className="btn-primary px-8 py-4 rounded-xl font-semibold text-background text-base flex items-center gap-2"
              >
                Получить КП
                <Icon name="ArrowRight" size={18} />
              </button>
              <button
                onClick={() => scrollTo("#about")}
                className="btn-outline px-8 py-4 rounded-xl font-semibold text-base flex items-center gap-2"
              >
                О компании
                <Icon name="ChevronDown" size={18} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-4 animate-slide-up" style={{ animationDelay: "0.6s" }}>
              {[
                { value: "1–3", unit: "недели", label: "Поставка из Китая" },
                { value: "100%", unit: "", label: "Оригинальная продукция" },
                { value: "B2B", unit: "", label: "Работаем с бизнесом" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl md:text-3xl font-bold text-brand-blue">
                    {stat.value}
                    <span className="text-base ml-1 text-brand-orange">{stat.unit}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 font-body">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-lg flex flex-col items-center gap-6">
              <div className="absolute inset-0 bg-brand-blue/15 rounded-3xl blur-3xl" />
              <img
                src="https://cdn.poehali.dev/projects/dfb49ee8-efb6-4a16-899e-6b2691fe21f4/bucket/fc847760-8653-4140-98f8-f07d3569cb4a.png"
                alt="СВ-ТехноГрупп логотип"
                className="relative z-10 w-full max-w-md drop-shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-brand-orange/40 rounded-full animate-pulse-ring" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border border-brand-blue/40 rounded-lg rotate-45 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollTo("#about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
      >
        <span className="text-xs font-body tracking-widest uppercase">Листать вниз</span>
        <Icon name="ChevronDown" size={20} className="animate-bounce" />
      </button>
    </section>
  );
}
