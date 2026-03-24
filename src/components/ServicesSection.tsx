import { useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const COMPONENTS_IMAGE =
  "https://cdn.poehali.dev/projects/dfb49ee8-efb6-4a16-899e-6b2691fe21f4/files/36e19a84-8fed-45c5-a7dd-c9bc4185f70a.jpg";

const products = [
  {
    icon: "Battery",
    title: "Аккумуляторы",
    desc: "Литий-ионные (собственное производство), литий-полимерные и литий-титановые батареи",
    tag: "Собственное пр-во",
    color: "blue",
  },
  {
    icon: "Cpu",
    title: "Полетные контроллеры",
    desc: "Современные системы управления полётом для различных типов БПЛА",
    tag: "Прямые поставки",
    color: "orange",
  },
  {
    icon: "Camera",
    title: "Оптические системы",
    desc: "Камеры CADXX и другие решения для воздушного наблюдения и съёмки",
    tag: "CADXX",
    color: "blue",
  },
  {
    icon: "Settings",
    title: "Исполнительные механизмы",
    desc: "Сервоприводы, моторы и механизмы управления БПЛА",
    tag: "На складе",
    color: "orange",
  },
  {
    icon: "Navigation",
    title: "Навигация и связь",
    desc: "GPS-модули, оптоволокно и навигационное оборудование",
    tag: "Прямые поставки",
    color: "blue",
  },
  {
    icon: "Radio",
    title: "Системы связи",
    desc: "Надёжные каналы передачи данных и телеметрии для БПЛА",
    tag: "На складе",
    color: "orange",
  },
];

const logistics = [
  { day: "1–2", label: "Формирование заказа", desc: "Согласование спецификации и условий поставки с клиентом" },
  { day: "3–7", label: "Оплата и отгрузка из Китая", desc: "Прямая закупка у производителя без посредников" },
  { day: "8–14", label: "Таможенное оформление", desc: "Профессиональное сопровождение груза через границу" },
  { day: "15–21", label: "Доставка клиенту", desc: "Транспортировка в любую точку России" },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
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
    <section id="services" ref={sectionRef} className="py-24 bg-secondary/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 text-brand-blue text-sm mb-4 font-body">
            <Icon name="Package" size={14} />
            Ассортимент
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Полный ассортимент{" "}
            <span className="text-gradient-orange">комплектующих для БПЛА</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body text-lg">
            Всё необходимое для сборки и эксплуатации дронов — от аккумуляторов до систем связи
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {products.map((p, i) => (
            <div
              key={p.title}
              className={`reveal card-hover p-6 rounded-xl bg-background/60 backdrop-blur-sm border ${
                p.color === "blue"
                  ? "border-brand-blue/20"
                  : "border-brand-orange/20"
              } relative overflow-hidden group`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-5 ${
                p.color === "blue" ? "bg-brand-blue" : "bg-brand-orange"
              }`} />
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                p.color === "blue"
                  ? "bg-brand-blue/15 text-brand-blue"
                  : "bg-brand-orange/15 text-brand-orange"
              }`}>
                <Icon name={p.icon} size={24} />
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-md mb-3 inline-block ${
                p.color === "blue"
                  ? "bg-brand-blue/10 text-brand-blue"
                  : "bg-brand-orange/10 text-brand-orange"
              } font-body`}>
                {p.tag}
              </span>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 text-brand-blue text-sm mb-6 font-body">
              <Icon name="Clock" size={14} />
              Логистика и сроки поставок
            </div>
            <h3 className="font-display text-3xl font-bold text-foreground mb-8">
              Полный цикл поставки из Китая —{" "}
              <span className="text-gradient-blue">1–3 недели</span>
            </h3>

            <div className="space-y-4">
              {logistics.map((step, i) => (
                <div key={step.label} className="flex gap-4 items-start group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex flex-col items-center justify-center group-hover:bg-brand-blue/20 transition-colors">
                    <span className="text-brand-blue text-xs font-body">день</span>
                    <span className="font-display text-sm font-bold text-brand-blue">{step.day}</span>
                  </div>
                  <div className="flex-1 pb-4 border-b border-white/5">
                    <div className="font-display text-base font-bold text-foreground mb-1">
                      {i + 1}. {step.label}
                    </div>
                    <div className="text-sm text-muted-foreground font-body">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl border border-brand-orange/20 bg-brand-orange/5 flex items-start gap-3">
              <Icon name="Warehouse" size={20} className="text-brand-orange flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-display text-sm font-bold text-foreground mb-1">Склад в РФ</div>
                <div className="text-xs text-muted-foreground font-body">
                  Популярные позиции всегда в наличии для срочных заказов. Для клиентов с регулярными
                  потребностями — персональный складской запас.
                </div>
              </div>
            </div>
          </div>

          <div className="reveal relative">
            <div className="absolute inset-0 bg-brand-orange/10 rounded-2xl blur-3xl" />
            <img
              src={COMPONENTS_IMAGE}
              alt="Комплектующие для БПЛА"
              className="relative z-10 w-full rounded-2xl object-cover border border-brand-orange/20"
            />
            <div className="absolute -top-3 -left-3 px-4 py-2 bg-background border border-brand-blue/30 rounded-lg text-sm font-body text-brand-blue glow-blue">
              <Icon name="CheckCircle" size={14} className="inline mr-1" />
              Оригинальная продукция
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
