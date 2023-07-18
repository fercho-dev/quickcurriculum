import getTemplate1Prompts from './template1Prompts';
import getTemplate2Prompts from './template2Prompts';

export default function getPrompts(resumeLanguage, formData, template='template1') {
  switch (template) {
    case 'template1':
      return getTemplate1Prompts(resumeLanguage, formData);
    case 'template2':
      return getTemplate2Prompts(resumeLanguage, formData);
    default:
      break
  }
}