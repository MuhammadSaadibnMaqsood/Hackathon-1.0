import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    // Assuming Poppins or Inter font is handled globally by the project setup.

    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-gray-500 pt-16 border-t border-blue-200">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-10">

                {/* 1. Brand and Mission Statement */}
                <div className="lg:col-span-2">
                    <a href="/">
                        {/* Placeholder Logo: Replace with your actual image or SVG */}
                        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-md">
                            <img src="/Logo.png" alt="" />
                        </div>
                    </a>
                    <p className="text-base font-bold text-blue-800 mb-2">NEXUS Hospital & Health Network</p>
                    <p className="text-sm/7 mt-4 max-w-md">
                        Standing as a beacon of hope and healing, providing accessible, high-quality, 
                        and ethical healthcare services to all in the region.
                    </p>
                </div>

                {/* 2. Quick Navigation Links */}
                <div className="flex flex-col">
                    <div className="flex flex-col text-sm space-y-3">
                        <h2 className="font-bold mb-4 text-gray-800 uppercase tracking-wider">Quick Links</h2>
                        <a className="hover:text-blue-600 transition" href="#">About NEXUS</a>
                        <a className="hover:text-blue-600 transition" href="#">Services Offered</a>
                        <a className="hover:text-blue-600 transition" href="#">Latest News</a>
                        <a className="hover:text-blue-600 transition" href="#">Contact Us</a>
                    </div>
                </div>

                {/* 3. Contact Information (Replaces Newsletter) */}
                <div className="flex flex-col">
                    <h2 className="font-bold mb-4 text-gray-800 uppercase tracking-wider">Get in Touch</h2>
                    <div className="text-sm space-y-4">
                        
                        <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0 mt-1" />
                            <p>
                                123 Healthway Blvd, Central District, 
                                City, Pakistan, 75500
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-teal-600 flex-shrink-0" />
                            <a href="tel:+92123456789" className="hover:text-blue-600 transition">+92 123 456789 (Emergency)</a>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-teal-600 flex-shrink-0" />
                            <a href="mailto:info@nexushospital.org" className="hover:text-blue-600 transition">info@nexushospital.org</a>
                        </div>
                    </div>
                </div>

            </div>

            {/* Copyright Section */}
            <div className="py-6 text-center border-t mt-6 border-blue-200">
                <p className="text-xs text-gray-600">
                    Copyright 2025 © NEXUS Hospital & Health Network. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
