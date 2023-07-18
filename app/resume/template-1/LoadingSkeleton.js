import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="font-spaceGrotesk box-border m-0 p-0">
            <button className="py-4 cursor-pointer outline-none bg-[#5d3891] border-none text-white text-lg font-bold rounded-md animate-pulse" />
            <main className='container min-h-screen p-8'>
                <header className='w-4/5 m-auto min-h-[10vh] bg-gray-300 p-8 rounded-t-md flex items-center justify-between animate-pulse'>
                    <div>
                        <div className='bg-gray-400 h-6 mb-4 rounded w-1/2 animate-pulse'></div>
                        <div className='bg-gray-400 h-4 mb-2 rounded w-4/5 animate-pulse'></div>
                        <div className='bg-gray-400 h-4 rounded w-1/3 animate-pulse'></div>
                    </div>
                    <div>
                    </div>
                </header>
                <div className='w-4/5 m-auto p-8 min-h-[80vh] border border-gray-300 animate-pulse'>
                    <div>
                        <div className='bg-gray-400 h-6 mb-4 rounded w-1/4 animate-pulse'></div>
                        <div className='bg-gray-400 h-4 mb-8 rounded w-full animate-pulse'></div>
                    </div>
                    <div>
                        <div className='bg-gray-400 h-6 mb-4 rounded w-1/4 animate-pulse'></div>
                        <div className='bg-gray-400 h-4 mb-8 rounded w-3/4 animate-pulse'></div>
                    </div>
                    <div>
                        <div className='bg-gray-400 h-6 mb-4 rounded w-1/4 animate-pulse'></div>
                        <div className='bg-gray-400 h-4 mb-8 rounded w-2/3 animate-pulse'></div>
                    </div>
                    <div>
                        <div className='bg-gray-400 h-6 mb-4 rounded w-1/4 animate-pulse'></div>
                        <div className='bg-gray-400 h-4 mb-8 rounded w-4/5 animate-pulse'></div>
                    </div>
                </div>
            </main>
        </div>
  );
};

export default LoadingSkeleton;