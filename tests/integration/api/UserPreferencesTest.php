<?php

/*
 * This file is part of prippp/synopsis.
 *
 
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace PriPPP\Synopsis\Tests\integration\api;

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;

class UserPreferencesTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setup(): void
    {
        parent::setup();

        $this->extension('flarum-tags', 'prippp-synopsis');

        $this->prepareDatabase([
            'users' => [$this->normalUser()],
        ]);
    }

    /**
     * @test
     */
    public function user_has_correct_default_preferences()
    {
        $this->database();
        /** @var User $user */
        $user = User::find($this->normalUser()['id']);

        $this->assertNotNull($user);
        $this->assertTrue($user->getPreferencesAttribute('')['showSynopsisExcerpts']);
        $this->assertFalse($user->getPreferencesAttribute('')['showSynopsisExcerptsOnMobile']);
    }
}
