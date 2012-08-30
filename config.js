var Configuration = Backbone.Model.extend();
var Config = new Configuration();

Config.url_http       = 'http://';
Config.url_subdomain  = '';
Config.url_maindomain = 'localhost/';
Config.url_folder	  = 'TumblrTheme/';
Config.file_name	  = 'index.html'

Config.start_resource = 'blog';

Config.url_full = Config.url_http + Config.url_subdomain + Config.url_maindomain + Config.url_folder + Config.file_name;