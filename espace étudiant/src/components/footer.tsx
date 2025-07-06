"use client";
import { Typography, IconButton } from "@material-tailwind/react";

const LIENS = ["À propos", "Carrières", "Presse", "Blog", "Tarifs"];
const ANNEE_COURANTE = new Date().getFullYear();

export function Footer() {
  return (
      <footer className="mt-10 bg-gray-900 px-8 pt-12">
        <div className="container mx-auto">

              <Typography color="white" className="mb-12 font-normal">
                SmartPathAI est une plateforme éducative intelligente conçue pour accompagner la croissance du nombre d’étudiants et la diversité des parcours en école d’ingénieurs. Elle vise à offrir un suivi pédagogique personnalisé et adaptatif, centré sur les besoins spécifiques des étudiants de SUP’Com.<br/>

                Le projet met en place une base de connaissances intelligente des cours, un système de suivi individualisé et une évaluation augmentée par l’intelligence artificielle permettant de générer automatiquement des QCM et des résumés. Les enseignants disposent d’un tableau de bord interactif pour visualiser la progression de chaque étudiant, recevoir des alertes personnalisées et ajuster leur accompagnement.<br />

                Un module de recommandation de contenus suggère des ressources adaptées au profil et au rythme de l’apprenant pour favoriser sa réussite. La plateforme accorde une importance particulière à la protection des données personnelles des étudiants grâce à un système d’authentification sécurisé et conforme aux bonnes pratiques de confidentialité.
              </Typography>


          <div className="mt-16 flex flex-wrap items-center justify-center gap-y-4 gap-x-8 border-t border-gray-700 py-7 md:justify-between">
            <Typography
                color="white"
                className="text-center font-normal opacity-75"
            >
              &copy; {ANNEE_COURANTE} SmartPathAI — Plateforme open source pour le suivi pédagogique intelligent.
            </Typography>


          </div>
        </div>
      </footer>
  );
}

export default Footer;
