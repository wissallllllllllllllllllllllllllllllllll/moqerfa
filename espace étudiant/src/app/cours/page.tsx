"use client";
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const courses = [
    {
        name: "Machine Learning",
        progress: 75,
        description: "Apprenez les algorithmes fondamentaux du ML",
        duration: "8 semaines",
        level: "Intermédiaire"
    },
    {
        name: "Python pour l'IA",
        progress: 50,
        description: "Maîtrisez Python pour l'intelligence artificielle",
        duration: "6 semaines",
        level: "Débutant"
    },
    {
        name: "Analyse de données",
        progress: 90,
        description: "Explorez et analysez vos données efficacement",
        duration: "10 semaines",
        level: "Avancé"
    },
    {
        name: "Deep Learning",
        progress: 30,
        description: "Réseaux de neurones et apprentissage profond",
        duration: "12 semaines",
        level: "Avancé"
    },
    {
        name: "Vision par ordinateur",
        progress: 15,
        description: "Traitement et reconnaissance d'images",
        duration: "8 semaines",
        level: "Intermédiaire"
    },
    {
        name: "Traitement du langage naturel",
        progress: 0,
        description: "Analysez et comprenez le langage humain",
        duration: "10 semaines",
        level: "Avancé"
    },
    {
        name: "Statistiques pour l'IA",
        progress: 85,
        description: "Fondements statistiques de l'IA",
        duration: "5 semaines",
        level: "Débutant"
    },
    {
        name: "Éthique de l'IA",
        progress: 60,
        description: "Enjeux éthiques de l'intelligence artificielle",
        duration: "4 semaines",
        level: "Débutant"
    }
];

const getLevelColor = (level) => {
    switch(level) {
        case "Débutant": return "bg-green-100 text-green-800";
        case "Intermédiaire": return "bg-yellow-100 text-yellow-800";
        case "Avancé": return "bg-red-100 text-red-800";
        default: return "bg-gray-100 text-gray-800";
    }
};

const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-blue-500";
    if (progress >= 20) return "bg-yellow-500";
    return "bg-gray-400";
};

export default function Cours() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 px-8 py-20">
                <div className="container mx-auto">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-4xl font-bold mb-12 text-white text-center">
                            Les cours les plus consultés récemment
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map(({ name, progress, description, duration, level }) => (
                                <div key={name} className="bg-white rounded-xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="mb-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h2 className="text-xl font-semibold text-indigo-700 flex-1">{name}</h2>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(level)}`}>
                        {level}
                      </span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-3">{description}</p>
                                        <div className="flex items-center text-gray-500 text-sm mb-4">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {duration}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-gray-700">Progression</span>
                                            <span className="text-sm font-semibold text-indigo-600">{progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(progress)}`}
                                                style={{ width: `${progress}%` }}
                                                aria-label={`${name} completion progress`}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                                            {progress > 0 ? 'Continuer' : 'Commencer'}
                                        </button>
                                        <button className="px-4 py-2 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors duration-200">
                                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <button className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-200">
                                Découvrir plus de cours
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}