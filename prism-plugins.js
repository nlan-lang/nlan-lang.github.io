(function () {

    if (typeof Prism === 'undefined' || typeof document === 'undefined') {
        return;
    }

    /**
     * Plugin name which is used as a class name for <pre> which is activating the plugin
     *
     * @type {string}
     */
    var PLUGIN_NAME = 'line-numbers';

    /**
     * Regular expression used for determining line breaks
     *
     * @type {RegExp}
     */
    var NEW_LINE_EXP = /\n(?!$)/g;


    /**
     * Global exports
     */
    var config = Prism.plugins.lineNumbers = {
        /**
         * Get node for provided line number
         *
         * @param {Element} element pre element
         * @param {number} number line number
         * @returns {Element|undefined}
         */
        getLine: function (element, number) {
            if (element.tagName !== 'PRE' || !element.classList.contains(PLUGIN_NAME)) {
                return;
            }

            var lineNumberRows = element.querySelector('.line-numbers-rows');
            if (!lineNumberRows) {
                return;
            }
            var lineNumberStart = parseInt(element.getAttribute('data-start'), 10) || 1;
            var lineNumberEnd = lineNumberStart + (lineNumberRows.children.length - 1);

            if (number < lineNumberStart) {
                number = lineNumberStart;
            }
            if (number > lineNumberEnd) {
                number = lineNumberEnd;
            }

            var lineIndex = number - lineNumberStart;

            return lineNumberRows.children[lineIndex];
        },

        /**
         * Resizes the line numbers of the given element.
         *
         * This function will not add line numbers. It will only resize existing ones.
         *
         * @param {HTMLElement} element A `<pre>` element with line numbers.
         * @returns {void}
         */
        resize: function (element) {
            resizeElements([element]);
        },

        /**
         * Whether the plugin can assume that the units font sizes and margins are not depended on the size of
         * the current viewport.
         *
         * Setting this to `true` will allow the plugin to do certain optimizations for better performance.
         *
         * Set this to `false` if you use any of the following CSS units: `vh`, `vw`, `vmin`, `vmax`.
         *
         * @type {boolean}
         */
        assumeViewportIndependence: true
    };

    /**
     * Resizes the given elements.
     *
     * @param {HTMLElement[]} elements
     */
    function resizeElements(elements) {
        elements = elements.filter(function (e) {
            var codeStyles = getStyles(e);
            var whiteSpace = codeStyles['white-space'];
            return whiteSpace === 'pre-wrap' || whiteSpace === 'pre-line';
        });

        if (elements.length == 0) {
            return;
        }

        var infos = elements.map(function (element) {
            var codeElement = element.querySelector('code');
            var lineNumbersWrapper = element.querySelector('.line-numbers-rows');
            if (!codeElement || !lineNumbersWrapper) {
                return undefined;
            }

            /** @type {HTMLElement} */
            var lineNumberSizer = element.querySelector('.line-numbers-sizer');
            var codeLines = codeElement.textContent.split(NEW_LINE_EXP);

            if (!lineNumberSizer) {
                lineNumberSizer = document.createElement('span');
                lineNumberSizer.className = 'line-numbers-sizer';

                codeElement.appendChild(lineNumberSizer);
            }

            lineNumberSizer.innerHTML = '0';
            lineNumberSizer.style.display = 'block';

            var oneLinerHeight = lineNumberSizer.getBoundingClientRect().height;
            lineNumberSizer.innerHTML = '';

            return {
                element: element,
                lines: codeLines,
                lineHeights: [],
                oneLinerHeight: oneLinerHeight,
                sizer: lineNumberSizer,
            };
        }).filter(Boolean);

        infos.forEach(function (info) {
            var lineNumberSizer = info.sizer;
            var lines = info.lines;
            var lineHeights = info.lineHeights;
            var oneLinerHeight = info.oneLinerHeight;

            lineHeights[lines.length - 1] = undefined;
            lines.forEach(function (line, index) {
                if (line && line.length > 1) {
                    var e = lineNumberSizer.appendChild(document.createElement('span'));
                    e.style.display = 'block';
                    e.textContent = line;
                } else {
                    lineHeights[index] = oneLinerHeight;
                }
            });
        });

        infos.forEach(function (info) {
            var lineNumberSizer = info.sizer;
            var lineHeights = info.lineHeights;

            var childIndex = 0;
            for (var i = 0; i < lineHeights.length; i++) {
                if (lineHeights[i] === undefined) {
                    lineHeights[i] = lineNumberSizer.children[childIndex++].getBoundingClientRect().height;
                }
            }
        });

        infos.forEach(function (info) {
            var lineNumberSizer = info.sizer;
            var wrapper = info.element.querySelector('.line-numbers-rows');

            lineNumberSizer.style.display = 'none';
            lineNumberSizer.innerHTML = '';

            info.lineHeights.forEach(function (height, lineNumber) {
                wrapper.children[lineNumber].style.height = height + 'px';
            });
        });
    }

    /**
     * Returns style declarations for the element
     *
     * @param {Element} element
     */
    function getStyles(element) {
        if (!element) {
            return null;
        }

        return window.getComputedStyle ? getComputedStyle(element) : (element.currentStyle || null);
    }

    var lastWidth = undefined;
    window.addEventListener('resize', function () {
        if (config.assumeViewportIndependence && lastWidth === window.innerWidth) {
            return;
        }
        lastWidth = window.innerWidth;

        resizeElements(Array.prototype.slice.call(document.querySelectorAll('pre.' + PLUGIN_NAME)));
    });

    Prism.hooks.add('complete', function (env) {
        if (!env.code) {
            return;
        }

        var code = /** @type {Element} */ (env.element);
        var pre = /** @type {HTMLElement} */ (code.parentNode);

        // works only for <code> wrapped inside <pre> (not inline)
        if (!pre || !/pre/i.test(pre.nodeName)) {
            return;
        }

        // Abort if line numbers already exists
        if (code.querySelector('.line-numbers-rows')) {
            return;
        }

        // only add line numbers if <code> or one of its ancestors has the `line-numbers` class
        if (!Prism.util.isActive(code, PLUGIN_NAME)) {
            return;
        }

        // Remove the class 'line-numbers' from the <code>
        code.classList.remove(PLUGIN_NAME);
        // Add the class 'line-numbers' to the <pre>
        pre.classList.add(PLUGIN_NAME);

        var match = env.code.match(NEW_LINE_EXP);
        var linesNum = match ? match.length + 1 : 1;
        var lineNumbersWrapper;

        var lines = new Array(linesNum + 1).join('<span></span>');

        lineNumbersWrapper = document.createElement('span');
        lineNumbersWrapper.setAttribute('aria-hidden', 'true');
        lineNumbersWrapper.className = 'line-numbers-rows';
        lineNumbersWrapper.innerHTML = lines;

        if (pre.hasAttribute('data-start')) {
            pre.style.counterReset = 'linenumber ' + (parseInt(pre.getAttribute('data-start'), 10) - 1);
        }

        env.element.appendChild(lineNumbersWrapper);

        resizeElements([pre]);

        Prism.hooks.run('line-numbers', env);
    });

    Prism.hooks.add('line-numbers', function (env) {
        env.plugins = env.plugins || {};
        env.plugins.lineNumbers = true;
    });

}());

(function () {

    if (typeof Prism === 'undefined' || typeof document === 'undefined') {
        return;
    }

    function mapClassName(name) {
        var customClass = Prism.plugins.customClass;
        if (customClass) {
            return customClass.apply(name, 'none');
        } else {
            return name;
        }
    }

    var PARTNER = {
        '(': ')',
        '[': ']',
        '{': '}',
    };

    // The names for brace types.
    // These names have two purposes: 1) they can be used for styling and 2) they are used to pair braces. Only braces
    // of the same type are paired.
    var NAMES = {
        '(': 'brace-round',
        '[': 'brace-square',
        '{': 'brace-curly',
    };

    // A map for brace aliases.
    // This is useful for when some braces have a prefix/suffix as part of the punctuation token.
    var BRACE_ALIAS_MAP = {
        '${': '{', // JS template punctuation (e.g. `foo ${bar + 1}`)
    };

    var LEVEL_WARP = 12;

    var pairIdCounter = 0;

    var BRACE_ID_PATTERN = /^(pair-\d+-)(close|open)$/;

    /**
     * Returns the brace partner given one brace of a brace pair.
     *
     * @param {HTMLElement} brace
     * @returns {HTMLElement}
     */
    function getPartnerBrace(brace) {
        var match = BRACE_ID_PATTERN.exec(brace.id);
        return document.querySelector('#' + match[1] + (match[2] == 'open' ? 'close' : 'open'));
    }

    /**
     * @this {HTMLElement}
     */
    function hoverBrace() {
        if (!Prism.util.isActive(this, 'brace-hover', true)) {
            return;
        }

        [this, getPartnerBrace(this)].forEach(function (e) {
            e.classList.add(mapClassName('brace-hover'));
        });
    }
    /**
     * @this {HTMLElement}
     */
    function leaveBrace() {
        [this, getPartnerBrace(this)].forEach(function (e) {
            e.classList.remove(mapClassName('brace-hover'));
        });
    }
    /**
     * @this {HTMLElement}
     */
    function clickBrace() {
        if (!Prism.util.isActive(this, 'brace-select', true)) {
            return;
        }

        [this, getPartnerBrace(this)].forEach(function (e) {
            e.classList.add(mapClassName('brace-selected'));
        });
    }

    Prism.hooks.add('complete', function (env) {

        /** @type {HTMLElement} */
        var code = env.element;
        var pre = code.parentElement;

        if (!pre || pre.tagName != 'PRE') {
            return;
        }

        // find the braces to match
        /** @type {string[]} */
        var toMatch = [];
        if (Prism.util.isActive(code, 'match-braces')) {
            toMatch.push('(', '[', '{');
        }

        if (toMatch.length == 0) {
            // nothing to match
            return;
        }

        if (!pre.__listenerAdded) {
            // code blocks might be highlighted more than once
            pre.addEventListener('mousedown', function removeBraceSelected() {
                // the code element might have been replaced
                var code = pre.querySelector('code');
                var className = mapClassName('brace-selected');
                Array.prototype.slice.call(code.querySelectorAll('.' + className)).forEach(function (e) {
                    e.classList.remove(className);
                });
            });
            Object.defineProperty(pre, '__listenerAdded', { value: true });
        }

        /** @type {HTMLSpanElement[]} */
        var punctuation = Array.prototype.slice.call(
            code.querySelectorAll('span.' + mapClassName('token') + '.' + mapClassName('punctuation'))
        );

        /** @type {{ index: number, open: boolean, element: HTMLElement }[]} */
        var allBraces = [];

        toMatch.forEach(function (open) {
            var close = PARTNER[open];
            var name = mapClassName(NAMES[open]);

            /** @type {[number, number][]} */
            var pairs = [];
            /** @type {number[]} */
            var openStack = [];

            for (var i = 0; i < punctuation.length; i++) {
                var element = punctuation[i];
                if (element.childElementCount == 0) {
                    var text = element.textContent;
                    text = BRACE_ALIAS_MAP[text] || text;
                    if (text === open) {
                        allBraces.push({ index: i, open: true, element: element });
                        element.classList.add(name);
                        element.classList.add(mapClassName('brace-open'));
                        openStack.push(i);
                    } else if (text === close) {
                        allBraces.push({ index: i, open: false, element: element });
                        element.classList.add(name);
                        element.classList.add(mapClassName('brace-close'));
                        if (openStack.length) {
                            pairs.push([i, openStack.pop()]);
                        }
                    }
                }
            }

            pairs.forEach(function (pair) {
                var pairId = 'pair-' + (pairIdCounter++) + '-';

                var opening = punctuation[pair[0]];
                var closing = punctuation[pair[1]];

                opening.id = pairId + 'open';
                closing.id = pairId + 'close';

                [opening, closing].forEach(function (e) {
                    e.addEventListener('mouseenter', hoverBrace);
                    e.addEventListener('mouseleave', leaveBrace);
                    e.addEventListener('click', clickBrace);
                });
            });
        });

        var level = 0;
        allBraces.sort(function (a, b) { return a.index - b.index; });
        allBraces.forEach(function (brace) {
            if (brace.open) {
                brace.element.classList.add(mapClassName('brace-level-' + (level % LEVEL_WARP + 1)));
                level++;
            } else {
                level = Math.max(0, level - 1);
                brace.element.classList.add(mapClassName('brace-level-' + (level % LEVEL_WARP + 1)));
            }
        });
    });

}());
