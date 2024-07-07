import './App.css';
import React from 'react';

function App() {
  return (
    <div>
      <section className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-pink-500 bg-gray-400 bg-blend-multiply h-screen dark:bg-gray-900">
                <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12">
                    <a href="https://www.grantthornton.dz/" className="inline-flex items-center justify-between px-1 py-1 pr-4 text-sm text-gray-700 bg-gray-100 rounded-full mb-7 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
                        <img alt="Description of the image" src={require('../src/assets/logo_gt.png')} style={{width : 50 + 'px'}} /><span className="text-sm font-medium">Grant Thornton Algeria</span>
                        <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    </a>
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white">We invest in the Latest Technologies</h1>
                    <p className="mb-8 text-lg font-normal text-white lg:text-xl sm:px-16 xl:px-48 dark:text-white">Here at Grant Thornton we focus on our clients needs & build optimized modern solutions to empower their success  .</p>
                    <div className="flex flex-col mb-8 space-y-4 lg:mb-16 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                       
                        <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border border-gray-300 rounded-lg hover:bg-white-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16"> <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" /> </svg>                    Contact us
                        </a>
                    </div>
                    <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
                        <span className="font-semibold text-gray-400 uppercase">Other Products Soon</span>
                        <div className="flex flex-wrap items-center justify-center mt-8 text-gray-500 sm:justify-between">


                        </div>
                    </div>
                </div>
            </section>
    </div>
  );
}

export default App;
