import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare let window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() { }

  editor: any;

  myImage: any;

  @ViewChild('container')
  container: ElementRef;

  UnsplashProvider: any;


  title = 'DekcomzombieSDKAngular';

  ngOnInit(): void {
    this.runLibrary();
  }

  runLibrary(): void {
    const ReactUI = window.DekcomzombieSDK.UI.ReactUI;
    const _DekcomzombieSDK = window.DekcomzombieSDK;
    const Promise = _DekcomzombieSDK.Promise;


    function inherits(subClass, superClass) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
      } subClass.prototype = Object.create(superClass && superClass.prototype,
        { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) {
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
    }

    function classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }

    function possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
      }
      return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
    }



    this.UnsplashProvider = function (_ReactUI$PhotoRoll$Pr) {
      inherits(UnsplashProvider, _ReactUI$PhotoRoll$Pr);
      function UnsplashProvider(args: any) {
        classCallCheck(this, UnsplashProvider);


        for (let _len = arguments.length, _key = 0; _key < _len; _key++) {
          args = Array(_len),
            console.log('args', args);
          args[_key] = arguments[_key];
        }
        const _this = possibleConstructorReturn(this,
          _ReactUI$PhotoRoll$Pr.call.apply(_ReactUI$PhotoRoll$Pr, [this].concat(args)));

        _this._url = 'http://static.photoeditorsdk.com/unsplash.json';
        return _this;
      }


      UnsplashProvider.prototype.getLibraries = function getLibraries() {
        return Promise.resolve([new ReactUI.PhotoRoll.Library({
          name: 'Photos',
          coverImage: 'http://static.photoeditorsdk.com/unsplash/thumb/ZsB2MbzSHjI.jpg'
        })]);
      };

      UnsplashProvider.prototype.getSearchSuggestions = function getSearchSuggestions() {
        return Promise.resolve([new ReactUI.PhotoRoll.SearchSuggestion({
          query: 'Nature',
          coverImage: 'http://static.photoeditorsdk.com/unsplash/thumb/Z_br8TOcCpE.jpg'
        })]);
      };

      UnsplashProvider.prototype.searchPhotos = function searchPhotos(query) {
        console.log('searchPhotos');

        if (query === null || query.length === 0) {
          return Promise.resolve([]);
        }

        /**
         * Default behavior: Call `getPhotos` and find all photos whose name
         * matches all query words.
         */
        const words = query.split(/\s+/);
        return this.getPhotosForLibrary(null).then((photos) => {
          return photos.filter((photo) => {
            for (let i = 0; i < words.length; i++) {
              const word = words[i];
              const regexp = new RegExp(word, 'i');
              if (!regexp.test(photo.title)) {
                return false;
              }
            }

            return true;
          });
        });
      };


      UnsplashProvider.prototype.getPhotosForLibrary = function getPhotosForLibrary(library) {
        const _this2 = this;

        if (this._photos) {
          return Promise.resolve(this._photos);
        }

        const loader = new ReactUI.JSONLoader(this._url);
        return loader.load().then(this._parseData.bind(this, library)).then((photos) => {
          _this2._photos = photos;
          return photos;
        });
      };


      UnsplashProvider.prototype._parseData = function _parseData(library, data) {
        return data.map((p) => {
          return new ReactUI.PhotoRoll.Photo(library, p);
        });
      };
      return UnsplashProvider;
    }(ReactUI.PhotoRoll.Provider);

    console.log('window', window);
    console.log('window', ReactUI);

    this.editor = new ReactUI({
      container: this.container.nativeElement,
      logLevel: 'info',
      editor: {
        image: this.myImage,
        preferredRenderer: 'webgl'
      },
      photoRoll: {
        provider: this.UnsplashProvider
      },
      assets: {
        baseUrl: 'assets',
        resolver: (path) => {
          return path;
        }
      },
      responsive: true,
      language: 'en'
    });
    this.myImage = new Image();
    this.myImage.src = 'https://img.com/static/img/img-logo.png';
  }


}
