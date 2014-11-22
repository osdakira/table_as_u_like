do (jQuery) ->
  $ = jQuery
  $.fn.extend
    tableAsYouLike: (options = {}) ->

      cookieKey = "table-as-you-like"
      $table = $(this)

      menus_visibled = JSON.parse($.cookie(cookieKey) || "{}")
      if menus_visibled
        _(menus_visibled).each (visible, col) ->
          nth = parseInt(col) + 1
          if visible
            $("th:nth-child(#{nth}), td:nth-child(#{nth})", $table).show()
          else
            $("th:nth-child(#{nth}), td:nth-child(#{nth})", $table).hide()

      th_list = _($("thead th", $table))
      selectableHeaders = _(th_list).map (x, col) ->
        $x = $(x)
        $button = $("<button type='button' class='btn'>#{$x.text()}</button>")
        $button.addClass("disabled") unless (menus_visibled[col] || $x.is(":visible"))
        $button.hide() unless $x.text()
        $("<div/>").addClass("table-as-you-like-menu-item btn-group").append($button)
      $selectableHeaderGroup =
        $("<div class='table-as-you-like-menu btn-group'>").html(selectableHeaders)
      $table.before($selectableHeaderGroup)

      storeCookie = ->
        menus_visibled = {}
        _(selectableHeaders).each (x, index) ->
          menus_visibled[index] = not $(x).find(".btn").hasClass("disabled")
        $.cookie(cookieKey, JSON.stringify(menus_visibled), path: location.pathname)

      storeCookie()

      th_text_list = _(th_list).map (x) -> $(x).text()
      $selectableHeaderGroup.on "click", ".table-as-you-like-menu-item", ->
        $menuItem = $(this).find(".btn")
        $menuItem.toggleClass("disabled")
        th_text = $menuItem.text()
        col = _(th_text_list).indexOf(th_text)
        $("th:nth-child(#{col + 1}), td:nth-child(#{col + 1})", $table).toggle("fast")
        storeCookie()
