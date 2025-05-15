
import { Helmet } from "react-helmet-async";
import "./NotFoundPage.css";
import { useTranslation } from "react-i18next";
import Link from "next/link";

interface Not_found_page {
  title: string;
  header: string;
  content: string;
  link_text: string;
}
const NotFoundPage = () => {
  const { t } = useTranslation();
  const not_found_page = t("not_found_page", {
    returnObjects: true,
  }) as Not_found_page;
  return (
    <>
      <div id="not-found-page">
        <Helmet>
          <title>{not_found_page.title}</title>
          <meta
            name="description"
            content="The page you are looking for does not exist."
          />
        </Helmet>
        <div className="centered">
          <h1>{not_found_page.header}</h1>
          <p>{not_found_page.content}</p>
          <Link
            href="/"
            style={{ color: "#007BFF", textDecoration: "underline" }}
          >
            {not_found_page.link_text}
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
