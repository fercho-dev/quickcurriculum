import getTemplate1Prompts from './template1Prompts';

export default function getPrompts(resumeLanguage, formData, template='template1') {
  switch (template) {
    case 'template1':
      return getTemplate1Prompts(resumeLanguage, formData);
    default:
      break
  }
}