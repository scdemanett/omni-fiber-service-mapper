'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Globe, Activity, LayoutDashboard, Map } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { usePolling } from '@/lib/polling-context';
import { useState, useEffect } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function Navigation() {
  const pathname = usePathname();
  const { pollingEnabled, setPollingEnabled } = usePolling();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/map', label: 'Map', icon: Map },
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
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                <Globe className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight">
                  Omni Fiber
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Service Map
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              {mounted ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2">
                      <Switch
                        id="global-polling"
                        checked={pollingEnabled}
                        onCheckedChange={setPollingEnabled}
                        className="data-[state=checked]:bg-primary"
                      />
                      <label
                        htmlFor="global-polling"
                        className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Activity className={cn('h-3.5 w-3.5', pollingEnabled && 'text-primary')} />
                        <span className="hidden sm:inline">Live Updates</span>
                      </label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{pollingEnabled ? 'Disable' : 'Enable'} automatic map refresh</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-9 rounded-full bg-input" />
                  <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                    <Activity className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Live Updates</span>
                  </div>
                </div>
              )}

              <div className="h-8 w-px bg-border" />

              <nav className="flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
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
        </div>
      </header>
    </TooltipProvider>
  );
}
