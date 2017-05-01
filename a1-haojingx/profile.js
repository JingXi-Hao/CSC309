// global variable
var index = 0;
// create array of months
var month = new Array();
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";

// menu_button for naviation bar
document.getElementById('menu_button').addEventListener(
  'click', function() {
    document.getElementById('nav_bar').classList.toggle('open');
});

// menu button for profile info section
document.getElementById('menu_button').addEventListener(
  'click', function() {
    document.getElementById('info').classList.toggle('open');
});

// menu button for profile feed section
document.getElementById('menu_button').addEventListener(
  'click', function() {
    document.getElementById('feed').classList.toggle('open');
});

// post button for posting text 
$(function(){
    $('.input_button').on('click', function(){
        text = $('.input_text').val();
        if (text != undefined) {
            var timestamp = new Date();
            var cur = month[timestamp.getMonth()] + ' ' + timestamp.getDate() + ' ' + timestamp.getFullYear() + ' ' + timestamp.getHours() + ':' + timestamp.getMinutes() + ':' + timestamp.getSeconds();
            post = '<div class="post test--post"><p class="post_content test--post_content" style="word-wrap:break-word;">' + text + '</p>';
            post += '<p class="post_time">Posted at ' + cur + '</p>';
            post += '<button class="like_button test--like_button" style="background-color:transparent;border-style:none;" id='+ index + '><i class="fa fa-thumbs-o-up" style="font-size:16px;color:blue;"></i></button>';
            post += '<input class="like_count test--like_count" style="background-color:transparent;border-style:none;" value="Likes" id="count_' + index + '"></div>';
            new_post = $('.post_feed').append($(post)) 
            // add event to the newly added likes button that is the id equals to the current index
            var current_id = index;
            document.getElementById(current_id).addEventListener('click', function() {
                var total_likes = document.getElementById('count_' + current_id).getAttribute('value').toString();
                if (total_likes == 'Likes') {
                    var count = 1;
                    document.getElementById('count_' + current_id).setAttribute('value', count);
                } else {
                    total_likes = parseInt(total_likes) + 1;
                    document.getElementById('count_' + current_id).setAttribute('value', total_likes);
                }
            });
            
            index += 1;
        }
    });
});

// post button for posting url
$(function(){
    $('.photo_button').on('click', function(){
        url = $('.photo_url').val();
        if (url != undefined) {
            var timestamp = new Date();
            var cur = month[timestamp.getMonth()] + ' ' + timestamp.getDate() + ' ' + timestamp.getFullYear() + ' ' + timestamp.getHours() + ':' + timestamp.getMinutes() + ':' + timestamp.getSeconds();
            post = '<div class="post test--post"><img class="post_content test--post_content col-m-12 col-12" src=' + url + '>';
            post += '<p class="post_time">Posted at ' + cur + '</p>';
            post += '<button class="like_button test--like_button" style="background-color:transparent;border-style:none;" id='+ index + '><i class="fa fa-thumbs-o-up" style="font-size:16px;color:blue;"></i></button>';
            post += '<input class="like_count test--like_count" style="background-color:transparent;border-style:none;" value="Likes" id="count_' + index + '"></div>';
            new_post = $('.post_feed').append($(post))
            // add event to the newly added likes button that is the id equals to the current index
            var current_id = index;
            document.getElementById(current_id).addEventListener('click', function() {
                var total_likes = document.getElementById('count_' + current_id).getAttribute('value').toString();
                if (total_likes == 'Likes') {
                    var count = 1;
                    document.getElementById('count_' + current_id).setAttribute('value', count);
                } else {
                    total_likes = parseInt(total_likes) + 1;
                    document.getElementById('count_' + current_id).setAttribute('value', total_likes);
                }
            });

            index += 1;
        }
    });
});

