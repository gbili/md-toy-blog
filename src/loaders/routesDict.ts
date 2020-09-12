import { LoadDictElement } from 'di-why/build/src/DiContainer';
import BlogPostRoute from '../routes/BlogPostRoute';
import BlogHomeRoute from '../routes/BlogHomeRoute';
import StaticFileRoute from '../routes/StaticFileRoute';
import NotFoundRoute from '../routes/NotFoundRoute';
import PageRoute from '../routes/PageRoute';

type InjectionDict = {
  [k: string]: LoadDictElement; 
};

const routesInjectionDict: InjectionDict = {
  blogPostRoute: {
    constructible: BlogPostRoute,
    locateDeps: {
      validPostSlugList: 'validPublicPostSlugList',
      path: 'MTB_BLOG_URL_PATH_PREFIX',
      controller: {
        instance: 'blogPostController',
      },
    },
  },
  blogHomeRoute: {
    constructible: BlogHomeRoute,
    locateDeps: {
      validPostSlugListGetter: 'validPostSlugListGetter',
      path: 'MTB_BLOG_URL_PATH_PREFIX',
      controller: {
        instance: 'blogHomeController',
        actionParamsGetter: 'homeControllerActionParamsGetter',
      },
    },
  },
  staticFileRoute: {
    constructible: StaticFileRoute,
    deps: {
      path: '/css/',
    },
    locateDeps: {
      staticFilePathsGetter: 'relativeStaticFileListGetter',
      controller: {
        instance: 'staticFileController',
      },
    },
  },
  pageRoute: {
    constructible: PageRoute,
    deps: {
      path: '/',
    },
    locateDeps: {
      pageFilePathsGetter: 'relativePageListGetter',
      controller: {
        instance: 'pageController',
      },
    },
  },
  notFoundRoute: {
    constructible: NotFoundRoute,
    deps: {
      pathRegExp: /.*/g,
    },
    locateDeps: {
      controller: {
        instance: 'notFoundController',
      },
    },
  },
};

const routesAsArrayInjectionDict: InjectionDict = {
  // This is what will be used by the router
  // the above dict is required to generate this entry
  routes: {
    before: async ({ serviceLocator }) => {
      const routesDiHandles = Object.keys(routesInjectionDict);
      try {
        const routes = await Promise.all(routesDiHandles.map(async (routeHandle: string) => {
          try {
            return await serviceLocator.get<RouteInterface>(routeHandle);
          } catch (err) {
            throw err;
          }
        }));
        return { routes };
      } catch (err) {
        throw err;
      }
    },
    factory: ({ routes }: { routes: RouteInterface[]}) => {
      return routes;
    }
  }
}

export default {
  ...routesInjectionDict,
  ...routesAsArrayInjectionDict,
};