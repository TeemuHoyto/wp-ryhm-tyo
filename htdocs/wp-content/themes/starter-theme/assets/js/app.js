/**
 * Theme JS building
 */
import '@babel/polyfill';
import './modernizr';

// Require main style file here for concatenation.
import '../scss/app.scss';

// Import modules.
import './foundation';
import './global';