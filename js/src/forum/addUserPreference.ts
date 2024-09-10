import type Mithril from 'mithril';
import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import FieldSet from 'flarum/common/components/FieldSet';
import ItemList from 'flarum/common/utils/ItemList';
import Switch from 'flarum/common/components/Switch';
import Stream from 'flarum/common/utils/Stream';

export default function () {
  extend(SettingsPage.prototype, 'oninit', function () {
    this.showSynopsisExcerpts = Stream(this.user.preferences().showSynopsisExcerpts);
    this.showSynopsisExcerptsOnMobile = Stream(this.user.preferences().showSynopsisExcerptsOnMobile);
  });
}
