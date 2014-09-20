/**
 * Created by gaurav on 12/9/14.
 */

if (!jQuery) { throw new Error("Bootstrap requires jQuery") };


var getFormData =  function (commCareFormURL, commCareUserID, commCarePassword){

    var req = new digestAuthRequest('GET', commCareFormURL, commCareUserID, commCarePassword );

    req.request(function(data) {
        console.log('Data retrieved successfully');
        console.log(data);
    },function(errorCode) {
        console.log('no dice: '+errorCode)
    });
};

$(document).ready(function () {

    $('#importButton').click( function() {

        var commCareFormURL = $('#url').val();
        var commCarePassword = $('#password').val();
        var commCareUserID = $('#user').val();

        getFormData(commCareFormURL, commCareUserID, commCarePassword);

        console.log('User:'+commCareUserID);
        console.log('URL:'+commCareFormURL);
        console.log('Password:['+commCarePassword+']');

    });

});
