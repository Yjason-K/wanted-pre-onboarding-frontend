export interface btnType {
  text: string;
  type: string;
  testid: string;
  button_type: "button" | "submit" | "reset";
  handler: () => void;
  disabled?: boolean; // 선택적 속성으로 추가
}
