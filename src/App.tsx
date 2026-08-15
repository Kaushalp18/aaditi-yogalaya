import { useState, type FormEvent } from 'react'
import { ArrowRight, CalendarDays, Check, Clock3, Heart, Leaf, Mail, MapPin, Menu, MessageCircle, Phone, Star, Users, X } from 'lucide-react'

const phone = '9136312571'
const email = 'salitabelose@gmail.com'
const whatsapp = (message = '') => `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`

const programs = [
  { icon: '🧘', title: 'Regular Yoga', text: 'Asanas, pranayama, meditation and Surya Namaskar for everyday strength and balance.' },
  { icon: '🌸', title: 'Prenatal Yoga', text: 'Gentle movement, breathing and relaxation practices for a supported pregnancy journey.' },
  { icon: '🤱', title: 'Postnatal Yoga', text: 'Mindful movement to help mothers restore energy, reconnect and feel supported.' },
  { icon: '✨', title: 'Personal Sessions', text: 'Individual online or in-person sessions shaped around your wellbeing goals.' },
]

const credentials = [
  'Certified Health Coach — 2024', 'M.Sc. in Yoga, SVYASA University — 2021',
  'Pre & Post Natal Yoga & Garbha Sanskar Certification — 2022', 'Meditation Master Certification — 2021',
  'Yoga Instructor Course (YIC) — 2019', 'Diploma in Yoga Therapy, Natural Living & Naturopathy — 2018–19',
  'Diploma in Yogic Education — 2017–18',
]

export default function App() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const openWhatsApp = (message: string) => window.open(whatsapp(message), '_blank', 'noopener,noreferrer')
  const enquiryMessage = (form: HTMLFormElement) => { const d = new FormData(form); return `New class enquiry from Aaditi Yogalaya website\n\nName: ${d.get('name')}\nPhone: ${d.get('phone')}\nInterested in: ${d.get('program')}\nPreference: ${d.get('mode')}\nMessage: ${d.get('message') || 'Not provided'}` }
  const reviewMessage = (form: HTMLFormElement) => { const d = new FormData(form); return `New student review for Aaditi Yogalaya\n\nName: ${d.get('reviewer')}\nRating: ${d.get('rating')} / 5\nReview: ${d.get('review')}` }
  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); openWhatsApp(enquiryMessage(event.currentTarget)) }
  const submitReview = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); openWhatsApp(reviewMessage(event.currentTarget)) }

  return <>
    <header className="site-header">
      <a className="brand" href="#home" onClick={close}><span className="brand-mark">◈</span><span>AADITI<small>YOGALAYA</small></span></a>
      <button className="menu" aria-label="Open navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'open' : ''}>
        <a href="#about" onClick={close}>About</a><a href="#programs" onClick={close}>Programs</a><a href="#founder" onClick={close}>Founder</a><a href="#enquire" onClick={close}>Enquire</a><a href="#contact" onClick={close}>Contact</a>
        <a className="nav-wa" href={whatsapp('Hello Aaditi Yogalaya, I would like to know more about your classes.')} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp us</a>
      </nav>
    </header>
    <main id="home">
      <section className="hero"><div className="hero-copy"><p className="eyebrow"><Leaf /> Founded in 2018</p><h1>Practice yoga.<br /><em>Transform your wellbeing.</em></h1><p className="intro">Personalised online and in-person yoga sessions for a stronger body, calmer mind and more balanced life.</p><div className="hero-actions"><a className="button primary" href={`tel:+91${phone}`}><Phone /> Call now</a><a className="button secondary" href={whatsapp('Hello Aaditi Yogalaya, I would like to know more about your classes.')} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a></div><div className="stats"><span><b>8+</b> Years of experience</span><span><b>Online</b> & in-person</span><span><b>18–65</b> Years welcome</span></div></div><div className="hero-art" aria-label="Yoga and wellness illustration"><div className="sun"></div><div className="plant p1">❋</div><div className="plant p2">❋</div><div className="yogi"><div className="head"></div><div className="body"></div><div className="leg left"></div><div className="leg right"></div></div><p>breathe · move · be</p></div></section>
      <section className="section programs" id="programs"><div className="section-heading"><p className="eyebrow"><Leaf /> Our offerings</p><h2>Yoga for every stage of life.</h2><p>Explore supportive classes designed around your unique wellness journey.</p></div><div className="program-grid">{programs.map(p => <article className="program-card" key={p.title}><span className="program-icon">{p.icon}</span><h3>{p.title}</h3><p>{p.text}</p><a href="#enquire">Enquire now <ArrowRight /></a></article>)}</div></section>
      <section className="why" id="about"><h2>Why Aaditi Yogalaya?</h2><div className="why-grid"><span><Heart /> Personal attention</span><span><CalendarDays /> Established 2018</span><span><Leaf /> Holistic approach</span><span><Users /> Online & in-person</span><span><Check /> Individual & group sessions</span></div></section>
      <section className="section maternity"><div><p className="eyebrow">Pregnancy wellness</p><h2>Gentle support for motherhood.</h2><p>Our prenatal and postnatal sessions focus on mindful breathing, gentle asanas, relaxation and meditation in a nurturing, individualised setting.</p><ul><li>Pregnancy-friendly movement and breathing</li><li>Relaxation, meditation and Garbha Sanskar practices</li><li>Personal online and in-person sessions available</li></ul><a className="text-link" href="#enquire">Ask about prenatal yoga <ArrowRight /></a></div><div className="maternity-art"><span>🌿</span><div>motherhood<br /><em>with mindfulness</em></div></div></section>
      <section className="founder" id="founder"><div className="portrait-placeholder"><span>SB</span><p>Founder photo<br />coming soon</p></div><div><p className="eyebrow"><Leaf /> About the founder</p><h2>Salitaa Belose</h2><p className="role">Yoga Teacher · Yoga Therapist · Meditation Practitioner</p><p>Salitaa is dedicated to helping people build a healthier, more mindful relationship with their bodies through a warm and personalised yoga practice.</p><h3 className="qualification-title">Qualifications & certifications</h3><div className="credentials">{credentials.map(item => <p key={item}><Check /> {item}</p>)}</div></div></section>
      <section className="details"><div><Clock3 /><h3>Timings</h3><p>Morning batches<br />6:15 AM – 7:15 AM<br />8:00 AM – 9:00 AM</p></div><div><Users /><h3>Batch size</h3><p>Personal attention<br />Small group classes<br />Individual sessions</p></div><div><MapPin /><h3>Location</h3><p>Sector 20, Kopar Khairane<br />Navi Mumbai<br />+ online sessions</p></div><div><Heart /><h3>For you</h3><p>Adults & seniors welcome<br />Prenatal & postnatal yoga<br />Flexible options</p></div></section>
      <section className="forms-section" id="enquire"><div className="section-heading"><p className="eyebrow"><Leaf /> Get in touch</p><h2>Let’s begin your yoga journey.</h2><p>Complete the form and WhatsApp will open with your message ready to send.</p></div><div className="forms-grid"><form className="contact-form" onSubmit={submitEnquiry}><h3>Enquire about a class</h3><label>Name<input name="name" required placeholder="Your full name" /></label><label>Phone number<input name="phone" required type="tel" inputMode="tel" placeholder="Your contact number" /></label><label>Interested in<select name="program" defaultValue="Regular Yoga"><option>Regular Yoga</option><option>Prenatal Yoga + Garbha Sanskar</option><option>Postnatal Yoga</option><option>Personal Sessions</option></select></label><label>Preferred format<select name="mode" defaultValue="Online"><option>Online</option><option>In-person, Navi Mumbai</option><option>Either is fine</option></select></label><label>Message <span>(optional)</span><textarea name="message" rows={3} placeholder="Tell us what you are looking for" /></label><div className="form-actions"><button className="button secondary" type="submit"><MessageCircle /> Send on WhatsApp</button></div></form><form className="contact-form review-form" onSubmit={submitReview}><h3>Share your experience</h3><p>Your review is sent privately to Aaditi Yogalaya for approval before it is published.</p><label>Name<input name="reviewer" required placeholder="Your name" /></label><label>Rating<select name="rating" defaultValue="5"><option value="5">★★★★★ — Excellent</option><option value="4">★★★★☆ — Very good</option><option value="3">★★★☆☆ — Good</option><option value="2">★★☆☆☆ — Fair</option><option value="1">★☆☆☆☆ — Poor</option></select></label><label>Your review<textarea name="review" required rows={5} placeholder="Tell us about your experience" /></label><div className="form-actions"><button className="button primary" type="submit"><Star /> Send review on WhatsApp</button></div></form></div></section>
      <section className="contact" id="contact"><div><p className="eyebrow">Begin your journey</p><h2>Ready to feel more like yourself?</h2><p>Reach out to discuss a class that feels right for you.</p><p className="contact-email">Email: <a href={`mailto:${email}`}>{email}</a></p></div><div className="contact-actions"><a className="button primary" href={`tel:+91${phone}`}><Phone /> {phone}</a><a className="button secondary" href={whatsapp('Hello Aaditi Yogalaya, I would like to know more about your classes.')} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp us</a><a className="button ghost" href={`mailto:${email}`}><Mail /> Email us</a></div></section>
    </main>
    <footer><a className="brand" href="#home"><span className="brand-mark">◈</span><span>AADITI<small>YOGALAYA</small></span></a><p>Yoga · Wellness · Mindful living</p><p><MapPin /> Navi Mumbai & Online</p></footer>
    <a className="mobile-wa" href={whatsapp('Hello Aaditi Yogalaya, I would like to know more about your classes.')} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a>
  </>
}
