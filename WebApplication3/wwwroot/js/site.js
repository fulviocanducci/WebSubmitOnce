// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//$(document).on("submit", "form", function (e) {

//   const $form = $(this);
//   const $btn = $form.find("[data-submit-once]:submit");

//   if ($btn.data("submitted")) {
//      return false;
//   }
//   if ($form.valid && !$form.valid()) {
//      return false;
//   }

//   $btn.data("submitted", true);
//   $btn.prop("disabled", true);

//   const loadingText = $btn.data("loading-text");
//   console.log(loadingText)
//   if (loadingText) {
//      $btn.data("original-text", $btn.html());
//      $btn.html(loadingText);
//   }
//});

function loadingButtonSubmit() {
   if ($("#spinner-default").length) {
      $("#spinner-default").addClass('d-none');
   }
   if ($("#spinner-icon").length) {
      $("#spinner-icon").removeClass('d-none');
   }
   if ($("#spinner-label").length) {
      $("#spinner-label").removeClass('d-none');
   }
}

(function ($) {
   $.fn.submitOnce = function (options) {
      const settings = $.extend({ beforeSubmit: null }, options);
      return this.each(function () {
         const $form = $(this);
         $form.off("submit.submitOnce").on("submit.submitOnce", function () {
            if ($form.valid()) {
               const $btn = $form.find(':submit');
               if ($btn && $btn.length) {
                  $btn.prop('disabled', true);
               }
               if (typeof settings.beforeSubmit === "function") {
                  settings.beforeSubmit($form);
               }
            }
         });
      });
   };
})(jQuery);

$('#form1').on('submit', function () {
   if ($(this).valid()) {
      var $btn = $(this).find('input[type=submit], button[type=submit]');
      $("#spinner-default").addClass('d-none');
      $("#spinner-icon").removeClass('d-none');
      $("#spinner-label").removeClass('d-none');
      if (!$btn.prop('disabled')) {
         $btn.prop('disabled', true);
      }
   }
});

(function ($) {
   $.fn.preventDoubleSubmission = function () {
      return this.each(function () {
         const $form = $(this);
         $form.on("submit", function (e) {
            console.log($form.data("submitted"));
            if ($form.data("submitted") && Boolean($form.data("submitted"))) {
               e.preventDefault();
               return false;
            } else {
               $form.data("submitted", true);
               $form.find(":submit").prop("disabled", true);
            }
         });
      });
   };
})(jQuery);


function countFormValidation(name, fn = undefined) {
   const form = $(name);
   const validator = form.data("validator");
   form.on("keyup change input", ":input", function () {
      const invalid = validator.numberOfInvalids();
      fn(invalid);
      form.find(":submit").prop("disabled", invalid > 0);
   });
}