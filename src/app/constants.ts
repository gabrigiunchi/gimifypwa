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

  SECTIONS: [
    {icon: 'search', link: '/search'},
    {icon: 'book', link: '/reservations'},
    {icon: 'fitness_center', link: '/gyms'},
    {icon: 'person', link: '/profile'}
  ],

  /**
   * Size of the image cropper
   */
  IMAGE_CROPPER_SIZE: {width: 250, height: 250},

  /**
   * Size of the output image generated by the cropper
   */
  CROPPED_IMAGE_SIZE: {maxWidth: 1000, maxHeight: 1000},

  ASSET_PAGE_SIZE: 15,
  COMMENT_PAGE_SIZE: 5,
  COMMENT_TITLE_MAX_LENGTH: 30,
  COMMENT_MESSAGE_MAX_LENGTH: 140,

  DEFAULT_LOCALE: 'en',
  DEFAULT_DATETIME_FORMAT: `yyyy-MM-dd'T'TTZZZ`,

  DATE_FORMATS: {
    parse: {
      dateInput: 'YYYY-MM-DD',
    },
    display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  },

  NEW_RESERVATION_MIN_TIME: '00:00',
  NEW_RESERVATION_MAX_TIME: '23:40',
  RESERVATION_TIME_SLOT_IN_MINUTES: 20,
  RESERVATION_THRESHOLD: 14,

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

  MY_POSITION_ICON: '/assets/icons/bluecircle.png',
  PLACE_ICON: '/assets/icons/svg/place.svg'
};

