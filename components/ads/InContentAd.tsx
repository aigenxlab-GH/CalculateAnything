import { AdSlot } from './AdSlot';

interface Props {
  format?: 'auto' | 'rectangle' | 'horizontal';
  className?: string;
}

export function InContentAd({ format = 'auto', className = '' }: Props) {
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT || '0000000000';
  return <AdSlot slot={slot} format={format} className={className} />;
}
