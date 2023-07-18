
export default function getTemplate1Prompts(resumeLanguage, formData) {
  const {
    fullName,
    currentPosition,
    yearsOfExperience,
    currentTechnologies,
    softSkills,
    languages,
    workHistory, //JSON format
  } = formData;

  const workArray = workHistory || []; //an array

  //👇🏻 loops through the items in the workArray and converts them to a string
  const remainderText = () => {
    let stringText = "";
    for (let i = 0; i < workArray.length; i++) {
        stringText += `${workArray[i].name} as a ${workArray[i].position}.\n`;
    }
    return stringText;
  };

  const template1Prompts = {
    english: {
    //👇🏻 The job description prompt
    prompt1: `
    You are an expert talent recluiter, with years of experience recluiting and hiring talent.

    I am writing a resume.
    My details are:
    - name: ${fullName}
    - role: ${currentPosition} (${yearsOfExperience} years) 
    - I work with these technologies: ${currentTechnologies}
    - My soft skills are: ${softSkills}
    
    Write a short description, maximum 75 words, for the top of the resume.
    Use the necessary keywords to get the atention of recluiters and stand out, but do not overuse them.
    (write in first person writing)

    Do not use again the information I have already given you. That will be redundant.
    
    Avoid using any additional text, write only what I am asking for.
    Do not use introductory text like "Sure, here is the answer..." or "Of course, this is the response..."
    Be direct and go straight to the text I am asking for.
    `,
    //👇🏻 The job achievements prompt
    prompt2: `
    Now I will give you a list of the companies I have worked for and my role. 
    Write three bullets points for each company to describe some of the experience I get from that work and enlighten my strengths. Make each bullet point be short, up to 25 words.
    
    ${remainderText()}

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
    //👇🏻 The softskills prompt
    prompt3: `
    Now I will give you a list of my soft skills.
    If there are in spanish, please translate them to english.
    If there are more than 5, please select the top 5.
    If there are less than 5, please add more soft skills that are relevant for a resume.
    This is the list: ${softSkills}
    Give your response separated by commas. Ex. "soft skill 1, soft skill 2, soft skill 3, soft skill 4, soft skill 5"
    Avoid using any additional text, write only what I am asking for.
    Do not use introductory text like "Sure, here is the answer..." or "Of course, this is the response..."
    Be direct and go straight to the text I am asking for.
    Make sure they are five
    `,
    //👇🏻 The languages prompt
    prompt4: `
    Now I will give you a list of my languages.
    This is the list: ${languages}
    If they are in spanish, please translate them to english.
    Give your response separated by commas. Ex. "Englsi, Spanish, French, German"
    Avoid using any additional text, write only what I am asking for.
    Do not use introductory text like "Sure, here is the answer..." or "Of course, this is the response..."
    Be direct and go straight to the text I am asking for.
    `,
    //👇🏻 The technologies prompt
    prompt5: `
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
      //👇🏻 The job description prompt
    prompt1: `
    Usted es un reclutador de talento experto, con años de experiencia reclutando y contratando talento.

    Estoy escribiendo un curriculum vitae.
    Mis datos son:
    - nombre: ${fullName}
    - puesto: ${currentPosition} (${yearsOfExperience} años) 
    - Trabajo con estas tecnologías: ${currentTechnologies}
    - Mis habilidades interpersonales son ${softSkills}
    
    Escribe una breve descripción, de 75 palabras como máximo, para la parte superior del currículum.
    Utiliza las palabras clave necesarias para captar la atención de los candidatos y destacar, pero no abuses de ellas.
    (escriba en primera persona)

    No vuelvas a utilizar la información que ya te he dado. Sería redundante.
    
    Evita utilizar texto adicional, escribe sólo lo que te estoy pidiendo.
    No utilices textos introductorios como "Claro, aquí está la respuesta..." o "Por supuesto, esta es la respuesta...".
    Sea directo y vaya directamente al texto que le estoy pidiendo.
    `,
    //👇🏻 The job achievements prompt
    prompt2: `
    Ahora te daré una lista de las empresas para las que he trabajado y mi función. 
    Escribe tres viñetas para cada empresa que describan parte de la experiencia que obtengo de ese trabajo e ilustren mis puntos fuertes. Haz que cada viñeta sea breve, de hasta 25 palabras.

    ${remainderText()}

    Da tu respuesta en un formato json que se pueda traducir a un objeto javascript.
    Sigue el siguiente formato:
    [{"name": "empresa 1", "position": "posicion 1", "achivementsAndResponsabilites": ["texto en español 1", "texto en español 2", "texto en español 3"]},
    {"name": "empresa 2", "position": "posicion 2", "achivementsAndResponsabilites": ["texto en español 1", "texto en español 2", "texto en español 3"]}]
    
    Evita utilizar texto adicional, escribe sólo lo que te estoy pidiendo.
    No utilices texto introductorio del tipo "Claro, aquí está la respuesta..." o "Por supuesto, esta es la respuesta...".
    Sea directo y vaya directamente al texto que le estoy pidiendo

    Asegúrate de que estás utilizando el formato json correcto para transformarlo en objeto javascript.
    Un error común es cómo termina el json. Asegúrese de que está utilizando los corchetes correctos y el final.
    El final normal suele ser así "]}]"
    `,
    //👇🏻 The softskills prompt
    prompt3: `
    Ahora te daré una lista de mis habilidades blandas.
    Si están en inglés, por favor tradúzcalos al español.
    Si hay más de 5, por favor seleccione las 5 principales.
    Si hay menos de 5, por favor añade más habilidades que sean relevantes para un currículum.
    Esta es la lista: ${softSkills}
    Dé su respuesta separada por comas. Ej. "soft skill 1, soft skill 2, soft skill 3, soft skill 4, soft skill 5"
    Evita utilizar texto adicional, escribe sólo lo que te estoy pidiendo.
    No utilices texto introductorio como "Claro, aquí está la respuesta..." o "Por supuesto, esta es la respuesta...".
    Sé directo y ve directamente al texto que te estoy pidiendo.
    Asegúrese de que son cinco
    `,
    //👇🏻 The languages prompt
    prompt4: `
    Ahora te daré una lista de mis idiomas.
    Esta es la lista: ${languages}
    Si están en inglés, por favor tradúzcalos al español.
    Da tu respuesta separada por comas. Ej. "Englsi, Español, Francés, Alemán"
    Evite utilizar texto adicional, escriba sólo lo que le pido.
    No utilices textos introductorios como "Claro, aquí está la respuesta..." o "Por supuesto, esta es la respuesta...".
    Sea directo y vaya directamente al texto que le estoy pidiendo.

    `,
    //👇🏻 The technologies prompt
    prompt5: `
    Ahora les daré una lista de tecnologías.
    Esta es la lista: ${currentTechnologies}
    Asegúrese de que están en el siguiente formato, si no, por favor, cámbielos.
    Este es el formato: "JavaScript, HTML, CSS"
    Da tu respuesta separada por comas. Ej. "JavaScript, HTML, CSS"
    Evita utilizar texto adicional, escribe sólo lo que te estoy pidiendo.
    No utilices textos introductorios como "Claro, aquí está la respuesta..." o "Por supuesto, esta es la respuesta..."
    Sé directo y ve directamente al texto que te estoy pidiendo.
    `
    }
  }

  if (resumeLanguage === "english") {
    return template1Prompts.english
  } else if (resumeLanguage === "spanish") {
    return template1Prompts.spanish
  }
}