import css from "./ErrorMessage.module.css";
import { BiError } from "react-icons/bi";

export default function ErrorMessage() {
  return (
    <div className={css.error_wrap}>
      <BiError size={110} />
      <p className={css.error_text}>There was an error, please try again...</p>
    </div>
  );
}
