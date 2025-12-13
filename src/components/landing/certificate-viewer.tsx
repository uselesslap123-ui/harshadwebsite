
"use client";

import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface CertificateViewerProps {
  imageUrl: string | null;
  onClose: () => void;
}

export function CertificateViewer({ imageUrl, onClose }: CertificateViewerProps) {
  return (
    <Dialog open={!!imageUrl} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0">
        {imageUrl && (
            <div className="relative aspect-[4/3]">
                <Image
                    src={imageUrl}
                    alt="Certificate"
                    fill
                    className="object-contain"
                />
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
