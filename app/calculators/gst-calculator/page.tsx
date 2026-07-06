import type { Metadata } from 'next';
import { Receipt, FileText } from 'lucide-react';
import { GSTCalculator } from '@/components/calculators/GSTCalculator';
import { CalculatorBreadcrumb } from '@/components/CalculatorBreadcrumb';
import { CalculatorByline } from '@/components/CalculatorByline';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/lib/calculators-registry';
import { JsonLd } from '@/components/JsonLd';
import { NewsletterCapture } from '@/components/NewsletterCapture';
import { RelatedGuides } from '@/components/RelatedGuides';
import { InContentAd } from '@/components/ads/InContentAd';

export const metadata: Metadata = {
  title: 'GST Calculator: Add or Remove GST Instantly — All Rates',
  description:
    'Free GST calculator India — ₹10,000 + 18% GST = ₹11,800 (₹900 CGST + ₹900 SGST). Add or remove 5%, 12%, 18%, 28% GST with instant CGST/SGST breakup. No sign-up.',
  keywords: ['GST calculator', 'GST calculator India', 'reverse GST calculator', 'CGST SGST calculator', 'remove GST'],
  alternates: { canonical: '/calculators/gst-calculator/' },
};

const faqs = [
  {
    q: 'What is GST?',
    a: 'GST (Goods and Services Tax) is a unified indirect tax levied on the supply of goods and services in India. It replaced multiple cascading taxes and came into effect on July 1, 2017.',
  },
  {
    q: 'What are the GST slab rates in India?',
    a: 'GST in India has four main tax slabs: 5% (essential goods, transport), 12% (basic goods, processed food), 18% (most services, electronics), and 28% (luxury goods, automobiles, tobacco).',
  },
  {
    q: 'What is the difference between CGST and SGST?',
    a: 'For intra-state transactions, GST is split equally between Central GST (CGST) collected by the central government and State GST (SGST) collected by the state. For inter-state transactions, Integrated GST (IGST) applies.',
  },
  {
    q: 'How do I remove GST from a price?',
    a: 'To remove GST from a GST-inclusive price, use the formula: Pre-GST Price = (GST-inclusive Price × 100) ÷ (100 + GST Rate). Our calculator handles this automatically using the "Remove GST" mode.',
  },
  { q: 'Which services attract 18% GST in India?', a: 'Services taxed at 18%: IT services, consulting, banking and financial services, legal services, advertising, event management, AC restaurants, most telecom services, and general insurance. The 18% slab is the most common for B2B services. Basic healthcare, education, and essential food items are exempt or at lower rates. Always verify the SAC code for your specific service category.' },
  { q: 'What is Reverse Charge Mechanism (RCM) under GST?', a: 'Under RCM, the recipient of goods or services pays GST to the government instead of the supplier collecting and remitting it. Common RCM scenarios: GTA (Goods Transport Agency) services, advocate services, director fees, sponsorship to body corporate, and import of services. If your business receives RCM-liable services, you must pay the applicable GST even if the supplier does not charge it.' },
  { q: 'Who is eligible for the GST Composition Scheme?', a: 'Businesses with annual turnover below Rs 1.5 crore (Rs 75L for special category states) can opt for the Composition Scheme. Benefits: pay fixed GST at 1-6% of turnover, simpler quarterly filing. Restrictions: cannot charge GST to customers, cannot claim input tax credit, cannot make inter-state supplies. Suitable for small retailers and manufacturers with mainly B2C sales.' },
  { q: 'How is input tax credit calculated when you have both exempt and taxable supplies?', a: 'ITC = Total ITC x (Taxable Turnover divided by Total Turnover). This is the proportionate ITC rule under GST Rule 42. Example: 80% taxable sales and 20% exempt means you can claim 80% of common input credit. GST software like ClearTax and Zoho Books handles this apportionment calculation automatically.' },
];

const related = calculators.filter((c) => ['profit-margin', 'break-even', 'working-capital'].includes(c.id));

export default function GSTCalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-2 pb-8">
      <CalculatorBreadcrumb name="GST Calculator" slug="gst-calculator" />

      <CalculatorByline slug="gst-calculator" />
      {/* Title */}
      <div className="mb-3">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <Receipt className="w-4 h-4 text-green-600" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">GST Calculator</h1>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm leading-snug max-w-2xl">
          Add GST to a price or remove GST from a GST-inclusive amount. Instantly see the CGST and
          SGST breakdown for any GST slab rate — 5%, 12%, 18%, or 28%.
        </p>
      </div>
      {/* Calculator */}
      <GSTCalculator />

      <InContentAd format="rectangle" className="my-6" />

      {/* GST slab table with common items */}
      <section className="mb-6 bg-white rounded-xl border border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-1">GST Slab Rates in India — What Falls Under Each Rate</h2>
        <p className="text-xs text-slate-500 mb-3">
          GST has four main slabs plus exempt and special categories. Knowing your item&apos;s slab is the first step to calculating GST correctly — the table below covers the most common goods and services in each category.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[480px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="px-3 py-2 text-left border border-slate-100">GST Rate</th>
                <th className="px-3 py-2 text-left border border-slate-100">Common Goods</th>
                <th className="px-3 py-2 text-left border border-slate-100">Common Services</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['0% (Exempt)', 'Fresh fruits/vegetables, milk, eggs, bread, books, salt', 'Healthcare, education, agricultural services'],
                ['5%', 'Packaged food, tea, coffee, edible oil, coal, medicines, footwear under ₹1,000', 'Rail travel, economy air travel, restaurants (non-AC), transport'],
                ['12%', 'Butter, ghee, processed food, mobile phones, umbrellas', 'Business-class air travel, hotels ₹1,001–7,500/night, works contracts'],
                ['18%', 'Electronics, capital goods, soaps, toothpaste, pasta, ice cream', 'IT services, telecom, banking, insurance, AC restaurants, consulting'],
                ['28%', 'Cars, motorcycles, ACs, refrigerators, cement, tobacco, aerated drinks', 'Casinos, betting, race clubs, 5-star hotels above ₹7,500/night'],
              ].map(([rate, goods, services]) => (
                <tr key={rate} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-3 py-2 border border-slate-100 font-bold text-green-700">{rate}</td>
                  <td className="px-3 py-2 border border-slate-100">{goods}</td>
                  <td className="px-3 py-2 border border-slate-100">{services}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">Rates are indicative — always verify the HSN/SAC code for your specific item. Gold attracts a special 3% rate; petroleum products and alcohol remain outside GST.</p>
      </section>

      {/* Add vs Remove GST worked example */}
      <section className="mb-6 bg-green-50 border border-green-200 rounded-xl p-5">
        <h2 className="text-base font-bold text-green-900 mb-2">Add GST vs Remove GST — Worked Examples on ₹10,000</h2>
        <p className="text-sm text-slate-700 mb-3">The two most common GST calculations: adding GST to a base price (for invoicing) and extracting GST from an inclusive price (for expense claims and ITC).</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[480px]">
            <thead>
              <tr className="bg-green-100 text-green-900">
                <th className="px-3 py-2 text-left border border-green-200">Rate</th>
                <th className="px-3 py-2 text-left border border-green-200">Add GST: ₹10,000 + GST</th>
                <th className="px-3 py-2 text-left border border-green-200">CGST + SGST Split</th>
                <th className="px-3 py-2 text-left border border-green-200">Remove GST: ₹10,000 incl.</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {[
                ['5%',  '₹10,500', '₹250 + ₹250', 'Base ₹9,524 + GST ₹476'],
                ['12%', '₹11,200', '₹600 + ₹600', 'Base ₹8,929 + GST ₹1,071'],
                ['18%', '₹11,800', '₹900 + ₹900', 'Base ₹8,475 + GST ₹1,525'],
                ['28%', '₹12,800', '₹1,400 + ₹1,400', 'Base ₹7,813 + GST ₹2,188'],
              ].map(([rate, add, split, remove]) => (
                <tr key={rate} className="border-b border-green-100 hover:bg-green-50">
                  <td className="px-3 py-2 border border-green-100 font-bold">{rate}</td>
                  <td className="px-3 py-2 border border-green-100 font-semibold text-green-700">{add}</td>
                  <td className="px-3 py-2 border border-green-100">{split}</td>
                  <td className="px-3 py-2 border border-green-100">{remove}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-2">Formula to remove GST: Base price = Inclusive price × 100 ÷ (100 + rate). A common mistake is subtracting 18% from the inclusive price — that over-removes GST. On ₹10,000 inclusive at 18%, the GST portion is ₹1,525, not ₹1,800.</p>
      </section>

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'GST Calculator India',
        url: 'https://calculate-today.com/calculators/gst-calculator/',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        description: 'GST calculator India — add or remove GST and get CGST, SGST breakdown for all slab rates.',
      }} />
      {/* FAQ */}
      <InContentAd format="horizontal" className="mb-6" variant="faq" />

      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="bg-white rounded-xl border border-slate-100 p-5">
              <h3 className="font-semibold text-slate-800 mb-2">{faq.q}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">How to Use This GST Calculator</h2>
        <ol className="space-y-3">
          {[
            'Select "Add GST" to calculate GST on an exclusive price, or "Remove GST" to extract GST from an inclusive price.',
            'Enter the amount in the input field.',
            'Select the applicable GST rate: 5%, 12%, 18%, or 28%.',
            'Instantly see the GST amount, CGST, SGST, and the final price.',
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* Related */}
      <RelatedGuides calculatorId="gst-calculator" />
      <NewsletterCapture />
      <section className="mt-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Related Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {related.map((calc) => (
            <CalculatorCard key={calc.id} calculator={calc} />
          ))}
        </div>
      </section>
      </div>
  );
}
