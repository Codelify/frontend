import localstorage from "./localstorage";
const currentView = localstorage.get();

export const handleRouteChange = () => {
  if (currentView === "FiHome") return "/snippets/list";
  if (currentView === "FiStar") return "/snippets/favorites";
  if (currentView === "FiArchive") return "/snippets/archive";
  if (currentView === "FiTag") return "/snippets/tags";
  return "/snippets/list";
};
