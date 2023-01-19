(function (Prism) {
    var comment = /\'\'.*|#(?!\[).*|\'[\s\S]+?\'/;
    Prism.languages.nlan = {
        'comment':comment
    };
    Prism.languages.insertBefore('nlan', 'keyword', {
        'generic-function': {
            pattern: /\b(?!operator\b)[a-z_@]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
            inside: {
                'function': /^\w+/,
                'generic': {
                    pattern: /<[\s\S]+/,
                    alias: 'class-name',
                    inside: Prism.languages.nlan
                }
            }
        }
    });
}(Prism));