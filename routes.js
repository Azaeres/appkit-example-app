import One from 'app/views/pages/One';
import Two from 'app/views/pages/Two';
import NotFound404 from 'app/views/pages/404';
import Route, { PageAction } from 'models/Route';
import Load from 'app/views/pages/Load';
import Prefetch from 'app/views/pages/Prefetch';
import Iframe from 'app/views/pages/Iframe';

// Path matching rules: https://github.com/pillarjs/path-to-regexp
const routes = [
  Route(`/one/:thing?`, PageAction(One), 'oneThing'),
  Route(`/two`, PageAction(Two), 'two'),
  Route(`/load/foo`, PageAction(Load), 'loadFoo'),
  Route(`/load/:q?`, PageAction(Load), 'load'),
  Route(`/prefetch`, PageAction(Prefetch), 'prefetch'),
  Route(`/iframe`, PageAction(Iframe), 'iframe'),
  Route(`(.*)`, PageAction(NotFound404), 'fourOhFour')
];

export default routes;
