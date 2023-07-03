'use client'

import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from "react";
import { useChat } from 'ai/react'
import UserDataContext from './UserDataContext';
import LoadingSkeleton from './LoadingSkeleton';

export default function Form() {
  const { messages, append, stop, isLoading } = useChat({api: '/api/chat'})
  const [newEntry, setNewEntry] = useState(null);
  const { setUserData, userData } = React.useContext(UserDataContext);

  useEffect(() => {
    if (messages.length >= 10 && !isLoading) {
      console.log('ANALYZING MESSAGES')
      console.log('MESSAGES: ', messages)
      messages.forEach((message) => {
          if (message.role != "user") {
            console.log('CONTENT: ', message.content);
          }
      })

      const bio = messages[1].content;
      const companiesInfo = messages[3].content;
      const softSkillsList = messages[5].content;
      const languagesList = messages[7].content;
      const technologiesList = messages[9].content;

      const chatgptData = {bio, companiesInfo, softSkillsList, languagesList, technologiesList};
      const result = {...newEntry, ...chatgptData};
      console.log('RESULT: ', result);

      setUserData(result);

      console.log('STOPPING CHAT')
      //stop();
      router.push('/resume');
    }
  }, [messages, isLoading])
 
  const [fullName, setFullName] = useState("");
    const [currentPosition, setCurrentPosition] = useState("");
    const [yearsOfExperience, setyearsOfExperience] = useState(1);
    const [currentTechnologies, setCurrentTechnologies] = useState("");
    const [softSkills, setSoftSkills] = useState("");
    const [languages, setLanguages] = useState("");
    const [resumeLanguage, setResumeLanguage] = useState("");
    const [companyInfo, setCompanyInfo] = useState([
        { name: "", position: "" }
    ]);
    const router = useRouter()

    //👇🏻 updates the state with user's input
    const handleAddCompany = () =>
    setCompanyInfo([...companyInfo, { name: "", position: "" }]);

    //👇🏻 removes a selected item from the list
    const handleRemoveCompany = (index) => {
    const list = [...companyInfo];
    list.splice(index, 1);
    setCompanyInfo(list);
    };
    //👇🏻 updates an item within the list
    const handleUpdateCompany = (e, index) => {
    const { name, value } = e.target;
    const list = [...companyInfo];
    list[index][name] = value;
    setCompanyInfo(list);
    };

    const getResume = async (formData) => {
      // GET BODY PARAMS
      const {
        fullName,
        currentPosition,
        yearsOfExperience,
        currentTechnologies,
        workHistory, //JSON format
      } = formData;

      const workArray = workHistory || []; //an array

      const generateID = () => Math.random().toString(36).substring(2,9)
      //👇🏻 group the values into an object
      setNewEntry({
          id: generateID(),
          fullName,
          currentPosition,
          yearsOfExperience,
          currentTechnologies,
          workHistory: workArray,
      });

      //👇🏻 loops through the items in the workArray and converts them to a string
      const remainderText = () => {
          let stringText = "";
          for (let i = 0; i < workArray.length; i++) {
              stringText += `${workArray[i].name} as a ${workArray[i].position}.\n`;
          }
          return stringText;
      };
      //👇🏻 The job description prompt
      const prompt1 = `
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
      `;
      //👇🏻 The job achievements prompt
      const prompt2 = `
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
      `;
      //👇🏻 The softskills prompt
      const prompt3 = `
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
      `;
      //👇🏻 The languages prompt
      const prompt4 = `
      Now I will give you a list of my languages.
      This is the list: ${languages}
      If they are in spanish, please translate them to english.
      Give your response separated by commas. Ex. "Englsi, Spanish, French, German"
      Avoid using any additional text, write only what I am asking for.
      Do not use introductory text like "Sure, here is the answer..." or "Of course, this is the response..."
      Be direct and go straight to the text I am asking for.
      `;
      //👇🏻 The languages prompt
      const prompt5 = `
      Now I will give you a list of technologies.
      This is the list: ${currentTechnologies}
      Make sure they are in the next format, if not please change them.
      This is the format: "JavaScript, HTML, CSS"
      Give your response separated by commas. Ex. "JavaScript, HTML, CSS"
      Avoid using any additional text, write only what I am asking for.
      Do not use introductory text like "Sure, here is the answer..." or "Of course, this is the response..."
      Be direct and go straight to the text I am asking for.
      `;

      //👇🏻 generate a GPT result
      console.log('STARTING GPT API CALLS')
      await append({"role": "user", "content": prompt1});
      await append({"role": "user", "content": prompt2});
      await append({"role": "user", "content": prompt3});
      await append({"role": "user", "content": prompt4});
      await append({"role": "user", "content": prompt5});
      console.log('END OF API CALLS')
    }

    const handleFormSubmit = async (e) => {
        console.log('EVENT:', e);
        e.preventDefault();
        console.log('FORM SUBMITTED');
        const formData = {
            fullName,
            currentPosition,
            yearsOfExperience,
            currentTechnologies,
            workHistory: companyInfo,
        }
        console.log('GETTTING RESUME');
        await getResume(formData);
        console.log('RESUME GENERATED')
    };

    //👇🏻 Renders the Loading component you submit the form
    if (isLoading) {
        return <LoadingSkeleton />;
    }
  return (
    <div className='app mx-auto flex flex-col items-center justify-center min-h-screen bg-purple-50 text-neutral-900 font-sans pt-8 pb-11 px-2'>
            <p className='mb-9 mt-5 text-xl md:text-2xl font-medium text-purple-600'>Ingresa tus datos y obten tu CV</p>
            <form
                onSubmit={handleFormSubmit}
                method='POST'
                encType='multipart/form-data'
                className='w-full max-w-md'
            >
                <label htmlFor='fullName' className='font-medium mb-1'>Tu nombre completo:</label>
                <input
                    type='text'
                    required
                    name='fullName'
                    id='fullName'
                    placeholder='Ej. Juan Perez'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className='w-full mb-5 p-2 border-2 border-purple-200 rounded'
                />
                <div className='nestedContainer flex flex-col space-y-5'>
                    <div>
                        <label htmlFor='currentPosition' className='font-medium mb-1'>Tu rol actual:</label>
                        <input
                            type='text'
                            required
                            placeholder='Ej. Frontend Developer'
                            name='currentPosition'
                            className='currentInput w-full p-2 border-2 border-purple-200 rounded'
                            value={currentPosition}
                            onChange={(e) => setCurrentPosition(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='yearsOfExperience' className='font-medium mb-1'>¿Cuánto tiempo llevas en este rol? (años)</label>
                        <input
                            type='number'
                            required
                            name='yearsOfExperience'
                            className='currentInput w-full p-2 border-2 border-purple-200 rounded'
                            value={yearsOfExperience}
                            onChange={(e) => setyearsOfExperience(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='currentTechnologies' className='font-medium mb-1 mr-2'>¿Cuáles son tus habilidades técnicas?</label>
                        <input
                            type='text'
                            required
                            name='currentTechnologies'
                            placeholder='Ej: JavaScript, React, Node, Python, etc.'
                            className='currentInput w-full p-2 border-2 border-purple-200 rounded'
                            value={currentTechnologies}
                            onChange={(e) => setCurrentTechnologies(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='softSkills' className='font-medium mb-1 mr-2'>¿Cuáles son tus habilidades blandas? -soft skills-</label>
                        <input
                            type='text'
                            required
                            name='softSkills'
                            placeholder='Ej: Proactividad, Trabajo en equipo, etc.'
                            className='currentInput w-full p-2 border-2 border-purple-200 rounded'
                            value={softSkills}
                            onChange={(e) => setSoftSkills(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='languages' className='font-medium mb-1 mr-2'>¿Qué idiomas hablas?</label>
                        <input
                            type='text'
                            required
                            name='languages'
                            placeholder='Ej: Español, Inglés, etc.'
                            className='currentInput w-full p-2 border-2 border-purple-200 rounded'
                            value={languages}
                            onChange={(e) => setLanguages(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <h3 className='text-xl font-semibold my-4'>Empresas en las que has trabajado:</h3>
                    {companyInfo.map((company, index) => (
                    <div className='nestedContainer flex flex-col space-y-5' key={index}>
                        <div className='companies'>
                            <label htmlFor='name' className='font-medium mb-1'>Empresa:</label>
                            <input
                                type='text'
                                name='name'
                                required
                                onChange={(e) => handleUpdateCompany(e, index)}
                                className='w-full p-2 border-2 border-purple-200 rounded'
                            />
                        </div>
                        <div className='companies'>
                            <label htmlFor='position' className='font-medium mb-1'>Rol:</label>
                            <input
                                type='text'
                                name='position'
                                required
                                onChange={(e) => handleUpdateCompany(e, index)}
                                className='w-full p-2 border-2 border-purple-200 rounded'
                            />
                        </div>

                        <div className='btn__group flex space-x-4 mt-2'>
                            {companyInfo.length - 1 === index && companyInfo.length < 4 && (
                                <button id='addBtn' onClick={handleAddCompany} className='bg-blue-500 text-white font-normal py-1 px-2 rounded hover:bg-blue-700'>
                                    Añadir
                                </button>
                            )}
                            {companyInfo.length - 1 === index && companyInfo.length > 1 && (
                                <button id='deleteBtn' onClick={() => handleRemoveCompany(index)} className='bg-red-500 text-white font-normal py-1 px-2 rounded hover:bg-red-700'>
                                    Borrar
                                </button>
                            )}
                        </div>

                        {index < companyInfo.length - 1 && <hr className='my-4 border-t-2 border-purple-300'/>}
                    </div>
                ))}
                </div>

                <div className="mt-6">
                    <label htmlFor='resumeLanguage' className='block text-m font-medium text-gray-700'>
                        ¿En qué idioma quieres tu curriculum?
                    </label>
                    <select
                        id='resumeLanguage'
                        name='resumeLanguage'
                        required
                        className='mt-1 block w-full py-2 px-3 border border-purple-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        value={resumeLanguage}
                        onChange={(e) => setResumeLanguage(e.target.value)}
                    >
                        <option value='english'>Inglés</option>
                        <option value='spanish'>Español</option>
                    </select>
                </div>

                <button type="submit" className='w-full py-3 px-4 bg-purple-600 shadow-md shadow-orange-300 text-white font-bold rounded hover:bg-purple-800 mt-5'>
                  CREAR CV
                </button>
            </form>
        </div>
  )
}