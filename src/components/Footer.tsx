import Icon from "@/components/ui/icon";

export default function Footer() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-white/5 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://cdn.poehali.dev/projects/dfb49ee8-efb6-4a16-899e-6b2691fe21f4/bucket/2f4de81e-697b-4f98-947e-a37ca0cb4997.png"
                alt="SV-TechnoGroup"
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              Поставщик аккумуляторов и комплектующих для БПЛА. Прямые поставки из Китая, собственное производство в России.
            </p>
          </div>

          <div>
            <div className="font-display text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Навигация</div>
            <div className="space-y-2">
              {[
                { href: "#home", label: "Главная" },
                { href: "#about", label: "О компании" },
                { href: "#services", label: "Услуги" },
                { href: "#production", label: "Производство" },
                { href: "#contacts", label: "Контакты" },
              ].map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="block text-sm text-muted-foreground hover:text-brand-blue transition-colors font-body"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="font-display text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Контакты</div>
            <div className="space-y-3">
              <a href="tel:89953137576" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-blue transition-colors font-body">
                <Icon name="Phone" size={14} className="text-brand-blue" />
                8-995-313-75-76
              </a>
              <a href="mailto:sv-group33@mail.ru" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-blue transition-colors font-body">
                <Icon name="Mail" size={14} className="text-brand-blue" />
                sv-group33@mail.ru
              </a>
              <a href="mailto:manager.sv-group33@mail.ru" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-brand-blue transition-colors font-body">
                <Icon name="Mail" size={14} className="text-brand-blue" />
                manager.sv-group33@mail.ru
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                <Icon name="MapPin" size={14} className="text-brand-blue" />
                Россия, Москва
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-body">
            © 2024 ООО «СВ-ТехноГрупп». Все права защищены.
          </p>
          <p className="text-xs text-muted-foreground font-body">
            Поставщик комплектующих для БПЛА · Россия
          </p>
        </div>
      </div>
    </footer>
  );
}