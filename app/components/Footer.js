import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-slate-300 py-8 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <h2 className="text-white font-bold text-lg">SchoolMS</h2>
          <p className="text-sm">Empowering education through technology.</p>
        </div>

        {/* Links */}
        <nav className="flex gap-6 text-sm">
          <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Support</a>
        </nav>

        {/* Copyright */}
        <div className="text-sm">
          &copy; {currentYear} SchoolMS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
