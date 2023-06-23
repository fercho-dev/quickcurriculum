export default function Hero() {
  return (
    <div className='app mx-auto flex flex-col items-center justify-center min-h-screen bg-slate-900 text-neutral-900 pt-8 pb-11'>
      <h1 className='text-4xl md:text-6xl font-bold mb-2'>
        <span className='bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent'>
          Quick Curriculum
        </span>
      </h1>
      <p className='mb-5 text-lg md:text-2xl text-center bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent'>
        Genera un CV en segundos con ChatGPT
      </p>
    </div>
  )
}