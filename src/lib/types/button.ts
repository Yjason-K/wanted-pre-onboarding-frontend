export interface btnType {
  text: string;
  type: string;
  testid: string;
  button_type: "button" | "submit" | "reset";
  handler: () => void;
}
