/* 
Created BY : Yogesh Kothiya,
Use : General Purpose
----------------------------
*/

//ekaksha database
var database = null;
var storage  = null;
var firebaseConfig = {
    apiKey: "AIzaSyC3ZFQrIMzsiA5tYX1ZIG7gFTM-Cjeqgyg",
    authDomain: "telaworks-workforce.firebaseapp.com",
    databaseURL: "https://telaworks-workforce.firebaseio.com",
    projectId: "telaworks-workforce",
    storageBucket: "telaworks-workforce.appspot.com",
    messagingSenderId: "704892000793",
    appId: "1:704892000793:web:bca40d693e2f74a7812888",
    measurementId: "G-79NBGX6LCJ"
};
  // Initialize Firebase
if(typeof firebase != "undefined"){
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    firebase.auth.Auth.Persistence.SESSION
    database = firebase.database();
    storage = firebase.storage();
}


var newwindow = null;
/* Loader */
var loader = {};
loader.element = null;
loader.identify = "loader-wraper";
loader.container = '<div id="' + loader.identify + '"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
loader.set = function (el) {
    this.element = typeof el != "undefined" && el != "" ? el : "body";
    $("#" + loader.identify).remove();
    $(this.element).css("overflow", "hidden");
    $(this.element).append(this.container);
}

loader.remove = function () {
    $(this.element).css("overflow", "");
    window.setTimeout(function () { $("#" + loader.identify).remove(); }, 600);
}

/* This script will help to display error or success message */
var site = {};

site.scroll = function (px, dir) {
    var dir = typeof dir != "undefined" && dir != "" ? dir : ""
    var px = typeof px != "undefined" && px != "" ? parseInt(px) : 0
    $("html, body").animate({ scrollTop: px }, "slow");
}

site.errorShowSeconds = 35000;
site.errorElement = "#site-message";
site.successHtml = function (message) {
    html = '<div class="alert alert-success alert-dismissible fade show" role="alert" id="addedRoleMsg"><i class="fa fa-check-circle fa-lg"></i> ';
    html += message;
    html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    html += '</div>';
    return html;
}

site.errorHtml = function (message) {
    html = '<div class="alert alert-fill-danger alert-dismissible fade show" role="alert" id="addedRoleMsg"><i class="fa fa-times-circle fa-lg"></i> ';
    html += message;
    html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    html += '</div>';
    return html;
}

site.warningHtml = function (message) {
    html = '<div class="alert alert-fill-warning alert-dismissible fade show" role="alert" id="addedRoleMsg"><i class="fas fa-alert-circle fa-lg"></i> ';
    html += message;
    html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    html += '</div>';
    return html;
}

site.removeMessage = function () { $(site.errorElement).html(""); }
site.message = function (message, type) {
    var html=''
    message = typeof message != "undefined" && jQuery.trim(message) != "" ? message : "Success!";
    type = typeof type != "undefined" ? type : 1;
    if (type == 1){ html = this.successHtml(message);
    }else if (type == 2){  html =this.warningHtml(message);
    }else{  html = this.errorHtml(message);}
    $(site.errorElement).html(html);
    //window.setTimeout(function(){site.removeMessage()},this.errorShowSeconds);
}

site.responseMessage = function (data) {
    data = typeof data != undefined && data ? data : { "message": "Something went wrong" }
    if (typeof data.status != "undefined" && data.status == true) this.message(data.message, 1);
    else if (typeof data.message != "undefined") this.message(data.message, 0);
    else this.message("Something went wrong please try again later", 0);
}

site.random_digit = function () { return Math.floor(1000 + Math.random() * 9000); }
site.hasDuplicates = function (array) { return (new Set(array)).size !== array.length; }

site.one_space = function (s) {
    if (/^(\w+\s?)*\s*$/.test(s)) return s.replace(/\s+$/, '');
    return false;
}

site.query = function (arg) {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return typeof vars[arg] != "undefined" ? vars[arg] : "";
}

site.capitalize = function(s){
    if (typeof s !== 'string') return s;
    return s.charAt(0).toUpperCase() + s.slice(1)
}

site.params = function (params) {
    var params = typeof params != "undefined" ? params : 0
    var query = document.location.pathname.replace(/^\/|\/$/g, '').split("/");
    if (typeof query[params] != "undefined") return query[params];
    return ""
}

site.weekdays = function(dayNum){
    weekdays = Array(7)
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";
    return weekdays[dayNum]
}

site.monthName = function(monthNumber){
    monthNumber = typeof monthNumber != "undefined" ? monthNumber : 0;
    monthName = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    return monthName[monthNumber]
}

site.monthHalfName = function(monthNumber){
    monthNumber = typeof monthNumber != "undefined" ? monthNumber : 0;
    monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return monthName[monthNumber]
}

/* $(document).on("blur", "input.required", function (e) {
    $obj = $(this);
    if ($.trim($obj.val()) == "") $obj.addClass("error");
    else $obj.removeClass("error");
}); */

function ValidateEmail(inputText) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) return true;
    else return false;
}

function ValidateMobile(inputText) {
    var mob = /^[1-9]+$/;
    if ((mob.test(inputText) == true) & (inputText.length == 10)) return true;
    else return false;
}

function ValidateString(inputText) {
    var string = /^[0-9a-zA-Z ]+$/;
    if ((string.test(inputText) == true)) return true;
    else return false;
}

function ValidateID(inputText) {
    var m_id = /^[0-9]+$/;
    if ((m_id.test(inputText) == true) & (inputText.length == 9)) return true;
    else return false;
}

$(document).on("blur", 'input[data-valid="email"]', function () {
    $obj = $(this)
    $name = $obj.attr("name");
    $obj.parent("div").find(".error-msg-text").remove();
    if ($obj.val() == "") return;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if ($obj.val().match(mailformat)) {
        $obj.removeClass("error")
        $obj.parent("div").find(".email-" + $name).remove();
        return true;
    } else {
        if ($obj.parent("div").find(".email-" + $name).length == 0) {
            $obj.addClass("error")
            $obj.after('<span class="email-' + $name + ' error-msg-text">Please enter a valid email address<br></span>');
        }
        return false;
    }
});

$(document).on("blur", 'input[data-valid="contact"]', function () {
    $obj = $(this)
    $name = $obj.attr("name")
    var mob = /^[0-9]+$/;
    if ($obj.val() == "") return;
    $obj.parent("div").find(".error-msg-text").remove();
    var oldLen = typeof $obj.parent("div").find(".error-msg-text").length != "undefined" ? parseInt($obj.parent("div").find(".error-msg-text").length) : 0;
    if ((mob.test($obj.val()) == true) && ($obj.val().length < 10)) {

        if (($obj.val().match(/(\d)\1{9}/g))) {
            
            if ($obj.parent("div").find(".contact-" + $name).length == 0 && oldLen == 0) {
                $obj.addClass("error")
                $obj.after('<div class="contact-' + $name + ' error-msg-text w-100">Provid valid contact format.<br></div>');
            }
            return false;
        } else {
            $obj.removeClass("error")
            $obj.parent("div").find(".contact-" + $name).remove();
        }
        return true;
    } else {
        if ($obj.parent("div").find(".contact-" + $name).length == 0 && oldLen == 0) {
            $obj.addClass("error")
            $obj.after('<div class="contact-' + $name + ' error-msg-text w-100">Provid valid contact format.<br></div>');
        }
        return false;
    }
});

$(document).on("keypress", 'input[data-valid="number"], input[data-number="true"]', function (e) {
    e = (e) ? e : window.event;
    $obj = $(this)
    $name = $obj.attr("name");
    $obj.parents("div").find(".error-msg-text").remove();
    var charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        $obj.addClass("error")
        if ($obj.parents("div").find(".number-" + $name).length == 0)
            $obj.after('<span class="number-' + $name + ' error-msg-text w-100">This input field allows only numerical values<br></span>');
        return false;
    } else {
        $obj.removeClass("error")
        $obj.parents("div").find(".number-" + $name).remove();
        return true;
    }

});



$(document).on("keypress", 'input[data-valid="alnum"], [data-alnum="true"]', function (e) {
    $obj = $(this)
    $name = $obj.attr("name");
    $obj.parents("div").find(".error-msg-text").remove();
    var regex = new RegExp("^[a-zA-Z0-9-@ ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        $obj.removeClass("error")
        $obj.parents("div").find(".alnum-" + $name).remove();
        return true;
    } else {
        $obj.addClass("error")
        if ($obj.parents("div").find(".alnum-" + $name).length == 0)
            $obj.after('<span class="alnum-' + $name + ' error-msg-text">This field accept only alphabet and number value.<br></span>');
        e.preventDefault();
        return false;
    }
});

$(document).on("keypress", 'input[data-valid="alpha"], [data-alpha="true"]', function (e) {
    $obj = $(this)
    $name = $obj.attr("name")
    var regex = new RegExp("^[a-zA-Z ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        $obj.removeClass("error")
        $obj.parents("div").find(".alpha-" + $name).remove();
        return true;
    } else {
        $obj.addClass("error")
        if ($obj.parents("div").find(".alpha-" + $name).length == 0)
            $obj.after('<span class="alpha-' + $name + ' error-msg-text">This field accept only alphabet value.<br></span>');
        e.preventDefault();
        return false;
    }
});

$(document).on("blur", 'input[data-valid="alpha"], [data-alpha="true"]', function () {
    $obj = $(this)
    $name = $obj.attr("name")
    if ($obj.val() != "") {
        if ($obj.val().match(/(\d+)/)) {

        } else {
            $obj.parents("div").find(".alpha-" + $name).remove();
        }
    }

});

$(document).on("blur", 'input[data-unique]', function () {
    $obj = $(this)
    $name = $obj.attr("name")
    var otherVal = []
    $('input[name="' + $name + '"]').not($obj).each(function (index, el) { otherVal.push($(el).val().toString()) });
    if (otherVal.filter((item, index) => { return item == $obj.val().toString() && $obj.val() !=''}).length > 0) {
        if ($obj.parents("div").find(".data-unique" + $name).length == 0) {
            $obj.addClass("error")
            $obj.after('<span class="data-unique' + $name + ' error-msg-text">Given value is already exists <br></span>');
        }
        return false;
    } else {
        $obj.removeClass("error")
        $obj.parent("div").find(".data-unique" + $name).remove();
        return true;
    }
});

$(document).ready(function (e) {
    // for fixing sidebar scroll issue
    
    $("form").attr('autocomplete', 'off');
    var site_message = site.query("m");
    var message_status = site.query("s") == "" ? 1 : site.query("s");
    if (site_message) {
        site.message(decodeURIComponent(site_message), message_status);
    } else {
        $msg = $.trim($("#site-message").text())
        if ($msg) site.message($msg, parseInt($("#site-message").attr("status")))
    }

    if(typeof $('#start_time').length != "undefined" && $('#start_time').length > 0){
        $('#start_time').datetimepicker({
            format: 'LT'
        });
    }

    
    var dateToday = new Date();
    if(typeof $('.date').length != "undefined" && $('.date').length > 0){
        $('.date').datepicker({
            autoclose: true,
            "format":"mm/dd/yyyy",
            startDate: new Date()
        });
    }
});

$(document).on("click","#logout,.logout",function(){
    firebase.auth().signOut().then(() => {
        $.ajax({
            type:"GET",
            url:"/admin/logout",
            
            success:function(res){
                window.location.href = "/admin/login"
            },error:function(err){
                console.log(err);
            }
        });
        
    }, function (error) {
    // An error happened.
    });

})


$(document).on("click","#logout1,.logout1",function(){
    console.log("user"  )
    firebase.auth().signOut().then(() => {
        $.ajax({
            type:"GET",
            url:"/login/logout",            
            success:function(res){
                
                console.log("success")
                window.location.href = "/login"
            },error:function(err){
                console.log("error")
                console.log(err);
            }
        });
        return false;
    }, function (error) {
    // An error happened.
    });

})


function copyer(containerid) {
    var elt = document.getElementById(containerid);
    if (document.selection) { // IE
        if(elt.nodeName.toLowerCase() === "input"){
            document.getElementById(containerid).select();
            document.execCommand("copy");
        }else{
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(containerid));
            range.select();
            document.execCommand("copy");
        } 

    } else if (window.getSelection) {
        if(elt.nodeName.toLowerCase() === "input"){
            document.getElementById(containerid).select();
            document.execCommand("copy");
        }else{
            var range_ = document.createRange();
            range_.selectNode(document.getElementById(containerid));
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range_);
            document.execCommand("copy");
        }
    }
}

function getDateTime(){
    var dataTime = null;
    var date = new Date();
    var dateDay = date.getDate()+"";
    dateDay = dateDay.length == 1 ? "0"+dateDay : dateDay;
    var month = (date.getMonth()+1)+"";
    month = month.length == 1 ? "0"+month : month;
    var year = date.getFullYear();

    var hour = date.getHours()+"";
    hour = hour.length == 1 ? "0"+hour : hour;
    var minutes = date.getMinutes()+"";
    minutes = minutes.length == 1 ? "0"+minutes : minutes;
    var second = date.getSeconds();

    return dateDay+"-"+month+"-"+year+" "+hour+":"+minutes+":"+second;
}

function getDate(){
    var dataTime = null;
    var date = new Date();
    var dateDay = date.getDate()+"";
    dateDay = dateDay.length == 1 ? "0"+dateDay : dateDay;
    var month = (date.getMonth()+1)+"";
    month = month.length == 1 ? "0"+month : month;
    var year = date.getFullYear();
    return dateDay+"-"+month+"-"+year;
}

function getDateByString(dateStr){
    var date = new Date(dateStr);
    var dateDay = date.getDate()+"";
    dateDay = dateDay.length == 1 ? "0"+dateDay : dateDay;
    var month = (date.getMonth()+1)+"";
    month = month.length == 1 ? "0"+month : month;
    var year = date.getFullYear();
    return dateDay+"-"+month+"-"+year;
}

// function joinMeeting(code, name,query){
//     name = "vclass"
//     var meetUrl = null;
//     if(typeof code != "undefined" && code != "")
//         meetUrl = "/"+code;
//     if(typeof name != "undefined" && name != "" && typeof code != "undefined" && code != "")
//         meetUrl += "/"+name;
//     if(meetUrl != null){
//         newwindow=window.open(meetUrl,"V-Meet - meeting",'height='+$(document).height()+',width='+$(document).width());
//         if (window.focus) {newwindow.focus()}
//     }
//  }

function joinMeeting(code, name,query){
    var meetUrl = null;
    var query = typeof query != "undefined" && query != "" ? query : "";
    if(typeof code != "undefined" && code != "")
        meetUrl = "/"+code;
    if(typeof name != "undefined" && name != "" && typeof code != "undefined" && code != "")
        meetUrl += "/"+name;
    if(meetUrl != null){
        newwindow=window.open(meetUrl+"?"+query,"Workforce",'height='+$(document).height()+',width='+$(document).width());
        if (window.focus) {newwindow.focus()}
    }
 }

 function getTimeDeff(start, end){
    var timeStart = new Date(start).getTime();
    var timeEnd = new Date(end).getTime();
    var hourDiff = timeEnd - timeStart; //in ms
    var secDiff = hourDiff / 1000; //in s
    var minDiff = hourDiff / 60 / 1000; //in minutes
    var hDiff = hourDiff / 3600 / 1000; //in hours
    var humanReadable = {};
    hours = Math.floor(hDiff);
    minutes = parseInt(minDiff - (hours * 60));
    sec = (secDiff % 60)  ;

    hours = hours < 10 ? "0"+hours : hours;
    minutes = minutes < 10 ? "0"+minutes : minutes;
    sec = sec < 10 ? "0"+""+(sec) : sec;
    var timeStr = "";
    if(parseInt(hours) == 0 && parseInt(minutes) == 0){
      return sec+" sec(s)";
    } 
    return hours+":"+minutes+":"+sec;
  }

function convertDate(dateTime){
    var dateArr = dateTime.split(" ");
    var date = dateArr[0].split("-");
    dateArr[1] = typeof dateArr[1] != "undefined" ? dateArr[1] : "00:00:00";
    var time = dateArr[1].split(":");
    var day = date[0];
    var month = date[1];
    var year = date[2];
    var hour = time[0];
    var mm = time[1];
    var ss = time[2];
    return $.trim(year+"-"+month+"-"+day+" "+hour+":"+mm+":"+ss);
}

function getPaternDate(dateStr){
    var dateObj = new Date(dateStr)
    var date = dateObj.getDate()+"";
    date = date.length == 1 ? "0"+date : date;
    var month = dateObj.getMonth();
    var year = dateObj.getFullYear();
    
    var hours = dateObj.getHours();
    var minutes = dateObj.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    
    return (date)+" "+site.monthHalfName(month)+" "+year+", "+strTime;
}


function chatTimeDifference(current, previous) {
    // console.log(current, previous,"current, previous")
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var elapsed = current - previous;
    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' sec ago';   
    }else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' mins ago';   
    }else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }else if (elapsed < msPerMonth) {
         return Math.round(elapsed/msPerDay) + ' days ago';
    }else if (elapsed < msPerYear) {
         return Math.round(elapsed/msPerMonth) + ' months ago';
    }else {
         return Math.round(elapsed/msPerYear ) + ' years ago';
    }
}


function stringGen(len){
    var text = "";
    var charset = "12345678901234567890";
    for( var i=0; i < len; i++ )
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
}

function genMeetingCode(){
    return stringGen(3)+""+stringGen(3)+""+stringGen(3);
}

$(document).on("click",".copy-code",function(){
    copyer("meet-code");
});

$(document).on("focus","form.style3 input, form.style3 textarea",function(){
    let eleObj = $(this);
    eleObj.parents(".form-group").find(".form_label").addClass("hasVal");
});

$(document).on("blur","form.style3 input, form.style3 textarea",function(){
    let eleObj = $(this);
    if($.trim(eleObj.val()) != ""){
        eleObj.parents(".form-group").find(".form_label").addClass("hasVal");
    }else{
        eleObj.parents(".form-group").find(".form_label").removeClass("hasVal");
    }
});

$(document).on("change","form.style3 input, form.style3 textarea",function(){
    let eleObj = $(this);
    if($.trim(eleObj.val()) != ""){
        eleObj.parents(".form-group").find(".form_label").addClass("hasVal");
    }else{
        eleObj.parents(".form-group").find(".form_label").removeClass("hasVal");
    }
});

site.loadStyle3 = function(){
    $("form.style3 input, form.style3 textarea").each(function(index,ele){
        let eleObj = $(ele);
        if($.trim(eleObj.val()) != ""){
            eleObj.parents(".form-group").find(".form_label").addClass("hasVal");
        }
    });
}
site.loadStyle3();
