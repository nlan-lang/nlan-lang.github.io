(function (Prism) {
    var comment = /\'\'.*|#(?!\[).*|\'[\s\S]+?\'/;
    var functions = {
        pattern: /(?<=@[\s]*\{[\s\S]*)[^,\s]+(?=[\s\S]*\}[\s]*\()|(?<=@[\s]*)([^\s\{\}\:]+?)(?=[\s]*\()|(?<=@[\s]*)[\S]+(?=[\s]*::)/i,
        lookbehind: false,
        greedy: true
    };
    var classname = {
        pattern: /(?<=(type|interface)[\s]+#?[\s]*)[^\s#:]*?(?=[\s]*[\{|::])|(?<=::[\s]*\{.*,[\s]*)[\S]+?(?=\W)|(?<=::[\s]*\{[\s]*)[\S]+?(?=\W)|(?<=::)[^\s\{]+?(?=\W)/i,
        lookbehind: false,
        greedy: true,
        alias: 'important'
    };
    var strings  = {
        pattern: /`[^\\]*?`|".*?"/i,
        greedy: true
    }
    Prism.languages.nlan = {
        'comment': comment,
        'function': functions,
        'class-name': classname,
        'string': strings
    };
}(Prism));