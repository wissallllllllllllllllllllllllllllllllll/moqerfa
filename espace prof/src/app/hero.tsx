"use client";
import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";

function Hero() {
  return (
      <div className="relative min-h-screen w-full">
        <header className="grid !min-h-[49rem] bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 px-8">
          <div className="container mx-auto mt-32 grid h-full w-full grid-cols-1 place-items-center lg:mt-14 lg:grid-cols-2">
            <div className="col-span-1">
              <Typography variant="h1" color="white" className="mb-4">
                SmartPathAI <br />
                <span className="text-blue-300">Plateforme Éducative</span>
              </Typography>
              <Typography
                  variant="lead"
                  className="mb-7 !text-gray-200 md:pr-16 xl:pr-28"
              >
                Une plateforme intelligente propulsée par l'IA pour un suivi
                pédagogique personnalisé et adaptatif des étudiants de SUP'Com.
              </Typography>

              <div className="flex flex-col gap-2 md:mb-2 md:w-10/12 md:flex-row">



              </div>
            </div>
            <div className="col-span-1 relative">
              <div className="relative my-20 h-full max-h-[30rem] -translate-y-32 md:max-h-[36rem] lg:my-0 lg:ml-auto lg:max-h-[40rem] lg:translate-y-0">
                {/* Dashboard mockup */}
                <div className="bg-white rounded-xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    <div className="flex gap-2 mt-4">
                      <div className="h-16 w-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg"></div>
                      <div className="h-16 w-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg"></div>
                      <div className="h-16 w-16 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg"></div>
                    </div>
                  </div>
                </div>
                {/* AI Assistant mockup */}
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-4 shadow-lg">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="white"
                      className="w-8 h-8"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-8 lg:mx-16 -mt-24 rounded-xl bg-white p-5 md:p-14 shadow-xl border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Typography variant="h3" color="blue-gray" className="mb-3">
                SmartPathAI - Suivi Pédagogique Intelligent
              </Typography>
              <Typography
                  variant="paragraph"
                  className="font-normal !text-gray-600 mb-4"
              >
                Découvrez une plateforme révolutionnaire qui utilise l'intelligence artificielle
                pour offrir un suivi pédagogique personnalisé, des évaluations adaptatives et
                des recommandations de parcours individualisés pour les étudiants de SUP'Com.
              </Typography>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <Typography variant="small" className="text-gray-600">
                    Base de connaissances intelligente avec stockage vectoriel
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <Typography variant="small" className="text-gray-600">
                    Évaluations augmentées par IA avec génération de QCMs
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <Typography variant="small" className="text-gray-600">
                    Dashboard interactif pour enseignants et étudiants
                  </Typography>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <Typography variant="h6" className="text-blue-800 mb-1">
                  Suivi Personnalisé
                </Typography>

              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189c.422-.055.822-.149 1.199-.267a4.5 4.5 0 011.535-2.226A7.5 7.5 0 0112 6.75a7.5 7.5 0 01-4.735 6.523 4.5 4.5 0 011.535 2.226c.377.118.777.212 1.199.267A6.01 6.01 0 0012 12.75z" />
                  </svg>
                </div>
                <Typography variant="h6" className="text-purple-800 mb-1">
                  IA Intégrée
                </Typography>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl">
                <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <Typography variant="h6" className="text-indigo-800 mb-1">
                  Analytics
                </Typography>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <Typography variant="h6" className="text-green-800 mb-1">
                  Sécurisé
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Hero;