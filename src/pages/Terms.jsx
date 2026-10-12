import LegalDraft from './LegalDraft';
import { useClinicData } from '../lib/ClinicDataContext';

const sections = [
  { heading: 'About this website and its information', content: '[Explain the website’s purpose, who operates it, and that service descriptions are general information rather than individual advice. Confirm that all published service information is accurate and approved.]' },
  { heading: 'Information collected and its purpose', content: '[Specify information collected through website use, enquiries or appointment requests, including any technical data or third-party tools. Explain why each category is used and link to the clinic’s approved privacy practices.]' },
  { heading: 'Access and sharing', content: '[Identify which clinic roles and service providers can access information and in what circumstances it may be shared. Explain how consent and applicable legal requirements are handled.]' },
  { heading: 'Enquiries and requests', content: '[Explain how website, appointment, access, correction or deletion requests are received and handled, who is responsible, and any applicable response timelines. An online or messaging enquiry is not an appointment confirmation.]' },
  { heading: 'Records and retention', content: '[State how long enquiry, website and service records are kept or the criteria used to decide. Explain secure storage and disposal, and confirm applicable recordkeeping requirements.]' },
  { heading: 'Access, correction and deletion', content: '[Describe how a person can request access to or correction of their personal information, or ask for deletion where permitted. Include verification steps, contact details and any limits under applicable law.]' },
  { heading: 'Changes and contact', content: '[Explain how updates to these terms will be communicated and when they take effect. Add verified clinic contact details.]' },
];

export default function Terms() {
  const { settings } = useClinicData();
  const dynamicSections = sections.map((section) => section.heading === 'Changes and contact'
    ? { ...section, content: `Explain how updates to these terms will be communicated and when they take effect. Questions or requests may be directed to ${settings.name} at ${settings.email} or ${settings.phone}. Confirm these details before publication.` }
    : section);
  return <LegalDraft title="Terms of Use" description="Draft terms for using this website and contacting the clinic. Review and complete all bracketed content before publication." sections={dynamicSections} />;
}