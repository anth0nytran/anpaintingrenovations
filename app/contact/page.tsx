import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | Free Painting & Renovation Quotes Houston',
  description: 'Request a free estimate for your painting or renovation project in Houston. Fast response, written proposals, and no-obligation consultations. Call (832) 267-6657.',
};

export default function ContactPage() {
  return <ContactClient />;
}
