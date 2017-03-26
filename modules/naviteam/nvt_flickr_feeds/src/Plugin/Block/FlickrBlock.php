<?php

/**
 * @file
 * Contains \Drupal\nvt_flickr_feeds\Plugin\Block\FlickrBlock.
 */

namespace Drupal\nvt_flickr_feeds\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a 'FlickrBlock' block.
 *
 * @Block(
 *  id = "flickr_block",
 *  admin_label = @Translation("Flickr block"),
 *  category = @Translation("NaviTeam block"),
 * )
 */
class FlickrBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form['flickr_username'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Flickr user id'),
      '#description' => $this->t(''),
      '#default_value' => isset($this->configuration['flickr_username']) ? $this->configuration['flickr_username'] : '91212552@N07',
    );
    $form['flickr_limit'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Limit'),
      '#description' => $this->t(''),
      '#default_value' => isset($this->configuration['flickr_limit']) ? $this->configuration['flickr_limit'] : 6,
    );
    return $form;
  }

  /**
   * {@inheritdoc}
   */
    public function blockSubmit($form, FormStateInterface $form_state) {
        $this->configuration['flickr_username'] = $form_state->getValue('flickr_username');
        $this->configuration['flickr_limit'] = $form_state->getValue('flickr_limit');
    }

  /**
   * {@inheritdoc}
   */
  public function build() {
        $config = $this->getConfiguration();
        $userid = $config['flickr_username'];
        $limit = $config['flickr_limit'];
        $response = '<ul id="flickr-feeds" class="popup-gallery clearfix mb-30" data-uid="'.$userid.'" data-limit="'.$limit.'"></ul>';
        return array(
            '#markup' => $this->t($response),
            '#attached' => array(
                'library' => array('nvt_flickr_feeds/ntv-flickr-libary'),
            ),
        );  
    }

}
