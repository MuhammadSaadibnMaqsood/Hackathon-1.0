import React from "react";
import Counter from "./Counter";

const Stats = () => {
  return (
    <div className="py-20 px-4 md:px-12">
      <div 
        // Main container: Responsive layout, professional colors
        className="max-w-7xl mx-auto flex flex-col lg:flex-row 
                   items-center justify-between gap-8 
                   p-8 md:p-12 rounded-3xl shadow-2xl bg-white border border-blue-50"
      >
        {/* === LEFT COLUMN (Stats 1 & 2) === */}
        <div className="w-full lg:w-[35%] grid grid-cols-2 lg:grid-cols-1 gap-8">
          <StatCard 
            title="Patient Benefit per month" 
            endValue={500} 
            suffix="k" 
          />
          <StatCard 
            title="Children with cancer treated" 
            endValue={14} 
            suffix="k" 
          />
        </div>

        {/* === CENTER SECTION (Image/Logo) === */}
        <div className="flex items-center justify-center w-[50%] lg:w-[30%] order-first lg:order-none mb-8 lg:mb-0">
          <img
            src="https://indushospital.org.pk/wp-content/uploads/2022/11/sdg-logo.png"
            alt="SDG Partner Logo"
            className="w-32 h-32 md:w-48 md:h-48 object-contain"
          />
        </div>

        {/* === RIGHT COLUMN (Stats 3 & 4) === */}
        <div className="w-full lg:w-[35%] grid grid-cols-2 lg:grid-cols-1 gap-8">
          <StatCard 
            title="Cost to patient & their family" 
            endValue={0} 
            prefix="$" // Assuming cost is zero
          />
          <StatCard 
            title="Hospital across Pakistan" 
            endValue={12} 
          />
        </div>
      </div>
    </div>
  );
};

// --- Helper Component for Consistent Stat Styling ---
const StatCard = ({ title, endValue, prefix = "", suffix = "" }) => (
    <div 
        className="text-center p-4 bg-blue-50/50 rounded-xl transition-all duration-300 hover:shadow-lg border border-blue-100"
    >
        <h2 className="text-4xl md:text-5xl font-extrabold text-teal-600 mb-2">
            {prefix}
            <Counter endValue={endValue} />
            {suffix}
        </h2>
        <p className="text-sm font-medium text-gray-700 uppercase tracking-wider">
            {title}
        </p>
    </div>
);

export default Stats;