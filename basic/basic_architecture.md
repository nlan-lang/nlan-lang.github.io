# 基本架构<!-- {docsify-ignore} -->

下面是一个基本的 NLAN 语言程序：

<pre><code class="language-nlan match-braces rainbow-braces">
>>`NLAN v1.0.0{style: strict}`; 'This is importing the base package.'
int @{add,_+}(int $number1,$number2::Integer){ ''Define a command-block named add or _+.
	return ($number1+$number2)::int; 'Return the value of a+b.'
}
com @main::any(){
	obj $a, $b; ''There are two objects named a and b.
	@>_($a::int, $b::Integer); 'Input a and b.'
	[$a>`\0`]->@output(@_+($a,$b)); ''If a>0, output a+b.
	\->{<:$a<`\0`:>$a++;@output(@_+($a,$b));} ''Otherwise, a has been incremented by 1 until a is 0, and then output a+b.
	return success;
}
</code></pre>

