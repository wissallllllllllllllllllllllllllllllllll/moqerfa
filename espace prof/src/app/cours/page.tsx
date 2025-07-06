"use client";
import React, { useState } from "react";
import { Upload, Trash2, FileText, BookOpen, Plus } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const initialSubjects = [
    {
        name: "Machine Learning",
        courses: [
            { title: "Introduction au ML.pdf" },
            { title: "Régression linéaire.pptx" },
        ],
    },
    {
        name: "Python pour l'IA",
        courses: [{ title: "Bases de Python.pdf" }],
    },
];

export default function EspaceProf() {
    const [subjects, setSubjects] = useState(initialSubjects);
    const [selectedFiles, setSelectedFiles] = useState(initialSubjects.map(() => null));

    const handleFileChange = (subjectIndex, file) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles[subjectIndex] = file;
        setSelectedFiles(updatedFiles);
    };

    const handleUploadCourse = (subjectIndex) => {
        const file = selectedFiles[subjectIndex];
        if (file) {
            const updatedSubjects = [...subjects];
            updatedSubjects[subjectIndex].courses.push({ title: file.name });
            setSubjects(updatedSubjects);

            const updatedFiles = [...selectedFiles];
            updatedFiles[subjectIndex] = null;
            setSelectedFiles(updatedFiles);

            alert(`Cours "${file.name}" ajouté à ${subjects[subjectIndex].name}`);
        }
    };

    const handleDeleteCourse = (subjectIndex, courseIndex) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[subjectIndex].courses.splice(courseIndex, 1);
        setSubjects(updatedSubjects);
    };

    const getFileIcon = (fileName) => {
        const extension = fileName.split(".").pop().toLowerCase();
        if (extension === "pdf") return "📄";
        if (extension === "pptx" || extension === "ppt") return "📊";
        if (extension === "docx" || extension === "doc") return "📝";
        return "📋";
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 px-8 py-20">
                <div className="container mx-auto max-w-6xl">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                            Gérez vos Cours
                        </h1>

                    </div>

                    {/* Subjects */}
                    <div className="grid gap-8 md:gap-12">
                        {subjects.map((subject, subjectIndex) => (
                            <div key={subject.name} className="group">
                                <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                                    {/* Subject Header */}
                                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-white/30 rounded-full p-3">
                                                <BookOpen className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-3xl font-bold text-white mb-2">
                                                    {subject.name}
                                                </h2>
                                                <p className="text-white/80">
                                                    {subject.courses.length} cours disponible
                                                    {subject.courses.length > 1 ? "s" : ""}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        {/* Courses List */}
                                        <div className="mb-8">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                                <FileText className="w-5 h-5" />
                                                Cours existants
                                            </h3>
                                            <div className="space-y-3">
                                                {subject.courses.map((course, courseIndex) => (
                                                    <div
                                                        key={courseIndex}
                                                        className="group/item bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 transition-all duration-300"
                                                    >
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-2xl">{getFileIcon(course.title)}</span>
                                                                <span className="text-gray-800 font-medium">{course.title}</span>
                                                            </div>
                                                            <button
                                                                onClick={() => handleDeleteCourse(subjectIndex, courseIndex)}
                                                                className="px-5 py-2 border rounded-full text-sm font-medium text-red-600 hover:bg-red-100"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Upload Section */}
                                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                                <Plus className="w-5 h-5" />
                                                Ajouter un nouveau cours
                                            </h3>
                                            <div className="flex flex-col lg:flex-row gap-4">
                                                <div className="flex-1">
                                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                                        Sélectionner un fichier
                                                    </label>
                                                    <input
                                                        type="file"
                                                        onChange={(e) =>
                                                            handleFileChange(subjectIndex, e.target.files[0])
                                                        }
                                                        className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                                    />
                                                </div>
                                                <div className="flex items-end">
                                                    <button
                                                        onClick={() => handleUploadCourse(subjectIndex)}
                                                        disabled={!selectedFiles[subjectIndex]}
                                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                                                    >
                                                        <Upload className="w-5 h-5" />
                                                        Télécharger
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
