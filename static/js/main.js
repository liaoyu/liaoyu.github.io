// 应用的所有数据
var db = {
  posts: [
    {
      category: 'Top',
      items: [
        {
          url: 'bookmarks.html',
          datetime: '05-20-2015',
          title: '收藏夹'
        },
        {
          url: 'code-snippets.html',
          datetime: '05-20-2015',
          title: '代码片段'
        },
        {
          url: 'cmd-shortcuts.html',
          datetime: '05-20-2015',
          title: '命令行和快捷键'
        }
      ]
    }
  ],
  labs: [
    {
      category: 'Show me the code!',
      items: [
        {
          url: 'js-terminal/index.html',
          datetime: '2015-04-20',
          title: 'JavaScript Command Line Terminal'
        },
        {
          url: 'morse-code/index.html',
          datetime: '2015-03-14',
          title: 'Morse Code Translator'
        }
      ]
    },
    {
      category: 'Games',
      items: [
        {
          url: 'game/game-of-life.html',
          datetime: '2014-11-16',
          title: 'Game of Life'
        }
      ]
    },
    {
      category: 'Components',
      items: [
        {
          url: 'ccl-demo/',
          datetime: '2016-03-10',
          title: 'CommentCoreLibrary库实现弹幕'
        },
        {
          url: 'components/pure-css-image-slider.html',
          datetime: '2015-07-26',
          title: 'Image Slider (Pure CSS)'
        },
        {
          url: 'components/simple-drag.html',
          datetime: '2015-07-02',
          title: 'Simple Drag'
        },
        {
          url: 'components/image-slider.html',
          datetime: '2015-06-16',
          title: 'Image Slider'
        },
        {
          url: 'components/javascript-tabs.html',
          datetime: '2015-06-15',
          title: 'JavaScript Tabs'
        },
        {
          url: 'components/pure-css-multi-level-drop-down-menus.html',
          datetime: '2015-06-13',
          title: 'Multi-Level Drop Down Menus (Pure CSS)'
        },
        {
          url: 'components/multi-level-drop-down-menus.html',
          datetime: '2015-06-12',
          title: 'Multi-Level Drop Down Menus (Pure JavaScript)'
        },
        {
          url: 'components/simple-drop-down-menus.html',
          datetime: '2015-06-11',
          title: 'Simple Drop Down Menus (Pure JavaScript)'
        },
        {
          url: 'components/performance-rules-categories.html',
          datetime: '2015-06-09',
          title: 'Web Pages Performance Rules Categories'
        }
      ]
    },
    {
      category: 'Tools',
      items: [
        {
          url: 'tools/sentence-to-url.html',
          datetime: '2015-05-21',
          title: 'Parse English Sentences To URL'
        }
      ]
    }
  ]
}

// 导航栏
Vue.component('uu-nav', {
  template: `
    <header id="site-header">
        <div id="nav-bar">
            <a href="/" id="logo"><h1>L君还在说之乎者也</h1></a>
            <nav>
                <ul id="nav">
                    <li :class="{ curr: isBlog }"><a href="/blog/">Blog</a></li>
                    <li :class="{ curr: isLab }"><a href="/lab/">Lab</a></li>
                    <li :class="{ curr: isAbout }"><a href="/about/">About</a></li>
                </ul>
            </nav>
            <div style="clear: both;"></div>
        </div>
    </header>`,
    data() {
      const navObj = {
        isBlog: false,
        isLab: false,
        isAbout: false
      }

      if (this.curr) {
        let tmp = 'is' + this.curr[0].toUpperCase() + this.curr.slice(1);
        navObj[tmp] = true;
      }

      return navObj;
    },
    props: ['curr']
})

// 底部栏
Vue.component('uu-footer', {
  template: `
    <footer id="footer">
        <p>Copyright &copy; 2014-2016 . Powered by liaoyu.</p>
    </footer>`
})

// 实例化组件
new Vue({
  el: 'body',
  data: {
    posts: db.posts,
    labs: db.labs
  }
})