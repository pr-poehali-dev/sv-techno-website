import { useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const advantages = [
  {
    icon: "Factory",
    title: "Собственное производство",
    desc: "Производство литий-ионных аккумуляторов в России с полным контролем качества",
    color: "blue",
  },
  {
    icon: "Warehouse",
    title: "Склад в России",
    desc: "Ликвидные комплектующие всегда в наличии под запросы клиентов",
    color: "orange",
  },
  {
    icon: "Truck",
    title: "Прямые поставки",
    desc: "Доставка из Китая без посредников за 1–3 недели в любую точку России",
    color: "blue",
  },
  {
    icon: "Shield",
    title: "Контроль качества",
    desc: "Строгий контроль на всех этапах логистической цепочки",
    color: "orange",
  },
];

const partners = ["CADXX", "HOBBYWING", "Brother Hobby", "FOXEER"];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-sm mb-4 font-body">
            <Icon name="Building2" size={14} />
            О компании
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Надежный партнер в области{" "}
            <span className="text-gradient-blue">беспилотных технологий</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body text-lg leading-relaxed">
            СВ-ТехноГрупп — российская компания, специализирующаяся на
            комплексном снабжении комплектующими для дронов и производстве
            аккумуляторных решений
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <div className="space-y-6 reveal">
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground font-body text-base leading-relaxed">
                Ключевое преимущество нашей работы —{" "}
                <span className="text-brand-blue font-semibold">
                  прямые поставки комплектующих из Китая
                </span>{" "}
                без участия посредников. Это позволяет гарантировать клиентам
                лучшие цены, сокращать сроки доставки и обеспечивать строгий
                контроль качества продукции на всех этапах логистической цепочки.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed mt-4">
                Мы не только организуем импорт компонентов из Китая, но и
                дополняем предложение{" "}
                <span className="text-brand-orange font-semibold">
                  собственным производством литий-ионных АКБ в России
                </span>
                . В нашем ассортименте также представлены литий-полимерные и
                литий-титановые батареи от ведущих мировых производителей.
              </p>
            </div>

            <div className="border-glow-blue rounded-xl p-6 bg-secondary/30">
              <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Icon name="Handshake" size={20} className="text-brand-blue" />
                Сотрудничаем
              </h3>
              <div className="flex flex-wrap gap-3">
                {partners.map((p) => (
                  <span
                    key={p}
                    className="px-4 py-2 rounded-lg bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-semibold font-body hover:bg-brand-blue/20 transition-colors"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {advantages.map((adv, i) => (
              <div
                key={adv.title}
                className={`reveal card-hover p-6 rounded-xl bg-secondary/40 border ${
                  adv.color === "blue"
                    ? "border-brand-blue/20 hover:border-brand-blue/40"
                    : "border-brand-orange/20 hover:border-brand-orange/40"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    adv.color === "blue"
                      ? "bg-brand-blue/15 text-brand-blue"
                      : "bg-brand-orange/15 text-brand-orange"
                  }`}
                >
                  <Icon name={adv.icon} size={24} />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">
                  {adv.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 reveal">
          {[
            { icon: "Package", title: "Складская программа", desc: "Стратегический запас востребованных комплектующих для оперативного закрытия потребностей" },
            { icon: "Zap", title: "Быстрая отгрузка", desc: "Готовность к оперативной доставке под запросы наших партнёров" },
            { icon: "UserCheck", title: "Индивидуальный подход", desc: "Формирование складских запасов с учётом потребностей конкретных партнёров" },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-xl bg-gradient-to-br from-secondary/50 to-secondary/20 border border-white/5 text-center card-hover">
              <Icon name={item.icon} size={32} className="text-brand-blue mx-auto mb-3" />
              <h4 className="font-display text-base font-bold text-foreground mb-2">{item.title}</h4>
              <p className="text-xs text-muted-foreground font-body leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}