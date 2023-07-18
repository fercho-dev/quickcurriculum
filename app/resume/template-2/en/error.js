'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  const router = useRouter()
 
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">🙈 Huy, algo salio mal</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Intenta recargar la página
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-6 rounded"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => router.push('/')
        }
      >
        Vuelve al inicio
      </button>
    </div>
  )
}