<?php
/*
Plugin Name:  Clases GymNoray
Description: Plugin para mostrar las clases de GymNoray!
Author: Adolfo Onrubia
Author URI: http://adolfo.onrubia.es
*/

// Shortcode to output needed markup
add_shortcode( 'wpshout_react_clases', 'wpshout_react_clases_show_clases' );
function wpshout_react_clases_show_clases() {
	return '<div id="clases"></div>';
}

add_action( 'wp_enqueue_scripts', 'wpshout_react_clases_enqueue_scripts' );
function wpshout_react_clases_enqueue_scripts() {
	wp_enqueue_script( 'babel', 'https://npmcdn.com/babel-core@5.8.38/browser.min.js', '', null, false );
	wp_enqueue_script( 'wpshout-react-clases', plugin_dir_url( __FILE__ ) . 'static/js/main.8059b0ac.js' );
	wp_enqueue_style( 'wpshout-react-clases', plugin_dir_url( __FILE__ ) . 'static/css/main.1c8adc0c.css' );
}

// Add "babel" type to clases script
add_filter( 'script_loader_tag', 'wpshout_react_clases_add_babel_type', 10, 3 );
function wpshout_react_clases_add_babel_type( $tag, $handle, $src ) {
	if ( $handle !== 'wpshout-react-clases' ) {
		return $tag;
	}
	return '<script src="' . $src . '" type="text/babel"></script>' . "\n";
}