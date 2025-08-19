import Link from 'next/link'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { SectionHeader } from '../../components/blocks/SectionHeader'
import { PricingCard } from '../../components/blocks/PricingCard'
import { FAQItem } from '../../components/blocks/FAQItem'
import { StepTimeline } from '../../components/blocks/StepTimeline'
import { GradientMesh } from '../../components/visuals/GradientMesh'
import { ParticlesCanvas } from '../../components/visuals/ParticlesCanvas'
import { DataStreamSVG } from '../../components/visuals/DataStreamSVG'
import { Trash2, Database, UserX, Shield, GraduationCap } from 'lucide-react'

export default function LandingPage() {
  const services = [
    {
      icon: Trash2,
      title: 'Digital Clean-Up',
      text: 'Eliminiamo account, post, foto e tag dai principali servizi online.',
    },
    {
      icon: Database,
      title: 'Data Erasure GDPR/CCPA',
      text: 'Inviamo richieste formali a piattaforme e data broker per rimuovere i tuoi dati personali.',
    },
    {
      icon: UserX,
      title: 'Ghosting Sociale',
      text: "Pianifichiamo un'uscita graduale dai social con alias sicuri e strategie di disconnessione.",
    },
    {
      icon: Shield,
      title: 'Monitoraggio & Protezione',
      text: 'Sorvegliamo web e dark web per segnalare nuove esposizioni e fermarle sul nascere.',
    },
    {
      icon: GraduationCap,
      title: 'Consulenza & Educazione',
      text: 'Formiamo su privacy, autodifesa digitale e normativa, per non lasciare tracce in futuro.',
    },
  ]

  const targets = [
    'Vittime di stalking o doxing',
    'Ex influencer e creator',
    'Professionisti con reputazione da proteggere',
    'Attivisti e giornalisti sotto minaccia',
    'Persone comuni che vogliono ricominciare',
    'Genitori che tutelano la famiglia',
  ]

  const steps = [
    {
      title: 'Analisi iniziale & delega',
      text: 'Ti conosciamo e raccogliamo la delega per agire in tuo nome.',
    },
    {
      title: 'Mappatura delle tracce',
      text: 'Scansioniamo web, social e database per trovare i tuoi dati.',
    },
    {
      title: 'Rimozione & richieste',
      text: 'Cancelliamo contenuti e inviamo le richieste GDPR/CCPA.',
    },
    {
      title: 'Monitoraggio continuo',
      text: "Teniamo d'occhio nuove comparse e ti inviamo report.",
    },
  ]

  const pricing = [
    {
      title: 'Base',
      price: '99€/mese',
      features: [
        'Pulizia account principali',
        '1 richiesta GDPR',
        '1 mese di monitoraggio',
      ],
    },
    {
      title: 'Anonimato Totale',
      price: '299€/mese',
      features: [
        'Cancellazione social completa',
        'Opt-out dai data broker',
        '12 mesi di monitoraggio',
        'Alias email inclusi',
      ],
      highlight: true,
    },
    {
      title: 'Premium Personalizzato',
      price: 'Su richiesta',
      features: ['Piano legale su misura', 'Supporto 24/7', 'Report dedicati'],
    },
  ]

  const faqs = [
    {
      q: 'Quanto tempo serve per sparire dal web?',
      a: 'La maggior parte dei casi richiede 2-4 settimane per i servizi principali.',
    },
    {
      q: 'Potete garantire la rimozione totale?',
      a: 'Agiamo con tutti i mezzi legali, ma alcuni contenuti possono solo essere deindicizzati.',
    },
    {
      q: 'Come gestite le mie credenziali?',
      a: "Sono conservate cifrate e rimosse al termine dell'incarico.",
    },
    {
      q: 'Il servizio è legale?',
      a: 'Sì, operiamo nel rispetto del GDPR, CCPA e delle normative vigenti.',
    },
    {
      q: 'Posso delegarvi le richieste ufficiali?',
      a: 'Con una semplice delega firmata agiamo noi in tuo nome.',
    },
    {
      q: 'Cosa succede dopo la pulizia?',
      a: 'Puoi attivare il nostro monitoraggio continuo per restare al sicuro.',
    },
  ]

  return (
    <>
      <Navbar />
      <main>
        <section className="relative flex min-h-screen flex-col items-center justify-center text-center">
          <GradientMesh />
          <ParticlesCanvas />
          <h1 className="mb-4 text-5xl font-bold">NullaData</h1>
          <p className="mb-8 text-xl text-nd-muted">
            Riprenditi la tua vita digitale. Sparisci quando vuoi.
          </p>
          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="rounded bg-nd-primary px-6 py-3 text-black hover:bg-nd-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nd-ring"
            >
              Inizia ora
            </Link>
            <a
              href="#missione"
              className="rounded border border-nd-primary px-6 py-3 hover:bg-nd-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nd-ring"
            >
              Scopri di più
            </a>
          </div>
          <DataStreamSVG />
        </section>

        <section id="missione" className="mx-auto max-w-6xl py-20">
          <SectionHeader title="La nostra missione" />
          <p className="mx-auto max-w-3xl text-center text-lg text-nd-muted">
            Aiutiamo le persone a riprendere il controllo della propria identità
            digitale, cancellando tracce indesiderate e tutelando la privacy con
            metodi legali ed etici.
          </p>
        </section>

        <section id="servizi" className="bg-nd-surface py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeader title="Cosa facciamo per te" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="rounded-lg bg-nd-bg p-6 text-center"
                >
                  <s.icon className="mx-auto mb-4 h-8 w-8 text-nd-primary" />
                  <h3 className="mb-2 font-semibold">{s.title}</h3>
                  <p className="text-sm text-nd-muted">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="target" className="mx-auto max-w-6xl py-20">
          <SectionHeader title="A chi ci rivolgiamo" />
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {targets.map((t) => (
              <div
                key={t}
                className="rounded bg-nd-surface p-4 text-center text-sm"
              >
                {t}
              </div>
            ))}
          </div>
        </section>

        <section id="come-funziona" className="bg-nd-surface py-20">
          <div className="mx-auto max-w-4xl">
            <SectionHeader title="Come funziona" />
            <StepTimeline steps={steps} />
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl py-20">
          <SectionHeader title="Scegli il piano giusto" />
          <div className="grid gap-6 md:grid-cols-3">
            {pricing.map((p) => (
              <PricingCard key={p.title} {...p} />
            ))}
          </div>
        </section>

        <section id="faq" className="bg-nd-surface py-20">
          <div className="mx-auto max-w-3xl">
            <SectionHeader title="FAQ" />
            <div className="space-y-4">
              {faqs.map((f) => (
                <FAQItem key={f.q} {...f} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 text-center">
          <p className="mb-6 text-xl">
            Riprenditi la tua vita digitale oggi stesso.
          </p>
          <Link
            href="/dashboard"
            className="rounded bg-nd-primary px-6 py-3 text-black hover:bg-nd-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nd-ring"
          >
            Inizia ora
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
