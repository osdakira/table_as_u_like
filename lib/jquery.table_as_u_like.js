(function() {
  (function(jQuery) {
    var $;
    $ = jQuery;
    return $.fn.extend({
      tableAsYouLike: function(options) {
        var $selectableHeaderGroup, $table, cookieKey, menus_visibled, selectableHeaders, storeCookie, th_list, th_text_list;
        if (options == null) {
          options = {};
        }
        cookieKey = "table-as-you-like";
        $table = $(this);
        menus_visibled = JSON.parse($.cookie(cookieKey) || "{}");
        if (menus_visibled) {
          _(menus_visibled).each(function(visible, col) {
            var nth;
            nth = parseInt(col) + 1;
            if (visible) {
              return $("th:nth-child(" + nth + "), td:nth-child(" + nth + ")", $table).show();
            } else {
              return $("th:nth-child(" + nth + "), td:nth-child(" + nth + ")", $table).hide();
            }
          });
        }
        th_list = _($("thead th", $table));
        selectableHeaders = _(th_list).map(function(x, col) {
          var $button, $x;
          $x = $(x);
          $button = $("<button type='button' class='btn'>" + ($x.text()) + "</button>");
          if (!(menus_visibled[col] || $x.is(":visible"))) {
            $button.addClass("disabled");
          }
          if (!$x.text()) {
            $button.hide();
          }
          return $("<div/>").addClass("table-as-you-like-menu-item btn-group").append($button);
        });
        $selectableHeaderGroup = $("<div class='table-as-you-like-menu btn-group'>").html(selectableHeaders);
        $table.before($selectableHeaderGroup);
        storeCookie = function() {
          menus_visibled = {};
          _(selectableHeaders).each(function(x, index) {
            return menus_visibled[index] = !$(x).find(".btn").hasClass("disabled");
          });
          return $.cookie(cookieKey, JSON.stringify(menus_visibled), {
            path: location.pathname
          });
        };
        storeCookie();
        th_text_list = _(th_list).map(function(x) {
          return $(x).text();
        });
        return $selectableHeaderGroup.on("click", ".table-as-you-like-menu-item", function() {
          var $menuItem, col, th_text;
          $menuItem = $(this).find(".btn");
          $menuItem.toggleClass("disabled");
          th_text = $menuItem.text();
          col = _(th_text_list).indexOf(th_text);
          $("th:nth-child(" + (col + 1) + "), td:nth-child(" + (col + 1) + ")", $table).toggle("fast");
          return storeCookie();
        });
      }
    });
  })(jQuery);

}).call(this);
