export default function getTemplate2Prompts(resumeLanguage, formData) {
  const {
    fullName,
    currentEmail,
    currentTechnologies,
    languages,
    projectsHistory,
    workHistory, //JSON format
  } = formData;

  const workArray = workHistory || []; //an array
  const projectArray = projectsHistory || []; //an array

  //👇🏻 loops through the items in the workArray and converts them to a string
  const remainderWorkText = () => {
    let stringText = "";
    for (let i = 0; i < workArray.length; i++) {
        stringText += `${workArray[i].name} as a ${workArray[i].position}.\n`;
    }
    return stringText;
  };
  const remainderProjectText = () => {
    let stringText = "";
    for (let i = 0; i < projectArray.length; i++) {
        stringText += `${projectArray[i].name} as a ${projectArray[i].position}.\n`;
    }
    return stringText;
  };

  const template1Prompts = {
    english: {
    //👇🏻 The experience description prompt
    prompt1: `
    You are an expert talent recluiter, with years of experience recluiting and hiring talent.
    Use the necessary keywords to get the atention of recluiters and stand out, but do not overuse them.
    (write in first person writing)

    I am writing a resume.
    My details are:
    - name: ${fullName}
    - I work with these technologies: ${currentTechnologies}
    
    Now I will give you a list of the companies I have worked for and my role. 
    Write three bullets points for each company to describe some of the experience I get from that work and enlighten my strengths. Make each bullet point be short, up to 25 words.
    Use the necessary keywords to get the atention of recluiters and stand out, but do not overuse them.
    (write in first person writing)

    ${remainderWorkText()}

    Give your response in a json format that can be translated to an javascript object.
    Ex. [{"name": "company 1", "position": "position 1", "achivementsAndResponsabilites": ["text 1", "text 2", "text 3"]},
    {"name": "company 2", "position": "position 2", "achivementsAndResponsabilites": ["text 1", "text 2", "text 3"]}]
    
    Avoid using any additional text, write only what I am asking for.
    Do not use introductory text like "Sure, here is the answer..." or "Of course, this is the response..."
    Be direct and go straight to the text I am asking for.

    Make sure you are using the correct json format to transform to javascript object.
    A common error is how the json ends. Make sure you are using the correct brackets and the end.
    The normal end usually is like this: "]}]"
    `,
    //👇🏻 The projects achievements prompt
    prompt2: `
    Now I will give you a list of the projects I have worked in and my role. 
    Write three bullets points for each project to describe some of the experience I get from that and enlighten my strengths. Make each bullet point be short, up to 25 words.
    
    ${remainderProjectText()}

    Give your response in a json format that can be translated to an javascript object.
    Ex. [{"name": "project 1", "position": "position 1", "achivementsAndResponsabilites": ["text 1", "text 2", "text 3"]},
    {"name": "project 2", "position": "position 2", "achivementsAndResponsabilites": ["text 1", "text 2", "text 3"]}]
    
    Avoid using any additional text, write only what I am asking for.
    Do not use introductory text like "Sure, here is the answer..." or "Of course, this is the response..."
    Be direct and go straight to the text I am asking for.

    Make sure you are using the correct json format to transform to javascript object.
    A common error is how the json ends. Make sure you are using the correct brackets and the end.
    The normal end usually is like this: "]}]"
    `,
    // the languages prompt
    prompt3: `
    Now I will give you a list of my languages.
    This is the list: ${languages}
    If they are in spanish, please translate them to english.
    Give your response separated by commas. Ex. "English, Spanish, French, German"
    Avoid using any additional text, write only what I am asking for.
    Do not use introductory text like "Sure, here is the answer..." or "Of course, this is the response..."
    Be direct and go straight to the text I am asking for.
    `,
    //👇🏻 The technologies prompt
    prompt4: `
    Now I will give you a list of technologies.
    This is the list: ${currentTechnologies}
    Make sure they are in the next format, if not please change them.
    This is the format: "JavaScript, HTML, CSS"
    Give your response separated by commas. Ex. "JavaScript, HTML, CSS"
    Avoid using any additional text, write only what I am asking for.
    Do not use introductory text like "Sure, here is the answer..." or "Of course, this is the response..."
    Be direct and go straight to the text I am asking for.
    `
    },
    spanish: {
      //👇🏻 Descripción de la experiencia
      prompt1: `
      Eres un reclutador de talento experto, con años de experiencia reclutando y contratando talento.
      Usa las palabras clave necesarias para llamar la atención de los reclutadores y destacarte, pero no las sobreutilices.
      (escribe en primera persona)
      Estoy escribiendo un currículum.

      Mis detalles son:
      - nombre: ${fullName}
      - Trabajo con estas tecnologías: ${currentTechnologies}

      Ahora te daré una lista de las empresas para las que he trabajado y mi rol. 
      Escribe tres puntos para cada empresa para describir parte de la experiencia que obtuve de ese trabajo e iluminar mis fortalezas. Haz que cada punto sea corto, hasta 25 palabras.
      Usa las palabras clave necesarias para llamar la atención de los reclutadores y destacarte, pero no las sobreutilices.
      (escribe en primera persona)

      ${remainderWorkText()}

      Da tu respuesta en un formato json que se pueda traducir a un objeto javascript.
      Ej. [{"name": "empresa 1", "position": "puesto 1", "achivementsAndResponsabilites": ["texto 1", "texto 2", "texto 3"]},
      {"name": "empresa 2", "position": "puesto 2", "achivementsAndResponsabilites": ["texto 1", "texto 2", "texto 3"]}]

      Evita usar cualquier texto adicional, escribe solo lo que estoy pidiendo.
      No uses texto introductorio como "Claro, aquí está la respuesta..." o "Por supuesto, esta es la respuesta..."
      Sé directo y ve directamente al texto que estoy pidiendo.

      Asegúrate de usar el formato json correcto para transformar a objeto javascript.
      Un error común es cómo termina el json. Asegúrate de usar los corchetes correctos al final.
      El final normal suele ser así: "]}]"

      Asegura que el contenido este en español
      `,
      //👇🏻 Logros de proyectos
      prompt2: `
      Ahora te daré una lista de los proyectos en los que he trabajado y mi rol. 
      Escribe tres puntos para cada proyecto para describir parte de la experiencia que obtuve de eso e iluminar mis fortalezas. Haz que cada punto sea corto, hasta 25 palabras.

      ${remainderProjectText()}

      Da tu respuesta en un formato json que se pueda traducir a un objeto javascript.
      Ej. [{"name": "proyecto 1", "position": "puesto 1", "achivementsAndResponsabilites": ["texto 1", "texto 2", "texto 3"]},
      {"name": "proyecto 2", "position": "puesto 2", "achivementsAndResponsabilites": ["texto 1", "texto 2", "texto 3"]}]

      Evita usar cualquier texto adicional, escribe solo lo que estoy pidiendo.
      No uses texto introductorio como "Claro, aquí está la respuesta..." o "Por supuesto, esta es la respuesta..."
      Sé directo y ve directamente al texto que estoy pidiendo.

      Asegúrate de usar el formato json correcto para transformar a objeto javascript.
      Un error común es cómo termina el json. Asegúrate de usar los corchetes correctos al final.
      El final normal suele ser así: "]}]"

      Asegura que el contenido este en español
      `,
      // Lista de idiomas
      prompt3: `
      Ahora te daré una lista de mis idiomas.
      Esta es la lista: ${languages}
      Si están en inglés, por favor tradúcelos al español.
      Da tu respuesta separada por comas. Ej. "Inglés, Español, Francés, Alemán"
      Evita usar cualquier texto adicional, escribe solo lo que estoy pidiendo.
      No uses texto introductorio como "Claro, aquí está la respuesta..." o "Por supuesto, esta es la respuesta..."
      Sé directo y ve directamente al texto que estoy pidiendo.
      `,
      //👇🏻 Lista de tecnologías
      prompt4: `
      Ahora te daré una lista de tecnologías.
      Esta es la lista: ${currentTechnologies}
      Asegúrate de que estén en el siguiente formato, si no, por favor cámbialos.
      Este es el formato: "JavaScript, HTML, CSS"
      Da tu respuesta separada por comas. Ej. "JavaScript, HTML, CSS"
      Evita usar cualquier texto adicional, escribe solo lo que estoy pidiendo.
      No uses texto introductorio como "Claro, aquí está la respuesta..." o "Por supuesto, esta es la respuesta..."
      Sé directo y ve directamente al texto que estoy pidiendo.
      `
    }
  }

  if (resumeLanguage === "english") {
    return template1Prompts.english
  } else if (resumeLanguage === "spanish") {
    return template1Prompts.spanish
  }
}