import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ... (imports)

const PricingPage = () => {
    // ... (hooks)

    return (
        <div className="min-h-screen bg-[#030303] flex flex-col">
            <Navbar />
            <div className="flex-1 pt-24 pb-20 px-4">
                {/* ... (existing content) ... */}
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Simple, Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-600">Pricing</span>
                        </h1>
                        <p className="text-xl text-zinc-400">
                            Purchase tokens to unlock premium components. Pay as you go, no subscriptions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {packages.map((pkg, index) => (
                            <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative bg-zinc-900/50 border ${pkg.popular ? 'border-violet-500/50' : 'border-white/10'} rounded-2xl p-8 flex flex-col hover:transform hover:-translate-y-2 transition-all duration-300`}
                            >
                                {pkg.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold text-white mb-2">{pkg.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold text-white">${pkg.price}</span>
                                        <span className="text-zinc-500">/ one-time</span>
                                    </div>
                                    <div className={`mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r ${pkg.color} bg-opacity-10 border border-white/10`}>
                                        <Coins size={16} className="text-white" />
                                        <span className="font-bold text-white">{pkg.tokens} Tokens</span>
                                        {pkg.bonus && <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded text-white">+{pkg.bonus} Bonus</span>}
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {pkg.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-zinc-300">
                                            <Check size={18} className={`mt-0.5 ${pkg.popular ? 'text-violet-400' : 'text-zinc-500'}`} />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant={pkg.popular ? 'primary' : 'secondary'}
                                    className="w-full justify-center"
                                    onClick={() => handlePurchase(pkg)}
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : 'Buy Now'}
                                </Button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Features Grid */}
                    <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-xl text-center">
                            <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="text-amber-500" />
                            </div>
                            <h3 className="text-white font-semibold mb-2">Instant Access</h3>
                            <p className="text-zinc-500 text-sm">Get immediate access to code and assets after purchase.</p>
                        </div>
                        <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-xl text-center">
                            <div className="w-12 h-12 bg-violet-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="text-violet-500" />
                            </div>
                            <h3 className="text-white font-semibold mb-2">Secure Payments</h3>
                            <p className="text-zinc-500 text-sm">All transactions are encrypted and secure.</p>
                        </div>
                        <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-xl text-center">
                            <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="text-pink-500" />
                            </div>
                            <h3 className="text-white font-semibold mb-2">Lifetime Updates</h3>
                            <p className="text-zinc-500 text-sm">Purchase once and get all future updates for free.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PricingPage;
