import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface PlaceholderModuleProps {
  title: string;
  description: string;
  icon: LucideIcon;
  featureKey: string;
  assignedTo: string;
  targetFolder: string;
  badgeText?: string;
  badgeVariant?: 'default' | 'secondary' | 'warning' | 'clinical' | 'success';
  className?: string;
}

export function PlaceholderModule({
  title,
  description,
  icon: Icon,
  featureKey,
  assignedTo,
  targetFolder,
  badgeText = 'Scaffolding Only',
  badgeVariant = 'secondary',
  className,
}: PlaceholderModuleProps) {
  return (
    <Card className={cn('relative overflow-hidden border-slate-200 hover:border-slate-300', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              <span className="text-xs text-slate-400 font-mono">{featureKey}</span>
            </div>
          </div>
          <Badge variant={badgeVariant}>{badgeText}</Badge>
        </div>
        <CardDescription className="pt-2 text-xs leading-relaxed text-slate-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 pb-3">
        <div className="rounded-lg bg-slate-50 p-2.5 text-xs text-slate-600 space-y-1 font-mono">
          <div className="flex justify-between">
            <span className="text-slate-400">Ownership:</span>
            <span className="font-medium text-slate-700">{assignedTo}</span>
          </div>
          <div className="flex justify-between truncate">
            <span className="text-slate-400">Target Folder:</span>
            <span className="text-slate-500 truncate max-w-[200px]">{targetFolder}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 text-[11px] text-slate-400">
        Architecture ready for parallel development — feature implementation deferred to Phase 2.
      </CardFooter>
    </Card>
  );
}
