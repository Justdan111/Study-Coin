import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Slide {
  title: string;
  subtitle?: string;
  image?: string;
  extraContent?: React.ReactNode;
  showPrevArrow?: boolean;
  showNextArrow?: boolean;
  autoAdvance?: boolean;
}

const slides: Slide[] = [
  {
    title: "Every task has a reward. \nWelcome to StudyCoin, where academic activities meet rewards",
    showPrevArrow: false,
    showNextArrow: false,
    autoAdvance: true
  },
  {
    image: "/images/Dayflow.png",
    subtitle: "Earn 0.01 points per class",
    title: "",
    showPrevArrow: false,
    showNextArrow: true,
    autoAdvance: true
  },
  {
    image: "/images/Allura.png",
    subtitle: "Earn points for early tune-ins",
    title: "",
    showPrevArrow: true,
    showNextArrow: true,
    autoAdvance: true
  },
  {
    title: "Every study clock is a mining clock",
    subtitle: "Earn 0.01 points per class",
    extraContent: (
      <div className="flex justify-center gap-20 mt-8">
        <div className="text-center">
          <img src="/images/book.png" alt="Book icon" width={100} height={100} className="text-[#0066FF]" />
          <p className="text-[#0066FF]">Mining as you read alone</p>
        </div>
        <div className="text-center">
          <img src="/images/studygroup.png" alt="Group study icon" width={150} height={150} />
          <p className="text-[#0066FF]">Earn for group study</p>
        </div>
      </div>
    ),
    showPrevArrow: true,
    showNextArrow: true,
    autoAdvance: true
  },
];

export default function OnboardingCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (slides[currentSlide].autoAdvance) {
      timer = setTimeout(() => {
        nextSlide();
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      navigate('/login');
    } else {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const { title, subtitle, image, extraContent, showPrevArrow, showNextArrow } = slides[currentSlide];

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-2xl mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h1 className="text-[#0066FF] text-3xl font-medium mb-4">{title}</h1>
        </div>

        <div className="flex flex-col items-center relative">
          {image && (
            <div className="relative w-full h-64">
              <img src={image} alt={`Slide ${currentSlide + 1}`} className="object-contain w-full h-full" />
            </div>
          )}
          {extraContent}
          {subtitle && (
            <p className="text-[#0066FF] text-xl whitespace-pre-line mt-4 mb-8">{subtitle}</p>
          )}

          <NavigationArrows
            onPrevClick={prevSlide}
            onNextClick={nextSlide}
            showPrev={showPrevArrow || false}
            showNext={showNextArrow || false}
          />
        </div>

        <DotNavigation 
          totalDots={slides.length} 
          activeDot={currentSlide} 
          onDotClick={setCurrentSlide} 
        />
      </div>
    </div>
  );
}

// Updated NavigationArrows Component
interface NavigationArrowsProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  showPrev: boolean;
  showNext: boolean;
}

function NavigationArrows({ onPrevClick, onNextClick, showPrev, showNext }: NavigationArrowsProps) {
  return (
    <div className="absolute top-1/2 -left-16 -right-16 transform -translate-y-1/2 flex items-center justify-between">
      {showPrev ? (
        <button 
          onClick={onPrevClick} 
          className="text-[#0066FF] text-2xl z-10"
        >
          <img 
            src="images/leftarrow.png" 
            alt="left" 
            className="w-6 h-6 object-contain" 
          />
        </button>
      ) : (
        <div className="w-8"></div>
      )}
      
      {showNext && (
        <button 
          onClick={onNextClick} 
          className="text-[#0066FF] text-2xl z-10 ml-auto"
        >
          <img 
            src="images/rightarrow.png" 
            alt="arrow" 
            className="w-8 h-8 object-contain" 
          />
        </button>
      )}
    </div>
  );
}

// DotNavigation Component (unchanged)
interface DotNavigationProps {
  totalDots: number;
  activeDot: number;
  onDotClick: (index: number) => void;
}

function DotNavigation({ totalDots, activeDot, onDotClick }: DotNavigationProps) {
  return (
    <div className="flex justify-center mt-8">
      {Array.from({ length: totalDots }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-3 h-3 rounded-full mx-1 ${
            index === activeDot ? "bg-[#0066FF]" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}