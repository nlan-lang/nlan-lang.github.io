(function (Prism) {
    var comment = /\'[\s\S]*?\'|\'\'.*|#(?!\[).*/;
    Prism.languages.nlan = {
        'comment':comment
    };
}(Prism));