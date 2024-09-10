<?php

/*
 * This file is part of prippp/synopsis.
 *
 
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace PriPPP\Synopsis\Tests\integration;

use Flarum\Testing\integration\TestCase;

class DefaultSettingsTest extends TestCase
{
    protected function setup(): void
    {
        parent::setup();

        $this->extension('flarum-tags', 'prippp-synopsis');
    }

    /**
     * @test
     */
    public function verify_default_settings()
    {
        $response = $this->send(
            $this->request('GET', '/api')
        );

        $this->assertEquals(200, $response->getStatusCode());

        $response = json_decode($response->getBody(), true);

        $this->assertArrayHasKey('synopsis.excerpt_length', $response['data']['attributes']);
        $this->assertEquals(200, $response['data']['attributes']['synopsis.excerpt_length']);

        $this->assertArrayHasKey('synopsis.rich_excerpts', $response['data']['attributes']);
        $this->assertFalse($response['data']['attributes']['synopsis.rich_excerpts']);

        $this->assertArrayHasKey('synopsis.excerpt_type', $response['data']['attributes']);
        $this->assertEquals('first', $response['data']['attributes']['synopsis.excerpt_type']);
    }
}
