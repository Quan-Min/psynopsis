import app from 'flarum/admin/app';
import extendEditTagModal from './extendEditTagModal';
import typeOptions from './util/typeOptions';

app.initializers.add('prippp-synopsis', () => {
  app.extensionData
    .for('prippp-synopsis')
    .registerSetting(function () {
      if (!('flarum-tags' in flarum.extensions)) return;
      return (
        <div className="Form-group">
          <p className="helpText">{app.translator.trans('prippp-synopsis.admin.settings.tags-enabled')}</p>
        </div>
      );
    })
    .registerSetting({
      label: app.translator.trans('prippp-synopsis.admin.settings.excerpt-length.label'),
      help: app.translator.trans('prippp-synopsis.admin.settings.excerpt-length.help'),
      setting: 'prippp-synopsis.excerpt_length',
      type: 'number',
    })
    .registerSetting({
      label: app.translator.trans('prippp-synopsis.admin.settings.rich-excerpts.label'),
      help: app.translator.trans('prippp-synopsis.admin.settings.rich-excerpts.help'),
      setting: 'prippp-synopsis.rich-excerpts',
      type: 'boolean',
    })
    .registerSetting({
      label: app.translator.trans('prippp-synopsis.admin.settings.excerpt-type.label'),
      help: app.translator.trans('prippp-synopsis.admin.settings.excerpt-type.help'),
      setting: 'prippp-synopsis.excerpt-type',
      options: typeOptions(),
      type: 'select',
    })
    .registerSetting({
      label: app.translator.trans('prippp-synopsis.admin.settings.disable-when-searching.label'),
      help: app.translator.trans('prippp-synopsis.admin.settings.disable-when-searching.help'),
      setting: 'prippp-synopsis.disable-when-searching',
      type: 'switch',
    });

  extendEditTagModal();
});
