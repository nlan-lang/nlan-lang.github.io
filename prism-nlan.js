(function (Prism) {
    var comment = /\'\'.*|#(?!\[).*|\'[\s\S]+?\'/;
    var functions = /(?<=@\{[\s\S]*)[^,\s]+(?=[\s\S]*\}\()|(?<=@)([^\s\{\}\:]+?)(?=\()|(?<=@)[\S]+(?=::)/i;
    Prism.languages.nlan = {
        'comment': comment,
        'function': functions
    };
}(Prism));