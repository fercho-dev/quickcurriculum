'use client'

import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from "react";
import { useChat } from 'ai/react'
import UserDataContext from '../../UserDataContext';
import LoadingSkeleton from './LoadingSkeleton';
import getPrompts from '../../Model/prompts';

export default function Form() {
  const { messages, append, isLoading } = useChat({api: '/api/chat'})
  const [newEntry, setNewEntry] = useState(null);
  const { setUserData, userData } = React.useContext(UserDataContext);

  useEffect(() => {
    if (messages.length >= 8 && !isLoading) {
      console.log('ANALYZING MESSAGES')
      console.log('MESSAGES: ', messages)
      messages.forEach((message) => {
          if (message.role != "user") {
            console.log('CONTENT: ', message.content);
          }
      })

      const companiesInfo = messages[1].content;
      const projectsInfo = messages[3].content;
      const languagesList = messages[5].content;
      const technologiesList = messages[7].content;

      const chatgptData = {companiesInfo, projectsInfo, languagesList, technologiesList};
      const result = {...newEntry, ...chatgptData};
      console.log('RESULT: ', result);

      setUserData(result);

      console.log('STOPPING CHAT')
      //stop();
      if (resumeLanguage == "english") {
        router.push('/resume/template-2/en');
      } else if (resumeLanguage == "spanish") {
        router.push('/resume/template-2/es');
      }
    }
  }, [messages, isLoading])
 
  const [fullName, setFullName] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");
    const [currentTechnologies, setCurrentTechnologies] = useState("");
    const [languages, setLanguages] = useState("");
    const [resumeLanguage, setResumeLanguage] = useState("english");
    const [companyInfo, setCompanyInfo] = useState([
        { name: "", position: "" }
    ]);
    const [projectsInfo, setProjectsInfo] = useState([
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

    //👇🏻 updates the state with user's input
    const handleAddProject = () =>
    setProjectsInfo([...projectsInfo, { name: "", position: "" }]);

    //👇🏻 removes a selected item from the list
    const handleRemoveProject = (index) => {
    const list = [...projectsInfo];
    list.splice(index, 1);
    setProjectsInfo(list);
    };
    //👇🏻 updates an item within the list
    const handleUpdateProject = (e, index) => {
    const { name, value } = e.target;
    const list = [...projectsInfo];
    list[index][name] = value;
    setProjectsInfo(list);
    };

    const getResume = async (formData) => {
      // GET BODY PARAMS
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

      const generateID = () => Math.random().toString(36).substring(2,9)
      //👇🏻 group the values into an object
      setNewEntry({
          id: generateID(),
          fullName,
          currentEmail,
          currentTechnologies,
          languages,
          projectsHistory: projectArray,
          workHistory: workArray,
      });

      // get prompts
      console.log('GETTING PROMPTS')
      console.log('RESUME LANGUAGE: ', resumeLanguage)
      const { prompt1, prompt2, prompt3, prompt4 } = getPrompts(resumeLanguage, formData, 'template2');

      //👇🏻 generate a GPT result
      console.log('STARTING GPT API CALLS')
      await append({"role": "user", "content": prompt1});
      await append({"role": "user", "content": prompt2});
      await append({"role": "user", "content": prompt3});
      await append({"role": "user", "content": prompt4});
      console.log('END OF API CALLS')
    }

    const handleFormSubmit = async (e) => {
        console.log('EVENT:', e);
        e.preventDefault();
        console.log('FORM SUBMITTED');
        const formData = {
            fullName,
            currentEmail,
            currentTechnologies,
            languages,
            projectsHistory: projectsInfo,
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
                        <label htmlFor='currentEmail' className='font-medium mb-1'>Tu email de contacto:</label>
                        <input
                            type='text'
                            required
                            placeholder='Ej. developer@gmail.com'
                            name='currentEmail'
                            className='currentInput w-full p-2 border-2 border-purple-200 rounded'
                            value={currentEmail}
                            onChange={(e) => setCurrentEmail(e.target.value)}
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

                <div>
                    <h3 className='text-xl font-semibold my-4'>Proyectos en los que has trabajado:</h3>
                    {projectsInfo.map((project, index) => (
                    <div className='nestedContainer flex flex-col space-y-5' key={index}>
                        <div className='projects'>
                            <label htmlFor='name' className='font-medium mb-1'>Proyecto:</label>
                            <input
                                type='text'
                                name='name'
                                required
                                onChange={(e) => handleUpdateProject(e, index)}
                                className='w-full p-2 border-2 border-purple-200 rounded'
                            />
                        </div>
                        <div className='projects'>
                            <label htmlFor='position' className='font-medium mb-1'>Rol:</label>
                            <input
                                type='text'
                                name='position'
                                required
                                onChange={(e) => handleUpdateProject(e, index)}
                                className='w-full p-2 border-2 border-purple-200 rounded'
                            />
                        </div>

                        <div className='btn__group flex space-x-4 mt-2'>
                            {projectsInfo.length - 1 === index && projectsInfo.length < 4 && (
                                <button id='addBtn' onClick={handleAddProject} className='bg-blue-500 text-white font-normal py-1 px-2 rounded hover:bg-blue-700'>
                                    Añadir
                                </button>
                            )}
                            {projectsInfo.length - 1 === index && projectsInfo.length > 1 && (
                                <button id='deleteBtn' onClick={() => handleRemoveProject(index)} className='bg-red-500 text-white font-normal py-1 px-2 rounded hover:bg-red-700'>
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