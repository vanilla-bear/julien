<?php
use Drupal\Core\Form\FormStateInterface;
use Drupal\file\Entity\File;
use Drupal\Core\Ajax\CommandInterface;

function hawell_form_system_theme_settings_alter(&$form, \Drupal\Core\Form\FormStateInterface &$form_state, $form_id = NULL) {
    // Work-around for a core bug affecting admin themes. See issue #943212.
    $theme_file = drupal_get_path('theme', 'hawell') . '/theme-settings.php';
    $build_info = $form_state->getBuildInfo();
    if (!in_array($theme_file, $build_info['files'])) {
        $build_info['files'][] = $theme_file;
    }
    $form_state->setBuildInfo($build_info);

    $form['#submit'][] = 'hawell_theme_settings_form_submit';
    $form['#attached']['library'][] = 'hawell/theme-settings';
    $form['advanced'] = array(
        '#type' => 'vertical_tabs',
        '#default_tab' => 'general_setting',
        '#wrapper_attributes' => array('class' => array('styled-navitheme')),
    );
    $form['general_setting'] = array(
        '#type' => 'details',
        '#title' => t('General Settings'),
        '#group' => 'advanced',
    );
    if (!\Drupal::moduleHandler()->moduleExists('yaml_editor')) {
        $message = t('<strong>It is recommended to install the</strong> <a href="@yaml-editor">YAML Editor</a> module for easier editing.', [
            '@yaml-editor' => 'https://www.drupal.org/project/yaml_editor',
        ]);

        //drupal_set_message($message, 'warning');
        $form['general_setting']['status_messages'] = [
           '#markup' => $message
        ];
    }
    $form['general_setting']['tracking_code'] = array(
        '#type'          => 'textarea',
        '#title'         => t('Tracking Code'),
        '#default_value' => theme_get_setting('tracking_code', 'hawell'),
        '#description'   => t("Add custom script on your site."),
    );
    $form['general_setting']['custom_css'] = array(
        '#type'          => 'textarea',
        '#title'         => t('Custom CSS'),
        '#default_value' => theme_get_setting('custom_css', 'hawell'),
        '#description'   => t('<strong>Example:</strong><br/>h1 { font-family: \'Metrophobic\', Arial, serif; font-weight: 400; }'),
    );
    
    //Header settings
    $form['header_settings'] = array(
        '#type' => 'details',
        '#title' => t('Header Settings'),
        '#group' => 'advanced',
    );
    $form['header_settings']['menu_style'] = array(
        '#type'          => 'select',
        '#title'         => t('Menu Style'),
        '#options' => array(
            'black_transparent' => t('Black Transparent'),
            'white_transparent' => t('White Transparent'),
            'black_notransparent' => t('Black No Transparent'),
            'white_notransparent' => t('White No Transparent'),
            'side_menu' => t('Side Menu'),
            'min_menu' => t('Min Menu'),
            'gray_min_fullmenu' => t('Gray Min Fullscreen Menu'),
            'black_min_fullmenu' => t('Black Min Fullscreen Menu'),
        ),
        '#default_value' => theme_get_setting('menu_style', 'hawell'),
    );
    $form['header_settings']['topbar'] = array(
        '#type'          => 'checkbox',
        '#prefix' => '<div class="one-checkbox"><label>Top Bar</label>',
        '#suffix' => '</div>',
        '#title'         => t(''),
        '#default_value' => theme_get_setting('topbar', 'hawell'),
    );

    //Footer settings
    $form['footer_settings'] = array(
        '#type' => 'details',
        '#title' => t('Footer Settings'),
        '#group' => 'advanced',
    );
    $form['footer_settings']['footer_style'] = array(
        '#type'          => 'select',
        '#title'         => t('Footer Style'),
        '#options' => array(
            'footer1' => t('Footer 1'),
            'footer2white' => t('Footer 2 White'),
            'footer2black' => t('Footer 2 Black'),
        ),
        '#default_value' => theme_get_setting('footer_style', 'hawell'),
    );
    $form['footer_settings']['footer_background_image'] = array(
        '#type'     => 'managed_file',
        '#title'    => t('Footer background image upload'),
        '#required' => FALSE,
        '#upload_location' => 'public://background/',
        '#default_value' => theme_get_setting('footer_background_image','hawell'),
        '#upload_validators' => array(
            'file_validate_extensions' => array('gif png jpg jpeg'),
            '#progress_message' => 'Uploading ...',
            '#required' => FALSE,
        ),
    );
    $form['footer_settings']['footer_class'] = array(
        '#type'          => 'textfield',
        '#title'         => t('Footer class'),
        '#default_value' => theme_get_setting('footer_class', 'hawell'),
    );
    $form['footer_settings']['footer_copyright_message'] = array(
        '#type'          => 'textarea',
        '#title'         => t('Footer copyright message'),
        '#default_value' => theme_get_setting('footer_copyright_message', 'hawell'),
    );


    //Portfolio settings
    $form['portfolio_settings'] = array(
        '#type' => 'details',
        '#title' => t('Portfolio Settings'),
        '#group' => 'advanced',
    );
    $form['portfolio_settings']['portfolio_style'] = array(
        '#type'          => 'select',
        '#title'         => t('Portfolio Style'),
        '#options' => array(
            'grid' => t('Grid Style'),
            'boxednospace2col' => t('Boxed No Space 2 Columns'),
            'boxednospace3col' => t('Boxed No Space 3 Columns'),
            'boxednospace4col' => t('Boxed No Space 4 Columns'),
            'boxednospace5col' => t('Boxed No Space 5 Columns'),
            'boxedspace2col' => t('Boxed Space 2 Columns'),
            'boxedspace3col' => t('Boxed Space 3 Columns'),
            'boxedspace4col' => t('Boxed Space 4 Columns'),
            'widenospace2col' => t('Wide No Space 2 Columns'),
            'widenospace3col' => t('Wide No Space 3 Columns'),
            'widenospace4col' => t('Wide No Space 4 Columns'),
            'widenospace5col' => t('Wide No Space 5 Columns'),
            'widespace2col' => t('Wide Space 2 Columns'),
            'widespace3col' => t('Wide Space 3 Columns'),
            'widespace4col' => t('Wide Space 4 Columns'),
            'widespace5col' => t('Wide Space 5 Columns'),
            'masonry2col' => t('Masonry 2 Columns'),
            'masonry3col' => t('Masonry 3 Columns'),
            'masonry4col' => t('Masonry 4 Columns'),
            'masonry5col' => t('Masonry 5 Columns'),
        ),
        '#default_value' => theme_get_setting('portfolio_style', 'hawell'),
    );
    
    $form['portfolio_settings']['portfolio_menu_style'] = array(
        '#type'          => 'select',
        '#title'         => t('Menu Style'),
        '#options' => array(
            'black_transparent' => t('Black Transparent'),
            'white_transparent' => t('White Transparent'),
            'black_notransparent' => t('Black No Transparent'),
            'white_notransparent' => t('White No Transparent'),
            'side_menu' => t('Side Menu'),
            'min_menu' => t('Min Menu'),
            'gray_min_fullmenu' => t('Gray Min Fullscreen Menu'),
            'black_min_fullmenu' => t('Black Min Fullscreen Menu'),
        ),
        '#default_value' => theme_get_setting('portfolio_menu_style', 'hawell'),
    );

    $form['portfolio_settings']['portfolio_topbar'] = array(
        '#type'          => 'checkbox',
        '#prefix' => '<div class="one-checkbox"><label>Top Bar</label>',
        '#suffix' => '</div>',
        '#title'         => t(''),
        '#default_value' => theme_get_setting('portfolio_topbar', 'hawell'),
    );

    $form['portfolio_settings']['portfolio_page_title_style'] = array(
        '#type'          => 'select',
        '#title'         => t('Page Title Style'),
        '#options' => array(
            'small_grey' => t('Small Grey'),
            'small_white' => t('Small White'),
            'small_dark' => t('Small Dark'),
            'big_gey' => t('Big Grey'),
            'big_white' => t('Big White'),
            'big_dark' => t('Big Dark'),
            'big_image' => t('Big Image'),
            'large_image' => t('Large Image'),
        ),
        '#default_value' => theme_get_setting('portfolio_page_title_style', 'hawell'),
    );
    $form['portfolio_settings']['portfolio_page_title_class'] = array(
        '#type'          => 'textfield',
        '#title'         => t('Page title class'),
        '#default_value' => theme_get_setting('portfolio_page_title_class', 'hawell'),
    );
    
    $form['portfolio_settings']['portfolio_page_title_bgimage'] = array(
        '#type'     => 'managed_file',
        '#title'    => t('Page title background image upload'),
        '#required' => FALSE,
        '#upload_location' => 'public://background/',
        '#default_value' => theme_get_setting('portfolio_page_title_bgimage','hawell'),
        '#upload_validators' => array(
            'file_validate_extensions' => array('gif png jpg jpeg'),
            '#progress_message' => 'Uploading ...',
            '#required' => FALSE,
        ),
    );
    
    $form['portfolio_settings']['portfolio_footer_style'] = array(
        '#type'          => 'select',
        '#title'         => t('Footer Style'),
        '#options' => array(
            'footer1' => t('Footer 1'),
            'footer2white' => t('Footer 2 White'),
            'footer2black' => t('Footer 2 Black'),
        ),
        '#default_value' => theme_get_setting('portfolio_footer_style', 'hawell'),
    );

    //Blog settting
    $form['blog_settings'] = array(
        '#type' => 'details',
        '#title' => t('Blog Settings'),
        '#group' => 'advanced',
    );
    $form['blog_settings']['blog_menu_style'] = array(
        '#type'          => 'select',
        '#title'         => t('Menu Style'),
        '#options' => array(
            'black_transparent' => t('Black Transparent'),
            'white_transparent' => t('White Transparent'),
            'black_notransparent' => t('Black No Transparent'),
            'white_notransparent' => t('White No Transparent'),
            'side_menu' => t('Side Menu'),
            'min_menu' => t('Min Menu'),
            'gray_min_fullmenu' => t('Gray Min Fullscreen Menu'),
            'black_min_fullmenu' => t('Black Min Fullscreen Menu'),
        ),
        '#default_value' => theme_get_setting('blog_menu_style', 'hawell'),
    );
    $form['blog_settings']['blog_topbar'] = array(
        '#type'          => 'checkbox',
        '#prefix' => '<div class="one-checkbox"><label>Top Bar</label>',
        '#suffix' => '</div>',
        '#title'         => t(''),
        '#default_value' => theme_get_setting('blog_topbar', 'hawell'),
    );
    $form['blog_settings']['blog_page_title_style'] = array(
        '#type'          => 'select',
        '#title'         => t('Page Title Style'),
        '#options' => array(
            'small_grey' => t('Small Grey'),
            'small_white' => t('Small White'),
            'small_dark' => t('Small Dark'),
            'big_gey' => t('Big Grey'),
            'big_white' => t('Big White'),
            'big_dark' => t('Big Dark'),
            'big_image' => t('Big Image'),
            'large_image' => t('Large Image'),
        ),
        '#default_value' => theme_get_setting('blog_page_title_style', 'hawell'),
    );
    $form['blog_settings']['blog_page_title_class'] = array(
        '#type'          => 'textfield',
        '#title'         => t('Page title class'),
        '#default_value' => theme_get_setting('blog_page_title_class', 'hawell'),
    );
    $form['blog_settings']['blog_page_title_bgimage'] = array(
        '#type'     => 'managed_file',
        '#title'    => t('Page title background image upload'),
        '#required' => FALSE,
        '#upload_location' => 'public://background/',
        '#default_value' => theme_get_setting('blog_page_title_bgimage','hawell'),
        '#upload_validators' => array(
            'file_validate_extensions' => array('gif png jpg jpeg'),
            '#progress_message' => 'Uploading ...',
            '#required' => FALSE,
        ),
    );
    $form['blog_settings']['blog_slogan'] = array(
        '#type'          => 'textfield',
        '#title'         => t('Blog slogan'),
        '#default_value' => theme_get_setting('blog_slogan', 'hawell'),
    );
    $form['blog_settings']['blog_layout'] = array(
        '#type'          => 'select',
        '#title'         => t('Blog layout'),
        '#options' => array(
            'masonry2col' => t('Masonry 2 Columns'),
            'masonry3col' => t('Masonry 2 Columns'),
            'masonry4col' => t('Masonry 3 Columns'),
            'fullwidth' => t('Full Width'),
            'smallimage' => t('Small Image'),
            'leftsidebar' => t('Left Sidebar'),
            'rightsidebar' => t('Right Sidebar'),
        ),
        '#default_value' => theme_get_setting('blog_layout', 'hawell'),
    );
    $form['blog_settings']['blog_footer_style'] = array(
        '#type'          => 'select',
        '#title'         => t('Footer style'),
        '#options' => array(
            'footer1' => t('Footer 1'),
            'footer2white' => t('Footer 2 White'),
            'footer2black' => t('Footer 2 Black'),
        ),
        '#default_value' => theme_get_setting('blog_footer_style', 'hawell'),
    );
    //Product detail settings
    $form['product_settings'] = array(
        '#type' => 'details',
        '#title' => t('Shop Settings'),
        '#group' => 'advanced',
    );
    $form['product_settings']['shop_layout'] = array(
        '#type'          => 'select',
        '#title'         => t('Shop layout'),
        '#options' => array(
            '2colsidebar' => t('2 Columns '),
            '3colsidebar' => t('3 Columns'),
            '4colfullwidth' => t('4 Columns'),
        ),
        '#default_value' => theme_get_setting('shop_layout', 'hawell'),
    );
    $form['product_settings']['shop_menu_style'] = array(
        '#type'          => 'select',
        '#title'         => t('Menu style'),
        '#options' => array(
            'black_transparent' => t('Black Transparent'),
            'white_transparent' => t('White Transparent'),
            'black_notransparent' => t('Black No Transparent'),
            'white_notransparent' => t('White No Transparent'),
            'side_menu' => t('Side Menu'),
            'min_menu' => t('Min Menu'),
            'gray_min_fullmenu' => t('Gray Min Fullscreen Menu'),
            'black_min_fullmenu' => t('Black Min Fullscreen Menu'),
        ),
        '#default_value' => theme_get_setting('shop_menu_style', 'hawell'),
    );
    $form['product_settings']['shop_topbar'] = array(
        '#type'          => 'checkbox',
        '#prefix' => '<div class="one-checkbox"><label>Top Bar</label>',
        '#suffix' => '</div>',
        '#title'         => t(''),
        '#default_value' => theme_get_setting('shop_topbar', 'hawell'),
    );
    $form['product_settings']['shop_page_title_style'] = array(
        '#type'          => 'select',
        '#title'         => t('Page Title Style'),
        '#options' => array(
            'small_grey' => t('Small Grey'),
            'small_white' => t('Small White'),
            'small_dark' => t('Small Dark'),
            'big_gey' => t('Big Grey'),
            'big_white' => t('Big White'),
            'big_dark' => t('Big Dark'),
            'big_image' => t('Big Image'),
            'large_image' => t('Large Image'),
        ),
        '#default_value' => theme_get_setting('shop_page_title_style', 'hawell'),
    );
    $form['product_settings']['shop_page_title_class'] = array(
        '#type'          => 'textfield',
        '#title'         => t('Page title class'),
        '#default_value' => theme_get_setting('shop_page_title_class', 'hawell'),
    );
    $form['product_settings']['shop_page_title_bgimage'] = array(
        '#type'     => 'managed_file',
        '#title'    => t('Page title background image upload'),
        '#required' => FALSE,
        '#upload_location' => 'public://background/',
        '#default_value' => theme_get_setting('shop_page_title_bgimage','hawell'),
        '#upload_validators' => array(
            'file_validate_extensions' => array('gif png jpg jpeg'),
            '#progress_message' => 'Uploading ...',
            '#required' => FALSE,
        ),
    );
    $form['product_settings']['shop_slogan'] = array(
        '#type'          => 'textfield',
        '#title'         => t('Shop slogan'),
        '#default_value' => theme_get_setting('shop_slogan', 'hawell'),
    );
    $form['product_settings']['shop_footer_style'] = array(
        '#type'          => 'select',
        '#title'         => t('Footer Style'),
        '#options' => array(
            'footer1' => t('Footer 1'),
            'footer2white' => t('Footer 2 White'),
            'footer2black' => t('Footer 2 Black'),
        ),
        '#default_value' => theme_get_setting('shop_footer_style', 'hawell'),
    );

    //Page settings
    $form['page_settings'] = array(
        '#type' => 'details',
        '#title' => t('Pages Settings'),
        '#group' => 'advanced',
    );
    $form['page_settings']['page_menu_style'] = array(
        '#type'          => 'select',
        '#title'         => t('Menu Style'),
        '#options' => array(
            'black_transparent' => t('Black Transparent'),
            'white_transparent' => t('White Transparent'),
            'black_notransparent' => t('Black No Transparent'),
            'white_notransparent' => t('White No Transparent'),
            'side_menu' => t('Side Menu'),
            'min_menu' => t('Min Menu'),
            'gray_min_fullmenu' => t('Gray Min Fullscreen Menu'),
            'black_min_fullmenu' => t('Black Min Fullscreen Menu'),
        ),
        '#default_value' => theme_get_setting('page_menu_style', 'hawell'),
    );
    $form['page_settings']['page_topbar'] = array(
        '#type'          => 'checkbox',
        '#prefix' => '<div class="one-checkbox"><label>Top Bar</label>',
        '#suffix' => '</div>',
        '#title'         => t(''),
        '#default_value' => theme_get_setting('page_topbar', 'hawell'),
    );
    $form['page_settings']['page_title_style'] = array(
        '#type'          => 'select',
        '#title'         => t('Page Title Style'),
        '#options' => array(
            'small_grey' => t('Small Grey'),
            'small_white' => t('Small White'),
            'small_dark' => t('Small Dark'),
            'big_gey' => t('Big Grey'),
            'big_white' => t('Big White'),
            'big_dark' => t('Big Dark'),
            'big_image' => t('Big Image'),
            'large_image' => t('Large Image'),
        ),
        '#default_value' => theme_get_setting('page_title_style', 'hawell'),
    );
    $form['page_settings']['page_title_class'] = array(
        '#type'          => 'textfield',
        '#title'         => t('Page title class'),
        '#default_value' => theme_get_setting('page_title_class', 'hawell'),
    );
    $form['page_settings']['system_page_title_bgimage'] = array(
        '#type'     => 'managed_file',
        '#title'    => t('Page title background image upload'),
        '#required' => FALSE,
        '#upload_location' => 'public://background/',
        '#default_value' => theme_get_setting('system_page_title_bgimage','hawell'),
        '#upload_validators' => array(
            'file_validate_extensions' => array('gif png jpg jpeg'),
            '#progress_message' => 'Uploading ...',
            '#required' => FALSE,
        ),
    );
    $form['page_settings']['page_footer_style'] = array(
        '#type'          => 'select',
        '#title'         => t('Footer Style'),
        '#options' => array(
            'footer1' => t('Footer 1'),
            'footer2white' => t('Footer 2 White'),
            'footer2black' => t('Footer 2 Black'),
        ),
        '#default_value' => theme_get_setting('page_footer_style', 'hawell'),
    );
    
    //Skin settings
    $form['skin_settings'] = array(
        '#type' => 'details',
        '#title' => t('Skin Settings'),
        '#group' => 'advanced',
    );
    $form['skin_settings']['hawell_disable_switch'] = array(
        '#type'          => 'select',
        '#title'         => t('Switcher style'),
        '#options' => array(
            'on' => t('ON'),
            'off' => t('OFF'),
        ),
        '#default_value' => theme_get_setting('hawell_disable_switch', 'hawell'),
    );
    $form['skin_settings']['theme_layout'] = array(
        '#type'          => 'select',
        '#title'         => t('Theme Layout'),
        '#options' => array(
            'wide' => t('Wide Layout'),
            'boxed' => t('Boxed Layout'),
        ),
        '#default_value' => theme_get_setting('theme_layout', 'hawell'),
    );
     $form['skin_settings']['boxed_background_image'] = array(
        '#type'     => 'managed_file',
        '#title'    => t('Background Image Boxed Layout'),
        '#required' => FALSE,
        '#description'   => t("Upload image for boxed theme layout"),
        '#upload_location' => 'public://background/',
        '#default_value' => theme_get_setting('boxed_background_image','hawell'),
        '#upload_validators' => array(
            'file_validate_extensions' => array('gif png jpg jpeg'),
            '#progress_message' => 'Uploading ...',
            '#required' => FALSE,
        ),
    );
    $form['skin_settings']['built_in_skins'] = array(
        '#type'          => 'radios',
        '#title'         => t('Built-in Skins'),
        '#options' => array(
            'red' => t('Red'),
            'blue' => t('Blue'),
            'green' => t('Green'),
            'brown' => t('Brown'),
            'mehandi' => t('Mehandi'),
            'orange' => t('Orange'),
            'peach' => t('Peach'),
            'purple' => t('Purple'),
            'salmon' => t('Salmon'),
            'skyblue' => t('Skyblue'),
        ),
        '#default_value' => theme_get_setting('built_in_skins', 'hawell'),
    );

}

function hawell_theme_settings_form_submit(&$form, FormStateInterface $form_state) {
    $image_fid[0] = $form_state->getValue('blog_page_title_bgimage');
    $image_fid[1] = $form_state->getValue('system_page_title_bgimage');
    $image_fid[2] = $form_state->getValue('portfolio_page_title_bgimage');
    $image_fid[3] = $form_state->getValue('shop_page_title_bgimage');
    $count = count($image_fid);
    for ($i=0; $i < $count; $i++) {
        if( $image_fid[$i]) {
            $file = File::load($image_fid[$i][0]);
            $file_usage = \Drupal::service('file.usage');
            $file_usage->add($file, 'hawell', 'theme', 1);
        }
    }       
}
?>