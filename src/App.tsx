import { useEffect, useState, FormEvent, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Menu, X, Download, FolderGit2, Github, Linkedin, Mail, Phone, MapPin, ArrowUp, Award, GraduationCap, Users, Send, CheckCircle2 } from 'lucide-react'
import { profile, typed, skills, level, projects, education, certs, achievements } from './data'

const nav = ['About', 'Skills', 'Projects', 'Education', 'Achievements', 'Experience', 'Contact']

function Section({ id, title, sub, children }: { id: string; title: string; sub?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-24">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }}>
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500">{sub}</p>
        <h2 className="mb-10 mt-2 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">{title}</h2>
        {children}
      </motion.div>
    </section>
  )
}

function Typing() {
  const [i, setI] = useState(0), [n, setN] = useState(0), [del, setDel] = useState(false)
  useEffect(() => {
    const w = typed[i]
    const t = setTimeout(() => {
      if (!del && n < w.length) setN(n + 1)
      else if (!del) setDel(true)
      else if (n > 0) setN(n - 1)
      else { setDel(false); setI((i + 1) % typed.length) }
    }, del ? 40 : n === w.length ? 1200 : 80)
    return () => clearTimeout(t)
  }, [n, del, i])
  return <span className="grad">{typed[i].slice(0, n)}<span className="animate-pulse">|</span></span>
}

function ContactForm() {
  const [f, setF] = useState({ name: '', email: '', message: '' })
  const [err, setErr] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const x: Record<string, string> = {}
    if (f.name.trim().length < 2) x.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) x.email = 'Please enter a valid email.'
    if (f.message.trim().length < 10) x.message = 'Message must be at least 10 characters.'
    setErr(x)
    if (Object.keys(x).length) return
    const body = `${f.message}\n\nFrom: ${f.name} (${f.email})`
    window.location.href = `mailto:${profile.emails[0]}?subject=${encodeURIComponent('Portfolio enquiry from ' + f.name)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }
  const cls = 'w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-indigo-500 dark:border-white/10'
  return (
    <form onSubmit={submit} noValidate className="glass space-y-4 p-6">
      {(['name', 'email'] as const).map(k => (
        <div key={k}>
          <input aria-label={k} className={cls} placeholder={k === 'name' ? 'Your name' : 'Your email'} value={f[k]} onChange={e => setF({ ...f, [k]: e.target.value })} />
          {err[k] && <p className="mt-1 text-xs text-red-500">{err[k]}</p>}
        </div>
      ))}
      <div>
        <textarea aria-label="message" rows={5} className={cls} placeholder="Your message" value={f.message} onChange={e => setF({ ...f, message: e.target.value })} />
        {err.message && <p className="mt-1 text-xs text-red-500">{err.message}</p>}
      </div>
      <button className="btn bg-gradient-to-r from-blue-600 to-purple-600 text-white"><Send size={16} /> Send Message</button>
      {sent && <p className="flex items-center gap-2 text-sm text-green-500"><CheckCircle2 size={16} /> Opening your email app to send the message.</p>}
    </form>
  )
}

export default function App() {
  const [dark, setDark] = useState(true), [open, setOpen] = useState(false), [top, setTop] = useState(false)
  useEffect(() => { document.documentElement.classList.toggle('dark', dark) }, [dark])
  useEffect(() => {
    const on = () => setTop(window.scrollY > 500)
    window.addEventListener('scroll', on); return () => window.removeEventListener('scroll', on)
  }, [])
  const contacts = [
    { icon: Mail, label: profile.emails[0], href: `mailto:${profile.emails[0]}` },
    { icon: Mail, label: profile.emails[1], href: `mailto:${profile.emails[1]}` },
    { icon: Phone, label: profile.phone, href: 'tel:+919994615076' },
    { icon: Linkedin, label: 'LinkedIn', href: profile.linkedin },
    { icon: Github, label: 'GitHub', href: profile.github },
    { icon: MapPin, label: 'Coimbatore, Tamil Nadu (Kumaraguru College of Technology)', href: undefined },
  ]
  return (
    <div>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0a0f]/70">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#home" className="font-bold text-slate-900 dark:text-white">Nishanth<span className="grad">.</span></a>
          <nav className="hidden gap-7 text-sm lg:flex">
            {nav.map(n => <a key={n} href={`#${n.toLowerCase()}`} className="transition hover:text-indigo-500">{n}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <button aria-label="Toggle theme" onClick={() => setDark(!dark)} className="rounded-lg p-2 hover:bg-slate-500/10">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
            <button aria-label="Menu" onClick={() => setOpen(!open)} className="rounded-lg p-2 hover:bg-slate-500/10 lg:hidden">{open ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
        {open && <nav className="flex flex-col gap-4 border-t border-white/10 px-6 py-4 lg:hidden">{nav.map(n => <a key={n} onClick={() => setOpen(false)} href={`#${n.toLowerCase()}`}>{n}</a>)}</nav>}
      </header>

      <main>
        <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-16">
          <div className="pointer-events-none absolute -left-20 top-20 h-96 w-96 rounded-full bg-blue-600/25 blur-3xl" style={{ animation: 'float 12s ease-in-out infinite' }} />
          <div className="pointer-events-none absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-purple-600/25 blur-3xl" style={{ animation: 'float 15s ease-in-out infinite reverse' }} />
          <div className="relative mx-auto max-w-6xl">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 text-sm font-semibold uppercase tracking-widest text-indigo-500">Aspiring Software Developer / IT Engineer</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-7xl">
              Hi, I'm <span className="grad">Nishanth Sivakumar</span>
            </motion.h1>
            <p className="mt-5 text-xl md:text-2xl">Interested in <Typing /></p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 max-w-2xl text-lg leading-relaxed">
              B.Tech Information Technology student at Kumaraguru College of Technology, seeking software development opportunities, internships and placements where I can build innovative, efficient solutions.
            </motion.p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href={profile.resume} download className="btn bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"><Download size={16} /> Download Resume</a>
              <a href="#projects" className="btn glass"><FolderGit2 size={16} /> Explore My Projects</a>
            </div>
          </div>
        </section>

        <Section id="about" sub="About me" title="Driven to learn, build and lead">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="glass p-6 md:col-span-2">
              <p className="leading-relaxed">Driven by a strong desire to succeed, I seek a challenging career in the IT industry where I can leverage my technical and managerial skills to create innovative, efficient solutions. As a quick learner who excels in time management and teamwork, I am committed to continuous improvement and adaptability in dynamic environments to drive team and organizational success.</p>
              <p className="mt-4 leading-relaxed">I am pursuing B.Tech in Information Technology at Kumaraguru College of Technology, with a particular interest in <b>Web Development</b> and <b>Testing</b>.</p>
            </div>
            <div className="glass space-y-3 p-6 text-sm">
              <p><b>Education:</b> B.Tech IT, KCT</p>
              <p><b>CGPA:</b> 7.02 (till Sem 6)</p>
              <p><b>Interests:</b> Web Development, Testing</p>
              <p><b>Languages:</b> Tamil, English</p>
              <p><b>Goal:</b> Software roles, internships and placements</p>
            </div>
          </div>
        </Section>

        <Section id="skills" sub="Technical skills" title="What I work with">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skills.map(s => (
              <motion.div key={s.title} whileHover={{ y: -6 }} className="glass p-6">
                <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">{s.title}</h3>
                <div className="space-y-3">
                  {s.items.map(([name, lv]) => level[lv] ? (
                    <div key={name}>
                      <div className="mb-1 flex justify-between text-xs"><span>{name}</span><span className="text-indigo-400">{lv}</span></div>
                      <div className="h-1.5 rounded-full bg-slate-500/20"><motion.div initial={{ width: 0 }} whileInView={{ width: `${level[lv]}%` }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500" /></div>
                    </div>
                  ) : <span key={name} className="mb-2 mr-2 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs">{name}</span>)}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="projects" sub="Projects" title="Things I've built">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map(p => (
              <motion.article key={p.name} whileHover={{ y: -8 }} className="glass flex flex-col p-7">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{p.name}</h3>
                <p className="mt-3 text-sm leading-relaxed">{p.desc}</p>
                <ul className="mt-4 space-y-1 text-sm">{p.features.map(f => <li key={f} className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-indigo-500" />{f}</li>)}</ul>
                <div className="mt-5 flex flex-wrap gap-2">{p.tech.map(t => <span key={t} className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-400">{t}</span>)}</div>
                <a href={profile.github} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-500 hover:underline"><Github size={16} /> View on GitHub</a>
              </motion.article>
            ))}
          </div>
        </Section>

        <Section id="education" sub="Education" title="Academic journey">
          <ol className="relative space-y-8 border-l border-indigo-500/40 pl-8">
            {education.map(e => (
              <li key={e.title} className="relative">
                <span className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500"><GraduationCap size={12} className="text-white" /></span>
                <div className="glass p-5"><h3 className="font-semibold text-slate-900 dark:text-white">{e.title}</h3><p className="text-sm">{e.place}</p><p className="mt-1 text-sm text-indigo-400">{e.note}</p></div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="achievements" sub="Certifications & achievements" title="Recognition and learning">
          <div className="grid gap-6 md:grid-cols-2">
            {[['Certifications', certs], ['Accomplishments', achievements]].map(([t, list]) => (
              <div key={t as string} className="glass p-6">
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-900 dark:text-white"><Award size={18} className="text-indigo-500" />{t as string}</h3>
                <ul className="space-y-3 text-sm">{(list as string[]).map(c => <li key={c} className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-purple-400" />{c}</li>)}</ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="experience" sub="Experience" title="Roles & responsibilities">
          <div className="glass flex items-start gap-4 p-6">
            <Users className="mt-1 text-indigo-500" />
            <div><h3 className="font-semibold text-slate-900 dark:text-white">Active Member, Studio KCT of Kumaraguru</h3><p className="text-sm text-indigo-400">Present</p></div>
          </div>
        </Section>

        <Section id="contact" sub="Contact" title="Let's connect">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-3">
              {contacts.map(c => {
                const inner = <><c.icon size={18} className="shrink-0 text-indigo-500" /><span className="break-all text-sm">{c.label}</span></>
                return c.href
                  ? <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="glass flex items-center gap-3 p-4 transition hover:border-indigo-500/50">{inner}</a>
                  : <div key={c.label} className="glass flex items-center gap-3 p-4">{inner}</div>
              })}
            </div>
            <ContactForm />
          </div>
        </Section>
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-sm dark:border-white/10">© {new Date().getFullYear()} Nishanth Sivakumar. All rights reserved.</footer>
      {top && <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-3 text-white shadow-lg"><ArrowUp size={18} /></button>}
    </div>
  )
}
