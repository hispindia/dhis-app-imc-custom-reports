/**
 * Created by gaurav on 18/9/14.
 */

if (!jQuery) {
    throw new Error("Bootstrap requires jQuery")
}
;

var readCommCareForm = function () {

    var listItem = new Object();

    listItem.code = "sampleCCItem";

    listItem.value = 1;

    var list = new Array();

    list.push(listItem);

    var secondListItem = new Object();

    secondListItem.code = "DE_359596";

    secondListItem.value = 0;

    list.push(secondListItem);

    return list;

};


var fetchDataElementList = function () {

    var deCodeList = new Array();

    var hasUpdates = new Boolean(false);

    var updateCount = 0;

    var elementList = readCommCareForm();

    var dhisURL = "https://apps.dhis2.org/dev/api/dataElements.jsonp?paging=false&fields=code";

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        contentType: "application/json",
        async: false,
        url: dhisURL,
        success: function (data) {
            var deList = data["dataElements"];
            for (var item in deList) {
                if (deList[item].code != null) {
                    deCodeList.push(String(deList[item].code));
                }
            }

            console.log("COUNT: "+elementList.length);

            if (elementList.length > 0) {

                for(var item in elementList)
                {
                    console.log("CC_CODE :"+elementList[item].code);
                    console.log("TEST_IF: "+$.inArray(elementList[item].code, deCodeList));
                    if($.inArray(elementList[item].code, deCodeList) < 0 )
                    {
                        console.log("UPDATE: "+elementList[item].code);
                        $('#mappingTable').append('<tr><td>'+elementList[item].code+'</td><td>Number</td><td><input type="text" class="input-sm"></td></tr>');
                        hasUpdates = true;
                        ++updateCount;
                    }
                }

            }

            if(hasUpdates=true)
            {
                $('#deList').show();;
                $('#alertContent').append('<strong>New Updates Found!</strong></br>'+ updateCount +' new items found.');
                $('#alertDiv').show();
            }
        }
    });

};

$(document).ready(function () {

    console.log("LOG: Now fetching de-list from dhis api");

    $(".alert").alert();

    fetchDataElementList();
});

