import { useEffect } from 'react';
import { useClinicData } from '../lib/ClinicDataContext';

export default function usePageMetadata(title, description) {
  const { settings } = useClinicData();
  useEffect(() => {
    document.title = `${title} | ${settings.name}`;
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.name = 'description';
      document.head.append(descriptionTag);
    }
    descriptionTag.content = description;
  }, [title, description, settings.name]);
}