/**
 * @project jquery.prevent-duplicate-submit.js
 * @author Shogo ISHIZAKA
 *
 * Usage:
 * Call 'disableDuplicateSubmit' method on form
 * $('form').disableDuplicateSubmit(); to prevent to be duplicate submitted
 *
 * Add 'prevent' class to submit button
 * <button type='submit' class='prevent'>Submit</button>
 * 
 * Notice:
 * Submit button should be in the same context with form.
 * For example, it doesn't work in a case like this:
 * 
 * <div>
 *   <form> <-- This should be placed BEFORE div tag
 *   <button type="submit" class="prevent">Button</button>
 * </div>
 * </form>
 */

 (function ($) {
    $.fn.disableDuplicateSubmit = function () {
        var self = this;
        var context = $(self)[0];
        $(self).on('submit', function () {
            var name = $(".prevent[clicked=true]").prop('name');
            var val = $(".prevent[clicked=true]").val();
            // Evacuate value of submit element to send this value with form
            var $hidden = $('<input/>', {
                type: 'hidden',
                name: name,
                value: val
            }).appendTo($("form"));

            $(".prevent", context).prop("disabled", true);

            setTimeout(function () {
                $hidden.remove();
                $(".prevent", context).prop("disabled", false);
            }, 300000);
        });
        $(".prevent", context).on('click', function () {
            $(".prevent", $(this).parents("form")).removeAttr("clicked");
            $(this).prop("clicked", "true");
        });
    };
})(jQuery);