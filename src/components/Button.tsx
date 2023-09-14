import "../styles/components/Button.css";
import { btnType } from "../lib/types/button";

const CustomButton = ({
  text,
  type,
  button_type,
  testid,
  handler,
  disabled = false,
}: btnType) => {
  // btn type 지정
  const btnType = ["login", "signup", "add", "delete", "modify"].includes(type)
    ? type
    : "default";

  return (
    <button
      className={["custombtn", `custombtn_${btnType}`].join(" ")}
      type={button_type}
      data-testid={testid}
      onClick={handler}
      disabled={disabled} // disabled 값을 여기에 전달
    >
      {text}
    </button>
  );
};

CustomButton.defaultProps = {
  type: "default",
  disabled: false,
};

export default CustomButton;
