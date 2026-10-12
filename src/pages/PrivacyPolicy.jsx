import LegalDraft from './LegalDraft';
import { useClinicData } from '../lib/ClinicDataContext';

const sections = [
  { heading: 'Information that may be collected', content: '[Specify what the clinic collects, such as contact details, appointment information, and information shared during care. Identify any website analytics, cookies, or third-party tools actually used. Do not collect more than needed.]' },
  { heading: 'Why information is used', content: '[Explain the specific purposes, such as responding to enquiries, arranging and providing services, communicating with clients, maintaining records, and meeting applicable obligations. Confirm the lawful basis and local requirements with the reviewer.]' },
  { heading: 'Who may access information', content: '[Identify the clinic roles and service providers that may access information, the circumstances for access, and when information may be shared with another person or organisation. Explain how consent and any legal exceptions are handled.]' },
  { heading: 'Requests and questions', content: '[Describe how the clinic receives, verifies, tracks and responds to privacy requests or complaints, including who is responsible and any applicable response timelines. Contact: [privacy contact name or role].]' },
  { heading: 'Retention and security', content: '[Add the clinic’s approved retention periods or criteria for setting them, how records are securely stored, and how they are securely deleted or de-identified when no longer needed. Confirm applicable recordkeeping requirements.]' },
  { heading: 'Your information rights', content: '[Explain how a person may request access to or correction of their information, or request deletion where permitted. State how to submit a request, how identity is verified, and any legal or operational limits. Rights and procedures depend on applicable law.]' },
  { heading: 'Contact', content: '' },
];

export default function PrivacyPolicy() {
  const { settings } = useClinicData();
  const dynamicSections = sections.map((section) => section.heading === 'Contact'
    ? { ...section, content: `For a privacy question or request, contact ${settings.name} at ${settings.email} or ${settings.phone}. Replace these placeholders with verified clinic contact details before publication.` }
    : section);
  return <LegalDraft title="Privacy Policy" description="Draft information about how the clinic may collect, use, access, retain and respond to requests about personal information." sections={dynamicSections} />;
}