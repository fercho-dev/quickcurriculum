'use client'
import React, { useState, useEffect, useContext, useRef } from 'react';
import UserDataContext from '../../../UserDataContext';
import { useReactToPrint } from "react-to-print";
import { useRouter } from 'next/navigation'
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDoc from './MyDoc';

export default function Resume() {
  const { userData } = useContext(UserDataContext) || {};
  console.log(userData)

  const [workExperience, setWorkExperience] = useState([]);
  const [projectsExperience, setProjectsExperience] = useState([]);

  useEffect(() => {
    let newWorkExperience = [];
    let newProjectsExperience = [];

    try {
      newWorkExperience = JSON.parse(userData.companiesInfo);
    } catch (error) {
      console.error('Error parsing companiesInfo', error);
    }

    try {
      newProjectsExperience = JSON.parse(userData.projectsInfo);
    } catch (error) {
      console.error('Error parsing projectsInfo', error);
    }

    setWorkExperience(newWorkExperience);
    setProjectsExperience(newProjectsExperience);
  }, [userData]);

  const router = useRouter()
  
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${userData.fullName} Resume`,
    onAfterPrint: () => alert("Print Successful!"),
  });

  //👇🏻 returns an error page if the userData object is empty
  if (JSON.stringify(userData) === "{}") {
    return <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-red-500 text-lg font-bold mb-4">Error: inserta tus datos correctamente de nuevo</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={
          // Navigate back to the home page
          () => router.push('/')
        }
      >
        Vuelve al inicio
      </button>
    </div>
  }

    //👇🏻 function that replaces the new line with a break tag
    // const replaceWithBr = (string) => {
    //     return string.replace(/\n/g, "<br />");
    // };

    return (
        <div className="font-spaceGrotesk box-border m-0 p-0">
            <button onClick={handlePrint}
              className="ml-6 mx-2 my-5 py-2 md:py-4 px-2 cursor-pointer outline-none bg-purple-600 border-none text-white text-sm md:text-lg font-semibold rounded-md"
            >
              Imprimir
            </button>

            <button className="mx-2 my-5 py-2 md:py-4 px-2 cursor-pointer outline-none bg-purple-600 border-none text-white text-sm md:text-lg font-semibold rounded-md">
              <PDFDownloadLink document={<MyDoc userData={userData} workExperience={workExperience} projectsExperience={projectsExperience}/>} fileName={`${userData.fullName}_Resume.pdf`}>
                {({ loading }) => (loading ? 'Loading document...' : 'Descargar como PDF')}
              </PDFDownloadLink>
            </button>

            <main className='min-h-screen min-w-screen m-4 md:p-8 rounded border border-gray-400' ref={componentRef}>
                <header className='lg:w-4/5 m-auto min-h-[10vh] border-[1px] border-[#e0e0ea] p-8 rounded-t-md'>
                    <div className='lg:flex lg:justify-between'>
                        <p className='font-bold text-4xl'>
                            {userData.fullName}
                        </p>
                        <p className='italic mt-4'>
                            {userData.currentEmail}
                        </p>
                    </div>
                </header>
                <div className='lg:w-4/5 m-auto p-8 min-h-[80vh] border-[1px] border-[#e0e0ea]'>
                    <div className='flex flex-col md:mx-12'>
                      <div className='justify-self-start md:max-w-[60%]'>
                        <h2 className='mb-2 text-lg md:text-2xl'>• Experiencia Laboral</h2>
                        {console.log("workexperience", workExperience)}
                        {workExperience && workExperience.length > 0 ?
                          workExperience.map((item, index) => (
                            <div className='mb-6 ml-6' key={index}>
                              <h3 className='font-semibold capitalize text-base md:text-lg'>{item.name}</h3>
                              <p className='font-medium capitalize text-sm md:text-base'>{item.position}</p>
                              <ul className='list-disc'>
                                {item.achivementsAndResponsabilites && item.achivementsAndResponsabilites.length > 0 ?
                                  item.achivementsAndResponsabilites.map((achivement, achivementIndex) => (
                                    <li className='text-xs md:text-sm' key={achivementIndex}>{achivement}</li>
                                  ))
                                  :
                                  <li>No achievements and responsibilities listed.</li>
                                }
                              </ul>
                            </div>
                          ))
                          :
                          <div>No work experience listed.</div>
                        }
                      </div>

                      <div className='justify-self-start md:max-w-[60%]'>
                        <h2 className='mb-2 text-lg md:text-2xl'>• Proyectos</h2>
                        {console.log("projectexperience", projectsExperience)}
                        {projectsExperience && projectsExperience.length > 0 ?
                          projectsExperience.map((item, index) => (
                            <div className='mb-6 ml-6' key={index}>
                              <h3 className='font-semibold capitalize text-base md:text-lg'>{item.name}</h3>
                              <p className='font-medium capitalize text-sm md:text-base'>{item.position}</p>
                              <ul className='list-disc'>
                                {item.achivementsAndResponsabilites && item.achivementsAndResponsabilites.length > 0 ?
                                  item.achivementsAndResponsabilites.map((achivement, achivementIndex) => (
                                    <li className='text-xs md:text-sm' key={achivementIndex}>{achivement}</li>
                                  ))
                                  :
                                  <li>No achievements and responsibilities listed.</li>
                                }
                              </ul>
                            </div>
                          ))
                          :
                          <div>No project experience listed.</div>
                        }
                      </div>

                      <div className='justify-self-start mb-12'>

                        <div className='mb-12'>
                          <h2 className='mb-2 text-lg md:text-2xl'>• Habilidades Técnicas</h2>
                          <ul className='list-disc ml-8'>
                            {userData.technologiesList.split(', ').map((skill, index) => (
                              <li className='capitalize text-sm md:text-base' key={index}>{skill}</li>
                            ))}
                          </ul>
                        </div>

                        <div className='mb-12'>
                          <h2 className='mb-2 text-lg md:text-2xl'>• Idiomas</h2>
                            <ul className='list-disc ml-8'>
                              {userData.languagesList.split(', ').map((skill, index) => (
                                <li className='capitalize text-sm md:text-base' key={index}>{skill}</li>
                              ))}
                            </ul>
                        </div>

                      </div>
                    </div>
                </div>
            </main>
        </div>
    );
}