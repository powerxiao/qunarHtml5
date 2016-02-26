/**
 * Created by wansan on 2016/2/24.
 */
(function (win) {
    //先来个大框架,植入到body
    var icity = {},
        _innerCityList = {
            A: "",
            B: "",
            C: "",
            D: "",
            E: "",
            F: "",
            G: "",
            H: "",
            I: "",
            J: "",
            K: "",
            L: "",
            M: "",
            N: "",
            O: "",
            P: "",
            Q: "",
            R: "",
            S: "",
            T: "",
            U: "",
            V: "",
            W: "",
            X: "",
            Y: "",
            Z: ""
        },
        _interCityList = {
            A: "",
            B: "",
            C: "",
            D: "",
            E: "",
            F: "",
            G: "",
            H: "",
            I: "",
            J: "",
            K: "",
            L: "",
            M: "",
            N: "",
            O: "",
            P: "",
            Q: "",
            R: "",
            S: "",
            T: "",
            U: "",
            V: "",
            W: "",
            X: "",
            Y: "",
            Z: ""
        },
        _innerCityHtml = "", _interCityHtml = "",
        _rightNav = ["定位", "历史", "热门"];
    icity.init = function () {
        var html = "<section id='iCity' class='page on'>";
        html += "<div id='searchCity'>";
        //搜索框
        html += "<span class='icon icon-angle-left goBack'></span><input id='searchInput' type='text' placeholder='北京/bj/beijing/pek/中国' />";
        html += "</div>";
        //国际国内导航
        html += "<div id='searchNav'>";
        html += "<a href='javascript:void(0);' class='cityInner active'>国内</a><a href='javascript:void(0);' class='cityInter'>国内</a>";
        html += "</div>";
        //右边字母导航
        html += "<ul class='charNav'>";
        for (var locChar in _innerCityList) {
            _rightNav.push(locChar);
        }
        for (var i = 0; i < _rightNav.length; i++) {
            html += "<li data-char='" + _rightNav[i] + "'>" + _rightNav[i] + "</li>";
        }
        html += "</ul>";
        //国际模块
        html += "<div id='cityInner'>";
        html += "<section class='i-inner'><div class='city-list'> ";
        //定位
        html += "<dl class='selCityLocation padLeft10'><dt data-char='定位'>定位</dt><span class='getLoc' style='color:#1ba1ba'>点击获取位置</span></dl>";
        //历史
        html += "<dl class='history-city padLeft10'><dt data-char='历史'>历史</dt><dd data-val='北京' data-hcode='PEK'>北京</dd></dl>";
        //热门城市
        html += "<dl class='hot-city padLeft10'><dt data-char='热门'>热门城市</dt><dd data-val='北京' data-hcode='PEK'>北京</dd></dl>";
        //城市集合
        html += "<dl class='innerCityList'></dl>";
        html += "</div></section>";
        html += "</div>";
        //国际模块
        html += "<div id='cityInter'>";
        html += "</div>";
        html += "</section>";
        $("body script").eq(0).before(html);
    };
    //绑定数据
    icity.bindData = function (data) {

    };
    //获取国内城市
    icity.getInnerCity = function () {
        if (_innerCityHtml === "") {
            var innerCity = citysFlight;
            var innerCityList = $("#cityInner .innerCityList");
            for (var i = 0; i < innerCity.length; i++) {
                var item = innerCity[i];
                var firstChar = item[2].charAt(0).toUpperCase();
                if (_innerCityList[firstChar] === "") {
                    _innerCityList[firstChar] = "<dt class='charTitle' data-char='" + firstChar + "' style='border-top-width: 0px;'>" + firstChar + "</dt>";
                }
                _innerCityList[firstChar] += "<dd data-val='" + item[1] + "' data-code='" + item[0] + "' class='cityDetail'><span class='cityDetailSpan'>" + item[1] + "<span class='cc-code'> " + item[0] + " </span></span></dd>";
            }

            for (var item in _innerCityList) {
                if (_innerCityList.hasOwnProperty(item) && _innerCityList[item] !== "") {
                    _innerCityHtml += _innerCityList[item];
                }
            }
        }
        innerCityList.html(_innerCityHtml);
    };
    //获取国际城市
    icity.getInterCity = function () {

    };
    icity.init();
    //右侧栏导航
    //定位
    //历史
    //热门城市
    //具体城市
    //绑定事件
    function getLocation()
    {
        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }
    function showPosition(position)
    {
        alert("Latitude: " + position.coords.latitude +"。Longitude: " + position.coords.longitude);
    }
    $().ready(function () {
        icity.getInnerCity();
        $(".cityInner,.cityInter").click(function () {
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            $(this).attr("class") === "cityInner" ? icity.getInnerCity() : icity.getInterCity();
        });
        $("#iCity .charNav").find("li").on("click", function () {
            var char = $(this).attr("data-char"), top = 0;
            $("#cityInner .i-inner").find("dt").each(function () {
                var innerChar = $(this).attr("data-char");
                if (char === innerChar) {
                    top = $(this).offset().top;
                    return false;
                }
            });

            $("body").scrollTop(top-44);
        });
        $(".getLoc").on("click", function () {
            getLocation();
        });
    })
})(window);