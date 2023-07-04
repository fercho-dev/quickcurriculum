'use client'
import React, { useContext, useRef } from 'react';
import UserDataContext from '../../../UserDataContext';
import { useReactToPrint } from "react-to-print";
import { useRouter } from 'next/navigation'
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDoc from './MyDoc';

export default function Resume() {
  const { userData } = useContext(UserDataContext) || {};
  console.log(userData)

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

  const workExperience = JSON.parse(userData.companiesInfo) || [];

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
              <PDFDownloadLink document={<MyDoc userData={userData} workExperience={workExperience} />} fileName={`${userData.fullName}_Resume.pdf`}>
                {({ loading }) => (loading ? 'Loading document...' : 'Descargar como PDF')}
              </PDFDownloadLink>
            </button>

            <main className='min-h-screen min-w-screen p-2 md:p-8' ref={componentRef}>
                <header className='w-4/5 m-auto min-h-[10vh] bg-blue-500 p-8 rounded-t-md flex items-center justify-between'>
                    <div>
                        <h1 className='subpixel-antialiased capitalize font-semibold md:font-medium text-white text-base md:text-5xl mb-1'>{userData.currentPosition}</h1>
                        <p className=' capitalize text-sm md:text-2xl font-normal text-white mb-2 md:mb-4'>
                            {userData.fullName}
                        </p>
                        <p className='text-xs md:text-base text-gray-300'>
                            {userData.yearsOfExperience} años de experiencia
                        </p>
                    </div>
                    <div>
                    </div>
                </header>
                <div className='w-4/5 m-auto p-8 min-h-[80vh] border-[1px] border-[#e0e0ea]'>
                    <div className='md:mx-6'>
                        <h2 className='mb-2 text-lg md:text-3xl'>• Acerca</h2>
                        <p className='text-justify mb-8 text-xs md:text-lg'>
                            {userData.bio}
                        </p>
                    </div>
                    <div className='flex flex-col md:flex-row md:justify-between md:mx-12'>
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
                          <h2 className='mb-2 text-lg md:text-2xl'>• Habilidades Blandas</h2>
                            <ul className='list-disc ml-8'>
                              {userData.softSkillsList.split(', ').map((skill, index) => (
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
                      <div className='justify-self-start md:max-w-[60%]'>
                        <h2 className='mb-2 text-lg md:text-2xl'>• Experiencia Laboral</h2>
                        {console.log("workexperience", workExperience)}
                        {workExperience && workExperience.length > 0 ?
                          workExperience.map((item, index) => (
                            <div className='mb-6' key={index}>
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
                    </div>
                </div>
            </main>
        </div>
    );
}