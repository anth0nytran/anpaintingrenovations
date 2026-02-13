import { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'Services | A&N Painting and Renovations',
  description: 'Expert interior & exterior painting, kitchen & bath remodeling, and full home renovations in Houston. Licensed, insured, and 5-star rated. Get a free quote today.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
