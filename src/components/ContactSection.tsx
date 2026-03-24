import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const contacts = [
  {
    role: "Отдел продаж",
    phone: "8-995-313-75-26",
    email: "manager.sv-group33@mail.ru",
    icon: "Users",
  },
];

type FormData = {
  company: string;
  name: string;
  phone: string;
  email: string;
  request: string;
  comment: string;
};

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormData>({
    company: "",
    name: "",
    phone: "",
    email: "",
    request: "",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contacts" ref={sectionRef} className="py-24 bg-secondary/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 text-brand-blue text-sm mb-4 font-body">
            <Icon name="MessageSquare" size={14} />
            Свяжитесь с нами
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Готовы обсудить{" "}
            <span className="text-gradient-blue">ваш проект</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body text-lg">
            Работаем с государственными заказчиками, интеграторами и B2B клиентами.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 reveal">
            <div className="p-6 rounded-xl bg-background/60 border border-white/10 flex items-center gap-3">
              <Icon name="MapPin" size={20} className="text-brand-blue flex-shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">Адрес</div>
                <div className="text-foreground font-body font-semibold">Россия, Москва</div>
              </div>
            </div>

            {contacts.map((c) => (
              <div
                key={c.role}
                className="p-6 rounded-xl bg-background/60 border border-brand-blue/20 card-hover space-y-3"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/15 flex items-center justify-center text-brand-blue">
                    <Icon name={c.icon} size={20} />
                  </div>
                  <div className="font-display text-base font-bold text-foreground">{c.role}</div>
                </div>
                <a
                  href={`tel:${c.phone.replace(/-/g, "")}`}
                  className="flex items-center gap-3 text-foreground hover:text-brand-blue transition-colors group"
                >
                  <Icon name="Phone" size={16} className="text-brand-blue group-hover:scale-110 transition-transform" />
                  <span className="font-body font-semibold text-lg">{c.phone}</span>
                </a>
                <a
                  href={`mailto:${c.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-brand-blue transition-colors group"
                >
                  <Icon name="Mail" size={16} className="text-brand-blue group-hover:scale-110 transition-transform" />
                  <span className="font-body">{c.email}</span>
                </a>
              </div>
            ))}


          </div>

          <div className="reveal">
            <div className="p-8 rounded-2xl bg-background/80 backdrop-blur-sm border border-brand-blue/20 border-glow-blue">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-brand-blue/15 flex items-center justify-center mx-auto mb-6 glow-blue">
                    <Icon name="CheckCircle" size={40} className="text-brand-blue" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    Заявка отправлена!
                  </h3>
                  <p className="text-muted-foreground font-body">
                    Наш менеджер свяжется с вами в ближайшее время для обсуждения деталей.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ company: "", name: "", phone: "", email: "", request: "", comment: "" }); }}
                    className="mt-6 btn-outline px-6 py-3 rounded-xl text-sm font-semibold font-body"
                  >
                    Отправить ещё заявку
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Запрос коммерческого предложения
                  </h3>
                  <p className="text-sm text-muted-foreground font-body mb-6">
                    Заполните форму — мы подготовим персональное КП под ваши задачи
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-muted-foreground font-body mb-1.5 uppercase tracking-wider">
                          Компания *
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          required
                          placeholder="ООО «Название»"
                          className="w-full px-4 py-3 rounded-xl bg-secondary/60 border border-white/10 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground font-body mb-1.5 uppercase tracking-wider">
                          Контактное лицо *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Иван Иванов"
                          className="w-full px-4 py-3 rounded-xl bg-secondary/60 border border-white/10 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-muted-foreground font-body mb-1.5 uppercase tracking-wider">
                          Телефон *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          placeholder="+7 (___) ___-__-__"
                          className="w-full px-4 py-3 rounded-xl bg-secondary/60 border border-white/10 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground font-body mb-1.5 uppercase tracking-wider">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="email@company.ru"
                          className="w-full px-4 py-3 rounded-xl bg-secondary/60 border border-white/10 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-muted-foreground font-body mb-1.5 uppercase tracking-wider">
                        Тип запроса
                      </label>
                      <select
                        name="request"
                        value={form.request}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-secondary/60 border border-white/10 text-foreground font-body text-sm focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all"
                      >
                        <option value="">Выберите тип запроса</option>
                        <option value="batteries">Аккумуляторы (собственное производство)</option>
                        <option value="components">Комплектующие для БПЛА</option>
                        <option value="supply">Поставки из Китая</option>
                        <option value="tender">Государственные закупки / тендер</option>
                        <option value="partnership">Партнёрство</option>
                        <option value="other">Другое</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-muted-foreground font-body mb-1.5 uppercase tracking-wider">
                        Комментарий / ТЗ
                      </label>
                      <textarea
                        name="comment"
                        value={form.comment}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Опишите ваши требования, объёмы, сроки..."
                        className="w-full px-4 py-3 rounded-xl bg-secondary/60 border border-white/10 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full py-4 rounded-xl font-semibold text-background font-body flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <Icon name="Loader2" size={18} className="animate-spin" />
                          Отправляем...
                        </>
                      ) : (
                        <>
                          <Icon name="Send" size={18} />
                          Получить коммерческое предложение
                        </>
                      )}
                    </button>

                    <p className="text-xs text-muted-foreground font-body text-center">
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}