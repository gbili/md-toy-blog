import { LoadDictElement } from 'di-why/build/src/DiContainer';

export type GenerateJsonFilesList = () => Promise<void>;

const loadDictElement: LoadDictElement<GenerateJsonFilesList> = {
  factory: ({ blogPostsToJsonService, staticFilesToJsonService, pagesToJsonService }) => {
    const recursive = true;
    const blogPostsListGen = async () => {
      try {
        await blogPostsToJsonService.generate(
          function(file: string) {console.log('Blog post list written ', file)},
          function(err: Error) {console.log(err)},
          !recursive
        );
      } catch (err) { 
        throw err;
      }
    };
    const staticFilesListGen = async () => {
      try {
        await staticFilesToJsonService.generate(
          function(file: string) {console.log('Static files list written', file)},
          function(err: Error) {console.log(err)},
          recursive
        );
      } catch (err) {
        throw err;
      }
    };
    const pagesListGen = async () => {
      try {
        await pagesToJsonService.generate(
          function(file: string) {console.log('Page files list written', file)},
          function(err: Error) {console.log(err)},
          recursive
        );
      } catch (err) {
        throw err;
      }
    };
    return async () => {
      try {
        await Promise.all([blogPostsListGen(), staticFilesListGen(), pagesListGen()]);
      } catch (err) {
        throw err;
      }
    };
  },
  locateDeps: {
    blogPostsToJsonService: 'blogPostsToJsonService',
    staticFilesToJsonService: 'staticFilesToJsonService',
    pagesToJsonService: 'pagesToJsonService',
  },
};

export default loadDictElement;
