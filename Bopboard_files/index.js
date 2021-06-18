$(document).ready(function() {
  // Check for click events on the navbar burger icon
  new ClipboardJS('.copy_button');

  var current_active_filters = {};
  var data_gotten = false;

  $('.navbar-burger').click(function() {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $('.navbar-burger').toggleClass('is-active');
    $('.navbar-menu').toggleClass('is-active');
  });

  // Open modal for create playlist button
  $('#create-top-100-playlist').click(function() {
    $('.playlist-modal').addClass('is-active');
  });

  // Handle all modal closes
  $('.close-modal').click(function(e) {
    $('.modal').removeClass('is-active');
    e.preventDefault();
  });

  $('.toggle-hide').click(function(e) {
    var $toggle = $(this);
    var class_unhide = $toggle.data('unhide');
    var $unhide_element = $(`.${class_unhide}`);
    var show = $unhide_element.hasClass('hidden');

    if ($toggle.hasClass('board-option-toggle')) {
      $('.board-option-toggle').addClass('is-dark');
      $('.board-option').addClass('hidden');
    }

    if (show) {
      $toggle.removeClass('is-dark');
      $unhide_element.removeClass('hidden');
    } else {
      $toggle.addClass('is-dark');
      $unhide_element.addClass('hidden');
    }
  });

  $('.filter').click(function(e) {
    var $filter = $(this);
    var id = $filter.data('id');
    var toggle_status = $filter
      .toggleClass('active')
      .hasClass('active');

    $('.song').hide();

    current_active_filters[id] = toggle_status;

    for (var _id in current_active_filters) {
      if (current_active_filters[_id]) {
        $(`.${_id}`).show();
      }
    }

    var no_active_filters = Object.keys(current_active_filters).every(
      function(k) {
        return !current_active_filters[k];
      },
    );
    if (no_active_filters) {
      $('.song').show();
    }
  });

  $('.create-board-input').keyup(function() {
    var has_value = $(this).val().length > 0;
    $('.create-board-button').prop('disabled', !has_value);
  });

  $('.navigation-arrow').click(function() {
    var section = $('#instructions-start');
    $('html,body').animate(
      { scrollTop: section.offset().top + 50 },
      'slow',
    );
  });

  $('.hide-admin').click(function() {
    $('.admin').toggleClass('hidden');
  });

  $('#top-100').click(function() {
    $('#top-100').addClass('is-active');
    $('#party').removeClass('is-active');
    $('.instant-playlist').addClass('hidden');
    $('.top-100').removeClass('hidden');
    // Reset options
    $('.board-option-toggle').addClass('is-dark');

    $('#party-songs').addClass('hidden');
    $('#top-songs').removeClass('hidden');
  });

  $('#party').click(function(e) {
    $('#top-100').removeClass('is-active');
    $('#party').addClass('is-active');
    $('.instant-playlist').removeClass('hidden');
    $('.top-100').addClass('hidden');
    // Reset options
    $('.board-option').addClass('hidden');

    $('#party-songs').removeClass('hidden');
    $('#top-songs').addClass('hidden');

    if (!data_gotten) {
      var board_hash = $(e.currentTarget).data('board-hash');

      $.get(`/board/${board_hash}/top`, function(data) {
        $('#party-songs').html(data);
        // Open modal for create playlist button
        $('#create-instant-playlist').click(function() {
          $('.instant-modal').addClass('is-active');
        });
      });
    }
  });
});
