declare module 'mostachito';

interface HtmlTemplateConfInterface {
  viewsPath: string;
  viewData: { [k: string]: string; }
  missingRefValueReplacement: (ref: string) => string;
}

interface HydrateViewPropsInterface { viewTemplate: string; viewData: ViewData; }

interface HtmlTemplateInterface {
  loadViewTemplate(viewData: ViewData, filepath: string): Promise<unknown>;
  hydrateView: HydrateViewCallback;
}

type HydrateViewCallback = (props: HydrateViewPropsInterface) => string;

interface HtmlTemplateConstructor {
  new (config: HtmlTemplateConfInterface): HtmlTemplateInterface;
}

interface PostDataAttributes {
  slug?: string;
  description?: string;
  privacy: "private" | "public"
}

interface FmResult<T> {
  readonly attributes: T
  readonly body: string
  readonly bodyHtml: string;
  readonly bodyBegin: number;
  readonly frontmatter?: string;
}
type FmDataInterface = FmResult<PostDataAttributes>
type PreHtmlCallback = (data: FmDataInterface) => FmDataInterface;

type FmFunction = (fileContents: string) => FmResult<PostDataAttributes>

interface SdConverter {
  makeHtml(markdown: string): string;
}
interface MarkdownToHtmlServiceInterface {
  loadConvert: (postSlug: string, markdownFilePath: string, preHtmlCallback?: PreHtmlCallback) => Promise<FmDataInterface>;
}
interface MarkdownToHtmlConstructorInterface {
  new ({fm, converter}: { fm: FmFunction; converter: SdConverter; }): MarkdownToHtmlServiceInterface;
}


interface ViewData {
  [k: string]: string | ViewData | ViewData[];
}
interface HydrateViewProps { viewTemplate: string; viewData: ViewData; }

type MostachitoHydrateMethod = (viewTemplate: string, viewData: ViewData) => string;

type LoadViewTemplateResolveParam = { viewTemplate: string; viewData: ViewData; };
type HydrateViewMethod = (param: LoadViewTemplateResolveParam) => string;

interface MostachitoInterface {
  hydrate: MostachitoHydrateMethod;
}
interface TemplateHydratorServiceConstructor {
  new ({ mostachito }: { mostachito: MostachitoInterface; }): TemplateHydratorServiceInterface;
}
interface TemplateHydratorServiceInterface {
  loadViewTemplate: (viewData: ViewData, filePath: string) => Promise<LoadViewTemplateResolveParam>;
  hydrateView: HydrateViewMethod;
}
