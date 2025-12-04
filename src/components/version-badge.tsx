import { appVersion } from '@/lib/version';

export default function VersionBadge() {
  return (
    <div className="pointer-events-none fixed bottom-8 right-4 z-[500]">
      <span className="pointer-events-auto rounded-full border border-muted bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
        v{appVersion}
      </span>
    </div>
  );
}


