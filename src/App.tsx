import { useState } from 'react'
import { ArrowRight, CalendarDays, Check, Clock3, Heart, Leaf, Mail, MapPin, Menu, MessageCircle, Phone, Users, X } from 'lucide-react'

const phone = '9136312571'
const waLink = `https://wa.me/91${phone}?text=Hello%20Aaditi%20Yogalaya%2C%20I%20would%20like%20to%20know%20more%20about%20your%20classes.`

const programs = [
  { icon: '🧘', title: 'Regular Yoga', text: 'Asanas, pranayama, meditation and Surya Namaskar for everyday strength and balance.' },
  { icon: '🌸', title: 'Prenatal Yoga', text: 'Gentle movement, breathing and relaxation practices for a supported pregnancy journey.' },
  { icon: '🤱', title: 'Postnatal Yoga', text: 'Mindful movement to help mothers restore energy, reconnect and feel supported.' },
  { icon: '✨', title: 'Personal Sessions', text: 'Individual online or in-person sessions shaped around your wellbeing goals.' },
]

const credentials = [
  'M.Sc. in Yoga — SVYASA University, Bangalore',
  'Certified Health Coach',
  'Pre & Post Natal Yoga & Garbha Sanskar Certification',
  'Meditation Master Certification',
  'Diploma in Yoga Therapy, Natural Living & Naturopathy',
]

export default function App() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return <>
    <header className="site-header">
      <a className="brand" href="#home" onClick={close}><span className="brand-mark">◈</span><span>AADITI<small>YOGALAYA</small></span></a>
      <button className="menu" aria-label="Open navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'open' : ''}>
        <a href="#about" onClick={close}>About</a><a href="#programs" onClick={close}>Programs</a><a href="#founder" onClick={close}>Founder</a><a href="#contact" onClick={close}>Contact</a>
        <a className="nav-wa" href={waLink} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp us</a>
      </nav>
    </header>
    <main id="home">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><Leaf /> Founded in 2018</p>
          <h1>Practice yoga.<br /><em>Transform your wellbeing.</em></h1>
          <p className="intro">Personalised online and in-person yoga sessions for a stronger body, calmer mind and more balanced life.</p>
          <div className="hero-actions"><a className="button primary" href={`tel:+91${phone}`}><Phone /> Call now</a><a className="button secondary" href={waLink} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a></div>
          <div className="stats"><span><b>8+</b> Years of experience</span><span><b>Online</b> & in-person</span><span><b>18–65</b> Years welcome</span></div>
        </div>
        <div className="hero-art" aria-label="Yoga and wellness illustration"><div className="sun"></div><div className="plant p1">❋</div><div className="plant p2">❋</div><div className="yogi"><div className="head"></div><div className="body"></div><div className="leg left"></div><div className="leg right"></div></div><p>breathe · move · be</p></div>
      </section>
      <section className="section programs" id="programs"><div className="section-heading"><p className="eyebrow"><Leaf /> Our offerings</p><h2>Yoga for every stage of life.</h2><p>Explore supportive classes designed around your unique wellness journey.</p></div><div className="program-grid">{programs.map(p => <article className="program-card" key={p.title}><span className="program-icon">{p.icon}</span><h3>{p.title}</h3><p>{p.text}</p><a href="#contact">Enquire now <ArrowRight /></a></article>)}</div></section>
      <section className="why" id="about"><h2>Why Aaditi Yogalaya?</h2><div className="why-grid"><span><Heart /> Personal attention</span><span><CalendarDays /> Established 2018</span><span><Leaf /> Holistic approach</span><span><Users /> Online & in-person</span><span><Check /> Individual & group sessions</span></div></section>
      <section className="section maternity"><div><p className="eyebrow">Pregnancy wellness</p><h2>Gentle support for motherhood.</h2><p>Our prenatal and postnatal sessions focus on mindful breathing, gentle asanas, relaxation and meditation in a nurturing, individualised setting.</p><ul><li>Pregnancy-friendly movement and breathing</li><li>Relaxation, meditation and Garbha Sanskar practices</li><li>Personal online and in-person sessions available</li></ul><a className="text-link" href={waLink} target="_blank" rel="noreferrer">Ask about prenatal yoga <ArrowRight /></a></div><div className="maternity-art"><span>🌿</span><div>motherhood<br /><em>with mindfulness</em></div></div></section>
      <section className="founder" id="founder"><div className="portrait-placeholder"><span>SB</span><p>Founder photo<br />coming soon</p></div><div><p className="eyebrow"><Leaf /> About the founder</p><h2>Salita Belose</h2><p className="role">Yoga Teacher · Yoga Therapist · Meditation Practitioner</p><p>Salita is dedicated to helping people build a healthier, more mindful relationship with their bodies through a warm and personalised yoga practice.</p><div className="credentials">{credentials.map(item => <p key={item}><Check /> {item}</p>)}</div></div></section>
      <section className="details"><div><Clock3 /><h3>Timings</h3><p>Morning batches<br />6:15 AM – 7:15 AM<br />8:00 AM – 9:00 AM</p></div><div><Users /><h3>Batch size</h3><p>Personal attention<br />Small group classes<br />Individual sessions</p></div><div><MapPin /><h3>Location</h3><p>Sector 20, Kopar Khairane<br />Navi Mumbai<br />+ online sessions</p></div><div><Heart /><h3>For you</h3><p>Adults & seniors welcome<br />Prenatal & postnatal yoga<br />Flexible options</p></div></section>
      <section className="contact" id="contact"><div><p className="eyebrow">Begin your journey</p><h2>Ready to feel more like yourself?</h2><p>Reach out to discuss a class that feels right for you.</p></div><div className="contact-actions"><a className="button primary" href={`tel:+91${phone}`}><Phone /> {phone}</a><a className="button secondary" href={waLink} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp us</a><a className="button ghost" href="mailto:salitabelose@gmail.com"><Mail /> Send email</a></div></section>
    </main>
    <footer><a className="brand" href="#home"><span className="brand-mark">◈</span><span>AADITI<small>YOGALAYA</small></span></a><p>Yoga · Wellness · Mindful living</p><p><MapPin /> Navi Mumbai & Online</p><a aria-label="Contact Aaditi Yogalaya" href="#contact"><Heart /></a></footer>
    <a className="mobile-wa" href={waLink} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a>
  </>
}
