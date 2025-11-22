import React from 'react';
import Button from './Button';
import ComponentPreview from './ComponentPreview';
import { ArrowRight, Code2, Eye } from 'lucide-react';

const ComponentCard = ({ component, onClick, viewMode = 'grid' }) => {
    const handleMouseMove = (e) => {
        const { currentTarget: target } = e;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
    };

    if (viewMode === 'list') {
        return (
            <div
                className="glass-panel group spotlight-card flex flex-col md:flex-row overflow-hidden rounded-2xl border border-white/5 hover:border-violet-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/10 bg-[#0a0a0a]/60"
                onMouseMove={handleMouseMove}
                onClick={() => onClick(component)}
            >
                <div className="w-full md:w-64 h-48 md:h-auto relative bg-gradient-to-br from-white/5 to-black/50 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
                    <div className="absolute inset-0 bg-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="transform group-hover:scale-105 transition-transform duration-500">
                        <ComponentPreview component={component} />
                    </div>
                </div>
                <div className="p-6 flex flex-col justify-center flex-1">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-violet-300 mb-3">
                                {component.category}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-200 transition-colors">{component.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                                {component.description}
                            </p>
                        </div>
                        <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                            <Button variant="primary" className="!p-3 rounded-full">
                                <ArrowRight size={20} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="glass-panel group spotlight-card h-full flex flex-col rounded-3xl overflow-hidden border border-white/5 hover:border-violet-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/10 bg-[#0a0a0a]/60 hover:-translate-y-1"
            onMouseMove={handleMouseMove}
            onClick={() => onClick(component)}
        >
            {/* Preview Area */}
            <div className="h-64 relative bg-gradient-to-br from-white/5 to-black/50 flex items-center justify-center overflow-hidden border-b border-white/5 group-hover:border-white/10 transition-colors">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="transform group-hover:scale-110 transition-transform duration-700 ease-out w-full flex justify-center relative z-10">
                    <ComponentPreview component={component} />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 z-20">
                    <button className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-md border border-white/10">
                        <Eye size={20} />
                    </button>
                    <button className="p-3 rounded-full bg-violet-600 text-white hover:bg-violet-500 hover:scale-110 transition-all shadow-lg shadow-violet-500/30">
                        <Code2 size={20} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col flex-1 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="mb-auto">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold tracking-wider text-violet-400 uppercase">
                            {component.category}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-200 transition-colors">{component.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors">
                        {component.description}
                    </p>
                </div>

                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-medium text-gray-500 group-hover:text-gray-400 transition-colors">
                    <span>React + Tailwind</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1 text-violet-400 opacity-0 group-hover:opacity-100">
                        View Details <ArrowRight size={12} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ComponentCard;

