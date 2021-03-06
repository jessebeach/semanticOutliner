(function($){
  $.semanticOutline = function(settings){
    // Configuration
    var config = {
      root: 'body',
      headings: 'h1, h2, h3, h4, h5'
    };
    if (settings) {
      $.extend(config, settings);
    }
    // Functions
    var helpers = {
      _process: function(chapter) {
        if (chapter.elements) {
          chapter.elements.each(function () {
            // H1
            if ($(this).is(config.headings)) {
              var level = parseInt($(this)[0].localName.slice(1));
              // Check headings above the current heading item
              console.log('calling the outline builder');
              helpers._buildOutline(chapter.outline, chapter.counter, $(this).text(), level);
              // Reset all headers below this level
//              while (level < 5) {
//                chapter.counter['h'+(++level)] = 0;
//              }
            }
            // H2
//            if ($(this).is('h2')) {
//              helpers._checkHeadings(chapter.outline, chapter.counter, 2);
              // Increment if we have an h2 heading already
//              if (chapter.outline[chapter.counter.h1].outline[chapter.counter.h2]) {
//                chapter.counter.h2++;
//              }
//              chapter.outline[chapter.counter.h1].outline[chapter.counter.h2] = {
//                text: $(this).text(),
//                outline: [],
//                css: ""
//              };
              // Reset all headers below h2
//              chapter.counter.h3 = chapter.counter.h4 = chapter.counter.h5 = 0;
//            }
            // H3
//            if ($(this).is('h3')) {
//              helpers._checkHeadings(chapter.outline, chapter.counter, 3);
              // Increment if we have an h3 heading already
//              if (chapter.outline[chapter.counter.h1].outline[chapter.counter.h2].outline[chapter.counter.h3]) {
//                chapter.counter.h3++;
//              }
//              chapter.outline[chapter.counter.h1].outline[chapter.counter.h2].outline[chapter.counter.h3] = {
//                text: $(this).text(),
//                outline: [],
//                css: ""
//              };
              // Reset all headers below h3
//              chapter.counter.h4 = chapter.counter.h5 = 0;
//            }
            // H4
//            if ($(this).is('h4')) {
//              helpers._checkHeadings(chapter.outline, chapter.counter, 4);
              // Increment if we have an h4 heading already
//              if (chapter.outline[chapter.counter.h1].outline[chapter.counter.h2].outline[chapter.counter.h3].outline[chapter.counter.h4]) {
//                chapter.counter.h4++;
//              }
//              chapter.outline[chapter.counter.h1].outline[chapter.counter.h2].outline[chapter.counter.h3].outline[chapter.counter.h4] = {
//                text: $(this).text(),
//                outline: [],
//                css: ""
//              };
              // Reset all headers below h4
//              chapter.counter.h5 = 0;
//            }
            // H5
//            if ($(this).is('h5')) {
//              helpers._checkHeadings(chapter.outline, chapter.counter, 5);
              // Increment if we have an h5 heading already
//              if (chapter.outline[chapter.counter.h1].outline[chapter.counter.h2].outline[chapter.counter.h3].outline[chapter.counter.h4].outline[chapter.counter.h5]) {
//                chapter.counter.h4++;
//              }
//              chapter.outline[chapter.counter.h1].outline[chapter.counter.h2].outline[chapter.counter.h3].outline[chapter.counter.h4].outline[chapter.counter.h5] = {
//                text: $(this).text(),
//                outline: [],
//                css: ""
//              };
//            }
          });
        }
        return chapter;
      },
      // Render the HTML output container
      _render: function(outline) {
        var output = $('<div>', {
          id: "semantic-outline",
          html: function () {
            $(this).append(helpers._makeList(outline));
          }
        });
        return output;
      },
      // Make HTML lists
      _makeList: function (outline) {
        var len = outline.length;
        var output = $('<ul>');
        for (var i = 0; i < len; i ++ ) {
          output.append($('<li>', {}).addClass(outline[i].css));
          var item = $('li:last', output);
          item.append($('<a>', {
            html: outline[i].text,
            href: '#'
          }));
          if (outline[i].outline.length > 0) {
            item.append(helpers._makeList(outline[i].outline));
          }
        }
        return output;
      },
      // Check if the headings above the current heading level exist
      _buildOutline: function(outline, counter, text, level, i) {
        if (typeof(i) === 'undefined') {
          i = 1;
        }
        if (level === i) {
          console.log('building the outline and level is '+level+' and i is '+i);
          outline[counter['h'+i]] = {
            text: 'the text is: ' + text,
            outline: [],
            level: level,
            css: ""
          };
          console.log(outline);
        }
        if (level > i) {
          if (!outline[counter['h'+i]]) {
            outline[counter['h'+i]] = {
              text: "Missing H"+i,
              outline: [],
              level: level,
              css: "error"
            };
          }
          helpers._buildOutline(outline[counter['h'+i]].outline, counter, text, level, ++i);
        }
      },
      _findChapters: function () {
        var chapters = [];
        chapters.push(helpers._buildChapter($('*', config.root)));
        // @TODO make this return chapters based on sections
        return chapters;
      },
      _buildChapter: function (elements, outline) {
        return {
          elements: (elements) ? elements : [],
          outline: [],
          counter: {
            h1: 0,
            h2: 0,
            h3: 0,
            h4: 0,
            h5: 0,
          }
        }
      },
      _findElements: function (parent) {
        // @TODO
      }
    }
    // Process the page
    
    var chapters = helpers._findChapters();   
    for (var i = 0; i < chapters.length; i++) {
      chapters[i] = helpers._process(chapters[i]);
      helpers._render(chapters[i].outline).dialog({
        height: 350,
        width: 700
      });
    }
    console.log(chapters);
  };
})(jQuery);
