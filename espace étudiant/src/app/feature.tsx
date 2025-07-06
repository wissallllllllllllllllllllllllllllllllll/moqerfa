"use client";

import React from "react";
import { Typography } from "@material-tailwind/react";

import {
  CpuChipIcon,
  ChartBarIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserGroupIcon,
  DocumentChartBarIcon,
  BellAlertIcon,
} from "@heroicons/react/24/solid";

import FeatureCard from "../components/feature-card";

const FEATURES = [


  {
    icon: ShieldCheckIcon,
    title: "Sécurité et Confidentialité",
    children:
        "Vos données sont protégées par une authentification OAuth2 et Firebase Auth, garantissant la confidentialité et la sécurité de vos informations personnelles.",
  },
  {
    icon: SparklesIcon,
    title: "Base de Connaissances Intelligente",
    children:
        "Accédez à une base de connaissances vectorielle avancée qui utilise des embeddings pour une recherche et une récupération d'informations optimisées.",
  },
  {
    icon: UserGroupIcon,
    title: "Dashboard Enseignant",
    children:
        "Interface dédiée aux enseignants pour le suivi des étudiants, la visualisation des performances de classe et la gestion des contenus pédagogiques.",
  },

  {
    icon: BellAlertIcon,
    title: "Alertes Personnalisées",
    children:
        "Recevez des notifications intelligentes en cas d'inactivité, de stagnation ou pour des recommandations d'amélioration de votre parcours d'apprentissage.",
  },
];

export function Features() {
  return (
      <section className="py-28 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto mb-20 text-center">
          <Typography color="blue-gray" className="mb-2 font-bold uppercase">
            SmartPathAI pour SUP'Com
          </Typography>
          <Typography variant="h1" color="blue-gray" className="mb-4">
            Plateforme Éducative Intelligente
          </Typography>
          <Typography
              variant="lead"
              className="mx-auto w-full px-4 !text-gray-600 lg:w-11/12 lg:px-8"
          >
            Découvrez une approche révolutionnaire de l'apprentissage avec notre plateforme
            propulsée par l'IA. SmartPathAI offre un suivi pédagogique personnalisé, des
            évaluations adaptatives et des outils d'analyse avancés pour optimiser votre
            parcours éducatif à SUP'Com.
          </Typography>
        </div>
        <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-4 gap-y-12 md:grid-cols-2">
          {FEATURES.map((props, idx) => (
              <FeatureCard key={idx} {...props} />
          ))}
        </div>

        {/* Section technologies */}
        <div className="container mx-auto mt-20 max-w-4xl">
          <div className="text-center mb-12">
            <Typography variant="h3" color="blue-gray" className="mb-4">
              Technologies de Pointe
            </Typography>
            <Typography variant="lead" className="text-gray-600">
              SmartPathAI s'appuie sur un écosystème technologique moderne et robuste
            </Typography>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
              </div>
              <Typography variant="small" className="text-gray-600">
                Backend performant
              </Typography>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <Typography variant="small" className="text-gray-600">
                Modèles IA/ML
              </Typography>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
              </div>
              <Typography variant="small" className="text-gray-600">
                Base de données
              </Typography>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>

              <Typography variant="small" className="text-gray-600">
                Datavisualisation
              </Typography>
            </div>
          </div>
        </div>
      </section>
  );
}

export default Features;