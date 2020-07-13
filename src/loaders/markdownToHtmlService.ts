import fm from 'front-matter';
import showdown from 'showdown';
import showdownHighlight from 'showdown-highlight';
import MarkdownToHtmlService from './../services/MarkdownToHtmlService';
import { LoadDictElement } from 'di-why/build/src/DiContainer';

const converter = new showdown.Converter({
  extensions: [showdownHighlight],
  tables: true,
  strikethrough: true,
});

const loadDictElement: LoadDictElement<MarkdownToHtmlService> = {
  constructible: MarkdownToHtmlService,
  deps: {
    fm,
    converter,
  }
};

export default loadDictElement;
