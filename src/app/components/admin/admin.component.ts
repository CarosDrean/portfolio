import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: [
    './admin.component.css'
  ]
})
export class AdminComponent implements OnInit {

  constructor() {
    // this.loadScript('../../../assets/js/main.js');
  }

  ngOnInit() {
    this.loadScript();
  }

  public loadScript() {
    let messageIsOpen = false;

    function mostrarOver() {
      $('body').addClass('show-main-overlay');
    }

    function hideOver() {
      $('body').removeClass('show-main-overlay');
    }

    function mostrarMess() {
      $('body').addClass('show-message');
      messageIsOpen = true;
    }

    function hideMess() {
      $('body').removeClass('show-message');
      $('#main .message-list li').removeClass('active');
      messageIsOpen = false;
    }

    function mostrarSide() {
      $('body').addClass('show-sidebar');
    }

    function hideSide() {
      $('body').removeClass('show-sidebar');
    }

    $('.trigger-toggle-sidebar').on('click', function() {
      mostrarSide();
      hideOver();
    });

    $('.trigger-message-close').on('click', function() {
      hideMess();
      hideOver();
    });

    $('#main .message-list li').on('click', function(e) {
      const item = $(this),
        target = $(e.target);

      if (target.is('label')) {
        item.toggleClass('selected');
      } else {
        if (messageIsOpen && item.is('.active')) {
          hideMess();
          hideOver();
        } else {
          if (messageIsOpen) {
            hideMess();
            item.addClass('active');
            setTimeout(function() {
              mostrarMess();
            }, 300);
          } else {
            item.addClass('active');
            mostrarMess();
          }
          mostrarOver();
        }
      }
    });

    $('input[type=checkbox]').on('click', function(e) {
      e.stopImmediatePropagation();
    });

    $('#main > .overlay').on('click', function() {
      hideOver();
      hideMess();
      hideSide();
    });

    $('.nano').nanoScroller();

    $('a').on('click', function(e) {
      e.preventDefault();
    });

    $('.search-box input').on('focus', function() {
      if ($(window).width() <= 1360) {
        hideMess();
      }
    });

  }

}
