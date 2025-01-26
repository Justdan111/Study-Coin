import * as React from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { Home, Library, Users, ShoppingBag, Settings, Menu, Coins } from 'lucide-react'
import { useMediaQuery } from '../../../hooks'
import { Button } from '../../../components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../../../components/ui/sheet'

const NAV_ITEMS = [
  { name: 'Home', icon: Home, path: '/dashboard' },
  { name: 'Earn', icon: Coins, path: '/dashboard/earn' },
  { name: 'Library', icon: Library, path: '/dashboard/library' },
  { name: 'Community', icon: Users, path: '/dashboard/community' },
  { name: 'Store', icon: ShoppingBag, path: '/dashboard/store' },
  { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
]

export default function DashboardLayout() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const location = useLocation()

  const NavItems = () => (
    <>
      {NAV_ITEMS.map((item) => (
        <Button
          key={item.name}
          variant={location.pathname === item.path ? "default" : "ghost"}
          className={`w-full justify-start ${location.pathname === item.path
            ? "bg-[#2E74E5] text-white hover:bg-[#2E74E5]"
            : ""
            }`}
          asChild
        >
          <Link to={item.path}>
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </Link>
        </Button>
      ))}
    </>
  )

  const DesktopSidebar = () => (
    <div className="w-64 border-r h-full">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6 text-[#2E74E5]">Learnit</h2>
        <nav className="space-y-2 mt-8">
          <NavItems />
        </nav>
      </div>
    </div>
  )

  const MobileSidebar = () => (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="space-y-4 py-4">
          <h2 className="px-4 text-xlg font-bold mb-6 text-[#2E74E5]">Learnit</h2>
          <nav className="space-y-2 mt-8">
            <NavItems />
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )

  return (
    <div className="flex h-screen">
      {isDesktop ? <DesktopSidebar /> : <MobileSidebar />}
      <main className="flex-1 overflow-y-auto px-6 py-2">
        <Outlet />
      </main>
    </div>
  )
}