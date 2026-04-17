"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 1000,
      backdropFilter: "blur(10px)",
      background: "rgba(15, 23, 42, 0.8)",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 40px",
      color: "white"
    }}>

      {/* Logo */}
      <h2 style={{
        fontWeight: "bold",
        fontSize: "22px",
        background: "linear-gradient(90deg, #38bdf8, #6366f1)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}>
        🎓 EduFlow
      </h2>

      {/* Nav */}
      <nav style={{ display: "flex", gap: "25px" }}>
        {["dashboard", "students", "teachers"].map((item) => (
          <Link 
            key={item}
            href={`/${item}`} 
            style={{
              color: "#cbd5f5",
              textTransform: "capitalize",
              textDecoration: "none",
              fontWeight: "500",
              transition: "0.3s"
            }}
            onMouseOver={(e) => e.target.style.color = "white"}
            onMouseOut={(e) => e.target.style.color = "#cbd5f5"}
          >
            {item}
          </Link>
        ))}
      </nav>

      {/* Profile */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>
        <div style={{
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #6366f1, #22d3ee)"
        }}></div>
      </div>

    </header>
  );
}