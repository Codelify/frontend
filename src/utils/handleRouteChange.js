import localstorage from "./localstorage";
const currentView = localstorage.get();

export const handleRouteChange = () => {
  if (currentView === "FiHome") return "/app/list";
  if (currentView === "FiStar") return "/app/favorites";
  if (currentView === "FiArchive") return "/app/archive";
  if (currentView === "FiTag") return "/app/tags";
  return "/app";
};
