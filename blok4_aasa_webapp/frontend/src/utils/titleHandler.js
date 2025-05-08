import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
    let path = location.pathname.substring(1); // remove the "/" from the path
    if (!path) path = "dashboard"; // default if at "/"

    // Capitalize first letter
    const pageTitle = path.charAt(0).toUpperCase() + path.slice(1);

    document.title = `${pageTitle} | AASA Command Center`;

    let pageHeader = document.getElementById("title")
    pageHeader.innerText = pageTitle

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    let imageUrl = "/images/AASA_Black_Background.png"
    link.href = imageUrl;

    let locationButton = document.getElementById(path + "Nav")
    locationButton.classList.add("bg-white", "bg-opacity-20")

  }, [location]);
}
