'use client'

import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from "react";
import { useChat } from 'ai/react'
import UserDataContext from './UserDataContext';

export default function Form() {
  const { messages, append, stop, isLoading } = useChat({api: '/api/chat'})
  const [newEntry, setNewEntry] = useState(null);
  const { setUserData } = React.useContext(UserDataContext);

  useEffect(() => {
    if (messages.length >= 6 && !isLoading) {
      console.log('ANALYZING MESSAGES')
      console.log('MESSAGES: ', messages)
      messages.forEach((message) => {
          if (message.role != "user") {
            console.log('CONTENT: ', message.content);
          }
      })

      const objective = messages[1].content;
      const keypoints = messages[3].content;
      const jobResponsibilities = messages[5].content;

      const chatgptData = {objective, keypoints, jobResponsibilities};
      const result = {...newEntry, ...chatgptData};
      console.log('RESULT: ', result);
      setUserData(result);

      console.log('STOPPING CHAT')
      stop()

      console.log('REDIRECTING TO RESUME')
      router.push('/resume')
    }
  }, [messages, isLoading])
 
  const [fullName, setFullName] = useState("");
    const [currentPosition, setCurrentPosition] = useState("");
    const [currentLength, setCurrentLength] = useState(1);
    const [currentTechnologies, setCurrentTechnologies] = useState("");
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
        currentLength,
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
          currentLength,
          currentTechnologies,
          workHistory: workArray,
      });

      //👇🏻 loops through the items in the workArray and converts them to a string
      const remainderText = () => {
          let stringText = "";
          for (let i = 0; i < workArray.length; i++) {
              stringText += ` ${workArray[i].name} as a ${workArray[i].position}.`;
          }
          return stringText;
      };
      //👇🏻 The job description prompt
      const prompt1 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I work with these technologies: ${currentTechnologies}. Can you write a 100 words description for the top of the resume(first person writing)?`;
      //👇🏻 The job responsibilities prompt
      const prompt2 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I work with these technologies: ${currentTechnologies}. Can you write 10 points for a resume on what I am good at?`;
      //👇🏻 The job achievements prompt
      const prompt3 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n During my years I worked at ${
          workArray.length
      } companies. ${remainderText()} \n Can you write me 50 words for each company seperated in numbers of my succession in the company (in first person)?`;

      //👇🏻 generate a GPT result
      console.log('STARTING GPT API CALLS')
      await append({"role": "user", "content": prompt1});
      await append({"role": "user", "content": prompt2});
      await append({"role": "user", "content": prompt3});
      console.log('END OF API CALLS')
    }

    const handleFormSubmit = async (e) => {
        console.log('EVENT:', e);
        e.preventDefault();
        console.log('FORM SUBMITTED');
        const formData = {
            fullName,
            currentPosition,
            currentLength,
            currentTechnologies,
            workHistory: companyInfo,
        }
        console.log('GETTTING RESUME');
        await getResume(formData);
        console.log('RESUME GENERATED')
    };

    //👇🏻 Renders the Loading component you submit the form
    if (isLoading) {
        return <p>Loading...</p>;
    }
  return (
    <div className='app mx-auto flex flex-col items-center justify-center min-h-screen bg-purple-50 text-neutral-900 font-sans pt-8 pb-11 px-2'>
            <p className='mb-5 mt-5 text-xl md:text-2xl'>Ingresa tus datos y obten tu CV</p>
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
                            name='currentPosition'
                            className='currentInput w-full p-2 border-2 border-purple-200 rounded'
                            value={currentPosition}
                            onChange={(e) => setCurrentPosition(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='currentLength' className='font-medium mb-1'>¿Cuánto tiempo llevas en este rol? (años)</label>
                        <input
                            type='number'
                            required
                            name='currentLength'
                            className='currentInput w-full p-2 border-2 border-purple-200 rounded'
                            value={currentLength}
                            onChange={(e) => setCurrentLength(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='currentTechnologies' className='font-medium mb-1 mr-2'>Tecnologias que usas:</label>
                        <input
                            type='text'
                            required
                            name='currentTechnologies'
                            className='currentInput w-full p-2 border-2 border-purple-200 rounded'
                            value={currentTechnologies}
                            onChange={(e) => setCurrentTechnologies(e.target.value)}
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