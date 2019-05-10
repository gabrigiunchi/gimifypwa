import * as p from '../../package.json';

export const CONSTANTS = {
  VERSION: p.version,

  MAIN_PAGES: [
    '/home',
    '/gyms',
    '/profile',
    '/assets',
    '/reservations',
    '/search',
    '/playground'
  ],

  /**
   * Size of the image cropper
   */
  IMAGE_CROPPER_SIZE: {width: 250, height: 250},

  /**
   * Size of the output image generated by the cropper
   */
  CROPPED_IMAGE_SIZE: {maxWidth: 1000, maxHeight: 1000},

  ASSET_PAGE_SIZE: 5,
  COMMENT_PAGE_SIZE: 5,
  COMMENT_TITLE_MAX_LENGTH: 30,
  COMMENT_MESSAGE_MAX_LENGTH: 140,

  DEFAULT_TIMEZONE: 'Europe/Rome',
  DEFAULT_DATETIME_FORMAT: `yyyy-MM-dd'T'TTZZZ`,

  BASE_URL: 'https://backendtesi.eu-gb.mybluemix.net/api/v1/',
  ALIVE_URL: 'alive',
  LOGIN_URL: 'login',
  GREETINGS_URL: 'greetings',
  USERS_URL: 'users',
  RESERVATIONS: 'reservations',
  MY_RESERVATIONS: 'reservations/me',
  GYMS: 'gyms',
  ASSETS: 'assets',
  TIMETABLES: 'timetables',
  COMMENTS: 'comments',
  CITIES: 'cities',
  ASSET_KINDS: 'asset_kinds',
  AVATARS: 'avatars',
  MY_AVATAR: 'avatars/me',
  PRESET_AVATARS: 'avatars/presets',
};

