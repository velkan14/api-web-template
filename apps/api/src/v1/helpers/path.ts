import { ServerRoute } from "@hapi/hapi";

export const addPrefixToPaths = (routes: ServerRoute[], prefix: string) => {
  return routes.map((route) => {
    const newPath = route.path.startsWith("/")
      ? `${prefix}${route.path}`
      : `${prefix}/${route.path}`;
    return { ...route, path: newPath };
  });
};
