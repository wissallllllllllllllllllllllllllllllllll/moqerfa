"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function Tableau() {
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

    const options: ApexOptions = {
        legend: { show: true, position: "top", horizontalAlign: "left", labels: { colors: ["#374151"] } },
        colors: ["#465FFF"],
        chart: { fontFamily: "Outfit, sans-serif", height: 400, type: "line", toolbar: { show: false } },
        stroke: { curve: "smooth", width: [2] },
        fill: { type: "gradient", gradient: { opacityFrom: 0.6, opacityTo: 0.4 } },
        markers: { size: 4, strokeColors: "#fff", strokeWidth: 2, hover: { size: 7 } },
        grid: { borderColor: "#E5E7EB", xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
        dataLabels: { enabled: false },
        tooltip: { enabled: true, x: { format: "MMM" } },
        xaxis: {
            type: "category",
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            axisBorder: { show: false },
            axisTicks: { show: false },
            tooltip: { enabled: false },
            labels: { style: { fontSize: "12px", colors: "#6B7280" } },
        },
        yaxis: { labels: { style: { fontSize: "12px", colors: "#6B7280" } } },
    };

    const subjects = [

        {
            name: "Computer Vision",
            students: [
                { name: "Wissal", data: [150, 160, 140, 145, 150, 155, 160, 180, 200, 190, 210, 220] },
                { name: "Yassine", data: [140, 150, 130, 135, 145, 150, 155, 170, 190, 180, 200, 210] },
            ],
        },
        {
            name: "Python pour AI",
            students: [
                { name: "Wissal", data: [200, 210, 220, 230, 240, 235, 245, 250, 260, 270, 280, 290] },
                { name: "Yassine", data: [190, 200, 210, 220, 230, 225, 235, 240, 20, 20, 20, 10] },
            ],
        },
    ];

    const averageSeries = [
        {
            name: "Progression Moyenne",
            data: subjects[0].students[0].data.map((_, index) =>
                Math.round(
                    subjects.reduce(
                        (sum, subject) =>
                            sum +
                            subject.students.reduce((s, student) => s + student.data[index], 0) /
                            subject.students.length,
                        0
                    ) / subjects.length
                )
            ),
        },
    ];

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 px-4 py-16 md:px-8 md:py-20">
                <div className="container mx-auto max-w-7xl">
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Votre tableau de bord</h1>
                        <p className="text-gray-200 max-w-4xl leading-relaxed">
                            Visualisez la moyenne générale et consultez la progression de chaque étudiant.
                        </p>
                    </header>

                    <section className="flex flex-col gap-12">
                        {/* Chart Moyenne */}
                        <article className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col w-full">
                            <h2 className="text-2xl font-semibold mb-2 text-indigo-700">Moyenne Générale</h2>
                            <p className="mb-6 text-gray-700 leading-relaxed">
                                Visualisation de la moyenne générale de progression.
                            </p>
                            <Chart options={options} series={averageSeries} type="line" height={400} />
                        </article>

                        {/* Sélection matière + étudiant */}
                        <article className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col w-full">
                            <h2 className="text-2xl font-semibold mb-2 text-indigo-700">
                                Sélectionner une matière et un étudiant
                            </h2>

                            <div className="flex flex-col md:flex-row gap-4 mb-6">
                                <select
                                    className="p-3 border border-gray-300 rounded-md flex-1"
                                    value={selectedSubject || ""}
                                    onChange={(e) => {
                                        setSelectedSubject(e.target.value === "" ? null : e.target.value);
                                        setSelectedStudent(null);
                                    }}
                                >
                                    <option value="">-- Choisir une matière --</option>
                                    {subjects.map((subject, index) => (
                                        <option key={index} value={subject.name}>
                                            {subject.name}
                                        </option>
                                    ))}
                                </select>

                                {selectedSubject && (
                                    <select
                                        className="p-3 border border-gray-300 rounded-md flex-1"
                                        value={selectedStudent || ""}
                                        onChange={(e) =>
                                            setSelectedStudent(e.target.value === "" ? null : e.target.value)
                                        }
                                    >
                                        <option value="">-- Choisir un étudiant --</option>
                                        {subjects
                                            .find((s) => s.name === selectedSubject)
                                            ?.students.map((student, index) => (
                                                <option key={index} value={student.name}>
                                                    {student.name}
                                                </option>
                                            ))}
                                    </select>
                                )}
                            </div>

                            {selectedSubject && selectedStudent && (
                                <div>
                                    {subjects
                                        .find((s) => s.name === selectedSubject)
                                        ?.students.filter((st) => st.name === selectedStudent)
                                        .map((student, index) => (
                                            <div key={index}>
                                                <h3 className="text-xl font-semibold mb-2 text-indigo-600">
                                                    {student.name} - {selectedSubject}
                                                </h3>
                                                <Chart
                                                    options={options}
                                                    series={[{ name: "Progression", data: student.data }]}
                                                    type="line"
                                                    height={400}
                                                />
                                            </div>
                                        ))}
                                </div>
                            )}
                        </article>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
