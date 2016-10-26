/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
// This [jQuery](http://jquery.com/) plugin implements an `<iframe>`
// [transport](http://api.jquery.com/extending-ajax/#Transports) so that
// `$.ajax()` calls support the uploading of files using standard HTML file
// input fields. This is done by switching the exchange from `XMLHttpRequest`
// to a hidden `iframe` element containing a form that is submitted.

// The [source for the plugin](http://github.com/cmlenz/jquery-iframe-transport)
// is available on [Github](http://github.com/) and dual licensed under the MIT
// or GPL Version 2 licenses.

// ## Usage

// To use this plugin, you simply add an `iframe` option with the value `true`
// to the Ajax settings an `$.ajax()` call, and specify the file fields to
// include in the submssion using the `files` option, which can be a selector,
// jQuery object, or a list of DOM elements containing one or more
// `<input type="file">` elements:

//     $("#myform").submit(function() {
//         $.ajax(this.action, {
//             files: $(":file", this),
//             iframe: true
//         }).complete(function(data) {
//             console.log(data);
//         });
//     });

// The plugin will construct hidden `<iframe>` and `<form>` elements, add the
// file field(s) to that form, submit the form, and process the response.

// If you want to include other form fields in the form submission, include
// them in the `data` option, and set the `processData` option to `false`:

//     $("#myform").submit(function() {
//         $.ajax(this.action, {
//             data: $(":text", this).serializeArray(),
//             files: $(":file", this),
//             iframe: true,
//             processData: false
//         }).complete(function(data) {
//             console.log(data);
//         });
//     });

// ### Response Data Types

// As the transport does not have access to the HTTP headers of the server
// response, it is not as simple to make use of the automatic content type
// detection provided by jQuery as with regular XHR. If you can't set the
// expected response data type (for example because it may vary depending on
// the outcome of processing by the server), you will need to employ a
// workaround on the server side: Send back an HTML document containing just a
// `<textarea>` element with a `data-type` attribute that specifies the MIME
// type, and put the actual payload in the textarea:

//     <textarea data-type="application/json">
//       {"ok": true, "message": "Thanks so much"}
//     </textarea>

// The iframe transport plugin will detect this and pass the value of the
// `data-type` attribute on to jQuery as if it was the "Content-Type" response
// header, thereby enabling the same kind of conversions that jQuery applies
// to regular responses. For the example above you should get a Javascript
// object as the `data` parameter of the `complete` callback, with the
// properties `ok: true` and `message: "Thanks so much"`.

// ### Handling Server Errors

// Another problem with using an `iframe` for file uploads is that it is
// impossible for the javascript code to determine the HTTP status code of the
// servers response. Effectively, all of the calls you make will look like they
// are getting successful responses, and thus invoke the `done()` or
// `complete()` callbacks. You can only determine communicate problems using
// the content of the response payload. For example, consider using a JSON
// response such as the following to indicate a problem with an uploaded file:

//     <textarea data-type="application/json">
//       {"ok": false, "message": "Please only upload reasonably sized files."}
//     </textarea>

// ### Compatibility

// This plugin has primarily been tested on Safari 5 (or later), Firefox 4 (or
// later), and Internet Explorer (all the way back to version 6). While I
// haven't found any issues with it so far, I'm fairly sure it still doesn't
// work around all the quirks in all different browsers. But the code is still
// pretty simple overall, so you should be able to fix it and contribute a
// patch :)

// ## Annotated Source

(function($, undefined) {
  "use strict";

  // Register a prefilter that checks whether the `iframe` option is set, and
  // switches to the "iframe" data type if it is `true`.
  $.ajaxPrefilter(function(options, origOptions, jqXHR) {
    if (options.iframe) {
      return "iframe";
    }
  });

  // Register a transport for the "iframe" data type. It will only activate
  // when the "files" option has been set to a non-empty list of enabled file
  // inputs.
  $.ajaxTransport("iframe", function(options, origOptions, jqXHR) {
    var form = null,
        iframe = null,
        name = "iframe-" + $.now(),
        files = $(options.files).filter(":file:enabled"),
        markers = null,
        accepts;

    // This function gets called after a successful submission or an abortion
    // and should revert all changes made to the page to enable the
    // submission via this transport.
    function cleanUp() {
      markers.prop('disabled', false);
      form.remove();
      iframe.bind("load", function() { iframe.remove(); });
      iframe.attr("src", "javascript:false;");
    }

    // Remove "iframe" from the data types list so that further processing is
    // based on the content type returned by the server, without attempting an
    // (unsupported) conversion from "iframe" to the actual type.
    options.dataTypes.shift();

    if (files.length) {
      form = $("<form enctype='multipart/form-data' method='post'></form>").
        hide().attr({action: options.url, target: name});

      // If there is any additional data specified via the `data` option,
      // we add it as hidden fields to the form. This (currently) requires
      // the `processData` option to be set to false so that the data doesn't
      // get serialized to a string.
      if (typeof(options.data) === "string" && options.data.length > 0) {
        $.error("data must not be serialized");
      }
      $.each(options.data || {}, function(name, value) {
        if ($.isPlainObject(value)) {
          name = value.name;
          value = value.value;
        }
        $("<input type='hidden' />").attr({name:  name, value: value}).
          appendTo(form);
      });

      // Add a hidden `X-Requested-With` field with the value `IFrame` to the
      // field, to help server-side code to determine that the upload happened
      // through this transport.
      $("<input type='hidden' value='IFrame' name='X-Requested-With' />").
        appendTo(form);

      // Borrowed straight from the JQuery source
      // Provides a way of specifying the accepted data type similar to HTTP_ACCEPTS
      accepts = options.dataTypes[ 0 ] && options.accepts[ options.dataTypes[0] ] ?
        options.accepts[ options.dataTypes[0] ] + ( options.dataTypes[ 0 ] !== "*" ? ", */*; q=0.01" : "" ) :
        options.accepts[ "*" ]

      $("<input type='hidden' name='X-Http-Accept'>")
        .attr("value", accepts).appendTo(form);

      // Move the file fields into the hidden form, but first remember their
      // original locations in the document by replacing them with disabled
      // clones. This should also avoid introducing unwanted changes to the
      // page layout during submission.
      markers = files.after(function(idx) {
        return $(this).clone().prop("disabled", true);
      }).next();
      files.appendTo(form);

      return {

        // The `send` function is called by jQuery when the request should be
        // sent.
        send: function(headers, completeCallback) {
          iframe = $("<iframe src='javascript:false;' name='" + name +
            "' id='" + name + "' style='display:none'></iframe>");

          // The first load event gets fired after the iframe has been injected
          // into the DOM, and is used to prepare the actual submission.
          iframe.bind("load", function() {

            // The second load event gets fired when the response to the form
            // submission is received. The implementation detects whether the
            // actual payload is embedded in a `<textarea>` element, and
            // prepares the required conversions to be made in that case.
            iframe.unbind("load").bind("load", function() {
              var doc = this.contentWindow ? this.contentWindow.document :
                (this.contentDocument ? this.contentDocument : this.document),
                root = doc.documentElement ? doc.documentElement : doc.body,
                textarea = root.getElementsByTagName("textarea")[0],
                type = textarea && textarea.getAttribute("data-type") || null,
                status = textarea && textarea.getAttribute("data-status") || 200,
                statusText = textarea && textarea.getAttribute("data-statusText") || "OK",
                content = {
                  html: root.innerHTML,
                  text: type ?
                    textarea.value :
                    root ? (root.textContent || root.innerText) : null
                };
              cleanUp();
              if (!jqXHR.responseText) {
                jqXHR.responseText = content.text;
              }
              completeCallback(status, statusText, content, type ?
                ("Content-Type: " + type) :
                null);
            });

            // Now that the load handler has been set up, submit the form.
            form[0].submit();
          });

          // After everything has been set up correctly, the form and iframe
          // get injected into the DOM so that the submission can be
          // initiated.
          $("body").append(form, iframe);
        },

        // The `abort` function is called by jQuery when the request should be
        // aborted.
        abort: function() {
          if (iframe !== null) {
            iframe.unbind("load").attr("src", "javascript:false;");
            cleanUp();
          }
        }

      };
    }
  });

})(jQuery);



(function($) {

  var remotipart;

  $.remotipart = remotipart = {

    setup: function(form) {
      // Preserve form.data('ujs:submit-button') before it gets nulled by $.ajax.handleRemote
      var button = form.data('ujs:submit-button'),
          csrfParam = $('meta[name="csrf-param"]').attr('content'),
          csrfToken = $('meta[name="csrf-token"]').attr('content'),
          csrfInput = form.find('input[name="' + csrfParam + '"]').length;

      form
        // Allow setup part of $.rails.handleRemote to setup remote settings before canceling default remote handler
        // This is required in order to change the remote settings using the form details
        .one('ajax:beforeSend.remotipart', function(e, xhr, settings){
          // Delete the beforeSend bindings, since we're about to re-submit via ajaxSubmit with the beforeSubmit
          // hook that was just setup and triggered via the default `$.rails.handleRemote`
          // delete settings.beforeSend;
          delete settings.beforeSend;

          settings.iframe      = true;
          settings.files       = $($.rails.fileInputSelector, form);
          settings.data        = form.serializeArray();

          // Insert the name/value of the clicked submit button, if any
          if (button)
            settings.data.push(button);

          // jQuery 1.9 serializeArray() contains input:file entries
          // so exclude them from settings.data, otherwise files will not be sent
          settings.files.each(function(i, file){
            for (var j = settings.data.length - 1; j >= 0; j--)
              if (settings.data[j].name == file.name)
                settings.data.splice(j, 1);
          })

          settings.processData = false;

          // Modify some settings to integrate JS request with rails helpers and middleware
          if (settings.dataType === undefined) { settings.dataType = 'script *'; }
          settings.data.push({name: 'remotipart_submitted', value: true});
          if (csrfToken && csrfParam && !csrfInput) {
            settings.data.push({name: csrfParam, value: csrfToken});
          }

          // Allow remotipartSubmit to be cancelled if needed
          if ($.rails.fire(form, 'ajax:remotipartSubmit', [xhr, settings])) {
            // Second verse, same as the first
            $.rails.ajax(settings);
            setTimeout(function(){ $.rails.disableFormElements(form); }, 20);
          }

          //Run cleanup
          remotipart.teardown(form);

          // Cancel the jQuery UJS request
          return false;
        })

        // Keep track that we just set this particular form with Remotipart bindings
        // Note: The `true` value will get over-written with the `settings.dataType` from the `ajax:beforeSend` handler
        .data('remotipartSubmitted', true);
    },

    teardown: function(form) {
      form
        .unbind('ajax:beforeSend.remotipart')
        .removeData('remotipartSubmitted')
    }
  };

  $(document).on('ajax:aborted:file', 'form', function(){
    var form = $(this);

    remotipart.setup(form);

    // Manually call jquery-ujs remote call so that it can setup form and settings as usual,
    // and trigger the `ajax:beforeSend` callback to which remotipart binds functionality.
    $.rails.handleRemote(form);
    return false;
  });

})(jQuery);
/*!
	Autosize v1.18.9 - 2014-05-27
	Automatically adjust textarea height based on user input.
	(c) 2014 Jack Moore - http://www.jacklmoore.com/autosize
	license: http://www.opensource.org/licenses/mit-license.php
*/

(function(e){var t,o={className:"autosizejs",id:"autosizejs",append:"\n",callback:!1,resizeDelay:10,placeholder:!0},i='<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',n=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent"],s=e(i).data("autosize",!0)[0];s.style.lineHeight="99px","99px"===e(s).css("lineHeight")&&n.push("lineHeight"),s.style.lineHeight="",e.fn.autosize=function(i){return this.length?(i=e.extend({},o,i||{}),s.parentNode!==document.body&&e(document.body).append(s),this.each(function(){function o(){var t,o=window.getComputedStyle?window.getComputedStyle(u,null):!1;o?(t=u.getBoundingClientRect().width,(0===t||"number"!=typeof t)&&(t=parseInt(o.width,10)),e.each(["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],function(e,i){t-=parseInt(o[i],10)})):t=p.width(),s.style.width=Math.max(t,0)+"px"}function a(){var a={};if(t=u,s.className=i.className,s.id=i.id,d=parseInt(p.css("maxHeight"),10),e.each(n,function(e,t){a[t]=p.css(t)}),e(s).css(a).attr("wrap",p.attr("wrap")),o(),window.chrome){var r=u.style.width;u.style.width="0px",u.offsetWidth,u.style.width=r}}function r(){var e,n;t!==u?a():o(),s.value=!u.value&&i.placeholder?(p.attr("placeholder")||"")+i.append:u.value+i.append,s.style.overflowY=u.style.overflowY,n=parseInt(u.style.height,10),s.scrollTop=0,s.scrollTop=9e4,e=s.scrollTop,d&&e>d?(u.style.overflowY="scroll",e=d):(u.style.overflowY="hidden",c>e&&(e=c)),e+=w,n!==e&&(u.style.height=e+"px",f&&i.callback.call(u,u))}function l(){clearTimeout(h),h=setTimeout(function(){var e=p.width();e!==g&&(g=e,r())},parseInt(i.resizeDelay,10))}var d,c,h,u=this,p=e(u),w=0,f=e.isFunction(i.callback),z={height:u.style.height,overflow:u.style.overflow,overflowY:u.style.overflowY,wordWrap:u.style.wordWrap,resize:u.style.resize},g=p.width(),y=p.css("resize");p.data("autosize")||(p.data("autosize",!0),("border-box"===p.css("box-sizing")||"border-box"===p.css("-moz-box-sizing")||"border-box"===p.css("-webkit-box-sizing"))&&(w=p.outerHeight()-p.height()),c=Math.max(parseInt(p.css("minHeight"),10)-w||0,p.height()),p.css({overflow:"hidden",overflowY:"hidden",wordWrap:"break-word"}),"vertical"===y?p.css("resize","none"):"both"===y&&p.css("resize","horizontal"),"onpropertychange"in u?"oninput"in u?p.on("input.autosize keyup.autosize",r):p.on("propertychange.autosize",function(){"value"===event.propertyName&&r()}):p.on("input.autosize",r),i.resizeDelay!==!1&&e(window).on("resize.autosize",l),p.on("autosize.resize",r),p.on("autosize.resizeIncludeStyle",function(){t=null,r()}),p.on("autosize.destroy",function(){t=null,clearTimeout(h),e(window).off("resize",l),p.off("autosize").off(".autosize").css(z).removeData("autosize")}),r())})):this}})(window.jQuery||window.$);
function MediumEditor(elements, options) {
    'use strict';
    return this.init(elements, options);
}

if (typeof module === 'object') {
    module.exports = MediumEditor;
}

(function (window, document) {
    'use strict';

    function extend(b, a) {
        var prop;
        if (b === undefined) {
            return a;
        }
        for (prop in a) {
            if (a.hasOwnProperty(prop) && b.hasOwnProperty(prop) === false) {
                b[prop] = a[prop];
            }
        }
        return b;
    }

    // http://stackoverflow.com/questions/5605401/insert-link-in-contenteditable-element
    // by Tim Down
    function saveSelection() {
        var i,
            len,
            ranges,
            sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            ranges = [];
            for (i = 0, len = sel.rangeCount; i < len; i += 1) {
                ranges.push(sel.getRangeAt(i));
            }
            return ranges;
        }
        return null;
    }

    function restoreSelection(savedSel) {
        var i,
            len,
            sel = window.getSelection();
        if (savedSel) {
            sel.removeAllRanges();
            for (i = 0, len = savedSel.length; i < len; i += 1) {
                sel.addRange(savedSel[i]);
            }
        }
    }

    // http://stackoverflow.com/questions/1197401/how-can-i-get-the-element-the-caret-is-in-with-javascript-when-using-contentedi
    // by You
    function getSelectionStart() {
        var node = document.getSelection().anchorNode,
            startNode = (node && node.nodeType === 3 ? node.parentNode : node);
        return startNode;
    }

    // http://stackoverflow.com/questions/4176923/html-of-selected-text
    // by Tim Down
    function getSelectionHtml() {
        var i,
            html = '',
            sel,
            len,
            container;
        if (window.getSelection !== undefined) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                container = document.createElement('div');
                for (i = 0, len = sel.rangeCount; i < len; i += 1) {
                    container.appendChild(sel.getRangeAt(i).cloneContents());
                }
                html = container.innerHTML;
            }
        } else if (document.selection !== undefined) {
            if (document.selection.type === 'Text') {
                html = document.selection.createRange().htmlText;
            }
        }
        return html;
    }

    // https://github.com/jashkenas/underscore
    function isElement(obj) {
        return !!(obj && obj.nodeType === 1);
    }

    MediumEditor.prototype = {
        defaults: {
            allowMultiParagraphSelection: true,
            anchorInputPlaceholder: 'Paste or type a link',
            anchorPreviewHideDelay: 500,
            buttons: ['bold', 'italic', 'underline', 'anchor', 'header1', 'header2', 'quote'],
            buttonLabels: false,
            checkLinkFormat: false,
            cleanPastedHTML: false,
            delay: 0,
            diffLeft: 0,
            diffTop: -10,
            disableReturn: false,
            disableDoubleReturn: false,
            disableToolbar: false,
            disableEditing: false,
            elementsContainer: false,
            firstHeader: 'h3',
            forcePlainText: true,
            placeholder: 'Write your story...',
            secondHeader: 'h4',
            targetBlank: false,
            extensions: {}
        },

        // http://stackoverflow.com/questions/17907445/how-to-detect-ie11#comment30165888_17907562
        // by rg89
        isIE: ((navigator.appName === 'Microsoft Internet Explorer') || ((navigator.appName === 'Netscape') && (new RegExp('Trident/.*rv:([0-9]{1,}[.0-9]{0,})').exec(navigator.userAgent) !== null))),

        init: function (elements, options) {
            this.setElementSelection(elements);
            if (this.elements.length === 0) {
                return;
            }
            this.parentElements = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre'];
            this.id = document.querySelectorAll('.medium-editor-toolbar').length + 1;
            this.options = extend(options, this.defaults);
            return this.setup();
        },

        setup: function () {
            this.isActive = true;
            this.initElements()
                .bindSelect()
                .bindPaste()
                .setPlaceholders()
                .bindWindowActions();
        },

        initElements: function () {
            this.updateElementList();
            var i,
                addToolbar = false;
            for (i = 0; i < this.elements.length; i += 1) {
                if (!this.options.disableEditing && !this.elements[i].getAttribute('data-disable-editing')) {
                    this.elements[i].setAttribute('contentEditable', true);
                }
                if (!this.elements[i].getAttribute('data-placeholder')) {
                    this.elements[i].setAttribute('data-placeholder', this.options.placeholder);
                }
                this.elements[i].setAttribute('data-medium-element', true);
                this.bindParagraphCreation(i).bindReturn(i).bindTab(i);
                if (!this.options.disableToolbar && !this.elements[i].getAttribute('data-disable-toolbar')) {
                    addToolbar = true;
                }
            }
            // Init toolbar
            if (addToolbar) {
                if (!this.options.elementsContainer) {
                    this.options.elementsContainer = document.body;
                }
                this.initToolbar()
                    .bindButtons()
                    .bindAnchorForm()
                    .bindAnchorPreview();
            }
            return this;
        },

        setElementSelection: function (selector) {
            this.elementSelection = selector;
            this.updateElementList();
        },

        updateElementList: function () {
            this.elements = typeof this.elementSelection === 'string' ? document.querySelectorAll(this.elementSelection) : this.elementSelection;
            if (this.elements.nodeType === 1) {
                this.elements = [this.elements];
            }
        },

        serialize: function () {
            var i,
                elementid,
                content = {};
            for (i = 0; i < this.elements.length; i += 1) {
                elementid = (this.elements[i].id !== '') ? this.elements[i].id : 'element-' + i;
                content[elementid] = {
                    value: this.elements[i].innerHTML.trim()
                };
            }
            return content;
        },

        /**
         * Helper function to call a method with a number of parameters on all registered extensions.
         * The function assures that the function exists before calling.
         *
         * @param {string} funcName name of the function to call
         * @param [args] arguments passed into funcName
         */
        callExtensions: function (funcName) {
            if (arguments.length < 1) {
                return;
            }

            var args = Array.prototype.slice.call(arguments, 1),
                ext,
                name;

            for (name in this.options.extensions) {
                if (this.options.extensions.hasOwnProperty(name)) {
                    ext = this.options.extensions[name];
                    if (ext[funcName] !== undefined) {
                        ext[funcName].apply(ext, args);
                    }
                }
            }
        },

        bindParagraphCreation: function (index) {
            var self = this;
            this.elements[index].addEventListener('keypress', function (e) {
                var node = getSelectionStart(),
                    tagName;
                if (e.which === 32) {
                    tagName = node.tagName.toLowerCase();
                    if (tagName === 'a') {
                        document.execCommand('unlink', false, null);
                    }
                }
            });

            this.elements[index].addEventListener('keyup', function (e) {
                var node = getSelectionStart(),
                    tagName;
                if (node && node.getAttribute('data-medium-element') && node.children.length === 0 && !(self.options.disableReturn || node.getAttribute('data-disable-return'))) {
                    document.execCommand('formatBlock', false, 'p');
                }
                if (e.which === 13) {
                    node = getSelectionStart();
                    tagName = node.tagName.toLowerCase();
                    if (!(self.options.disableReturn || this.getAttribute('data-disable-return')) &&
                        tagName !== 'li' && !self.isListItemChild(node)) {
                        if (!e.shiftKey) {
                            document.execCommand('formatBlock', false, 'p');
                        }
                        if (tagName === 'a') {
                            document.execCommand('unlink', false, null);
                        }
                    }
                }
            });
            return this;
        },

        isListItemChild: function (node) {
            var parentNode = node.parentNode,
                tagName = parentNode.tagName.toLowerCase();
            while (this.parentElements.indexOf(tagName) === -1 && tagName !== 'div') {
                if (tagName === 'li') {
                    return true;
                }
                parentNode = parentNode.parentNode;
                if (parentNode && parentNode.tagName) {
                    tagName = parentNode.tagName.toLowerCase();
                } else {
                    return false;
                }
            }
            return false;
        },

        bindReturn: function (index) {
            var self = this;
            this.elements[index].addEventListener('keypress', function (e) {
                if (e.which === 13) {
                    if (self.options.disableReturn || this.getAttribute('data-disable-return')) {
                        e.preventDefault();
                    } else if (self.options.disableDoubleReturn || this.getAttribute('data-disable-double-return')) {
                        var node = getSelectionStart();
                        if (node && node.innerText === '\n') {
                            e.preventDefault();
                        }
                    }
                }
            });
            return this;
        },

        bindTab: function (index) {
            this.elements[index].addEventListener('keydown', function (e) {
                if (e.which === 9) {
                    // Override tab only for pre nodes
                    var tag = getSelectionStart().tagName.toLowerCase();
                    if (tag === 'pre') {
                        e.preventDefault();
                        document.execCommand('insertHtml', null, '    ');
                    }
                }
            });
            return this;
        },

        buttonTemplate: function (btnType) {
            var buttonLabels = this.getButtonLabels(this.options.buttonLabels),
                buttonTemplates = {
                    'bold': '<button class="medium-editor-action medium-editor-action-bold" data-action="bold" data-element="b">' + buttonLabels.bold + '</button>',
                    'italic': '<button class="medium-editor-action medium-editor-action-italic" data-action="italic" data-element="i">' + buttonLabels.italic + '</button>',
                    'underline': '<button class="medium-editor-action medium-editor-action-underline" data-action="underline" data-element="u">' + buttonLabels.underline + '</button>',
                    'strikethrough': '<button class="medium-editor-action medium-editor-action-strikethrough" data-action="strikethrough" data-element="strike"><strike>A</strike></button>',
                    'superscript': '<button class="medium-editor-action medium-editor-action-superscript" data-action="superscript" data-element="sup">' + buttonLabels.superscript + '</button>',
                    'subscript': '<button class="medium-editor-action medium-editor-action-subscript" data-action="subscript" data-element="sub">' + buttonLabels.subscript + '</button>',
                    'anchor': '<button class="medium-editor-action medium-editor-action-anchor" data-action="anchor" data-element="a">' + buttonLabels.anchor + '</button>',
                    'image': '<button class="medium-editor-action medium-editor-action-image" data-action="image" data-element="img">' + buttonLabels.image + '</button>',
                    'header1': '<button class="medium-editor-action medium-editor-action-header1" data-action="append-' + this.options.firstHeader + '" data-element="' + this.options.firstHeader + '">' + buttonLabels.header1 + '</button>',
                    'header2': '<button class="medium-editor-action medium-editor-action-header2" data-action="append-' + this.options.secondHeader + '" data-element="' + this.options.secondHeader + '">' + buttonLabels.header2 + '</button>',
                    'quote': '<button class="medium-editor-action medium-editor-action-quote" data-action="append-blockquote" data-element="blockquote">' + buttonLabels.quote + '</button>',
                    'orderedlist': '<button class="medium-editor-action medium-editor-action-orderedlist" data-action="insertorderedlist" data-element="ol">' + buttonLabels.orderedlist + '</button>',
                    'unorderedlist': '<button class="medium-editor-action medium-editor-action-unorderedlist" data-action="insertunorderedlist" data-element="ul">' + buttonLabels.unorderedlist + '</button>',
                    'pre': '<button class="medium-editor-action medium-editor-action-pre" data-action="append-pre" data-element="pre">' + buttonLabels.pre + '</button>',
                    'indent': '<button class="medium-editor-action medium-editor-action-indent" data-action="indent" data-element="ul">' + buttonLabels.indent + '</button>',
                    'outdent': '<button class="medium-editor-action medium-editor-action-outdent" data-action="outdent" data-element="ul">' + buttonLabels.outdent + '</button>'
                };
            return buttonTemplates[btnType] || false;
        },

        // TODO: break method
        getButtonLabels: function (buttonLabelType) {
            var customButtonLabels,
                attrname,
                buttonLabels = {
                    'bold': '<b>B</b>',
                    'italic': '<b><i>I</i></b>',
                    'underline': '<b><u>U</u></b>',
                    'superscript': '<b>x<sup>1</sup></b>',
                    'subscript': '<b>x<sub>1</sub></b>',
                    'anchor': '<b>#</b>',
                    'image': '<b>image</b>',
                    'header1': '<b>H1</b>',
                    'header2': '<b>H2</b>',
                    'quote': '<b>&ldquo;</b>',
                    'orderedlist': '<b>1.</b>',
                    'unorderedlist': '<b>&bull;</b>',
                    'pre': '<b>0101</b>',
                    'indent': '<b>&rarr;</b>',
                    'outdent': '<b>&larr;</b>'
                };
            if (buttonLabelType === 'fontawesome') {
                customButtonLabels = {
                    'bold': '<i class="fa fa-bold"></i>',
                    'italic': '<i class="fa fa-italic"></i>',
                    'underline': '<i class="fa fa-underline"></i>',
                    'superscript': '<i class="fa fa-superscript"></i>',
                    'subscript': '<i class="fa fa-subscript"></i>',
                    'anchor': '<i class="fa fa-link"></i>',
                    'image': '<i class="fa fa-picture-o"></i>',
                    'quote': '<i class="fa fa-quote-right"></i>',
                    'orderedlist': '<i class="fa fa-list-ol"></i>',
                    'unorderedlist': '<i class="fa fa-list-ul"></i>',
                    'pre': '<i class="fa fa-code fa-lg"></i>',
                    'indent': '<i class="fa fa-indent"></i>',
                    'outdent': '<i class="fa fa-outdent"></i>'
                };
            } else if (typeof buttonLabelType === 'object') {
                customButtonLabels = buttonLabelType;
            }
            if (typeof customButtonLabels === 'object') {
                for (attrname in customButtonLabels) {
                    if (customButtonLabels.hasOwnProperty(attrname)) {
                        buttonLabels[attrname] = customButtonLabels[attrname];
                    }
                }
            }
            return buttonLabels;
        },

        initToolbar: function () {
            if (this.toolbar) {
                return this;
            }
            this.toolbar = this.createToolbar();
            this.keepToolbarAlive = false;
            this.anchorForm = this.toolbar.querySelector('.medium-editor-toolbar-form-anchor');
            this.anchorInput = this.anchorForm.querySelector('input');
            this.toolbarActions = this.toolbar.querySelector('.medium-editor-toolbar-actions');
            this.anchorPreview = this.createAnchorPreview();

            return this;
        },

        createToolbar: function () {
            var toolbar = document.createElement('div');
            toolbar.id = 'medium-editor-toolbar-' + this.id;
            toolbar.className = 'medium-editor-toolbar';
            toolbar.appendChild(this.toolbarButtons());
            toolbar.appendChild(this.toolbarFormAnchor());
            this.options.elementsContainer.appendChild(toolbar);
            return toolbar;
        },

        //TODO: actionTemplate
        toolbarButtons: function () {
            var btns = this.options.buttons,
                ul = document.createElement('ul'),
                li,
                i,
                btn,
                ext;

            ul.id = 'medium-editor-toolbar-actions';
            ul.className = 'medium-editor-toolbar-actions clearfix';

            for (i = 0; i < btns.length; i += 1) {
                if (this.options.extensions.hasOwnProperty(btns[i])) {
                    ext = this.options.extensions[btns[i]];
                    btn = ext.getButton !== undefined ? ext.getButton() : null;
                } else {
                    btn = this.buttonTemplate(btns[i]);
                }

                if (btn) {
                    li = document.createElement('li');
                    if (isElement(btn)) {
                        li.appendChild(btn);
                    } else {
                        li.innerHTML = btn;
                    }
                    ul.appendChild(li);
                }
            }

            return ul;
        },

        toolbarFormAnchor: function () {
            var anchor = document.createElement('div'),
                input = document.createElement('input'),
                a = document.createElement('a');

            a.setAttribute('href', '#');
            a.innerHTML = '&times;';

            input.setAttribute('type', 'text');
            input.setAttribute('placeholder', this.options.anchorInputPlaceholder);

            anchor.className = 'medium-editor-toolbar-form-anchor';
            anchor.id = 'medium-editor-toolbar-form-anchor';
            anchor.appendChild(input);
            anchor.appendChild(a);

            return anchor;
        },

        bindSelect: function () {
            var self = this,
                timer = '',
                i;

            this.checkSelectionWrapper = function (e) {

                // Do not close the toolbar when bluring the editable area and clicking into the anchor form
                if (e && self.clickingIntoArchorForm(e)) {
                    return false;
                }

                clearTimeout(timer);
                timer = setTimeout(function () {
                    self.checkSelection();
                }, self.options.delay);
            };

            document.documentElement.addEventListener('mouseup', this.checkSelectionWrapper);

            for (i = 0; i < this.elements.length; i += 1) {
                this.elements[i].addEventListener('keyup', this.checkSelectionWrapper);
                this.elements[i].addEventListener('blur', this.checkSelectionWrapper);
            }
            return this;
        },

        checkSelection: function () {
            var newSelection,
                selectionElement;

            if (this.keepToolbarAlive !== true && !this.options.disableToolbar) {
                newSelection = window.getSelection();
                if (newSelection.toString().trim() === '' ||
                    (this.options.allowMultiParagraphSelection === false && this.hasMultiParagraphs())) {
                    this.hideToolbarActions();
                } else {
                    selectionElement = this.getSelectionElement();
                    if (!selectionElement || selectionElement.getAttribute('data-disable-toolbar')) {
                        this.hideToolbarActions();
                    } else {
                        this.checkSelectionElement(newSelection, selectionElement);
                    }
                }
            }
            return this;
        },

        clickingIntoArchorForm: function (e) {
            var self = this;
            if (e.type && e.type.toLowerCase() === 'blur' && e.relatedTarget && e.relatedTarget === self.anchorInput) {
                return true;
            }
            return false;
        },

        hasMultiParagraphs: function () {
            var selectionHtml = getSelectionHtml().replace(/<[\S]+><\/[\S]+>/gim, ''),
                hasMultiParagraphs = selectionHtml.match(/<(p|h[0-6]|blockquote)>([\s\S]*?)<\/(p|h[0-6]|blockquote)>/g);

            return (hasMultiParagraphs ? hasMultiParagraphs.length : 0);
        },

        checkSelectionElement: function (newSelection, selectionElement) {
            var i;
            this.selection = newSelection;
            this.selectionRange = this.selection.getRangeAt(0);
            for (i = 0; i < this.elements.length; i += 1) {
                if (this.elements[i] === selectionElement) {
                    this.setToolbarButtonStates()
                        .setToolbarPosition()
                        .showToolbarActions();
                    return;
                }
            }
            this.hideToolbarActions();
        },

        getSelectionElement: function () {
            var selection = window.getSelection(),
                range, current, parent,
                result,
                getMediumElement = function (e) {
                    var localParent = e;
                    try {
                        while (!localParent.getAttribute('data-medium-element')) {
                            localParent = localParent.parentNode;
                        }
                    } catch (errb) {
                        return false;
                    }
                    return localParent;
                };
            // First try on current node
            try {
                range = selection.getRangeAt(0);
                current = range.commonAncestorContainer;
                parent = current.parentNode;

                if (current.getAttribute('data-medium-element')) {
                    result = current;
                } else {
                    result = getMediumElement(parent);
                }
                // If not search in the parent nodes.
            } catch (err) {
                result = getMediumElement(parent);
            }
            return result;
        },

        setToolbarPosition: function () {
            var buttonHeight = 50,
                selection = window.getSelection(),
                range = selection.getRangeAt(0),
                boundary = range.getBoundingClientRect(),
                defaultLeft = (this.options.diffLeft) - (this.toolbar.offsetWidth / 2),
                middleBoundary = (boundary.left + boundary.right) / 2,
                halfOffsetWidth = this.toolbar.offsetWidth / 2;
            if (boundary.top < buttonHeight) {
                this.toolbar.classList.add('medium-toolbar-arrow-over');
                this.toolbar.classList.remove('medium-toolbar-arrow-under');
                this.toolbar.style.top = buttonHeight + boundary.bottom - this.options.diffTop + window.pageYOffset - this.toolbar.offsetHeight + 'px';
            } else {
                this.toolbar.classList.add('medium-toolbar-arrow-under');
                this.toolbar.classList.remove('medium-toolbar-arrow-over');
                this.toolbar.style.top = boundary.top + this.options.diffTop + window.pageYOffset - this.toolbar.offsetHeight + 'px';
            }
            if (middleBoundary < halfOffsetWidth) {
                this.toolbar.style.left = defaultLeft + halfOffsetWidth + 'px';
            } else if ((window.innerWidth - middleBoundary) < halfOffsetWidth) {
                this.toolbar.style.left = window.innerWidth + defaultLeft - halfOffsetWidth + 'px';
            } else {
                this.toolbar.style.left = defaultLeft + middleBoundary + 'px';
            }

            this.hideAnchorPreview();

            return this;
        },

        setToolbarButtonStates: function () {
            var buttons = this.toolbarActions.querySelectorAll('button'),
                i;
            for (i = 0; i < buttons.length; i += 1) {
                buttons[i].classList.remove('medium-editor-button-active');
            }
            this.checkActiveButtons();
            return this;
        },

        checkActiveButtons: function () {
            var elements = Array.prototype.slice.call(this.elements),
                parentNode = this.getSelectedParentElement();
            while (parentNode.tagName !== undefined && this.parentElements.indexOf(parentNode.tagName.toLowerCase) === -1) {
                this.activateButton(parentNode.tagName.toLowerCase());
                this.callExtensions('checkState', parentNode);

                // we can abort the search upwards if we leave the contentEditable element
                if (elements.indexOf(parentNode) !== -1) {
                    break;
                }
                parentNode = parentNode.parentNode;
            }
        },

        activateButton: function (tag) {
            var el = this.toolbar.querySelector('[data-element="' + tag + '"]');
            if (el !== null && el.className.indexOf('medium-editor-button-active') === -1) {
                el.className += ' medium-editor-button-active';
            }
        },

        bindButtons: function () {
            var buttons = this.toolbar.querySelectorAll('button'),
                i,
                self = this,
                triggerAction = function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (self.selection === undefined) {
                        self.checkSelection();
                    }
                    if (this.className.indexOf('medium-editor-button-active') > -1) {
                        this.classList.remove('medium-editor-button-active');
                    } else {
                        this.className += ' medium-editor-button-active';
                    }
                    if (this.hasAttribute('data-action')) {
                        self.execAction(this.getAttribute('data-action'), e);
                    }
                };
            for (i = 0; i < buttons.length; i += 1) {
                buttons[i].addEventListener('click', triggerAction);
            }
            this.setFirstAndLastItems(buttons);
            return this;
        },

        setFirstAndLastItems: function (buttons) {
            if (buttons.length > 0) {
                buttons[0].className += ' medium-editor-button-first';
                buttons[buttons.length - 1].className += ' medium-editor-button-last';
            }
            return this;
        },

        execAction: function (action, e) {
            if (action.indexOf('append-') > -1) {
                this.execFormatBlock(action.replace('append-', ''));
                this.setToolbarPosition();
                this.setToolbarButtonStates();
            } else if (action === 'anchor') {
                this.triggerAnchorAction(e);
            } else if (action === 'image') {
                document.execCommand('insertImage', false, window.getSelection());
            } else {
                document.execCommand(action, false, null);
                this.setToolbarPosition();
            }
        },

        // http://stackoverflow.com/questions/15867542/range-object-get-selection-parent-node-chrome-vs-firefox
        rangeSelectsSingleNode: function (range) {
            var startNode = range.startContainer;
            return startNode === range.endContainer &&
                startNode.hasChildNodes() &&
                range.endOffset === range.startOffset + 1;
        },

        getSelectedParentElement: function () {
            var selectedParentElement = null,
                range = this.selectionRange;
            if (this.rangeSelectsSingleNode(range)) {
                selectedParentElement = range.startContainer.childNodes[range.startOffset];
            } else if (range.startContainer.nodeType === 3) {
                selectedParentElement = range.startContainer.parentNode;
            } else {
                selectedParentElement = range.startContainer;
            }
            return selectedParentElement;
        },

        triggerAnchorAction: function () {
            var selectedParentElement = this.getSelectedParentElement();
            if (selectedParentElement.tagName &&
                    selectedParentElement.tagName.toLowerCase() === 'a') {
                document.execCommand('unlink', false, null);
            } else {
                if (this.anchorForm.style.display === 'block') {
                    this.showToolbarActions();
                } else {
                    this.showAnchorForm();
                }
            }
            return this;
        },

        execFormatBlock: function (el) {
            var selectionData = this.getSelectionData(this.selection.anchorNode);
            // FF handles blockquote differently on formatBlock
            // allowing nesting, we need to use outdent
            // https://developer.mozilla.org/en-US/docs/Rich-Text_Editing_in_Mozilla
            if (el === 'blockquote' && selectionData.el &&
                selectionData.el.parentNode.tagName.toLowerCase() === 'blockquote') {
                return document.execCommand('outdent', false, null);
            }
            if (selectionData.tagName === el) {
                el = 'p';
            }
            // When IE we need to add <> to heading elements and
            //  blockquote needs to be called as indent
            // http://stackoverflow.com/questions/10741831/execcommand-formatblock-headings-in-ie
            // http://stackoverflow.com/questions/1816223/rich-text-editor-with-blockquote-function/1821777#1821777
            if (this.isIE) {
                if (el === 'blockquote') {
                    return document.execCommand('indent', false, el);
                }
                el = '<' + el + '>';
            }
            return document.execCommand('formatBlock', false, el);
        },

        getSelectionData: function (el) {
            var tagName;

            if (el && el.tagName) {
                tagName = el.tagName.toLowerCase();
            }

            while (el && this.parentElements.indexOf(tagName) === -1) {
                el = el.parentNode;
                if (el && el.tagName) {
                    tagName = el.tagName.toLowerCase();
                }
            }

            return {
                el: el,
                tagName: tagName
            };
        },

        getFirstChild: function (el) {
            var firstChild = el.firstChild;
            while (firstChild !== null && firstChild.nodeType !== 1) {
                firstChild = firstChild.nextSibling;
            }
            return firstChild;
        },

        hideToolbarActions: function () {
            this.keepToolbarAlive = false;
            if (this.toolbar !== undefined) {
                this.toolbar.classList.remove('medium-editor-toolbar-active');
            }
        },

        showToolbarActions: function () {
            var self = this,
                timer;
            this.anchorForm.style.display = 'none';
            this.toolbarActions.style.display = 'block';
            this.keepToolbarAlive = false;
            clearTimeout(timer);
            timer = setTimeout(function () {
                if (self.toolbar && !self.toolbar.classList.contains('medium-editor-toolbar-active')) {
                    self.toolbar.classList.add('medium-editor-toolbar-active');
                }
            }, 100);
        },

        showAnchorForm: function (link_value) {
            this.toolbarActions.style.display = 'none';
            this.savedSelection = saveSelection();
            this.anchorForm.style.display = 'block';
            this.keepToolbarAlive = true;
            this.anchorInput.focus();
            this.anchorInput.value = link_value || '';
        },

        bindAnchorForm: function () {
            var linkCancel = this.anchorForm.querySelector('a'),
                self = this;
            this.anchorForm.addEventListener('click', function (e) {
                e.stopPropagation();
            });
            this.anchorInput.addEventListener('keyup', function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    self.createLink(this);
                }
            });
            this.anchorInput.addEventListener('click', function (e) {
                // make sure not to hide form when cliking into the input
                e.stopPropagation();
                self.keepToolbarAlive = true;
            });
            this.anchorInput.addEventListener('blur', function () {
                self.keepToolbarAlive = false;
                self.checkSelection();
            });
            linkCancel.addEventListener('click', function (e) {
                e.preventDefault();
                self.showToolbarActions();
                restoreSelection(self.savedSelection);
            });
            return this;
        },


        hideAnchorPreview: function () {
            this.anchorPreview.classList.remove('medium-editor-anchor-preview-active');
        },

        // TODO: break method
        showAnchorPreview: function (anchorEl) {
            if (this.anchorPreview.classList.contains('medium-editor-anchor-preview-active')) {
                return true;
            }

            var self = this,
                buttonHeight = 40,
                boundary = anchorEl.getBoundingClientRect(),
                middleBoundary = (boundary.left + boundary.right) / 2,
                halfOffsetWidth,
                defaultLeft,
                timer;

            self.anchorPreview.querySelector('i').textContent = anchorEl.href;
            halfOffsetWidth = self.anchorPreview.offsetWidth / 2;
            defaultLeft = self.options.diffLeft - halfOffsetWidth;

            clearTimeout(timer);
            timer = setTimeout(function () {
                if (self.anchorPreview && !self.anchorPreview.classList.contains('medium-editor-anchor-preview-active')) {
                    self.anchorPreview.classList.add('medium-editor-anchor-preview-active');
                }
            }, 100);

            self.observeAnchorPreview(anchorEl);

            self.anchorPreview.classList.add('medium-toolbar-arrow-over');
            self.anchorPreview.classList.remove('medium-toolbar-arrow-under');
            self.anchorPreview.style.top = Math.round(buttonHeight + boundary.bottom - self.options.diffTop + window.pageYOffset - self.anchorPreview.offsetHeight) + 'px';
            if (middleBoundary < halfOffsetWidth) {
                self.anchorPreview.style.left = defaultLeft + halfOffsetWidth + 'px';
            } else if ((window.innerWidth - middleBoundary) < halfOffsetWidth) {
                self.anchorPreview.style.left = window.innerWidth + defaultLeft - halfOffsetWidth + 'px';
            } else {
                self.anchorPreview.style.left = defaultLeft + middleBoundary + 'px';
            }

            return this;
        },

        // TODO: break method
        observeAnchorPreview: function (anchorEl) {
            var self = this,
                lastOver = (new Date()).getTime(),
                over = true,
                stamp = function () {
                    lastOver = (new Date()).getTime();
                    over = true;
                },
                unstamp = function (e) {
                    if (!e.relatedTarget || !/anchor-preview/.test(e.relatedTarget.className)) {
                        over = false;
                    }
                },
                interval_timer = setInterval(function () {
                    if (over) {
                        return true;
                    }
                    var durr = (new Date()).getTime() - lastOver;
                    if (durr > self.options.anchorPreviewHideDelay) {
                        // hide the preview 1/2 second after mouse leaves the link
                        self.hideAnchorPreview();

                        // cleanup
                        clearInterval(interval_timer);
                        self.anchorPreview.removeEventListener('mouseover', stamp);
                        self.anchorPreview.removeEventListener('mouseout', unstamp);
                        anchorEl.removeEventListener('mouseover', stamp);
                        anchorEl.removeEventListener('mouseout', unstamp);

                    }
                }, 200);

            self.anchorPreview.addEventListener('mouseover', stamp);
            self.anchorPreview.addEventListener('mouseout', unstamp);
            anchorEl.addEventListener('mouseover', stamp);
            anchorEl.addEventListener('mouseout', unstamp);
        },

        createAnchorPreview: function () {
            var self = this,
                anchorPreview = document.createElement('div');

            anchorPreview.id = 'medium-editor-anchor-preview-' + this.id;
            anchorPreview.className = 'medium-editor-anchor-preview';
            anchorPreview.innerHTML = this.anchorPreviewTemplate();
            this.options.elementsContainer.appendChild(anchorPreview);

            anchorPreview.addEventListener('click', function () {
                self.anchorPreviewClickHandler();
            });

            return anchorPreview;
        },

        anchorPreviewTemplate: function () {
            return '<div class="medium-editor-toolbar-anchor-preview" id="medium-editor-toolbar-anchor-preview">' +
                '    <i class="medium-editor-toolbar-anchor-preview-inner"></i>' +
                '</div>';
        },

        anchorPreviewClickHandler: function (e) {
            if (this.activeAnchor) {

                var self = this,
                    range = document.createRange(),
                    sel = window.getSelection();

                range.selectNodeContents(self.activeAnchor);
                sel.removeAllRanges();
                sel.addRange(range);
                setTimeout(function () {
                    if (self.activeAnchor) {
                        self.showAnchorForm(self.activeAnchor.href);
                    }
                    self.keepToolbarAlive = false;
                }, 100 + self.options.delay);

            }

            this.hideAnchorPreview();
        },

        editorAnchorObserver: function (e) {
            var self = this,
                overAnchor = true,
                leaveAnchor = function () {
                    // mark the anchor as no longer hovered, and stop listening
                    overAnchor = false;
                    self.activeAnchor.removeEventListener('mouseout', leaveAnchor);
                };

            if (e.target && e.target.tagName.toLowerCase() === 'a') {

                // Detect empty href attributes
                // The browser will make href="" or href="#top"
                // into absolute urls when accessed as e.targed.href, so check the html
                if (!/href=["']\S+["']/.test(e.target.outerHTML) || /href=["']#\S+["']/.test(e.target.outerHTML)) {
                    return true;
                }

                // only show when hovering on anchors
                if (this.toolbar.classList.contains('medium-editor-toolbar-active')) {
                    // only show when toolbar is not present
                    return true;
                }
                this.activeAnchor = e.target;
                this.activeAnchor.addEventListener('mouseout', leaveAnchor);
                // show the anchor preview according to the configured delay
                // if the mouse has not left the anchor tag in that time
                setTimeout(function () {
                    if (overAnchor) {
                        self.showAnchorPreview(e.target);
                    }
                }, self.options.delay);


            }
        },

        bindAnchorPreview: function (index) {
            var i, self = this;
            this.editorAnchorObserverWrapper = function (e) {
                self.editorAnchorObserver(e);
            };
            for (i = 0; i < this.elements.length; i += 1) {
                this.elements[i].addEventListener('mouseover', this.editorAnchorObserverWrapper);
            }
            return this;
        },

        checkLinkFormat: function (value) {
            var re = /^https?:\/\//;
            if (value.match(re)) {
                return value;
            }
            return "http://" + value;
        },

        setTargetBlank: function () {
            var el = getSelectionStart(),
                i;
            if (el.tagName.toLowerCase() === 'a') {
                el.target = '_blank';
            } else {
                el = el.getElementsByTagName('a');
                for (i = 0; i < el.length; i += 1) {
                    el[i].target = '_blank';
                }
            }
        },

        createLink: function (input) {
            restoreSelection(this.savedSelection);
            if (this.options.checkLinkFormat) {
                input.value = this.checkLinkFormat(input.value);
            }
            document.execCommand('createLink', false, input.value);
            if (this.options.targetBlank) {
                this.setTargetBlank();
            }
            this.checkSelection();
            this.showToolbarActions();
            input.value = '';
        },

        bindWindowActions: function () {
            var timerResize,
                self = this;
            this.windowResizeHandler = function () {
                clearTimeout(timerResize);
                timerResize = setTimeout(function () {
                    if (self.toolbar && self.toolbar.classList.contains('medium-editor-toolbar-active')) {
                        self.setToolbarPosition();
                    }
                }, 100);
            };
            window.addEventListener('resize', this.windowResizeHandler);
            return this;
        },

        activate: function () {
            if (this.isActive) {
                return;
            }

            this.setup();
        },

        // TODO: break method
        deactivate: function () {
            var i;
            if (!this.isActive) {
                return;
            }
            this.isActive = false;

            if (this.toolbar !== undefined) {
                this.options.elementsContainer.removeChild(this.anchorPreview);
                this.options.elementsContainer.removeChild(this.toolbar);
                delete this.toolbar;
                delete this.anchorPreview;
            }

            document.documentElement.removeEventListener('mouseup', this.checkSelectionWrapper);
            window.removeEventListener('resize', this.windowResizeHandler);

            for (i = 0; i < this.elements.length; i += 1) {
                this.elements[i].removeEventListener('mouseover', this.editorAnchorObserverWrapper);
                this.elements[i].removeEventListener('keyup', this.checkSelectionWrapper);
                this.elements[i].removeEventListener('blur', this.checkSelectionWrapper);
                this.elements[i].removeEventListener('paste', this.pasteWrapper);
                this.elements[i].removeAttribute('contentEditable');
                this.elements[i].removeAttribute('data-medium-element');
            }

        },

        htmlEntities: function (str) {
            // converts special characters (like <) into their escaped/encoded values (like &lt;).
            // This allows you to show to display the string without the browser reading it as HTML.
            return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        },

        bindPaste: function () {
            var i, self = this;
            this.pasteWrapper = function (e) {
                var paragraphs,
                    html = '',
                    p;

                this.classList.remove('medium-editor-placeholder');
                if (!self.options.forcePlainText && !self.options.cleanPastedHTML) {
                    return this;
                }

                if (e.clipboardData && e.clipboardData.getData && !e.defaultPrevented) {
                    e.preventDefault();

                    if (self.options.cleanPastedHTML && e.clipboardData.getData('text/html')) {
                        return self.cleanPaste(e.clipboardData.getData('text/html'));
                    }
                    if (!(self.options.disableReturn || this.getAttribute('data-disable-return'))) {
                        paragraphs = e.clipboardData.getData('text/plain').split(/[\r\n]/g);
                        for (p = 0; p < paragraphs.length; p += 1) {
                            if (paragraphs[p] !== '') {
                                if (navigator.userAgent.match(/firefox/i) && p === 0) {
                                    html += self.htmlEntities(paragraphs[p]);
                                } else {
                                    html += '<p>' + self.htmlEntities(paragraphs[p]) + '</p>';
                                }
                            }
                        }
                        document.execCommand('insertHTML', false, html);
                    } else {
                        document.execCommand('insertHTML', false, e.clipboardData.getData('text/plain'));
                    }
                }
            };
            for (i = 0; i < this.elements.length; i += 1) {
                this.elements[i].addEventListener('paste', this.pasteWrapper);
            }
            return this;
        },

        setPlaceholders: function () {
            var i,
                activatePlaceholder = function (el) {
                    if (!(el.querySelector('img')) &&
                            el.textContent.replace(/^\s+|\s+$/g, '') === '') {
                        el.classList.add('medium-editor-placeholder');
                    }
                },
                placeholderWrapper = function (e) {
                    this.classList.remove('medium-editor-placeholder');
                    if (e.type !== 'keypress') {
                        activatePlaceholder(this);
                    }
                };
            for (i = 0; i < this.elements.length; i += 1) {
                activatePlaceholder(this.elements[i]);
                this.elements[i].addEventListener('blur', placeholderWrapper);
                this.elements[i].addEventListener('keypress', placeholderWrapper);
            }
            return this;
        },

        cleanPaste: function (text) {

            /*jslint regexp: true*/
            /*
                jslint does not allow character negation, because the negation
                will not match any unicode characters. In the regexes in this
                block, negation is used specifically to match the end of an html
                tag, and in fact unicode characters *should* be allowed.
            */
            var i, elList, workEl,
                el = this.getSelectionElement(),
                multiline = /<p|<br|<div/.test(text),
                replacements = [

                    // replace two bogus tags that begin pastes from google docs
                    [new RegExp(/<[^>]*docs-internal-guid[^>]*>/gi), ""],
                    [new RegExp(/<\/b>(<br[^>]*>)?$/gi), ""],

                     // un-html spaces and newlines inserted by OS X
                    [new RegExp(/<span class="Apple-converted-space">\s+<\/span>/g), ' '],
                    [new RegExp(/<br class="Apple-interchange-newline">/g), '<br>'],

                    // replace google docs italics+bold with a span to be replaced once the html is inserted
                    [new RegExp(/<span[^>]*(font-style:italic;font-weight:bold|font-weight:bold;font-style:italic)[^>]*>/gi), '<span class="replace-with italic bold">'],

                    // replace google docs italics with a span to be replaced once the html is inserted
                    [new RegExp(/<span[^>]*font-style:italic[^>]*>/gi), '<span class="replace-with italic">'],

                    //[replace google docs bolds with a span to be replaced once the html is inserted
                    [new RegExp(/<span[^>]*font-weight:bold[^>]*>/gi), '<span class="replace-with bold">'],

                     // replace manually entered b/i/a tags with real ones
                    [new RegExp(/&lt;(\/?)(i|b|a)&gt;/gi), '<$1$2>'],

                     // replace manually a tags with real ones, converting smart-quotes from google docs
                    [new RegExp(/&lt;a\s+href=(&quot;|&rdquo;|&ldquo;|“|”)([^&]+)(&quot;|&rdquo;|&ldquo;|“|”)&gt;/gi), '<a href="$2">']

                ];
            /*jslint regexp: false*/

            for (i = 0; i < replacements.length; i += 1) {
                text = text.replace(replacements[i][0], replacements[i][1]);
            }

            if (multiline) {

                // double br's aren't converted to p tags, but we want paragraphs.
                elList = text.split('<br><br>');

                this.pasteHTML('<p>' + elList.join('</p><p>') + '</p>');
                document.execCommand('insertText', false, "\n");

                // block element cleanup
                elList = el.querySelectorAll('p,div,br');
                for (i = 0; i < elList.length; i += 1) {

                    workEl = elList[i];

                    switch (workEl.tagName.toLowerCase()) {
                    case 'p':
                    case 'div':
                        this.filterCommonBlocks(workEl);
                        break;
                    case 'br':
                        this.filterLineBreak(workEl);
                        break;
                    }

                }


            } else {

                this.pasteHTML(text);

            }

        },

        pasteHTML: function (html) {
            var elList, workEl, i, fragmentBody, pasteBlock = document.createDocumentFragment();

            pasteBlock.appendChild(document.createElement('body'));

            fragmentBody = pasteBlock.querySelector('body');
            fragmentBody.innerHTML = html;

            this.cleanupSpans(fragmentBody);

            elList = fragmentBody.querySelectorAll('*');
            for (i = 0; i < elList.length; i += 1) {

                workEl = elList[i];

                // delete ugly attributes
                workEl.removeAttribute('class');
                workEl.removeAttribute('style');
                workEl.removeAttribute('dir');

                if (workEl.tagName.toLowerCase() === 'meta') {
                    workEl.parentNode.removeChild(workEl);
                }

            }
            document.execCommand('insertHTML', false, fragmentBody.innerHTML.replace(/&nbsp;/g, ' '));
        },
        isCommonBlock: function (el) {
            return (el && (el.tagName.toLowerCase() === 'p' || el.tagName.toLowerCase() === 'div'));
        },
        filterCommonBlocks: function (el) {
            if (/^\s*$/.test(el.innerText)) {
                el.parentNode.removeChild(el);
            }
        },
        filterLineBreak: function (el) {
            if (this.isCommonBlock(el.previousElementSibling)) {

                // remove stray br's following common block elements
                el.parentNode.removeChild(el);

            } else if (this.isCommonBlock(el.parentNode) && (el.parentNode.firstChild === el || el.parentNode.lastChild === el)) {

                // remove br's just inside open or close tags of a div/p
                el.parentNode.removeChild(el);

            } else if (el.parentNode.childElementCount === 1) {

                // and br's that are the only child of a div/p
                this.removeWithParent(el);

            }

        },

        // remove an element, including its parent, if it is the only element within its parent
        removeWithParent: function (el) {
            if (el && el.parentNode) {
                if (el.parentNode.parentNode && el.parentNode.childElementCount === 1) {
                    el.parentNode.parentNode.removeChild(el.parentNode);
                } else {
                    el.parentNode.removeChild(el.parentNode);
                }
            }
        },

        cleanupSpans: function (container_el) {

            var i,
                el,
                new_el,
                spans = container_el.querySelectorAll('.replace-with');

            for (i = 0; i < spans.length; i += 1) {

                el = spans[i];
                new_el = document.createElement(el.classList.contains('bold') ? 'b' : 'i');

                if (el.classList.contains('bold') && el.classList.contains('italic')) {

                    // add an i tag as well if this has both italics and bold
                    new_el.innerHTML = '<i>' + el.innerHTML + '</i>';

                } else {

                    new_el.innerHTML = el.innerHTML;

                }
                el.parentNode.replaceChild(new_el, el);

            }

            spans = container_el.querySelectorAll('span');
            for (i = 0; i < spans.length; i += 1) {

                el = spans[i];

                // remove empty spans, replace others with their contents
                if (/^\s*$/.test()) {
                    el.parentNode.removeChild(el);
                } else {
                    el.parentNode.replaceChild(document.createTextNode(el.innerText), el);
                }

            }

        }

    };

}(window, document));
/*!
 * Clean Blog v1.0.0 (http://startbootstrap.com)
 * Copyright 2014 Start Bootstrap
 * Licensed under Apache 2.0 (https://github.com/IronSummitMedia/startbootstrap/blob/gh-pages/LICENSE)
 */

// Contact Form Scripts

$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});

 // jqBootstrapValidation
 // * A plugin for automating validation on Twitter Bootstrap formatted forms.
 // *
 // * v1.3.6
 // *
 // * License: MIT <http://opensource.org/licenses/mit-license.php> - see LICENSE file
 // *
 // * http://ReactiveRaven.github.com/jqBootstrapValidation/
 

(function( $ ){

	var createdElements = [];

	var defaults = {
		options: {
			prependExistingHelpBlock: false,
			sniffHtml: true, // sniff for 'required', 'maxlength', etc
			preventSubmit: true, // stop the form submit event from firing if validation fails
			submitError: false, // function called if there is an error when trying to submit
			submitSuccess: false, // function called just before a successful submit event is sent to the server
            semanticallyStrict: false, // set to true to tidy up generated HTML output
			autoAdd: {
				helpBlocks: true
			},
            filter: function () {
                // return $(this).is(":visible"); // only validate elements you can see
                return true; // validate everything
            }
		},
    methods: {
      init : function( options ) {

        var settings = $.extend(true, {}, defaults);

        settings.options = $.extend(true, settings.options, options);

        var $siblingElements = this;

        var uniqueForms = $.unique(
          $siblingElements.map( function () {
            return $(this).parents("form")[0];
          }).toArray()
        );

        $(uniqueForms).bind("submit", function (e) {
          var $form = $(this);
          var warningsFound = 0;
          var $inputs = $form.find("input,textarea,select").not("[type=submit],[type=image]").filter(settings.options.filter);
          $inputs.trigger("submit.validation").trigger("validationLostFocus.validation");

          $inputs.each(function (i, el) {
            var $this = $(el),
              $controlGroup = $this.parents(".form-group").first();
            if (
              $controlGroup.hasClass("warning")
            ) {
              $controlGroup.removeClass("warning").addClass("error");
              warningsFound++;
            }
          });

          $inputs.trigger("validationLostFocus.validation");

          if (warningsFound) {
            if (settings.options.preventSubmit) {
              e.preventDefault();
            }
            $form.addClass("error");
            if ($.isFunction(settings.options.submitError)) {
              settings.options.submitError($form, e, $inputs.jqBootstrapValidation("collectErrors", true));
            }
          } else {
            $form.removeClass("error");
            if ($.isFunction(settings.options.submitSuccess)) {
              settings.options.submitSuccess($form, e);
            }
          }
        });

        return this.each(function(){

          // Get references to everything we're interested in
          var $this = $(this),
            $controlGroup = $this.parents(".form-group").first(),
            $helpBlock = $controlGroup.find(".help-block").first(),
            $form = $this.parents("form").first(),
            validatorNames = [];

          // create message container if not exists
          if (!$helpBlock.length && settings.options.autoAdd && settings.options.autoAdd.helpBlocks) {
              $helpBlock = $('<div class="help-block" />');
              $controlGroup.find('.controls').append($helpBlock);
							createdElements.push($helpBlock[0]);
          }

          // =============================================================
          //                                     SNIFF HTML FOR VALIDATORS
          // =============================================================

          // *snort sniff snuffle*

          if (settings.options.sniffHtml) {
            var message = "";
            // ---------------------------------------------------------
            //                                                   PATTERN
            // ---------------------------------------------------------
            if ($this.attr("pattern") !== undefined) {
              message = "Not in the expected format<!-- data-validation-pattern-message to override -->";
              if ($this.data("validationPatternMessage")) {
                message = $this.data("validationPatternMessage");
              }
              $this.data("validationPatternMessage", message);
              $this.data("validationPatternRegex", $this.attr("pattern"));
            }
            // ---------------------------------------------------------
            //                                                       MAX
            // ---------------------------------------------------------
            if ($this.attr("max") !== undefined || $this.attr("aria-valuemax") !== undefined) {
              var max = ($this.attr("max") !== undefined ? $this.attr("max") : $this.attr("aria-valuemax"));
              message = "Too high: Maximum of '" + max + "'<!-- data-validation-max-message to override -->";
              if ($this.data("validationMaxMessage")) {
                message = $this.data("validationMaxMessage");
              }
              $this.data("validationMaxMessage", message);
              $this.data("validationMaxMax", max);
            }
            // ---------------------------------------------------------
            //                                                       MIN
            // ---------------------------------------------------------
            if ($this.attr("min") !== undefined || $this.attr("aria-valuemin") !== undefined) {
              var min = ($this.attr("min") !== undefined ? $this.attr("min") : $this.attr("aria-valuemin"));
              message = "Too low: Minimum of '" + min + "'<!-- data-validation-min-message to override -->";
              if ($this.data("validationMinMessage")) {
                message = $this.data("validationMinMessage");
              }
              $this.data("validationMinMessage", message);
              $this.data("validationMinMin", min);
            }
            // ---------------------------------------------------------
            //                                                 MAXLENGTH
            // ---------------------------------------------------------
            if ($this.attr("maxlength") !== undefined) {
              message = "Too long: Maximum of '" + $this.attr("maxlength") + "' characters<!-- data-validation-maxlength-message to override -->";
              if ($this.data("validationMaxlengthMessage")) {
                message = $this.data("validationMaxlengthMessage");
              }
              $this.data("validationMaxlengthMessage", message);
              $this.data("validationMaxlengthMaxlength", $this.attr("maxlength"));
            }
            // ---------------------------------------------------------
            //                                                 MINLENGTH
            // ---------------------------------------------------------
            if ($this.attr("minlength") !== undefined) {
              message = "Too short: Minimum of '" + $this.attr("minlength") + "' characters<!-- data-validation-minlength-message to override -->";
              if ($this.data("validationMinlengthMessage")) {
                message = $this.data("validationMinlengthMessage");
              }
              $this.data("validationMinlengthMessage", message);
              $this.data("validationMinlengthMinlength", $this.attr("minlength"));
            }
            // ---------------------------------------------------------
            //                                                  REQUIRED
            // ---------------------------------------------------------
            if ($this.attr("required") !== undefined || $this.attr("aria-required") !== undefined) {
              message = settings.builtInValidators.required.message;
              if ($this.data("validationRequiredMessage")) {
                message = $this.data("validationRequiredMessage");
              }
              $this.data("validationRequiredMessage", message);
            }
            // ---------------------------------------------------------
            //                                                    NUMBER
            // ---------------------------------------------------------
            if ($this.attr("type") !== undefined && $this.attr("type").toLowerCase() === "number") {
              message = settings.builtInValidators.number.message;
              if ($this.data("validationNumberMessage")) {
                message = $this.data("validationNumberMessage");
              }
              $this.data("validationNumberMessage", message);
            }
            // ---------------------------------------------------------
            //                                                     EMAIL
            // ---------------------------------------------------------
            if ($this.attr("type") !== undefined && $this.attr("type").toLowerCase() === "email") {
              message = "Not a valid email address<!-- data-validator-validemail-message to override -->";
              if ($this.data("validationValidemailMessage")) {
                message = $this.data("validationValidemailMessage");
              } else if ($this.data("validationEmailMessage")) {
                message = $this.data("validationEmailMessage");
              }
              $this.data("validationValidemailMessage", message);
            }
            // ---------------------------------------------------------
            //                                                MINCHECKED
            // ---------------------------------------------------------
            if ($this.attr("minchecked") !== undefined) {
              message = "Not enough options checked; Minimum of '" + $this.attr("minchecked") + "' required<!-- data-validation-minchecked-message to override -->";
              if ($this.data("validationMincheckedMessage")) {
                message = $this.data("validationMincheckedMessage");
              }
              $this.data("validationMincheckedMessage", message);
              $this.data("validationMincheckedMinchecked", $this.attr("minchecked"));
            }
            // ---------------------------------------------------------
            //                                                MAXCHECKED
            // ---------------------------------------------------------
            if ($this.attr("maxchecked") !== undefined) {
              message = "Too many options checked; Maximum of '" + $this.attr("maxchecked") + "' required<!-- data-validation-maxchecked-message to override -->";
              if ($this.data("validationMaxcheckedMessage")) {
                message = $this.data("validationMaxcheckedMessage");
              }
              $this.data("validationMaxcheckedMessage", message);
              $this.data("validationMaxcheckedMaxchecked", $this.attr("maxchecked"));
            }
          }

          // =============================================================
          //                                       COLLECT VALIDATOR NAMES
          // =============================================================

          // Get named validators
          if ($this.data("validation") !== undefined) {
            validatorNames = $this.data("validation").split(",");
          }

          // Get extra ones defined on the element's data attributes
          $.each($this.data(), function (i, el) {
            var parts = i.replace(/([A-Z])/g, ",$1").split(",");
            if (parts[0] === "validation" && parts[1]) {
              validatorNames.push(parts[1]);
            }
          });

          // =============================================================
          //                                     NORMALISE VALIDATOR NAMES
          // =============================================================

          var validatorNamesToInspect = validatorNames;
          var newValidatorNamesToInspect = [];

          do // repeatedly expand 'shortcut' validators into their real validators
          {
            // Uppercase only the first letter of each name
            $.each(validatorNames, function (i, el) {
              validatorNames[i] = formatValidatorName(el);
            });

            // Remove duplicate validator names
            validatorNames = $.unique(validatorNames);

            // Pull out the new validator names from each shortcut
            newValidatorNamesToInspect = [];
            $.each(validatorNamesToInspect, function(i, el) {
              if ($this.data("validation" + el + "Shortcut") !== undefined) {
                // Are these custom validators?
                // Pull them out!
                $.each($this.data("validation" + el + "Shortcut").split(","), function(i2, el2) {
                  newValidatorNamesToInspect.push(el2);
                });
              } else if (settings.builtInValidators[el.toLowerCase()]) {
                // Is this a recognised built-in?
                // Pull it out!
                var validator = settings.builtInValidators[el.toLowerCase()];
                if (validator.type.toLowerCase() === "shortcut") {
                  $.each(validator.shortcut.split(","), function (i, el) {
                    el = formatValidatorName(el);
                    newValidatorNamesToInspect.push(el);
                    validatorNames.push(el);
                  });
                }
              }
            });

            validatorNamesToInspect = newValidatorNamesToInspect;

          } while (validatorNamesToInspect.length > 0)

          // =============================================================
          //                                       SET UP VALIDATOR ARRAYS
          // =============================================================

          var validators = {};

          $.each(validatorNames, function (i, el) {
            // Set up the 'override' message
            var message = $this.data("validation" + el + "Message");
            var hasOverrideMessage = (message !== undefined);
            var foundValidator = false;
            message =
              (
                message
                  ? message
                  : "'" + el + "' validation failed <!-- Add attribute 'data-validation-" + el.toLowerCase() + "-message' to input to change this message -->"
              )
            ;

            $.each(
              settings.validatorTypes,
              function (validatorType, validatorTemplate) {
                if (validators[validatorType] === undefined) {
                  validators[validatorType] = [];
                }
                if (!foundValidator && $this.data("validation" + el + formatValidatorName(validatorTemplate.name)) !== undefined) {
                  validators[validatorType].push(
                    $.extend(
                      true,
                      {
                        name: formatValidatorName(validatorTemplate.name),
                        message: message
                      },
                      validatorTemplate.init($this, el)
                    )
                  );
                  foundValidator = true;
                }
              }
            );

            if (!foundValidator && settings.builtInValidators[el.toLowerCase()]) {

              var validator = $.extend(true, {}, settings.builtInValidators[el.toLowerCase()]);
              if (hasOverrideMessage) {
                validator.message = message;
              }
              var validatorType = validator.type.toLowerCase();

              if (validatorType === "shortcut") {
                foundValidator = true;
              } else {
                $.each(
                  settings.validatorTypes,
                  function (validatorTemplateType, validatorTemplate) {
                    if (validators[validatorTemplateType] === undefined) {
                      validators[validatorTemplateType] = [];
                    }
                    if (!foundValidator && validatorType === validatorTemplateType.toLowerCase()) {
                      $this.data("validation" + el + formatValidatorName(validatorTemplate.name), validator[validatorTemplate.name.toLowerCase()]);
                      validators[validatorType].push(
                        $.extend(
                          validator,
                          validatorTemplate.init($this, el)
                        )
                      );
                      foundValidator = true;
                    }
                  }
                );
              }
            }

            if (! foundValidator) {
              $.error("Cannot find validation info for '" + el + "'");
            }
          });

          // =============================================================
          //                                         STORE FALLBACK VALUES
          // =============================================================

          $helpBlock.data(
            "original-contents",
            (
              $helpBlock.data("original-contents")
                ? $helpBlock.data("original-contents")
                : $helpBlock.html()
            )
          );

          $helpBlock.data(
            "original-role",
            (
              $helpBlock.data("original-role")
                ? $helpBlock.data("original-role")
                : $helpBlock.attr("role")
            )
          );

          $controlGroup.data(
            "original-classes",
            (
              $controlGroup.data("original-clases")
                ? $controlGroup.data("original-classes")
                : $controlGroup.attr("class")
            )
          );

          $this.data(
            "original-aria-invalid",
            (
              $this.data("original-aria-invalid")
                ? $this.data("original-aria-invalid")
                : $this.attr("aria-invalid")
            )
          );

          // =============================================================
          //                                                    VALIDATION
          // =============================================================

          $this.bind(
            "validation.validation",
            function (event, params) {

              var value = getValue($this);

              // Get a list of the errors to apply
              var errorsFound = [];

              $.each(validators, function (validatorType, validatorTypeArray) {
                if (value || value.length || (params && params.includeEmpty) || (!!settings.validatorTypes[validatorType].blockSubmit && params && !!params.submitting)) {
                  $.each(validatorTypeArray, function (i, validator) {
                    if (settings.validatorTypes[validatorType].validate($this, value, validator)) {
                      errorsFound.push(validator.message);
                    }
                  });
                }
              });

              return errorsFound;
            }
          );

          $this.bind(
            "getValidators.validation",
            function () {
              return validators;
            }
          );

          // =============================================================
          //                                             WATCH FOR CHANGES
          // =============================================================
          $this.bind(
            "submit.validation",
            function () {
              return $this.triggerHandler("change.validation", {submitting: true});
            }
          );
          $this.bind(
            [
              "keyup",
              "focus",
              "blur",
              "click",
              "keydown",
              "keypress",
              "change"
            ].join(".validation ") + ".validation",
            function (e, params) {

              var value = getValue($this);

              var errorsFound = [];

              $controlGroup.find("input,textarea,select").each(function (i, el) {
                var oldCount = errorsFound.length;
                $.each($(el).triggerHandler("validation.validation", params), function (j, message) {
                  errorsFound.push(message);
                });
                if (errorsFound.length > oldCount) {
                  $(el).attr("aria-invalid", "true");
                } else {
                  var original = $this.data("original-aria-invalid");
                  $(el).attr("aria-invalid", (original !== undefined ? original : false));
                }
              });

              $form.find("input,select,textarea").not($this).not("[name=\"" + $this.attr("name") + "\"]").trigger("validationLostFocus.validation");

              errorsFound = $.unique(errorsFound.sort());

              // Were there any errors?
              if (errorsFound.length) {
                // Better flag it up as a warning.
                $controlGroup.removeClass("success error").addClass("warning");

                // How many errors did we find?
                if (settings.options.semanticallyStrict && errorsFound.length === 1) {
                  // Only one? Being strict? Just output it.
                  $helpBlock.html(errorsFound[0] + 
                    ( settings.options.prependExistingHelpBlock ? $helpBlock.data("original-contents") : "" ));
                } else {
                  // Multiple? Being sloppy? Glue them together into an UL.
                  $helpBlock.html("<ul role=\"alert\"><li>" + errorsFound.join("</li><li>") + "</li></ul>" +
                    ( settings.options.prependExistingHelpBlock ? $helpBlock.data("original-contents") : "" ));
                }
              } else {
                $controlGroup.removeClass("warning error success");
                if (value.length > 0) {
                  $controlGroup.addClass("success");
                }
                $helpBlock.html($helpBlock.data("original-contents"));
              }

              if (e.type === "blur") {
                $controlGroup.removeClass("success");
              }
            }
          );
          $this.bind("validationLostFocus.validation", function () {
            $controlGroup.removeClass("success");
          });
        });
      },
      destroy : function( ) {

        return this.each(
          function() {

            var
              $this = $(this),
              $controlGroup = $this.parents(".form-group").first(),
              $helpBlock = $controlGroup.find(".help-block").first();

            // remove our events
            $this.unbind('.validation'); // events are namespaced.
            // reset help text
            $helpBlock.html($helpBlock.data("original-contents"));
            // reset classes
            $controlGroup.attr("class", $controlGroup.data("original-classes"));
            // reset aria
            $this.attr("aria-invalid", $this.data("original-aria-invalid"));
            // reset role
            $helpBlock.attr("role", $this.data("original-role"));
						// remove all elements we created
						if (createdElements.indexOf($helpBlock[0]) > -1) {
							$helpBlock.remove();
						}

          }
        );

      },
      collectErrors : function(includeEmpty) {

        var errorMessages = {};
        this.each(function (i, el) {
          var $el = $(el);
          var name = $el.attr("name");
          var errors = $el.triggerHandler("validation.validation", {includeEmpty: true});
          errorMessages[name] = $.extend(true, errors, errorMessages[name]);
        });

        $.each(errorMessages, function (i, el) {
          if (el.length === 0) {
            delete errorMessages[i];
          }
        });

        return errorMessages;

      },
      hasErrors: function() {

        var errorMessages = [];

        this.each(function (i, el) {
          errorMessages = errorMessages.concat(
            $(el).triggerHandler("getValidators.validation") ? $(el).triggerHandler("validation.validation", {submitting: true}) : []
          );
        });

        return (errorMessages.length > 0);
      },
      override : function (newDefaults) {
        defaults = $.extend(true, defaults, newDefaults);
      }
    },
		validatorTypes: {
      callback: {
        name: "callback",
        init: function ($this, name) {
          return {
            validatorName: name,
            callback: $this.data("validation" + name + "Callback"),
            lastValue: $this.val(),
            lastValid: true,
            lastFinished: true
          };
        },
        validate: function ($this, value, validator) {
          if (validator.lastValue === value && validator.lastFinished) {
            return !validator.lastValid;
          }

          if (validator.lastFinished === true)
          {
            validator.lastValue = value;
            validator.lastValid = true;
            validator.lastFinished = false;

            var rrjqbvValidator = validator;
            var rrjqbvThis = $this;
            executeFunctionByName(
              validator.callback,
              window,
              $this,
              value,
              function (data) {
                if (rrjqbvValidator.lastValue === data.value) {
                  rrjqbvValidator.lastValid = data.valid;
                  if (data.message) {
                    rrjqbvValidator.message = data.message;
                  }
                  rrjqbvValidator.lastFinished = true;
                  rrjqbvThis.data("validation" + rrjqbvValidator.validatorName + "Message", rrjqbvValidator.message);
                  // Timeout is set to avoid problems with the events being considered 'already fired'
                  setTimeout(function () {
                    rrjqbvThis.trigger("change.validation");
                  }, 1); // doesn't need a long timeout, just long enough for the event bubble to burst
                }
              }
            );
          }

          return false;

        }
      },
      ajax: {
        name: "ajax",
        init: function ($this, name) {
          return {
            validatorName: name,
            url: $this.data("validation" + name + "Ajax"),
            lastValue: $this.val(),
            lastValid: true,
            lastFinished: true
          };
        },
        validate: function ($this, value, validator) {
          if (""+validator.lastValue === ""+value && validator.lastFinished === true) {
            return validator.lastValid === false;
          }

          if (validator.lastFinished === true)
          {
            validator.lastValue = value;
            validator.lastValid = true;
            validator.lastFinished = false;
            $.ajax({
              url: validator.url,
              data: "value=" + value + "&field=" + $this.attr("name"),
              dataType: "json",
              success: function (data) {
                if (""+validator.lastValue === ""+data.value) {
                  validator.lastValid = !!(data.valid);
                  if (data.message) {
                    validator.message = data.message;
                  }
                  validator.lastFinished = true;
                  $this.data("validation" + validator.validatorName + "Message", validator.message);
                  // Timeout is set to avoid problems with the events being considered 'already fired'
                  setTimeout(function () {
                    $this.trigger("change.validation");
                  }, 1); // doesn't need a long timeout, just long enough for the event bubble to burst
                }
              },
              failure: function () {
                validator.lastValid = true;
                validator.message = "ajax call failed";
                validator.lastFinished = true;
                $this.data("validation" + validator.validatorName + "Message", validator.message);
                // Timeout is set to avoid problems with the events being considered 'already fired'
                setTimeout(function () {
                  $this.trigger("change.validation");
                }, 1); // doesn't need a long timeout, just long enough for the event bubble to burst
              }
            });
          }

          return false;

        }
      },
			regex: {
				name: "regex",
				init: function ($this, name) {
					return {regex: regexFromString($this.data("validation" + name + "Regex"))};
				},
				validate: function ($this, value, validator) {
					return (!validator.regex.test(value) && ! validator.negative)
						|| (validator.regex.test(value) && validator.negative);
				}
			},
			required: {
				name: "required",
				init: function ($this, name) {
					return {};
				},
				validate: function ($this, value, validator) {
					return !!(value.length === 0  && ! validator.negative)
						|| !!(value.length > 0 && validator.negative);
				},
        blockSubmit: true
			},
			match: {
				name: "match",
				init: function ($this, name) {
					var element = $this.parents("form").first().find("[name=\"" + $this.data("validation" + name + "Match") + "\"]").first();
					element.bind("validation.validation", function () {
						$this.trigger("change.validation", {submitting: true});
					});
					return {"element": element};
				},
				validate: function ($this, value, validator) {
					return (value !== validator.element.val() && ! validator.negative)
						|| (value === validator.element.val() && validator.negative);
				},
        blockSubmit: true
			},
			max: {
				name: "max",
				init: function ($this, name) {
					return {max: $this.data("validation" + name + "Max")};
				},
				validate: function ($this, value, validator) {
					return (parseFloat(value, 10) > parseFloat(validator.max, 10) && ! validator.negative)
						|| (parseFloat(value, 10) <= parseFloat(validator.max, 10) && validator.negative);
				}
			},
			min: {
				name: "min",
				init: function ($this, name) {
					return {min: $this.data("validation" + name + "Min")};
				},
				validate: function ($this, value, validator) {
					return (parseFloat(value) < parseFloat(validator.min) && ! validator.negative)
						|| (parseFloat(value) >= parseFloat(validator.min) && validator.negative);
				}
			},
			maxlength: {
				name: "maxlength",
				init: function ($this, name) {
					return {maxlength: $this.data("validation" + name + "Maxlength")};
				},
				validate: function ($this, value, validator) {
					return ((value.length > validator.maxlength) && ! validator.negative)
						|| ((value.length <= validator.maxlength) && validator.negative);
				}
			},
			minlength: {
				name: "minlength",
				init: function ($this, name) {
					return {minlength: $this.data("validation" + name + "Minlength")};
				},
				validate: function ($this, value, validator) {
					return ((value.length < validator.minlength) && ! validator.negative)
						|| ((value.length >= validator.minlength) && validator.negative);
				}
			},
			maxchecked: {
				name: "maxchecked",
				init: function ($this, name) {
					var elements = $this.parents("form").first().find("[name=\"" + $this.attr("name") + "\"]");
					elements.bind("click.validation", function () {
						$this.trigger("change.validation", {includeEmpty: true});
					});
					return {maxchecked: $this.data("validation" + name + "Maxchecked"), elements: elements};
				},
				validate: function ($this, value, validator) {
					return (validator.elements.filter(":checked").length > validator.maxchecked && ! validator.negative)
						|| (validator.elements.filter(":checked").length <= validator.maxchecked && validator.negative);
				},
        blockSubmit: true
			},
			minchecked: {
				name: "minchecked",
				init: function ($this, name) {
					var elements = $this.parents("form").first().find("[name=\"" + $this.attr("name") + "\"]");
					elements.bind("click.validation", function () {
						$this.trigger("change.validation", {includeEmpty: true});
					});
					return {minchecked: $this.data("validation" + name + "Minchecked"), elements: elements};
				},
				validate: function ($this, value, validator) {
					return (validator.elements.filter(":checked").length < validator.minchecked && ! validator.negative)
						|| (validator.elements.filter(":checked").length >= validator.minchecked && validator.negative);
				},
        blockSubmit: true
			}
		},
		builtInValidators: {
			email: {
				name: "Email",
				type: "shortcut",
				shortcut: "validemail"
			},
			validemail: {
				name: "Validemail",
				type: "regex",
				regex: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\\.[A-Za-z]{2,4}",
				message: "Not a valid email address<!-- data-validator-validemail-message to override -->"
			},
			passwordagain: {
				name: "Passwordagain",
				type: "match",
				match: "password",
				message: "Does not match the given password<!-- data-validator-paswordagain-message to override -->"
			},
			positive: {
				name: "Positive",
				type: "shortcut",
				shortcut: "number,positivenumber"
			},
			negative: {
				name: "Negative",
				type: "shortcut",
				shortcut: "number,negativenumber"
			},
			number: {
				name: "Number",
				type: "regex",
				regex: "([+-]?\\\d+(\\\.\\\d*)?([eE][+-]?[0-9]+)?)?",
				message: "Must be a number<!-- data-validator-number-message to override -->"
			},
			integer: {
				name: "Integer",
				type: "regex",
				regex: "[+-]?\\\d+",
				message: "No decimal places allowed<!-- data-validator-integer-message to override -->"
			},
			positivenumber: {
				name: "Positivenumber",
				type: "min",
				min: 0,
				message: "Must be a positive number<!-- data-validator-positivenumber-message to override -->"
			},
			negativenumber: {
				name: "Negativenumber",
				type: "max",
				max: 0,
				message: "Must be a negative number<!-- data-validator-negativenumber-message to override -->"
			},
			required: {
				name: "Required",
				type: "required",
				message: "This is required<!-- data-validator-required-message to override -->"
			},
			checkone: {
				name: "Checkone",
				type: "minchecked",
				minchecked: 1,
				message: "Check at least one option<!-- data-validation-checkone-message to override -->"
			}
		}
	};

	var formatValidatorName = function (name) {
		return name
			.toLowerCase()
			.replace(
				/(^|\s)([a-z])/g ,
				function(m,p1,p2) {
					return p1+p2.toUpperCase();
				}
			)
		;
	};

	var getValue = function ($this) {
		// Extract the value we're talking about
		var value = $this.val();
		var type = $this.attr("type");
		if (type === "checkbox") {
			value = ($this.is(":checked") ? value : "");
		}
		if (type === "radio") {
			value = ($('input[name="' + $this.attr("name") + '"]:checked').length > 0 ? value : "");
		}
		return value;
	};

  function regexFromString(inputstring) {
		return new RegExp("^" + inputstring + "$");
	}

  /**
   * Thanks to Jason Bunting via StackOverflow.com
   *
   * http://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string#answer-359910
   * Short link: http://tinyurl.com/executeFunctionByName
  **/
  function executeFunctionByName(functionName, context /*, args*/) {
    var args = Array.prototype.slice.call(arguments).splice(2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for(var i = 0; i < namespaces.length; i++) {
      context = context[namespaces[i]];
    }
    return context[func].apply(this, args);
  }

	$.fn.jqBootstrapValidation = function( method ) {

		if ( defaults.methods[method] ) {
			return defaults.methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return defaults.methods.init.apply( this, arguments );
		} else {
		$.error( 'Method ' +  method + ' does not exist on jQuery.jqBootstrapValidation' );
			return null;
		}

	};

  $.jqBootstrapValidation = function (options) {
    $(":input").not("[type=image],[type=submit]").jqBootstrapValidation.apply(this,arguments);
  };

})( jQuery );

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {
    var MQL = 1170;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-custom').height();
        $(window).on('scroll', {
                previousTop: 0
            },
            function() {
                var currentTop = $(window).scrollTop();
                //check if user is scrolling up
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                        $('.navbar-custom').addClass('is-visible');
                    } else {
                        $('.navbar-custom').removeClass('is-visible is-fixed');
                    }
                } else {
                    //if scrolling down...
                    $('.navbar-custom').removeClass('is-visible');
                    if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                }
                this.previousTop = currentTop;
            });
    }
});
(function() {
  $(document).on('ready page:load', function() {
    return (function(d, s, id) {
      var fjs, js;
      js = void 0;
      fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  });

  window.fbAsyncInit = function() {
    var fbLoginCallback;
    FB.init({
      appId: '606190919487740',
      version: 'v2.1',
      cookie: true
    });
    fbLoginCallback = function(response) {
      if (response.authResponse) {
        return window.location.href = '/auth/facebook/callback';
      }
    };
    return $('#fb_sign_in').click(function(e) {
      e.preventDefault();
      return FB.login(fbLoginCallback, {
        scope: 'email,user_friends,publish_stream,user_interests,user_likes,user_hometown'
      });
    });
  };

}).call(this);
  
/*navbar logo*/
  
  
jQuery(window).scroll(function(){
    var fromTopPx = 1; // distance to trigger
    var scrolledFromtop = jQuery(window).scrollTop();
    if(scrolledFromtop > fromTopPx){
        jQuery('a.navbar-brand').addClass('scrolled');
    }else{
        jQuery('a.navbar-brand').removeClass('scrolled');
    }
});


window.Modernizr = function (t, e, i)
{
	function n(t)
	{
		y.cssText = t
	}
	function o(t, e)
	{
		return typeof t === e
	}
	function r(t, e)
	{
		return !!~ ("" + t).indexOf(e)
	}
	function s(t, e)
	{
		for (var n in t)
		{
			var o = t[n];
			if (!r(o, "-") && y[o] !== i) return "pfx" == e ? o : !0
		}
		return !1
	}
	function a(t, e, n)
	{
		for (var r in t)
		{
			var s = e[t[r]];
			if (s !== i) return n === !1 ? t[r] : o(s, "function") ? s.bind(n || e) : s
		}
		return !1
	}
	function l(t, e, i)
	{
		var n = t.charAt(0).toUpperCase() + t.slice(1),
			r = (t + " " + x.join(n + " ") + n).split(" ");
		return o(e, "string") || o(e, "undefined") ? s(r, e) : (r = (t + " " + k.join(n + " ") + n).split(" "), a(r, e, i))
	}
	var c, u, d, h = "2.8.3",
		p =
		{
		},
		f = !0,
		g = e.documentElement,
		m = "modernizr",
		v = e.createElement(m),
		y = v.style,
		b = (
		{
		}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
		w = "Webkit Moz O ms",
		x = w.split(" "),
		k = w.toLowerCase().split(" "),
		S =
		{
		},
		T = [],
		C = T.slice,
		$ = function (t, i, n, o)
		{
			var r, s, a, l, c = e.createElement("div"),
				u = e.body,
				d = u || e.createElement("body");
			if (parseInt(n, 10)) for (; n--;) a = e.createElement("div"), a.id = o ? o[n] : m + (n + 1), c.appendChild(a);
			return r = ["&#173;", '<style id="s', m, '">', t, "</style>"].join(""), c.id = m, (u ? c : d).innerHTML += r, d.appendChild(c), u || (d.style.background = "", d.style.overflow = "hidden", l = g.style.overflow, g.style.overflow = "hidden", g.appendChild(d)), s = i(c, t), u ? c.parentNode.removeChild(c) : (d.parentNode.removeChild(d), g.style.overflow = l), !! s
		},
		_ = function ()
		{
			function t(t, r)
			{
				r = r || e.createElement(n[t] || "div"), t = "on" + t;
				var s = t in r;
				return s || (r.setAttribute || (r = e.createElement("div")), r.setAttribute && r.removeAttribute && (r.setAttribute(t, ""), s = o(r[t], "function"), o(r[t], "undefined") || (r[t] = i), r.removeAttribute(t))), r = null, s
			}
			var n =
			{
				select: "input",
				change: "input",
				submit: "form",
				reset: "form",
				error: "img",
				load: "img",
				abort: "img"
			};
			return t
		}(),
		E =
		{
		}.hasOwnProperty;
	d = o(E, "undefined") || o(E.call, "undefined") ?
	function (t, e)
	{
		return e in t && o(t.constructor.prototype[e], "undefined")
	} : function (t, e)
	{
		return E.call(t, e)
	}, Function.prototype.bind || (Function.prototype.bind = function (t)
	{
		var e = this;
		if ("function" != typeof e) throw new TypeError;
		var i = C.call(arguments, 1),
			n = function ()
			{
				if (this instanceof n)
				{
					var o = function ()
					{
					};
					o.prototype = e.prototype;
					var r = new o,
						s = e.apply(r, i.concat(C.call(arguments)));
					return Object(s) === s ? s : r
				}
				return e.apply(t, i.concat(C.call(arguments)))
			};
		return n
	}), S.touch = function ()
	{
		var i;
		return "ontouchstart" in t || t.DocumentTouch && e instanceof DocumentTouch ? i = !0 : $(["@media (", b.join("touch-enabled),("), m, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (t)
		{
			i = 9 === t.offsetTop
		}), i
	}, S.cssanimations = function ()
	{
		return l("animationName")
	}, S.csstransforms = function ()
	{
		return !!l("transform")
	}, S.csstransforms3d = function ()
	{
		var t = !! l("perspective");
		return t && "webkitPerspective" in g.style && $("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function (e)
		{
			t = 9 === e.offsetLeft && 3 === e.offsetHeight
		}), t
	}, S.csstransitions = function ()
	{
		return l("transition")
	};
	for (var O in S) d(S, O) && (u = O.toLowerCase(), p[u] = S[O](), T.push((p[u] ? "" : "no-") + u));
	return p.addTest = function (t, e)
	{
		if ("object" == typeof t) for (var n in t) d(t, n) && p.addTest(n, t[n]);
		else
		{
			if (t = t.toLowerCase(), p[t] !== i) return p;
			e = "function" == typeof e ? e() : e, "undefined" != typeof f && f && (g.className += " " + (e ? "" : "no-") + t), p[t] = e
		}
		return p
	}, n(""), v = c = null, function (t, e)
	{
		function i(t, e)
		{
			var i = t.createElement("p"),
				n = t.getElementsByTagName("head")[0] || t.documentElement;
			return i.innerHTML = "x<style>" + e + "</style>", n.insertBefore(i.lastChild, n.firstChild)
		}
		function n()
		{
			var t = y.elements;
			return "string" == typeof t ? t.split(" ") : t
		}
		function o(t)
		{
			var e = v[t[g]];
			return e || (e =
			{
			}, m++, t[g] = m, v[m] = e), e
		}
		function r(t, i, n)
		{
			if (i || (i = e), u) return i.createElement(t);
			n || (n = o(i));
			var r;
			return r = n.cache[t] ? n.cache[t].cloneNode() : f.test(t) ? (n.cache[t] = n.createElem(t)).cloneNode() : n.createElem(t), !r.canHaveChildren || p.test(t) || r.tagUrn ? r : n.frag.appendChild(r)
		}
		function s(t, i)
		{
			if (t || (t = e), u) return t.createDocumentFragment();
			i = i || o(t);
			for (var r = i.frag.cloneNode(), s = 0, a = n(), l = a.length; l > s; s++) r.createElement(a[s]);
			return r
		}
		function a(t, e)
		{
			e.cache || (e.cache =
			{
			}, e.createElem = t.createElement, e.createFrag = t.createDocumentFragment, e.frag = e.createFrag()), t.createElement = function (i)
			{
				return y.shivMethods ? r(i, t, e) : e.createElem(i)
			}, t.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + n().join().replace(/[\w\-]+/g, function (t)
			{
				return e.createElem(t), e.frag.createElement(t), 'c("' + t + '")'
			}) + ");return n}")(y, e.frag)
		}
		function l(t)
		{
			t || (t = e);
			var n = o(t);
			return !y.shivCSS || c || n.hasCSS || (n.hasCSS = !! i(t, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), u || a(t, n), t
		}
		var c, u, d = "3.7.0",
			h = t.html5 || {
			},
			p = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
			f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
			g = "_html5shiv",
			m = 0,
			v =
			{
			};
		!
		function ()
		{
			try
			{
				var t = e.createElement("a");
				t.innerHTML = "<xyz></xyz>", c = "hidden" in t, u = 1 == t.childNodes.length ||
				function ()
				{
					e.createElement("a");
					var t = e.createDocumentFragment();
					return "undefined" == typeof t.cloneNode || "undefined" == typeof t.createDocumentFragment || "undefined" == typeof t.createElement
				}()
			}
			catch (i)
			{
				c = !0, u = !0
			}
		}();
		var y =
		{
			elements: h.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
			version: d,
			shivCSS: h.shivCSS !== !1,
			supportsUnknownElements: u,
			shivMethods: h.shivMethods !== !1,
			type: "default",
			shivDocument: l,
			createElement: r,
			createDocumentFragment: s
		};
		t.html5 = y, l(e)
	}(this, e), p._version = h, p._prefixes = b, p._domPrefixes = k, p._cssomPrefixes = x, p.hasEvent = _, p.testProp = function (t)
	{
		return s([t])
	}, p.testAllProps = l, p.testStyles = $, p.prefixed = function (t, e, i)
	{
		return e ? l(t, e, i) : l(t, "pfx")
	}, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + T.join(" ") : ""), p
}(this, this.document), function (t, e, i)
{
	function n(t)
	{
		return "[object Function]" == m.call(t)
	}
	function o(t)
	{
		return "string" == typeof t
	}
	function r()
	{
	}
	function s(t)
	{
		return !t || "loaded" == t || "complete" == t || "uninitialized" == t
	}
	function a()
	{
		var t = v.shift();
		y = 1, t ? t.t ? f(function ()
		{
			("c" == t.t ? h.injectCss : h.injectJs)(t.s, 0, t.a, t.x, t.e, 1)
		}, 0) : (t(), a()) : y = 0
	}
	function l(t, i, n, o, r, l, c)
	{
		function u(e)
		{
			if (!p && s(d.readyState) && (b.r = p = 1, !y && a(), d.onload = d.onreadystatechange = null, e))
			{
				"img" != t && f(function ()
				{
					x.removeChild(d)
				}, 50);
				for (var n in $[i]) $[i].hasOwnProperty(n) && $[i][n].onload()
			}
		}
		var c = c || h.errorTimeout,
			d = e.createElement(t),
			p = 0,
			m = 0,
			b =
			{
				t: n,
				s: i,
				e: r,
				a: l,
				x: c
			};
		1 === $[i] && (m = 1, $[i] = []), "object" == t ? d.data = i : (d.src = i, d.type = t), d.width = d.height = "0", d.onerror = d.onload = d.onreadystatechange = function ()
		{
			u.call(this, m)
		}, v.splice(o, 0, b), "img" != t && (m || 2 === $[i] ? (x.insertBefore(d, w ? null : g), f(u, c)) : $[i].push(d))
	}
	function c(t, e, i, n, r)
	{
		return y = 0, e = e || "j", o(t) ? l("c" == e ? S : k, t, e, this.i++, i, n, r) : (v.splice(this.i++, 0, t), 1 == v.length && a()), this
	}
	function u()
	{
		var t = h;
		return t.loader =
		{
			load: c,
			i: 0
		}, t
	}
	var d, h, p = e.documentElement,
		f = t.setTimeout,
		g = e.getElementsByTagName("script")[0],
		m =
		{
		}.toString,
		v = [],
		y = 0,
		b = "MozAppearance" in p.style,
		w = b && !! e.createRange().compareNode,
		x = w ? p : g.parentNode,
		p = t.opera && "[object Opera]" == m.call(t.opera),
		p = !! e.attachEvent && !p,
		k = b ? "object" : p ? "script" : "img",
		S = p ? "script" : k,
		T = Array.isArray ||
		function (t)
		{
			return "[object Array]" == m.call(t)
		},
		C = [],
		$ =
		{
		},
		_ =
		{
			timeout: function (t, e)
			{
				return e.length && (t.timeout = e[0]), t
			}
		};
	h = function (t)
	{
		function e(t)
		{
			var e, i, n, t = t.split("!"),
				o = C.length,
				r = t.pop(),
				s = t.length,
				r =
				{
					url: r,
					origUrl: r,
					prefixes: t
				};
			for (i = 0; s > i; i++) n = t[i].split("="), (e = _[n.shift()]) && (r = e(r, n));
			for (i = 0; o > i; i++) r = C[i](r);
			return r
		}
		function s(t, o, r, s, a)
		{
			var l = e(t),
				c = l.autoCallback;
			l.url.split(".").pop().split("?").shift(), l.bypass || (o && (o = n(o) ? o : o[t] || o[s] || o[t.split("/").pop().split("?")[0]]), l.instead ? l.instead(t, o, r, s, a) : ($[l.url] ? l.noexec = !0 : $[l.url] = 1, r.load(l.url, l.forceCSS || !l.forceJS && "css" == l.url.split(".").pop().split("?").shift() ? "c" : i, l.noexec, l.attrs, l.timeout), (n(o) || n(c)) && r.load(function ()
			{
				u(), o && o(l.origUrl, a, s), c && c(l.origUrl, a, s), $[l.url] = 2
			})))
		}
		function a(t, e)
		{
			function i(t, i)
			{
				if (t)
				{
					if (o(t)) i || (d = function ()
					{
						var t = [].slice.call(arguments);
						h.apply(this, t), p()
					}), s(t, d, e, 0, c);
					else if (Object(t) === t) for (l in a = function ()
					{
						var e, i = 0;
						for (e in t) t.hasOwnProperty(e) && i++;
						return i
					}(), t) t.hasOwnProperty(l) && (!i && !--a && (n(d) ? d = function ()
					{
						var t = [].slice.call(arguments);
						h.apply(this, t), p()
					} : d[l] = function (t)
					{
						return function ()
						{
							var e = [].slice.call(arguments);
							t && t.apply(this, e), p()
						}
					}(h[l])), s(t[l], d, e, l, c))
				}
				else!i && p()
			}
			var a, l, c = !! t.test,
				u = t.load || t.both,
				d = t.callback || r,
				h = d,
				p = t.complete || r;
			i(c ? t.yep : t.nope, !! u), u && i(u)
		}
		var l, c, d = this.yepnope.loader;
		if (o(t)) s(t, 0, d, 0);
		else if (T(t)) for (l = 0; l < t.length; l++) c = t[l], o(c) ? s(c, 0, d, 0) : T(c) ? h(c) : Object(c) === c && a(c, d);
		else Object(t) === t && a(t, d)
	}, h.addPrefix = function (t, e)
	{
		_[t] = e
	}, h.addFilter = function (t)
	{
		C.push(t)
	}, h.errorTimeout = 1e4, null == e.readyState && e.addEventListener && (e.readyState = "loading", e.addEventListener("DOMContentLoaded", d = function ()
	{
		e.removeEventListener("DOMContentLoaded", d, 0), e.readyState = "complete"
	}, 0)), t.yepnope = u(), t.yepnope.executeStack = a, t.yepnope.injectJs = function (t, i, n, o, l, c)
	{
		var u, d, p = e.createElement("script"),
			o = o || h.errorTimeout;
		p.src = t;
		for (d in n) p.setAttribute(d, n[d]);
		i = c ? a : i || r, p.onreadystatechange = p.onload = function ()
		{
			!u && s(p.readyState) && (u = 1, i(), p.onload = p.onreadystatechange = null)
		}, f(function ()
		{
			u || (u = 1, i(1))
		}, o), l ? p.onload() : g.parentNode.insertBefore(p, g)
	}, t.yepnope.injectCss = function (t, i, n, o, s, l)
	{
		var c, o = e.createElement("link"),
			i = l ? a : i || r;
		o.href = t, o.rel = "stylesheet", o.type = "text/css";
		for (c in n) o.setAttribute(c, n[c]);
		s || (g.parentNode.insertBefore(o, g), f(i, 0))
	}
}(this, document), Modernizr.load = function ()
{
	yepnope.apply(window, [].slice.call(arguments, 0))
}, function (t, e)
{
	t.rails !== e && t.error("jquery-ujs has already been loaded!");
	var i, n = t(document);
	t.rails = i =
	{
		linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]",
		buttonClickSelector: "button[data-remote]:not(form button), button[data-confirm]:not(form button)",
		inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
		formSubmitSelector: "form",
		formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
		disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
		enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
		requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
		fileInputSelector: "input[type=file]",
		linkDisableSelector: "a[data-disable-with], a[data-disable]",
		buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
		CSRFProtection: function (e)
		{
			var i = t('meta[name="csrf-token"]').attr("content");
			i && e.setRequestHeader("X-CSRF-Token", i)
		},
		refreshCSRFTokens: function ()
		{
			var e = t("meta[name=csrf-token]").attr("content"),
				i = t("meta[name=csrf-param]").attr("content");
			t('form input[name="' + i + '"]').val(e)
		},
		fire: function (e, i, n)
		{
			var o = t.Event(i);
			return e.trigger(o, n), o.result !== !1
		},
		confirm: function (t)
		{
			return confirm(t)
		},
		ajax: function (e)
		{
			return t.ajax(e)
		},
		href: function (t)
		{
			return t.attr("href")
		},
		handleRemote: function (n)
		{
			var o, r, s, a, l, c, u, d;
			if (i.fire(n, "ajax:before"))
			{
				if (a = n.data("cross-domain"), l = a === e ? null : a, c = n.data("with-credentials") || null, u = n.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, n.is("form"))
				{
					o = n.attr("method"), r = n.attr("action"), s = n.serializeArray();
					var h = n.data("ujs:submit-button");
					h && (s.push(h), n.data("ujs:submit-button", null))
				}
				else n.is(i.inputChangeSelector) ? (o = n.data("method"), r = n.data("url"), s = n.serialize(), n.data("params") && (s = s + "&" + n.data("params"))) : n.is(i.buttonClickSelector) ? (o = n.data("method") || "get", r = n.data("url"), s = n.serialize(), n.data("params") && (s = s + "&" + n.data("params"))) : (o = n.data("method"), r = i.href(n), s = n.data("params") || null);
				return d =
				{
					type: o || "GET",
					data: s,
					dataType: u,
					beforeSend: function (t, o)
					{
						return o.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + o.accepts.script), i.fire(n, "ajax:beforeSend", [t, o]) ? void n.trigger("ajax:send", t) : !1
					},
					success: function (t, e, i)
					{
						n.trigger("ajax:success", [t, e, i])
					},
					complete: function (t, e)
					{
						n.trigger("ajax:complete", [t, e])
					},
					error: function (t, e, i)
					{
						n.trigger("ajax:error", [t, e, i])
					},
					crossDomain: l
				}, c && (d.xhrFields =
				{
					withCredentials: c
				}), r && (d.url = r), i.ajax(d)
			}
			return !1
		},
		handleMethod: function (n)
		{
			var o = i.href(n),
				r = n.data("method"),
				s = n.attr("target"),
				a = t("meta[name=csrf-token]").attr("content"),
				l = t("meta[name=csrf-param]").attr("content"),
				c = t('<form method="post" action="' + o + '"></form>'),
				u = '<input name="_method" value="' + r + '" type="hidden" />';
			l !== e && a !== e && (u += '<input name="' + l + '" value="' + a + '" type="hidden" />'), s && c.attr("target", s), c.hide().append(u).appendTo("body"), c.submit()
		},
		formElements: function (e, i)
		{
			return e.is("form") ? t(e[0].elements).filter(i) : e.find(i)
		},
		disableFormElements: function (e)
		{
			i.formElements(e, i.disableSelector).each(function ()
			{
				i.disableFormElement(t(this))
			})
		},
		disableFormElement: function (t)
		{
			var i, n;
			i = t.is("button") ? "html" : "val", n = t.data("disable-with"), t.data("ujs:enable-with", t[i]()), n !== e && t[i](n), t.prop("disabled", !0)
		},
		enableFormElements: function (e)
		{
			i.formElements(e, i.enableSelector).each(function ()
			{
				i.enableFormElement(t(this))
			})
		},
		enableFormElement: function (t)
		{
			var e = t.is("button") ? "html" : "val";
			t.data("ujs:enable-with") && t[e](t.data("ujs:enable-with")), t.prop("disabled", !1)
		},
		allowAction: function (t)
		{
			var e, n = t.data("confirm"),
				o = !1;
			return n ? (i.fire(t, "confirm") && (o = i.confirm(n), e = i.fire(t, "confirm:complete", [o])), o && e) : !0
		},
		blankInputs: function (e, i, n)
		{
			var o, r, s = t(),
				a = i || "input,textarea",
				l = e.find(a);
			return l.each(function ()
			{
				if (o = t(this), r = o.is("input[type=checkbox],input[type=radio]") ? o.is(":checked") : o.val(), !r == !n)
				{
					if (o.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + o.attr("name") + '"]').length) return !0;
					s = s.add(o)
				}
			}), s.length ? s : !1
		},
		nonBlankInputs: function (t, e)
		{
			return i.blankInputs(t, e, !0)
		},
		stopEverything: function (e)
		{
			return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
		},
		disableElement: function (t)
		{
			var n = t.data("disable-with");
			t.data("ujs:enable-with", t.html()), n !== e && t.html(n), t.bind("click.railsDisable", function (t)
			{
				return i.stopEverything(t)
			})
		},
		enableElement: function (t)
		{
			t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.unbind("click.railsDisable")
		}
	}, i.fire(n, "rails:attachBindings") && (t.ajaxPrefilter(function (t, e, n)
	{
		t.crossDomain || i.CSRFProtection(n)
	}), n.delegate(i.linkDisableSelector, "ajax:complete", function ()
	{
		i.enableElement(t(this))
	}), n.delegate(i.buttonDisableSelector, "ajax:complete", function ()
	{
		i.enableFormElement(t(this))
	}), n.delegate(i.linkClickSelector, "click.rails", function (n)
	{
		var o = t(this),
			r = o.data("method"),
			s = o.data("params"),
			a = n.metaKey || n.ctrlKey;
		if (!i.allowAction(o)) return i.stopEverything(n);
		if (!a && o.is(i.linkDisableSelector) && i.disableElement(o), o.data("remote") !== e)
		{
			if (a && (!r || "GET" === r) && !s) return !0;
			var l = i.handleRemote(o);
			return l === !1 ? i.enableElement(o) : l.error(function ()
			{
				i.enableElement(o)
			}), !1
		}
		return o.data("method") ? (i.handleMethod(o), !1) : void 0
	}), n.delegate(i.buttonClickSelector, "click.rails", function (e)
	{
		var n = t(this);
		if (!i.allowAction(n)) return i.stopEverything(e);
		n.is(i.buttonDisableSelector) && i.disableFormElement(n);
		var o = i.handleRemote(n);
		return o === !1 ? i.enableFormElement(n) : o.error(function ()
		{
			i.enableFormElement(n)
		}), !1
	}), n.delegate(i.inputChangeSelector, "change.rails", function (e)
	{
		var n = t(this);
		return i.allowAction(n) ? (i.handleRemote(n), !1) : i.stopEverything(e)
	}), n.delegate(i.formSubmitSelector, "submit.rails", function (n)
	{
		var o, r, s = t(this),
			a = s.data("remote") !== e;
		if (!i.allowAction(s)) return i.stopEverything(n);
		if (s.attr("novalidate") == e && (o = i.blankInputs(s, i.requiredInputSelector), o && i.fire(s, "ajax:aborted:required", [o]))) return i.stopEverything(n);
		if (a)
		{
			if (r = i.nonBlankInputs(s, i.fileInputSelector))
			{
				setTimeout(function ()
				{
					i.disableFormElements(s)
				}, 13);
				var l = i.fire(s, "ajax:aborted:file", [r]);
				return l || setTimeout(function ()
				{
					i.enableFormElements(s)
				}, 13), l
			}
			return i.handleRemote(s), !1
		}
		setTimeout(function ()
		{
			i.disableFormElements(s)
		}, 13)
	}), n.delegate(i.formInputClickSelector, "click.rails", function (e)
	{
		var n = t(this);
		if (!i.allowAction(n)) return i.stopEverything(e);
		var o = n.attr("name"),
			r = o ? {
				name: o,
				value: n.val()
			} : null;
		n.closest("form").data("ujs:submit-button", r)
	}), n.delegate(i.formSubmitSelector, "ajax:send.rails", function (e)
	{
		this == e.target && i.disableFormElements(t(this))
	}), n.delegate(i.formSubmitSelector, "ajax:complete.rails", function (e)
	{
		this == e.target && i.enableFormElements(t(this))
	}), t(function ()
	{
		i.refreshCSRFTokens()
	}))
}(jQuery), !
function (t)
{
	function e()
	{
	}
	function i(t)
	{
		function i(e)
		{
			e.prototype.option || (e.prototype.option = function (e)
			{
				t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
			})
		}
		function o(e, i)
		{
			t.fn[e] = function (o)
			{
				if ("string" == typeof o)
				{
					for (var s = n.call(arguments, 1), a = 0, l = this.length; l > a; a++)
					{
						var c = this[a],
							u = t.data(c, e);
						if (u) if (t.isFunction(u[o]) && "_" !== o.charAt(0))
						{
							var d = u[o].apply(u, s);
							if (void 0 !== d) return d
						}
						else r("no such method '" + o + "' for " + e + " instance");
						else r("cannot call methods on " + e + " prior to initialization; attempted to call '" + o + "'")
					}
					return this
				}
				return this.each(function ()
				{
					var n = t.data(this, e);
					n ? (n.option(o), n._init()) : (n = new i(this, o), t.data(this, e, n))
				})
			}
		}
		if (t)
		{
			var r = "undefined" == typeof console ? e : function (t)
			{
				console.error(t)
			};
			return t.bridget = function (t, e)
			{
				i(e), o(t, e)
			}, t.bridget
		}
	}
	var n = Array.prototype.slice;
	"function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], i) : i(t.jQuery)
}(window), function (t)
{
	function e(e)
	{
		var i = t.event;
		return i.target = i.target || i.srcElement || e, i
	}
	var i = document.documentElement,
		n = function ()
		{
		};
	i.addEventListener ? n = function (t, e, i)
	{
		t.addEventListener(e, i, !1)
	} : i.attachEvent && (n = function (t, i, n)
	{
		t[i + n] = n.handleEvent ?
		function ()
		{
			var i = e(t);
			n.handleEvent.call(n, i)
		} : function ()
		{
			var i = e(t);
			n.call(t, i)
		}, t.attachEvent("on" + i, t[i + n])
	});
	var o = function ()
	{
	};
	i.removeEventListener ? o = function (t, e, i)
	{
		t.removeEventListener(e, i, !1)
	} : i.detachEvent && (o = function (t, e, i)
	{
		t.detachEvent("on" + e, t[e + i]);
		try
		{
			delete t[e + i]
		}
		catch (n)
		{
			t[e + i] = void 0
		}
	});
	var r =
	{
		bind: n,
		unbind: o
	};
	"function" == typeof define && define.amd ? define("eventie/eventie", r) : "object" == typeof exports ? module.exports = r : t.eventie = r
}(this), function (t)
{
	function e(t)
	{
		"function" == typeof t && (e.isReady ? t() : r.push(t))
	}
	function i(t)
	{
		var i = "readystatechange" === t.type && "complete" !== o.readyState;
		if (!e.isReady && !i)
		{
			e.isReady = !0;
			for (var n = 0, s = r.length; s > n; n++)
			{
				var a = r[n];
				a()
			}
		}
	}
	function n(n)
	{
		return n.bind(o, "DOMContentLoaded", i), n.bind(o, "readystatechange", i), n.bind(t, "load", i), e
	}
	var o = t.document,
		r = [];
	e.isReady = !1, "function" == typeof define && define.amd ? (e.isReady = "function" == typeof requirejs, define("doc-ready/doc-ready", ["eventie/eventie"], n)) : t.docReady = n(t.eventie)
}(this), function ()
{
	function t()
	{
	}
	function e(t, e)
	{
		for (var i = t.length; i--;) if (t[i].listener === e) return i;
		return -1
	}
	function i(t)
	{
		return function ()
		{
			return this[t].apply(this, arguments)
		}
	}
	var n = t.prototype,
		o = this,
		r = o.EventEmitter;
	n.getListeners = function (t)
	{
		var e, i, n = this._getEvents();
		if (t instanceof RegExp)
		{
			e =
			{
			};
			for (i in n) n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i])
		}
		else e = n[t] || (n[t] = []);
		return e
	}, n.flattenListeners = function (t)
	{
		var e, i = [];
		for (e = 0; e < t.length; e += 1) i.push(t[e].listener);
		return i
	}, n.getListenersAsObject = function (t)
	{
		var e, i = this.getListeners(t);
		return i instanceof Array && (e =
		{
		}, e[t] = i), e || i
	}, n.addListener = function (t, i)
	{
		var n, o = this.getListenersAsObject(t),
			r = "object" == typeof i;
		for (n in o) o.hasOwnProperty(n) && -1 === e(o[n], i) && o[n].push(r ? i : {
			listener: i,
			once: !1
		});
		return this
	}, n.on = i("addListener"), n.addOnceListener = function (t, e)
	{
		return this.addListener(t, {
			listener: e,
			once: !0
		})
	}, n.once = i("addOnceListener"), n.defineEvent = function (t)
	{
		return this.getListeners(t), this
	}, n.defineEvents = function (t)
	{
		for (var e = 0; e < t.length; e += 1) this.defineEvent(t[e]);
		return this
	}, n.removeListener = function (t, i)
	{
		var n, o, r = this.getListenersAsObject(t);
		for (o in r) r.hasOwnProperty(o) && (n = e(r[o], i), -1 !== n && r[o].splice(n, 1));
		return this
	}, n.off = i("removeListener"), n.addListeners = function (t, e)
	{
		return this.manipulateListeners(!1, t, e)
	}, n.removeListeners = function (t, e)
	{
		return this.manipulateListeners(!0, t, e)
	}, n.manipulateListeners = function (t, e, i)
	{
		var n, o, r = t ? this.removeListener : this.addListener,
			s = t ? this.removeListeners : this.addListeners;
		if ("object" != typeof e || e instanceof RegExp) for (n = i.length; n--;) r.call(this, e, i[n]);
		else for (n in e) e.hasOwnProperty(n) && (o = e[n]) && ("function" == typeof o ? r.call(this, n, o) : s.call(this, n, o));
		return this
	}, n.removeEvent = function (t)
	{
		var e, i = typeof t,
			n = this._getEvents();
		if ("string" === i) delete n[t];
		else if (t instanceof RegExp) for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e];
		else delete this._events;
		return this
	}, n.removeAllListeners = i("removeEvent"), n.emitEvent = function (t, e)
	{
		var i, n, o, r, s = this.getListenersAsObject(t);
		for (o in s) if (s.hasOwnProperty(o)) for (n = s[o].length; n--;) i = s[o][n], i.once === !0 && this.removeListener(t, i.listener), r = i.listener.apply(this, e || []), r === this._getOnceReturnValue() && this.removeListener(t, i.listener);
		return this
	}, n.trigger = i("emitEvent"), n.emit = function (t)
	{
		var e = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(t, e)
	}, n.setOnceReturnValue = function (t)
	{
		return this._onceReturnValue = t, this
	}, n._getOnceReturnValue = function ()
	{
		return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
	}, n._getEvents = function ()
	{
		return this._events || (this._events =
		{
		})
	}, t.noConflict = function ()
	{
		return o.EventEmitter = r, t
	}, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function ()
	{
		return t
	}) : "object" == typeof module && module.exports ? module.exports = t : this.EventEmitter = t
}.call(this), function (t)
{
	function e(t)
	{
		if (t)
		{
			if ("string" == typeof n[t]) return t;
			t = t.charAt(0).toUpperCase() + t.slice(1);
			for (var e, o = 0, r = i.length; r > o; o++) if (e = i[o] + t, "string" == typeof n[e]) return e
		}
	}
	var i = "Webkit Moz ms Ms O".split(" "),
		n = document.documentElement.style;
	"function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function ()
	{
		return e
	}) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
}(window), function (t)
{
	function e(t)
	{
		var e = parseFloat(t),
			i = -1 === t.indexOf("%") && !isNaN(e);
		return i && e
	}
	function i()
	{
		for (var t =
		{
			width: 0,
			height: 0,
			innerWidth: 0,
			innerHeight: 0,
			outerWidth: 0,
			outerHeight: 0
		}, e = 0, i = s.length; i > e; e++)
		{
			var n = s[e];
			t[n] = 0
		}
		return t
	}
	function n(t)
	{
		function n(t)
		{
			if ("string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType)
			{
				var n = r(t);
				if ("none" === n.display) return i();
				var o =
				{
				};
				o.width = t.offsetWidth, o.height = t.offsetHeight;
				for (var u = o.isBorderBox = !(!c || !n[c] || "border-box" !== n[c]), d = 0, h = s.length; h > d; d++)
				{
					var p = s[d],
						f = n[p];
					f = a(t, f);
					var g = parseFloat(f);
					o[p] = isNaN(g) ? 0 : g
				}
				var m = o.paddingLeft + o.paddingRight,
					v = o.paddingTop + o.paddingBottom,
					y = o.marginLeft + o.marginRight,
					b = o.marginTop + o.marginBottom,
					w = o.borderLeftWidth + o.borderRightWidth,
					x = o.borderTopWidth + o.borderBottomWidth,
					k = u && l,
					S = e(n.width);
				S !== !1 && (o.width = S + (k ? 0 : m + w));
				var T = e(n.height);
				return T !== !1 && (o.height = T + (k ? 0 : v + x)), o.innerWidth = o.width - (m + w), o.innerHeight = o.height - (v + x), o.outerWidth = o.width + y, o.outerHeight = o.height + b, o
			}
		}
		function a(t, e)
		{
			if (o || -1 === e.indexOf("%")) return e;
			var i = t.style,
				n = i.left,
				r = t.runtimeStyle,
				s = r && r.left;
			return s && (r.left = t.currentStyle.left), i.left = e, e = i.pixelLeft, i.left = n, s && (r.left = s), e
		}
		var l, c = t("boxSizing");
		return function ()
		{
			if (c)
			{
				var t = document.createElement("div");
				t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style[c] = "border-box";
				var i = document.body || document.documentElement;
				i.appendChild(t);
				var n = r(t);
				l = 200 === e(n.width), i.removeChild(t)
			}
		}(), n
	}
	var o = t.getComputedStyle,
		r = o ?
		function (t)
		{
			return o(t, null)
		} : function (t)
		{
			return t.currentStyle
		},
		s = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
	"function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], n) : "object" == typeof exports ? module.exports = n(require("get-style-property")) : t.getSize = n(t.getStyleProperty)
}(window), function (t, e)
{
	function i(t, e)
	{
		return t[a](e)
	}
	function n(t)
	{
		if (!t.parentNode)
		{
			var e = document.createDocumentFragment();
			e.appendChild(t)
		}
	}
	function o(t, e)
	{
		n(t);
		for (var i = t.parentNode.querySelectorAll(e), o = 0, r = i.length; r > o; o++) if (i[o] === t) return !0;
		return !1
	}
	function r(t, e)
	{
		return n(t), i(t, e)
	}
	var s, a = function ()
	{
		if (e.matchesSelector) return "matchesSelector";
		for (var t = ["webkit", "moz", "ms", "o"], i = 0, n = t.length; n > i; i++)
		{
			var o = t[i],
				r = o + "MatchesSelector";
			if (e[r]) return r
		}
	}();
	if (a)
	{
		var l = document.createElement("div"),
			c = i(l, "div");
		s = c ? i : r
	}
	else s = o;
	"function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function ()
	{
		return s
	}) : window.matchesSelector = s
}(this, Element.prototype), function (t)
{
	function e(t, e)
	{
		for (var i in e) t[i] = e[i];
		return t
	}
	function i(t)
	{
		for (var e in t) return !1;
		return e = null, !0
	}
	function n(t)
	{
		return t.replace(/([A-Z])/g, function (t)
		{
			return "-" + t.toLowerCase()
		})
	}
	function o(t, o, r)
	{
		function a(t, e)
		{
			t && (this.element = t, this.layout = e, this.position =
			{
				x: 0,
				y: 0
			}, this._create())
		}
		var l = r("transition"),
			c = r("transform"),
			u = l && c,
			d = !! r("perspective"),
			h =
			{
				WebkitTransition: "webkitTransitionEnd",
				MozTransition: "transitionend",
				OTransition: "otransitionend",
				transition: "transitionend"
			}[l],
			p = ["transform", "transition", "transitionDuration", "transitionProperty"],
			f = function ()
			{
				for (var t =
				{
				}, e = 0, i = p.length; i > e; e++)
				{
					var n = p[e],
						o = r(n);
					o && o !== n && (t[n] = o)
				}
				return t
			}();
		e(a.prototype, t.prototype), a.prototype._create = function ()
		{
			this._transn =
			{
				ingProperties: {
				},
				clean: {
				},
				onEnd: {
				}
			}, this.css(
			{
				position: "absolute"
			})
		}, a.prototype.handleEvent = function (t)
		{
			var e = "on" + t.type;
			this[e] && this[e](t)
		}, a.prototype.getSize = function ()
		{
			this.size = o(this.element)
		}, a.prototype.css = function (t)
		{
			var e = this.element.style;
			for (var i in t)
			{
				var n = f[i] || i;
				e[n] = t[i]
			}
		}, a.prototype.getPosition = function ()
		{
			var t = s(this.element),
				e = this.layout.options,
				i = e.isOriginLeft,
				n = e.isOriginTop,
				o = parseInt(t[i ? "left" : "right"], 10),
				r = parseInt(t[n ? "top" : "bottom"], 10);
			o = isNaN(o) ? 0 : o, r = isNaN(r) ? 0 : r;
			var a = this.layout.size;
			o -= i ? a.paddingLeft : a.paddingRight, r -= n ? a.paddingTop : a.paddingBottom, this.position.x = o, this.position.y = r
		}, a.prototype.layoutPosition = function ()
		{
			var t = this.layout.size,
				e = this.layout.options,
				i =
				{
				};
			e.isOriginLeft ? (i.left = this.position.x + t.paddingLeft + "px", i.right = "") : (i.right = this.position.x + t.paddingRight + "px", i.left = ""), e.isOriginTop ? (i.top = this.position.y + t.paddingTop + "px", i.bottom = "") : (i.bottom = this.position.y + t.paddingBottom + "px", i.top = ""), this.css(i), this.emitEvent("layout", [this])
		};
		var g = d ?
		function (t, e)
		{
			return "translate3d(" + t + "px, " + e + "px, 0)"
		} : function (t, e)
		{
			return "translate(" + t + "px, " + e + "px)"
		};
		a.prototype._transitionTo = function (t, e)
		{
			this.getPosition();
			var i = this.position.x,
				n = this.position.y,
				o = parseInt(t, 10),
				r = parseInt(e, 10),
				s = o === this.position.x && r === this.position.y;
			if (this.setPosition(t, e), s && !this.isTransitioning) return void this.layoutPosition();
			var a = t - i,
				l = e - n,
				c =
				{
				},
				u = this.layout.options;
			a = u.isOriginLeft ? a : -a, l = u.isOriginTop ? l : -l, c.transform = g(a, l), this.transition(
			{
				to: c,
				onTransitionEnd: {
					transform: this.layoutPosition
				},
				isCleaning: !0
			})
		}, a.prototype.goTo = function (t, e)
		{
			this.setPosition(t, e), this.layoutPosition()
		}, a.prototype.moveTo = u ? a.prototype._transitionTo : a.prototype.goTo, a.prototype.setPosition = function (t, e)
		{
			this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
		}, a.prototype._nonTransition = function (t)
		{
			this.css(t.to), t.isCleaning && this._removeStyles(t.to);
			for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
		}, a.prototype._transition = function (t)
		{
			if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
			var e = this._transn;
			for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
			for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
			if (t.from)
			{
				this.css(t.from);
				var n = this.element.offsetHeight;
				n = null
			}
			this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
		};
		var m = c && n(c) + ",opacity";
		a.prototype.enableTransition = function ()
		{
			this.isTransitioning || (this.css(
			{
				transitionProperty: m,
				transitionDuration: this.layout.options.transitionDuration
			}), this.element.addEventListener(h, this, !1))
		}, a.prototype.transition = a.prototype[l ? "_transition" : "_nonTransition"], a.prototype.onwebkitTransitionEnd = function (t)
		{
			this.ontransitionend(t)
		}, a.prototype.onotransitionend = function (t)
		{
			this.ontransitionend(t)
		};
		var v =
		{
			"-webkit-transform": "transform",
			"-moz-transform": "transform",
			"-o-transform": "transform"
		};
		a.prototype.ontransitionend = function (t)
		{
			if (t.target === this.element)
			{
				var e = this._transn,
					n = v[t.propertyName] || t.propertyName;
				if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd)
				{
					var o = e.onEnd[n];
					o.call(this), delete e.onEnd[n]
				}
				this.emitEvent("transitionEnd", [this])
			}
		}, a.prototype.disableTransition = function ()
		{
			this.removeTransitionStyles(), this.element.removeEventListener(h, this, !1), this.isTransitioning = !1
		}, a.prototype._removeStyles = function (t)
		{
			var e =
			{
			};
			for (var i in t) e[i] = "";
			this.css(e)
		};
		var y =
		{
			transitionProperty: "",
			transitionDuration: ""
		};
		return a.prototype.removeTransitionStyles = function ()
		{
			this.css(y)
		}, a.prototype.removeElem = function ()
		{
			this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
		}, a.prototype.remove = function ()
		{
			if (!l || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
			var t = this;
			this.on("transitionEnd", function ()
			{
				return t.removeElem(), !0
			}), this.hide()
		}, a.prototype.reveal = function ()
		{
			delete this.isHidden, this.css(
			{
				display: ""
			});
			var t = this.layout.options;
			this.transition(
			{
				from: t.hiddenStyle,
				to: t.visibleStyle,
				isCleaning: !0
			})
		}, a.prototype.hide = function ()
		{
			this.isHidden = !0, this.css(
			{
				display: ""
			});
			var t = this.layout.options;
			this.transition(
			{
				from: t.visibleStyle,
				to: t.hiddenStyle,
				isCleaning: !0,
				onTransitionEnd: {
					opacity: function ()
					{
						this.isHidden && this.css(
						{
							display: "none"
						})
					}
				}
			})
		}, a.prototype.destroy = function ()
		{
			this.css(
			{
				position: "",
				left: "",
				right: "",
				top: "",
				bottom: "",
				transition: "",
				transform: ""
			})
		}, a
	}
	var r = t.getComputedStyle,
		s = r ?
		function (t)
		{
			return r(t, null)
		} : function (t)
		{
			return t.currentStyle
		};
	"function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], o) : (t.Outlayer =
	{
	}, t.Outlayer.Item = o(t.EventEmitter, t.getSize, t.getStyleProperty))
}(window), function (t)
{
	function e(t, e)
	{
		for (var i in e) t[i] = e[i];
		return t
	}
	function i(t)
	{
		return "[object Array]" === d.call(t)
	}
	function n(t)
	{
		var e = [];
		if (i(t)) e = t;
		else if (t && "number" == typeof t.length) for (var n = 0, o = t.length; o > n; n++) e.push(t[n]);
		else e.push(t);
		return e
	}
	function o(t, e)
	{
		var i = p(e, t); - 1 !== i && e.splice(i, 1)
	}
	function r(t)
	{
		return t.replace(/(.)([A-Z])/g, function (t, e, i)
		{
			return e + "-" + i
		}).toLowerCase()
	}
	function s(i, s, d, p, f, g)
	{
		function m(t, i)
		{
			if ("string" == typeof t && (t = a.querySelector(t)), !t || !h(t)) return void(l && l.error("Bad " + this.constructor.namespace + " element: " + t));
			this.element = t, this.options = e(
			{
			}, this.constructor.defaults), this.option(i);
			var n = ++v;
			this.element.outlayerGUID = n, y[n] = this, this._create(), this.options.isInitLayout && this.layout()
		}
		var v = 0,
			y =
			{
			};
		return m.namespace = "outlayer", m.Item = g, m.defaults =
		{
			containerStyle: {
				position: "relative"
			},
			isInitLayout: !0,
			isOriginLeft: !0,
			isOriginTop: !0,
			isResizeBound: !0,
			isResizingContainer: !0,
			transitionDuration: "0.4s",
			hiddenStyle: {
				opacity: 0,
				transform: "scale(0.001)"
			},
			visibleStyle: {
				opacity: 1,
				transform: "scale(1)"
			}
		}, e(m.prototype, d.prototype), m.prototype.option = function (t)
		{
			e(this.options, t)
		}, m.prototype._create = function ()
		{
			this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
		}, m.prototype.reloadItems = function ()
		{
			this.items = this._itemize(this.element.children)
		}, m.prototype._itemize = function (t)
		{
			for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0, r = e.length; r > o; o++)
			{
				var s = e[o],
					a = new i(s, this);
				n.push(a)
			}
			return n
		}, m.prototype._filterFindItemElements = function (t)
		{
			t = n(t);
			for (var e = this.options.itemSelector, i = [], o = 0, r = t.length; r > o; o++)
			{
				var s = t[o];
				if (h(s)) if (e)
				{
					f(s, e) && i.push(s);
					for (var a = s.querySelectorAll(e), l = 0, c = a.length; c > l; l++) i.push(a[l])
				}
				else i.push(s)
			}
			return i
		}, m.prototype.getItemElements = function ()
		{
			for (var t = [], e = 0, i = this.items.length; i > e; e++) t.push(this.items[e].element);
			return t
		}, m.prototype.layout = function ()
		{
			this._resetLayout(), this._manageStamps();
			var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
			this.layoutItems(this.items, t), this._isLayoutInited = !0
		}, m.prototype._init = m.prototype.layout, m.prototype._resetLayout = function ()
		{
			this.getSize()
		}, m.prototype.getSize = function ()
		{
			this.size = p(this.element)
		}, m.prototype._getMeasurement = function (t, e)
		{
			var i, n = this.options[t];
			n ? ("string" == typeof n ? i = this.element.querySelector(n) : h(n) && (i = n), this[t] = i ? p(i)[e] : n) : this[t] = 0
		}, m.prototype.layoutItems = function (t, e)
		{
			t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
		}, m.prototype._getItemsForLayout = function (t)
		{
			for (var e = [], i = 0, n = t.length; n > i; i++)
			{
				var o = t[i];
				o.isIgnored || e.push(o)
			}
			return e
		}, m.prototype._layoutItems = function (t, e)
		{
			function i()
			{
				n.emitEvent("layoutComplete", [n, t])
			}
			var n = this;
			if (!t || !t.length) return void i();
			this._itemsOn(t, "layout", i);
			for (var o = [], r = 0, s = t.length; s > r; r++)
			{
				var a = t[r],
					l = this._getItemLayoutPosition(a);
				l.item = a, l.isInstant = e || a.isLayoutInstant, o.push(l)
			}
			this._processLayoutQueue(o)
		}, m.prototype._getItemLayoutPosition = function ()
		{
			return {
				x: 0,
				y: 0
			}
		}, m.prototype._processLayoutQueue = function (t)
		{
			for (var e = 0, i = t.length; i > e; e++)
			{
				var n = t[e];
				this._positionItem(n.item, n.x, n.y, n.isInstant)
			}
		}, m.prototype._positionItem = function (t, e, i, n)
		{
			n ? t.goTo(e, i) : t.moveTo(e, i)
		}, m.prototype._postLayout = function ()
		{
			this.resizeContainer()
		}, m.prototype.resizeContainer = function ()
		{
			if (this.options.isResizingContainer)
			{
				var t = this._getContainerSize();
				t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
			}
		}, m.prototype._getContainerSize = u, m.prototype._setContainerMeasure = function (t, e)
		{
			if (void 0 !== t)
			{
				var i = this.size;
				i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
			}
		}, m.prototype._itemsOn = function (t, e, i)
		{
			function n()
			{
				return o++, o === r && i.call(s), !0
			}
			for (var o = 0, r = t.length, s = this, a = 0, l = t.length; l > a; a++)
			{
				var c = t[a];
				c.on(e, n)
			}
		}, m.prototype.ignore = function (t)
		{
			var e = this.getItem(t);
			e && (e.isIgnored = !0)
		}, m.prototype.unignore = function (t)
		{
			var e = this.getItem(t);
			e && delete e.isIgnored
		}, m.prototype.stamp = function (t)
		{
			if (t = this._find(t))
			{
				this.stamps = this.stamps.concat(t);
				for (var e = 0, i = t.length; i > e; e++)
				{
					var n = t[e];
					this.ignore(n)
				}
			}
		}, m.prototype.unstamp = function (t)
		{
			if (t = this._find(t)) for (var e = 0, i = t.length; i > e; e++)
			{
				var n = t[e];
				o(n, this.stamps), this.unignore(n)
			}
		}, m.prototype._find = function (t)
		{
			return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n(t)) : void 0
		}, m.prototype._manageStamps = function ()
		{
			if (this.stamps && this.stamps.length)
			{
				this._getBoundingRect();
				for (var t = 0, e = this.stamps.length; e > t; t++)
				{
					var i = this.stamps[t];
					this._manageStamp(i)
				}
			}
		}, m.prototype._getBoundingRect = function ()
		{
			var t = this.element.getBoundingClientRect(),
				e = this.size;
			this._boundingRect =
			{
				left: t.left + e.paddingLeft + e.borderLeftWidth,
				top: t.top + e.paddingTop + e.borderTopWidth,
				right: t.right - (e.paddingRight + e.borderRightWidth),
				bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
			}
		}, m.prototype._manageStamp = u, m.prototype._getElementOffset = function (t)
		{
			var e = t.getBoundingClientRect(),
				i = this._boundingRect,
				n = p(t),
				o =
				{
					left: e.left - i.left - n.marginLeft,
					top: e.top - i.top - n.marginTop,
					right: i.right - e.right - n.marginRight,
					bottom: i.bottom - e.bottom - n.marginBottom
				};
			return o
		}, m.prototype.handleEvent = function (t)
		{
			var e = "on" + t.type;
			this[e] && this[e](t)
		}, m.prototype.bindResize = function ()
		{
			this.isResizeBound || (i.bind(t, "resize", this), this.isResizeBound = !0)
		}, m.prototype.unbindResize = function ()
		{
			this.isResizeBound && i.unbind(t, "resize", this), this.isResizeBound = !1
		}, m.prototype.onresize = function ()
		{
			function t()
			{
				e.resize(), delete e.resizeTimeout
			}
			this.resizeTimeout && clearTimeout(this.resizeTimeout);
			var e = this;
			this.resizeTimeout = setTimeout(t, 100)
		}, m.prototype.resize = function ()
		{
			this.isResizeBound && this.needsResizeLayout() && this.layout()
		}, m.prototype.needsResizeLayout = function ()
		{
			var t = p(this.element),
				e = this.size && t;
			return e && t.innerWidth !== this.size.innerWidth
		}, m.prototype.addItems = function (t)
		{
			var e = this._itemize(t);
			return e.length && (this.items = this.items.concat(e)), e
		}, m.prototype.appended = function (t)
		{
			var e = this.addItems(t);
			e.length && (this.layoutItems(e, !0), this.reveal(e))
		}, m.prototype.prepended = function (t)
		{
			var e = this._itemize(t);
			if (e.length)
			{
				var i = this.items.slice(0);
				this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
			}
		}, m.prototype.reveal = function (t)
		{
			var e = t && t.length;
			if (e) for (var i = 0; e > i; i++)
			{
				var n = t[i];
				n.reveal()
			}
		}, m.prototype.hide = function (t)
		{
			var e = t && t.length;
			if (e) for (var i = 0; e > i; i++)
			{
				var n = t[i];
				n.hide()
			}
		}, m.prototype.getItem = function (t)
		{
			for (var e = 0, i = this.items.length; i > e; e++)
			{
				var n = this.items[e];
				if (n.element === t) return n
			}
		}, m.prototype.getItems = function (t)
		{
			if (t && t.length)
			{
				for (var e = [], i = 0, n = t.length; n > i; i++)
				{
					var o = t[i],
						r = this.getItem(o);
					r && e.push(r)
				}
				return e
			}
		}, m.prototype.remove = function (t)
		{
			t = n(t);
			var e = this.getItems(t);
			if (e && e.length)
			{
				this._itemsOn(e, "remove", function ()
				{
					this.emitEvent("removeComplete", [this, e])
				});
				for (var i = 0, r = e.length; r > i; i++)
				{
					var s = e[i];
					s.remove(), o(s, this.items)
				}
			}
		}, m.prototype.destroy = function ()
		{
			var t = this.element.style;
			t.height = "", t.position = "", t.width = "";
			for (var e = 0, i = this.items.length; i > e; e++)
			{
				var n = this.items[e];
				n.destroy()
			}
			this.unbindResize(), delete this.element.outlayerGUID, c && c.removeData(this.element, this.constructor.namespace)
		}, m.data = function (t)
		{
			var e = t && t.outlayerGUID;
			return e && y[e]
		}, m.create = function (t, i)
		{
			function n()
			{
				m.apply(this, arguments)
			}
			return Object.create ? n.prototype = Object.create(m.prototype) : e(n.prototype, m.prototype), n.prototype.constructor = n, n.defaults = e(
			{
			}, m.defaults), e(n.defaults, i), n.prototype.settings =
			{
			}, n.namespace = t, n.data = m.data, n.Item = function ()
			{
				g.apply(this, arguments)
			}, n.Item.prototype = new g, s(function ()
			{
				for (var e = r(t), i = a.querySelectorAll(".js-" + e), o = "data-" + e + "-options", s = 0, u = i.length; u > s; s++)
				{
					var d, h = i[s],
						p = h.getAttribute(o);
					try
					{
						d = p && JSON.parse(p)
					}
					catch (f)
					{
						l && l.error("Error parsing " + o + " on " + h.nodeName.toLowerCase() + (h.id ? "#" + h.id : "") + ": " + f);
						continue
					}
					var g = new n(h, d);
					c && c.data(h, t, g)
				}
			}), c && c.bridget && c.bridget(t, n), n
		}, m.Item = g, m
	}
	var a = t.document,
		l = t.console,
		c = t.jQuery,
		u = function ()
		{
		},
		d = Object.prototype.toString,
		h = "object" == typeof HTMLElement ?
		function (t)
		{
			return t instanceof HTMLElement
		} : function (t)
		{
			return t && "object" == typeof t && 1 === t.nodeType && "string" == typeof t.nodeName
		},
		p = Array.prototype.indexOf ?
		function (t, e)
		{
			return t.indexOf(e)
		} : function (t, e)
		{
			for (var i = 0, n = t.length; n > i; i++) if (t[i] === e) return i;
			return -1
		};
	"function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], s) : t.Outlayer = s(t.eventie, t.docReady, t.EventEmitter, t.getSize, t.matchesSelector, t.Outlayer.Item)
}(window), function (t)
{
	function e(t, e)
	{
		var n = t.create("masonry");
		return n.prototype._resetLayout = function ()
		{
			this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
			var t = this.cols;
			for (this.colYs = []; t--;) this.colYs.push(0);
			this.maxY = 0
		}, n.prototype.measureColumns = function ()
		{
			if (this.getContainerWidth(), !this.columnWidth)
			{
				var t = this.items[0],
					i = t && t.element;
				this.columnWidth = i && e(i).outerWidth || this.containerWidth
			}
			this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
		}, n.prototype.getContainerWidth = function ()
		{
			var t = this.options.isFitWidth ? this.element.parentNode : this.element,
				i = e(t);
			this.containerWidth = i && i.innerWidth
		}, n.prototype._getItemLayoutPosition = function (t)
		{
			t.getSize();
			var e = t.size.outerWidth % this.columnWidth,
				n = e && 1 > e ? "round" : "ceil",
				o = Math[n](t.size.outerWidth / this.columnWidth);
			o = Math.min(o, this.cols);
			for (var r = this._getColGroup(o), s = Math.min.apply(Math, r), a = i(r, s), l =
			{
				x: this.columnWidth * a,
				y: s
			}, c = s + t.size.outerHeight, u = this.cols + 1 - r.length, d = 0; u > d; d++) this.colYs[a + d] = c;
			return l
		}, n.prototype._getColGroup = function (t)
		{
			if (2 > t) return this.colYs;
			for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++)
			{
				var o = this.colYs.slice(n, n + t);
				e[n] = Math.max.apply(Math, o)
			}
			return e
		}, n.prototype._manageStamp = function (t)
		{
			var i = e(t),
				n = this._getElementOffset(t),
				o = this.options.isOriginLeft ? n.left : n.right,
				r = o + i.outerWidth,
				s = Math.floor(o / this.columnWidth);
			s = Math.max(0, s);
			var a = Math.floor(r / this.columnWidth);
			a -= r % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
			for (var l = (this.options.isOriginTop ? n.top : n.bottom) + i.outerHeight, c = s; a >= c; c++) this.colYs[c] = Math.max(l, this.colYs[c])
		}, n.prototype._getContainerSize = function ()
		{
			this.maxY = Math.max.apply(Math, this.colYs);
			var t =
			{
				height: this.maxY
			};
			return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
		}, n.prototype._getContainerFitWidth = function ()
		{
			for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
			return (this.cols - t) * this.columnWidth - this.gutter
		}, n.prototype.needsResizeLayout = function ()
		{
			var t = this.containerWidth;
			return this.getContainerWidth(), t !== this.containerWidth
		}, n
	}
	var i = Array.prototype.indexOf ?
	function (t, e)
	{
		return t.indexOf(e)
	} : function (t, e)
	{
		for (var i = 0, n = t.length; n > i; i++)
		{
			var o = t[i];
			if (o === e) return i
		}
		return -1
	};
	"function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : t.Masonry = e(t.Outlayer, t.getSize)
}(window), function ()
{
	var t = this,
		e = t._,
		i =
		{
		},
		n = Array.prototype,
		o = Object.prototype,
		r = Function.prototype,
		s = n.push,
		a = n.slice,
		l = n.concat,
		c = o.toString,
		u = o.hasOwnProperty,
		d = n.forEach,
		h = n.map,
		p = n.reduce,
		f = n.reduceRight,
		g = n.filter,
		m = n.every,
		v = n.some,
		y = n.indexOf,
		b = n.lastIndexOf,
		w = Array.isArray,
		x = Object.keys,
		k = r.bind,
		S = function (t)
		{
			return t instanceof S ? t : this instanceof S ? void(this._wrapped = t) : new S(t)
		};
	"undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = S), exports._ = S) : t._ = S, S.VERSION = "1.6.0";
	var T = S.each = S.forEach = function (t, e, n)
	{
		if (null == t) return t;
		if (d && t.forEach === d) t.forEach(e, n);
		else if (t.length === +t.length)
		{
			for (var o = 0, r = t.length; r > o; o++) if (e.call(n, t[o], o, t) === i) return
		}
		else for (var s = S.keys(t), o = 0, r = s.length; r > o; o++) if (e.call(n, t[s[o]], s[o], t) === i) return;
		return t
	};
	S.map = S.collect = function (t, e, i)
	{
		var n = [];
		return null == t ? n : h && t.map === h ? t.map(e, i) : (T(t, function (t, o, r)
		{
			n.push(e.call(i, t, o, r))
		}), n)
	};
	var C = "Reduce of empty array with no initial value";
	S.reduce = S.foldl = S.inject = function (t, e, i, n)
	{
		var o = arguments.length > 2;
		if (null == t && (t = []), p && t.reduce === p) return n && (e = S.bind(e, n)), o ? t.reduce(e, i) : t.reduce(e);
		if (T(t, function (t, r, s)
		{
			o ? i = e.call(n, i, t, r, s) : (i = t, o = !0)
		}), !o) throw new TypeError(C);
		return i
	}, S.reduceRight = S.foldr = function (t, e, i, n)
	{
		var o = arguments.length > 2;
		if (null == t && (t = []), f && t.reduceRight === f) return n && (e = S.bind(e, n)), o ? t.reduceRight(e, i) : t.reduceRight(e);
		var r = t.length;
		if (r !== +r)
		{
			var s = S.keys(t);
			r = s.length
		}
		if (T(t, function (a, l, c)
		{
			l = s ? s[--r] : --r, o ? i = e.call(n, i, t[l], l, c) : (i = t[l], o = !0)
		}), !o) throw new TypeError(C);
		return i
	}, S.find = S.detect = function (t, e, i)
	{
		var n;
		return $(t, function (t, o, r)
		{
			return e.call(i, t, o, r) ? (n = t, !0) : void 0
		}), n
	}, S.filter = S.select = function (t, e, i)
	{
		var n = [];
		return null == t ? n : g && t.filter === g ? t.filter(e, i) : (T(t, function (t, o, r)
		{
			e.call(i, t, o, r) && n.push(t)
		}), n)
	}, S.reject = function (t, e, i)
	{
		return S.filter(t, function (t, n, o)
		{
			return !e.call(i, t, n, o)
		}, i)
	}, S.every = S.all = function (t, e, n)
	{
		e || (e = S.identity);
		var o = !0;
		return null == t ? o : m && t.every === m ? t.every(e, n) : (T(t, function (t, r, s)
		{
			return (o = o && e.call(n, t, r, s)) ? void 0 : i
		}), !! o)
	};
	var $ = S.some = S.any = function (t, e, n)
	{
		e || (e = S.identity);
		var o = !1;
		return null == t ? o : v && t.some === v ? t.some(e, n) : (T(t, function (t, r, s)
		{
			return o || (o = e.call(n, t, r, s)) ? i : void 0
		}), !! o)
	};
	S.contains = S.include = function (t, e)
	{
		return null == t ? !1 : y && t.indexOf === y ? -1 != t.indexOf(e) : $(t, function (t)
		{
			return t === e
		})
	}, S.invoke = function (t, e)
	{
		var i = a.call(arguments, 2),
			n = S.isFunction(e);
		return S.map(t, function (t)
		{
			return (n ? e : t[e]).apply(t, i)
		})
	}, S.pluck = function (t, e)
	{
		return S.map(t, S.property(e))
	}, S.where = function (t, e)
	{
		return S.filter(t, S.matches(e))
	}, S.findWhere = function (t, e)
	{
		return S.find(t, S.matches(e))
	}, S.max = function (t, e, i)
	{
		if (!e && S.isArray(t) && t[0] === +t[0] && t.length < 65535) return Math.max.apply(Math, t);
		var n = -1 / 0,
			o = -1 / 0;
		return T(t, function (t, r, s)
		{
			var a = e ? e.call(i, t, r, s) : t;
			a > o && (n = t, o = a)
		}), n
	}, S.min = function (t, e, i)
	{
		if (!e && S.isArray(t) && t[0] === +t[0] && t.length < 65535) return Math.min.apply(Math, t);
		var n = 1 / 0,
			o = 1 / 0;
		return T(t, function (t, r, s)
		{
			var a = e ? e.call(i, t, r, s) : t;
			o > a && (n = t, o = a)
		}), n
	}, S.shuffle = function (t)
	{
		var e, i = 0,
			n = [];
		return T(t, function (t)
		{
			e = S.random(i++), n[i - 1] = n[e], n[e] = t
		}), n
	}, S.sample = function (t, e, i)
	{
		return null == e || i ? (t.length !== +t.length && (t = S.values(t)), t[S.random(t.length - 1)]) : S.shuffle(t).slice(0, Math.max(0, e))
	};
	var _ = function (t)
	{
		return null == t ? S.identity : S.isFunction(t) ? t : S.property(t)
	};
	S.sortBy = function (t, e, i)
	{
		return e = _(e), S.pluck(S.map(t, function (t, n, o)
		{
			return {
				value: t,
				index: n,
				criteria: e.call(i, t, n, o)
			}
		}).sort(function (t, e)
		{
			var i = t.criteria,
				n = e.criteria;
			if (i !== n)
			{
				if (i > n || void 0 === i) return 1;
				if (n > i || void 0 === n) return -1
			}
			return t.index - e.index
		}), "value")
	};
	var E = function (t)
	{
		return function (e, i, n)
		{
			var o =
			{
			};
			return i = _(i), T(e, function (r, s)
			{
				var a = i.call(n, r, s, e);
				t(o, a, r)
			}), o
		}
	};
	S.groupBy = E(function (t, e, i)
	{
		S.has(t, e) ? t[e].push(i) : t[e] = [i]
	}), S.indexBy = E(function (t, e, i)
	{
		t[e] = i
	}), S.countBy = E(function (t, e)
	{
		S.has(t, e) ? t[e]++ : t[e] = 1
	}), S.sortedIndex = function (t, e, i, n)
	{
		i = _(i);
		for (var o = i.call(n, e), r = 0, s = t.length; s > r;)
		{
			var a = r + s >>> 1;
			i.call(n, t[a]) < o ? r = a + 1 : s = a
		}
		return r
	}, S.toArray = function (t)
	{
		return t ? S.isArray(t) ? a.call(t) : t.length === +t.length ? S.map(t, S.identity) : S.values(t) : []
	}, S.size = function (t)
	{
		return null == t ? 0 : t.length === +t.length ? t.length : S.keys(t).length
	}, S.first = S.head = S.take = function (t, e, i)
	{
		return null == t ? void 0 : null == e || i ? t[0] : 0 > e ? [] : a.call(t, 0, e)
	}, S.initial = function (t, e, i)
	{
		return a.call(t, 0, t.length - (null == e || i ? 1 : e))
	}, S.last = function (t, e, i)
	{
		return null == t ? void 0 : null == e || i ? t[t.length - 1] : a.call(t, Math.max(t.length - e, 0))
	}, S.rest = S.tail = S.drop = function (t, e, i)
	{
		return a.call(t, null == e || i ? 1 : e)
	}, S.compact = function (t)
	{
		return S.filter(t, S.identity)
	};
	var O = function (t, e, i)
	{
		return e && S.every(t, S.isArray) ? l.apply(i, t) : (T(t, function (t)
		{
			S.isArray(t) || S.isArguments(t) ? e ? s.apply(i, t) : O(t, e, i) : i.push(t)
		}), i)
	};
	S.flatten = function (t, e)
	{
		return O(t, e, [])
	}, S.without = function (t)
	{
		return S.difference(t, a.call(arguments, 1))
	}, S.partition = function (t, e)
	{
		var i = [],
			n = [];
		return T(t, function (t)
		{
			(e(t) ? i : n).push(t)
		}), [i, n]
	}, S.uniq = S.unique = function (t, e, i, n)
	{
		S.isFunction(e) && (n = i, i = e, e = !1);
		var o = i ? S.map(t, i, n) : t,
			r = [],
			s = [];
		return T(o, function (i, n)
		{
			(e ? n && s[s.length - 1] === i : S.contains(s, i)) || (s.push(i), r.push(t[n]))
		}), r
	}, S.union = function ()
	{
		return S.uniq(S.flatten(arguments, !0))
	}, S.intersection = function (t)
	{
		var e = a.call(arguments, 1);
		return S.filter(S.uniq(t), function (t)
		{
			return S.every(e, function (e)
			{
				return S.contains(e, t)
			})
		})
	}, S.difference = function (t)
	{
		var e = l.apply(n, a.call(arguments, 1));
		return S.filter(t, function (t)
		{
			return !S.contains(e, t)
		})
	}, S.zip = function ()
	{
		for (var t = S.max(S.pluck(arguments, "length").concat(0)), e = new Array(t), i = 0; t > i; i++) e[i] = S.pluck(arguments, "" + i);
		return e
	}, S.object = function (t, e)
	{
		if (null == t) return {
		};
		for (var i =
		{
		}, n = 0, o = t.length; o > n; n++) e ? i[t[n]] = e[n] : i[t[n][0]] = t[n][1];
		return i
	}, S.indexOf = function (t, e, i)
	{
		if (null == t) return -1;
		var n = 0,
			o = t.length;
		if (i)
		{
			if ("number" != typeof i) return n = S.sortedIndex(t, e), t[n] === e ? n : -1;
			n = 0 > i ? Math.max(0, o + i) : i
		}
		if (y && t.indexOf === y) return t.indexOf(e, i);
		for (; o > n; n++) if (t[n] === e) return n;
		return -1
	}, S.lastIndexOf = function (t, e, i)
	{
		if (null == t) return -1;
		var n = null != i;
		if (b && t.lastIndexOf === b) return n ? t.lastIndexOf(e, i) : t.lastIndexOf(e);
		for (var o = n ? i : t.length; o--;) if (t[o] === e) return o;
		return -1
	}, S.range = function (t, e, i)
	{
		arguments.length <= 1 && (e = t || 0, t = 0), i = arguments[2] || 1;
		for (var n = Math.max(Math.ceil((e - t) / i), 0), o = 0, r = new Array(n); n > o;) r[o++] = t, t += i;
		return r
	};
	var P = function ()
	{
	};
	S.bind = function (t, e)
	{
		var i, n;
		if (k && t.bind === k) return k.apply(t, a.call(arguments, 1));
		if (!S.isFunction(t)) throw new TypeError;
		return i = a.call(arguments, 2), n = function ()
		{
			if (!(this instanceof n)) return t.apply(e, i.concat(a.call(arguments)));
			P.prototype = t.prototype;
			var o = new P;
			P.prototype = null;
			var r = t.apply(o, i.concat(a.call(arguments)));
			return Object(r) === r ? r : o
		}
	}, S.partial = function (t)
	{
		var e = a.call(arguments, 1);
		return function ()
		{
			for (var i = 0, n = e.slice(), o = 0, r = n.length; r > o; o++) n[o] === S && (n[o] = arguments[i++]);
			for (; i < arguments.length;) n.push(arguments[i++]);
			return t.apply(this, n)
		}
	}, S.bindAll = function (t)
	{
		var e = a.call(arguments, 1);
		if (0 === e.length) throw new Error("bindAll must be passed function names");
		return T(e, function (e)
		{
			t[e] = S.bind(t[e], t)
		}), t
	}, S.memoize = function (t, e)
	{
		var i =
		{
		};
		return e || (e = S.identity), function ()
		{
			var n = e.apply(this, arguments);
			return S.has(i, n) ? i[n] : i[n] = t.apply(this, arguments)
		}
	}, S.delay = function (t, e)
	{
		var i = a.call(arguments, 2);
		return setTimeout(function ()
		{
			return t.apply(null, i)
		}, e)
	}, S.defer = function (t)
	{
		return S.delay.apply(S, [t, 1].concat(a.call(arguments, 1)))
	}, S.throttle = function (t, e, i)
	{
		var n, o, r, s = null,
			a = 0;
		i || (i =
		{
		});
		var l = function ()
		{
			a = i.leading === !1 ? 0 : S.now(), s = null, r = t.apply(n, o), n = o = null
		};
		return function ()
		{
			var c = S.now();
			a || i.leading !== !1 || (a = c);
			var u = e - (c - a);
			return n = this, o = arguments, 0 >= u ? (clearTimeout(s), s = null, a = c, r = t.apply(n, o), n = o = null) : s || i.trailing === !1 || (s = setTimeout(l, u)), r
		}
	}, S.debounce = function (t, e, i)
	{
		var n, o, r, s, a, l = function ()
		{
			var c = S.now() - s;
			e > c ? n = setTimeout(l, e - c) : (n = null, i || (a = t.apply(r, o), r = o = null))
		};
		return function ()
		{
			r = this, o = arguments, s = S.now();
			var c = i && !n;
			return n || (n = setTimeout(l, e)), c && (a = t.apply(r, o), r = o = null), a
		}
	}, S.once = function (t)
	{
		var e, i = !1;
		return function ()
		{
			return i ? e : (i = !0, e = t.apply(this, arguments), t = null, e)
		}
	}, S.wrap = function (t, e)
	{
		return S.partial(e, t)
	}, S.compose = function ()
	{
		var t = arguments;
		return function ()
		{
			for (var e = arguments, i = t.length - 1; i >= 0; i--) e = [t[i].apply(this, e)];
			return e[0]
		}
	}, S.after = function (t, e)
	{
		return function ()
		{
			return --t < 1 ? e.apply(this, arguments) : void 0
		}
	}, S.keys = function (t)
	{
		if (!S.isObject(t)) return [];
		if (x) return x(t);
		var e = [];
		for (var i in t) S.has(t, i) && e.push(i);
		return e
	}, S.values = function (t)
	{
		for (var e = S.keys(t), i = e.length, n = new Array(i), o = 0; i > o; o++) n[o] = t[e[o]];
		return n
	}, S.pairs = function (t)
	{
		for (var e = S.keys(t), i = e.length, n = new Array(i), o = 0; i > o; o++) n[o] = [e[o], t[e[o]]];
		return n
	}, S.invert = function (t)
	{
		for (var e =
		{
		}, i = S.keys(t), n = 0, o = i.length; o > n; n++) e[t[i[n]]] = i[n];
		return e
	}, S.functions = S.methods = function (t)
	{
		var e = [];
		for (var i in t) S.isFunction(t[i]) && e.push(i);
		return e.sort()
	}, S.extend = function (t)
	{
		return T(a.call(arguments, 1), function (e)
		{
			if (e) for (var i in e) t[i] = e[i]
		}), t
	}, S.pick = function (t)
	{
		var e =
		{
		},
			i = l.apply(n, a.call(arguments, 1));
		return T(i, function (i)
		{
			i in t && (e[i] = t[i])
		}), e
	}, S.omit = function (t)
	{
		var e =
		{
		},
			i = l.apply(n, a.call(arguments, 1));
		for (var o in t) S.contains(i, o) || (e[o] = t[o]);
		return e
	}, S.defaults = function (t)
	{
		return T(a.call(arguments, 1), function (e)
		{
			if (e) for (var i in e) void 0 === t[i] && (t[i] = e[i])
		}), t
	}, S.clone = function (t)
	{
		return S.isObject(t) ? S.isArray(t) ? t.slice() : S.extend(
		{
		}, t) : t
	}, S.tap = function (t, e)
	{
		return e(t), t
	};
	var A = function (t, e, i, n)
	{
		if (t === e) return 0 !== t || 1 / t == 1 / e;
		if (null == t || null == e) return t === e;
		t instanceof S && (t = t._wrapped), e instanceof S && (e = e._wrapped);
		var o = c.call(t);
		if (o != c.call(e)) return !1;
		switch (o)
		{
		case "[object String]":
			return t == String(e);
		case "[object Number]":
			return t != +t ? e != +e : 0 == t ? 1 / t == 1 / e : t == +e;
		case "[object Date]":
		case "[object Boolean]":
			return +t == +e;
		case "[object RegExp]":
			return t.source == e.source && t.global == e.global && t.multiline == e.multiline && t.ignoreCase == e.ignoreCase
		}
		if ("object" != typeof t || "object" != typeof e) return !1;
		for (var r = i.length; r--;) if (i[r] == t) return n[r] == e;
		var s = t.constructor,
			a = e.constructor;
		if (s !== a && !(S.isFunction(s) && s instanceof s && S.isFunction(a) && a instanceof a) && "constructor" in t && "constructor" in e) return !1;
		i.push(t), n.push(e);
		var l = 0,
			u = !0;
		if ("[object Array]" == o)
		{
			if (l = t.length, u = l == e.length) for (; l-- && (u = A(t[l], e[l], i, n)););
		}
		else
		{
			for (var d in t) if (S.has(t, d) && (l++, !(u = S.has(e, d) && A(t[d], e[d], i, n)))) break;
			if (u)
			{
				for (d in e) if (S.has(e, d) && !l--) break;
				u = !l
			}
		}
		return i.pop(), n.pop(), u
	};
	S.isEqual = function (t, e)
	{
		return A(t, e, [], [])
	}, S.isEmpty = function (t)
	{
		if (null == t) return !0;
		if (S.isArray(t) || S.isString(t)) return 0 === t.length;
		for (var e in t) if (S.has(t, e)) return !1;
		return !0
	}, S.isElement = function (t)
	{
		return !(!t || 1 !== t.nodeType)
	}, S.isArray = w ||
	function (t)
	{
		return "[object Array]" == c.call(t)
	}, S.isObject = function (t)
	{
		return t === Object(t)
	}, T(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (t)
	{
		S["is" + t] = function (e)
		{
			return c.call(e) == "[object " + t + "]"
		}
	}), S.isArguments(arguments) || (S.isArguments = function (t)
	{
		return !(!t || !S.has(t, "callee"))
	}), "function" != typeof / . / && (S.isFunction = function (t)
	{
		return "function" == typeof t
	}), S.isFinite = function (t)
	{
		return isFinite(t) && !isNaN(parseFloat(t))
	}, S.isNaN = function (t)
	{
		return S.isNumber(t) && t != +t
	}, S.isBoolean = function (t)
	{
		return t === !0 || t === !1 || "[object Boolean]" == c.call(t)
	}, S.isNull = function (t)
	{
		return null === t
	}, S.isUndefined = function (t)
	{
		return void 0 === t
	}, S.has = function (t, e)
	{
		return u.call(t, e)
	}, S.noConflict = function ()
	{
		return t._ = e, this
	}, S.identity = function (t)
	{
		return t
	}, S.constant = function (t)
	{
		return function ()
		{
			return t
		}
	}, S.property = function (t)
	{
		return function (e)
		{
			return e[t]
		}
	}, S.matches = function (t)
	{
		return function (e)
		{
			if (e === t) return !0;
			for (var i in t) if (t[i] !== e[i]) return !1;
			return !0
		}
	}, S.times = function (t, e, i)
	{
		for (var n = Array(Math.max(0, t)), o = 0; t > o; o++) n[o] = e.call(i, o);
		return n
	}, S.random = function (t, e)
	{
		return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
	}, S.now = Date.now ||
	function ()
	{
		return (new Date).getTime()
	};
	var j =
	{
		escape: {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#x27;"
		}
	};
	j.unescape = S.invert(j.escape);
	var z =
	{
		escape: new RegExp("[" + S.keys(j.escape).join("") + "]", "g"),
		unescape: new RegExp("(" + S.keys(j.unescape).join("|") + ")", "g")
	};
	S.each(["escape", "unescape"], function (t)
	{
		S[t] = function (e)
		{
			return null == e ? "" : ("" + e).replace(z[t], function (e)
			{
				return j[t][e]
			})
		}
	}), S.result = function (t, e)
	{
		if (null == t) return void 0;
		var i = t[e];
		return S.isFunction(i) ? i.call(t) : i
	}, S.mixin = function (t)
	{
		T(S.functions(t), function (e)
		{
			var i = S[e] = t[e];
			S.prototype[e] = function ()
			{
				var t = [this._wrapped];
				return s.apply(t, arguments), H.call(this, i.apply(S, t))
			}
		})
	};
	var I = 0;
	S.uniqueId = function (t)
	{
		var e = ++I + "";
		return t ? t + e : e
	}, S.templateSettings =
	{
		evaluate: /<%([\s\S]+?)%>/g,
		interpolate: /<%=([\s\S]+?)%>/g,
		escape: /<%-([\s\S]+?)%>/g
	};
	var M = /(.)^/,
		L =
		{
			"'": "'",
			"\\": "\\",
			"\r": "r",
			"\n": "n",
			"	": "t",
			"\u2028": "u2028",
			"\u2029": "u2029"
		},
		R = /\\|'|\r|\n|\t|\u2028|\u2029/g;
	S.template = function (t, e, i)
	{
		var n;
		i = S.defaults(
		{
		}, i, S.templateSettings);
		var o = new RegExp([(i.escape || M).source, (i.interpolate || M).source, (i.evaluate || M).source].join("|") + "|$", "g"),
			r = 0,
			s = "__p+='";
		t.replace(o, function (e, i, n, o, a)
		{
			return s += t.slice(r, a).replace(R, function (t)
			{
				return "\\" + L[t]
			}), i && (s += "'+\n((__t=(" + i + "))==null?'':_.escape(__t))+\n'"), n && (s += "'+\n((__t=(" + n + "))==null?'':__t)+\n'"), o && (s += "';\n" + o + "\n__p+='"), r = a + e.length, e
		}), s += "';\n", i.variable || (s = "with(obj||{}){\n" + s + "}\n"), s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
		try
		{
			n = new Function(i.variable || "obj", "_", s)
		}
		catch (a)
		{
			throw a.source = s, a
		}
		if (e) return n(e, S);
		var l = function (t)
		{
			return n.call(this, t, S)
		};
		return l.source = "function(" + (i.variable || "obj") + "){\n" + s + "}", l
	}, S.chain = function (t)
	{
		return S(t).chain()
	};
	var H = function (t)
	{
		return this._chain ? S(t).chain() : t
	};
	S.mixin(S), T(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (t)
	{
		var e = n[t];
		S.prototype[t] = function ()
		{
			var i = this._wrapped;
			return e.apply(i, arguments), "shift" != t && "splice" != t || 0 !== i.length || delete i[0], H.call(this, i)
		}
	}), T(["concat", "join", "slice"], function (t)
	{
		var e = n[t];
		S.prototype[t] = function ()
		{
			return H.call(this, e.apply(this._wrapped, arguments))
		}
	}), S.extend(S.prototype, {
		chain: function ()
		{
			return this._chain = !0, this
		},
		value: function ()
		{
			return this._wrapped
		}
	}), "function" == typeof define && define.amd && define("underscore", [], function ()
	{
		return S
	})
}.call(this), function (t, e)
{
	if ("function" == typeof define && define.amd) define(["underscore", "jquery", "exports"], function (i, n, o)
	{
		t.Backbone = e(t, o, i, n)
	});
	else if ("undefined" != typeof exports)
	{
		var i = require("underscore");
		e(t, exports, i)
	}
	else t.Backbone = e(t, {
	}, t._, t.jQuery || t.Zepto || t.ender || t.$)
}(this, function (t, e, i, n)
{
	{
		var o = t.Backbone,
			r = [],
			s = (r.push, r.slice);
		r.splice
	}
	e.VERSION = "1.1.2", e.$ = n, e.noConflict = function ()
	{
		return t.Backbone = o, this
	}, e.emulateHTTP = !1, e.emulateJSON = !1;
	var a = e.Events =
	{
		on: function (t, e, i)
		{
			if (!c(this, "on", t, [e, i]) || !e) return this;
			this._events || (this._events =
			{
			});
			var n = this._events[t] || (this._events[t] = []);
			return n.push(
			{
				callback: e,
				context: i,
				ctx: i || this
			}), this
		},
		once: function (t, e, n)
		{
			if (!c(this, "once", t, [e, n]) || !e) return this;
			var o = this,
				r = i.once(function ()
				{
					o.off(t, r), e.apply(this, arguments)
				});
			return r._callback = e, this.on(t, r, n)
		},
		off: function (t, e, n)
		{
			var o, r, s, a, l, u, d, h;
			if (!this._events || !c(this, "off", t, [e, n])) return this;
			if (!t && !e && !n) return this._events = void 0, this;
			for (a = t ? [t] : i.keys(this._events), l = 0, u = a.length; u > l; l++) if (t = a[l], s = this._events[t])
			{
				if (this._events[t] = o = [], e || n) for (d = 0, h = s.length; h > d; d++) r = s[d], (e && e !== r.callback && e !== r.callback._callback || n && n !== r.context) && o.push(r);
				o.length || delete this._events[t]
			}
			return this
		},
		trigger: function (t)
		{
			if (!this._events) return this;
			var e = s.call(arguments, 1);
			if (!c(this, "trigger", t, e)) return this;
			var i = this._events[t],
				n = this._events.all;
			return i && u(i, e), n && u(n, arguments), this
		},
		stopListening: function (t, e, n)
		{
			var o = this._listeningTo;
			if (!o) return this;
			var r = !e && !n;
			n || "object" != typeof e || (n = this), t && ((o =
			{
			})[t._listenId] = t);
			for (var s in o) t = o[s], t.off(e, n, this), (r || i.isEmpty(t._events)) && delete this._listeningTo[s];
			return this
		}
	},
		l = /\s+/,
		c = function (t, e, i, n)
		{
			if (!i) return !0;
			if ("object" == typeof i)
			{
				for (var o in i) t[e].apply(t, [o, i[o]].concat(n));
				return !1
			}
			if (l.test(i))
			{
				for (var r = i.split(l), s = 0, a = r.length; a > s; s++) t[e].apply(t, [r[s]].concat(n));
				return !1
			}
			return !0
		},
		u = function (t, e)
		{
			var i, n = -1,
				o = t.length,
				r = e[0],
				s = e[1],
				a = e[2];
			switch (e.length)
			{
			case 0:
				for (; ++n < o;)(i = t[n]).callback.call(i.ctx);
				return;
			case 1:
				for (; ++n < o;)(i = t[n]).callback.call(i.ctx, r);
				return;
			case 2:
				for (; ++n < o;)(i = t[n]).callback.call(i.ctx, r, s);
				return;
			case 3:
				for (; ++n < o;)(i = t[n]).callback.call(i.ctx, r, s, a);
				return;
			default:
				for (; ++n < o;)(i = t[n]).callback.apply(i.ctx, e);
				return
			}
		},
		d =
		{
			listenTo: "on",
			listenToOnce: "once"
		};
	i.each(d, function (t, e)
	{
		a[e] = function (e, n, o)
		{
			var r = this._listeningTo || (this._listeningTo =
			{
			}),
				s = e._listenId || (e._listenId = i.uniqueId("l"));
			return r[s] = e, o || "object" != typeof n || (o = this), e[t](n, o, this), this
		}
	}), a.bind = a.on, a.unbind = a.off, i.extend(e, a);
	var h = e.Model = function (t, e)
	{
		var n = t || {
		};
		e || (e =
		{
		}), this.cid = i.uniqueId("c"), this.attributes =
		{
		}, e.collection && (this.collection = e.collection), e.parse && (n = this.parse(n, e) || {
		}), n = i.defaults(
		{
		}, n, i.result(this, "defaults")), this.set(n, e), this.changed =
		{
		}, this.initialize.apply(this, arguments)
	};
	i.extend(h.prototype, a, {
		changed: null,
		validationError: null,
		idAttribute: "id",
		initialize: function ()
		{
		},
		toJSON: function ()
		{
			return i.clone(this.attributes)
		},
		sync: function ()
		{
			return e.sync.apply(this, arguments)
		},
		get: function (t)
		{
			return this.attributes[t]
		},
		escape: function (t)
		{
			return i.escape(this.get(t))
		},
		has: function (t)
		{
			return null != this.get(t)
		},
		set: function (t, e, n)
		{
			var o, r, s, a, l, c, u, d;
			if (null == t) return this;
			if ("object" == typeof t ? (r = t, n = e) : (r =
			{
			})[t] = e, n || (n =
			{
			}), !this._validate(r, n)) return !1;
			s = n.unset, l = n.silent, a = [], c = this._changing, this._changing = !0, c || (this._previousAttributes = i.clone(this.attributes), this.changed =
			{
			}), d = this.attributes, u = this._previousAttributes, this.idAttribute in r && (this.id = r[this.idAttribute]);
			for (o in r) e = r[o], i.isEqual(d[o], e) || a.push(o), i.isEqual(u[o], e) ? delete this.changed[o] : this.changed[o] = e, s ? delete d[o] : d[o] = e;
			if (!l)
			{
				a.length && (this._pending = n);
				for (var h = 0, p = a.length; p > h; h++) this.trigger("change:" + a[h], this, d[a[h]], n)
			}
			if (c) return this;
			if (!l) for (; this._pending;) n = this._pending, this._pending = !1, this.trigger("change", this, n);
			return this._pending = !1, this._changing = !1, this
		},
		unset: function (t, e)
		{
			return this.set(t, void 0, i.extend(
			{
			}, e, {
				unset: !0
			}))
		},
		clear: function (t)
		{
			var e =
			{
			};
			for (var n in this.attributes) e[n] = void 0;
			return this.set(e, i.extend(
			{
			}, t, {
				unset: !0
			}))
		},
		hasChanged: function (t)
		{
			return null == t ? !i.isEmpty(this.changed) : i.has(this.changed, t)
		},
		changedAttributes: function (t)
		{
			if (!t) return this.hasChanged() ? i.clone(this.changed) : !1;
			var e, n = !1,
				o = this._changing ? this._previousAttributes : this.attributes;
			for (var r in t) i.isEqual(o[r], e = t[r]) || ((n || (n =
			{
			}))[r] = e);
			return n
		},
		previous: function (t)
		{
			return null != t && this._previousAttributes ? this._previousAttributes[t] : null
		},
		previousAttributes: function ()
		{
			return i.clone(this._previousAttributes)
		},
		fetch: function (t)
		{
			t = t ? i.clone(t) : {
			}, void 0 === t.parse && (t.parse = !0);
			var e = this,
				n = t.success;
			return t.success = function (i)
			{
				return e.set(e.parse(i, t), t) ? (n && n(e, i, t), void e.trigger("sync", e, i, t)) : !1
			}, R(this, t), this.sync("read", this, t)
		},
		save: function (t, e, n)
		{
			var o, r, s, a = this.attributes;
			if (null == t || "object" == typeof t ? (o = t, n = e) : (o =
			{
			})[t] = e, n = i.extend(
			{
				validate: !0
			}, n), o && !n.wait)
			{
				if (!this.set(o, n)) return !1
			}
			else if (!this._validate(o, n)) return !1;
			o && n.wait && (this.attributes = i.extend(
			{
			}, a, o)), void 0 === n.parse && (n.parse = !0);
			var l = this,
				c = n.success;
			return n.success = function (t)
			{
				l.attributes = a;
				var e = l.parse(t, n);
				return n.wait && (e = i.extend(o || {
				}, e)), i.isObject(e) && !l.set(e, n) ? !1 : (c && c(l, t, n), void l.trigger("sync", l, t, n))
			}, R(this, n), r = this.isNew() ? "create" : n.patch ? "patch" : "update", "patch" === r && (n.attrs = o), s = this.sync(r, this, n), o && n.wait && (this.attributes = a), s
		},
		destroy: function (t)
		{
			t = t ? i.clone(t) : {
			};
			var e = this,
				n = t.success,
				o = function ()
				{
					e.trigger("destroy", e, e.collection, t)
				};
			if (t.success = function (i)
			{
				(t.wait || e.isNew()) && o(), n && n(e, i, t), e.isNew() || e.trigger("sync", e, i, t)
			}, this.isNew()) return t.success(), !1;
			R(this, t);
			var r = this.sync("delete", this, t);
			return t.wait || o(), r
		},
		url: function ()
		{
			var t = i.result(this, "urlRoot") || i.result(this.collection, "url") || L();
			return this.isNew() ? t : t.replace(/([^\/])$/, "$1/") + encodeURIComponent(this.id)
		},
		parse: function (t)
		{
			return t
		},
		clone: function ()
		{
			return new this.constructor(this.attributes)
		},
		isNew: function ()
		{
			return !this.has(this.idAttribute)
		},
		isValid: function (t)
		{
			return this._validate(
			{
			}, i.extend(t || {
			}, {
				validate: !0
			}))
		},
		_validate: function (t, e)
		{
			if (!e.validate || !this.validate) return !0;
			t = i.extend(
			{
			}, this.attributes, t);
			var n = this.validationError = this.validate(t, e) || null;
			return n ? (this.trigger("invalid", this, n, i.extend(e, {
				validationError: n
			})), !1) : !0
		}
	});
	var p = ["keys", "values", "pairs", "invert", "pick", "omit"];
	i.each(p, function (t)
	{
		h.prototype[t] = function ()
		{
			var e = s.call(arguments);
			return e.unshift(this.attributes), i[t].apply(i, e)
		}
	});
	var f = e.Collection = function (t, e)
	{
		e || (e =
		{
		}), e.model && (this.model = e.model), void 0 !== e.comparator && (this.comparator = e.comparator), this._reset(), this.initialize.apply(this, arguments), t && this.reset(t, i.extend(
		{
			silent: !0
		}, e))
	},
		g =
		{
			add: !0,
			remove: !0,
			merge: !0
		},
		m =
		{
			add: !0,
			remove: !1
		};
	i.extend(f.prototype, a, {
		model: h,
		initialize: function ()
		{
		},
		toJSON: function (t)
		{
			return this.map(function (e)
			{
				return e.toJSON(t)
			})
		},
		sync: function ()
		{
			return e.sync.apply(this, arguments)
		},
		add: function (t, e)
		{
			return this.set(t, i.extend(
			{
				merge: !1
			}, e, m))
		},
		remove: function (t, e)
		{
			var n = !i.isArray(t);
			t = n ? [t] : i.clone(t), e || (e =
			{
			});
			var o, r, s, a;
			for (o = 0, r = t.length; r > o; o++) a = t[o] = this.get(t[o]), a && (delete this._byId[a.id], delete this._byId[a.cid], s = this.indexOf(a), this.models.splice(s, 1), this.length--, e.silent || (e.index = s, a.trigger("remove", a, this, e)), this._removeReference(a, e));
			return n ? t[0] : t
		},
		set: function (t, e)
		{
			e = i.defaults(
			{
			}, e, g), e.parse && (t = this.parse(t, e));
			var n = !i.isArray(t);
			t = n ? t ? [t] : [] : i.clone(t);
			var o, r, s, a, l, c, u, d = e.at,
				p = this.model,
				f = this.comparator && null == d && e.sort !== !1,
				m = i.isString(this.comparator) ? this.comparator : null,
				v = [],
				y = [],
				b =
				{
				},
				w = e.add,
				x = e.merge,
				k = e.remove,
				S = !f && w && k ? [] : !1;
			for (o = 0, r = t.length; r > o; o++)
			{
				if (l = t[o] || {
				}, s = l instanceof h ? a = l : l[p.prototype.idAttribute || "id"], c = this.get(s)) k && (b[c.cid] = !0), x && (l = l === a ? a.attributes : l, e.parse && (l = c.parse(l, e)), c.set(l, e), f && !u && c.hasChanged(m) && (u = !0)), t[o] = c;
				else if (w)
				{
					if (a = t[o] = this._prepareModel(l, e), !a) continue;
					v.push(a), this._addReference(a, e)
				}
				a = c || a, !S || !a.isNew() && b[a.id] || S.push(a), b[a.id] = !0
			}
			if (k)
			{
				for (o = 0, r = this.length; r > o; ++o) b[(a = this.models[o]).cid] || y.push(a);
				y.length && this.remove(y, e)
			}
			if (v.length || S && S.length) if (f && (u = !0), this.length += v.length, null != d) for (o = 0, r = v.length; r > o; o++) this.models.splice(d + o, 0, v[o]);
			else
			{
				S && (this.models.length = 0);
				var T = S || v;
				for (o = 0, r = T.length; r > o; o++) this.models.push(T[o])
			}
			if (u && this.sort(
			{
				silent: !0
			}), !e.silent)
			{
				for (o = 0, r = v.length; r > o; o++)(a = v[o]).trigger("add", a, this, e);
				(u || S && S.length) && this.trigger("sort", this, e)
			}
			return n ? t[0] : t
		},
		reset: function (t, e)
		{
			e || (e =
			{
			});
			for (var n = 0, o = this.models.length; o > n; n++) this._removeReference(this.models[n], e);
			return e.previousModels = this.models, this._reset(), t = this.add(t, i.extend(
			{
				silent: !0
			}, e)), e.silent || this.trigger("reset", this, e), t
		},
		push: function (t, e)
		{
			return this.add(t, i.extend(
			{
				at: this.length
			}, e))
		},
		pop: function (t)
		{
			var e = this.at(this.length - 1);
			return this.remove(e, t), e
		},
		unshift: function (t, e)
		{
			return this.add(t, i.extend(
			{
				at: 0
			}, e))
		},
		shift: function (t)
		{
			var e = this.at(0);
			return this.remove(e, t), e
		},
		slice: function ()
		{
			return s.apply(this.models, arguments)
		},
		get: function (t)
		{
			return null == t ? void 0 : this._byId[t] || this._byId[t.id] || this._byId[t.cid]
		},
		at: function (t)
		{
			return this.models[t]
		},
		where: function (t, e)
		{
			return i.isEmpty(t) ? e ? void 0 : [] : this[e ? "find" : "filter"](function (e)
			{
				for (var i in t) if (t[i] !== e.get(i)) return !1;
				return !0
			})
		},
		findWhere: function (t)
		{
			return this.where(t, !0)
		},
		sort: function (t)
		{
			if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
			return t || (t =
			{
			}), i.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(i.bind(this.comparator, this)), t.silent || this.trigger("sort", this, t), this
		},
		pluck: function (t)
		{
			return i.invoke(this.models, "get", t)
		},
		fetch: function (t)
		{
			t = t ? i.clone(t) : {
			}, void 0 === t.parse && (t.parse = !0);
			var e = t.success,
				n = this;
			return t.success = function (i)
			{
				var o = t.reset ? "reset" : "set";
				n[o](i, t), e && e(n, i, t), n.trigger("sync", n, i, t)
			}, R(this, t), this.sync("read", this, t)
		},
		create: function (t, e)
		{
			if (e = e ? i.clone(e) : {
			}, !(t = this._prepareModel(t, e))) return !1;
			e.wait || this.add(t, e);
			var n = this,
				o = e.success;
			return e.success = function (t, i)
			{
				e.wait && n.add(t, e), o && o(t, i, e)
			}, t.save(null, e), t
		},
		parse: function (t)
		{
			return t
		},
		clone: function ()
		{
			return new this.constructor(this.models)
		},
		_reset: function ()
		{
			this.length = 0, this.models = [], this._byId =
			{
			}
		},
		_prepareModel: function (t, e)
		{
			if (t instanceof h) return t;
			e = e ? i.clone(e) : {
			}, e.collection = this;
			var n = new this.model(t, e);
			return n.validationError ? (this.trigger("invalid", this, n.validationError, e), !1) : n
		},
		_addReference: function (t)
		{
			this._byId[t.cid] = t, null != t.id && (this._byId[t.id] = t), t.collection || (t.collection = this), t.on("all", this._onModelEvent, this)
		},
		_removeReference: function (t)
		{
			this === t.collection && delete t.collection, t.off("all", this._onModelEvent, this)
		},
		_onModelEvent: function (t, e, i, n)
		{
			("add" !== t && "remove" !== t || i === this) && ("destroy" === t && this.remove(e, n), e && t === "change:" + e.idAttribute && (delete this._byId[e.previous(e.idAttribute)], null != e.id && (this._byId[e.id] = e)), this.trigger.apply(this, arguments))
		}
	});
	var v = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample"];
	i.each(v, function (t)
	{
		f.prototype[t] = function ()
		{
			var e = s.call(arguments);
			return e.unshift(this.models), i[t].apply(i, e)
		}
	});
	var y = ["groupBy", "countBy", "sortBy", "indexBy"];
	i.each(y, function (t)
	{
		f.prototype[t] = function (e, n)
		{
			var o = i.isFunction(e) ? e : function (t)
			{
				return t.get(e)
			};
			return i[t](this.models, o, n)
		}
	});
	var b = e.View = function (t)
	{
		this.cid = i.uniqueId("view"), t || (t =
		{
		}), i.extend(this, i.pick(t, x)), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
	},
		w = /^(\S+)\s*(.*)$/,
		x = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
	i.extend(b.prototype, a, {
		tagName: "div",
		$: function (t)
		{
			return this.$el.find(t)
		},
		initialize: function ()
		{
		},
		render: function ()
		{
			return this
		},
		remove: function ()
		{
			return this.$el.remove(), this.stopListening(), this
		},
		setElement: function (t, i)
		{
			return this.$el && this.undelegateEvents(), this.$el = t instanceof e.$ ? t : e.$(t), this.el = this.$el[0], i !== !1 && this.delegateEvents(), this
		},
		delegateEvents: function (t)
		{
			if (!t && !(t = i.result(this, "events"))) return this;
			this.undelegateEvents();
			for (var e in t)
			{
				var n = t[e];
				if (i.isFunction(n) || (n = this[t[e]]), n)
				{
					var o = e.match(w),
						r = o[1],
						s = o[2];
					n = i.bind(n, this), r += ".delegateEvents" + this.cid, "" === s ? this.$el.on(r, n) : this.$el.on(r, s, n)
				}
			}
			return this
		},
		undelegateEvents: function ()
		{
			return this.$el.off(".delegateEvents" + this.cid), this
		},
		_ensureElement: function ()
		{
			if (this.el) this.setElement(i.result(this, "el"), !1);
			else
			{
				var t = i.extend(
				{
				}, i.result(this, "attributes"));
				this.id && (t.id = i.result(this, "id")), this.className && (t["class"] = i.result(this, "className"));
				var n = e.$("<" + i.result(this, "tagName") + ">").attr(t);
				this.setElement(n, !1)
			}
		}
	}), e.sync = function (t, n, o)
	{
		var r = S[t];
		i.defaults(o || (o =
		{
		}), {
			emulateHTTP: e.emulateHTTP,
			emulateJSON: e.emulateJSON
		});
		var s =
		{
			type: r,
			dataType: "json"
		};
		if (o.url || (s.url = i.result(n, "url") || L()), null != o.data || !n || "create" !== t && "update" !== t && "patch" !== t || (s.contentType = "application/json", s.data = JSON.stringify(o.attrs || n.toJSON(o))), o.emulateJSON && (s.contentType = "application/x-www-form-urlencoded", s.data = s.data ? {
			model: s.data
		} : {
		}), o.emulateHTTP && ("PUT" === r || "DELETE" === r || "PATCH" === r))
		{
			s.type = "POST", o.emulateJSON && (s.data._method = r);
			var a = o.beforeSend;
			o.beforeSend = function (t)
			{
				return t.setRequestHeader("X-HTTP-Method-Override", r), a ? a.apply(this, arguments) : void 0
			}
		}
		"GET" === s.type || o.emulateJSON || (s.processData = !1), "PATCH" === s.type && k && (s.xhr = function ()
		{
			return new ActiveXObject("Microsoft.XMLHTTP")
		});
		var l = o.xhr = e.ajax(i.extend(s, o));
		return n.trigger("request", n, l, o), l
	};
	var k = !("undefined" == typeof window || !window.ActiveXObject || window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent),
		S =
		{
			create: "POST",
			update: "PUT",
			patch: "PATCH",
			"delete": "DELETE",
			read: "GET"
		};
	e.ajax = function ()
	{
		return e.$.ajax.apply(e.$, arguments)
	};
	var T = e.Router = function (t)
	{
		t || (t =
		{
		}), t.routes && (this.routes = t.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
	},
		C = /\((.*?)\)/g,
		$ = /(\(\?)?:\w+/g,
		_ = /\*\w+/g,
		E = /[\-{}\[\]+?.,\\\^$|#\s]/g;
	i.extend(T.prototype, a, {
		initialize: function ()
		{
		},
		route: function (t, n, o)
		{
			i.isRegExp(t) || (t = this._routeToRegExp(t)), i.isFunction(n) && (o = n, n = ""), o || (o = this[n]);
			var r = this;
			return e.history.route(t, function (i)
			{
				var s = r._extractParameters(t, i);
				r.execute(o, s), r.trigger.apply(r, ["route:" + n].concat(s)), r.trigger("route", n, s), e.history.trigger("route", r, n, s)
			}), this
		},
		execute: function (t, e)
		{
			t && t.apply(this, e)
		},
		navigate: function (t, i)
		{
			return e.history.navigate(t, i), this
		},
		_bindRoutes: function ()
		{
			if (this.routes)
			{
				this.routes = i.result(this, "routes");
				for (var t, e = i.keys(this.routes); null != (t = e.pop());) this.route(t, this.routes[t])
			}
		},
		_routeToRegExp: function (t)
		{
			return t = t.replace(E, "\\$&").replace(C, "(?:$1)?").replace($, function (t, e)
			{
				return e ? t : "([^/?]+)"
			}).replace(_, "([^?]*?)"), new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$")
		},
		_extractParameters: function (t, e)
		{
			var n = t.exec(e).slice(1);
			return i.map(n, function (t, e)
			{
				return e === n.length - 1 ? t || null : t ? decodeURIComponent(t) : null
			})
		}
	});
	var O = e.History = function ()
	{
		this.handlers = [], i.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
	},
		P = /^[#\/]|\s+$/g,
		A = /^\/+|\/+$/g,
		j = /msie [\w.]+/,
		z = /\/$/,
		I = /#.*$/;
	O.started = !1, i.extend(O.prototype, a, {
		interval: 50,
		atRoot: function ()
		{
			return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root
		},
		getHash: function (t)
		{
			var e = (t || this).location.href.match(/#(.*)$/);
			return e ? e[1] : ""
		},
		getFragment: function (t, e)
		{
			if (null == t) if (this._hasPushState || !this._wantsHashChange || e)
			{
				t = decodeURI(this.location.pathname + this.location.search);
				var i = this.root.replace(z, "");
				t.indexOf(i) || (t = t.slice(i.length))
			}
			else t = this.getHash();
			return t.replace(P, "")
		},
		start: function (t)
		{
			if (O.started) throw new Error("Backbone.history has already been started");
			O.started = !0, this.options = i.extend(
			{
				root: "/"
			}, this.options, t), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !! this.options.pushState, this._hasPushState = !! (this.options.pushState && this.history && this.history.pushState);
			var n = this.getFragment(),
				o = document.documentMode,
				r = j.exec(navigator.userAgent.toLowerCase()) && (!o || 7 >= o);
			if (this.root = ("/" + this.root + "/").replace(A, "/"), r && this._wantsHashChange)
			{
				var s = e.$('<iframe src="javascript:0" tabindex="-1">');
				this.iframe = s.hide().appendTo("body")[0].contentWindow, this.navigate(n)
			}
			this._hasPushState ? e.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !r ? e.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = n;
			var a = this.location;
			if (this._wantsHashChange && this._wantsPushState)
			{
				if (!this._hasPushState && !this.atRoot()) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + "#" + this.fragment), !0;
				this._hasPushState && this.atRoot() && a.hash && (this.fragment = this.getHash().replace(P, ""), this.history.replaceState(
				{
				}, document.title, this.root + this.fragment))
			}
			return this.options.silent ? void 0 : this.loadUrl()
		},
		stop: function ()
		{
			e.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), this._checkUrlInterval && clearInterval(this._checkUrlInterval), O.started = !1
		},
		route: function (t, e)
		{
			this.handlers.unshift(
			{
				route: t,
				callback: e
			})
		},
		checkUrl: function ()
		{
			var t = this.getFragment();
			return t === this.fragment && this.iframe && (t = this.getFragment(this.getHash(this.iframe))), t === this.fragment ? !1 : (this.iframe && this.navigate(t), void this.loadUrl())
		},
		loadUrl: function (t)
		{
			return t = this.fragment = this.getFragment(t), i.any(this.handlers, function (e)
			{
				return e.route.test(t) ? (e.callback(t), !0) : void 0
			})
		},
		navigate: function (t, e)
		{
			if (!O.started) return !1;
			e && e !== !0 || (e =
			{
				trigger: !! e
			});
			var i = this.root + (t = this.getFragment(t || ""));
			if (t = t.replace(I, ""), this.fragment !== t)
			{
				if (this.fragment = t, "" === t && "/" !== i && (i = i.slice(0, -1)), this._hasPushState) this.history[e.replace ? "replaceState" : "pushState"](
				{
				}, document.title, i);
				else
				{
					if (!this._wantsHashChange) return this.location.assign(i);
					this._updateHash(this.location, t, e.replace), this.iframe && t !== this.getFragment(this.getHash(this.iframe)) && (e.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, t, e.replace))
				}
				return e.trigger ? this.loadUrl(t) : void 0
			}
		},
		_updateHash: function (t, e, i)
		{
			if (i)
			{
				var n = t.href.replace(/(javascript:|#).*$/, "");
				t.replace(n + "#" + e)
			}
			else t.hash = "#" + e
		}
	}), e.history = new O;
	var M = function (t, e)
	{
		var n, o = this;
		n = t && i.has(t, "constructor") ? t.constructor : function ()
		{
			return o.apply(this, arguments)
		}, i.extend(n, o, e);
		var r = function ()
		{
			this.constructor = n
		};
		return r.prototype = o.prototype, n.prototype = new r, t && i.extend(n.prototype, t), n.__super__ = o.prototype, n
	};
	h.extend = f.extend = T.extend = b.extend = O.extend = M;
	var L = function ()
	{
		throw new Error('A "url" property or function must be specified')
	},
		R = function (t, e)
		{
			var i = e.error;
			e.error = function (n)
			{
				i && i(t, n, e), t.trigger("error", t, n, e)
			}
		};
	return e
}), function (t, e, i, n)
{
	var o = i(t),
		r = i(e),
		s = i.fancybox = function ()
		{
			s.open.apply(this, arguments)
		},
		a = navigator.userAgent.match(/msie/),
		l = null,
		c = e.createTouch !== n,
		u = function (t)
		{
			return t && t.hasOwnProperty && t instanceof i
		},
		d = function (t)
		{
			return t && "string" === i.type(t)
		},
		h = function (t)
		{
			return d(t) && 0 < t.indexOf("%")
		},
		p = function (t, e)
		{
			var i = parseInt(t, 10) || 0;
			return e && h(t) && (i *= s.getViewport()[e] / 100), Math.ceil(i)
		},
		f = function (t, e)
		{
			return p(t, e) + "px"
		};
	i.extend(s, {
		version: "2.1.4",
		defaults: {
			padding: 15,
			margin: 20,
			width: 800,
			height: 600,
			minWidth: 100,
			minHeight: 100,
			maxWidth: 9999,
			maxHeight: 9999,
			autoSize: !0,
			autoHeight: !1,
			autoWidth: !1,
			autoResize: !0,
			autoCenter: !c,
			fitToView: !0,
			aspectRatio: !1,
			topRatio: .5,
			leftRatio: .5,
			scrolling: "auto",
			wrapCSS: "",
			arrows: !0,
			closeBtn: !0,
			closeClick: !1,
			nextClick: !1,
			mouseWheel: !0,
			autoPlay: !1,
			playSpeed: 3e3,
			preload: 3,
			modal: !1,
			loop: !0,
			ajax: {
				dataType: "html",
				headers: {
					"X-fancyBox": !0
				}
			},
			iframe: {
				scrolling: "auto",
				preload: !0
			},
			swf: {
				wmode: "transparent",
				allowfullscreen: "true",
				allowscriptaccess: "always"
			},
			keys: {
				next: {
					13: "left",
					34: "up",
					39: "left",
					40: "up"
				},
				prev: {
					8: "right",
					33: "down",
					37: "right",
					38: "down"
				},
				close: [27],
				play: [32],
				toggle: [70]
			},
			direction: {
				next: "left",
				prev: "right"
			},
			scrollOutside: !0,
			index: 0,
			type: null,
			href: null,
			content: null,
			title: null,
			tpl: {
				wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				image: '<img class="fancybox-image" src="{href}" alt="" />',
				iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (a ? ' allowtransparency="true"' : "") + "></iframe>",
				error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
				closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
				next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
				prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
			},
			openEffect: "fade",
			openSpeed: 250,
			openEasing: "swing",
			openOpacity: !0,
			openMethod: "zoomIn",
			closeEffect: "fade",
			closeSpeed: 250,
			closeEasing: "swing",
			closeOpacity: !0,
			closeMethod: "zoomOut",
			nextEffect: "elastic",
			nextSpeed: 250,
			nextEasing: "swing",
			nextMethod: "changeIn",
			prevEffect: "elastic",
			prevSpeed: 250,
			prevEasing: "swing",
			prevMethod: "changeOut",
			helpers: {
				overlay: !0,
				title: !0
			},
			onCancel: i.noop,
			beforeLoad: i.noop,
			afterLoad: i.noop,
			beforeShow: i.noop,
			afterShow: i.noop,
			beforeChange: i.noop,
			beforeClose: i.noop,
			afterClose: i.noop
		},
		group: {
		},
		opts: {
		},
		previous: null,
		coming: null,
		current: null,
		isActive: !1,
		isOpen: !1,
		isOpened: !1,
		wrap: null,
		skin: null,
		outer: null,
		inner: null,
		player: {
			timer: null,
			isActive: !1
		},
		ajaxLoad: null,
		imgPreload: null,
		transitions: {
		},
		helpers: {
		},
		open: function (t, e)
		{
			return t && (i.isPlainObject(e) || (e =
			{
			}), !1 !== s.close(!0)) ? (i.isArray(t) || (t = u(t) ? i(t).get() : [t]), i.each(t, function (o, r)
			{
				var a, l, c, h, p, f =
				{
				};
				"object" === i.type(r) && (r.nodeType && (r = i(r)), u(r) ? (f =
				{
					href: r.data("fancybox-href") || r.attr("href"),
					title: r.data("fancybox-title") || r.attr("title"),
					isDom: !0,
					element: r
				}, i.metadata && i.extend(!0, f, r.metadata())) : f = r), a = e.href || f.href || (d(r) ? r : null), l = e.title !== n ? e.title : f.title || "", h = (c = e.content || f.content) ? "html" : e.type || f.type, !h && f.isDom && (h = r.data("fancybox-type"), h || (h = (h = r.prop("class").match(/fancybox\.(\w+)/)) ? h[1] : null)), d(a) && (h || (s.isImage(a) ? h = "image" : s.isSWF(a) ? h = "swf" : "#" === a.charAt(0) ? h = "inline" : d(r) && (h = "html", c = r)), "ajax" === h && (p = a.split(/\s+/, 2), a = p.shift(), p = p.shift())), c || ("inline" === h ? a ? c = i(d(a) ? a.replace(/.*(?=#[^\s]+$)/, "") : a) : f.isDom && (c = r) : "html" === h ? c = a : !h && !a && f.isDom && (h = "inline", c = r)), i.extend(f, {
					href: a,
					type: h,
					content: c,
					title: l,
					selector: p
				}), t[o] = f
			}), s.opts = i.extend(!0, {
			}, s.defaults, e), e.keys !== n && (s.opts.keys = e.keys ? i.extend(
			{
			}, s.defaults.keys, e.keys) : !1), s.group = t, s._start(s.opts.index)) : void 0
		},
		cancel: function ()
		{
			var t = s.coming;
			t && !1 !== s.trigger("onCancel") && (s.hideLoading(), s.ajaxLoad && s.ajaxLoad.abort(), s.ajaxLoad = null, s.imgPreload && (s.imgPreload.onload = s.imgPreload.onerror = null), t.wrap && t.wrap.stop(!0, !0).trigger("onReset").remove(), s.coming = null, s.current || s._afterZoomOut(t))
		},
		close: function (t)
		{
			s.cancel(), !1 !== s.trigger("beforeClose") && (s.unbindEvents(), s.isActive && (s.isOpen && !0 !== t ? (s.isOpen = s.isOpened = !1, s.isClosing = !0, i(".fancybox-item, .fancybox-nav").remove(), s.wrap.stop(!0, !0).removeClass("fancybox-opened"), s.transitions[s.current.closeMethod]()) : (i(".fancybox-wrap").stop(!0).trigger("onReset").remove(), s._afterZoomOut())))
		},
		play: function (t)
		{
			var e = function ()
			{
				clearTimeout(s.player.timer)
			},
				n = function ()
				{
					e(), s.current && s.player.isActive && (s.player.timer = setTimeout(s.next, s.current.playSpeed))
				},
				o = function ()
				{
					e(), i("body").unbind(".player"), s.player.isActive = !1, s.trigger("onPlayEnd")
				};
			!0 === t || !s.player.isActive && !1 !== t ? s.current && (s.current.loop || s.current.index < s.group.length - 1) && (s.player.isActive = !0, i("body").bind(
			{
				"afterShow.player onUpdate.player": n,
				"onCancel.player beforeClose.player": o,
				"beforeLoad.player": e
			}), n(), s.trigger("onPlayStart")) : o()
		},
		next: function (t)
		{
			var e = s.current;
			e && (d(t) || (t = e.direction.next), s.jumpto(e.index + 1, t, "next"))
		},
		prev: function (t)
		{
			var e = s.current;
			e && (d(t) || (t = e.direction.prev), s.jumpto(e.index - 1, t, "prev"))
		},
		jumpto: function (t, e, i)
		{
			var o = s.current;
			o && (t = p(t), s.direction = e || o.direction[t >= o.index ? "next" : "prev"], s.router = i || "jumpto", o.loop && (0 > t && (t = o.group.length + t % o.group.length), t %= o.group.length), o.group[t] !== n && (s.cancel(), s._start(t)))
		},
		reposition: function (t, e)
		{
			var n, o = s.current,
				r = o ? o.wrap : null;
			r && (n = s._getPosition(e), t && "scroll" === t.type ? (delete n.position, r.stop(!0, !0).animate(n, 200)) : (r.css(n), o.pos = i.extend(
			{
			}, o.dim, n)))
		},
		update: function (t)
		{
			var e = t && t.type,
				i = !e || "orientationchange" === e;
			i && (clearTimeout(l), l = null), s.isOpen && !l && (l = setTimeout(function ()
			{
				var n = s.current;
				n && !s.isClosing && (s.wrap.removeClass("fancybox-tmp"), (i || "load" === e || "resize" === e && n.autoResize) && s._setDimension(), "scroll" === e && n.canShrink || s.reposition(t), s.trigger("onUpdate"), l = null)
			}, i && !c ? 0 : 300))
		},
		toggle: function (t)
		{
			s.isOpen && (s.current.fitToView = "boolean" === i.type(t) ? t : !s.current.fitToView, c && (s.wrap.removeAttr("style").addClass("fancybox-tmp"), s.trigger("onUpdate")), s.update())
		},
		hideLoading: function ()
		{
			r.unbind(".loading"), i("#fancybox-loading").remove()
		},
		showLoading: function ()
		{
			var t, e;
			s.hideLoading(), t = i('<div id="fancybox-loading"><div></div></div>').click(s.cancel).appendTo("body"), r.bind("keydown.loading", function (t)
			{
				27 === (t.which || t.keyCode) && (t.preventDefault(), s.cancel())
			}), s.defaults.fixed || (e = s.getViewport(), t.css(
			{
				position: "absolute",
				top: .5 * e.h + e.y,
				left: .5 * e.w + e.x
			}))
		},
		getViewport: function ()
		{
			var e = s.current && s.current.locked || !1,
				i =
				{
					x: o.scrollLeft(),
					y: o.scrollTop()
				};
			return e ? (i.w = e[0].clientWidth, i.h = e[0].clientHeight) : (i.w = c && t.innerWidth ? t.innerWidth : o.width(), i.h = c && t.innerHeight ? t.innerHeight : o.height()), i
		},
		unbindEvents: function ()
		{
			s.wrap && u(s.wrap) && s.wrap.unbind(".fb"), r.unbind(".fb"), o.unbind(".fb")
		},
		bindEvents: function ()
		{
			var t, e = s.current;
			e && (o.bind("orientationchange.fb" + (c ? "" : " resize.fb") + (e.autoCenter && !e.locked ? " scroll.fb" : ""), s.update), (t = e.keys) && r.bind("keydown.fb", function (o)
			{
				var r = o.which || o.keyCode,
					a = o.target || o.srcElement;
				return 27 === r && s.coming ? !1 : void!(o.ctrlKey || o.altKey || o.shiftKey || o.metaKey || a && (a.type || i(a).is("[contenteditable]")) || !i.each(t, function (t, a)
				{
					return 1 < e.group.length && a[r] !== n ? (s[t](a[r]), o.preventDefault(), !1) : -1 < i.inArray(r, a) ? (s[t](), o.preventDefault(), !1) : void 0
				}))
			}), i.fn.mousewheel && e.mouseWheel && s.wrap.bind("mousewheel.fb", function (t, n, o, r)
			{
				for (var a = i(t.target || null), l = !1; a.length && !l && !a.is(".fancybox-skin") && !a.is(".fancybox-wrap");) l = a[0] && !(a[0].style.overflow && "hidden" === a[0].style.overflow) && (a[0].clientWidth && a[0].scrollWidth > a[0].clientWidth || a[0].clientHeight && a[0].scrollHeight > a[0].clientHeight), a = i(a).parent();
				0 !== n && !l && 1 < s.group.length && !e.canShrink && (r > 0 || o > 0 ? s.prev(r > 0 ? "down" : "left") : (0 > r || 0 > o) && s.next(0 > r ? "up" : "right"), t.preventDefault())
			}))
		},
		trigger: function (t, e)
		{
			var n, o = e || s.coming || s.current;
			if (o)
			{
				if (i.isFunction(o[t]) && (n = o[t].apply(o, Array.prototype.slice.call(arguments, 1))), !1 === n) return !1;
				o.helpers && i.each(o.helpers, function (e, n)
				{
					n && s.helpers[e] && i.isFunction(s.helpers[e][t]) && (n = i.extend(!0, {
					}, s.helpers[e].defaults, n), s.helpers[e][t](n, o))
				}), i.event.trigger(t + ".fb")
			}
		},
		isImage: function (t)
		{
			return d(t) && t.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$)/i)
		},
		isSWF: function (t)
		{
			return d(t) && t.match(/\.(swf)((\?|#).*)?$/i)
		},
		_start: function (t)
		{
			var e, n, o =
			{
			};
			if (t = p(t), e = s.group[t] || null, !e) return !1;
			if (o = i.extend(!0, {
			}, s.opts, e), e = o.margin, n = o.padding, "number" === i.type(e) && (o.margin = [e, e, e, e]), "number" === i.type(n) && (o.padding = [n, n, n, n]), o.modal && i.extend(!0, o, {
				closeBtn: !1,
				closeClick: !1,
				nextClick: !1,
				arrows: !1,
				mouseWheel: !1,
				keys: null,
				helpers: {
					overlay: {
						closeClick: !1
					}
				}
			}), o.autoSize && (o.autoWidth = o.autoHeight = !0), "auto" === o.width && (o.autoWidth = !0), "auto" === o.height && (o.autoHeight = !0), o.group = s.group, o.index = t, s.coming = o, !1 === s.trigger("beforeLoad")) s.coming = null;
			else
			{
				if (n = o.type, e = o.href, !n) return s.coming = null, s.current && s.router && "jumpto" !== s.router ? (s.current.index = t, s[s.router](s.direction)) : !1;
				if (s.isActive = !0, ("image" === n || "swf" === n) && (o.autoHeight = o.autoWidth = !1, o.scrolling = "visible"), "image" === n && (o.aspectRatio = !0), "iframe" === n && c && (o.scrolling = "scroll"), o.wrap = i(o.tpl.wrap).addClass("fancybox-" + (c ? "mobile" : "desktop") + " fancybox-type-" + n + " fancybox-tmp " + o.wrapCSS).appendTo(o.parent || "body"), i.extend(o, {
					skin: i(".fancybox-skin", o.wrap),
					outer: i(".fancybox-outer", o.wrap),
					inner: i(".fancybox-inner", o.wrap)
				}), i.each(["Top", "Right", "Bottom", "Left"], function (t, e)
				{
					o.skin.css("padding" + e, f(o.padding[t]))
				}), s.trigger("onReady"), "inline" === n || "html" === n)
				{
					if (!o.content || !o.content.length) return s._error("content")
				}
				else if (!e) return s._error("href");
				"image" === n ? s._loadImage() : "ajax" === n ? s._loadAjax() : "iframe" === n ? s._loadIframe() : s._afterLoad()
			}
		},
		_error: function (t)
		{
			i.extend(s.coming, {
				type: "html",
				autoWidth: !0,
				autoHeight: !0,
				minWidth: 0,
				minHeight: 0,
				scrolling: "no",
				hasError: t,
				content: s.coming.tpl.error
			}), s._afterLoad()
		},
		_loadImage: function ()
		{
			var t = s.imgPreload = new Image;
			t.onload = function ()
			{
				this.onload = this.onerror = null, s.coming.width = this.width, s.coming.height = this.height, s._afterLoad()
			}, t.onerror = function ()
			{
				this.onload = this.onerror = null, s._error("image")
			}, t.src = s.coming.href, !0 !== t.complete && s.showLoading()
		},
		_loadAjax: function ()
		{
			var t = s.coming;
			s.showLoading(), s.ajaxLoad = i.ajax(i.extend(
			{
			}, t.ajax, {
				url: t.href,
				error: function (t, e)
				{
					s.coming && "abort" !== e ? s._error("ajax", t) : s.hideLoading()
				},
				success: function (e, i)
				{
					"success" === i && (t.content = e, s._afterLoad())
				}
			}))
		},
		_loadIframe: function ()
		{
			var t = s.coming,
				e = i(t.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", c ? "auto" : t.iframe.scrolling).attr("src", t.href);
			i(t.wrap).bind("onReset", function ()
			{
				try
				{
					i(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
				}
				catch (t)
				{
				}
			}), t.iframe.preload && (s.showLoading(), e.one("load", function ()
			{
				i(this).data("ready", 1), c || i(this).bind("load.fb", s.update), i(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), s._afterLoad()
			})), t.content = e.appendTo(t.inner), t.iframe.preload || s._afterLoad()
		},
		_preloadImages: function ()
		{
			var t, e, i = s.group,
				n = s.current,
				o = i.length,
				r = n.preload ? Math.min(n.preload, o - 1) : 0;
			for (e = 1; r >= e; e += 1) t = i[(n.index + e) % o], "image" === t.type && t.href && ((new Image).src = t.href)
		},
		_afterLoad: function ()
		{
			var t, e, n, o, r, a = s.coming,
				l = s.current;
			if (s.hideLoading(), a && !1 !== s.isActive) if (!1 === s.trigger("afterLoad", a, l)) a.wrap.stop(!0).trigger("onReset").remove(), s.coming = null;
			else
			{
				switch (l && (s.trigger("beforeChange", l), l.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), s.unbindEvents(), t = a.content, e = a.type, n = a.scrolling, i.extend(s, {
					wrap: a.wrap,
					skin: a.skin,
					outer: a.outer,
					inner: a.inner,
					current: a,
					previous: l
				}), o = a.href, e)
				{
				case "inline":
				case "ajax":
				case "html":
					a.selector ? t = i("<div>").html(t).find(a.selector) : u(t) && (t.data("fancybox-placeholder") || t.data("fancybox-placeholder", i('<div class="fancybox-placeholder"></div>').insertAfter(t).hide()), t = t.show().detach(), a.wrap.bind("onReset", function ()
					{
						i(this).find(t).length && t.hide().replaceAll(t.data("fancybox-placeholder")).data("fancybox-placeholder", !1)
					}));
					break;
				case "image":
					t = a.tpl.image.replace("{href}", o);
					break;
				case "swf":
					t = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + o + '"></param>', r = "", i.each(a.swf, function (e, i)
					{
						t += '<param name="' + e + '" value="' + i + '"></param>', r += " " + e + '="' + i + '"'
					}), t += '<embed src="' + o + '" type="application/x-shockwave-flash" width="100%" height="100%"' + r + "></embed></object>"
				}(!u(t) || !t.parent().is(a.inner)) && a.inner.append(t), s.trigger("beforeShow"), a.inner.css("overflow", "yes" === n ? "scroll" : "no" === n ? "hidden" : n), s._setDimension(), s.reposition(), s.isOpen = !1, s.coming = null, s.bindEvents(), s.isOpened ? l.prevMethod && s.transitions[l.prevMethod]() : i(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove(), s.transitions[s.isOpened ? a.nextMethod : a.openMethod](), s._preloadImages()
			}
		},
		_setDimension: function ()
		{
			var t, e, n, o, r, a, l, c, u, d = s.getViewport(),
				g = 0,
				m = !1,
				v = !1,
				m = s.wrap,
				y = s.skin,
				b = s.inner,
				w = s.current,
				v = w.width,
				x = w.height,
				k = w.minWidth,
				S = w.minHeight,
				T = w.maxWidth,
				C = w.maxHeight,
				$ = w.scrolling,
				_ = w.scrollOutside ? w.scrollbarWidth : 0,
				E = w.margin,
				O = p(E[1] + E[3]),
				P = p(E[0] + E[2]);
			if (m.add(y).add(b).width("auto").height("auto").removeClass("fancybox-tmp"), E = p(y.outerWidth(!0) - y.width()), t = p(y.outerHeight(!0) - y.height()), e = O + E, n = P + t, o = h(v) ? (d.w - e) * p(v) / 100 : v, r = h(x) ? (d.h - n) * p(x) / 100 : x, "iframe" === w.type)
			{
				if (u = w.content, w.autoHeight && 1 === u.data("ready")) try
				{
					u[0].contentWindow.document.location && (b.width(o).height(9999), a = u.contents().find("body"), _ && a.css("overflow-x", "hidden"), r = a.height())
				}
				catch (A)
				{
				}
			}
			else(w.autoWidth || w.autoHeight) && (b.addClass("fancybox-tmp"), w.autoWidth || b.width(o), w.autoHeight || b.height(r), w.autoWidth && (o = b.width()), w.autoHeight && (r = b.height()), b.removeClass("fancybox-tmp"));
			if (v = p(o), x = p(r), c = o / r, k = p(h(k) ? p(k, "w") - e : k), T = p(h(T) ? p(T, "w") - e : T), S = p(h(S) ? p(S, "h") - n : S), C = p(h(C) ? p(C, "h") - n : C), a = T, l = C, w.fitToView && (T = Math.min(d.w - e, T), C = Math.min(d.h - n, C)), e = d.w - O, P = d.h - P, w.aspectRatio ? (v > T && (v = T, x = p(v / c)), x > C && (x = C, v = p(x * c)), k > v && (v = k, x = p(v / c)), S > x && (x = S, v = p(x * c))) : (v = Math.max(k, Math.min(v, T)), w.autoHeight && "iframe" !== w.type && (b.width(v), x = b.height()), x = Math.max(S, Math.min(x, C))), w.fitToView) if (b.width(v).height(x), m.width(v + E), d = m.width(), O = m.height(), w.aspectRatio) for (;
			(d > e || O > P) && v > k && x > S && !(19 < g++);) x = Math.max(S, Math.min(C, x - 10)), v = p(x * c), k > v && (v = k, x = p(v / c)), v > T && (v = T, x = p(v / c)), b.width(v).height(x), m.width(v + E), d = m.width(), O = m.height();
			else v = Math.max(k, Math.min(v, v - (d - e))), x = Math.max(S, Math.min(x, x - (O - P)));
			_ && "auto" === $ && r > x && e > v + E + _ && (v += _), b.width(v).height(x), m.width(v + E), d = m.width(), O = m.height(), m = (d > e || O > P) && v > k && x > S, v = w.aspectRatio ? a > v && l > x && o > v && r > x : (a > v || l > x) && (o > v || r > x), i.extend(w, {
				dim: {
					width: f(d),
					height: f(O)
				},
				origWidth: o,
				origHeight: r,
				canShrink: m,
				canExpand: v,
				wPadding: E,
				hPadding: t,
				wrapSpace: O - y.outerHeight(!0),
				skinSpace: y.height() - x
			}), !u && w.autoHeight && x > S && C > x && !v && b.height("auto")
		},
		_getPosition: function (t)
		{
			var e = s.current,
				i = s.getViewport(),
				n = e.margin,
				o = s.wrap.width() + n[1] + n[3],
				r = s.wrap.height() + n[0] + n[2],
				n =
				{
					position: "absolute",
					top: n[0],
					left: n[3]
				};
			return e.autoCenter && e.fixed && !t && r <= i.h && o <= i.w ? n.position = "fixed" : e.locked || (n.top += i.y, n.left += i.x), n.top = f(Math.max(n.top, n.top + (i.h - r) * e.topRatio)), n.left = f(Math.max(n.left, n.left + (i.w - o) * e.leftRatio)), n
		},
		_afterZoomIn: function ()
		{
			var t = s.current;
			t && (s.isOpen = s.isOpened = !0, s.wrap.css("overflow", "visible").addClass("fancybox-opened"), s.update(), (t.closeClick || t.nextClick && 1 < s.group.length) && s.inner.css("cursor", "pointer").bind("click.fb", function (e)
			{
				!i(e.target).is("a") && !i(e.target).parent().is("a") && (e.preventDefault(), s[t.closeClick ? "close" : "next"]())
			}), t.closeBtn && i(t.tpl.closeBtn).appendTo(s.skin).bind("click.fb", function (t)
			{
				t.preventDefault(), s.close()
			}), t.arrows && 1 < s.group.length && ((t.loop || 0 < t.index) && i(t.tpl.prev).appendTo(s.outer).bind("click.fb", s.prev), (t.loop || t.index < s.group.length - 1) && i(t.tpl.next).appendTo(s.outer).bind("click.fb", s.next)), s.trigger("afterShow"), t.loop || t.index !== t.group.length - 1 ? s.opts.autoPlay && !s.player.isActive && (s.opts.autoPlay = !1, s.play()) : s.play(!1))
		},
		_afterZoomOut: function (t)
		{
			t = t || s.current, i(".fancybox-wrap").trigger("onReset").remove(), i.extend(s, {
				group: {
				},
				opts: {
				},
				router: !1,
				current: null,
				isActive: !1,
				isOpened: !1,
				isOpen: !1,
				isClosing: !1,
				wrap: null,
				skin: null,
				outer: null,
				inner: null
			}), s.trigger("afterClose", t)
		}
	}), s.transitions =
	{
		getOrigPosition: function ()
		{
			var t = s.current,
				e = t.element,
				i = t.orig,
				n =
				{
				},
				o = 50,
				r = 50,
				a = t.hPadding,
				l = t.wPadding,
				c = s.getViewport();
			return !i && t.isDom && e.is(":visible") && (i = e.find("img:first"), i.length || (i = e)), u(i) ? (n = i.offset(), i.is("img") && (o = i.outerWidth(), r = i.outerHeight())) : (n.top = c.y + (c.h - r) * t.topRatio, n.left = c.x + (c.w - o) * t.leftRatio), ("fixed" === s.wrap.css("position") || t.locked) && (n.top -= c.y, n.left -= c.x), n =
			{
				top: f(n.top - a * t.topRatio),
				left: f(n.left - l * t.leftRatio),
				width: f(o + l),
				height: f(r + a)
			}
		},
		step: function (t, e)
		{
			var i, n, o = e.prop;
			n = s.current;
			var r = n.wrapSpace,
				a = n.skinSpace;
			("width" === o || "height" === o) && (i = e.end === e.start ? 1 : (t - e.start) / (e.end - e.start), s.isClosing && (i = 1 - i), n = "width" === o ? n.wPadding : n.hPadding, n = t - n, s.skin[o](p("width" === o ? n : n - r * i)), s.inner[o](p("width" === o ? n : n - r * i - a * i)))
		},
		zoomIn: function ()
		{
			var t = s.current,
				e = t.pos,
				n = t.openEffect,
				o = "elastic" === n,
				r = i.extend(
				{
					opacity: 1
				}, e);
			delete r.position, o ? (e = this.getOrigPosition(), t.openOpacity && (e.opacity = .1)) : "fade" === n && (e.opacity = .1), s.wrap.css(e).animate(r, {
				duration: "none" === n ? 0 : t.openSpeed,
				easing: t.openEasing,
				step: o ? this.step : null,
				complete: s._afterZoomIn
			})
		},
		zoomOut: function ()
		{
			var t = s.current,
				e = t.closeEffect,
				i = "elastic" === e,
				n =
				{
					opacity: .1
				};
			i && (n = this.getOrigPosition(), t.closeOpacity && (n.opacity = .1)), s.wrap.animate(n, {
				duration: "none" === e ? 0 : t.closeSpeed,
				easing: t.closeEasing,
				step: i ? this.step : null,
				complete: s._afterZoomOut
			})
		},
		changeIn: function ()
		{
			var t, e = s.current,
				i = e.nextEffect,
				n = e.pos,
				o =
				{
					opacity: 1
				},
				r = s.direction;
			n.opacity = .1, "elastic" === i && (t = "down" === r || "up" === r ? "top" : "left", "down" === r || "right" === r ? (n[t] = f(p(n[t]) - 200), o[t] = "+=200px") : (n[t] = f(p(n[t]) + 200), o[t] = "-=200px")), "none" === i ? s._afterZoomIn() : s.wrap.css(n).animate(o, {
				duration: e.nextSpeed,
				easing: e.nextEasing,
				complete: s._afterZoomIn
			})
		},
		changeOut: function ()
		{
			var t = s.previous,
				e = t.prevEffect,
				n =
				{
					opacity: .1
				},
				o = s.direction;
			"elastic" === e && (n["down" === o || "up" === o ? "top" : "left"] = ("up" === o || "left" === o ? "-" : "+") + "=200px"), t.wrap.animate(n, {
				duration: "none" === e ? 0 : t.prevSpeed,
				easing: t.prevEasing,
				complete: function ()
				{
					i(this).trigger("onReset").remove()
				}
			})
		}
	}, s.helpers.overlay =
	{
		defaults: {
			closeClick: !0,
			speedOut: 200,
			showEarly: !0,
			css: {
			},
			locked: !c,
			fixed: !0
		},
		overlay: null,
		fixed: !1,
		create: function (t)
		{
			t = i.extend(
			{
			}, this.defaults, t), this.overlay && this.close(), this.overlay = i('<div class="fancybox-overlay"></div>').appendTo("body"), this.fixed = !1, t.fixed && s.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
		},
		open: function (t)
		{
			var e = this;
			t = i.extend(
			{
			}, this.defaults, t), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(t), this.fixed || (o.bind("resize.overlay", i.proxy(this.update, this)), this.update()), t.closeClick && this.overlay.bind("click.overlay", function (t)
			{
				i(t.target).hasClass("fancybox-overlay") && (s.isActive ? s.close() : e.close())
			}), this.overlay.css(t.css).show()
		},
		close: function ()
		{
			i(".fancybox-overlay").remove(), o.unbind("resize.overlay"), this.overlay = null, !1 !== this.margin && (i("body").css("margin-right", this.margin), this.margin = !1), this.el && this.el.removeClass("fancybox-lock")
		},
		update: function ()
		{
			var t, i = "100%";
			this.overlay.width(i).height("100%"), a ? (t = Math.max(e.documentElement.offsetWidth, e.body.offsetWidth), r.width() > t && (i = r.width())) : r.width() > o.width() && (i = r.width()), this.overlay.width(i).height(r.height())
		},
		onReady: function (t, n)
		{
			i(".fancybox-overlay").stop(!0, !0), this.overlay || (this.margin = r.height() > o.height() || "scroll" === i("body").css("overflow-y") ? i("body").css("margin-right") : !1, this.el = i(e.all && !e.querySelector ? "html" : "body"), this.create(t)), t.locked && this.fixed && (n.locked = this.overlay.append(n.wrap), n.fixed = !1), !0 === t.showEarly && this.beforeShow.apply(this, arguments)
		},
		beforeShow: function (t, e)
		{
			e.locked && (this.el.addClass("fancybox-lock"), !1 !== this.margin && i("body").css("margin-right", p(this.margin) + e.scrollbarWidth)), this.open(t)
		},
		onUpdate: function ()
		{
			this.fixed || this.update()
		},
		afterClose: function (t)
		{
			this.overlay && !s.isActive && this.overlay.fadeOut(t.speedOut, i.proxy(this.close, this))
		}
	}, s.helpers.title =
	{
		defaults: {
			type: "float",
			position: "bottom"
		},
		beforeShow: function (t)
		{
			var e = s.current,
				n = e.title,
				o = t.type;
			if (i.isFunction(n) && (n = n.call(e.element, e)), d(n) && "" !== i.trim(n))
			{
				switch (e = i('<div class="fancybox-title fancybox-title-' + o + '-wrap">' + n + "</div>"), o)
				{
				case "inside":
					o = s.skin;
					break;
				case "outside":
					o = s.wrap;
					break;
				case "over":
					o = s.inner;
					break;
				default:
					o = s.skin, e.appendTo("body"), a && e.width(e.width()), e.wrapInner('<span class="child"></span>'), s.current.margin[2] += Math.abs(p(e.css("margin-bottom")))
				}
				e["top" === t.position ? "prependTo" : "appendTo"](o)
			}
		}
	}, i.fn.fancybox = function (t)
	{
		var e, n = i(this),
			o = this.selector || "",
			a = function (r)
			{
				var a, l, c = i(this).blur(),
					u = e;
				!(r.ctrlKey || r.altKey || r.shiftKey || r.metaKey || c.is(".fancybox-wrap") || (a = t.groupAttr || "data-fancybox-group", l = c.attr(a), l || (a = "rel", l = c.get(0)[a]), l && "" !== l && "nofollow" !== l && (c = o.length ? i(o) : n, c = c.filter("[" + a + '="' + l + '"]'), u = c.index(this)), t.index = u, !1 === s.open(c, t) || !r.preventDefault()))
			};
		return t = t || {
		}, e = t.index || 0, o && !1 !== t.live ? r.undelegate(o, "click.fb-start").delegate(o + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", a) : n.unbind("click.fb-start").bind("click.fb-start", a), this.filter("[data-fancybox-start=1]").trigger("click"), this
	}, r.ready(function ()
	{
		if (i.scrollbarWidth === n && (i.scrollbarWidth = function ()
		{
			var t = i('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
				e = t.children(),
				e = e.innerWidth() - e.height(99).innerWidth();
			return t.remove(), e
		}), i.support.fixedPosition === n)
		{
			var t = i.support,
				e = i('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
				o = 20 === e[0].offsetTop || 15 === e[0].offsetTop;
			e.remove(), t.fixedPosition = o
		}
		i.extend(s.defaults, {
			scrollbarWidth: i.scrollbarWidth(),
			fixed: i.support.fixedPosition,
			parent: i("body")
		})
	})
}(window, document, jQuery), function (t)
{
	"use strict";
	"function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function (t)
{
	"use strict";
	var e = window.Slick || {
	};
	e = function ()
	{
		function e(e, n)
		{
			var o, r, s = this;
			if (s.defaults =
			{
				accessibility: !0,
				adaptiveHeight: !1,
				appendArrows: t(e),
				appendDots: t(e),
				arrows: !0,
				asNavFor: null,
				prevArrow: '<button type="button" data-role="none" class="slick-prev">Previous</button>',
				nextArrow: '<button type="button" data-role="none" class="slick-next">Next</button>',
				autoplay: !1,
				autoplaySpeed: 3e3,
				centerMode: !1,
				centerPadding: "50px",
				cssEase: "ease",
				customPaging: function (t, e)
				{
					return '<button type="button" data-role="none">' + (e + 1) + "</button>"
				},
				dots: !1,
				dotsClass: "slick-dots",
				draggable: !0,
				easing: "linear",
				fade: !1,
				focusOnSelect: !1,
				infinite: !0,
				initialSlide: 0,
				lazyLoad: "ondemand",
				onBeforeChange: null,
				onAfterChange: null,
				onInit: null,
				onReInit: null,
				onSetPosition: null,
				pauseOnHover: !0,
				pauseOnDotsHover: !1,
				respondTo: "window",
				responsive: null,
				rtl: !1,
				slide: "div",
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				swipe: !0,
				swipeToSlide: !1,
				touchMove: !0,
				touchThreshold: 5,
				useCSS: !0,
				variableWidth: !1,
				vertical: !1,
				waitForAnimate: !0
			}, s.initials =
			{
				animating: !1,
				dragging: !1,
				autoPlayTimer: null,
				currentDirection: 0,
				currentLeft: null,
				currentSlide: 0,
				direction: 1,
				$dots: null,
				listWidth: null,
				listHeight: null,
				loadIndex: 0,
				$nextArrow: null,
				$prevArrow: null,
				slideCount: null,
				slideWidth: null,
				$slideTrack: null,
				$slides: null,
				sliding: !1,
				slideOffset: 0,
				swipeLeft: null,
				$list: null,
				touchObject: {
				},
				transformsEnabled: !1
			}, t.extend(s, s.initials), s.activeBreakpoint = null, s.animType = null, s.animProp = null, s.breakpoints = [], s.breakpointSettings = [], s.cssTransitions = !1, s.paused = !1, s.positionProp = null, s.respondTo = null, s.shouldClick = !0, s.$slider = t(e), s.$slidesCache = null, s.transformType = null, s.transitionType = null, s.windowWidth = 0, s.windowTimer = null, s.options = t.extend(
			{
			}, s.defaults, n), s.currentSlide = s.options.initialSlide, s.originalSettings = s.options, o = s.options.responsive || null, o && o.length > -1)
			{
				s.respondTo = s.options.respondTo || "window";
				for (r in o) o.hasOwnProperty(r) && (s.breakpoints.push(o[r].breakpoint), s.breakpointSettings[o[r].breakpoint] = o[r].settings);
				s.breakpoints.sort(function (t, e)
				{
					return e - t
				})
			}
			s.autoPlay = t.proxy(s.autoPlay, s), s.autoPlayClear = t.proxy(s.autoPlayClear, s), s.changeSlide = t.proxy(s.changeSlide, s), s.clickHandler = t.proxy(s.clickHandler, s), s.selectHandler = t.proxy(s.selectHandler, s), s.setPosition = t.proxy(s.setPosition, s), s.swipeHandler = t.proxy(s.swipeHandler, s), s.dragHandler = t.proxy(s.dragHandler, s), s.keyHandler = t.proxy(s.keyHandler, s), s.autoPlayIterator = t.proxy(s.autoPlayIterator, s), s.instanceUid = i++, s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, s.init(), s.checkResponsive()
		}
		var i = 0;
		return e
	}(), e.prototype.addSlide = function (e, i, n)
	{
		var o = this;
		if ("boolean" == typeof i) n = i, i = null;
		else if (0 > i || i >= o.slideCount) return !1;
		o.unload(), "number" == typeof i ? 0 === i && 0 === o.$slides.length ? t(e).appendTo(o.$slideTrack) : n ? t(e).insertBefore(o.$slides.eq(i)) : t(e).insertAfter(o.$slides.eq(i)) : n === !0 ? t(e).prependTo(o.$slideTrack) : t(e).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function (e, i)
		{
			t(i).attr("index", e)
		}), o.$slidesCache = o.$slides, o.reinit()
	}, e.prototype.animateSlide = function (e, i)
	{
		var n =
		{
		},
			o = this;
		if (1 === o.options.slidesToShow && o.options.adaptiveHeight === !0 && o.options.vertical === !1)
		{
			var r = o.$slides.eq(o.currentSlide).outerHeight(!0);
			o.$list.animate(
			{
				height: r
			}, o.options.speed)
		}
		o.options.rtl === !0 && o.options.vertical === !1 && (e = -e), o.transformsEnabled === !1 ? o.options.vertical === !1 ? o.$slideTrack.animate(
		{
			left: e
		}, o.options.speed, o.options.easing, i) : o.$slideTrack.animate(
		{
			top: e
		}, o.options.speed, o.options.easing, i) : o.cssTransitions === !1 ? t(
		{
			animStart: o.currentLeft
		}).animate(
		{
			animStart: e
		}, {
			duration: o.options.speed,
			easing: o.options.easing,
			step: function (t)
			{
				o.options.vertical === !1 ? (n[o.animType] = "translate(" + t + "px, 0px)", o.$slideTrack.css(n)) : (n[o.animType] = "translate(0px," + t + "px)", o.$slideTrack.css(n))
			},
			complete: function ()
			{
				i && i.call()
			}
		}) : (o.applyTransition(), n[o.animType] = o.options.vertical === !1 ? "translate3d(" + e + "px, 0px, 0px)" : "translate3d(0px," + e + "px, 0px)", o.$slideTrack.css(n), i && setTimeout(function ()
		{
			o.disableTransition(), i.call()
		}, o.options.speed))
	}, e.prototype.asNavFor = function (e)
	{
		var i = this,
			n = null != i.options.asNavFor ? t(i.options.asNavFor).getSlick() : null;
		null != n && n.slideHandler(e, !0)
	}, e.prototype.applyTransition = function (t)
	{
		var e = this,
			i =
			{
			};
		i[e.transitionType] = e.options.fade === !1 ? e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : "opacity " + e.options.speed + "ms " + e.options.cssEase, e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
	}, e.prototype.autoPlay = function ()
	{
		var t = this;
		t.autoPlayTimer && clearInterval(t.autoPlayTimer), t.slideCount > t.options.slidesToShow && t.paused !== !0 && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
	}, e.prototype.autoPlayClear = function ()
	{
		var t = this;
		t.autoPlayTimer && clearInterval(t.autoPlayTimer)
	}, e.prototype.autoPlayIterator = function ()
	{
		var t = this;
		t.options.infinite === !1 ? 1 === t.direction ? (t.currentSlide + 1 === t.slideCount - 1 && (t.direction = 0), t.slideHandler(t.currentSlide + t.options.slidesToScroll)) : (t.currentSlide - 1 === 0 && (t.direction = 1), t.slideHandler(t.currentSlide - t.options.slidesToScroll)) : t.slideHandler(t.currentSlide + t.options.slidesToScroll)
	}, e.prototype.buildArrows = function ()
	{
		var e = this;
		e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow = t(e.options.prevArrow), e.$nextArrow = t(e.options.nextArrow), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.appendTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled"))
	}, e.prototype.buildDots = function ()
	{
		var e, i, n = this;
		if (n.options.dots === !0 && n.slideCount > n.options.slidesToShow)
		{
			for (i = '<ul class="' + n.options.dotsClass + '">', e = 0; e <= n.getDotCount(); e += 1) i += "<li>" + n.options.customPaging.call(this, n, e) + "</li>";
			i += "</ul>", n.$dots = t(i).appendTo(n.options.appendDots), n.$dots.find("li").first().addClass("slick-active")
		}
	}, e.prototype.buildOut = function ()
	{
		var e = this;
		e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, i)
		{
			t(i).attr("index", e)
		}), e.$slidesCache = e.$slides, e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), e.options.centerMode === !0 && (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.options.accessibility === !0 && e.$list.prop("tabIndex", 0), e.setSlideClasses("number" == typeof this.currentSlide ? this.currentSlide : 0), e.options.draggable === !0 && e.$list.addClass("draggable")
	}, e.prototype.checkResponsive = function ()
	{
		var e, i, n, o = this,
			r = o.$slider.width(),
			s = window.innerWidth || t(window).width();
		if ("window" === o.respondTo ? n = s : "slider" === o.respondTo ? n = r : "min" === o.respondTo && (n = Math.min(s, r)), o.originalSettings.responsive && o.originalSettings.responsive.length > -1 && null !== o.originalSettings.responsive)
		{
			i = null;
			for (e in o.breakpoints) o.breakpoints.hasOwnProperty(e) && n < o.breakpoints[e] && (i = o.breakpoints[e]);
			null !== i ? null !== o.activeBreakpoint ? i !== o.activeBreakpoint && (o.activeBreakpoint = i, o.options = t.extend(
			{
			}, o.originalSettings, o.breakpointSettings[i]), o.refresh()) : (o.activeBreakpoint = i, o.options = t.extend(
			{
			}, o.originalSettings, o.breakpointSettings[i]), o.refresh()) : null !== o.activeBreakpoint && (o.activeBreakpoint = null, o.options = o.originalSettings, o.refresh())
		}
	}, e.prototype.changeSlide = function (e, i)
	{
		var n, o, r, s, a, l = this,
			c = t(e.target);
		switch (c.is("a") && e.preventDefault(), r = l.slideCount % l.options.slidesToScroll !== 0, n = r ? 0 : (l.slideCount - l.currentSlide) % l.options.slidesToScroll, e.data.message)
		{
		case "previous":
			o = 0 === n ? l.options.slidesToScroll : l.options.slidesToShow - n, l.slideCount > l.options.slidesToShow && l.slideHandler(l.currentSlide - o, !1, i);
			break;
		case "next":
			o = 0 === n ? l.options.slidesToScroll : n, l.slideCount > l.options.slidesToShow && l.slideHandler(l.currentSlide + o, !1, i);
			break;
		case "index":
			var u = 0 === e.data.index ? 0 : e.data.index || t(e.target).parent().index() * l.options.slidesToScroll;
			if (s = l.getNavigableIndexes(), a = 0, s[u] && s[u] === u) if (u > s[s.length - 1]) u = s[s.length - 1];
			else for (var d in s)
			{
				if (u < s[d])
				{
					u = a;
					break
				}
				a = s[d]
			}
			l.slideHandler(u, !1, i);
		default:
			return
		}
	}, e.prototype.clickHandler = function (t)
	{
		var e = this;
		e.shouldClick === !1 && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
	}, e.prototype.destroy = function ()
	{
		var e = this;
		e.autoPlayClear(), e.touchObject =
		{
		}, t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && "object" != typeof e.options.prevArrow && e.$prevArrow.remove(), e.$nextArrow && "object" != typeof e.options.nextArrow && e.$nextArrow.remove(), e.$slides.parent().hasClass("slick-track") && e.$slides.unwrap().unwrap(), e.$slides.removeClass("slick-slide slick-active slick-center slick-visible").removeAttr("index").css(
		{
			position: "",
			left: "",
			top: "",
			zIndex: "",
			opacity: "",
			width: ""
		}), e.$slider.removeClass("slick-slider"), e.$slider.removeClass("slick-initialized"), e.$list.off(".slick"), t(window).off(".slick-" + e.instanceUid), t(document).off(".slick-" + e.instanceUid)
	}, e.prototype.disableTransition = function (t)
	{
		var e = this,
			i =
			{
			};
		i[e.transitionType] = "", e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
	}, e.prototype.fadeSlide = function (t, e, i)
	{
		var n = this;
		n.cssTransitions === !1 ? (n.$slides.eq(e).css(
		{
			zIndex: 1e3
		}), n.$slides.eq(e).animate(
		{
			opacity: 1
		}, n.options.speed, n.options.easing, i), n.$slides.eq(t).animate(
		{
			opacity: 0
		}, n.options.speed, n.options.easing)) : (n.applyTransition(e), n.applyTransition(t), n.$slides.eq(e).css(
		{
			opacity: 1,
			zIndex: 1e3
		}), n.$slides.eq(t).css(
		{
			opacity: 0
		}), i && setTimeout(function ()
		{
			n.disableTransition(e), n.disableTransition(t), i.call()
		}, n.options.speed))
	}, e.prototype.filterSlides = function (t)
	{
		var e = this;
		null !== t && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
	}, e.prototype.getCurrent = function ()
	{
		var t = this;
		return t.currentSlide
	}, e.prototype.getDotCount = function ()
	{
		var t = this,
			e = 0,
			i = 0,
			n = 0;
		if (t.options.infinite === !0) n = Math.ceil(t.slideCount / t.options.slidesToScroll);
		else for (; e < t.slideCount;)++n, e = i + t.options.slidesToShow, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
		return n - 1
	}, e.prototype.getLeft = function (t)
	{
		var e, i, n, o = this,
			r = 0;
		return o.slideOffset = 0, i = o.$slides.first().outerHeight(), o.options.infinite === !0 ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1, r = i * o.options.slidesToShow * -1), o.slideCount % o.options.slidesToScroll !== 0 && t + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (t > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (t - o.slideCount)) * o.slideWidth * -1, r = (o.options.slidesToShow - (t - o.slideCount)) * i * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1, r = o.slideCount % o.options.slidesToScroll * i * -1))) : t + o.options.slidesToShow > o.slideCount && (o.slideOffset = (t + o.options.slidesToShow - o.slideCount) * o.slideWidth, r = (t + o.options.slidesToShow - o.slideCount) * i), o.slideCount <= o.options.slidesToShow && (o.slideOffset = 0, r = 0), o.options.centerMode === !0 && o.options.infinite === !0 ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : o.options.centerMode === !0 && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), e = o.options.vertical === !1 ? t * o.slideWidth * -1 + o.slideOffset : t * i * -1 + r, o.options.variableWidth === !0 && (n = o.$slideTrack.children(".slick-slide").eq(o.slideCount <= o.options.slidesToShow || o.options.infinite === !1 ? t : t + o.options.slidesToShow), e = n[0] ? -1 * n[0].offsetLeft : 0, o.options.centerMode === !0 && (n = o.$slideTrack.children(".slick-slide").eq(o.options.infinite === !1 ? t : t + o.options.slidesToShow + 1), e = n[0] ? -1 * n[0].offsetLeft : 0, e += (o.$list.width() - n.outerWidth()) / 2)), e
	}, e.prototype.getNavigableIndexes = function ()
	{
		for (var t = this, e = 0, i = 0, n = []; e < t.slideCount;) n.push(e), e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
		return n
	}, e.prototype.getSlideCount = function ()
	{
		var e, i = this;
		if (i.options.swipeToSlide === !0)
		{
			var n = null;
			return i.$slideTrack.find(".slick-slide").each(function (e, o)
			{
				return o.offsetLeft + t(o).outerWidth() / 2 > -1 * i.swipeLeft ? (n = o, !1) : void 0
			}), e = Math.abs(t(n).attr("index") - i.currentSlide)
		}
		return i.options.slidesToScroll
	}, e.prototype.init = function ()
	{
		var e = this;
		t(e.$slider).hasClass("slick-initialized") || (t(e.$slider).addClass("slick-initialized"), e.buildOut(), e.setProps(), e.startLoad(), e.loadSlider(), e.initializeEvents(), e.updateArrows(), e.updateDots()), null !== e.options.onInit && e.options.onInit.call(this, e)
	}, e.prototype.initArrowEvents = function ()
	{
		var t = this;
		t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.on("click.slick", {
			message: "previous"
		}, t.changeSlide), t.$nextArrow.on("click.slick", {
			message: "next"
		}, t.changeSlide))
	}, e.prototype.initDotEvents = function ()
	{
		var e = this;
		e.options.dots === !0 && e.slideCount > e.options.slidesToShow && t("li", e.$dots).on("click.slick", {
			message: "index"
		}, e.changeSlide), e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && e.options.autoplay === !0 && t("li", e.$dots).on("mouseenter.slick", function ()
		{
			e.paused = !0, e.autoPlayClear()
		}).on("mouseleave.slick", function ()
		{
			e.paused = !1, e.autoPlay()
		})
	}, e.prototype.initializeEvents = function ()
	{
		var e = this;
		e.initArrowEvents(), e.initDotEvents(), e.$list.on("touchstart.slick mousedown.slick", {
			action: "start"
		}, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
			action: "move"
		}, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
			action: "end"
		}, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
			action: "end"
		}, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), e.options.pauseOnHover === !0 && e.options.autoplay === !0 && (e.$list.on("mouseenter.slick", function ()
		{
			e.paused = !0, e.autoPlayClear()
		}), e.$list.on("mouseleave.slick", function ()
		{
			e.paused = !1, e.autoPlay()
		})), e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && t(e.options.slide, e.$slideTrack).on("click.slick", e.selectHandler), t(window).on("orientationchange.slick.slick-" + e.instanceUid, function ()
		{
			e.checkResponsive(), e.setPosition()
		}), t(window).on("resize.slick.slick-" + e.instanceUid, function ()
		{
			t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function ()
			{
				e.windowWidth = t(window).width(), e.checkResponsive(), e.setPosition()
			}, 50))
		}), t("*[draggable!=true]", e.$slideTrack).on("dragstart", function (t)
		{
			t.preventDefault()
		}), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
	}, e.prototype.initUI = function ()
	{
		var t = this;
		t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.show(), t.options.autoplay === !0 && t.autoPlay()
	}, e.prototype.keyHandler = function (t)
	{
		var e = this;
		37 === t.keyCode && e.options.accessibility === !0 ? e.changeSlide(
		{
			data: {
				message: "previous"
			}
		}) : 39 === t.keyCode && e.options.accessibility === !0 && e.changeSlide(
		{
			data: {
				message: "next"
			}
		})
	}, e.prototype.lazyLoad = function ()
	{
		function e(e)
		{
			t("img[data-lazy]", e).each(function ()
			{
				var e = t(this),
					i = t(this).attr("data-lazy");
				e.load(function ()
				{
					e.animate(
					{
						opacity: 1
					}, 200)
				}).css(
				{
					opacity: 0
				}).attr("src", i).removeAttr("data-lazy").removeClass("slick-loading")
			})
		}
		var i, n, o, r, s = this;
		s.options.centerMode === !0 ? s.options.infinite === !0 ? (o = s.currentSlide + (s.options.slidesToShow / 2 + 1), r = o + s.options.slidesToShow + 2) : (o = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)), r = 2 + (s.options.slidesToShow / 2 + 1) + s.currentSlide) : (o = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide, r = o + s.options.slidesToShow, s.options.fade === !0 && (o > 0 && o--, r <= s.slideCount && r++)), i = s.$slider.find(".slick-slide").slice(o, r), e(i), s.slideCount <= s.options.slidesToShow ? (n = s.$slider.find(".slick-slide"), e(n)) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? (n = s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow), e(n)) : 0 === s.currentSlide && (n = s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow), e(n))
	}, e.prototype.loadSlider = function ()
	{
		var t = this;
		t.setPosition(), t.$slideTrack.css(
		{
			opacity: 1
		}), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
	}, e.prototype.postSlide = function (t)
	{
		var e = this;
		null !== e.options.onAfterChange && e.options.onAfterChange.call(this, e, t), e.animating = !1, e.setPosition(), e.swipeLeft = null, e.options.autoplay === !0 && e.paused === !1 && e.autoPlay()
	}, e.prototype.progressiveLazyLoad = function ()
	{
		var e, i, n = this;
		e = t("img[data-lazy]", n.$slider).length, e > 0 && (i = t("img[data-lazy]", n.$slider).first(), i.attr("src", i.attr("data-lazy")).removeClass("slick-loading").load(function ()
		{
			i.removeAttr("data-lazy"), n.progressiveLazyLoad()
		}).error(function ()
		{
			i.removeAttr("data-lazy"), n.progressiveLazyLoad()
		}))
	}, e.prototype.refresh = function ()
	{
		var e = this,
			i = e.currentSlide;
		e.destroy(), t.extend(e, e.initials), e.init(), e.changeSlide(
		{
			data: {
				message: "index",
				index: i
			}
		}, !0)
	}, e.prototype.reinit = function ()
	{
		var e = this;
		e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.options.focusOnSelect === !0 && t(e.options.slide, e.$slideTrack).on("click.slick", e.selectHandler), e.setSlideClasses(0), e.setPosition(), null !== e.options.onReInit && e.options.onReInit.call(this, e)
	}, e.prototype.removeSlide = function (t, e, i)
	{
		var n = this;
		return "boolean" == typeof t ? (e = t, t = e === !0 ? 0 : n.slideCount - 1) : t = e === !0 ? --t : t, n.slideCount < 1 || 0 > t || t > n.slideCount - 1 ? !1 : (n.unload(), i === !0 ? n.$slideTrack.children().remove() : n.$slideTrack.children(this.options.slide).eq(t).remove(), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slidesCache = n.$slides, void n.reinit())
	}, e.prototype.setCSS = function (t)
	{
		var e, i, n = this,
			o =
			{
			};
		n.options.rtl === !0 && (t = -t), e = "left" == n.positionProp ? t + "px" : "0px", i = "top" == n.positionProp ? t + "px" : "0px", o[n.positionProp] = t, n.transformsEnabled === !1 ? n.$slideTrack.css(o) : (o =
		{
		}, n.cssTransitions === !1 ? (o[n.animType] = "translate(" + e + ", " + i + ")", n.$slideTrack.css(o)) : (o[n.animType] = "translate3d(" + e + ", " + i + ", 0px)", n.$slideTrack.css(o)))
	}, e.prototype.setDimensions = function ()
	{
		var e = this;
		if (e.options.vertical === !1 ? e.options.centerMode === !0 && e.$list.css(
		{
			padding: "0px " + e.options.centerPadding
		}) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), e.options.centerMode === !0 && e.$list.css(
		{
			padding: e.options.centerPadding + " 0px"
		})), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), e.options.vertical === !1 && e.options.variableWidth === !1) e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length));
		else if (e.options.variableWidth === !0)
		{
			var i = 0;
			e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.children(".slick-slide").each(function ()
			{
				i += Math.ceil(t(this).outerWidth(!0))
			}), e.$slideTrack.width(Math.ceil(i) + 1)
		}
		else e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length));
		var n = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
		e.options.variableWidth === !1 && e.$slideTrack.children(".slick-slide").width(e.slideWidth - n)
	}, e.prototype.setFade = function ()
	{
		var e, i = this;
		i.$slides.each(function (n, o)
		{
			e = i.slideWidth * n * -1, t(o).css(i.options.rtl === !0 ? {
				position: "relative",
				right: e,
				top: 0,
				zIndex: 800,
				opacity: 0
			} : {
				position: "relative",
				left: e,
				top: 0,
				zIndex: 800,
				opacity: 0
			})
		}), i.$slides.eq(i.currentSlide).css(
		{
			zIndex: 900,
			opacity: 1
		})
	}, e.prototype.setHeight = function ()
	{
		var t = this;
		if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1)
		{
			var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
			t.$list.css("height", e)
		}
	}, e.prototype.setPosition = function ()
	{
		var t = this;
		t.setDimensions(), t.setHeight(), t.options.fade === !1 ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), null !== t.options.onSetPosition && t.options.onSetPosition.call(this, t)
	}, e.prototype.setProps = function ()
	{
		var t = this,
			e = document.body.style;
		t.positionProp = t.options.vertical === !0 ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), (void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.msTransition) && t.options.useCSS === !0 && (t.cssTransitions = !0), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && t.animType !== !1 && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = null !== t.animType && t.animType !== !1
	}, e.prototype.setSlideClasses = function (t)
	{
		var e, i, n, o, r = this;
		r.$slider.find(".slick-slide").removeClass("slick-active").removeClass("slick-center"), i = r.$slider.find(".slick-slide"), r.options.centerMode === !0 ? (e = Math.floor(r.options.slidesToShow / 2), r.options.infinite === !0 && (t >= e && t <= r.slideCount - 1 - e ? r.$slides.slice(t - e, t + e + 1).addClass("slick-active") : (n = r.options.slidesToShow + t, i.slice(n - e + 1, n + e + 2).addClass("slick-active")), 0 === t ? i.eq(i.length - 1 - r.options.slidesToShow).addClass("slick-center") : t === r.slideCount - 1 && i.eq(r.options.slidesToShow).addClass("slick-center")), r.$slides.eq(t).addClass("slick-center")) : t >= 0 && t <= r.slideCount - r.options.slidesToShow ? r.$slides.slice(t, t + r.options.slidesToShow).addClass("slick-active") : i.length <= r.options.slidesToShow ? i.addClass("slick-active") : (o = r.slideCount % r.options.slidesToShow, n = r.options.infinite === !0 ? r.options.slidesToShow + t : t, r.options.slidesToShow == r.options.slidesToScroll && r.slideCount - t < r.options.slidesToShow ? i.slice(n - (r.options.slidesToShow - o), n + o).addClass("slick-active") : i.slice(n, n + r.options.slidesToShow).addClass("slick-active")), "ondemand" === r.options.lazyLoad && r.lazyLoad()
	}, e.prototype.setupInfinite = function ()
	{
		var e, i, n, o = this;
		if (o.options.fade === !0 && (o.options.centerMode = !1), o.options.infinite === !0 && o.options.fade === !1 && (i = null, o.slideCount > o.options.slidesToShow))
		{
			for (n = o.options.centerMode === !0 ? o.options.slidesToShow + 1 : o.options.slidesToShow, e = o.slideCount; e > o.slideCount - n; e -= 1) i = e - 1, t(o.$slides[i]).clone(!0).attr("id", "").attr("index", i - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
			for (e = 0; n > e; e += 1) i = e, t(o.$slides[i]).clone(!0).attr("id", "").attr("index", i + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
			o.$slideTrack.find(".slick-cloned").find("[id]").each(function ()
			{
				t(this).attr("id", "")
			})
		}
	}, e.prototype.selectHandler = function (e)
	{
		var i = this,
			n = parseInt(t(e.target).parents(".slick-slide").attr("index"));
		return n || (n = 0), i.slideCount <= i.options.slidesToShow ? (i.$slider.find(".slick-slide").removeClass("slick-active"), i.$slides.eq(n).addClass("slick-active"), i.options.centerMode === !0 && (i.$slider.find(".slick-slide").removeClass("slick-center"), i.$slides.eq(n).addClass("slick-center")), void i.asNavFor(n)) : void i.slideHandler(n)
	}, e.prototype.slideHandler = function (t, e, i)
	{
		var n, o, r, s, a = null,
			l = this;
		return e = e || !1, l.animating === !0 && l.options.waitForAnimate === !0 || l.options.fade === !0 && l.currentSlide === t || l.slideCount <= l.options.slidesToShow ? void 0 : (e === !1 && l.asNavFor(t), n = t, a = l.getLeft(n), s = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? s : l.swipeLeft, l.options.infinite === !1 && l.options.centerMode === !1 && (0 > t || t > l.getDotCount() * l.options.slidesToScroll) ? void(l.options.fade === !1 && (n = l.currentSlide, i !== !0 ? l.animateSlide(s, function ()
		{
			l.postSlide(n)
		}) : l.postSlide(n))) : l.options.infinite === !1 && l.options.centerMode === !0 && (0 > t || t > l.slideCount - l.options.slidesToScroll) ? void(l.options.fade === !1 && (n = l.currentSlide, i !== !0 ? l.animateSlide(s, function ()
		{
			l.postSlide(n)
		}) : l.postSlide(n))) : (l.options.autoplay === !0 && clearInterval(l.autoPlayTimer), o = 0 > n ? l.slideCount % l.options.slidesToScroll !== 0 ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + n : n >= l.slideCount ? l.slideCount % l.options.slidesToScroll !== 0 ? 0 : n - l.slideCount : n, l.animating = !0, null !== l.options.onBeforeChange && t !== l.currentSlide && l.options.onBeforeChange.call(this, l, l.currentSlide, o), r = l.currentSlide, l.currentSlide = o, l.setSlideClasses(l.currentSlide), l.updateDots(), l.updateArrows(), l.options.fade === !0 ? void(i !== !0 ? l.fadeSlide(r, o, function ()
		{
			l.postSlide(o)
		}) : l.postSlide(o)) : void(i !== !0 ? l.animateSlide(a, function ()
		{
			l.postSlide(o)
		}) : l.postSlide(o))))
	}, e.prototype.startLoad = function ()
	{
		var t = this;
		t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
	}, e.prototype.swipeDirection = function ()
	{
		var t, e, i, n, o = this;
		return t = o.touchObject.startX - o.touchObject.curX, e = o.touchObject.startY - o.touchObject.curY, i = Math.atan2(e, t), n = Math.round(180 * i / Math.PI), 0 > n && (n = 360 - Math.abs(n)), 45 >= n && n >= 0 ? o.options.rtl === !1 ? "left" : "right" : 360 >= n && n >= 315 ? o.options.rtl === !1 ? "left" : "right" : n >= 135 && 225 >= n ? o.options.rtl === !1 ? "right" : "left" : "vertical"
	}, e.prototype.swipeEnd = function ()
	{
		var t = this;
		if (t.dragging = !1, t.shouldClick = t.touchObject.swipeLength > 10 ? !1 : !0, void 0 === t.touchObject.curX) return !1;
		if (t.touchObject.swipeLength >= t.touchObject.minSwipe) switch (t.swipeDirection())
		{
		case "left":
			t.slideHandler(t.currentSlide + t.getSlideCount()), t.currentDirection = 0, t.touchObject =
			{
			};
			break;
		case "right":
			t.slideHandler(t.currentSlide - t.getSlideCount()), t.currentDirection = 1, t.touchObject =
			{
			}
		}
		else t.touchObject.startX !== t.touchObject.curX && (t.slideHandler(t.currentSlide), t.touchObject =
		{
		})
	}, e.prototype.swipeHandler = function (t)
	{
		var e = this;
		if (!(e.options.swipe === !1 || "ontouchend" in document && e.options.swipe === !1 || e.options.draggable === !1 && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, t.data.action)
		{
		case "start":
			e.swipeStart(t);
			break;
		case "move":
			e.swipeMove(t);
			break;
		case "end":
			e.swipeEnd(t)
		}
	}, e.prototype.swipeMove = function (t)
	{
		var e, i, n, o, r = this;
		return o = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !r.dragging || o && 1 !== o.length ? !1 : (e = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== o ? o[0].pageX : t.clientX, r.touchObject.curY = void 0 !== o ? o[0].pageY : t.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), i = r.swipeDirection(), "vertical" !== i ? (void 0 !== t.originalEvent && r.touchObject.swipeLength > 4 && t.preventDefault(), n = (r.options.rtl === !1 ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), r.swipeLeft = r.options.vertical === !1 ? e + r.touchObject.swipeLength * n : e + r.touchObject.swipeLength * (r.$list.height() / r.listWidth) * n, r.options.fade === !0 || r.options.touchMove === !1 ? !1 : r.animating === !0 ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft)) : void 0)
	}, e.prototype.swipeStart = function (t)
	{
		var e, i = this;
		return 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow ? (i.touchObject =
		{
		}, !1) : (void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, void(i.dragging = !0))
	}, e.prototype.unfilterSlides = function ()
	{
		var t = this;
		null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
	}, e.prototype.unload = function ()
	{
		var e = this;
		t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && "object" != typeof e.options.prevArrow && e.$prevArrow.remove(), e.$nextArrow && "object" != typeof e.options.nextArrow && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible").css("width", "")
	}, e.prototype.updateArrows = function ()
	{
		var t, e = this;
		t = Math.floor(e.options.slidesToShow / 2), e.options.arrows === !0 && e.options.infinite !== !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.removeClass("slick-disabled"), e.$nextArrow.removeClass("slick-disabled"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled"), e.$nextArrow.removeClass("slick-disabled")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled"), e.$prevArrow.removeClass("slick-disabled")) : e.currentSlide > e.slideCount - e.options.slidesToShow + t && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled"), e.$prevArrow.removeClass("slick-disabled")))
	}, e.prototype.updateDots = function ()
	{
		var t = this;
		null !== t.$dots && (t.$dots.find("li").removeClass("slick-active"), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active"))
	}, t.fn.slick = function (t)
	{
		var i = this;
		return i.each(function (i, n)
		{
			n.slick = new e(n, t)
		})
	}, t.fn.slickAdd = function (t, e, i)
	{
		var n = this;
		return n.each(function (n, o)
		{
			o.slick.addSlide(t, e, i)
		})
	}, t.fn.slickCurrentSlide = function ()
	{
		var t = this;
		return t.get(0).slick.getCurrent()
	}, t.fn.slickFilter = function (t)
	{
		var e = this;
		return e.each(function (e, i)
		{
			i.slick.filterSlides(t)
		})
	}, t.fn.slickGoTo = function (t, e)
	{
		var i = this;
		return i.each(function (i, n)
		{
			n.slick.changeSlide(
			{
				data: {
					message: "index",
					index: parseInt(t)
				}
			}, e)
		})
	}, t.fn.slickNext = function ()
	{
		var t = this;
		return t.each(function (t, e)
		{
			e.slick.changeSlide(
			{
				data: {
					message: "next"
				}
			})
		})
	}, t.fn.slickPause = function ()
	{
		var t = this;
		return t.each(function (t, e)
		{
			e.slick.autoPlayClear(), e.slick.paused = !0
		})
	}, t.fn.slickPlay = function ()
	{
		var t = this;
		return t.each(function (t, e)
		{
			e.slick.paused = !1, e.slick.autoPlay()
		})
	}, t.fn.slickPrev = function ()
	{
		var t = this;
		return t.each(function (t, e)
		{
			e.slick.changeSlide(
			{
				data: {
					message: "previous"
				}
			})
		})
	}, t.fn.slickRemove = function (t, e)
	{
		var i = this;
		return i.each(function (i, n)
		{
			n.slick.removeSlide(t, e)
		})
	}, t.fn.slickRemoveAll = function ()
	{
		var t = this;
		return t.each(function (t, e)
		{
			e.slick.removeSlide(null, null, !0)
		})
	}, t.fn.slickGetOption = function (t)
	{
		var e = this;
		return e.get(0).slick.options[t]
	}, t.fn.slickSetOption = function (t, e, i)
	{
		var n = this;
		return n.each(function (n, o)
		{
			o.slick.options[t] = e, i === !0 && (o.slick.unload(), o.slick.reinit())
		})
	}, t.fn.slickUnfilter = function ()
	{
		var t = this;
		return t.each(function (t, e)
		{
			e.slick.unfilterSlides()
		})
	}, t.fn.unslick = function ()
	{
		var t = this;
		return t.each(function (t, e)
		{
			e.slick && e.slick.destroy()
		})
	}, t.fn.getSlick = function ()
	{
		var t = null,
			e = this;
		return e.each(function (e, i)
		{
			t = i.slick
		}), t
	}
}), function (t)
{
	var e = -1,
		i = -1,
		n = function (e)
		{
			var i = 1,
				n = t(e),
				r = null,
				s = [];
			return n.each(function ()
			{
				var e = t(this),
					n = e.offset().top - o(e.css("margin-top")),
					a = s.length > 0 ? s[s.length - 1] : null;
				null === a ? s.push(e) : Math.floor(Math.abs(r - n)) <= i ? s[s.length - 1] = a.add(e) : s.push(e), r = n
			}), s
		},
		o = function (t)
		{
			return parseFloat(t) || 0
		},
		r = t.fn.matchHeight = function (e)
		{
			if ("remove" === e)
			{
				var i = this;
				return this.css("height", ""), t.each(r._groups, function (t, e)
				{
					e.elements = e.elements.not(i)
				}), this
			}
			return this.length <= 1 ? this : (e = "undefined" != typeof e ? e : !0, r._groups.push(
			{
				elements: this,
				byRow: e
			}), r._apply(this, e), this)
		};
	r._groups = [], r._throttle = 80, r._maintainScroll = !1, r._beforeUpdate = null, r._afterUpdate = null, r._apply = function (e, i)
	{
		var s = t(e),
			a = [s],
			l = t(window).scrollTop(),
			c = t("html").outerHeight(!0),
			u = s.parents().filter(":hidden");
		return u.css("display", "block"), i && (s.each(function ()
		{
			var e = t(this),
				i = "inline-block" === e.css("display") ? "inline-block" : "block";
			e.data("style-cache", e.attr("style")), e.css(
			{
				display: i,
				"padding-top": "0",
				"padding-bottom": "0",
				"margin-top": "0",
				"margin-bottom": "0",
				"border-top-width": "0",
				"border-bottom-width": "0",
				height: "100px"
			})
		}), a = n(s), s.each(function ()
		{
			var e = t(this);
			e.attr("style", e.data("style-cache") || "").css("height", "")
		})), t.each(a, function (e, n)
		{
			var r = t(n),
				s = 0;
			i && r.length <= 1 || (r.each(function ()
			{
				var e = t(this),
					i = "inline-block" === e.css("display") ? "inline-block" : "block";
				e.css(
				{
					display: i,
					height: ""
				}), e.outerHeight(!1) > s && (s = e.outerHeight(!1)), e.css("display", "")
			}), r.each(function ()
			{
				var e = t(this),
					i = 0;
				"border-box" !== e.css("box-sizing") && (i += o(e.css("border-top-width")) + o(e.css("border-bottom-width")), i += o(e.css("padding-top")) + o(e.css("padding-bottom"))), e.css("height", s - i)
			}))
		}), u.css("display", ""), r._maintainScroll && t(window).scrollTop(l / c * t("html").outerHeight(!0)), this
	}, r._applyDataApi = function ()
	{
		var e =
		{
		};
		t("[data-match-height], [data-mh]").each(function ()
		{
			var i = t(this),
				n = i.attr("data-match-height") || i.attr("data-mh");
			e[n] = n in e ? e[n].add(i) : i
		}), t.each(e, function ()
		{
			this.matchHeight(!0)
		})
	};
	var s = function (e)
	{
		r._beforeUpdate && r._beforeUpdate(e, r._groups), t.each(r._groups, function ()
		{
			r._apply(this.elements, this.byRow)
		}), r._afterUpdate && r._afterUpdate(e, r._groups)
	};
	r._update = function (n, o)
	{
		if (o && "resize" === o.type)
		{
			var a = t(window).width();
			if (a === e) return;
			e = a
		}
		n ? -1 === i && (i = setTimeout(function ()
		{
			s(o), i = -1
		}, r._throttle)) : s(o)
	}, t(r._applyDataApi), t(window).bind("load", function (t)
	{
		r._update(!1, t)
	}), t(window).bind("resize orientationchange", function (t)
	{
		r._update(!0, t)
	})
}(jQuery);
var __slice = [].slice,
	__indexOf = [].indexOf ||
	function (t)
	{
		for (var e = 0, i = this.length; i > e; e++) if (e in this && this[e] === t) return e;
		return -1
	};
!
function (t)
{
	var e;
	return e = function ()
	{
		function e(e, i)
		{
			var n, o = this;
			this.input = e, this.defaultOptions =
			{
				animate: !0,
				snapMid: !1,
				classPrefix: null,
				classSuffix: null,
				theme: null,
				highlight: !1
			}, this.settings = t.extend(
			{
			}, this.defaultOptions, i), this.settings.theme && (this.settings.classSuffix = "-" + this.settings.theme), this.input.hide(), this.slider = t("<div>").addClass("simple-slider" + (this.settings.classSuffix || "")).css(
			{
				position: "relative",
				userSelect: "none",
				boxSizing: "border-box"
			}).insertBefore(this.input), this.input.attr("id") && this.slider.attr("id", this.input.attr("id") + "-slider"), this.track = this.createDivElement("track").css(
			{
				width: "100%"
			}), this.settings.highlight && (this.highlightTrack = this.createDivElement("highlight-track").css(
			{
				width: "0"
			})), this.dragger = this.createDivElement("dragger").text("III"), this.slider.css(
			{
				minHeight: this.dragger.outerHeight(),
				marginLeft: this.dragger.outerWidth() / 2,
				marginRight: this.dragger.outerWidth() / 2
			}), this.track.css(
			{
				marginTop: this.track.outerHeight() / -2
			}), this.settings.highlight && this.highlightTrack.css(
			{
				marginTop: this.track.outerHeight() / -2
			}), this.dragger.css(
			{
				marginTop: this.dragger.outerHeight() / -2,
				marginLeft: this.dragger.outerWidth() / -2
			}), this.track.mousedown(function (t)
			{
				return o.trackEvent(t)
			}), this.settings.highlight && this.highlightTrack.mousedown(function (t)
			{
				return o.trackEvent(t)
			}), this.dragger.mousedown(function (t)
			{
				return 1 === t.which ? (o.dragging = !0, o.dragger.addClass("dragging"), o.domDrag(t.pageX, t.pageY), !1) : void 0
			}), t("body").mousemove(function (e)
			{
				return o.dragging ? (o.domDrag(e.pageX, e.pageY), t("body").css(
				{
					cursor: "pointer"
				})) : void 0
			}).mouseup(function ()
			{
				return o.dragging ? (o.dragging = !1, o.dragger.removeClass("dragging"), t("body").css(
				{
					cursor: "auto"
				})) : void 0
			}), this.pagePos = 0, "" === this.input.val() ? (this.value = this.getRange().min, this.input.val(this.value)) : this.value = this.nearestValidValue(this.input.val()), this.setSliderPositionFromValue(this.value), n = this.valueToRatio(this.value), this.input.trigger("slider:ready", {
				value: this.value,
				ratio: n,
				position: n * this.slider.outerWidth(),
				el: this.slider
			})
		}
		return e.prototype.createDivElement = function (e)
		{
			var i;
			return i = t("<div>").addClass(e).css(
			{
				position: "absolute",
				top: "50%",
				userSelect: "none",
				cursor: "pointer"
			}).appendTo(this.slider)
		}, e.prototype.setRatio = function (t)
		{
			var e;
			return t = Math.min(1, t), t = Math.max(0, t), e = this.ratioToValue(t), this.setSliderPositionFromValue(e), this.valueChanged(e, t, "setRatio")
		}, e.prototype.setValue = function (t)
		{
			var e;
			return t = this.nearestValidValue(t), e = this.valueToRatio(t), this.setSliderPositionFromValue(t), this.valueChanged(t, e, "setValue")
		}, e.prototype.trackEvent = function (t)
		{
			return 1 === t.which ? (this.domDrag(t.pageX, t.pageY, !0), this.dragging = !0, !1) : void 0
		}, e.prototype.domDrag = function (t, e, i)
		{
			var n, o, r;
			return null == i && (i = !1), n = t - this.slider.offset().left, n = Math.min(this.slider.outerWidth(), n), n = Math.max(0, n), this.pagePos !== n ? (this.pagePos = n, o = n / this.slider.outerWidth(), r = this.ratioToValue(o), this.valueChanged(r, o, "domDrag"), this.settings.snap ? this.setSliderPositionFromValue(r, i) : this.setSliderPosition(n, i)) : void 0
		}, e.prototype.setSliderPosition = function (t, e)
		{
			if (null == e && (e = !1), e && this.settings.animate)
			{
				if (this.dragger.animate(
				{
					left: t
				}, 200), this.settings.highlight) return this.highlightTrack.animate(
				{
					width: t
				}, 200)
			}
			else if (this.dragger.css(
			{
				left: t
			}), this.settings.highlight) return this.highlightTrack.css(
			{
				width: t
			})
		}, e.prototype.setSliderPositionFromValue = function (t, e)
		{
			var i;
			return null == e && (e = !1), i = this.valueToRatio(t), this.setSliderPosition(i * this.slider.outerWidth(), e)
		}, e.prototype.getRange = function ()
		{
			return this.settings.allowedValues ? {
				min: Math.min.apply(Math, this.settings.allowedValues),
				max: Math.max.apply(Math, this.settings.allowedValues)
			} : this.settings.range ? {
				min: parseFloat(this.settings.range[0]),
				max: parseFloat(this.settings.range[1])
			} : {
				min: 0,
				max: 1
			}
		}, e.prototype.nearestValidValue = function (e)
		{
			var i, n, o, r;
			return o = this.getRange(), e = Math.min(o.max, e), e = Math.max(o.min, e), this.settings.allowedValues ? (i = null, t.each(this.settings.allowedValues, function ()
			{
				return null === i || Math.abs(this - e) < Math.abs(i - e) ? i = this : void 0
			}), i) : this.settings.step ? (n = (o.max - o.min) / this.settings.step, r = Math.floor((e - o.min) / this.settings.step), (e - o.min) % this.settings.step > this.settings.step / 2 && n > r && (r += 1), r * this.settings.step + o.min) : e
		}, e.prototype.valueToRatio = function (t)
		{
			var e, i, n, o, r, s, a, l;
			if (this.settings.equalSteps)
			{
				for (l = this.settings.allowedValues, o = s = 0, a = l.length; a > s; o = ++s) e = l[o], ("undefined" == typeof i || null === i || Math.abs(e - t) < Math.abs(i - t)) && (i = e, n = o);
				return this.settings.snapMid ? (n + .5) / this.settings.allowedValues.length : n / (this.settings.allowedValues.length - 1)
			}
			return r = this.getRange(), (t - r.min) / (r.max - r.min)
		}, e.prototype.ratioToValue = function (t)
		{
			var e, i, n, o, r;
			return this.settings.equalSteps ? (r = this.settings.allowedValues.length, o = Math.round(t * r - .5), e = Math.min(o, this.settings.allowedValues.length - 1), this.settings.allowedValues[e]) : (i = this.getRange(), n = t * (i.max - i.min) + i.min, this.nearestValidValue(n))
		}, e.prototype.valueChanged = function (e, i, n)
		{
			var o;
			if (e.toString() !== this.value.toString()) return this.value = e, o =
			{
				value: e,
				ratio: i,
				position: i * this.slider.outerWidth(),
				trigger: n,
				el: this.slider
			}, this.input.val(e).trigger(t.Event("change", o)).trigger("slider:changed", o)
		}, e
	}(), t.extend(t.fn, {
		simpleSlider: function ()
		{
			var i, n, o;
			return o = arguments[0], i = 2 <= arguments.length ? __slice.call(arguments, 1) : [], n = ["setRatio", "setValue"], t(this).each(function ()
			{
				var r, s;
				return o && __indexOf.call(n, o) >= 0 ? (r = t(this).data("slider-object"), r[o].apply(r, i)) : (s = o, t(this).data("slider-object", new e(t(this), s)))
			})
		}
	}), t(function ()
	{
		return t("[data-slider]").each(function ()
		{
			var e, i, n, o;
			return e = t(this), n =
			{
			}, i = e.data("slider-values"), i && (n.allowedValues = function ()
			{
				var t, e, n, r;
				for (n = i.split(","), r = [], t = 0, e = n.length; e > t; t++) o = n[t], r.push(parseFloat(o));
				return r
			}()), e.data("slider-range") && (n.range = e.data("slider-range").split(",")), e.data("slider-step") && (n.step = e.data("slider-step")), n.snap = e.data("slider-snap"), n.equalSteps = e.data("slider-equal-steps"), e.data("slider-theme") && (n.theme = e.data("slider-theme")), e.attr("data-slider-highlight") && (n.highlight = e.data("slider-highlight")), null != e.data("slider-animate") && (n.animate = e.data("slider-animate")), e.simpleSlider(n)
		})
	})
}(this.jQuery || this.Zepto, this), function (t)
{
	"use strict";
	t.smallWidth = 480, t.mediumWidth = 768, t.App =
	{
		fn: {
		},
		events: {
		}
	}
}(this), function (t, e)
{
	"use strict";
	var i = e.App;
	i.events.resize = [];
	var n, o = 500;
	t(e).on("resize.app", function ()
	{
		e.clearTimeout(n), n = e.setTimeout(function ()
		{
			t.each(i.events.resize, function (i, n)
			{
				n(t(e).outerWidth(), t(e).outerHeight())
			})
		}, o)
	})
}(this.jQuery, this, this.document), function (t, e)
{
	"use strict";
	var i = e.App;
	i.fn.carousel = function ()
	{
		t(".module-carousel").each(function ()
		{
			var i, n = t(this);
			n.on("click", ".item", function (o)
			{
				o.preventDefault();
				var r = t(this),
					s = t(t(this).attr("href"));
				e.clearTimeout(i), n.removeClass(function (t, e)
				{
					return (e.match(/(^|\s)active-item-\S+/g) || []).join(" ")
				}), r.addClass("active"), n.find(".item").not(r).removeClass("active"), n.addClass("active-item-" + r.index()), n.find(".carousel-element.active").addClass("fading-out"), i = e.setTimeout(function ()
				{
					n.find(".carousel-element").not(s).removeClass("active"), n.find(".carousel-element.fading-out").removeClass("fading-out"), s.addClass("active"), e.setTimeout(function ()
					{
						n.find(".fading-in").removeClass("fading-in"), s.addClass("fading-in")
					}, e.Modernizr.csstransitions ? 20 : 1)
				}, e.Modernizr.csstransitions ? 200 : 1)
			})
		})
	}, t(function ()
	{
		i.fn.carousel()
	})
}(this.jQuery, this, this.document), function (t, e, i)
{
	"use strict";

	function n(t)
	{
		return r.prefixed(t).replace(/([A-Z])/g, function (t, e)
		{
			return "-" + e.toLowerCase()
		}).replace(/^ms-/, "-ms-")
	}
	var o = e.App,
		r = e.Modernizr;
	o.fn.parallax = function (o, s)
	{
		function a()
		{
			var t = e.scrollY || i.documentElement.scrollTop || e.pageYOffset;
			p.css(h, "translate3d(0, " + (u > t ? t + "px" : "100%") + ", 0)"), f.toggleClass("hero-moving", t > 2 * u)
		}
		t(e).off("scroll.parallax"), t("[data-height]").css("min-height", ""), t("[data-parallax]").css(n("transform"), "").off("click.parallax");
		var l, c = t("body").hasClass("customer-feedback");
		c ? o > 1100 ? l = 816 : o > e.smallWidth && (l = 700) : l = 760;
		var u = s > l ? s : l,
			d = c ? e.smallWidth : e.mediumWidth;
		if (t('[data-parallax="scroll"]').on("click.parallax", function (e)
		{
			t("html, body").animate(
			{
				scrollTop: u
			}, 700), e.preventDefault()
		}), !(d > o) && (t('[data-height="window"]').css("min-height", u + "px"), t('[data-height="window2x"]').css("min-height", 2 * u + "px"), r.csstransforms3d))
		{
			var h = n("transform"),
				p = t('[data-parallax="bottom"]'),
				f = t("body");
			t(e).on("scroll.parallax", a)
		}
	}, t("[data-parallax]").length && (o.events.resize.push(o.fn.parallax), t(function ()
	{
		o.fn.parallax(t(e).outerWidth(), t(e).outerHeight())
	}), t(e).load(function ()
	{
		o.fn.parallax(t(e).outerWidth(), t(e).outerHeight())
	}))
}(this.jQuery, this, this.document), function (t, e, i, n)
{
	"use strict";
	n.SignupApp =
	{
	}, n.SignupApp.AppView = e.View.extend(
	{
		el: "body",
		initialize: function ()
		{
			this.bindOnboardingEmailAddressForms()
		},
		bindOnboardingEmailAddressForms: function ()
		{
			this.onboarding_email_address_form_views = [];
			var e = this;
			i.each(t(".app-signup-form"), function (i)
			{
				var o = new n.SignupApp.OnboardingEmailAddressFormView(
				{
					el: t(i)
				});
				e.onboarding_email_address_form_views.push(o)
			})
		}
	}), t(function ()
	{
		n.signup_app = new n.SignupApp.AppView
	}), n.SignupApp.OnboardingEmailAddress = e.Model.extend(
	{
		validateEmail: function (t)
		{
			var e = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return e.test(t)
		},
		validate: function (t)
		{
			return this.validateEmail(t.email) ? void 0 : {
				invalid_email: !0
			}
		}
	}), n.SignupApp.OnboardingEmailAddressFormView = e.View.extend(
	{
		events: {
			"keypress .onboarding_email": "handleOnboardingEmailKeyPress",
			"keypress .launches_installer": "handleLaunchesInstallerKeyPress",
			"click .launches_installer": "validateOnboardingEmailAddressAndRedirect"
		},
		handleOnboardingEmailKeyPress: function (e)
		{
			13 === e.which && (t(".signup-form-button", this.$el).trigger("click"), e.preventDefault())
		},
		handleLaunchesInstallerKeyPress: function (e)
		{
			32 === e.which && (t(e.target).trigger("click"), e.preventDefault())
		},
		validateOnboardingEmailAddressAndRedirect: function (e)
		{
			e.preventDefault();
			var i = t(".onboarding_email", this.$el).val();
			if (this.onboarding_email_address = new n.SignupApp.OnboardingEmailAddress(
			{
				email: i
			}), this.onboarding_email_address.isValid())
			{
				this.$el.removeClass("signup-form-has-errors"), t(".onboarding_email", this.$el).focus();
				var o = "https://app.intercom.io/a/get_started/choose?email=" + i,
					r = t(e.target).data("package");
				r && (o += "&package=" + r), n.location.href = o
			}
			else this.$el.addClass("signup-form-has-errors"), t(".onboarding_email", this.$el).focus()
		}
	})
}(this.jQuery, this.Backbone, this._, this, this.document), function (t, e, i)
{
	"use strict";

	function n(e)
	{
		var i = t(e).parents(".signup-and-signin-form-wrapper").eq(0);
		if (!i.data("sending"))
		{
			i.data("sending", !0);
			var n = t("input[type=email]", i).val(),
				o = t(".signup-form", i);
			t(".mobile_signup_button", o).html("Sending..."), t.ajax(
			{
				url: "/mobile-signup",
				type: "POST",
				data: {
					email: n
				}
			}).fail(function ()
			{
				o.addClass("signup-form-has-errors")
			}).done(function ()
			{
				i.html("<p>Thanks! We\u2019ll send you an email to help you get started.</p>"), t.ajax(
				{
					url: "https://app.intercom.io/marketing_onboarding/onboarding_email_addresses",
					type: "POST",
					data: {
						email: n
					}
				})
			}), ga("send", "event", "button", "click", "open_installer_mobile")
		}
	}
	t(i).on("keypress", ".mobile_signup_input", function (e)
	{
		t(this).parents(".signup-form").removeClass("signup-form-has-errors"), 13 === e.which && (e.preventDefault(), n(this))
	}), t(i).on("click", ".mobile_signup_button", function (t)
	{
		t.preventDefault(), n(this)
	})
}(this.jQuery, this, this.document), function (t, e, i, n, o)
{
	"use strict";
	var r = e.Model.extend(
	{
		USER_TIER_TO_PRICE: {
			250: {
				fixed_prices: {
					base: 45,
					variable: .4
				},
				marginal_prices: {
					observe: {
						base: -45,
						variable: -.4
					},
					learn: {
						base: 4,
						variable: .3
					},
					support: {
						base: 4,
						variable: .5
					},
					engage: {
						base: 4,
						variable: .7
					},
					platform: {
						base: 12,
						variable: 1.5
					}
				},
				variable_lot_size: 50
			},
			1000: {
				fixed_prices: {
					base: 48,
					variable: 2.8
				},
				marginal_prices: {
					observe: {
						base: -48,
						variable: -2.8
					},
					learn: {
						base: 11,
						variable: .4
					},
					support: {
						base: 13,
						variable: 1
					},
					engage: {
						base: 15,
						variable: 2.4
					},
					platform: {
						base: 39,
						variable: 3.8
					}
				},
				variable_lot_size: 500
			},
			10000: {
				fixed_prices: {
					base: 70,
					variable: 34
				},
				marginal_prices: {
					observe: {
						base: -70,
						variable: -34
					},
					learn: {
						base: 15,
						variable: 7
					},
					support: {
						base: 25,
						variable: 17
					},
					engage: {
						base: 30,
						variable: 27
					},
					platform: {
						base: 70,
						variable: 51
					}
				},
				variable_lot_size: 5e3
			},
			100000: {
				fixed_prices: {
					base: 0,
					variable: 0
				},
				marginal_prices: {
					observe: {
						base: 0,
						variable: 0
					},
					learn: {
						base: 999999,
						variable: 999999
					},
					support: {
						base: 999999,
						variable: 999999
					},
					engage: {
						base: 999999,
						variable: 999999
					},
					platform: {
						base: 999999,
						variable: 999999
					}
				},
				variable_lot_size: 1
			}
		},
		initialize: function ()
		{
			this.listenTo(this, "change:user_count", this.updateCurrentPrices)
		},
		pricesFor: function (t, e)
		{
			if (this.currentPrices)
			{
				var i = this.currentPrices.fixed_prices,
					n = this.currentPrices.marginal_prices[t] || this.currentPrices.marginal_prices[e];
				return {
					base: i.base + n.base,
					variable: i.variable + n.variable,
					variable_lot_size: this.currentPrices.variable_lot_size
				}
			}
			return null
		},
		addSeparators: function (t)
		{
			return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		},
		updateCurrentPrices: function ()
		{
			this.currentPrices = this.USER_TIER_TO_PRICE[this.get("user_count")]
		}
	}),
		s = e.View.extend(
		{
			events: {
				"click li": "handleUserBracketSelected",
				"change .user-count-select": "handleUserSelectChange"
			},
			initialize: function ()
			{
				this.currentlySelected = t(".active", this.$el).data("user-bracket-id")
			},
			handleUserBracketSelected: function (e)
			{
				t(e.currentTarget).data("user-bracket-id") && this.selectUserBracket(t(e.currentTarget).data("user-bracket-id"))
			},
			handleUserSelectChange: function (e)
			{
				this.selectUserBracket(t(e.currentTarget).val())
			},
			selectUserBracket: function (e)
			{
				t("li", this.$el).removeClass("active"), t("li[data-user-bracket-id=" + e + "]", this.$el).addClass("active"), t(".user-count-select").val(e), t("#" + e).removeClass("hidden"), this.currentlySelected = e, this.model.set("user_count", this.currentlySelected)
			}
		}),
		a = e.View.extend(
		{
			events: {
				"click li": "handlePackageSelected"
			},
			initialize: function ()
			{
				this.listenTo(this.model, "change:user_count", this.handleSelectedUserCountChange), this.currentlySelected = t(".active", this.$el).data("package-id")
			},
			handlePackageSelected: function (e)
			{
				this.selectPackage(t(e.currentTarget).data("package-id"))
			},
			selectPackage: function (e)
			{
				t("li", this.$el).removeClass("active"), t("li[data-package-id=" + e + "]", this.$el).addClass("active"), t(".package-description-container").addClass("hidden"), t("#" + e).removeClass("hidden"), this.currentlySelected = e
			},
			handleSelectedUserCountChange: function ()
			{
				this.selectPackage(this.currentlySelected)
			}
		}),
		l = e.View.extend(
		{
			initialize: function ()
			{
				this.packageID = this.$el.parents("[data-package-id]").data("package-id"), this.fallbackID = this.$el.data("fallback"), this.listenTo(this.model, "change:user_count", this.handleSelectedUserCountChange), this.listenTo(this.model, "change:user_count", this.showSelectedUsers)
			},
			handleSelectedUserCountChange: function ()
			{
				var e = this.model.pricesFor(this.packageID, this.fallbackID);
				if (null !== e) if (e.base >= 999999) t(".price-wrap,.price-container.package-summary-price-container, .starting-from, .base-and-variable-price-container").hide(), t(".simple-price-container").html('<a href="/contact">Contact our sales team</a>').show(), t(".max-price-container").show();
				else if (0 === e.variable) switch (t(".price-wrap,.price-container.package-summary-price-container, .simple-price-container").show(), t(".max-price-container, .starting-from, .base-and-variable-price-container").hide(), this.$el[0].className)
				{
				case "simple-price":
					this.$el.html("$ " + e.base);
					break;
				case "simple-price-container":
					this.$el.html("$ " + e.base + " / month")
				}
				else
				{
					switch (this.$el[0].className)
					{
					case "simple-price":
						this.$el.html('<span class="dollar">$</span> ' + e.base);
						break;
					case "base-price":
						this.$el.html('<span class="dollar">$</span> ' + e.base);
						break;
					case "base-users":
						this.$el.html(u(this.model.get("user_count")));
						break;
					case "variable-price":
						this.$el.html('<span class="dollar">$</span> ' + d(e.variable));
						break;
					case "user-lot-size":
						this.$el.html(u(e.variable_lot_size))
					}
					t(".price-wrap,.price-container.package-summary-price-container, .starting-from, .base-and-variable-price-container").show(), t(".max-price-container, .simple-price-container").hide()
				}
			},
			showSelectedUsers: function ()
			{
				var e = t(".users-count");
				e.length && e.text(this.model.addSeparators(this.model.get("user_count")))
			}
		}),
		c = e.View.extend(
		{
			initialize: function ()
			{
				this.packageID = this.$el.parents("[data-package-id]").data("package-id"), this.listenTo(this.model, "change:user_count", this.handleSelectedUserCountChange)
			},
			handleSelectedUserCountChange: function ()
			{
				"observe" !== this.packageID && ("more" === this.model.get("user_count") ? this.$el.addClass("hidden") : this.$el.removeClass("hidden"))
			}
		}),
		u = function (t)
		{
			return 1e3 > t ? t : u(Math.floor(t / 1e3)) + "," + ("00" + t % 1e3).slice(-3)
		},
		d = function (t)
		{
			return t % 1 === 0 ? t : t.toFixed(2)
		};
	t(o).ready(function ()
	{
		t('[data-init="old-pricing"]').length && (n.selected_prices = new r, new s(
		{
			el: t(".customize-pricing"),
			model: n.selected_prices
		}), new a(
		{
			el: t(".package-selector"),
			model: n.selected_prices
		}), i.each(t(".simple-price,.base-price,.variable-price,.base-users,.user-lot-size,.simple-price-container"), function (e)
		{
			new l(
			{
				el: t(e),
				model: n.selected_prices
			})
		}), i.each(t(".signup"), function (e)
		{
			new c(
			{
				el: t(e),
				model: n.selected_prices
			})
		}), n.setTimeout(function ()
		{
			n.selected_prices.set("user_count", 1e3)
		}, 500))
	})
}(this.jQuery, this.Backbone, this._, this, this.document), function (t, e, i, n, o, r)
{
	"use strict";
	var s = function (t)
	{
		return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	},
		a = function (t)
		{
			return t.toFixed(2)
		},
		l = function (t)
		{
			return t.charAt(0).toUpperCase() + t.slice(1)
		},
		c = function (t)
		{
			var e = s(t);
			return "100,000" === e && (e = "> 50,000"), e
		},
		u = function ()
		{
			var e = t(".price-summary"),
				i = t(o).scrollTop(),
				n = t(".pricingv4-hero").outerHeight(),
				r = t(".footer").outerHeight(),
				s = t(o).height(),
				a = 60,
				l = 50,
				c = e.outerHeight();
			i + c + l + a > s - r ? (e.css("top", s - r - l - c), e.removeClass("stuck").addClass("above-footer")) : i > n ? (e.css("top", ""), e.removeClass("above-footer").addClass("stuck")) : (e.css("top", ""), e.removeClass("stuck").removeClass("above-footer"))
		},
		d = e.Model.extend(
		{
			PRICE_DATA_FOR_USER_TIER: {
				250: {
					requiresSales: !1,
					fixedPrices: {
						base: 45,
						variable: .4
					},
					marginalPrices: {
						observe: {
							base: -45,
							variable: -.4
						},
						learn: {
							base: 4,
							variable: .3
						},
						support: {
							base: 4,
							variable: .5
						},
						engage: {
							base: 4,
							variable: .7
						},
						platform: {
							base: 12,
							variable: 1.5
						}
					},
					variableLotSize: 50
				},
				1e3: {
					requiresSales: !1,
					fixedPrices: {
						base: 48,
						variable: 2.8
					},
					marginalPrices: {
						observe: {
							base: -48,
							variable: -2.8
						},
						learn: {
							base: 11,
							variable: .4
						},
						support: {
							base: 13,
							variable: 1
						},
						engage: {
							base: 15,
							variable: 2.4
						},
						platform: {
							base: 39,
							variable: 3.8
						}
					},
					variableLotSize: 500
				},
				1e4: {
					requiresSales: !1,
					fixedPrices: {
						base: 70,
						variable: 34
					},
					marginalPrices: {
						observe: {
							base: -70,
							variable: -34
						},
						learn: {
							base: 15,
							variable: 7
						},
						support: {
							base: 25,
							variable: 17
						},
						engage: {
							base: 30,
							variable: 27
						},
						platform: {
							base: 70,
							variable: 51
						}
					},
					variableLotSize: 5e3
				},
				5e4: {
					requiresSales: !0
				}
			},
			DEFAULT_USER_COUNT: 1e3,
			initialize: function ()
			{
				this.listenTo(this, "change:userCount", this.renderPrice), this.listenTo(this, "change:packageName", this.renderPrice), this.set("userCount", this.DEFAULT_USER_COUNT), t("#slider").simpleSlider("setValue", this.DEFAULT_USER_COUNT)
			},
			userTierForCount: function (t)
			{
				return 1e3 >= t ? 250 : 1e4 >= t ? 1e3 : 5e4 >= t ? 1e4 : 5e4
			},
			currentSelectionPrice: function ()
			{
				var t = this.get("userCount"),
					e = this.get("packageName");
				if (t && e)
				{
					if ("observe" === e) return 0;
					var i = this.userTierForCount(t),
						n = this.PRICE_DATA_FOR_USER_TIER[i];
					if (n.requiresSales) return "custom";
					var o = n.fixedPrices,
						r = n.marginalPrices[e],
						s = o.base + r.base,
						a = o.variable + r.variable,
						l = Math.ceil((t - i) / n.variableLotSize);
					return s + a * l
				}
			},
			renderPrice: function ()
			{
				var e = this.currentSelectionPrice(),
					i = this.get("packageName");
				"custom" === e ? t(".price-summary").removeClass("price-summary-showing-self-serve").addClass("price-summary-showing-sales") : e !== r ? (t(".price-summary").removeClass("price-summary-showing-sales").addClass("price-summary-showing-self-serve"), t(".price-summary-price .figure").html(a(e)), t(".price-summary-user-count").html(c(this.get("userCount"))), "observe" === i ? (t(".price-not-observe").hide(), t(".price-observe").show()) : (t(".price-not-observe").show(), t(".price-observe").hide())) : t(".price-summary").removeClass("price-summary-showing-sales").removeClass("price-summary-showing-self-serve"), i && t(".price-summary-package-name").html(l(i)), u()
			}
		}),
		h = e.View.extend(
		{
			initialize: function ()
			{
				var e = this;
				t("[data-slider]").on("slider:ready slider:changed", function (t, i)
				{
					e.handleSliderChange(t, i)
				})
			},
			handleSliderChange: function (t, e)
			{
				this.setUserCount(e.value)
			},
			setUserCount: function (e)
			{
				t(".user-count-heading span").html(c(e)), this.model.set("userCount", e)
			}
		}),
		p = e.View.extend(
		{
			events: {
				"click .pricing-job-choice": "handlePackageSelected"
			},
			initialize: function ()
			{
				this.currentlySelected = t(".active", this.$el).data("package-id")
			},
			handlePackageSelected: function (e)
			{
				var i = t(e.currentTarget).data("package-id");
				t(".pricing-job-choice").removeClass("pricing-job-choice-selected"), t(e.currentTarget).addClass("pricing-job-choice-selected"), this.model.set("packageName", i)
			}
		});
	t(o).ready(function ()
	{
		t('[data-init="pricing"]').length && (n.suppressFixedHeader = !0, n.selectedPrices = new d, new h(
		{
			el: t(".user-count-selector-section"),
			model: n.selectedPrices
		}), new p(
		{
			el: t(".package-selector-section"),
			model: n.selectedPrices
		}), t(o).on("scroll", u), t(o).on("ajax:success", ".price-summary-sales form", function ()
		{
			t(".price-summary-sales form").hide(), t(".sales-form-success").show(), n.ga("send", "event", "button", "click", "contact_us-submission")
		}), t(".get-started-form").on("submit", function (e)
		{
			e.preventDefault();
			var i = t(e.target).find('input[name="email"]').val(),
				o = "https://app.intercom.io/a/get_started/choose?email=" + i,
				r = n.selectedPrices.packageName;
			r && (o += "&package=" + r), n.location.href = o
		}), u())
	})
}(this.jQuery, this.Backbone, this._, this, this.document), function (t, e, i)
{
	"use strict";
	var n = e.Model.extend(
	{
		USER_COUNT_TO_PRICE: {
			"30,000": "$99",
			"50,000": "$109",
			"100,000": "$149",
			"150,000": "$219",
			"200,000": "$299",
			"250,000": "$399",
			"350,000": "$549",
			"500,000": "$699",
			more: "contact-sales"
		},
		getCurrent: function ()
		{
			return this.USER_COUNT_TO_PRICE[this.get("user_count")]
		}
	}),
		o = e.View.extend(
		{
			events: {
				"click .mobile-user-bracket": "onUserBracketClicked",
				"change .user-count-select": "onUserSelectChanged"
			},
			initialize: function ()
			{
				this.listenTo(this.model, "change:user_count", this.onUserCountChanged), this.$slider = this.$(".mobile-user-selector-slider"), this.$select = this.$(".mobile-user-count-select"), this.createUserBracketIndex(), this.userSliderWidth = this.$slider.outerWidth(), this.bindDraggable()
			},
			createUserBracketIndex: function ()
			{
				this.userBracketCenterPositionIndex =
				{
				}, this.userBracketSizeIndex =
				{
				};
				var e = this.$el.offset().left;
				i.each(this.$(".mobile-user-bracket"), function (i)
				{
					i = t(i);
					var n = i.find("span"),
						o = n.offset().left - e + n.outerWidth() / 2;
					this.userBracketCenterPositionIndex[o] = i, this.userBracketSizeIndex[i.data("user-bracket-size")] = o
				}, this)
			},
			updateSelectedUserCount: function (e, i)
			{
				if (t(".user-count-select").val(e), this.currentUsersCount = e, this.model.set("user_count", e), i)
				{
					var n = this.userBracketSizeIndex[e];
					this.snapSliderToPoint(n)
				}
			},
			bindDraggable: function ()
			{
				this.$slider.draggable(
				{
					axis: "x",
					containment: "parent",
					drag: i.bind(this.onSliderDragged, this, !1),
					stop: i.bind(this.onSliderDragged, this, !0)
				})
			},
			onSliderDragged: function (t, e, n)
			{
				var o, r;
				i.each(this.userBracketCenterPositionIndex, function (t, e)
				{
					var i = Math.abs(e - (n.position.left + this.userSliderWidth / 2));
					(!o || o > i) && (o = i, r = this.userBracketCenterPositionIndex[e])
				}, this), this.updateSelectedUserCount(r.data("user-bracket-size"), t)
			},
			onUserSelectChanged: function (e)
			{
				e.preventDefault();
				var i = t(e.currentTarget).val();
				this.updateSelectedUserCount(i, !0)
			},
			onUserBracketClicked: function (e)
			{
				e.preventDefault();
				var i = t(e.currentTarget).data("user-bracket-size");
				this.updateSelectedUserCount(i, !0)
			},
			onUserCountChanged: function (t)
			{
				var e = t.get("user_count"),
					i = "more" === e;
				this.$(".mobile-users-count").text(e), this.$(".mobile-price-wrap").toggle(!i), this.$(".mobile-contact-sales").toggle(i), this.updateSelectedUserCount(e, e !== this.currentUsersCount)
			},
			snapSliderToPoint: function (t)
			{
				this.$slider.animate(
				{
					left: t - this.userSliderWidth / 2 - 1
				}, "fast")
			}
		}),
		r = e.View.extend(
		{
			initialize: function ()
			{
				this.listenTo(this.model, "change:user_count", this.onPriceChanged)
			},
			onPriceChanged: function ()
			{
				var t = this.model.getCurrent();
				t && this.$el.html(t.replace(/\$/, "<span>$</span>"))
			}
		});
	t(function ()
	{
		var e = new n;
		i.each(t(".mobile-pricing"), function (t)
		{
			new o(
			{
				el: t,
				model: e
			})
		}), i.each(t(".mobile-price-strikethrough"), function (i)
		{
			new r(
			{
				el: t(i),
				model: e
			})
		}), e.set("user_count", "30,000")
	})
}(this.jQuery, this.Backbone, this._, this, this.document), function (t, e, i)
{
	"use strict";

	function n()
	{
		var t = void 0 !== e.pageYOffset ? e.pageYOffset : (i.documentElement || i.body.parentNode || i.body).scrollTop;
		r.recalculateAll(), r.scrollCheck(t)
	}
	var o = function (t, e, i)
	{
		var n;
		return function ()
		{
			var o = this,
				r = arguments,
				s = function ()
				{
					n = null, i || t.apply(o, r)
				},
				a = i && !n;
			clearTimeout(n), n = setTimeout(s, e), a && t.apply(o, r)
		}
	},
		r =
		{
			bindings: {
			},
			counter: 0
		};
	!
	function (t)
	{
		function n(t)
		{
			return parseInt(t, 10) / 100
		}
		var o = 0;
		t.add = function (e, i, n, o)
		{
			void 0 === n && (n = "25%"), void 0 === o && (o = !1), t.bindings[t.counter] =
			{
				el: e,
				fn: i,
				visible: n,
				remove: o
			}, t.refreshScrollInfo(t.counter), t.counter += 1
		}, t.remove = function (e)
		{
			delete t.bindings[e]
		}, t.refreshScrollInfo = function (e)
		{
			var i = t.bindings[e];
			i.height = i.el.outerHeight(), i.top = i.el.offset().top, i.visiblePixels = "string" == typeof i.visible ? i.height * n(i.visible) : i.visible, i.scrolledToFromBottomPoint = Math.floor(i.top + i.visiblePixels), i.scrolledToFromTopPoint = Math.floor(i.top + i.height - i.visiblePixels)
		}, t.recalculateAll = function ()
		{
			t.recalculateBrowserHeight();
			for (var e in t.bindings) t.refreshScrollInfo(e)
		}, t.recalculateBrowserHeight = function ()
		{
			o = e.innerHeight || i.documentElement.clientHeight || i.getElementsByTagName("body")[0].clientHeight
		}, t.inView = function (t, e)
		{
			var i = t.top < e + .2 * o && t.top + t.visiblePixels > e + .8 * o,
				n = e + o > t.scrolledToFromBottomPoint,
				r = e < t.scrolledToFromTopPoint;
			return i || r && n
		}, t.scrollCheck = function (e)
		{
			var i;
			for (var n in t.bindings) i = t.bindings[n], t.inView(i, e) && (i.fn(i.el), i.remove && t.remove(n))
		}
	}(r);
	var s = function (e, i, n)
	{
		e = t(e), 0 !== e.length && r.add(e, i, n)
	};
	t(e).on("resize", o(function ()
	{
		r.recalculateAll()
	}, 250)), t(i).on("ready", function ()
	{
		r.recalculateBrowserHeight(), n()
	}), t(e).on("scroll", o(n, 250)), e.onScrollToDo = s
}(jQuery, window, document), function (t, e)
{
	"use strict";

	function i(e)
	{
		t(e).length && ("undefined" != typeof n && "function" == typeof n.get && "function" == typeof n.get(0).pause && n.each(function ()
		{
			this.pause()
		}), n = t(e).get(0), r = n.hasAttribute("loop"), o = "true" === n.getAttribute("data:hasPlayed"), s || !r && o || (n = t(e), n.each(function ()
		{
			this.play()
		})))
	}
	var n, o, r, s = navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
	t("video:not(.looping-background-video)").on("ended", function ()
	{
		this.setAttribute("data:hasPlayed", "true")
	}), e.playOnlyThisVideo = i
}(jQuery, window, document), $(function ()
{
	"use strict";

	function t(t)
	{
		var e = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return e.test(t)
	}
	function e()
	{
		$(".slider").length > 0 && window.initSlider()
	}
	$(document).on("focus", ".signup-form input", function ()
	{
		$(this).parents(".signup-form").addClass("signup-form-has-focus")
	}), $(document).on("blur", ".signup-form input", function ()
	{
		$(this).parents(".signup-form").removeClass("signup-form-has-focus")
	}), $(document).on("click", "#Pricing", function ()
	{
		try
		{
			window.__adroll.record_user(
			{
				adroll_segments: "use_cases"
			})
		}
		catch (t)
		{
		}
	}), $(document).on("submit", ".ios-signup-wrapper form", function (e)
	{
		var i = $(this),
			n = $("input", i);
		t(n.val()) ? i.removeClass("signup-form-has-errors") : (i.addClass("signup-form-has-errors"), e.preventDefault()), n.focus()
	}), "function" == typeof $.fn.tooltip && $(".pricing-block .tooltip").tooltip(), window.killSlider = function ()
	{
		window.sliderActive = !1
	}, window.initSlider = function ()
	{
		function t()
		{
			for (var t, e = h; e >= 0 && !c[e].shuffled; e--) t = c[e], t.left + b + t.width < 0 && (t.left = t.left + d, t.ref.css("left", t.left), t.shuffled = !0)
		}
		function e()
		{
			if (window.sliderActive)
			{
				t();
				var i, o = (h + 1) % c.length;
				i = c[o].completed ?
				function ()
				{
					n(), e()
				} : e;
				var s = Math.ceil((c[h].width + c[o].width) / 2);
				b -= s, c[h].completed = !0, h = o, r.animate(
				{
					left: b
				}, 150, "linear"), window.setTimeout(i, u)
			}
		}
		function i()
		{
			window.setTimeout(e, u)
		}
		function n()
		{
			r.css("left", 0), b = 0;
			for (var t = 0, e = c.length; e > t; t++) c[t].completed = !1, c[t].shuffled = !1, c[t].left = c[t].original_left, c[t].ref.css("left", c[t].left)
		}
		var o = $(".slider"),
			r = $(".slider-inner", o),
			s = $("img", r),
			a = o.width(),
			l = Math.round(a / 2),
			c = [],
			u = 5e3;
		window.sliderActive = !0, s.each(function (t)
		{
			var e = $(this),
				i =
				{
					width: e.width(),
					height: e.height(),
					ref: e,
					completed: !1,
					shuffled: !1
				};
			c[t] = i, e.width(i.width), e.height(i.height)
		});
		for (var d = 0, h = Math.floor(c.length / 2), p = 0, f = c.length; f > p && l > d; p++) d += c[p].width, d >= l && (h = p);
		var g = 0;
		for (p = 0; h > p; p++) g += c[p].width;
		var m, v = l - Math.floor(c[h].width / 2),
			y = g - v;
		for (d = 0, p = 0, f = c.length; f > p; p++) m = d - y, c[p].ref.css(
		{
			left: m,
			top: 0,
			position: "absolute",
			"float": "none"
		}), c[p].left = m, c[p].original_left = m, d += c[p].width;
		var b = 0;
		o.animate(
		{
			opacity: 1
		}, 500, "linear", i)
	}, $(document).ready(e), $(document).on("page:load", function ()
	{
		window.killSlider(), e()
	}), $(document).on("ajax:success", ".contact-us-form form", function ()
	{
		$(".contact-us-form form").hide(), $(".contact_form_success").show(), window.ga("send", "event", "button", "click", "contact_us-submission")
	}), $(document).on("ajax:error", ".contact-us-form form", function ()
	{
		var t = $(".contact-us-form form .errors");
		t.html("Please fill in all required fields"), t.show()
	}), $(document).on("click", "[data-track-start-tour]", function ()
	{
		try
		{
			window.__adroll.record_user(
			{
				adroll_segments: "start_tour"
			})
		}
		catch (t)
		{
		}
	}), $(document).on("click", ".switcher-buttons .button", function (t)
	{
		t.preventDefault();
		var e = $(this),
			i = e.parents(".switcher").eq(0),
			n = $(".green-button", i),
			o = $(".switching-element-active", i),
			r = $(e.attr("href"), i);
		n.removeClass("green-button").addClass("gray-button"), e.removeClass("gray-button").addClass("green-button");
		var s = $("video", o).get(0);
		return s.currentTime = 1e3, o.removeClass("switching-element-active").addClass("switching-element"), r.removeClass("switching-element").addClass("switching-element-active"), window.playOnlyThisVideo($("video", r)), !1
	}), window.App.fn.loadBlogPosts = function ()
	{
		$.get("/blog-posts?number=2", function (t)
		{
			$("#BlogPosts").html(t)
		})
	}, window.App.fn.loadBlogPosts(), $('[data-autoplay="contents"]').each(function ()
	{
		window.onScrollToDo(this, function (t)
		{
			window.playOnlyThisVideo($("video", t))
		}, "100%")
	}), $("[data-visible]").each(function ()
	{
		var t = $(this).data("visible") || "100%";
		window.onScrollToDo(this, function (t)
		{
			$(t).addClass("element-visible")
		}, t)
	}), $('video[data-autoplay="this"]').each(function ()
	{
		var t = this.getAttribute("data-autoplay-shown-amount");
		void 0 === t && (t = "100%"), window.onScrollToDo(this, function (t)
		{
			window.playOnlyThisVideo(t)
		}, t)
	}), $("[data-toggle]").on("click.app", function (t)
	{
		t.preventDefault();
		var e = $(this),
			i = e.attr("href");
		e.toggleClass("open"), $(i).toggleClass("collapsed")
	}), navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) && $('[data-poster="no-safari"]').attr("poster", ""), navigator.userAgent.match(/(iPad|iPhone|iPod)/g) && $("body").addClass("ios"), $(".same-height").matchHeight(), $(window).load(function ()
	{
		$('[data-carousel="single"] .module-featured-customer').matchHeight(!1);
		var t = $('[data-carousel="single"]').slick(
		{
			autoplay: !0,
			autoplaySpeed: 1e4,
			dots: !0,
			draggable: !1,
			infinite: !1,
			pauseOnHover: !1,
			slide: ".item",
			slidesToShow: 1,
			speed: 500
		});
		$('[data-carousel="single"]').on("click.app", ".slick-dots li", function ()
		{
			t.slickPause()
		})
	}), $('[data-carousel="multiple"]').slick(
	{
		autoplay: !0,
		autoplaySpeed: 5e3,
		centerPadding: "0",
		infinite: !0,
		slide: ".item",
		slidesToShow: 3,
		responsive: [
		{
			breakpoint: 860,
			settings: {
				slidesToShow: 2
			}}, {
			breakpoint: 480,
			settings: {
				slidesToShow: 1
			}}]
	}), function ()
	{
		var t;
		$("[data-filter]").on("click.app", function (e)
		{
			e.preventDefault();
			var i = $(this),
				n = $(".filter-container .item");
			i.hasClass("active") || ($("[data-filter]").removeClass("active"), i.addClass("active"), n.addClass("fade-out"), window.clearTimeout(t), t = window.setTimeout(function ()
			{
				n.addClass("hidden");
				var t = n.filter(i.data("filter"));
				t.removeClass("hidden"), window.setTimeout(function ()
				{
					t.removeClass("fade-out")
				}, 10)
			}, 300))
		})
	}(), $("[data-popup]").on("click.app", function (t)
	{
		t.preventDefault();
		var e = $(window).width() / 2 - 350,
			i = $(window).height() / 2 - 250;
		window.open($(this).attr("href"), $(this).data("share"), "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=700, height=500, top=" + i + ", left=" + e)
	})
}), $(function ()
{
	"use strict";

	function t()
	{
		l.length && (o = u ? n : l.offset().top, r = l.outerHeight(), e())
	}
	function e()
	{
		var t = $('[data-active-link="true"]'),
			e =
			{
			};
		t.length && (t.each(function ()
		{
			var t = $(this).attr("href").replace(/^\//, ""),
				i = $(t);
			e[t] =
			{
				$el: $(this),
				start: window.Math.floor(i.offset().top) - (r + 2),
				stop: window.Math.floor(i.offset().top + i.outerHeight()) - (r + 2)
			}
		}), d = function (i)
		{
			t.removeClass("active"), $.each(e, function (t, e)
			{
				e.start < i && e.stop > i && e.$el.addClass("active")
			})
		})
	}
	function i()
	{
		function t()
		{
			window.clearInterval(e), c.removeClass("navigation-opened").removeClass("navigation-opened-done"), g.css("max-height", "")
		}
		if ($('[data-toggle="navigation"]').length)
		{
			var e, i;
			if ($('[data-toggle="navigation"]').on("click.navigation", function (t)
			{
				t.preventDefault()
			}), $('[data-toggle="navigation"]').on("click.navigation", function ()
			{
				window.clearInterval(e);
				var t = window.innerHeight - $(".fixed-header-inner").outerHeight() + "px";
				c.removeClass("navigation-opened-done"), c.hasClass("navigation-opened") ? (c.removeClass("navigation-opened"), g.css("max-height", "")) : (c.addClass("navigation-opened"), c.hasClass("fixed-mode") ? g.css("max-height", t) : g.css("max-height", "700px"), e = y(function ()
				{
					c.addClass("navigation-opened-done")
				}, f))
			}), !(window.Modernizr.touch || window.outerWidth <= window.mediumWidth))
			{
				var n, o, r, s = function ()
				{
					n = $('[data-toggle="navigation"]').offset().left + $('[data-toggle="navigation"]').outerWidth() + 20, o = $(".fixed-header-logo").offset().left + $(".fixed-header-logo").outerWidth() + 20, r = $(".header-navigation-wrap").offset().top
				};
				$('[data-toggle="navigation"]').on("mouseover.navigation", function (t)
				{
					t.preventDefault(), "arrow" !== t.originalEvent.target.className && (c.addClass("navigation-opened"), g.css("max-height", "700px"), window.clearInterval(e), window.clearInterval(i), e = y(function ()
					{
						c.addClass("navigation-opened-done")
					}, f))
				}), $(".header-navigation").on("mouseover.navigation", function ()
				{
					window.clearInterval(i)
				}), $(".fixed-header").on("mouseover.navigation", function (e)
				{
					e.preventDefault(), s(), e.pageY < r && (e.pageX < o || e.pageX > n) && (window.clearInterval(i), i = window.setTimeout(t, p))
				}), $(".fixed-header").on("click.navigation", function ()
				{
					c.hasClass("navigation-opened-done") && t()
				}), $(".fixed-header").on("mouseleave.navigation", t)
			}
		}
	}
	var n, o, r, s = window.App,
		a = !1,
		l = $($(".fixed-sub-header-holder").length ? ".fixed-sub-header-holder" : ".fixed-header-holder"),
		c = $("body"),
		u = $(".fixed-sub-header-holder").length ? !1 : !0,
		d = null,
		h = 600,
		p = 200,
		f = 400,
		g = $(".header-navigation");
	n = $(window).outerHeight() > 570 ? $("[data-active-main-header]").data("activeMainHeader") || h : h, $("[data-scroll=true]").on("click", function (t)
	{
		var e = this.href.split("#")[1],
			i = "#" + e,
			n = $(this).data("noHeader"),
			o = (void 0 === n ? r : 0) - 5,
			s = $(i);
		s.length && ($("html, body").animate(
		{
			scrollTop: s.offset().top - o
		}, 500, function ()
		{
			window.location.hash = i
		}), t.preventDefault())
	}), t(), $(window).on("load", t), s.events.resize.push(t), e();
	var m, v, y = function (t, e)
	{
		return e = e ? e : 600, window.setTimeout(t, u && window.Modernizr.cssanimations ? e : 1)
	},
		b = function ()
		{
			return c.hasClass("nav-sliding-out") || c.hasClass("nav-sliding-in")
		};
	$(window).on("scroll", function ()
	{
		if (!window.suppressFixedHeader)
		{
			var t = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
			a ? o >= t && !b() && (c.addClass("faster-sliding-navigation").addClass("nav-sliding-out").removeClass("navigation-opened-done").removeClass("navigation-opened"), g.css("max-height", ""), m = y(function ()
			{
				c.removeClass("faster-sliding-navigation").removeClass("fixed-mode").removeClass("nav-sliding-out"), a = !1
			})) : t > o && !b() && (g.css("max-height", ""), c.addClass("faster-sliding-navigation").removeClass("navigation-opened-done").removeClass("navigation-opened"), v = y(function ()
			{
				c.removeClass("faster-sliding-navigation").addClass("nav-sliding-in").addClass("fixed-mode"), a = !0
			}, 300), v = y(function ()
			{
				c.removeClass("nav-sliding-in")
			}, 900)), d && d(t)
		}
	}), i()
}), $(function ()
{
	"use strict";
	$(".lightbox").fancybox(
	{
		prevEffect: "none",
		nextEffect: "none",
		padding: 0,
		margin: [40, 20, 20, 20],
		helpers: {
			media: {
			},
			overlay: {
				css: {
					background: "rgba(255, 255, 255, 0.95)"
				}
			}
		},
		tpl: {
			wrap: '<div class="fancybox-wrap" tabIndex="-1"><h5></h5><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>'
		},
		afterLoad: function ()
		{
			var t = $(this.element).attr("rel");
			t && this.wrap.find("h5").text(t)
		}
	}), $(".video_lightbox").fancybox(
	{
		autosize: !1,
		type: "iframe",
		prevEffect: "none",
		nextEffect: "none",
		padding: 0,
		margin: 0,
		height: 504,
		width: 896,
		helpers: {
			media: {
			},
			overlay: {
				css: {
					background: "rgba(255, 255, 255, 0.95)"
				}
			}
		},
		tpl: {
			wrap: '<div class="fancybox-wrap" tabIndex="-1"><h5></h5><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>'
		}
	}), $('[data-lightbox="photo"]').fancybox(
	{
		hideOnContentClick: !0,
		padding: 0,
		helpers: {
			media: {
			},
			overlay: {
				css: {
					background: "rgba(255, 255, 255, 0.95)"
				}
			}
		},
		afterLoad: function ()
		{
			$(".fancybox-skin", this.wrap).css("padding-top", "50px")
		}
	}), $('[data-lightbox="inline"]').fancybox(
	{
		hideOnContentClick: !0,
		padding: 0,
		afterLoad: function ()
		{
			window.setTimeout(function ()
			{
				window.playOnlyThisVideo($(this.wrap).find("video"))
			}.bind(this), 100)
		}
	})
}), function (t)
{
	"use strict";
	var e = t.fancybox,
		i = function (e, i, n)
		{
			return n = n || "", "object" === t.type(n) && (n = t.param(n, !0)), t.each(i, function (t, i)
			{
				e = e.replace("$" + t, i || "")
			}), n.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + n), e
		};
	e.helpers.media =
	{
		defaults: {
			youtube: {
				matcher: /(youtube\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
				params: {
					autoplay: 1,
					autohide: 1,
					fs: 1,
					rel: 0,
					hd: 1,
					wmode: "opaque",
					enablejsapi: 1
				},
				type: "iframe",
				url: "//www.youtube.com/embed/$3"
			},
			vimeo: {
				matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
				params: {
					autoplay: 1,
					hd: 1,
					show_title: 1,
					show_byline: 1,
					show_portrait: 0,
					fullscreen: 1
				},
				type: "iframe",
				url: "//player.vimeo.com/video/$1"
			},
			metacafe: {
				matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
				params: {
					autoPlay: "yes"
				},
				type: "swf",
				url: function (e, i, n)
				{
					return n.swf.flashVars = "playerVars=" + t.param(i, !0), "//www.metacafe.com/fplayer/" + e[1] + "/.swf"
				}
			},
			dailymotion: {
				matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
				params: {
					additionalInfos: 0,
					autoStart: 1
				},
				type: "swf",
				url: "//www.dailymotion.com/swf/video/$1"
			},
			twitvid: {
				matcher: /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
				params: {
					autoplay: 0
				},
				type: "iframe",
				url: "//www.twitvid.com/embed.php?guid=$1"
			},
			twitpic: {
				matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
				type: "image",
				url: "//twitpic.com/show/full/$1/"
			},
			instagram: {
				matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
				type: "image",
				url: "//$1/p/$2/media/"
			},
			google_maps: {
				matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
				type: "iframe",
				url: function (t)
				{
					return "//maps.google." + t[1] + "/" + t[3] + t[4] + "&output=" + (t[4].indexOf("layer=c") > 0 ? "svembed" : "embed")
				}
			}
		},
		beforeLoad: function (e, n)
		{
			var o, r, s, a, l = n.href || "",
				c = !1;
			for (o in e) if (r = e[o], s = l.match(r.matcher))
			{
				c = r.type, a = t.extend(!0, {
				}, r.params, n[o] || (t.isPlainObject(e[o]) ? e[o].params : null)), l = "function" === t.type(r.url) ? r.url.call(this, s, a, n) : i(r.url, s, a);
				break
			}
			c && (n.href = l, n.type = c, n.autoHeight = !1)
		}
	}
}(jQuery), function ()
{
	"use strict";

	function t()
	{
		p = !0, o()
	}
	function e()
	{
		p = !1, n()
	}
	function i()
	{
		s($(this).prevAll(".customer-quotes-indicator").length)
	}
	function n()
	{
		
	}
	function o()
	{
		h && (h = !1, window.clearTimeout(d))
	}
	function r()
	{
		var t = l + 1;
		t > c && (t = 0), s(t)
	}
	function s(t)
	{
		o(), a.animate(
		{
			opacity: 0
		}, {
			duration: 200,
			complete: function ()
			{
				a.removeClass("customer-quote-is-active"), a = $(".customer-quote").eq(t), a.addClass("customer-quote-is-active"), l = t, $(".customer-quotes-indicator").removeClass("customer-quotes-indicator-is-active"), a.animate(
				{
					opacity: 1
				}, {
					duration: 200,
					complete: function ()
					{
						$(".customer-quotes-indicator").eq(l).addClass("customer-quotes-indicator-is-active"), p || n()
					}
				})
			}
		})
	}
	var a, l, c, u, d, h = !1,
		p = !1;
	window.initSlideshow = function ()
	{
		var n = $(".customer-quote");
		n.length < 2 || (u = n.eq(0), a = u, l = 0, c = n.length - 1, $(document).on("mouseenter", ".customer-quotes-inner", t), $(document).on("mouseleave", ".customer-quotes-inner", e), $(document).on("click", ".customer-quotes-indicator", i))
	}, window.resetSlideshow = function ()
	{
		o();
		var t = $(".customer-quote");
		t.removeClass("customer-quote-is-active"), t.eq(0).css("opacity", "1").addClass("customer-quote-is-active")
	}, $(document).on("ready", function ()
	{
		($(window).width() > window.smallWidth || $(".mobile-slideshow").length) && (window.initSlideshow(), window.onScrollToDo(".customer-quotes", n, "25%"))
	})
}(), function ()
{
	"use strict";

	function t()
	{
		r = $(".left-slide"), s = $(".active-slide"), a = $(".right-slide")
	}
	function e()
	{
		c.attr("href", "#" + r.attr("id")), l.attr("href", "#" + a.attr("id")), i()
	}
	function i()
	{
		$(".slideshow-controls .slide-caption").html($(".slide-caption", s).html())
	}
	function n()
	{
		r.removeClass("left-slide").addClass("right-slide"), s.removeClass("active-slide").addClass("left-slide"), a.removeClass("right-slide").addClass("active-slide"), t(), e()
	}
	function o()
	{
		r.removeClass("left-slide").addClass("active-slide"), s.removeClass("active-slide").addClass("right-slide"), a.removeClass("right-slide").addClass("left-slide"), t(), e()
	}
	var r, s, a, l, c;
	$(document).on("click", ".slideshow-controls-prev", function (t)
	{
		t.preventDefault(), o()
	}), $(document).on("click", ".slideshow-controls-next", function (t)
	{
		t.preventDefault(), n()
	}), $(document).on("click", ".slide", function (t)
	{
		t.preventDefault();
		var e = $(this);
		e.hasClass("left-slide") ? o() : e.hasClass("right-slide") && n()
	}), $(document).ready(function ()
	{
		t(), i(), l = $(".slideshow-controls-next"), c = $(".slideshow-controls-prev"), $(".slideshow-controls").addClass("slideshow-controls-active")
	})
}(), $(function ()
{
	"use strict";
	var t = window.App;
	t.fn.sticky =
	{
		settings: {
			init: !1,
			start: null,
			end: null,
			navOffset: 0,
			marginTop: 30,
			scrollingArea: 0,
			breakpoint: $("[data-sticky-breakpoint]").data("stickyBreakpoint") || window.mediumWidth,
			$wrapper: $("[data-sticky]"),
			$main: $(".main-content"),
			$body: $("body")
		},
		reset: function ()
		{
			var e = t.fn.sticky.settings;
			e.pippityOffset = 0, e.$wrapper.css("width", ""), e.$wrapper.css("top", ""), e.$body.removeClass("follow-fixed").removeClass("follow-sticked"), $(window).off("scroll.follow")
		},
		calculateSettings: function ()
		{
			var e = t.fn.sticky.settings;
			e.$wrapper.css("width", e.$wrapper.parent().width() + "px"), e.navOffset = $(".fixed-header").outerHeight(), e.start = e.$wrapper.offset().top - e.navOffset - e.marginTop, e.scrollingArea = e.$wrapper.outerHeight() + e.marginTop + e.navOffset, e.end = e.$main.offset().top + e.$main.outerHeight() - e.scrollingArea - 70
		},
		scroll: function ()
		{
			var e = t.fn.sticky.settings;
			$(window).on("scroll.follow", function ()
			{
				var t = window.scrollY || window.pageYOffset;
				t < e.start && e.$body.removeClass("follow-fixed").removeClass("follow-sticked"), t > e.start && (e.$body.addClass("follow-fixed").removeClass("follow-sticked"), e.$wrapper.css("top", e.navOffset + "px")), t > e.end && (e.$body.addClass("follow-sticked"), e.$wrapper.css("top", ""))
			})
		},
		init: function ()
		{
			var e = t.fn.sticky.settings;
			e.$wrapper.length && (t.fn.sticky.reset(), window.outerWidth < e.breakpoint || window.innerHeight < e.scrollingArea || (t.fn.sticky.calculateSettings(), t.fn.sticky.scroll(), $(window).trigger("scroll.follow")))
		}
	}, t.fn.sticky.init(), $(window).on("load.app", t.fn.sticky.init), t.events.resize.push(t.fn.sticky.init), window.setTimeout(t.fn.sticky.init, 1e3)
});
/*
 This is a manifest file that'll be compiled into application.js, which will include all the files
 listed below.

 Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
 or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.

 It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
 compiled file.

 Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
 about supported directives.








 */

;
