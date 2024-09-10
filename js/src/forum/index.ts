import app from 'flarum/forum/app';

import addSummaryExcerpt from './addSummaryExcerpt';
import addUserPreference from './addUserPreference';

app.initializers.add('prippp-synopsis', () => {
  addSummaryExcerpt();
  addUserPreference();
});