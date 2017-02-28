angular.module("controllers",[]).controller("indexCtrl",["$scope","$http","cookie","$window",function(e,t,n,o){e.tabs=1,e.isSearch=!1,e.input="",e.on=function(t){e.tabs=t},t.get("http://10.16.155.28:81/news/php/index.php/news_api/get_channel").success(function(t){console.log(t),e.channels=t})}]).controller("recommendCtrl",["$scope","$http","$state",function(e,t,n){e.page=1,e.news=[],e.sort=!0,e.isActionSheet=!1,e.isLoadMore=!1,e.loadMore=function(){e.isLoadMore=!1,t.get("http://10.16.155.28:81/news/php/index.php/news_api/show_detail_by_channel_id",{params:{page:e.page++,channel_id:n.params.id}}).success(function(t){e.news=e.news.concat(t.news_list),e.isLoadMore=!0})},e.loadMore(),e.search=function(){e.isSearch=!0},e.cancle=function(){e.isSearch=!1},e.clear=function(){e.input=""},e.showActionSheet=function(){e.isActionSheet=!0},e.quickSort=function(t){"1"==t?(e.sort=!0,e.isActionSheet=!1):"2"==t&&(e.sort=!1,e.isActionSheet=!1)}}]).controller("hotCtrl",["$scope","$http","$state",function(e,t,n){e.loadMore=function(){e.news=[],e.isLoadMore=!1,t.get("http://10.16.155.28:81/news/php/index.php/news_api/show_detail_by_channel_id",{params:{page:e.page++,channel_id:n.params.id}}).success(function(t){e.news=e.news.concat(t.news_list),e.isLoadMore=!0})},e.loadMore()}]).controller("entertainmentCtrl",["$scope","$http","$state",function(e,t,n){e.loadMore=function(){e.news=[],e.isLoadMore=!1,t.get("http://10.16.155.28:81/news/php/index.php/news_api/show_detail_by_channel_id",{params:{page:e.page++,channel_id:n.params.id}}).success(function(t){e.news=e.news.concat(t.news_list),e.isLoadMore=!0})},e.loadMore()}]).controller("detailCtrl",["$scope","$http","$state",function(e,t,n){e.imgUrl="",e.isGallery=!1,t.get("http://10.16.155.28:81/news/php/index.php/news_api/show_detail",{params:{id:n.params.id}}).success(function(t){console.log(t.news_list),e.new=t.news_list[0]}),e.getUrl=function(t){e.imgUrl=t,e.isGallery=!0},e.checkout=function(){e.isGallery=!1}}]).controller("loginCtrl",["$scope","cookie","$http","$window",function(e,t,n,o){e.submit=function(){console.log(e.username,e.password),n.post("http://10.16.155.28:81/news/php/index.php/login_api/login",{params:{username:e.username,password:e.password}}).success(function(e){console.log(e),t.setCookie("username",e.user_name),t.setCookie("token",e.info.token),o.location.href="#/index/recommend/6"})}}]).controller("registerCtrl",["$scope","cookie","$http","$window",function(e,t,n,o){e.submit=function(){n.post("http://10.16.155.28:81/news/php/index.php/login_api/register",{params:{username:e.username,password:e.password}}).success(function(e){t.setCookie("username",e.user_name),t.setCookie("token",e.info.token),o.location.href="#/index/recommend/6"})}}]);var app=angular.module("myApp",["ng.post","routers","directives","controllers","services"]);angular.module("directives",[]).directive("xheader",function(){return{templateUrl:"directive/xheader.html"}}).directive("searchbar",function(){return{templateUrl:"directive/searchbar.html"}}).directive("carousel",function(){return{templateUrl:"directive/carousel.html",link:function(e,t,n){new Swiper(".swiper-container",{pagination:".swiper-pagination",paginationClickable:!0,nextButton:".swiper-button-next",prevButton:".swiper-button-prev",spaceBetween:30})}}}).directive("panel",function(){return{templateUrl:"directive/panel.html"}}).directive("actionsheet",function(){return{templateUrl:"directive/actionsheet.html"}}),angular.module("routers",["ui.router"]).config(["$stateProvider","$urlRouterProvider",function(e,t){e.state("index",{url:"/index",templateUrl:"template/index.html",controller:"indexCtrl"}).state("index.recommend",{url:"/recommend/:id",templateUrl:"template/recommend.html",controller:"recommendCtrl"}).state("index.hot",{url:"/hot/:id",templateUrl:"template/hot.html",controller:"hotCtrl"}).state("index.entertainment",{url:"/entertainment/:id",templateUrl:"template/entertainment.html",controller:"entertainmentCtrl"}).state("detail",{url:"/detail/:id",templateUrl:"template/detail.html",controller:"detailCtrl"}).state("login",{url:"/login",templateUrl:"template/login.html",controller:"loginCtrl"}).state("register",{url:"/register",templateUrl:"template/register.html",controller:"registerCtrl"}),t.when("","/index/recommend/6")}]).run(["$http","cookie","$window",function(e,t,n){e.post("http://10.16.155.28:81/news/php/index.php/login_api/auto_login",{params:{username:t.getCookie("username"),token:t.getCookie("token")}}).success(function(e){console.log(e),e||(n.location.href="#/login")})}]),angular.module("services",[]).service("cookie",["$document",function(e){return{setCookie:function(t,n){var o=10,i=new Date;i.setTime(i.getTime()+24*o*60*60*1e3),e[0].cookie=t+"="+n+";expires="+i},getCookie:function(t){var n,o=new RegExp("(^|)"+t+"=([^;]*)(;|$)");if(n=e[0].cookie.match(o))return n[2]}}}]);