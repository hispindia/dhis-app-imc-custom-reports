/**
 * Created by gaurav on 20-11-2014.
 */

$(document).ready(function () {


    var dhisBaseURL = new String();

    $.ajaxSetup({
        async: false
    });

    jQuery.getJSON("manifest.webapp", function (json) {
        console.log(json.toString());
        dhisBaseURL = json.activities.dhis.href + "/api";
        console.log(json.activities.dhis.href + "/api");
    });

    $.ajaxSetup({
        async: true
    });

    //dhisBaseURL='http://178.79.144.205:8082/imc/api'; //For Custom URL

    console.log('DHISBaseURL: '+dhisBaseURL);

    var reportDependent = false;
    var reportList = new Array;

    var showForm = function () {


        if ($('#orgUnitLevelSelect').val().length != 0) {
            $('#orgUnitLevelSelect').prop('disabled', false);
            $('#orgUnitLevelSelect').selectpicker('refresh');
            $('#orgUnitGroupSelect').prop('disabled', true);
            $('#orgUnitGroupSelect').selectpicker('refresh');
            $('#orgUnitOUSelect').prop('disabled', true);
            $('#orgUnitOUSelect').selectpicker('refresh');
        }
        else if ($('#orgUnitGroupSelect').val().length != 0) {
            $('#orgUnitLevelSelect').prop('disabled', true);
            $('#orgUnitLevelSelect').selectpicker('refresh');
            $('#orgUnitGroupSelect').prop('disabled', true);
            $('#orgUnitGroupSelect').selectpicker('refresh');
            $('#orgUnitOUSelect').prop('disabled', true);
            $('#orgUnitOUSelect').selectpicker('refresh');
        }
        else if ($('#orgUnitOUSelect').val().length != 0) {
            $('#orgUnitLevelSelect').prop('disabled', false);
            $('#orgUnitLevelSelect').selectpicker('refresh');
            $('#orgUnitGroupSelect').prop('disabled', false);
            $('#orgUnitGroupSelect').selectpicker('refresh');
            $('#orgUnitOUSelect').prop('disabled', true);
            $('#orgUnitOUSelect').selectpicker('refresh');
        }
        else {
            $('#orgUnitLevelSelect').prop('disabled', false);
            $('#orgUnitLevelSelect').selectpicker('refresh');
            $('#orgUnitGroupSelect').prop('disabled', false);
            $('#orgUnitGroupSelect').selectpicker('refresh');
            $('#orgUnitOUSelect').prop('disabled', false);
            $('#orgUnitOUSelect').selectpicker('refresh');
        }

    };

    $.ajax({
        url: dhisBaseURL+"/reports.jsonp",
        dataType: "jsonp",
        data: {
            format: "json"
        },
        success: function (response) {
            /** @namespace response.reports */
            for (var item in response.reports) {

                var report = new Object();

                report.name = response.reports[item].name;
                report.URL = response.reports[item].href;

                reportList[report.name] = report.URL;

                $('#reportSelect')
                    .append('<option id=\'' + response.reports[item].name + '\' value=\'' + response.reports[item].name + '\'>' + response.reports[item].name + '</option>');
            }
            $('#reportSelect').selectpicker({
                width: 'auto'
            });

        }
    });

    $.ajax({
        url: dhisBaseURL+"/categories/Q3QQy1PWrqe.jsonp?paging=false",
        dataType: "jsonp",
        data: {
            format: "json"
        },
        success: function (response) {
            console.log(response);
            /** @namespace response.categoryOptions */
            for (var item in response.categoryOptions) {
                $('#donorSelect')
                    .append('<option id=\'' + response.categoryOptions[item].id + '\' value=\'' + response.categoryOptions[item].id + '\'>' + response.categoryOptions[item].name + '</option>');
            }
            $('#donorSelect').selectpicker({
                width: 'auto'
            });
        }

    });

    $.ajax({
        url: dhisBaseURL+"/categories/XkPfFUjhEui.jsonp?paging=false",
        dataType: "jsonp",
        data: {
            format: "json"
        },
        success: function (response) {
            console.log(response);
            /** @namespace response.categoryOptions */
            for (var item in response.categoryOptions) {
                $('#impSelect')
                    .append('<option id=\'' + response.categoryOptions[item].id + '\' value=\'' + response.categoryOptions[item].id + '\'>' + response.categoryOptions[item].name + '</option>');
            }
            $('#impSelect').selectpicker({
                width: 'auto'
            });
        }

    });

    $.ajax({
        url: dhisBaseURL+"/organisationUnitGroups.jsonp",
        dataType: "jsonp",
        data: {
            format: "json"
        },
        success: function (response) {
            console.log(response);
            /** @namespace response.organisationUnitGroups */
            for (var item in response.organisationUnitGroups) {
                $('#orgUnitGroupSelect')
                    .append('<option id=\'' + response.organisationUnitGroups[item].id + '\' value=\'' + response.organisationUnitGroups[item].id + '\'>' + response.organisationUnitGroups[item].name + '</option>');
            }
            $('#orgUnitGroupSelect').selectpicker({
                width: 'auto'
            });
        }

    });

    $.ajax({
        url: dhisBaseURL+"/organisationUnits.jsonp?paging=false",
        dataType: "jsonp",
        data: {
            format: "json"
        },
        success: function (response) {

            console.log(response);
            /** @namespace response.organisationUnits */
            for (var item in response.organisationUnits) {
                $('#orgUnitOUSelect')
                    .append('<option id=\'' + response.organisationUnits[item].id + '\' value=\'' + response.organisationUnits[item].id + '\'>' + response.organisationUnits[item].name + '</option>');
            }
            $('#orgUnitOUSelect').selectpicker({
                width: 'auto'
            });
            showForm();
        }

    });

    //noinspection JSUnresolvedFunction
    $('#datetimepickerStart').datetimepicker({
        pickTime: false,
        defaultDate: new Date()
    });

    //noinspection JSUnresolvedFunction
    $('#monthpickerStart').datetimepicker({
        pickTime: false,
        format: "YYYY-MM",
        viewMode: "months",
        minViewMode: "months",
        defaultDate: new Date()
    });

    //noinspection JSUnresolvedFunction
    $('#monthpickerEnd').datetimepicker({
        pickTime: false,
        format: "YYYY-MM",
        viewMode: "months",
        minViewMode: "months",
        defaultDate: new Date()
    });

    //noinspection JSUnresolvedFunction
    $('#datetimepickerEnd').datetimepicker({
        pickTime: false,
        defaultDate: new Date()
    });

    document.getElementById('msgs').innerHTML='';

    $("#datetimepickerStart").on("dp.change", function (e) {
        $('#datetimepickerEnd').data("DateTimePicker").setMinDate(e.date);

        periodIndicator();
    });
    $("#datetimepickerEnd").on("dp.change", function (e) {
        $('#datetimepickerStart').data("DateTimePicker").setMaxDate(e.date);
        periodIndicator();
    });

    $("#monthpickerStart").on("dp.change", function (e) {
        $('#monthpickerEnd').data("DateTimePicker").setMinDate(e.date);
    });
    $("#monthpickerEnd").on("dp.change", function (e) {
        $('#monthpickerStart').data("DateTimePicker").setMaxDate(e.date);
    });

    $("#btnHome").click(function (e) {
        var hrefURL=dhisBaseURL.substring(0,dhisBaseURL.length-3);
        window.location.href = hrefURL+'dhis-web-dashboard-integration/index.action';
    });


    $('#genButton').click(function () {
        var donorCode = $('#donorSelect').val();
        var impCode = $('#impSelect').val();
        var orgUnitGroupCode = $('#orgUnitGroupSelect').val();
        var orgUnitLevelCode = $('#orgUnitLevelSelect').val();
        var orgUnitCode = $('#orgUnitOUSelect').val();
        var startDateCode = moment($('#startDate').val());
        var endDateCode = moment($('#endDate').val());

        var startMonthCode = moment($('#startMonth').val());
        var endMonthCode = moment($('#endMonth').val());

        $('#statDate').val('asd');

        var periodList = "";
        if ($('#sdFormGroup').css('display') != 'none') {
            var startYear=startDateCode.format('YYYY');
            var startWeek=new Date(startDateCode).getWeek();
            //periodList = startDateCode.format('YYYYMMDD');
            periodList = startYear+'w'+startWeek;
            while (startDateCode < endDateCode) {
                startDateCode = moment(startDateCode).add(7, 'd');
                startYear = startDateCode.format('YYYY');
                startWeek = new Date(startDateCode).getWeek();
                periodList = periodList.concat(';' + startYear+'W'+startWeek);
            }
        }
        else {
            periodList = startMonthCode.format('YYYYMM');
            while (startMonthCode < endMonthCode) {
                startMonthCode = moment(startMonthCode).add(1, 'M');
                periodList = periodList.concat(';' + startMonthCode.format('YYYYMM'));
            }
        }
        var orgUnitOUSelectedVal = $('#orgUnitOUSelect option:selected').text();
        var orgUnitGroupSelectedVal = $('#orgUnitGroupSelect option:selected').text();
        var orgUnitLevelSelectedVal = $('#orgUnitLevelSelect option:selected').text();

        if (orgUnitLevelSelectedVal == 'Select Level' && orgUnitGroupSelectedVal == 'Select Group' && orgUnitOUSelectedVal == 'Select Org. Unit' && reportDependent == false) {
            alert('Please Select Organisation Unit');
        }
        else
        {


            console.log('periodList: ' + periodList);
            console.log('dhisBaseURL : ' + dhisBaseURL);


            sessionStorage.setItem('dhisBaseURL', dhisBaseURL);
            sessionStorage.setItem('donorCode', donorCode);
            sessionStorage.setItem('impCode', impCode);
            sessionStorage.setItem('orgUnitGroupCode', orgUnitGroupCode);
            sessionStorage.setItem('orgUnitLevelCode', orgUnitLevelCode);
            sessionStorage.setItem('orgUnitCode', orgUnitCode);
            sessionStorage.setItem('periodList', periodList);
            sessionStorage.setItem('orgUnitName', $('#orgUnitOUSelect option:selected').text());
            sessionStorage.setItem('orgUnitGroupName', $('#orgUnitGroupSelect option:selected').text());
            sessionStorage.setItem('orgUnitLevelName', $('#orgUnitLevelSelect option:selected').text());
            sessionStorage.setItem('donorName', $('#donorSelect option:selected').text());
            sessionStorage.setItem('impName', $('#impSelect option:selected').text());

            var startYear=moment($('#startDate').val()).format('YYYY');
            var startWeek=new Date(moment($('#startDate').val())).getWeek();
            var endYear=moment($('#endDate').val()).format('YYYY');
            var endWeek=new Date(moment($('#endDate').val())).getWeek();

            sessionStorage.setItem('startDate', startYear+'W'+startWeek);
            sessionStorage.setItem('endDate', endYear+'W'+endWeek);
            sessionStorage.setItem('startMonth', $('#startMonth').val());
            sessionStorage.setItem('endMonth', $('#endMonth').val());

            var reportName = $('#reportSelect option:selected').text() + '.html';

            reportName = encodeURI(reportName);

            console.log(reportName);

            window.location.href = reportName;


        }


    });

    var toggleOULevelSelect = function () {
        console.log($('#orgUnitLevelSelect').val());
        if ($('#orgUnitLevelSelect').val().length != 0) {
            $('#orgUnitGroupSelect').prop('disabled', true);
            $('#orgUnitGroupSelect').selectpicker('refresh');
            $('#orgUnitOUSelect').prop('disabled', true);
            $('#orgUnitOUSelect').selectpicker('refresh');
        }
        else {
            $('#orgUnitGroupSelect').prop('disabled', false);
            $('#orgUnitGroupSelect').selectpicker('refresh');
            $('#orgUnitOUSelect').prop('disabled', false);
            $('#orgUnitOUSelect').selectpicker('refresh');
        }
    };

    var toggleOUGroupSelect = function () {
        console.log($('#orgUnitGroupSelect').val());
        if ($('#orgUnitGroupSelect').val().length != 0) {
            $('#orgUnitLevelSelect').prop('disabled', true);
            $('#orgUnitLevelSelect').selectpicker('refresh');
            $('#orgUnitOUSelect').prop('disabled', true);
            $('#orgUnitOUSelect').selectpicker('refresh');
        }
        else {
            $('#orgUnitLevelSelect').prop('disabled', false);
            $('#orgUnitLevelSelect').selectpicker('refresh');
            $('#orgUnitOUSelect').prop('disabled', false);
            $('#orgUnitOUSelect').selectpicker('refresh');
        }
    };

    var toggleOUSelect = function () {
        console.log($('#orgUnitOUSelect').val());
        if ($('#orgUnitOUSelect').val().length != 0) {
            $('#orgUnitLevelSelect').prop('disabled', true);
            $('#orgUnitLevelSelect').selectpicker('refresh');
            $('#orgUnitGroupSelect').prop('disabled', true);
            $('#orgUnitGroupSelect').selectpicker('refresh');
        }
        else {
            $('#orgUnitLevelSelect').prop('disabled', false);
            $('#orgUnitLevelSelect').selectpicker('refresh');
            $('#orgUnitGroupSelect').prop('disabled', false);
            $('#orgUnitGroupSelect').selectpicker('refresh');
        }
    };

    var trainingReportToggling=function(){
        $('#orgUnitLevelSelect').prop('disabled', true);
        $('#orgUnitLevelSelect').selectpicker('refresh');
        $('#orgUnitGroupSelect').prop('disabled', true);
        $('#orgUnitGroupSelect').selectpicker('refresh');

    }

    $('#orgUnitLevelSelect').change(function () {
        toggleOULevelSelect();
    });

    $('#orgUnitGroupSelect').change(function () {
        toggleOUGroupSelect();
    });

    $('#orgUnitOUSelect').change(function () {
        toggleOUSelect();
        var reportName = $('#reportSelect option:selected').text();
        if(reportName == 'Training Program Report'){
            trainingReportToggling();
        }
    });

    //Report Dependent works
    var selectedReport = function () {

        var reportName = $('#reportSelect option:selected').text();
        if (reportName == 'Select Report') {
            $('#donorFormGroup').hide();
            $('#impFormGroup').hide();
            $('#oulFormGroup').hide();
            $('#ougFormGroup').hide();
            $('#ougFormOU').hide();
            $('#sdFormGroup').hide();
            $('#edFormGroup').hide();
            $('#smFormGroup').hide();
            $('#emFormGroup').hide();
            $('#genButton').hide();
            document.getElementById('msgs').innerHTML='';
        }
        else if (reportName == 'Consultation Donor Wise Report') {
            reportDependent = true;
            $('#donorFormGroup').hide();
            $('#impFormGroup').hide();
            $('#oulFormGroup').hide();
            $('#ougFormGroup').hide();
            $('#ougFormOU').hide();
            $('#sdFormGroup').show();
            $('#edFormGroup').show();
            $('#smFormGroup').hide();
            $('#emFormGroup').hide();
            $('#genButton').show();
            document.getElementById('msgs').innerHTML='';

        }
        else if (reportName == 'Monthly Out of Stock Indicator Report') {
            reportDependent = true;
            $('#donorFormGroup').show();
            $('#impFormGroup').show();
            $('#oulFormGroup').hide();
            $('#ougFormGroup').hide();
            $('#ougFormOU').hide();
            $('#sdFormGroup').hide();
            $('#edFormGroup').hide();
            $('#smFormGroup').show();
            $('#emFormGroup').show();
            $('#genButton').show();
            document.getElementById('msgs').innerHTML='';

        }
        else if (reportName == 'Drugs Consumption Report') {
            $('#donorFormGroup').show();
            $('#impFormGroup').show();
            $('#oulFormGroup').show();
            $('#ougFormGroup').show();
            $('#ougFormOU').show();
            $('#sdFormGroup').hide();
            $('#edFormGroup').hide();
            $('#smFormGroup').show();
            $('#emFormGroup').show();
            $('#genButton').show();
            document.getElementById('msgs').innerHTML='';

        }
        else if (reportName == 'Training Program Report') {
            $('#donorFormGroup').hide();
            $('#impFormGroup').hide();
            $('#oulFormGroup').show();
            $('#ougFormGroup').show();
            $('#ougFormOU').show();
            $('#sdFormGroup').show();
            $('#edFormGroup').show();
            $('#smFormGroup').hide();
            $('#emFormGroup').hide();
            $('#genButton').show();
            document.getElementById('msgs').innerHTML='';
           // alert('Please use Select Organization Unit');

        }
        else {
            $('#donorFormGroup').show();
            $('#impFormGroup').show();
            $('#oulFormGroup').show();
            $('#ougFormGroup').show();
            $('#ougFormOU').show();
            $('#sdFormGroup').show();
            $('#edFormGroup').show();
            $('#smFormGroup').hide();
            $('#emFormGroup').hide();
            $('#genButton').show();
            periodIndicator();
        }

       if(reportName == 'Training Program Report'){
            $('#orgUnitGroupSelect').prop('disabled', true);
            $('#orgUnitGroupSelect').val('Select Group');
            $('#orgUnitGroupSelect').selectpicker('refresh');
            $('#orgUnitLevelSelect').prop('disabled', true);
            $('#orgUnitLevelSelect').val('Select Level');
            $('#orgUnitLevelSelect').selectpicker('refresh');
            $('#orgUnitOUSelect').prop('disabled', false);
            $('#orgUnitOUSelect').val('Select Org. Unit');
            $('#orgUnitOUSelect').selectpicker('refresh');
           periodIndicator();

        }
        else{
            $('#orgUnitGroupSelect').prop('disabled', false);
            $('#orgUnitGroupSelect').val('Select Group');
            $('#orgUnitGroupSelect').selectpicker('refresh');
            $('#orgUnitLevelSelect').prop('disabled', false);
            $('#orgUnitLevelSelect').val('Select Level');
            $('#orgUnitLevelSelect').selectpicker('refresh');
            $('#orgUnitOUSelect').prop('disabled', false);
            $('#orgUnitOUSelect').val('Select Org. Unit');
            $('#orgUnitOUSelect').selectpicker('refresh');


        }


    };

    $('#reportSelect').change(function () {
        selectedReport();
    });


});

/**
 * Get the ISO week date week number
 */
Date.prototype.getWeek = function () {
    // Create a copy of this date object
    var target  = new Date(this.valueOf());

    // ISO week date weeks start on monday
    // so correct the day number
    var dayNr   = (this.getDay() + 6) % 7;

    // ISO 8601 states that week 1 is the week
    // with the first thursday of that year.
    // Set the target date to the thursday in the target week
    target.setDate(target.getDate() - dayNr + 3);

    // Store the millisecond value of the target date
    var firstThursday = target.valueOf();

    // Set the target to the first thursday of the year
    // First set the target to january first
    target.setMonth(0, 1);
    // Not a thursday? Correct the date to the next thursday
    if (target.getDay() != 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }

    // The weeknumber is the number of weeks between the
    // first thursday of the year and the thursday in the target week
    return 1 + Math.ceil((firstThursday - target) / 604800000); // 604800000 = 7 * 24 * 3600 * 1000
}

var startYear='';
var startWeek='';
var endYear='';
var endWeek='';
function periodIndicator(){
    startYear=moment($('#startDate').val()).format('YYYY');
    startWeek=new Date(moment($('#startDate').val())).getWeek();
    endYear=moment($('#endDate').val()).format('YYYY');
    endWeek=new Date(moment($('#endDate').val())).getWeek();

    var curr = new Date(moment($('#startDate').val())) // get current date
    var first = curr.getDate() - curr.getDay()+2; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    var firstDay = moment(curr.setDate(first)).format('YYYY-MM-DD');;
    var lastDay = new Date(curr.setDate(last)).toUTCString();
    //alert(firstDay+lastDay);

    //document.getElementById('msgs').innerHTML='<div class="alert alert-info" role="alert">From: '+startYear+'W'+startWeek+' To: '+endYear+'W'+endWeek+'</div>'
    document.getElementById('msgs').innerHTML='<div class="alert alert-info" role="alert">From: W'+startWeek+' - '+'To: '+endYear+'W'+endWeek+'</div>'



}