import app from 'flarum/admin/app';

export default function () {
  let opts;
  opts = ['first', 'last'].reduce((o, key) => {
    o[key] = app.translator.trans(`prippp-synopsis.admin.settings.${key}-label`);

    return o;
  }, {});
  return opts;
}
