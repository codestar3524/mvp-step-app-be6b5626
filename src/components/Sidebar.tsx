
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Package,
  Lightbulb,
  BarChart3,
  Settings,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const mainMenuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      title: 'Products',
      icon: Package,
      path: '/products',
    },
    {
      title: 'Innovation',
      icon: Lightbulb,
      path: '/innovation',
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      path: '/analytics',
    },
    {
      title: 'Settings',
      icon: Settings,
      path: '/settings',
    },
  ];
  
  const helpMenuItems = [
    {
      title: 'Documentation',
      icon: ExternalLink,
      path: '#',
    },
    {
      title: 'Help & Support',
      icon: HelpCircle,
      path: '#',
    },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <SidebarComponent>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "flex items-center gap-2",
                      isActive(item.path) ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                    )}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {helpMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "flex items-center gap-2",
                      isActive(item.path) ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                    )}
                  >
                    <Link to={item.path}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;
