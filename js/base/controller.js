/**
 * Created by Administrator on 2017/2/24 0024.
 */
angular.module('controllers',[]).controller('indexCtrl',['$scope', '$http', 'cookie', '$window',function($scope,$http,cookie,$window){
    $scope.tabs = 1;
    $scope.isSearch = false;
    $scope.input = '';
    $scope.on = function(num){
        $scope.tabs = num;
    };
    $http.get('http://10.16.155.28:81/news/php/index.php/news_api/get_channel').success(function(data) {
        console.log(data)
        $scope.channels = data
    })

}]).controller('recommendCtrl',['$scope','$http','$state',function($scope,$http,$state){
    $scope.page = 1;
    $scope.news = [];
    $scope.sort = true;
    $scope.isActionSheet  = false;
    $scope.isLoadMore = false;
    $scope.loadMore = function(){
        $scope.isLoadMore = false;
        $http.get('http://10.16.155.28:81/news/php/index.php/news_api/show_detail_by_channel_id',{
            params:{
                page: $scope.page++,
                channel_id: $state.params.id
            }
        }).success(function(data){
            $scope.news = $scope.news.concat(data.
                news_list);
            $scope.isLoadMore = true;
        });
    };
    $scope.loadMore();

    $scope.search = function(){
        $scope.isSearch = true;
    };
    $scope.cancle = function () {
        $scope.isSearch = false;
    };
    $scope.clear = function(){
        $scope.input = '';
    };
    $scope.showActionSheet = function () {
        $scope.isActionSheet  = true;
    }
    $scope.quickSort = function(num){
        if(num=='1'){
            $scope.sort = true;
            $scope.isActionSheet = false;
        }else if(num=='2'){
            $scope.sort = false;
            $scope.isActionSheet = false;
        }
    }
}]).controller('hotCtrl',['$scope','$http','$state',function ($scope,$http,$state) {
    $scope.loadMore = function(){
        $scope.news = [];
        $scope.isLoadMore = false;
        $http.get('http://10.16.155.28:81/news/php/index.php/news_api/show_detail_by_channel_id',{
            params:{
                page: $scope.page++,
                channel_id: $state.params.id
            }
        }).success(function(data){
            $scope.news = $scope.news.concat(data.
                news_list);
            $scope.isLoadMore = true;
        });
    };
    $scope.loadMore();

}]).controller('entertainmentCtrl',['$scope','$http','$state',function ($scope,$http,$state){
    $scope.loadMore = function(){
        $scope.news = [];
        $scope.isLoadMore = false;
        $http.get('http://10.16.155.28:81/news/php/index.php/news_api/show_detail_by_channel_id',{
            params:{
                page: $scope.page++,
                channel_id: $state.params.id
            }
        }).success(function(data){
            $scope.news = $scope.news.concat(data.
                news_list);
            $scope.isLoadMore = true;
        });
    };
    $scope.loadMore();

}]).controller('detailCtrl',['$scope','$http','$state',function($scope,$http,$state){
    $scope.imgUrl = '';
    $scope.isGallery = false;
    $http.get('http://10.16.155.28:81/news/php/index.php/news_api/show_detail',{
        params:{
            id:$state.params.id
        }
    }).success(function(data){
        console.log(data.news_list);
        $scope.new = data.news_list[0]
    });
    $scope.getUrl = function(imgUrl){
        $scope.imgUrl = imgUrl;
        $scope.isGallery = true;
    }
    $scope.checkout = function () {
        $scope.isGallery = false;
    }
}]).controller('loginCtrl',['$scope','cookie','$http','$window',function ($scope,cookie,$http,$window) {
        $scope.submit = function () {
            console.log($scope.username,$scope.password)
            $http.post('http://10.16.155.28:81/news/php/index.php/login_api/login',{
               params:{
                   username:$scope.username,
                   password:$scope.password
               }
            }).success(function(data){
                console.log(data);
                cookie.setCookie('username', data.user_name);
                cookie.setCookie('token', data.info.token);
                $window.location.href = '#/index/recommend/6'
            })
        }
}]).controller('registerCtrl',['$scope','cookie','$http','$window',function ($scope, cookie, $http, $window) {
    $scope.submit = function () {
        $http.post('http://10.16.155.28:81/news/php/index.php/login_api/register',{
            params:{
                username:$scope.username,
                password:$scope.password
            }
        }).success(function (data) {
            cookie.setCookie('username', data.user_name);
            cookie.setCookie('token', data.info.token);
           $window.location.href = '#/index/recommend/6'
        })
    }
}])