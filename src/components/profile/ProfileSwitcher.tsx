
import { useState } from 'react';
import { useAuth } from '@/App';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const ProfileSwitcher = () => {
  const { profiles, activeProfile, setActiveProfile } = useAuth();
  const [open, setOpen] = useState(false);
  
  if (!activeProfile) return null;
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2 md:pl-3 h-9">
          <Avatar className="h-6 w-6">
            <AvatarImage src={activeProfile.logo} />
            <AvatarFallback>{activeProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="max-w-[100px] truncate hidden md:inline-block">
            {activeProfile.name}
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Switch Organization</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profiles.map((profile) => (
          <DropdownMenuItem
            key={profile.id}
            onClick={() => {
              setActiveProfile(profile);
              setOpen(false);
            }}
            className={`flex items-center gap-2 cursor-pointer ${
              profile.id === activeProfile.id ? 'bg-primary/5' : ''
            }`}
          >
            <Avatar className="h-5 w-5">
              <AvatarImage src={profile.logo} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="truncate flex-1">{profile.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileSwitcher;
