/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */
(function(){function e(e){this.tokens=[],this.tokens.links={},this.options=e||a.defaults,this.rules=p.normal,this.options.gfm&&(this.rules=this.options.tables?p.tables:p.gfm)}function t(e,t){if(this.options=t||a.defaults,this.links=e,this.rules=u.normal,this.renderer=this.options.renderer||new n,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.rules=this.options.breaks?u.breaks:u.gfm:this.options.pedantic&&(this.rules=u.pedantic)}function n(e){this.options=e||{}}function r(e){this.tokens=[],this.token=null,this.options=e||a.defaults,this.options.renderer=this.options.renderer||new n,this.renderer=this.options.renderer,this.renderer.options=this.options}function s(e,t){return e.replace(t?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function i(e){return e.replace(/&([#\w]+);/g,function(e,t){return t=t.toLowerCase(),"colon"===t?":":"#"===t.charAt(0)?String.fromCharCode("x"===t.charAt(1)?parseInt(t.substring(2),16):+t.substring(1)):""})}function l(e,t){return e=e.source,t=t||"",function n(r,s){return r?(s=s.source||s,s=s.replace(/(^|[^\[])\^/g,"$1"),e=e.replace(r,s),n):new RegExp(e,t)}}function o(){}function h(e){for(var t,n,r=1;r<arguments.length;r++){t=arguments[r];for(n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}function a(t,n,i){if(i||"function"==typeof n){i||(i=n,n=null),n=h({},a.defaults,n||{});var l,o,p=n.highlight,u=0;try{l=e.lex(t,n)}catch(c){return i(c)}o=l.length;var g=function(e){if(e)return n.highlight=p,i(e);var t;try{t=r.parse(l,n)}catch(s){e=s}return n.highlight=p,e?i(e):i(null,t)};if(!p||p.length<3)return g();if(delete n.highlight,!o)return g();for(;u<l.length;u++)!function(e){return"code"!==e.type?--o||g():p(e.text,e.lang,function(t,n){return t?g(t):null==n||n===e.text?--o||g():(e.text=n,e.escaped=!0,void(--o||g()))})}(l[u])}else try{return n&&(n=h({},a.defaults,n)),r.parse(e.lex(t,n),n)}catch(c){if(c.message+="\nPlease report this to https://github.com/chjj/marked.",(n||a.defaults).silent)return"<p>An error occured:</p><pre>"+s(c.message+"",!0)+"</pre>";throw c}}var p={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:o,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:o,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:o,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};p.bullet=/(?:[*+-]|\d+\.)/,p.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,p.item=l(p.item,"gm")(/bull/g,p.bullet)(),p.list=l(p.list)(/bull/g,p.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+p.def.source+")")(),p.blockquote=l(p.blockquote)("def",p.def)(),p._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b",p.html=l(p.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,p._tag)(),p.paragraph=l(p.paragraph)("hr",p.hr)("heading",p.heading)("lheading",p.lheading)("blockquote",p.blockquote)("tag","<"+p._tag)("def",p.def)(),p.normal=h({},p),p.gfm=h({},p.normal,{fences:/^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,paragraph:/^/}),p.gfm.paragraph=l(p.paragraph)("(?!","(?!"+p.gfm.fences.source.replace("\\1","\\2")+"|"+p.list.source.replace("\\1","\\3")+"|")(),p.tables=h({},p.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),e.rules=p,e.lex=function(t,n){var r=new e(n);return r.lex(t)},e.prototype.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(e,!0)},e.prototype.token=function(e,t,n){for(var r,s,i,l,o,h,a,u,c,e=e.replace(/^ +$/gm,"");e;)if((i=this.rules.newline.exec(e))&&(e=e.substring(i[0].length),i[0].length>1&&this.tokens.push({type:"space"})),i=this.rules.code.exec(e))e=e.substring(i[0].length),i=i[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?i:i.replace(/\n+$/,"")});else if(i=this.rules.fences.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"code",lang:i[2],text:i[3]});else if(i=this.rules.heading.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"heading",depth:i[1].length,text:i[2]});else if(t&&(i=this.rules.nptable.exec(e))){for(e=e.substring(i[0].length),h={type:"table",header:i[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:i[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:i[3].replace(/\n$/,"").split("\n")},u=0;u<h.align.length;u++)h.align[u]=/^ *-+: *$/.test(h.align[u])?"right":/^ *:-+: *$/.test(h.align[u])?"center":/^ *:-+ *$/.test(h.align[u])?"left":null;for(u=0;u<h.cells.length;u++)h.cells[u]=h.cells[u].split(/ *\| */);this.tokens.push(h)}else if(i=this.rules.lheading.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"heading",depth:"="===i[2]?1:2,text:i[1]});else if(i=this.rules.hr.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"hr"});else if(i=this.rules.blockquote.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"blockquote_start"}),i=i[0].replace(/^ *> ?/gm,""),this.token(i,t,!0),this.tokens.push({type:"blockquote_end"});else if(i=this.rules.list.exec(e)){for(e=e.substring(i[0].length),l=i[2],this.tokens.push({type:"list_start",ordered:l.length>1}),i=i[0].match(this.rules.item),r=!1,c=i.length,u=0;c>u;u++)h=i[u],a=h.length,h=h.replace(/^ *([*+-]|\d+\.) +/,""),~h.indexOf("\n ")&&(a-=h.length,h=this.options.pedantic?h.replace(/^ {1,4}/gm,""):h.replace(new RegExp("^ {1,"+a+"}","gm"),"")),this.options.smartLists&&u!==c-1&&(o=p.bullet.exec(i[u+1])[0],l===o||l.length>1&&o.length>1||(e=i.slice(u+1).join("\n")+e,u=c-1)),s=r||/\n\n(?!\s*$)/.test(h),u!==c-1&&(r="\n"===h.charAt(h.length-1),s||(s=r)),this.tokens.push({type:s?"loose_item_start":"list_item_start"}),this.token(h,!1,n),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(i=this.rules.html.exec(e))e=e.substring(i[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:"pre"===i[1]||"script"===i[1]||"style"===i[1],text:i[0]});else if(!n&&t&&(i=this.rules.def.exec(e)))e=e.substring(i[0].length),this.tokens.links[i[1].toLowerCase()]={href:i[2],title:i[3]};else if(t&&(i=this.rules.table.exec(e))){for(e=e.substring(i[0].length),h={type:"table",header:i[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:i[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:i[3].replace(/(?: *\| *)?\n$/,"").split("\n")},u=0;u<h.align.length;u++)h.align[u]=/^ *-+: *$/.test(h.align[u])?"right":/^ *:-+: *$/.test(h.align[u])?"center":/^ *:-+ *$/.test(h.align[u])?"left":null;for(u=0;u<h.cells.length;u++)h.cells[u]=h.cells[u].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(h)}else if(t&&(i=this.rules.paragraph.exec(e)))e=e.substring(i[0].length),this.tokens.push({type:"paragraph",text:"\n"===i[1].charAt(i[1].length-1)?i[1].slice(0,-1):i[1]});else if(i=this.rules.text.exec(e))e=e.substring(i[0].length),this.tokens.push({type:"text",text:i[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens};var u={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:o,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:o,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};u._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,u._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,u.link=l(u.link)("inside",u._inside)("href",u._href)(),u.reflink=l(u.reflink)("inside",u._inside)(),u.normal=h({},u),u.pedantic=h({},u.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),u.gfm=h({},u.normal,{escape:l(u.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:l(u.text)("]|","~]|")("|","|https?://|")()}),u.breaks=h({},u.gfm,{br:l(u.br)("{2,}","*")(),text:l(u.gfm.text)("{2,}","*")()}),t.rules=u,t.output=function(e,n,r){var s=new t(n,r);return s.output(e)},t.prototype.output=function(e){for(var t,n,r,i,l="";e;)if(i=this.rules.escape.exec(e))e=e.substring(i[0].length),l+=i[1];else if(i=this.rules.autolink.exec(e))e=e.substring(i[0].length),"@"===i[2]?(n=this.mangle(":"===i[1].charAt(6)?i[1].substring(7):i[1]),r=this.mangle("mailto:")+n):(n=s(i[1]),r=n),l+=this.renderer.link(r,null,n);else if(this.inLink||!(i=this.rules.url.exec(e))){if(i=this.rules.tag.exec(e))!this.inLink&&/^<a /i.test(i[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(i[0])&&(this.inLink=!1),e=e.substring(i[0].length),l+=this.options.sanitize?s(i[0]):i[0];else if(i=this.rules.link.exec(e))e=e.substring(i[0].length),this.inLink=!0,l+=this.outputLink(i,{href:i[2],title:i[3]}),this.inLink=!1;else if((i=this.rules.reflink.exec(e))||(i=this.rules.nolink.exec(e))){if(e=e.substring(i[0].length),t=(i[2]||i[1]).replace(/\s+/g," "),t=this.links[t.toLowerCase()],!t||!t.href){l+=i[0].charAt(0),e=i[0].substring(1)+e;continue}this.inLink=!0,l+=this.outputLink(i,t),this.inLink=!1}else if(i=this.rules.strong.exec(e))e=e.substring(i[0].length),l+=this.renderer.strong(this.output(i[2]||i[1]));else if(i=this.rules.em.exec(e))e=e.substring(i[0].length),l+=this.renderer.em(this.output(i[2]||i[1]));else if(i=this.rules.code.exec(e))e=e.substring(i[0].length),l+=this.renderer.codespan(s(i[2],!0));else if(i=this.rules.br.exec(e))e=e.substring(i[0].length),l+=this.renderer.br();else if(i=this.rules.del.exec(e))e=e.substring(i[0].length),l+=this.renderer.del(this.output(i[1]));else if(i=this.rules.text.exec(e))e=e.substring(i[0].length),l+=s(this.smartypants(i[0]));else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0))}else e=e.substring(i[0].length),n=s(i[1]),r=n,l+=this.renderer.link(r,null,n);return l},t.prototype.outputLink=function(e,t){var n=s(t.href),r=t.title?s(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(n,r,this.output(e[1])):this.renderer.image(n,r,s(e[1]))},t.prototype.smartypants=function(e){return this.options.smartypants?e.replace(/--/g,"—").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e},t.prototype.mangle=function(e){for(var t,n="",r=e.length,s=0;r>s;s++)t=e.charCodeAt(s),Math.random()>.5&&(t="x"+t.toString(16)),n+="&#"+t+";";return n},n.prototype.code=function(e,t,n){if(this.options.highlight){var r=this.options.highlight(e,t);null!=r&&r!==e&&(n=!0,e=r)}return t?'<pre><code class="'+this.options.langPrefix+s(t,!0)+'">'+(n?e:s(e,!0))+"\n</code></pre>\n":"<pre><code>"+(n?e:s(e,!0))+"\n</code></pre>"},n.prototype.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},n.prototype.html=function(e){return e},n.prototype.heading=function(e,t,n){return"<h"+t+' id="'+this.options.headerPrefix+n.toLowerCase().replace(/[^\w]+/g,"-")+'">'+e+"</h"+t+">\n"},n.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},n.prototype.list=function(e,t){var n=t?"ol":"ul";return"<"+n+">\n"+e+"</"+n+">\n"},n.prototype.listitem=function(e){return"<li>"+e+"</li>\n"},n.prototype.paragraph=function(e){return"<p>"+e+"</p>\n"},n.prototype.table=function(e,t){return"<table>\n<thead>\n"+e+"</thead>\n<tbody>\n"+t+"</tbody>\n</table>\n"},n.prototype.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},n.prototype.tablecell=function(e,t){var n=t.header?"th":"td",r=t.align?"<"+n+' style="text-align:'+t.align+'">':"<"+n+">";return r+e+"</"+n+">\n"},n.prototype.strong=function(e){return"<strong>"+e+"</strong>"},n.prototype.em=function(e){return"<em>"+e+"</em>"},n.prototype.codespan=function(e){return"<code>"+e+"</code>"},n.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},n.prototype.del=function(e){return"<del>"+e+"</del>"},n.prototype.link=function(e,t,n){if(this.options.sanitize){try{var r=decodeURIComponent(i(e)).replace(/[^\w:]/g,"").toLowerCase()}catch(s){return""}if(0===r.indexOf("javascript:")||0===r.indexOf("vbscript:"))return""}var l='<a href="'+e+'"';return t&&(l+=' title="'+t+'"'),l+=">"+n+"</a>"},n.prototype.image=function(e,t,n){var r='<img src="'+e+'" alt="'+n+'"';return t&&(r+=' title="'+t+'"'),r+=this.options.xhtml?"/>":">"},r.parse=function(e,t,n){var s=new r(t,n);return s.parse(e)},r.prototype.parse=function(e){this.inline=new t(e.links,this.options,this.renderer),this.tokens=e.reverse();for(var n="";this.next();)n+=this.tok();return n},r.prototype.next=function(){return this.token=this.tokens.pop()},r.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},r.prototype.parseText=function(){for(var e=this.token.text;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)},r.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var e,t,n,r,s,i="",l="";for(n="",e=0;e<this.token.header.length;e++)r={header:!0,align:this.token.align[e]},n+=this.renderer.tablecell(this.inline.output(this.token.header[e]),{header:!0,align:this.token.align[e]});for(i+=this.renderer.tablerow(n),e=0;e<this.token.cells.length;e++){for(t=this.token.cells[e],n="",s=0;s<t.length;s++)n+=this.renderer.tablecell(this.inline.output(t[s]),{header:!1,align:this.token.align[s]});l+=this.renderer.tablerow(n)}return this.renderer.table(i,l);case"blockquote_start":for(var l="";"blockquote_end"!==this.next().type;)l+=this.tok();return this.renderer.blockquote(l);case"list_start":for(var l="",o=this.token.ordered;"list_end"!==this.next().type;)l+=this.tok();return this.renderer.list(l,o);case"list_item_start":for(var l="";"list_item_end"!==this.next().type;)l+="text"===this.token.type?this.parseText():this.tok();return this.renderer.listitem(l);case"loose_item_start":for(var l="";"list_item_end"!==this.next().type;)l+=this.tok();return this.renderer.listitem(l);case"html":var h=this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);return this.renderer.html(h);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}},o.exec=o,a.options=a.setOptions=function(e){return h(a.defaults,e),a},a.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-",smartypants:!1,headerPrefix:"",renderer:new n,xhtml:!1},a.Parser=r,a.parser=r.parse,a.Renderer=n,a.Lexer=e,a.lexer=e.lex,a.InlineLexer=t,a.inlineLexer=t.output,a.parse=a,"undefined"!=typeof module&&"object"==typeof exports?module.exports=a:"function"==typeof define&&define.amd?define(function(){return a}):this.marked=a}).call(function(){return this||("undefined"!=typeof window?window:global)}());


// http://strapdownjs.com/

;(function(window, document) {

  //////////////////////////////////////////////////////////////////////
  //
  // Shims for IE < 9
  //

  document.head = document.getElementsByTagName('head')[0];

  if (!('getElementsByClassName' in document)) {
    document.getElementsByClassName = function(name) {
      function getElementsByClassName(node, classname) {
        var a = [];
        var re = new RegExp('(^| )'+classname+'( |$)');
        var els = node.getElementsByTagName("*");
        for(var i=0,j=els.length; i<j; i++) {
            if(re.test(els[i].className)) {
                a.push(els[i]);
            }
        }
        return a;
      }
      return getElementsByClassName(document.body, name);
    }
  }

  //////////////////////////////////////////////////////////////////////
  //
  // Get user elements we need
  //

  var markdownEl = document.getElementsByTagName('xmp')[0] || document.getElementsByTagName('textarea')[0],
      titleEl = document.getElementsByTagName('title')[0],
      scriptEls = document.getElementsByTagName('script'),
      navbarEl = document.getElementsByClassName('navbar')[0];

  if (!markdownEl) {
    return;
  }

  // Hide body until we're done fiddling with the DOM
  document.body.style.display = 'none';

  //////////////////////////////////////////////////////////////////////
  //
  // <head> stuff
  //

  // Use <meta> viewport so that Bootstrap is actually responsive on mobile
  var metaEl = document.createElement('meta');
  metaEl.name = 'viewport';
  metaEl.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0';
  if (document.head.firstChild) {
    document.head.insertBefore(metaEl, document.head.firstChild);
  } else {
    document.head.appendChild(metaEl);
  }

  // Get origin of script
  var origin = '';
  for (var i = 0; i < scriptEls.length; i++) {
    if (scriptEls[i].src.match('strapdown')) {
      origin = scriptEls[i].src;
    }
  }
  var originBase = origin.substr(0, origin.lastIndexOf('/'));


  // Stylesheets
  var linkEl = document.createElement('link');
  linkEl.href = originBase + '/strapdown.css';
  linkEl.rel = 'stylesheet';
  document.head.appendChild(linkEl);

  //////////////////////////////////////////////////////////////////////
  //
  // <body> stuff
  //

  var markdown = markdownEl.textContent || markdownEl.innerText;

  var newNode = document.createElement('div');
  newNode.className = 'container';
  newNode.id = 'content';
  document.body.replaceChild(newNode, markdownEl);

  // Insert navbar if there's none
  var newNode = document.createElement('div');
  newNode.className = 'navbar navbar-default navbar-fixed-top';
  if (!navbarEl && titleEl) {
    newNode.innerHTML = '<div class="container"><div class="navbar-header"><a href="/blog/" id="headline" class="navbar-brand">Bootswatch</a></div></div>';
    document.body.insertBefore(newNode, document.body.firstChild);
    var title = titleEl.innerHTML;
    var headlineEl = document.getElementById('headline');
    if (headlineEl) {
        headlineEl.innerHTML = title;
    }
  }

  //////////////////////////////////////////////////////////////////////
  //
  // Markdown!
  //

  // Generate Markdown
  var html = marked(markdown);
  document.getElementById('content').innerHTML = html;

  // Prettify
  var codeEls = document.getElementsByTagName('code');
  for (var i=0, ii=codeEls.length; i<ii; i++) {
    var codeEl = codeEls[i];
    var lang = codeEl.className;
    codeEl.className = 'prettyprint ' + lang;
  }
  

  // Style tables
  var tableEls = document.getElementsByTagName('table');
  for (var i=0, ii=tableEls.length; i<ii; i++) {
    var tableEl = tableEls[i];
    tableEl.className = 'table table-striped table-bordered';
  }

  // All done - show body
  document.body.style.display = '';


})(window, document);


// https://github.com/google/code-prettify
// Copyright (C) 2013 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

!function(){var r=null;
(function(){function X(e){function j(){try{K.doScroll("left")}catch(e){O(j,50);return}w("poll")}function w(j){if(!(j.type=="readystatechange"&&x.readyState!="complete")&&((j.type=="load"?n:x)[z](i+j.type,w,!1),!m&&(m=!0)))e.call(n,j.type||j)}var Y=x.addEventListener,m=!1,C=!0,t=Y?"addEventListener":"attachEvent",z=Y?"removeEventListener":"detachEvent",i=Y?"":"on";if(x.readyState=="complete")e.call(n,"lazy");else{if(x.createEventObject&&K.doScroll){try{C=!n.frameElement}catch(A){}C&&j()}x[t](i+"DOMContentLoaded",
w,!1);x[t](i+"readystatechange",w,!1);n[t](i+"load",w,!1)}}function P(){S&&X(function(){var e=Q.length;$(e?function(){for(var j=0;j<e;++j)(function(e){O(function(){n.exports[Q[e]].apply(n,arguments)},0)})(j)}:void 0)})}for(var n=window,O=n.setTimeout,x=document,K=x.documentElement,L=x.head||x.getElementsByTagName("head")[0]||K,z="",A=x.getElementsByTagName("script"),m=A.length;--m>=0;){var M=A[m],T=M.src.match(/^[^#?]*\/run_prettify\.js(\?[^#]*)?(?:#.*)?$/);if(T){z=T[1]||"";M.parentNode.removeChild(M);
break}}var S=!0,D=[],N=[],Q=[];z.replace(/[&?]([^&=]+)=([^&]+)/g,function(e,j,w){w=decodeURIComponent(w);j=decodeURIComponent(j);j=="autorun"?S=!/^[0fn]/i.test(w):j=="lang"?D.push(w):j=="skin"?N.push(w):j=="callback"&&Q.push(w)});m=0;for(z=D.length;m<z;++m)(function(){var e=x.createElement("script");e.onload=e.onerror=e.onreadystatechange=function(){if(e&&(!e.readyState||/loaded|complete/.test(e.readyState)))e.onerror=e.onload=e.onreadystatechange=r,--R,R||O(P,0),e.parentNode&&e.parentNode.removeChild(e),
e=r};e.type="text/javascript";e.src="https://cdn.rawgit.com/google/code-prettify/master/loader//lang-"+encodeURIComponent(D[m])+".js";L.insertBefore(e,L.firstChild)})(D[m]);for(var R=D.length,A=[],m=0,z=N.length;m<z;++m)A.push("https://cdn.rawgit.com/google/code-prettify/master/loader//skins/"+encodeURIComponent(N[m])+".css");(function(e){function j(m){if(m!==w){var n=x.createElement("link");n.rel="stylesheet";n.type=
"text/css";if(m+1<w)n.error=n.onerror=function(){j(m+1)};n.href=e[m];L.appendChild(n)}}var w=e.length;j(0)})(A);var $=function(){window.PR_SHOULD_USE_CONTINUATION=!0;var e;(function(){function j(a){function d(f){var b=f.charCodeAt(0);if(b!==92)return b;var a=f.charAt(1);return(b=i[a])?b:"0"<=a&&a<="7"?parseInt(f.substring(1),8):a==="u"||a==="x"?parseInt(f.substring(2),16):f.charCodeAt(1)}function h(f){if(f<32)return(f<16?"\\x0":"\\x")+f.toString(16);f=String.fromCharCode(f);return f==="\\"||f==="-"||
f==="]"||f==="^"?"\\"+f:f}function b(f){var b=f.substring(1,f.length-1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g),f=[],a=b[0]==="^",c=["["];a&&c.push("^");for(var a=a?1:0,g=b.length;a<g;++a){var k=b[a];if(/\\[bdsw]/i.test(k))c.push(k);else{var k=d(k),o;a+2<g&&"-"===b[a+1]?(o=d(b[a+2]),a+=2):o=k;f.push([k,o]);o<65||k>122||(o<65||k>90||f.push([Math.max(65,k)|32,Math.min(o,90)|32]),o<97||k>122||f.push([Math.max(97,k)&-33,Math.min(o,122)&-33]))}}f.sort(function(f,
a){return f[0]-a[0]||a[1]-f[1]});b=[];g=[];for(a=0;a<f.length;++a)k=f[a],k[0]<=g[1]+1?g[1]=Math.max(g[1],k[1]):b.push(g=k);for(a=0;a<b.length;++a)k=b[a],c.push(h(k[0])),k[1]>k[0]&&(k[1]+1>k[0]&&c.push("-"),c.push(h(k[1])));c.push("]");return c.join("")}function e(f){for(var a=f.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g),c=a.length,d=[],g=0,k=0;g<c;++g){var o=a[g];o==="("?++k:"\\"===o.charAt(0)&&(o=+o.substring(1))&&(o<=k?
d[o]=-1:a[g]=h(o))}for(g=1;g<d.length;++g)-1===d[g]&&(d[g]=++j);for(k=g=0;g<c;++g)o=a[g],o==="("?(++k,d[k]||(a[g]="(?:")):"\\"===o.charAt(0)&&(o=+o.substring(1))&&o<=k&&(a[g]="\\"+d[o]);for(g=0;g<c;++g)"^"===a[g]&&"^"!==a[g+1]&&(a[g]="");if(f.ignoreCase&&F)for(g=0;g<c;++g)o=a[g],f=o.charAt(0),o.length>=2&&f==="["?a[g]=b(o):f!=="\\"&&(a[g]=o.replace(/[A-Za-z]/g,function(a){a=a.charCodeAt(0);return"["+String.fromCharCode(a&-33,a|32)+"]"}));return a.join("")}for(var j=0,F=!1,l=!1,I=0,c=a.length;I<c;++I){var p=
a[I];if(p.ignoreCase)l=!0;else if(/[a-z]/i.test(p.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi,""))){F=!0;l=!1;break}}for(var i={b:8,t:9,n:10,v:11,f:12,r:13},q=[],I=0,c=a.length;I<c;++I){p=a[I];if(p.global||p.multiline)throw Error(""+p);q.push("(?:"+e(p)+")")}return RegExp(q.join("|"),l?"gi":"g")}function m(a,d){function h(a){var c=a.nodeType;if(c==1){if(!b.test(a.className)){for(c=a.firstChild;c;c=c.nextSibling)h(c);c=a.nodeName.toLowerCase();if("br"===c||"li"===c)e[l]="\n",F[l<<1]=j++,
F[l++<<1|1]=a}}else if(c==3||c==4)c=a.nodeValue,c.length&&(c=d?c.replace(/\r\n?/g,"\n"):c.replace(/[\t\n\r ]+/g," "),e[l]=c,F[l<<1]=j,j+=c.length,F[l++<<1|1]=a)}var b=/(?:^|\s)nocode(?:\s|$)/,e=[],j=0,F=[],l=0;h(a);return{a:e.join("").replace(/\n$/,""),d:F}}function n(a,d,h,b){d&&(a={a:d,e:a},h(a),b.push.apply(b,a.g))}function x(a){for(var d=void 0,h=a.firstChild;h;h=h.nextSibling)var b=h.nodeType,d=b===1?d?a:h:b===3?S.test(h.nodeValue)?a:d:d;return d===a?void 0:d}function C(a,d){function h(a){for(var l=
a.e,j=[l,"pln"],c=0,p=a.a.match(e)||[],m={},q=0,f=p.length;q<f;++q){var B=p[q],y=m[B],u=void 0,g;if(typeof y==="string")g=!1;else{var k=b[B.charAt(0)];if(k)u=B.match(k[1]),y=k[0];else{for(g=0;g<i;++g)if(k=d[g],u=B.match(k[1])){y=k[0];break}u||(y="pln")}if((g=y.length>=5&&"lang-"===y.substring(0,5))&&!(u&&typeof u[1]==="string"))g=!1,y="src";g||(m[B]=y)}k=c;c+=B.length;if(g){g=u[1];var o=B.indexOf(g),H=o+g.length;u[2]&&(H=B.length-u[2].length,o=H-g.length);y=y.substring(5);n(l+k,B.substring(0,o),h,
j);n(l+k+o,g,A(y,g),j);n(l+k+H,B.substring(H),h,j)}else j.push(l+k,y)}a.g=j}var b={},e;(function(){for(var h=a.concat(d),l=[],i={},c=0,p=h.length;c<p;++c){var m=h[c],q=m[3];if(q)for(var f=q.length;--f>=0;)b[q.charAt(f)]=m;m=m[1];q=""+m;i.hasOwnProperty(q)||(l.push(m),i[q]=r)}l.push(/[\S\s]/);e=j(l)})();var i=d.length;return h}function t(a){var d=[],h=[];a.tripleQuotedStrings?d.push(["str",/^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/,
r,"'\""]):a.multiLineStrings?d.push(["str",/^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/,r,"'\"`"]):d.push(["str",/^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/,r,"\"'"]);a.verbatimStrings&&h.push(["str",/^@"(?:[^"]|"")*(?:"|$)/,r]);var b=a.hashComments;b&&(a.cStyleComments?(b>1?d.push(["com",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,r,"#"]):d.push(["com",/^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\n\r]*)/,
r,"#"]),h.push(["str",/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,r])):d.push(["com",/^#[^\n\r]*/,r,"#"]));a.cStyleComments&&(h.push(["com",/^\/\/[^\n\r]*/,r]),h.push(["com",/^\/\*[\S\s]*?(?:\*\/|$)/,r]));if(b=a.regexLiterals){var e=(b=b>1?"":"\n\r")?".":"[\\S\\s]";h.push(["lang-regex",RegExp("^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*("+
("/(?=[^/*"+b+"])(?:[^/\\x5B\\x5C"+b+"]|\\x5C"+e+"|\\x5B(?:[^\\x5C\\x5D"+b+"]|\\x5C"+e+")*(?:\\x5D|$))+/")+")")])}(b=a.types)&&h.push(["typ",b]);b=(""+a.keywords).replace(/^ | $/g,"");b.length&&h.push(["kwd",RegExp("^(?:"+b.replace(/[\s,]+/g,"|")+")\\b"),r]);d.push(["pln",/^\s+/,r," \r\n\t\u00a0"]);b="^.[^\\s\\w.$@'\"`/\\\\]*";a.regexLiterals&&(b+="(?!s*/)");h.push(["lit",/^@[$_a-z][\w$@]*/i,r],["typ",/^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/,r],["pln",/^[$_a-z][\w$@]*/i,r],["lit",/^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i,
r,"0123456789"],["pln",/^\\[\S\s]?/,r],["pun",RegExp(b),r]);return C(d,h)}function z(a,d,h){function b(a){var c=a.nodeType;if(c==1&&!j.test(a.className))if("br"===a.nodeName)e(a),a.parentNode&&a.parentNode.removeChild(a);else for(a=a.firstChild;a;a=a.nextSibling)b(a);else if((c==3||c==4)&&h){var d=a.nodeValue,i=d.match(m);if(i)c=d.substring(0,i.index),a.nodeValue=c,(d=d.substring(i.index+i[0].length))&&a.parentNode.insertBefore(l.createTextNode(d),a.nextSibling),e(a),c||a.parentNode.removeChild(a)}}
function e(a){function b(a,c){var d=c?a.cloneNode(!1):a,f=a.parentNode;if(f){var f=b(f,1),h=a.nextSibling;f.appendChild(d);for(var e=h;e;e=h)h=e.nextSibling,f.appendChild(e)}return d}for(;!a.nextSibling;)if(a=a.parentNode,!a)return;for(var a=b(a.nextSibling,0),d;(d=a.parentNode)&&d.nodeType===1;)a=d;c.push(a)}for(var j=/(?:^|\s)nocode(?:\s|$)/,m=/\r\n?|\n/,l=a.ownerDocument,i=l.createElement("li");a.firstChild;)i.appendChild(a.firstChild);for(var c=[i],p=0;p<c.length;++p)b(c[p]);d===(d|0)&&c[0].setAttribute("value",
d);var n=l.createElement("ol");n.className="linenums";for(var d=Math.max(0,d-1|0)||0,p=0,q=c.length;p<q;++p)i=c[p],i.className="L"+(p+d)%10,i.firstChild||i.appendChild(l.createTextNode("\u00a0")),n.appendChild(i);a.appendChild(n)}function i(a,d){for(var h=d.length;--h>=0;){var b=d[h];U.hasOwnProperty(b)?V.console&&console.warn("cannot override language handler %s",b):U[b]=a}}function A(a,d){if(!a||!U.hasOwnProperty(a))a=/^\s*</.test(d)?"default-markup":"default-code";return U[a]}function D(a){var d=
a.h;try{var h=m(a.c,a.i),b=h.a;a.a=b;a.d=h.d;a.e=0;A(d,b)(a);var e=/\bMSIE\s(\d+)/.exec(navigator.userAgent),e=e&&+e[1]<=8,d=/\n/g,i=a.a,j=i.length,h=0,l=a.d,n=l.length,b=0,c=a.g,p=c.length,t=0;c[p]=j;var q,f;for(f=q=0;f<p;)c[f]!==c[f+2]?(c[q++]=c[f++],c[q++]=c[f++]):f+=2;p=q;for(f=q=0;f<p;){for(var x=c[f],y=c[f+1],u=f+2;u+2<=p&&c[u+1]===y;)u+=2;c[q++]=x;c[q++]=y;f=u}c.length=q;var g=a.c,k;if(g)k=g.style.display,g.style.display="none";try{for(;b<n;){var o=l[b+2]||j,H=c[t+2]||j,u=Math.min(o,H),E=l[b+
1],W;if(E.nodeType!==1&&(W=i.substring(h,u))){e&&(W=W.replace(d,"\r"));E.nodeValue=W;var Z=E.ownerDocument,s=Z.createElement("span");s.className=c[t+1];var z=E.parentNode;z.replaceChild(s,E);s.appendChild(E);h<o&&(l[b+1]=E=Z.createTextNode(i.substring(u,o)),z.insertBefore(E,s.nextSibling))}h=u;h>=o&&(b+=2);h>=H&&(t+=2)}}finally{if(g)g.style.display=k}}catch(v){V.console&&console.log(v&&v.stack||v)}}var V=window,G=["break,continue,do,else,for,if,return,while"],J=[[G,"auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],
"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],K=[J,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],Q=[J,"abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],
L=[J,"abstract,as,base,bool,by,byte,checked,decimal,delegate,descending,dynamic,event,finally,fixed,foreach,from,group,implicit,in,interface,internal,into,is,let,lock,null,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where"],J=[J,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],M=[G,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
N=[G,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],R=[G,"as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"],G=[G,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],P=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,
S=/\S/,T=t({keywords:[K,L,J,"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",M,N,G],hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),U={};i(T,["default-code"]);i(C([],[["pln",/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],["com",/^<\!--[\S\s]*?(?:--\>|$)/],["lang-",/^<\?([\S\s]+?)(?:\?>|$)/],["lang-",/^<%([\S\s]+?)(?:%>|$)/],["pun",/^(?:<[%?]|[%?]>)/],["lang-",
/^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),["default-markup","htm","html","mxml","xhtml","xml","xsl"]);i(C([["pln",/^\s+/,r," \t\r\n"],["atv",/^(?:"[^"]*"?|'[^']*'?)/,r,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],["pun",/^[/<->]+/],
["lang-js",/^on\w+\s*=\s*"([^"]+)"/i],["lang-js",/^on\w+\s*=\s*'([^']+)'/i],["lang-js",/^on\w+\s*=\s*([^\s"'>]+)/i],["lang-css",/^style\s*=\s*"([^"]+)"/i],["lang-css",/^style\s*=\s*'([^']+)'/i],["lang-css",/^style\s*=\s*([^\s"'>]+)/i]]),["in.tag"]);i(C([],[["atv",/^[\S\s]+/]]),["uq.val"]);i(t({keywords:K,hashComments:!0,cStyleComments:!0,types:P}),["c","cc","cpp","cxx","cyc","m"]);i(t({keywords:"null,true,false"}),["json"]);i(t({keywords:L,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:P}),
["cs"]);i(t({keywords:Q,cStyleComments:!0}),["java"]);i(t({keywords:G,hashComments:!0,multiLineStrings:!0}),["bash","bsh","csh","sh"]);i(t({keywords:M,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),["cv","py","python"]);i(t({keywords:"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",hashComments:!0,multiLineStrings:!0,regexLiterals:2}),["perl","pl","pm"]);i(t({keywords:N,
hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb","ruby"]);i(t({keywords:J,cStyleComments:!0,regexLiterals:!0}),["javascript","js"]);i(t({keywords:"all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]);i(t({keywords:R,cStyleComments:!0,multilineStrings:!0}),["rc","rs","rust"]);
i(C([],[["str",/^[\S\s]+/]]),["regex"]);var X=V.PR={createSimpleLexer:C,registerLangHandler:i,sourceDecorator:t,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:"com",PR_DECLARATION:"dec",PR_KEYWORD:"kwd",PR_LITERAL:"lit",PR_NOCODE:"nocode",PR_PLAIN:"pln",PR_PUNCTUATION:"pun",PR_SOURCE:"src",PR_STRING:"str",PR_TAG:"tag",PR_TYPE:"typ",prettyPrintOne:function(a,d,e){var b=document.createElement("div");b.innerHTML="<pre>"+a+"</pre>";b=b.firstChild;e&&z(b,e,!0);D({h:d,j:e,c:b,i:1});return b.innerHTML},
prettyPrint:e=e=function(a,d){function e(){for(var b=V.PR_SHOULD_USE_CONTINUATION?c.now()+250:Infinity;p<j.length&&c.now()<b;p++){for(var d=j[p],m=k,l=d;l=l.previousSibling;){var n=l.nodeType,s=(n===7||n===8)&&l.nodeValue;if(s?!/^\??prettify\b/.test(s):n!==3||/\S/.test(l.nodeValue))break;if(s){m={};s.replace(/\b(\w+)=([\w%+\-.:]+)/g,function(a,b,c){m[b]=c});break}}l=d.className;if((m!==k||f.test(l))&&!w.test(l)){n=!1;for(s=d.parentNode;s;s=s.parentNode)if(g.test(s.tagName)&&s.className&&f.test(s.className)){n=
!0;break}if(!n){d.className+=" prettyprinted";n=m.lang;if(!n){var n=l.match(q),A;if(!n&&(A=x(d))&&u.test(A.tagName))n=A.className.match(q);n&&(n=n[1])}if(y.test(d.tagName))s=1;else var s=d.currentStyle,v=i.defaultView,s=(s=s?s.whiteSpace:v&&v.getComputedStyle?v.getComputedStyle(d,r).getPropertyValue("white-space"):0)&&"pre"===s.substring(0,3);v=m.linenums;if(!(v=v==="true"||+v))v=(v=l.match(/\blinenums\b(?::(\d+))?/))?v[1]&&v[1].length?+v[1]:!0:!1;v&&z(d,v,s);t={h:n,c:d,j:v,i:s};D(t)}}}p<j.length?
O(e,250):"function"===typeof a&&a()}for(var b=d||document.body,i=b.ownerDocument||document,b=[b.getElementsByTagName("pre"),b.getElementsByTagName("code"),b.getElementsByTagName("xmp")],j=[],m=0;m<b.length;++m)for(var l=0,n=b[m].length;l<n;++l)j.push(b[m][l]);var b=r,c=Date;c.now||(c={now:function(){return+new Date}});var p=0,t,q=/\blang(?:uage)?-([\w.]+)(?!\S)/,f=/\bprettyprint\b/,w=/\bprettyprinted\b/,y=/pre|xmp/i,u=/^code$/i,g=/^(?:pre|code|xmp)$/i,k={};e()}};typeof define==="function"&&define.amd&&
define("google-code-prettify",[],function(){return X})})();return e}();R||O(P,0)})();}()