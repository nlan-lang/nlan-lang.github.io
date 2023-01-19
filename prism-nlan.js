(function (Prism) {
    var comment = /\'\'.*|#(?!\[).*|\'[\s\S]+?\'/;
    var functions = {
        pattern: /(?<=@\{[\s\S]*)[^,\s]+(?=[\s\S]*\}\()|(?<=@)([^\s\{\}\:]+?)(?=\()|(?<=@)[\S]+(?=::)/i,
        lookbehind: false,
        greedy: true
    };
    Prism.languages.nlan = {
        'comment': comment,
        'function': functions
    };
}(Prism));