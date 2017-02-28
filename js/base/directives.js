/**
 * Created by Administrator on 2017/2/24 0024.
 */
angular.module('directives',[]).directive('xheader',function () {
    return{
        templateUrl:'directive/xheader.html',
    }
}).directive('searchbar',function () {
    return{
        templateUrl:'directive/searchbar.html'
    }
}).directive('carousel',function(){
    return{
        templateUrl:'directive/carousel.html',
        link:function(scope,ele,attr){
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                spaceBetween: 30
            });
        }
    }
}).directive('panel',function () {
    return{
        templateUrl:'directive/panel.html'
    }
}).directive('actionsheet',function () {
    return{
        templateUrl:'directive/actionsheet.html'
    }
})