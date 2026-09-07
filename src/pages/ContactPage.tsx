import { useState } from 'react';
import { Mail, MessageSquare, ChevronDown, Send, Twitter, Instagram, Youtube } from 'lucide-react';
import { faqs } from '../data/contact';
import { Reveal } from '../components/Reveal';

export function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="page-enter pt-20 pb-20 px-4 md:px-6 max-w-[1000px] mx-auto">
      <Reveal>
        <div className="mb-8">
          <span className="f1-tag mb-3">Get in Touch</span>
          <h1 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight mt-2">Contact</h1>
          <p className="mt-3 text-f1-silver max-w-2xl">Questions, feedback, or just want to talk F1? Drop us a message.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <Reveal>
          <div className="f1-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <Send size={18} className="text-f1-red" />
              <h2 className="font-display font-bold text-sm uppercase tracking-wider">Send a Message</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="First Name" required className="f1-input" />
                <input type="text" placeholder="Last Name" required className="f1-input" />
              </div>
              <input type="email" placeholder="Email Address" required className="f1-input w-full" />
              <textarea placeholder="Your Message" rows={5} required className="f1-input w-full resize-none" />
              <button type="submit" className="btn-f1 w-full py-3 text-sm">{sent ? 'Message Sent!' : 'Send Message'}</button>
            </form>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="space-y-4">
            <div className="f1-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <Mail size={16} className="text-f1-red" />
                <h3 className="font-display font-bold text-xs uppercase tracking-wider">Email</h3>
              </div>
              <p className="text-sm text-f1-silver">chaitanyamanda2428@gmail.com</p>
               <p className="text-sm text-f1-silver">chaitanyamanda2824@gmail.com</p>
            </div>
            <div className="f1-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={16} className="text-f1-red" />
                <h3 className="font-display font-bold text-xs uppercase tracking-wider">Social</h3>
              </div>
              <div className="flex gap-2">
                {[<Twitter size={16} />, <Instagram size={16} />, <Youtube size={16} />].map((icon, i) => (
                  <button key={i} className="w-10 h-10 bg-f1-grey flex items-center justify-center hover:bg-f1-red hover:text-white transition-colors">{icon}</button>
                ))}
              </div>
            </div>
            <div className="f1-card p-5">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-f1-red mb-3">FAQ</h3>
              <div className="space-y-1">
                {faqs.map((f, i) => (
                  <div key={i} className="border-b border-white/5 last:border-0">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-3 text-left">
                      <span className="font-display font-bold text-sm">{f.question}</span>
                      <ChevronDown size={16} className={`text-f1-red shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === i && <p className="pb-3 text-xs text-f1-silver leading-relaxed">{f.answer}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
