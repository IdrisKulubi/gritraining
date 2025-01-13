import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDateTime } from "@/lib/utils";
import type { Registration } from "@/db/schema";

interface RegistrationDetailsDialogProps {
  registration:
    | (Registration & { referredBy?: { name: string } | null })
    | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RegistrationDetailsDialog({
  registration,
  open,
  onOpenChange,
}: RegistrationDetailsDialogProps) {
  if (!registration) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Registration Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-semibold">Name:</span>
            <span className="col-span-3">{registration.name}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-semibold">Email:</span>
            <span className="col-span-3">{registration.email}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-semibold">Phone:</span>
            <span className="col-span-3">{registration.phone}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-semibold">Organization:</span>
            <span className="col-span-3">{registration.organization}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-semibold">Position:</span>
            <span className="col-span-3">{registration.position}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-semibold">Country:</span>
            <span className="col-span-3">{registration.country}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-semibold">Participant Type:</span>
            <span className="col-span-3">{registration.participantType}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-semibold">Referred By:</span>
            <span className="col-span-3">
              {registration.referredBy?.name || "Direct Registration"}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-semibold">Registration Date:</span>
            <span className="col-span-3">
              {formatDateTime(registration.createdAt as Date).dateTime}
            </span>
          </div>
          {registration.additionalInfo && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-semibold">Additional Info:</span>
              <span className="col-span-3">{registration.additionalInfo}</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
