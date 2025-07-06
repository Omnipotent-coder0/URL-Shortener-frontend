import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Link, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400 rounded-full opacity-50 animate-ping"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-40 animate-pulse"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      {/* Mouse Follower Effect */}
      <div 
        className="absolute pointer-events-none z-10"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          transition: 'all 0.3s ease'
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Header Icon */}
        <div className="mb-8 relative">
          <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-4 rounded-full shadow-2xl">
            <Link className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            SHORTEN
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            YOUR URLS
          </span>
          <br />
          <span className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
            WITH
          </span>
          <br />
          <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
            URL SHORTENER
          </span>
        </h1>

        {/* Subtitle */}
        <div className="mb-12 relative">
          <p className="text-gray-300 text-lg md:text-xl font-medium tracking-wide">
            by{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-bold">
              Nilesh Gautam
            </span>
          </p>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
        </div>

        {/* Features Row */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 max-w-2xl">
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300 text-sm">Lightning Fast</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-gray-300 text-sm">Custom Links</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
            <Link className="w-4 h-4 text-cyan-400" />
            <span className="text-gray-300 text-sm">Analytics</span>
          </div>
        </div>

        {/* Get Started Button */}
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={()=>navigate("/login")}
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
        >
          {/* Button Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Button Border Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 opacity-75 group-hover:opacity-100 blur-sm transition-all duration-300"></div>
          
          {/* Button Content */}
          <div className="relative flex items-center gap-3">
            <span className="text-xl tracking-wide">GET STARTED</span>
            <ArrowRight 
              className={`w-6 h-6 transition-all duration-300 ${
                isHovered ? 'translate-x-2 rotate-12' : ''
              }`} 
            />
          </div>
          
          {/* Hover Effect Sparkles */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full animate-ping"></div>
              <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute bottom-1 left-1 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
              <div className="absolute bottom-1 right-1 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
            </div>
          )}
        </button>

        {/* Additional Info */}
        <p className="text-gray-500 text-sm mt-8 max-w-md">
          Transform your long URLs into short, memorable links with advanced analytics and custom domains.
        </p>
      </div>

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
      
      {/* Animated Lines */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <div className="flex animate-pulse">
          <div className="w-1/3 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          <div className="w-1/3 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
          <div className="w-1/3 h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;