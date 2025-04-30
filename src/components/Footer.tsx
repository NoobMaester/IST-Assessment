import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#192733] text-white py-6 mt-auto border-t border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm">
                            © {new Date().getFullYear()} Leave Management System. All rights reserved.
                        </p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="/privacy" className="text-sm text-[#ff5c35] hover:underline">
                            Privacy Policy
                        </a>
                        <a href="/terms" className="text-sm text-[#ff5c35] hover:underline">
                            Terms of Service
                        </a>
                        <a href="/contact" className="text-sm text-[#ff5c35] hover:underline">
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;