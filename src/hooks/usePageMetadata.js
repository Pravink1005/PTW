import { useEffect } from 'react';
import { useClinicData } from '../lib/ClinicDataContext';

function setMetaTag(selector, attrName, attrValue, content) {
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrName, attrValue);
    document.head.append(tag);
  }
  tag.content = content;
}

export default function usePageMetadata(title, description) {
  const { settings } = useClinicData();
  useEffect(() => {
    const fullTitle = `${title} | ${settings.name}`;
    document.title = fullTitle;

    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
  }, [title, description, settings.name]);
}
