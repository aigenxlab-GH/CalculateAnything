import type { Metadata } from 'next';
import { Mail, Clock, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the CalculateToday team — for feedback, calculator suggestions, bug reports, or affiliate / partnership enquiries.',
  alternates: { canonical: '/contact/' },
};

const topics = [
  {
    icon: MessageSquare,
    title: 'General Feedback',
    description: 'Suggestions, ideas, or comments about our calculators.',
    color: 'text-primary',
    bg: 'bg-primary/5',
  },
  {
    icon: Mail,
    title: 'Bug Reports',
    description: 'Found an incorrect result or a broken feature? Let us know.',
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
  {
    icon: Clock,
    title: 'Affiliate & Partnerships',
    description: "Interested in partnering with CalculateToday? We'd love to hear from you.",
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Contact Us</h1>
        <p className="text-slate-500 leading-relaxed">
          We&apos;d love to hear from you. Whether it&apos;s a calculator request, a bug, or a
          partnership enquiry — reach out and we&apos;ll get back to you.
        </p>
      </div>

      {/* Topics */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">What can we help with?</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {topics.map((t) => (
            <div key={t.title} className="p-5 rounded-xl border border-slate-100 bg-white">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${t.bg} mb-3`}>
                <t.icon className={`w-5 h-5 ${t.color}`} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">{t.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{t.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Email card */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Reach Us By Email</h2>
        <div className="flex items-start gap-4 p-6 rounded-2xl border border-slate-200 bg-slate-50">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 mb-1">Email</p>
            <a
              href="mailto:aigenxlab@gmail.com"
              className="text-primary hover:underline font-medium"
            >
              aigenxlab@gmail.com
            </a>
            <p className="text-sm text-slate-500 mt-1">
              We typically respond within 1–2 business days.
            </p>
          </div>
        </div>
      </section>

      {/* Response time note */}
      <section className="p-5 rounded-xl border border-slate-100 bg-white">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-semibold text-slate-700">Response Time</span>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed">
          CalculateToday is a lean independent project. We read every message and aim to reply
          within <strong>1–2 business days</strong>. For urgent matters, please include
          &ldquo;URGENT&rdquo; in your subject line.
        </p>
      </section>

    </div>
  );
}
