
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Menu,
  Bell,
  Search,
  X,
  ChevronDown,
  Settings
} from 'lucide-react';
import { useAuth } from '@/App';
import ProfileSwitcher from './profile/ProfileSwitcher';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  return (
    <nav className="bg-card border-b border-border px-4 sm:px-6 lg:px-8 sticky top-0 z-30 flex h-16 items-center">
      <div className="flex-1 flex items-center justify-between">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden flex items-center">
          <SidebarTrigger>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
            </Button>
          </SidebarTrigger>
        </div>
        
        {/* Logo and site title */}
        <div className="flex lg:ml-0 items-center">
          <Link to="/dashboard" className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center mr-2">
              <span className="text-white font-bold">IP</span>
            </div>
            <span className="font-semibold text-lg hidden sm:inline-block">
              InsightPilot
            </span>
          </Link>
        </div>
        
        {/* Desktop search */}
        <div className="hidden md:flex-1 md:flex md:justify-center px-4 lg:px-8">
          <div className="max-w-md w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input 
                type="text" 
                className="h-9 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" 
                placeholder="Search products, insights..." 
              />
            </div>
          </div>
        </div>
        
        {/* Mobile search toggle */}
        <div className="flex md:hidden">
          {showMobileSearch ? (
            <div className="absolute inset-0 bg-card px-4 flex items-center h-16">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <input 
                  type="text" 
                  className="h-9 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm" 
                  placeholder="Search..." 
                  autoFocus
                />
              </div>
              <Button 
                onClick={() => setShowMobileSearch(false)} 
                variant="ghost" 
                size="icon" 
                className="ml-2"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => setShowMobileSearch(true)}
              variant="ghost" 
              size="icon" 
              className="mr-2"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Profile and notifications */}
        <div className="flex items-center">
          <ProfileSwitcher />
          
          <Button variant="ghost" size="icon" className="ml-2">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full ml-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?fit=crop&w=40&h=40" />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="font-normal text-sm text-muted-foreground">Signed in as</div>
                <div className="font-medium">{user?.email}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer flex w-full items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="cursor-pointer">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
