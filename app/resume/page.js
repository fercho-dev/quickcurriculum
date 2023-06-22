'use client'
import React, { useContext, useRef } from 'react';
import UserDataContext from '../UserDataContext';
import { useReactToPrint } from "react-to-print";

export default function Resume() {
  const { userData } = useContext(UserDataContext);
  console.log(userData)
  
  const componentRef = useRef();

    // PRINTING THE PAGE
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `${userData.fullName} Resume`,
        onAfterPrint: () => alert("Print Successful!"),
    });

    //👇🏻 function that replaces the new line with a break tag
    const replaceWithBr = (string) => {
        return string.replace(/\n/g, "<br />");
    };

    //👇🏻 returns an error page if the userData object is empty
    // if (JSON.stringify(userData) === "{}") {
    //     return <ErrorPage />;
    // }

    return (
        <div className="font-spaceGrotesk box-border m-0 p-0">
            <button onClick={handlePrint}
              className="py-4 cursor-pointer outline-none bg-[#5d3891] border-none text-white text-lg font-bold rounded-md"
            >
              Print Page
            </button>
            <main className='container min-h-screen p-8' ref={componentRef}>
                <header className='header w-4/5 m-auto min-h-[10vh] bg-[#e8e2e2] p-8 rounded-t-md flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-3xl'>{userData.fullName}</h1>
                        <p className='resumeTitle headerTitle text-sm text-gray-600 mb-4'>
                            {userData.currentPosition} ({userData.currentTechnologies})
                        </p>
                        <p className='resumeTitle text-sm text-gray-600'>
                            {userData.currentLength}year(s) work experience
                        </p>
                    </div>
                    <div>
                    </div>
                </header>
                <div className='resumeBody w-4/5 m-auto p-8 min-h-[80vh] border-[1px] border-[#e0e0ea]'>
                    <div>
                        <h2 className='resumeBodyTitle mb-2 text-2xl'>PROFILE SUMMARY</h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: replaceWithBr(userData.objective),
                            }}
                            className='resumeBodyContent text-justify mb-8'
                        />
                    </div>
                    <div>
                        <h2 className='resumeBodyTitle mb-2 text-2xl'>WORK HISTORY</h2>
                        {userData.workHistory.map((work) => (
                            <p className='resumeBodyContent text-justify mb-8' key={work.name}>
                                <span className="font-bold">{work.name}</span> -{" "}
                                {work.position}
                            </p>
                        ))}
                    </div>
                    <div>
                        <h2 className='resumeBodyTitle mb-2 text-2xl'>JOB PROFILE</h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: replaceWithBr(userData.jobResponsibilities),
                            }}
                            className='resumeBodyContent text-justify mb-8'
                        />
                    </div>
                    <div>
                        <h2 className='resumeBodyTitle mb-2 text-2xl'>JOB RESPONSIBILITIES</h2>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: replaceWithBr(userData.keypoints),
                            }}
                            className='resumeBodyContent text-justify mb-8'
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}