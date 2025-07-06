"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Profil() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 px-8 py-20">
                <div className="max-w-7xl mx-auto">
                    {/* Fil d'Ariane et titre */}
                    <div className="mb-6 flex justify-between items-center">
                        <h1 className="text-4xl font-bold mb-12 text-white text-center">Profil</h1>
                    </div>

                    {/* Carte de Profil */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between shadow">
                        <div className="flex items-center gap-4">
                            <img
                                src="/image/wissal.jpg"
                                alt="Profil"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Wissal Boulabiar
                                </h2>
                                <p className="text-gray-500 text-sm">Étudiante</p>
                                <p className="text-gray-500 text-sm">Ariana, Tunisie</p>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-4 md:mt-0">

                            <button
                                className="px-5 py-2 border rounded-full text-sm font-medium text-red-600 hover:bg-red-100"
                                onClick={() => {
                                    // Ici tu peux gérer la déconnexion, par exemple supprimer un token, rediriger, etc.
                                    alert("Déconnexion en cours...");
                                }}
                            >
                                Se déconnecter
                            </button>
                        </div>
                    </div>

                    {/* Informations personnelles */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Informations personnelles
                            </h3>
                            <button className="px-5 py-2 border rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100">
                                Modifier le mot de passe
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Prénom</p>
                                <p className="text-gray-800 font-medium">Wissal</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Nom</p>
                                <p className="text-gray-800 font-medium">Boulabiar</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Adresse email</p>
                                <p className="text-gray-800 font-medium">
                                    wissal.boulabiar@supcom.tn
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Téléphone</p>
                                <p className="text-gray-800 font-medium">+216 52 011 250</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Programme</p>
                                <p className="text-gray-800 font-medium">INDP2F</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Mot de passe</p>
                                <p className="text-gray-800 font-medium">********</p>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
