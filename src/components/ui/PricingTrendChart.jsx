import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, Info } from 'lucide-react';

const PricingTrendChart = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Data points: value is roughly percentage of max height for the graph
    // price is the display value
    const data = [
        { month: 'Aug', value: 40, price: '45.0M' },
        { month: 'Sep', value: 45, price: '48.2M' },
        { month: 'Oct', value: 42, price: '47.5M' },
        { month: 'Nov', value: 55, price: '52.1M' },
        { month: 'Dec', value: 65, price: '55.8M' },
        { month: 'Jan', value: 80, price: '60.5M' },
    ];

    // Chart dimensions
    const width = 800;
    const height = 300;
    const padding = 40;

    // Calculate points
    const points = data.map((item, index) => {
        const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
        const y = height - (item.value / 100) * (height - padding * 2) - padding;
        return { x, y, ...item };
    });

    // Create svg path (smooth curve)
    // Simple catmull-rom-like smoothing or simple straight lines for reliability
    // Using simple cubic bezier for "smooth" feel:
    // For p(i), control points are based on p(i-1) and p(i+1)

    // Let's use a simpler approach: Linear segments look techy/clean (or a library-less smooth curve generation is complex to get bug-free in one shot)
    // Actually, straight lines with rounded corners (stroke-linejoin="round") looks modern.
    // Let's generate the "d" attribute.

    const pathD = points.map((p, i) =>
        (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)
    ).join(' ');

    const areaD = `${pathD} L ${width - padding} ${height} L ${padding} ${height} Z`;

    return (
        <div className="w-full bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">Market Value Trends</h3>
                    <p className="text-gray-500 text-sm mt-1">Average Property Price • Colombo</p>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full text-green-700 font-bold text-sm border border-green-100">
                    <TrendingUp size={16} />
                    <span>+15.2% Growth</span>
                </div>
            </div>

            <div className="relative w-full aspect-[2/1] md:aspect-[3/1] select-none">
                {/* SVG Chart */}
                <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                    {/* Gradient Definition */}
                    <defs>
                        <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00FF00" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#00FF00" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Grid Lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
                        const y = height - padding - tick * (height - padding * 2);
                        return (
                            <line key={tick} x1={padding} y1={y} x2={width - padding} y2={y} stroke="#f3f4f6" strokeWidth="1" />
                        );
                    })}

                    {/* Area Fill */}
                    <motion.path
                        d={areaD}
                        fill="url(#gradientArea)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    />

                    {/* Line Stroke */}
                    <motion.path
                        d={pathD}
                        fill="none"
                        stroke="#00FF00"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    {/* Data Points */}
                    {points.map((p, i) => (
                        <g key={i}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{ cursor: 'pointer' }}
                        >
                            {/* Invisible larger hit area for easier hovering */}
                            <circle cx={p.x} cy={p.y} r="20" fill="transparent" />

                            <motion.circle
                                cx={p.x}
                                cy={p.y}
                                r="6"
                                fill="white"
                                stroke="#00ff00"
                                strokeWidth="3"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: 1 + i * 0.1, type: "spring" }}
                                animate={{
                                    scale: hoveredIndex === i ? 1.5 : 1,
                                    strokeWidth: hoveredIndex === i ? 4 : 3
                                }}
                            />
                        </g>
                    ))}
                </svg>

                {/* Tooltips (Overlayed HTML for easier text styling/z-index) */}
                {hoveredIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bg-gray-900 text-white text-xs font-bold py-2 px-3 rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2"
                        style={{
                            left: `${(points[hoveredIndex].x / width) * 100}%`,
                            top: `${(points[hoveredIndex].y / height) * 100}%`,
                            marginTop: '-50px' // adjust vertical positioning
                        }}
                    >
                        <div className="flex flex-col items-center">
                            <span className="text-gray-400 text-[10px] uppercase mb-1">{points[hoveredIndex].month}</span>
                            <span className="text-sm">Rs. {points[hoveredIndex].price}</span>
                        </div>
                        {/* Tooltip arrow */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </motion.div>
                )}

                {/* Bottom Labels */}
                <div className="absolute bottom-0 left-0 w-full flex justify-between px-[5%] text-gray-400 text-xs font-medium">
                    {data.map((d, i) => (
                        <span key={i}>{d.month}</span>
                    ))}
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                    <Info size={14} />
                    <span>Based on verified listing data</span>
                </div>
                <button className="flex items-center gap-1 text-black font-bold hover:text-gray-700 transition-colors">
                    Full Market Report <ArrowUpRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default PricingTrendChart;
