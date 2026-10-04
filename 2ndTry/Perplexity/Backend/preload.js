import dns from 'node:dns'

// Render (aur kai hosts) pe outbound IPv6 nahi hota — Gmail SMTP jaisi
// services ke IPv6-first DNS resolution ki wajah se ENETUNREACH aata hai.
// Ye file server.js se alag, --import flag ke zariye load hoti hai, taake
// ye setting ES module import-hoisting se pehle guaranteed apply ho jaye.
dns.setDefaultResultOrder('ipv4first')