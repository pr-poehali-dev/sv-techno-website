import { useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const FACTORY_IMAGE =
  "https://cdn.poehali.dev/projects/dfb49ee8-efb6-4a16-899e-6b2691fe21f4/files/6de7ad61-590b-4868-901d-8a29c7c3767a.jpg";

const batteries = [
  {
    model: "6S3P 12000 мАч",
    desc: "Оптимальная ёмкость для средней продолжительности полёта",
    highlight: false,
  },
  {
    model: "6S2P 8000 мАч",
    desc: "Компактное решение для лёгких дронов",
    highlight: true,
  },
  {
    model: "6S2P 16000 мАч",
    desc: "Максимальная автономность для профессиональных задач",
    highlight: false,
  },
];

const specs = [
  {
    icon: "MapPin",
    title: "Местоположение",
    desc: "Россия, Московская область — современное производственное предприятие с полным циклом изготовления",
  },
  {
    icon: "ShieldCheck",
    title: "Контроль качества",
    desc: "Многоступенчатая система проверки на каждом этапе производства гарантирует надёжность и долговечность",
  },
  {
    icon: "Wrench",
    title: "Технические возможности",
    desc: "Производство аккумуляторов различной ёмкости и конфигурации под специфические требования заказчика",
  },
  {
    icon: "Award",
    title: "Сертификация",
    desc: "Вся продукция соответствует российским стандартам и требованиям безопасности для государственных закупок",
  },
];

const partners = [
  { name: "CADXX", desc: "Оптические системы и камеры" },
  { name: "HOBBYWING", desc: "Электронные регуляторы скорости" },
  { name: "Brother Hobby", desc: "Бесколлекторные моторы" },
  { name: "FOXEER", desc: "FPV-камеры и видеосистемы" },
];

export default function ProductionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="production" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 text-brand-blue text-sm mb-4 font-body">
            <Icon name="Factory" size={14} />
            Производство
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Аккумуляторы{" "}
            <span className="text-gradient-blue">российского производства</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body text-lg">
            Производим литий-ионные аккумуляторы в Москве с жёстким контролем качества на всех этапах
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="reveal relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-brand-blue/10 rounded-2xl blur-3xl" />
            <img
              src={FACTORY_IMAGE}
              alt="Производство аккумуляторов"
              className="relative z-10 w-full rounded-2xl object-cover border border-brand-blue/20"
            />
            <div className="absolute -bottom-4 -right-4 p-4 bg-background border border-brand-blue/30 rounded-xl glow-blue">
              <div className="flex items-center gap-2">
                <Icon name="Zap" size={16} className="text-brand-blue" />
                <span className="text-sm font-body text-foreground font-semibold">Собственное пр-во РФ</span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-4 reveal">
            <h3 className="font-display text-2xl font-bold text-foreground mb-6">
              Примеры наших АКБ
            </h3>
            {batteries.map((b) => (
              <div
                key={b.model}
                className={`p-5 rounded-xl border transition-all duration-300 group cursor-default ${
                  b.highlight
                    ? "bg-brand-blue/10 border-brand-blue/40 glow-blue"
                    : "bg-secondary/30 border-white/10 hover:border-brand-blue/30"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    b.highlight ? "bg-brand-blue text-background" : "bg-brand-blue/15 text-brand-blue"
                  }`}>
                    <Icon name="Battery" size={20} />
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold text-foreground">{b.model}</div>
                    <div className="text-sm text-muted-foreground font-body mt-1">{b.desc}</div>
                  </div>
                  {b.highlight && (
                    <span className="ml-auto text-xs bg-brand-blue text-background px-2 py-1 rounded-md font-body font-semibold flex-shrink-0">
                      Популярный
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div className="mt-6 text-sm text-muted-foreground font-body p-4 rounded-xl bg-secondary/20 border border-white/5">
              <Icon name="Info" size={14} className="inline mr-2 text-brand-blue" />
              Производство АКБ различной ёмкости и конфигурации под технические требования заказчика
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {specs.map((spec) => (
            <div key={spec.title} className="reveal card-hover p-6 rounded-xl bg-secondary/40 border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/15 flex items-center justify-center mb-4 text-brand-blue">
                <Icon name={spec.icon} size={24} />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-2">{spec.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{spec.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-sm mb-4 font-body">
              <Icon name="Handshake" size={14} />
              Наши партнёры
            </div>
            <h3 className="font-display text-3xl font-bold text-foreground">
              Компании, с которыми{" "}
              <span className="text-gradient-orange">мы сотрудничаем</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((p) => (
              <div
                key={p.name}
                className="card-hover p-6 rounded-xl bg-secondary/40 border border-brand-orange/20 text-center group"
              >
                <div className="font-display text-2xl font-bold text-brand-orange mb-2 group-hover:text-foreground transition-colors">
                  {p.name}
                </div>
                <div className="text-sm text-muted-foreground font-body">{p.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-xl border border-brand-orange/20 bg-brand-orange/5 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="font-display text-lg font-bold text-foreground mb-3">Как поставщик мы гарантируем:</h4>
              <ul className="space-y-2">
                {[
                  "Оригинальную продукцию напрямую от производителя",
                  "Конкурентные цены без посреднических наценок",
                  "Техническую поддержку и гарантийное обслуживание",
                  "Приоритетный доступ к новинкам и эксклюзивным моделям",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground font-body">
                    <Icon name="Check" size={16} className="text-brand-orange flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-l border-brand-orange/20 pl-6">
              <h4 className="font-display text-lg font-bold text-foreground mb-3">Преимущества прямого сотрудничества</h4>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                Работа с нами исключает риски контрафактной продукции и обеспечивает полную
                документальную поддержку для государственных закупок.
              </p>
              <div className="mt-4 flex items-center gap-2 text-brand-orange text-sm font-semibold font-body">
                <Icon name="FileText" size={16} />
                Полный пакет документов для тендеров
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
