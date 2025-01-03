import ArticleLinks from "./components/article-links.js";
import CodeJumpButtons from "./components/code-jump-buttons";
import CodeSnippet from "./components/code-snippet";
import SiteHeading, { SITE_HEADING } from "./components/site-heading/index.js";
import ArticleCardList, { ARTICLE_CARDS } from "./components/article-previews/article-card-list/index.js";
import TopicChoices, { TOPIC_CHOICES } from "./components/topic-choices";
import ArticleCard, { ARTICLE_CARD } from "./components/article-previews/article-card/index.js";
import LatestArticles, { LATESTS_ARTICLES } from "./components/article-previews/latest-articles/index.js";
import ByLine from "./components/by-line.js";
import ChimpForm from "./components/chimp-form/index.js";
import TrafficAnalyzer from "./components/traffic-analyzer/index.js";

import './global.css';
import './article.css';
import './articles.css';
import './home.css';

customElements.define('article-links', ArticleLinks);
customElements.define('code-jump-buttons', CodeJumpButtons);
customElements.define('my-code', CodeSnippet);
customElements.define(SITE_HEADING, SiteHeading);
customElements.define(TOPIC_CHOICES, TopicChoices);
customElements.define(ARTICLE_CARDS, ArticleCardList);
customElements.define(ARTICLE_CARD, ArticleCard);
customElements.define(LATESTS_ARTICLES, LatestArticles);
customElements.define('by-line', ByLine);
customElements.define('chimp-form', ChimpForm);
customElements.define('traffic-analyzer', TrafficAnalyzer);


if (document.querySelector('#cover')) document.querySelector('#cover').style.visibility = 'visible';
