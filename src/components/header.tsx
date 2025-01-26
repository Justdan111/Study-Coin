import { CircleUserRound, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function DesktopTitlebar({ pageTitle }: { pageTitle: string }) {
  const navigate = useNavigate();


  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 border-b border-gray-200 sticky top-0 bg-white">
        <h2 className="text-lg font-semibold text-[#2E74E5]">
          {pageTitle}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Flame className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => navigate('/dashboard/settings')}
          >
            <CircleUserRound className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex flex-row justify-between items-center px-6 lg:px-4 py-4 sticky top-0 left-0 border-b border-gray-200 bg-white z-10">
        <h2 className="text-xl lg:text-2xl font-semibold text-[#2E74E5]">
          {pageTitle}
        </h2>
        <div className="flex flex-row items-center gap-3 lg:gap-5">
          <Button
            variant="outline"
            size="icon"
            className="relative hover:bg-gray-100"
          >
            <Flame className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="relative hover:bg-gray-100"
            onClick={() => navigate('/dashboard/settings')}
          >
            <CircleUserRound className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}