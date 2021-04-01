$(document).ready(function () {
  console.log("ready!");


  $("#form").validate({
    rules: {
      "nombre": {
        required: true
      },
      /*
      "email": {
        required: {
          depends: function () {
            $(this).val($.trim($(this).val()));
            return true;
          }
        },
        customemail: true
      },
         */
      "genero": {
        required: true
      },
      "comentarios": {
        required: true
      }
    },

    messages: {
      "nombre": "Ingresa tu nombre",
      "email": "Verifica tu email",
      "genero": "Selecciona tu genero",
      "comentarios": "Ingrese un comentario"
    },

    submitHandler: function () {
      //$("form").submit();

      // $.ajax({
      //   url: form.action,
      //   type: form.method,
      //   data: $(form).serialize(),
      //   success: function (response) {
      //     console.log(response);
      //   }
      // })

      $.ajax({
        url: form.action,
        type: form.method,
        data: $(form).serialize(),
        beforeSend: function () {
          $('.respuesta_form').html('Wait for it...')
          $('.loading_spinner').show();
        },
        success: function (response) {
          $('.respuesta_form').html('Gracias ' + response.nombre + ' por tu mensaje')
          $('.loading_spinner').hide();
        }
      })
    }
  });

  const loadLeads = () => {
    $.ajax({
      url: 'https://prog-3-leads-api-rest.vercel.app/leads',
      type: 'GET',
      success: function (response) {
        $('.comments-grid').html('');
        response.forEach(element => {
          var sexo;
          if (element.sexo == "H") {
            sexo = "Masculino"
          } else if (element.sexo == "M") {
            sexo = "Femenino"
          } else if (element.sexo == "Otro") {
            sexo = "Otro"
          }
          $('.comments-grid').append('<div class="comment">' + '<div class="comment-head">' + '<h3>' + element.nombre + '</h3>' + '<p>' + sexo + '</p>' + '</div>' + '<div class="comment-body">' + element.comentarios + '</div>' + '</div>')
        });
      }
    });
  }

  loadLeads();

});