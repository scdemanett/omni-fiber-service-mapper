'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Upload,
  Filter,
  Play,
  Map,
  LayoutDashboard,
  Lock,
  TrendingUp,
  Globe,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { getNavStats } from '@/app/actions/stats';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface NavStats {
  hasSources: boolean;
  hasSelections: boolean;
  sourceCount: number;
  selectionCount: number;
}

export function Navigation() {
  const pathname = usePathname();
  const [stats, setStats] = useState<NavStats>({
    hasSources: false,
    hasSelections: false,
    sourceCount: 0,
    selectionCount: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getNavStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to load nav stats:', error);
      }
    };

    loadStats();

    // Refresh stats when navigating
    const interval = setInterval(loadStats, 5000);
    return () => clearInterval(interval);
  }, [pathname]);

  const navItems = [
    { 
      href: '/', 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      enabled: true,
    },
    { 
      href: '/upload', 
      label: 'Upload', 
      icon: Upload,
      enabled: true,
    },
    { 
      href: '/selections', 
      label: 'Selections', 
      icon: Filter,
      enabled: stats.hasSources,
      disabledReason: 'Upload a GeoJSON source first',
    },
    { 
      href: '/checker', 
      label: 'Checker', 
      icon: Play,
      enabled: stats.hasSelections,
      disabledReason: 'Create a selection first',
    },
    { 
      href: '/map', 
      label: 'Map', 
      icon: Map,
      enabled: stats.hasSelections,
      disabledReason: 'Create a selection first',
    },
    { 
      href: '/progress', 
      label: 'Progress', 
      icon: TrendingUp,
      enabled: stats.hasSelections,
      disabledReason: 'Create a selection first',
    },
  ];

  return (
    <TooltipProvider>
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto">
          <div className="flex h-16 items-center justify-between px-4">
            <Link 
              href="/" 
              className="flex items-center gap-3 transition-opacity hover:opacity-80"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Globe className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight">
                  Omni Fiber
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Service Mapper
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                const isDisabled = !item.enabled;

                if (isDisabled) {
                  return (
                    <Tooltip key={item.href}>
                      <TooltipTrigger asChild>
                        <div
                          className="flex cursor-not-allowed items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground/50"
                        >
                          <Icon className="h-4 w-4" />
                          <span className="hidden sm:inline">{item.label}</span>
                          <Lock className="h-3 w-3" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.disabledReason}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}
