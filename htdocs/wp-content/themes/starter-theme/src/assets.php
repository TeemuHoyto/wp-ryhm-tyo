<?php
/**
 * This file controls all assets in our theme.
 *
 * 'st_' in the function names stands for Starter Theme.
 */

define( 'ST_ASSET_PATH', get_template_directory() . '/assets/dist' );

/**
 * Enqueue styles and scripts.
 */
function st_theme_scripts() {
        // Get file modification times to enable more dynamic versioning.
        $css_mod_time = file_exists( ST_ASSET_PATH . '/main.css' ) ?
            filemtime( ST_ASSET_PATH . '/main.css' ) : ST_THEME_VERSION;
        $js_mod_time  = file_exists( ST_ASSET_PATH . '/main.js' ) ?
            filemtime( ST_ASSET_PATH . '/main.js' ) : ST_THEME_VERSION;

    wp_enqueue_style( 'theme-css', get_template_directory_uri() . '/assets/dist/main.css', [], $css_mod_time, 'all' );

    wp_enqueue_script( 'theme-js', get_template_directory_uri() . '/assets/dist/main.js', [ 'jquery' ], $js_mod_time, true );
}
add_action( 'wp_enqueue_scripts', 'st_theme_scripts' );
