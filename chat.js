<script type="text/javascript">
    var outputArea = $("#chat-output");



    function ChatLogics() {
      var message = $("#user-input").val();

      if (!$("#user-input").val() == "") {
        outputArea.append(`
         <div class='user-message'>
           <div class='message'>
             ${message}
           </div>
         </div>
         `);
        var replyFromBot,
          replyFromBotanim
        $.ajax('http://127.0.0.1:5000/chat', {
          type: 'POST',
          data: JSON.stringify({ 'msg': message }),
          contentType: 'application/json',
          type: 'POST',
          dataType: 'json',

          beforeSend:()=>{
            setTimeout(()=>{
              replyFromBot = `<img src="frombot.gif" width="80" class="typo-anime"/>`
              outputArea.append(replyFromBot)
            },10)
          },
          success: function (res) {
            console.log(res.response)
              $("#chat-output").stop().animate({ scrollTop: $("#chat-output")[0].scrollHeight }, 1000);
              setTimeout(function () {
                replyFromBot = ` 
                <div class="bot-message">
                  <div class="message">
                  ${res.response}
                  </div>
               </div>`
                $('.typo-anime').remove()
                outputArea.append(replyFromBot)
              }, 300)



            }, error: function () {
              $('.typo-anime').remove()
              replyFromBot = ` 
              <div class="bot-message">
                <div class="message">
                Sorry there was an error sending your messages please try again
                </div>
              </div>`

              outputArea.append(replyFromBot)

            }
          });
      } else {
        outputArea.append('')
      }
      $('#user-input-form')[0].reset();
    }


    $("#user-input-form").on("submit", function (e) {
      e.preventDefault();
      ChatLogics()

    })
    $("#send-message").on("click", function (e) {
      ChatLogics()
    });

    $('.chat-trigger').click(function () {
      $('#Chatbotwin').slideToggle()
      $(this).find('i').toggleClass('fas fa-times')
      $('.prime').toggleClass('is-active');
    });

  </script>