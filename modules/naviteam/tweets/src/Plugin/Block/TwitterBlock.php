<?php

/**
 * @file
 * Contains \Drupal\tweets\Plugin\Block\TwitterBlock.
 */

namespace Drupal\tweets\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\tweets\TwitterAPIExchange;

/**
 * Provides a 'TwitterBlock' block.
 *
 * @Block(
 *  id = "twitter_block",
 *  admin_label = @Translation("Twitter block"),
 *  category = @Translation("NaviTeam block"),
 * )
 */
class TwitterBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form['markup'] = array(
      '#type' => 'markup',
      '#markup' => t('<a href="@url">Create a twitter app on the twitter developer site</a>', array('@url' => 'https://dev.twitter.com/apps/')),
    );
    $form['tweets_username'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Twitter username'),
      '#description' => $this->t(''),
      '#default_value' => isset($this->configuration['tweets_username']) ? $this->configuration['tweets_username'] : 'drupal',
    );
    $form['tweets_limit'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Limit'),
      '#description' => $this->t(''),
      '#default_value' => isset($this->configuration['tweets_limit']) ? $this->configuration['tweets_limit'] : 2,
    );
    $form['access_token'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Access token'),
      '#description' => $this->t(''),
      '#default_value' => isset($this->configuration['access_token']) ? $this->configuration['access_token'] : '1336019568-oWNgtSGW5AHlHXNLXT4auXpzu5KYusLRg4CtZiW',
    );
    $form['token_secret'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Token secret'),
      '#description' => $this->t(''),
      '#default_value' => isset($this->configuration['token_secret']) ? $this->configuration['token_secret'] : 'IuCAwDSDTsrhC2szhS9yOWxxYeRs36j2OLfflbUxakc2d',
    );
    $form['consumer_key'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Consumer key'),
      '#description' => $this->t(''),
      '#default_value' => isset($this->configuration['consumer_key']) ? $this->configuration['consumer_key'] : 'mmAebBz16VpIWwNzMVVkUyCh1',
    );
    $form['consumer_secret'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Consumer secret'),
      '#description' => $this->t(''),
      '#default_value' => isset($this->configuration['consumer_secret']) ? $this->configuration['consumer_secret'] : 'LvJ8M7Z1TeI6fLlOfgQDD0Uonzw0gs9IJlW3ZawAlk6m5spUrZ',
    );
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    $this->configuration['access_token'] = $form_state->getValue('access_token');
    $this->configuration['token_secret'] = $form_state->getValue('token_secret');
    $this->configuration['consumer_key'] = $form_state->getValue('consumer_key');
    $this->configuration['consumer_secret'] = $form_state->getValue('consumer_secret');
    $this->configuration['tweets_username'] = $form_state->getValue('tweets_username');
    $this->configuration['tweets_limit'] = $form_state->getValue('tweets_limit');
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];

    $settings = array(
      'oauth_access_token' => $this->configuration['access_token'],
      'oauth_access_token_secret' => $this->configuration['token_secret'],
      'consumer_key' => $this->configuration['consumer_key'],
      'consumer_secret' => $this->configuration['consumer_secret']
    );
    $url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
    $getfield = '?screen_name=' . $this->configuration['tweets_username'] . '&count=' . $this->configuration['tweets_limit'];
    $requestMethod = 'GET';

    $twitter = new TwitterAPIExchange($settings);
    $response = $twitter->setGetfield($getfield)
      ->buildOauth($url, $requestMethod)
      ->performRequest();


    if ($response) {
      $tweets = json_decode($response);
      $build = array(
        '#theme' => 'tweets',
        '#tweets' => $tweets,
        '#cache' => array(
          'max-age' => 3600, // seconds
        ),
      );
    }
    return $build;
  }

}
