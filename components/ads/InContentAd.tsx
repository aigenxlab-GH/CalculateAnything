import { AdSlot } from './AdSlot';

interface Props {
  format?: 'auto' | 'rectangle' | 'horizontal';
  className?: string;
  variant?: 'content' | 'faq';
}

export function InContentAd({ format = 'auto', className = '', variant = 'content' }: Props) {
  const slot =
    variant === 'faq'
      ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_FAQ || '0000000000'
      : process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT || '0000000000';
  return <AdSlot slot={slot} format={format} className={className} />;
}
