export default function TestNeon() {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8">
            <button className="group relative px-12 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white transition-all duration-300 hover:scale-105 overflow-visible">
                {/* Neon glow effect */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

                {/* Button content */}
                <span className="relative z-10 flex items-center gap-2 tracking-wide">
                    GET STARTED
                    <span className="text-xl">&gt;</span>
                </span>
            </button>
        </div>
    );
}
