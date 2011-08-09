/**
An Extention which provides a RESTful HTTP sync implementation that can be mixed
into a Model or ModelList subclass.

If the communication with the server is done via JSON, only the `root` and `url`
prototype properties will need to be assigned to match your server's URL space.

@module model-sync

@TODO: Make sure things are easy to extend to add cache support, this probably
involves moving the IO `success` and `failure` handlers to fns on the prototype.

@TODO: Look to see if we can steal Controller's routing infratructure.

@TODO: Rename to something like ModelRESTSync? ModelHTTPSync? RESTSync?
**/

var ModelSync,

    Lang        = Y.Lang,
    sub         = Lang.sub,
    isString    = Lang.isString,
    isFunction  = Lang.isFunction;

ModelSync = function(){};

ModelSync.HTTP_METHODS = {
    'create': 'POST',
    'read'  : 'GET',
    'update': 'PUT',
    'delete': 'DELETE'
};

ModelSync.prototype = {

    /**
    A String which represents the root or collection part of the URL space which
    relates to this Model/ModelList class; **this should be overriden**.

    @example
        '/users/'

    @property root
    @type String
    @default ''
    **/
    root : '',

    /**
    A String or Function which resolves to the URL of the Model instance;
    **this should be overriden**.

    if the `url` property is a Function, it should return the String that should
    be used as the URL. The Function will be called before each request. If the
    `url` property is a String, it will be processed by `Y.Lang.sub()`; this is
    useful when the URLs for a Model type match a specific pattern:

    @example
        '/user/{id}/'

    @TODO Should this match the spec for a Controller's route?

    @property url
    @type String|Function
    @default ''
    **/
    url : '',

    /**
    A hash of HTTP headers which will be used for each XHR request.

    These headers are considered the default headers used for each request, but
    they are merged with any request-specific headers which will take presidence
    over these defaults.

    @property headers
    @type Object
    @default
        {
            'Accept'        : 'application/json',
            'Content-Type'  ; 'application/json'
        }
    **/
    headers : {
        'Accept'        : 'application/json',
        'Content-Type'  ; 'application/json'
    },

    /**
    Override this method to provide a custom persistence implementation for this
    model. The default just calls the callback without actually doing anything.

    This method is called internally by load(), save(), and destroy().

    @method sync
    @param {String} action Sync action to perform. May be one of the following:

      * create: Store a newly-created model for the first time.
      * delete: Delete an existing model.
      * read  : Load an existing model.
      * update: Update an existing model.

    @param {Object} [options] Sync options. It's up to the custom sync
      implementation to determine what options it supports or requires, if any.
    @param {callback} [callback] Called when the sync operation finishes.
      @param {Error|null} callback.err If an error occurred, this parameter will
        contain the error. If the sync operation succeeded, _err_ will be
        falsy.
      @param {Any} [callback.response] The server's response. This value will
        be passed to the parse() method, which is expected to parse it and
        return an attribute hash.
    **/
    sync : function (action, options, callback) {
        options || (options = {});

        var url     = this._getUrl(action, options),
            method  = ModelSync.HTTP_METHODS[action],
            headers = Y.merge(this.headers, options.headers),
            entity;

        if (method === 'POST' || method === 'PUT') {
            entity = Y.JSON.stringify(this);
        } else {
            // no content is being sent
            delete headers['Content-Type'];
        }

        Y.io(url, {
            method  : method,
            headers : headers,
            data    : entitiy,
            on      : {
                success : function (txId, res) {
                    isFunction(callback) && callback(null, res.responseText);
                },
                failure : function (txId, res) {
                    if (isFunction(callback)) {
                        callback({
                            code: res.status,
                            msg : res.statusText
                        }, res.responseText);
                    }
                }
            }
        });
    },

    /**
    Returns the URL for the request based on the `action` and current state of
    the `root` and `url` properties.

    @method _getUrl
    @param {String} action Sync action to perform. May be one of the following:

      * create: Store a newly-created model for the first time.
      * delete: Delete an existing model.
      * read  : Load an existing model.
      * update: Update an existing model.

    @param {Object} [options] Sync options. It's up to the custom sync
      implementation to determine what options it supports or requires, if any.
    @protected
    **/
    _getUrl : function (action, options) {
        var root    = this.root,
            url     = this.url;

        if (isFunction(url)) {
            return url(action, options);
        }

        if (action === 'create') {
            return this.root;
        }

        if (this instanceof Y.Model) {
            return ( root + sub(url, this.toJSON()) );
        }

        return url || root;
    }

};

Y.ModelSync = ModelSync;
