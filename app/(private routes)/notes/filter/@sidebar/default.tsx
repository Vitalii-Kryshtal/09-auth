import Link from "next/link";
import css from "./SidebarNotes.module.css";
import { tagMenu } from "@/constants/constants";

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tagMenu.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
