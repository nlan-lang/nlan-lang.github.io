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
    var strings = {
        pattern: /`[^\\]*?`|".*?"/i,
        greedy: true
    };
    var numbers = {
        pattern: /`\\.*?`|\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
        greedy:true
    };
    Prism.languages.nlan = {
        'comment': comment,
        'function': functions,
        'class-name': classname,
        'string': strings,
        'number': numbers
    };
}(Prism));