<?php

/*
 * This file is part of prippp/synopsis.
 *
 
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace PriPPP\Synopsis;

use Flarum\Api\Controller\ListDiscussionsController;
use Flarum\Api\Controller\UpdateDiscussionController;
use Flarum\Extend;
use Flarum\Tags\Api\Serializer\TagSerializer;
use Flarum\Tags\Event\Saving as TagSaving;
use Flarum\Tags\Tag;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum/extension.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    // 注释掉数据库字段扩展，使用已有字段
    
    (new Extend\Model(Tag::class))
        ->cast('excerpt_length', 'int')
        ->cast('rich_excerpts', 'bool'),
    

    (new Extend\Settings())
        ->default('prippp-synopsis.excerpt_length', 200)
        ->default('prippp-synopsis.rich-excerpts', false)
        ->default('prippp-synopsis.excerpt-type', 'first')
        ->default('prippp-synopsis.disable-when-searching', true)
        ->serializeToForum('synopsis.excerpt_length', 'prippp-synopsis.excerpt_length', 'intVal')
        ->serializeToForum('synopsis.rich_excerpts', 'prippp-synopsis.rich-excerpts', 'boolVal')
        ->serializeToForum('synopsis.excerpt_type', 'prippp-synopsis.excerpt-type')
        ->serializeToForum('synopsis.disable_when_searching', 'prippp-synopsis.disable-when-searching', 'boolval'),

    (new Extend\ApiController(ListDiscussionsController::class))
        ->prepareDataForSerialization(LoadRelations::class),

    (new Extend\ApiController(UpdateDiscussionController::class))
        ->prepareDataForSerialization(LoadRelations::class),

    (new Extend\User())
        ->registerPreference('showSynopsisExcerpts', 'boolVal', true)
        ->registerPreference('showSynopsisExcerptsOnMobile', 'boolVal', false),

    (new Extend\Event())
        ->listen(TagSaving::class, Tags\Saving::class),

    (new Extend\ApiSerializer(TagSerializer::class))
        ->attributes(Tags\AddTagsAttrs::class),
];
