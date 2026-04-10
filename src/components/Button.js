import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 border text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200";
  
  const variants = {
    primary: "border-transparent text-white bg-[#5B8DEF] hover:bg-[#4a7bdd] shadow-sm hover:shadow focus:ring-[#5B8DEF]",
    secondary: "border-transparent text-white bg-[#6DD3A0] hover:bg-[#5cbd8d] shadow-sm hover:shadow focus:ring-[#6DD3A0]",
    accent: "border-transparent text-white bg-[#FF8A65] hover:bg-[#e8714b] shadow-sm hover:shadow focus:ring-[#FF8A65]",
    outline: "border-slate-200 text-slate-700 bg-white hover:bg-slate-50 focus:ring-slate-500"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
