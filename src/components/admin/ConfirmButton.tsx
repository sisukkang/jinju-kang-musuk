import type { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";

export function ConfirmButton({
  trigger,
  title,
  description,
  confirmLabel = "삭제",
  onConfirm,
}: {
  trigger: ReactNode;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="bg-card">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-serif text-xl">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-base">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="h-11 text-base">취소</AlertDialogCancel>
          <AlertDialogAction className={buttonVariants({ variant: "destructive", className: "h-11 text-base" })} onClick={onConfirm}>
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
