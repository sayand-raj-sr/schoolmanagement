import { BookOpen, Users, UserCircle, LayoutDashboard, Search, Bell } from "lucide-react";
import Link from "next/link";
const classes = [
  { name: "Math 101", students: ["Alice", "Bob", "Charlie"], color: "bg-blue-500", },
  { name: "Science 102", students: ["David", "Eve", "Frank"], color: "bg-purple-500",},
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <LayoutDashboard className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Eduflow</h1>
          </div>
          
          
           <nav className="space-y-1">
            <NavItem href="/classes" icon={<BookOpen size={20}/>} label="Classes" active />
            <NavItem href="/students/viewallstudents" icon={<Users size={20}/>} label="Students" />
            <NavItem href="/profile" icon={<UserCircle size={20}/>} label="Profile" />
            </nav>
                    
        </div>

        <div className="mt-auto p-8 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold">JS</div>
            <div>
              <p className="text-sm font-semibold">John Smith</p>
              <p className="text-xs text-slate-500">Premium Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search classes or students..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            />
          </div>
          <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </header>

        <div className="p-10">
          <header className="mb-10">
            <h2 className="text-3xl font-extrabold text-slate-800">Welcome back, Mr. Smith 👋</h2>
            <p className="text-slate-500 mt-2">Here is what's happening with your classes today.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {classes.map((cls) => (
              <div key={cls.name} className="group bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className={`h-2 ${cls.color}`} />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{cls.name}</h3>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider">Semester 1</span>
                    </div>
                   
                  </div>

                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Enrolled Students</h4>
                  <ul className="space-y-3">
                    {cls.students.map((student) => (
                      <li key={student} className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 cursor-default">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-xs font-medium border border-slate-100">
                          {student[0]}
                        </div>
                        {student}
                      </li>
                    ))}
                  </ul>

                  <button className="w-full mt-8 py-3 rounded-xl bg-slate-50 text-slate-700 font-semibold text-sm hover:bg-indigo-600 hover:text-white transition-all">
                    Manage Class
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label, active = false }) {
  return (
    <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
        active 
        ? "bg-indigo-50 text-indigo-600" 
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}