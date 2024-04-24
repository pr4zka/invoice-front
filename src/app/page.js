'use client'
import { useState } from "react";

export default function Home() {

  const [file, setFile] = useState(null)
  const [processing, setProcessing] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        setFile(null)
        // Descargar el PDF
        const blob = await res.blob();
  
        // Crear un objeto URL para el blob
        const url = URL.createObjectURL(blob);

        // Crear un enlace de descarga y simular clic
        const a = document.createElement('a');
        a.href = url;
        a.download = 'plantilla-factura.pdf'; // Nombre del archivo
        document.body.appendChild(a);
        a.click();
  
        // Liberar el objeto URL cuando ya no se necesite
        URL.revokeObjectURL(url);
      } else {
        console.error('Error al obtener el PDF:', res.status, res.statusText);
        // Manejar el error, mostrar un mensaje al usuario, etc.
      }
    } catch (error) {
      console.error('Error al obtener el PDF:', error.message);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }
    setProcessing(false);
  }
  

  
    
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col h-screen p-3 w-60 dark:bg-gray-900 dark:text-gray-100">
        <div className="space-y-3 h-full">
          <div className="flex items-center justify-between">
            <h2 className="text-[2rem] font-bold">Aratiri &#128424;</h2>
            <button className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8 fill-current dark:text-gray-100">
                <rect width="352" height="32" x="80" y="96"></rect>
                <rect width="352" height="32" x="80" y="240"></rect>
                <rect width="352" height="32" x="80" y="384"></rect>
              </svg>
            </button>
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm bg-yellow-600">
                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                  <span>Generar Template</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center p-2 mt-12 space-x-4 justify-self-end">
          <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-12 h-12 rounded-lg dark:bg-gray-500" />
          <div>
            <h2 className="text-lg font-semibold">Aratiri</h2>
          </div>
        </div>
      </div>

      <div className="w-full h-screen bg-gray-100">
        <div>
          <div className="flex items-center justify-center">
            <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-11/12">
              <form onSubmit={handleSubmit} >
              <div className="p-6">
                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  Cargar Factura
                </h5>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Cargar...</label>
                <input className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" aria-describedby="file_input_help" id="file_input" 
                type="file"
                onChange={(e) =>
                  setFile(e.target.files[0])
                }/>
                <p className="mt-1 text-sm text-gray-500" id="file_input_help">se admite solo PDF</p>
              </div>
              <div className="p-6 pt-0">
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                  >
                  {processing ? 'Procesando...' : 'Generar'}
                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
