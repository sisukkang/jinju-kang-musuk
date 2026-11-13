import { RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { demoActions } from "@/lib/demo-store";
import { ConfirmButton } from "./ConfirmButton";

/** 우측 하단 플로팅 [데모 데이터 초기화] 버튼 */
export function ResetDemoButton() {
  return (
    <div className="fixed right-5 bottom-5 z-50 sm:right-8 sm:bottom-8">
      <ConfirmButton
        title="데모 데이터를 초기화할까요?"
        description="작성한 공지, 추가한 행사, 참석 신청이 모두 지워지고 처음 샘플 상태로 돌아갑니다."
        confirmLabel="초기화"
        onConfirm={() => {
          demoActions.reset();
          toast.success("데모 데이터가 초기 상태로 돌아갔습니다.");
        }}
        trigger={
          <Button variant="seal" size="xl" className="h-14 rounded-full px-6 text-[0.95rem]">
            <RotateCcw className="size-5!" /> 데모 데이터 초기화
          </Button>
        }
      />
    </div>
  );
}
